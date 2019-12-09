const http = require("http");
const https = require("https");

/**
 * Really simple proxy handler
 * to handle CORS issue on the client
 * Now origins of client and requested resiurce
 * the same
 */
const requestHandler = (request, response) => {
  const proxy = https
    .get(
      `https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml?${Math.random()}`,
      res => {
        response.writeHead(res.statusCode, res.headers);
        res.pipe(response, {
          end: true
        });
      }
    )
    .on("error", e => {
      console.error(e);
    });

  request.pipe(proxy, {
    end: true
  });
};

http.createServer(requestHandler).listen(4000, err => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening...`);
});
