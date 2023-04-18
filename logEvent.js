const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const os = require('os')

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvent = async (eventName, eventData) => {
   const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
   const eventId = uuid();

   const logData = `${timestamp} [${eventId}] ${eventName}, ${JSON.stringify(eventData)}\n`;

   try {
      if (!fs.existsSync(path.join(__dirname, "logs"))) {
         await fsPromises.mkdir(path.join(__dirname, "logs"));
      }
      await fsPromises.appendFile(
         path.join(__dirname, "logs", "logs.txt"),
         logData
      );
   } catch (err) {
      console.error(err);
   }
};


const page = 'home';

logEvent(`opened page${page}`, { username: os.userInfo().username });

module.exports = logEvent