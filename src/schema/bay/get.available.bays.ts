import { Field, ObjectType, Float } from "type-graphql";

@ObjectType()
export class AvailableBayInfo {
  @Field(() => Float)
  public latitude!: number;

  @Field(() => Float)
  public longitude!: number;
  
  @Field()
  public parkingSpaceId!: string;

  @Field()
  public bayCount!: number;
}
