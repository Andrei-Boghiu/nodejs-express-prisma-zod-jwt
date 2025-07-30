require("dotenv").config();
const app = require("./app");
const getLocalIp = require("./utils/getLocalIp.util");

const PORT = process.env.PORT || 4000;
const IP = getLocalIp();

app.listen(PORT, () => {
  console.log(`Server is running on http://${IP}:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});
