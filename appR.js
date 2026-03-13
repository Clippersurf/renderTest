const express = require("express");
const appR = express();

const PORT = process.env.PORT || 3000;

appR.get("/", (req, res) => {
  res.send("Hello Render !");
});

appR.get("/test", (req, res) => {
  res.json({ status: "OK" });
});

appR.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
