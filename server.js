const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const os = require("os");

const logEvent = require("./logEvent");

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
   const page = "Home"
   res.sendFile(path.join(__dirname, 'views', "index.html"));
   logEvent(`opened page "${page}"`, { username: os.userInfo().username });
});

app.get('/new-page(.html)?', (req, res) => {
   const page = "new-page"
   res.sendFile(path.join(__dirname, 'views', "new-page.html"))
   logEvent(`opened page "${page}"`, { username: os.userInfo().username });
})

app.get('/old-page(.html)?', (req, res) => {
   const page = "new-page"
   res.redirect(path.join(__dirname, 'views', "new-page.html"))
   logEvent(`opened page "${page}"`, { username: os.userInfo().username });
})

const one = (req, res, next) => {
   console.log("one");
   next();
};

const two = (req, res, next) => {
   console.log("two");
   next();
};

const three = (req, res, next) => {
   console.log("three");
   res.send("Finished");
};

app.get("/chain(.html)?", [one, two, three]);

// app.get('/*', (req, res) => {
//    const page = "404"
//    res.status(404).redirect(path.join(__dirname, 'views', "404.html"))
//    logEvent(`opened page "${page}"`, { username: os.userInfo().username });
// })


app.listen(PORT, () => console.log(`server running at port: ${PORT}`));
