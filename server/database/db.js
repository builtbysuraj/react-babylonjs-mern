const URL = require("dotenv")
URL.config()

module.exports = {
  db: process.env.MONGO_URI
};