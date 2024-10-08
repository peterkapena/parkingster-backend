import seed_stones from "./seed_stones.js";
import { connectToMongoDB } from "./mongo.js";

(async function () {
  await connectToMongoDB();
  await seed_stones();
})();