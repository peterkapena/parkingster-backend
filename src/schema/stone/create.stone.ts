import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class CreateStoneInput {
    @Field(() => String)
    material!: String;
    @Field(() => String)
    type!: String;
    @Field(() => String)
    available_size!: Number;
}

@ObjectType()
export class CreateStoneOutput {
    @Field(() => String)
    _id?: String;
}