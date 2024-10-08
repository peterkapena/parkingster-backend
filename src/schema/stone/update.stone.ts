import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class UpdateStoneInput {
    @Field(() => String, { nullable: false, })
    _id!: String;
    @Field(() => String)
    material!: String;
    @Field(() => String)
    type!: String;
    @Field(() => String)
    available_size!: Number;
}

@ObjectType()
export class UpdateStoneOutput {
    @Field(() => String, { nullable: false, })
    _id!: String;
    @Field(() => String)
    material!: String;
    @Field(() => String)
    type!: String;
    @Field(() => String)
    available_size!: Number;
}