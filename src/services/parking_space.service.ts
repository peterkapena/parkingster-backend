import { ParkingSpace, ParkingSpaceModel } from "../models/parking_space.js";

export class ParkingSpaceService {
  async createParkingSpace(input: Partial<ParkingSpace>): Promise<ParkingSpace> {
    try {
      const parkingSpace = await ParkingSpaceModel.create(input);
      return parkingSpace;
    } catch (error) {
      throw new Error(`Failed to create parking space: ${error.message}`);
    }
  }

  async getParkingSpace(id: string): Promise<ParkingSpace> {
    try {
      const parkingSpace = await ParkingSpaceModel.findById(id).populate("bays cameras").exec();
      if (!parkingSpace) {
        throw new Error("Parking space not found");
      }
      return parkingSpace;
    } catch (error) {
      throw new Error(`Failed to retrieve parking space: ${error.message}`);
    }
  }

  async updateParkingSpace(id: string, input: Partial<ParkingSpace>): Promise<boolean> {
    try {
      const updatedSpace = await ParkingSpaceModel.findByIdAndUpdate(id, input, { new: true }).exec();
      if (!updatedSpace) {
        throw new Error("Parking space not found");
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to update parking space: ${error.message}`);
    }
  }

  async deleteParkingSpace(id: string): Promise<boolean> {
    try {
      const updatedSpace = await ParkingSpaceModel.findByIdAndUpdate(
        id,
        { deleted: true, deletedOn: new Date().toISOString() },
        { new: true }
      ).exec();
      if (!updatedSpace) {
        throw new Error("Parking space not found");
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to delete parking space: ${error.message}`);
    }
  }
}
