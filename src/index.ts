import "reflect-metadata";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function main() {
  console.log(`Server is running on port ${PORT}`);
}

main().catch((error) => {
  console.error(error);
});