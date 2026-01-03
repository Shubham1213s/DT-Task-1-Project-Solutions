const express = require("express");
const { connectDB } = require("./database");
const eventRoutes = require("./routes/events");

const app = express();
app.use(express.json());

app.use("/api/v3/app/events", eventRoutes);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
