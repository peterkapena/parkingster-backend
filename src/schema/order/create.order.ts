import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class CreateOrderInput {
    @Field(() => String)
    dueDate!: String;
    @Field(() => String)
    clientName!: String;
    @Field(() => String)
    clientAddress!: String;
    @Field(() => String)
    stone!: String;
    @Field(() => Boolean)
    buildHole?: Boolean = false;
    @Field(() => String)
    type!: String;
    // @Field(() => String)
    // delivery_team!: String;
    // @Field(() => String)
    // vehicle!: String;
    @Field(() => String)
    writings!: String;
    // @Field(() => String)
    // status?: "Submitted" | "Delivered" | "Stagnant" | "Manufactured" | "Returned";
}

@ObjectType()
export class CreateOrderOutput {
    @Field(() => String)
    _id?: String;
}