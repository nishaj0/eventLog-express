const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const PORT = process.env.PORT || 3001

app.get("/", (req, res) => {
   res.send("Home")
})

app.listen(PORT, () => console.log(`server running at port: ${PORT}`))
