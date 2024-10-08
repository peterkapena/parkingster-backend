import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { ParkingSpace } from './parking_space.js';
import base_model from './base_model.js';


export class ParkingBay extends base_model {
    @prop({ required: true })
    public number!: string;

    @prop({ default: true })
    public isAvailable!: boolean;

    @prop({ ref: () => ParkingSpace, required: true })
    public parkingSpace!: Ref<ParkingSpace>;
}
export const ParkingBayModel = getModelForClass(ParkingBay);
