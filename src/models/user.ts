import {
  getModelForClass,
  prop,
  pre,
  queryMethod,
  index,
} from "@typegoose/typegoose";
import { Field } from "type-graphql";
import bcrypt from "bcrypt";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import base_model from "./base_model.js";

const SALT = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));

function find_by_email(
  this: ReturnModelType<typeof UserClass, UserClassQueryHelpers>,
  email: UserClass["email"]
) {
  return this.findOne({ email });
}
function find_by_username(
  this: ReturnModelType<typeof UserClass, UserClassQueryHelpers>,
  username: UserClass["username"]
) {
  return this.findOne({ username });
}
export interface UserClassQueryHelpers {
  find_by_email: AsQueryMethod<typeof find_by_email>;
  find_by_username: AsQueryMethod<typeof find_by_username>;
}

@queryMethod(find_by_email)
@queryMethod(find_by_username)
@pre<UserClass>('findOneAndUpdate', async function () {
  let password = this.get("password");
  if (password) {
    password = await bcrypt.hash(password.toString(), SALT);
    this.set("password", password)
  }
})
@pre<UserClass>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  if (!SALT) throw new Error("BCRYPT is not set");

  this.password = await bcrypt.hash(this.password.toString(), SALT);
})
@index({ email: 1 })
@queryMethod(find_by_username)
export default class UserClass extends base_model {
  @prop({ type: String, unique: true, required: true })
  email!: String;

  @prop({ type: String, required: true })
  password!: String;

  @prop({ type: [String], default: [], required: false })
  @Field(() => [String])
  roles: String[];

  @prop({ required: true, unique: true })
  username!: String;

  // @prop({ unique: true })
  // resetPasswordToken?: String;

  // @prop({ unique: true })
  // resetPasswordExpires?: Date;
}

export const UserModel = getModelForClass<
  typeof UserClass,
  UserClassQueryHelpers
>(UserClass, {
  options: { customName: "User" },
});
