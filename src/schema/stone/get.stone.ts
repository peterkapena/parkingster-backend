import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class GetStoneOutput {
    @Field(() => String, { nullable: false, })
    _id!: String;
    @Field(() => String)
    material!: String;
    @Field(() => String)
    type!: String;
    @Field(() => String)
    available_size!: Number;
    @Field(() => String)
    deleted!: Boolean;
}