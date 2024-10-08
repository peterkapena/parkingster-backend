import StoneClass, { StoneModel } from "../models/stone.js";
import { GetStoneOutput } from "../schema/stone/get.stone.js";
import { CreateStoneInput, CreateStoneOutput } from "../schema/stone/create.stone.js";
import { UpdateStoneInput, UpdateStoneOutput } from "../schema/stone/update.stone.js";

export class StoneService {
    async createStone(input: CreateStoneInput): Promise<CreateStoneOutput> {
        let stone: StoneClass = {
            ...input
        }

        stone = await StoneModel.create(stone);

        return {
            _id: stone._id
        };
    }

    async getStone(input: String): Promise<GetStoneOutput> {
        try {
            const stone = await StoneModel.findById(input).exec();

            if (!stone) {
                throw new Error('Stone not found');
            }

            const getStone: GetStoneOutput = {
                available_size: stone.available_size,
                type: stone.material,
                material: stone.material,
                deleted: stone.deleted,
                _id: stone._id
            };

            return getStone;
        } catch (error) {
            throw new Error(`Failed to retrieve Stone: ${error.message}`);
        }
    }

    async updateStone(input: UpdateStoneInput): Promise<UpdateStoneOutput> {
        try {
            const stone = await StoneModel.findOneAndUpdate({ _id: input._id }, { ...input }, { new: true }).exec();

            if (!stone) {
                throw new Error('Stone not found');
            }

            const updatedStone: UpdateStoneOutput = {
                _id: stone._id,
                available_size: stone.available_size,
                material: stone.material,
                type: stone.type
            };

            return updatedStone;
        } catch (error) {
            throw new Error(`Failed to update Stone: ${error.message}`);
        }
    }

    async deleteStone(input: String): Promise<GetStoneOutput> {
        try {
            const stone = await StoneModel.findOneAndUpdate({ _id: input }, { deleted: true, deletedOn: new Date().toISOString() }, { new: true }).exec();

            if (!stone) {
                throw new Error('Stone not found');
            }

            const getStone: GetStoneOutput = {
                available_size: stone.available_size,
                type: stone.material,
                material: stone.material,
                deleted: stone.deleted,
                _id: stone._id
            };

            return getStone;
        } catch (error) {
            throw new Error(`Failed to delete Stone: ${error.message}`);
        }
    }

    async getStones(): Promise<GetStoneOutput[]> {
        try {
            const stones = await StoneModel.find({}).exec();
            return stones.map((stone) => ({
                available_size: stone.available_size,
                type: stone.material,
                material: stone.material,
                deleted: stone.deleted,
                _id: stone._id
            }));
        } catch (error) {
            throw new Error(`Failed to retrieve Stones: ${error.message}`);
        }
    }
}
