const express = require("express");
const Engine = require("./engine");
const routes = require("./routes");

const METADATA_PATH = '../meta/';

const app = express();
app.use(express.json());
app.use(express.raw({ verify: (req, res, buf, encoding) => {
  console.log(buf);
}}));
app.use(routes);

const port = 8080;

const engine = new Engine();

global.engine = engine;

engine.sayHello();
engine.loadAllMetaData(METADATA_PATH);
engine.loadAllTemplates();

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})