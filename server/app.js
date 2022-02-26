const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const path = require("path");
const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes/index");

const app = express();
const PORT = config.get("PORT") ?? 5055;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client")));
    const indexPath = path.join(__dirname, "client", "index.html");
    app.get("*", (req, res) => {
        res.sendFile(indexPath);
    });
} else console.log("development");

async function start() {
    try {
        //    mongoose.connection.on - выполняется постоянно / once - однократно
        mongoose.connection.once("open", () => {
            initDatabase();
        });

        await mongoose.connect(config.get("MONGO_URI"));
        console.log(chalk.green.inverse(`Database connected...`));

        app.listen(PORT, () => {
            console.log(
                chalk.green.inverse(
                    `Server has been starter on port ${PORT}...`
                )
            );
        });
    } catch (error) {
        console.log(chalk.red.inverse(error.message));
        process.exit(1);
    }
}

start();
