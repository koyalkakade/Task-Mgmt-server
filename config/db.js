const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    logging: false, // Optional: Disable SQL logs
    dialectOptions: {
        ssl: process.env.NODE_ENV === "production"
            ? {
                  require: true,
                  rejectUnauthorized: false,
              }
            : false,
    },
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");

        await sequelize.sync({ alter: false });
        console.log("Models synchronized successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

module.exports = { sequelize, connectDB };

Y

connectDB()

module.exports = {sequelize};