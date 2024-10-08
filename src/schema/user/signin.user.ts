import { InputType, Field, ObjectType } from "type-graphql";

@InputType()
export class SigninInput {
  @Field(() => String)
  email: String;

  @Field(() => String)
  password: String;
}

@ObjectType()
export class SigninOutput {
  @Field(() => String)
  accessToken?: String;

  @Field(() => String)
  refreshToken?: String;

  @Field(() => String, { nullable: true })
  email?: String;

  @Field(() => [String], { nullable: false })
  messages!: String[];
}

@ObjectType()
export class GetUserOutput {
  @Field(() => String, { nullable: false })
  email?: String;
  @Field(() => String, { nullable: false })
  id?: String;
}

@InputType()
export class UpdateUserPasswordInput {
  @Field(() => String, { nullable: false })
  password: String;
  @Field(() => String, { nullable: false })
  id: String;
}