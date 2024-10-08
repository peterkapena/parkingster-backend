import { Mutation, Resolver, Arg, Query, Authorized, } from "type-graphql";
import { OrderService } from "../services/order.service.js";
import { CreateOrderInput, CreateOrderOutput } from "../schema/order/create.order.js";
import { GetOrderOutput, GetOrdersFilter } from "../schema/order/get.order.js";
import { UpdateOrderInput, } from "../schema/order/update.order.js";

@Resolver()
export default class OrderResolver {
    constructor(private orderService: OrderService) {
        this.orderService = new OrderService();
    }

    @Authorized()
    @Mutation(() => CreateOrderOutput)
    async createOrder(
        @Arg("input") input: CreateOrderInput): Promise<CreateOrderOutput> {
        return this.orderService.createOrder(input);
    }

    @Authorized()
    @Query(() => GetOrderOutput)
    async getOrder(@Arg("input") input: String): Promise<GetOrderOutput> {
        return this.orderService.getOrder(input);
    }

    @Authorized()
    @Mutation(() => Boolean)
    async updateOrder(
        @Arg("input") input: UpdateOrderInput
    ): Promise<Boolean> {
        return this.orderService.updateOrder(input);
    }

    @Authorized()
    @Mutation(() => Boolean)
    async deleteOrder(
        @Arg("input") input: String
    ): Promise<Boolean> {
        return this.orderService.deleteOrder(input);
    }

    @Authorized()
    @Query(() => [GetOrderOutput])
    async getOrders(@Arg("input") input: GetOrdersFilter): Promise<GetOrderOutput[]> {
        return this.orderService.getOrders(input);
    }
}