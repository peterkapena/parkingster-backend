import {
    Ref,
    getModelForClass,
    prop,
} from "@typegoose/typegoose";
import base_model from "./base_model.js";
import { pre, } from "@typegoose/typegoose";
import { Types } from "mongoose";
import OrderClass from "./order.js";

export interface StoneClassQueryHelpers {
}

@pre<StoneClass>("save", async function () {
    
})
export default class StoneClass extends base_model {
    @prop({ type: String, required: true })
    material!: String;
    @prop({ type: String, required: true })
    type!: String;
    @prop({ type: Number, required: true })
    available_size!: Number;
    @prop({ type: () => [Types.ObjectId], ref: () => OrderClass })
    orders?: Ref<OrderClass>[];
}

export const StoneModel = getModelForClass<
    typeof StoneClass,
    StoneClassQueryHelpers
>(StoneClass, {
    options: { customName: "Stone" },
});
