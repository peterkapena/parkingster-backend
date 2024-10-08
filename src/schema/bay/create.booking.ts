import { Field, Float, InputType, ObjectType } from "type-graphql";

@InputType()
export class BookingInput {
  @Field()
  public userId!: string;
  
  @Field()
  public parkingSpaceId!: string;

  @Field()
  public durationInHours!: number;
}

@ObjectType()
export class GeoLocation {
  @Field(() => Float)
  public latitude!: number;

  @Field(() => Float)
  public longitude!: number;
}

@ObjectType()
export class BookingResponse {
  @Field()
  public bayNumber!: string;

  @Field(() => GeoLocation)
  public geoLocation!: GeoLocation;
}