const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables from config.env (for local development)
// In production (Render), environment variables are set via dashboard
dotenv.config({ path: "./config.env" });

const app = require("./app");

//this handles any uncaught exception that occurs in the app
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception! 💥 Shutting down");
  process.exit(1);
});

// Render automatically sets PORT environment variable
const port = process.env.PORT || 5000;

// Support both DATABASE and MY_DATABASE_LINK for flexibility
const DB = process.env.DATABASE || process.env.MY_DATABASE_LINK;

if (!DB) {
  console.error("ERROR: No database connection string provided!");
  process.exit(1);
}

console.log("Connecting to database...");
mongoose
  .connect(DB)
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  });

// Bind to 0.0.0.0 for Render
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 App running on port ${port}...`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);

  // Self-ping to prevent Render from suspending (only in production)
  if (
    process.env.NODE_ENV === "production" /* &&
    process.env.RENDER_SERVICE_NAME */
  ) {
    const https = require("https");
    const selfPingUrl =
      process.env.RENDER_EXTERNAL_URL ||
      `https://${process.env.RENDER_SERVICE_NAME}.onrender.com`;

    console.log(`⏰ Self-ping enabled for: ${selfPingUrl}`);

    const pingServer = () => {
      https
        .get(`${selfPingUrl}/api/v1/users/health`, (res) => {
          console.log(`✅ Self-ping successful: ${res.statusCode}`);
        })
        .on("error", (err) => {
          console.log(`⚠️ Self-ping failed: ${err.message}`);
        });
    };

    // Ping every 10 minutes (300000ms)
    setInterval(pingServer, 10 * 60 * 1000);
  }
});

//this handles any unhandled rejection such as if promise is rejected and we have not handled it, then that situation is called unhandled rejection, as the promise rejection is not handled properly.
//Some of the scenarios might be the wrong database credentials
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection! 💥 Shutting down");
  //server.close first finishes all its request responses and then only call process.exit(1) {process.exit(1) crashes the server}
  server.close(() => {
    process.exit(1);
  });
});
