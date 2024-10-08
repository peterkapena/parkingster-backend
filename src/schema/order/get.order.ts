import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class GetOrderOutput {
    @Field(() => String, { nullable: false, })
    _id!: String;
    @Field(() => String, { nullable: true, })
    dueDate!: String;
    @Field(() => String, { nullable: false, })
    clientName!: String;
    @Field(() => String, { nullable: false, })
    clientAddress!: String;
    @Field(() => String, { nullable: false, })
    stone!: String;
    @Field(() => Boolean, { nullable: false, })
    buildHole!: Boolean
    @Field(() => String, { nullable: true, })
    type!: String;
    @Field(() => String, { nullable: true, })
    deliveryTeam!: String;
    @Field(() => String, { nullable: true, })
    vehicle!: String;
    @Field(() => String, { nullable: true, })
    writings!: String;
    @Field(() => String, { nullable: true, })
    status?: "Submitted" | "Delivered" | "Stagnant" | "Manufactured" | "Returned";
}

@InputType()
export class GetOrdersFilter {
    @Field(() => Boolean, { nullable: true, defaultValue: false })
    weeklyOrders: Boolean
    @Field(() => Boolean, { nullable: true, defaultValue: false })
    futureOrders: Boolean
    @Field(() => String, { nullable: true, defaultValue: "" })
    status: String
    @Field(() => String, { nullable: true, defaultValue: "" })
    date: String
}