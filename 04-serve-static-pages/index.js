import http from "http";
import fs from "fs";

const BASE_PATH = "./public";

const CONTENT_TYPE_EXTENTIONS_MAP = {
  html: "text/html",
  css: "text/css",
  js: "application/x-javascript",
};

const server = http.createServer((req, res) => {
  console.log("url: ", req.url);
  const path = `${BASE_PATH}${req.url === "/" ? "/index.html" : req.url}`;
  const contentType = CONTENT_TYPE_EXTENTIONS_MAP[path.split(".").pop()];

  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.write(JSON.stringify({ message: "Resource not found!" }));
      res.end();
      return;
    }

    res.writeHead(200, { "Content-type": contentType });
    res.write(data);
    res.end();
  });
});

server.listen(3000, () => {
  console.log("Server started");
});
