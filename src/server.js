require("dotenv").config();
console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
const app = require("./app");
const db = require("./models")
db.sequelize.sync({ alter: true })
app.listen(3331,'0.0.0.0', () => console.log("Server is on"));