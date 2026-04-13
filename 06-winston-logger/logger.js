import { createLogger, transports, format } from "winston";
import { bold, green, yellow, red, cyan, gray, dim } from "colorette";

const LEVEL_STYLES = {
  info: (t) => bold(green(t)),
  warn: (t) => bold(yellow(t)),
  error: (t) => bold(red(t)),
  debug: (t) => bold(cyan(t)),
};

const consoleFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
  format.errors({ stack: true }),
  format.printf(({ level, message, timestamp, stack }) => {
    const time = dim(gray(`[${timestamp}]`));
    const lvl = (LEVEL_STYLES[level] ?? bold)(level.toUpperCase().padEnd(5));
    const msg = stack ?? message;
    return `${time} ${lvl} ${msg}`;
  }),
);

const fileFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
  format.errors({ stack: true }),
  format.printf(({ level, message, timestamp, stack }) => {
    const lvl = `[${level.toUpperCase()}]`.padEnd(7);
    const msg = stack ?? message;
    return `${timestamp} ${lvl} | ${msg}`;
  }),
);

const logger = createLogger({
  level: "info",
  transports: [
    new transports.Console({ format: consoleFormat }),
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
      format: fileFormat,
    }),
    new transports.File({
      filename: "./logs/combined.log",
      format: fileFormat,
    }),
  ],
});

export default logger;
