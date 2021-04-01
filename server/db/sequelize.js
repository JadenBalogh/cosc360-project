import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then((x) =>
    console.log("Database connection has been established successfully.")
  )
  .catch((err) => console.log(err));

sequelize
  .sync({ force: false })
  .then((x) => {
    console.log("Database has been synchronized successfully.");
  })
  .catch((err) => console.log(err));
