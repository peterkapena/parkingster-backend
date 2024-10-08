import {
    getModelForClass,
    prop,
} from "@typegoose/typegoose";
import base_model from "./base_model.js";
import { pre, } from "@typegoose/typegoose";

export interface OrderClassQueryHelpers {
}

@pre<OrderClass>("save", async function () {
    this.status = "Submitted";
})
export default class OrderClass extends base_model {
    @prop({ type: String, required: true })
    dueDate!: String;
    @prop({ type: String, required: true })
    clientName!: String;
    @prop({ type: String, required: true })
    clientAddress!: String;
    @prop({ type: String, required: true })
    stone!: String;
    @prop({ type: Boolean })
    buildHole?: Boolean = false;
    @prop({ type: String, required: true })
    type!: String;
    @prop({ type: String, })
    deliveryTeam!: String;
    @prop({ type: String, })
    vehicle!: String;
    @prop({ type: String, })
    writings!: String;
    @prop({ type: String })
    status?: "Submitted" | "Delivered" | "Stagnant" | "Manufactured" | "Returned";
}

export const OrderModel = getModelForClass<
    typeof OrderClass,
    OrderClassQueryHelpers
>(OrderClass, {
    options: { customName: "Order" },
});
