const express = require("express");
const app = express();
const portNumber = 3001;
const sourceDir = "dist";

app.use(express.static(sourceDir));

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
