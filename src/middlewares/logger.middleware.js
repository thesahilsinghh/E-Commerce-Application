import winston from "winston";
const loggerInfo = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [
    new winston.transports.File({
      filename: "logs.txt",
    }),
  ],
});

const loggerError = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [
    new winston.transports.File({
      filename: "errorLogs.txt",
    }),
  ],
});

export const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("users")) {
    const logData = req.url + " - " + JSON.stringify(req.body);
    loggerInfo.info(logData);
  }
  next();
};

export const errorLoggerMiddleware = async (err, req, res, next) => {
  loggerError.error(err);
  res.status(503).send("Server got some issues! please try again later");
};
