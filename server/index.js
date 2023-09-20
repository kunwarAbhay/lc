require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);

const db = require("./utils/database.js");
const userRouter = require("./routes/users");
const standingRouter = require("./routes/standing");
const { getAllRank } = require("./utils/contestRank.js");

const port = process.env.PORT || 8000;

// added cors policy
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (_, res) => {
    res.json({
        status: true,
        msg: "Alive!",
    });
    return;
});

app.use("/users", userRouter);
app.use("/standing", standingRouter);

// setTimeout(getAllRank, 5000);

app.use(express.static(__dirname + '/public'));

const server = http.listen(port, () => {
    console.log(`running on port ${port}`);
});