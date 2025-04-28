import "dotenv";
import { dataSource } from "./services/client.service";

(async () => {
  await dataSource.initialize();
})();

console.log("Hello world");
