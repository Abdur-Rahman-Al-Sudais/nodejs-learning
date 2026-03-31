import "dotenv/config";
import config from "config";

const jwtSecret = config.get("jwtSecret");
const useDatabase = config.get("useDatabase");
const port = config.get("port");

console.log(jwtSecret);
console.log(useDatabase);
console.log(port);


