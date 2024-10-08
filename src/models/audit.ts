import {
    getModelForClass,
    prop,
} from "@typegoose/typegoose";
import base_model from "./base_model.js";

export interface AuditClassQueryHelpers {
}

export default class AuditClass extends base_model {
    _id?: String;
    @prop({ type: String, required: false })
    userId!: String;
    @prop()
    query!: String;
    @prop()
    variables!: String;
}

export const AuditModel = getModelForClass<
    typeof AuditClass,
    AuditClassQueryHelpers
>(AuditClass, {
    options: { customName: "Audit" },
});
