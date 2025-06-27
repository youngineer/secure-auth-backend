import { BaseError } from "sequelize";
import sequelize from "./config/database";
import express from 'express';


const app = express();
app.use(express.json());

(async() => {
    try {
        await sequelize.sync()
        app.listen(3000, () => {
            console.log("Server listening on port 3000");
        });
    } catch (error) {
        console.error("Could not connect to the database")
    }
})();



