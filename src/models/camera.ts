import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import type { ParkingSpace as ParkingSpaceType } from "./parking_space.js";
import base_model from './base_model.js';

export class Camera extends base_model {
    @prop({ required: true })
    public ipAddress!: string;

    @prop({ required: true })
    public parkingSpace!: Ref<ParkingSpaceType>;
}
export const CameraModel = getModelForClass(Camera);
