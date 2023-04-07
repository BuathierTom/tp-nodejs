const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.File({ filename: "combined.log" }),
    ],
});
logger.log({
    level: "info",
    message: "Récupération  de la liste des films de l'utilisateur 123123",
    source: "filmApi"    
});