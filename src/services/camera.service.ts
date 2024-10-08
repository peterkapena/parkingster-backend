import { Camera, CameraModel } from "../models/camera.js";

export class CameraService {
  async createCamera(input: Partial<Camera>): Promise<Camera> {
    try {
      const camera = await CameraModel.create(input);
      return camera;
    } catch (error) {
      throw new Error(`Failed to create camera: ${error.message}`);
    }
  }

  async getCamera(id: string): Promise<Camera> {
    try {
      const camera = await CameraModel.findById(id).exec();
      if (!camera) {
        throw new Error("Camera not found");
      }
      return camera;
    } catch (error) {
      throw new Error(`Failed to retrieve camera: ${error.message}`);
    }
  }

  async updateCamera(id: string, input: Partial<Camera>): Promise<boolean> {
    try {
      const updatedCamera = await CameraModel.findByIdAndUpdate(id, input, { new: true }).exec();
      if (!updatedCamera) {
        throw new Error("Camera not found");
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to update camera: ${error.message}`);
    }
  }

  async deleteCamera(id: string): Promise<boolean> {
    try {
      const updatedCamera = await CameraModel.findByIdAndUpdate(
        id,
        { deleted: true, deletedOn: new Date().toISOString() },
        { new: true }
      ).exec();
      if (!updatedCamera) {
        throw new Error("Camera not found");
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to delete camera: ${error.message}`);
    }
  }
}
