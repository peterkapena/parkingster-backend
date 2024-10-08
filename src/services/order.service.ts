import OrderClass, { OrderModel } from "../models/order.js";
import { CreateOrderInput, CreateOrderOutput } from "../schema/order/create.order.js";
import { GetOrderOutput, GetOrdersFilter } from "../schema/order/get.order.js";
import { UpdateOrderInput, } from "../schema/order/update.order.js";

export class OrderService {
    async createOrder(input: CreateOrderInput): Promise<CreateOrderOutput> {
        try {
            // Create the order
            let order: OrderClass = {
                ...input,
                deliveryTeam: '',
                vehicle: '',
                status: 'Submitted'
            }

            order = await OrderModel.create(input);

            return {
                _id: order._id
            };
        } catch (error) {
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }

    async getOrder(input: String): Promise<GetOrderOutput> {
        try {
            const order = await OrderModel.findById(input).exec();

            if (!order) {
                throw new Error('Order not found');
            }
            const getOrder: GetOrderOutput = {
                _id: order._id,
                dueDate: order.dueDate,
                clientName: order.clientName,
                clientAddress: order.clientAddress,
                stone: order.stone,
                buildHole: order.buildHole,
                type: order.type,
                deliveryTeam: order.deliveryTeam,
                vehicle: order.vehicle,
                writings: order.writings,
                status: order.status
            };

            return getOrder;
        } catch (error) {
            throw new Error(`Failed to retrieve order: ${error.message}`);
        }
    }

    async updateOrder(input: UpdateOrderInput): Promise<Boolean> {
        try {
            const order = await OrderModel.findOneAndUpdate({ _id: input._id }, { ...input }, { new: true }).exec();

            if (!order) {
                throw new Error('Order not found');
            }

            // const updatedOrder: UpdateOrderOutput = {
            //     ...order
            // };

            return true;
        } catch (error) {
            throw new Error(`Failed to update order: ${error.message}`);
        }
    }

    async deleteOrder(input: String): Promise<Boolean> {
        try {
            const order = await OrderModel.findOneAndUpdate({ _id: input }, { deleted: true, deletedOn: new Date().toISOString() }, { new: true }).exec();

            if (!order) {
                throw new Error('Order not found');
            }


            return true;
        } catch (error) {
            throw new Error(`Failed to delete order: ${error.message}`);
        }
    }

    async getOrders(filter: GetOrdersFilter): Promise<GetOrderOutput[]> {
        try {
            // Fetch orders from the database
            const orders = await OrderModel.find({ deleted: false }).exec();

            let filteredOrders = orders;

            // If weeklyOrders filter is enabled
            if (filter && filter.weeklyOrders) {
                const now = new Date();
                const currentDay = now.getDay();
                const distanceToMonday = (currentDay + 6) % 7; // distance to the previous Monday
                const distanceToSunday = (7 - currentDay) % 7; // distance to the next Sunday

                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - distanceToMonday);
                startOfWeek.setHours(0, 0, 0, 0);

                const endOfWeek = new Date(now);
                endOfWeek.setDate(now.getDate() + distanceToSunday);
                endOfWeek.setHours(23, 59, 59, 999);

                // Filter the orders based on dueDate
                filteredOrders = orders.filter((order) => {
                    const dueDate = new Date(order.dueDate.toString());
                    return dueDate >= startOfWeek && dueDate <= endOfWeek;
                });
            }
            // If date filter is enabled and weeklyOrders is not enabled
            else if (filter && filter.date) {
                const date = new Date(filter.date.toString());
                const currentDay = date.getDay();
                const distanceToMonday = (currentDay + 6) % 7; // distance to the previous Monday
                const distanceToSunday = (7 - currentDay) % 7; // distance to the next Sunday

                const startOfWeek = new Date(date);
                startOfWeek.setDate(date.getDate() - distanceToMonday);
                startOfWeek.setHours(0, 0, 0, 0);

                const endOfWeek = new Date(date);
                endOfWeek.setDate(date.getDate() + distanceToSunday);
                endOfWeek.setHours(23, 59, 59, 999);

                // Filter the orders based on dueDate
                filteredOrders = orders.filter((order) => {
                    const dueDate = new Date(order.dueDate.toString());
                    return dueDate >= startOfWeek && dueDate <= endOfWeek;
                });
            }

            // If futureOrders filter is enabled
            if (filter && filter.futureOrders) {
                const now = new Date();

                // Filter the orders to include only future due dates
                filteredOrders = filteredOrders.filter((order) => {
                    const dueDate = new Date(order.dueDate.toString());
                    return dueDate >= now;
                });
            }

            // If status filter is enabled
            if (filter && filter.status) {
                const status = filter.status;

                // Filter the orders based on status
                filteredOrders = filteredOrders.filter((order) => order.status === status);
            }

            // Sort the orders by due date, closest due date first
            filteredOrders.sort((a, b) => new Date(a.dueDate.toString()).getTime() - new Date(b.dueDate.toString()).getTime());

            // Mapping function for orders
            const mapOrder = (order) => ({
                _id: order._id,
                dueDate: order.dueDate,
                clientName: order.clientName,
                clientAddress: order.clientAddress,
                stone: order.stone,
                buildHole: order.buildHole,
                type: order.type,
                deliveryTeam: order.deliveryTeam,
                vehicle: order.vehicle,
                writings: order.writings,
                status: order.status,
            });

            // Return mapped orders
            return filteredOrders.map(mapOrder);
        } catch (error) {
            throw new Error("Failed to get orders: " + error.message);
        }
    }

    async getAverageOrdersPerDayForLastMonth() {
        // Get the current date and calculate the date one month ago
        const currentDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);

        // Query to find all orders from the last month
        const orders = await OrderModel.find({
            dueDate: { $gte: oneMonthAgo, $lt: currentDate }
        }).exec();

        // Calculate the number of days between the two dates
        const numberOfDays = (currentDate.getTime() - oneMonthAgo.getTime()) / (1000 * 60 * 60 * 24);

        // Calculate the average number of orders per day
        const averageOrdersPerDay = orders.length / numberOfDays;

        return averageOrdersPerDay;
    }
}