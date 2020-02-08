const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();
app.use(express.json());
app.use("/authentification", require("./routes/authentification"));
app.use("/users", require("./routes/users"));
app.use("/publications", require("./routes/publications"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
