import seed_stones from "./seed_stones.js";
import { connectToMongoDB } from "./mongo.js";
import { addRandomParkingSpaces } from "./add_random_parking_space.js";

(async function () {
  await connectToMongoDB();
  await seed_stones();
  await addRandomParkingSpaces()
})();