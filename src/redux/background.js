import { compose } from "redux";
import { combineEpics, ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { timer, from } from "rxjs";
import { switchMap, map, pluck, takeUntil } from "rxjs/operators";
import { Parser } from "xml2js";
import Big from "big.js";
import { startPolling, cancelPolling, updateRates } from "./currency";

const parser = new Parser({
  normalizeTags: true,
  explicitRoot: false,
  explicitArray: false
});

const parseXml = compose(from, parser.parseStringPromise);

const normalize = data => {
  return data.cube?.cube?.cube?.reduce(
    (acc, { $ }) => {
      acc[$.currency] = new Big($.rate);
      return acc;
    },
    { EUR: new Big(1) }
  );
};

const start = action$ => action$.pipe(ofType(startPolling.type));
const cancel = action$ => action$.pipe(ofType(cancelPolling.type));

const pollData = action$ => {
  return timer(0, 30000).pipe(
    switchMap(action =>
      ajax({
        url: `/api/get-exchange-rate`,
        responseType: "application/xml"
      }).pipe(
        pluck("response"),
        switchMap(parseXml),
        map(normalize),
        map(updateRates)
      )
    )
  );
};

const pollingEpic = action$ => {
  return start(action$).pipe(
    switchMap(() => pollData(action$)),
    takeUntil(cancel(action$))
  );
};

export default combineEpics(pollingEpic);
