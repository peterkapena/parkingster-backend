import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class UpdateOrderOutput {
    @Field(() => String)
    _id?: String;
}

@InputType()
export class UpdateOrderInput {
    @Field(() => String,)
    _id!: String;
    @Field(() => String, { nullable: true })
    clientAddress?: String;
    @Field(() => String, { nullable: true })
    stone?: String;
    @Field(() => Boolean, { nullable: true })
    buildHole?: Boolean = false;
    @Field(() => String, { nullable: true })
    type?: String;
    @Field(() => String, { nullable: true })
    deliveryTeam?: String;
    @Field(() => String, { nullable: true })
    vehicle?: String;
    @Field(() => String, { nullable: true })
    writings?: String;
    @Field(() => String, { nullable: true })
    dueDate?: String;
    @Field(() => String, { nullable: true })
    status?: "Submitted" | "Delivered" | "Stagnant" | "Manufactured" | "Returned";
}