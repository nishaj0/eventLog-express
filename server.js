const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const os = require("os");

const logEvent = require("./logEvent");

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
   const page = "Home"
   res.send(page);
   logEvent(`opened page "${page}"`, { username: os.userInfo().username });
});


app.listen(PORT, () => console.log(`server running at port: ${PORT}`));
