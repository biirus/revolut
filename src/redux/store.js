import { applyMiddleware, createStore, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";

import rootReducer from "./currency";
import rootEpic from "./background";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

export default function configureStore(preloadedState) {
  const middlewares = [epicMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = composeEnhancers(middlewareEnhancer);

  const store = createStore(rootReducer, preloadedState, enhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./currency", () => store.replaceReducer(rootReducer));
  }

  epicMiddleware.run(rootEpic);

  return store;
}
