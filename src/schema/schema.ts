import { buildSchema } from "type-graphql";
import { resolvers } from "../resolvers/index.js";

const schema = await buildSchema({
  resolvers,
  validate: false,
});
export default schema