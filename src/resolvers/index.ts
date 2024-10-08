import OrderResolver from "./order.resolver.js";
import StoneResolver from "./stone.resolver.js";
import SystemResolver from "./system.resolver.js";
import UserResolver from "./user.resolver.js";

const resolvers = [UserResolver, OrderResolver, StoneResolver, SystemResolver] as const;

export { resolvers };
