const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");

// Logging function to write errors to a file for cPanel diagnostics
function logError(title, err) {
  const logFile = path.join(__dirname, "passenger_startup_error.log");
  const timestamp = new Date().toISOString();
  const errorMessage = `[${timestamp}] ${title}\nError: ${err.message || err}\nStack: ${err.stack || "N/A"}\n\n`;
  console.error(errorMessage);
  try {
    fs.appendFileSync(logFile, errorMessage, "utf8");
  } catch (e) {
    // Ignore logging write failures
  }
}

// Catch process errors
process.on("uncaughtException", (err) => {
  logError("Uncaught Exception during startup", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logError("Unhandled Rejection during startup", err);
  process.exit(1);
});

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

// On cPanel/Passenger, process.env.PORT is a Unix socket path string.
// Passing a socket path as `port` to Next.js can cause internal errors.
const isNumericPort = !isNaN(Number(port));
const nextOptions = { dev };
if (isNumericPort) {
  nextOptions.hostname = hostname;
  nextOptions.port = Number(port);
}

// Initialize Next.js app
const app = next(nextOptions);
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error handling request:", req.url, err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    })
      .once("error", (err) => {
        logError("Server socket error", err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> Application ready on port/socket: ${port}`);
      });
  })
  .catch((err) => {
    logError("Failed to prepare Next.js application", err);
    process.exit(1);
  });

