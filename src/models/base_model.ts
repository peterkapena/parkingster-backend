import { pre, prop } from "@typegoose/typegoose";

@pre<base_model>("save", async function () {
  this.created_on = new Date().toISOString();
})
export default class base_model {
  _id?: String;

  @prop({ default: false })
  deleted?: Boolean;

  @prop()
  deletedOn?: String;

  @prop()
  deletedBy?: String;

  @prop()
  created_on?: String;
}