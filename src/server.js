require("dotenv").config();
const app = require("./app");
const connectDB = require("./database/index");
const port = process.env.PORT || 3001;
const hostname = process.env.HOSTNAME || "localhost";

// W ---------{ Connect to MongoDB & start the server }--------------
connectDB()
  .then(() => {
    app
      .listen(port, hostname, () =>
        console.log(`🚀 Server running on port http://${hostname}:${port}`)
      )
      .on("error", (error) => console.error("❌ Server Error:", error.message));
  })
  .catch((error) =>
    console.error("❌ MongoDB Connection Error:", error.message)
  );
