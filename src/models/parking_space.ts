import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import type { ParkingBay } from './parking_bay.js';
import { Camera } from './camera.js';
import base_model from './base_model.js';
import { Schema } from 'mongoose';

export class ParkingSpace extends base_model {
    @prop({
        type: Schema.Types.Mixed,
        required: true,
        index: '2dsphere', 
    })
    public geoLocation!: {
        type: 'Point';
        coordinates: [number, number];
    };

    @prop({})
    public bays!: Ref<ParkingBay>[];

    @prop({ ref: () => Camera })
    public cameras!: Ref<Camera>[];
}

export const ParkingSpaceModel = getModelForClass(ParkingSpace);
