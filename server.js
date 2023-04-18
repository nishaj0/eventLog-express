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

app.get('*', (req, res) => {
   const page = "404"
   res.redirect(path.join(__dirname, 'views', "404.html"))
   logEvent(`opened page "${page}"`, { username: os.userInfo().username });
})


app.listen(PORT, () => console.log(`server running at port: ${PORT}`));
