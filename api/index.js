const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const hospitalRoute = require("./routes/hospitals");
const historyRoute = require("./routes/history");
const doctorRoute = require("./routes/doctors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });
  
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hospital", hospitalRoute);
app.use("/api/history", historyRoute);
app.use("/api/doctor", doctorRoute);

app.listen(8800, () => {
    console.log("Backend server is running!");
});
