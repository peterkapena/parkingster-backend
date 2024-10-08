import { ParkingBay, ParkingBayModel } from "../models/parking_bay.js";

export class ParkingBayService {
  async createParkingBay(input: Partial<ParkingBay>): Promise<ParkingBay> {
    try {
      const parkingBay = await ParkingBayModel.create(input);
      return parkingBay;
    } catch (error) {
      throw new Error(`Failed to create parking bay: ${error.message}`);
    }
  }

  async getParkingBay(id: string): Promise<ParkingBay> {
    try {
      const parkingBay = await ParkingBayModel.findById(id).exec();
      if (!parkingBay) {
        throw new Error("Parking bay not found");
      }
      return parkingBay;
    } catch (error) {
      throw new Error(`Failed to retrieve parking bay: ${error.message}`);
    }
  }

  async updateParkingBay(id: string, input: Partial<ParkingBay>): Promise<boolean> {
    try {
      const updatedBay = await ParkingBayModel.findByIdAndUpdate(id, input, { new: true }).exec();
      if (!updatedBay) {
        throw new Error("Parking bay not found");
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to update parking bay: ${error.message}`);
    }
  }

  async deleteParkingBay(id: string): Promise<boolean> {
    try {
      const updatedBay = await ParkingBayModel.findByIdAndUpdate(
        id,
        { deleted: true, deletedOn: new Date().toISOString() },
        { new: true }
      ).exec();
      if (!updatedBay) {
        throw new Error("Parking bay not found");
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to delete parking bay: ${error.message}`);
    }
  }
}
