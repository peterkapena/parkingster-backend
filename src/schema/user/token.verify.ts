import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class VerifyTokenOutput {
  @Field(() => Boolean, { defaultValue: false ,})
  isExpired?: Boolean;

  @Field(() => String, { nullable: true })
  refreshToken!: String;

  @Field(() => String)
  accessToken!: String;
}

@InputType()
export class VerifyTokenInput {
  @Field(() => String)
  refreshToken!: String;

  @Field(() => String)
  accessToken!: String;
}