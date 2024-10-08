 import BookingResolver from "./booking.resolver.js";
import OrderResolver from "./order.resolver.js";
 
const resolvers = [OrderResolver, BookingResolver ] as const;

export { resolvers };
