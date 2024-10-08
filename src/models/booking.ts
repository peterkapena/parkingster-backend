import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { ParkingBay } from './parking_bay.js';
import base_model from './base_model.js';

export class Booking extends base_model {
    @prop({ required: true })
    public userId!: string; // Reference to the user who made the booking (for now, just a string, can be a ref to a User model)

    @prop({ ref: () => ParkingBay, required: true })
    public parkingBay!: Ref<ParkingBay>; // Refers to the bay being booked

    @prop({ default: Date.now })
    public bookedAt!: Date; // Timestamp for when the booking was made

    @prop({ required: true })
    public expiresAt!: Date; // Timestamp for when the booking expires
}

export const BookingModel = getModelForClass(Booking);
