import { Mutation, Resolver, Arg, Query, } from "type-graphql";
import { OrderService } from "../services/order.service.js";
import { CreateOrderInput, CreateOrderOutput } from "../schema/order/create.order.js";
import { GetOrderOutput, GetOrdersFilter } from "../schema/order/get.order.js";
import { UpdateOrderInput, } from "../schema/order/update.order.js";

@Resolver()
export default class OrderResolver {
    constructor(private orderService: OrderService) {
        this.orderService = new OrderService();
    }

    @Mutation(() => CreateOrderOutput)
    async createOrder(
        @Arg("input") input: CreateOrderInput): Promise<CreateOrderOutput> {
        return this.orderService.createOrder(input);
    }

    @Query(() => GetOrderOutput)
    async getOrder(@Arg("input") input: String): Promise<GetOrderOutput> {
        return this.orderService.getOrder(input);
    }

    @Mutation(() => Boolean)
    async updateOrder(
        @Arg("input") input: UpdateOrderInput
    ): Promise<Boolean> {
        return this.orderService.updateOrder(input);
    }

    @Mutation(() => Boolean)
    async deleteOrder(
        @Arg("input") input: String
    ): Promise<Boolean> {
        return this.orderService.deleteOrder(input);
    }

    @Query(() => [GetOrderOutput])
    async getOrders(@Arg("input") input: GetOrdersFilter): Promise<GetOrderOutput[]> {
        return this.orderService.getOrders(input);
    }
}