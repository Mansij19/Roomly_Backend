const express = require("express");
const cors = require("cors");
require("dotenv").config();

const indexRoutes = require("./src/routes/index");
const authRoutes = require("./src/routes/authRoutes")
const connectDB = require("./src/db/pool");

const app = express();

const startServer = async () => {
  try {
    await connectDB();

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

app.use('/api', indexRoutes);
app.use('/api/auth', authRoutes);

// login/signup flow:
// client -> auth request -> route -> controller(identity verification, credentials signing, token generation) -> response -> client access.

// after login/signup flow:
// client acessing -> request(token) -> route -> auth middleware(token verification, access granted/revoke) -> client acess granted -> routing -> contoller -> reponse.


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
