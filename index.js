const express = require("express");
const http2Express = require("http2-express-bridge");
const http2 = require("http2");
const { readFileSync } = require("fs");
// only change required
const app = http2Express(express);

const PORT = 8000;
const HOST = "localhost";

app.use("/test", (req, res) => {
  console.log("esta funcando");
  res.send("Hello World");
});

const options = {
  key: readFileSync(
    "./node_modules/@codice-progressio/easy-https/cert/desarrollo.key"
  ),
  cert: readFileSync(
    "./node_modules/@codice-progressio/easy-https/cert/desarrollo.crt"
  ),
//   allowHTTP1: true,
};
const server = http2.createSecureServer(options, app);
server.listen(PORT, HOST, (e) => {
  console.log("Servidor iniciado en el puerto:" + PORT);
  console.log(e);
});

server.on("error", (e) => {
  console.log("Tenemos un error ");
  console.log(e);
  if (e.code === "EADDRINUSE") {
    console.log("Address in use");
    // setTimeout(() => {
    //   server.close();
    //   server.listen(PORT, HOST);
    // }, 1000);
  }
});
