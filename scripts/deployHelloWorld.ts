import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log(process.env.SEPOLIA_URL);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
