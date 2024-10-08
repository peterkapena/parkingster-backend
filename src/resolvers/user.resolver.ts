import { Mutation, Resolver, Arg, Query, Ctx, Authorized } from "type-graphql";
// import { VerifyTokenInput, VerifyTokenOutput } from "../schema/user/token.verify.js";
import UserService from "../services/user.service.js";
import { SigninOutput, SigninInput, GetUserOutput, UpdateUserPasswordInput } from "../schema/user/signin.user.js";
import { SignupInput, } from "../schema/user/create.user.js";
import Context from "../models/context.js";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => SigninOutput)
  async signin(@Arg("input") input: SigninInput) {
    return this.userService.signin(input);
  }

  @Mutation(() => Boolean)
  @Authorized()
  async signup(@Arg("input") input: SignupInput) {
    return this.userService.signUp(input.email, input.password, input.email);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async passwordUpdate(@Arg("password") password: String, @Ctx() { user: { _id } }: Context) {
    // console.log(password);
    return this.userService.passwordUpdate(password, _id);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async updateUserPassword(@Arg("input") input: UpdateUserPasswordInput): Promise<Boolean> {
    return this.userService.updateUserPassword(input);
  }

  @Authorized()
  @Query(() => GetUserOutput)
  async getUser(@Ctx() { user: { _id } }: Context): Promise<GetUserOutput> {
    return this.userService.getUser(_id);
  }

  @Authorized()
  @Query(() => GetUserOutput)
  async getUserById(@Arg("_id") _id: String): Promise<GetUserOutput> {
    return this.userService.getUser(_id);
  }

  @Authorized()
  @Query(() => [GetUserOutput])
  async getUsers(): Promise<GetUserOutput[]> {
    return this.userService.getUsers();
  }
}
