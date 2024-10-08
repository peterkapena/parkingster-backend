import { Booking, BookingModel } from "../models/booking.js";
import { ParkingBayModel } from "../models/parking_bay.js";
import { ParkingSpaceModel } from "../models/parking_space.js";
import { AvailableBayInfo } from "../schema/bay/get.available.bays.js";

export class BookingService {
  //TODO: automatic check of booking that are expired and not available, make them available and remove the expiry entry
  async bookAvailableBay(destination: string, userId: string) {
    try {
      // Find parking spaces at the given destination
      const parkingSpaces = await ParkingSpaceModel.find({ geoLocation: destination }).exec();

      if (!parkingSpaces || parkingSpaces.length === 0) {
        throw new Error("No parking spaces found for the given destination");
      }

      // Iterate through parking spaces to find an available bay
      for (const parkingSpace of parkingSpaces) {
        const bays = await ParkingBayModel.find({ parkingSpace: parkingSpace._id, isAvailable: true }).exec();

        if (bays.length > 0) {
          // Book the first available bay
          const bayToBook = bays[0];

          // Create a booking
          const booking = await BookingModel.create({
            userId,
            parkingBay: bayToBook._id,
            bookedAt: new Date(),
            expiresAt: new Date(Date.now() + 60 * 60 * 1000), // Booking expires in 1 hour
          });

          // Update the bay availability
          bayToBook.isAvailable = false;
          await bayToBook.save();

          return {
            bookingId: booking._id,
            bayNumber: bayToBook.number,
            geoLocation: parkingSpace.geoLocation,
          };
        }
      }

      throw new Error("No available parking bays found");
    } catch (error) {
      throw new Error(`Failed to book parking bay: ${error.message}`);
    }
  }

  async getAvailableBays(destination: string): Promise<AvailableBayInfo[]> {
    try {
      // Find parking spaces close to the given destination
      const [lat, lng] = destination.split(",").map(coord => parseFloat(coord.trim()));
      const parkingSpaces = await ParkingSpaceModel.find({
        geoLocation: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lng, lat]
            },
            $maxDistance: 500 // distance in meters
          }
        }
      }).exec();

      const availableBays: AvailableBayInfo[] = [];
      for (const parkingSpace of parkingSpaces) {
        let availableBaysCount = 0;

        // Iterate over each bay and fetch manually
        for (const bayId of parkingSpace.bays) {
          const bay = await ParkingBayModel.findById(bayId).exec();
          if (bay && bay.isAvailable) {
            availableBaysCount++;
          }
        }

        if (availableBaysCount > 0) {
          availableBays.push({
            latitude: parkingSpace.geoLocation.coordinates[1],
            longitude: parkingSpace.geoLocation.coordinates[0],
            bayCount: availableBaysCount,
            parkingSpaceId: parkingSpace.id
          });
        }
      }

      return availableBays;
    } catch (error) {
      throw new Error(`Failed to get available bays: ${error.message}`);
    }
  }

  async createBooking(userId: string, parkingSpaceId: string, durationInHours: number): Promise<{ bayNumber: string; latitude: number; longitude: number; }> {
    try {
      // Find the parking space by ID
      const parkingSpace = await ParkingSpaceModel.findById(parkingSpaceId).populate('bays').exec();

      if (!parkingSpace) {
        throw new Error("Parking space not found");
      }

      // Find the first available bay in the parking space
      let availableBay = null;
      for (const bayId of parkingSpace.bays) {
        const bay = await ParkingBayModel.findById(bayId).exec();
        if (bay && bay.isAvailable) {
          availableBay = bay;
          break;
        }
      }

      if (!availableBay) {
        throw new Error("No available bays in the selected parking space");
      }

      // Set the bay as not available
      availableBay.isAvailable = false;
      await availableBay.save();

      // Create the booking
      const expiresAt = new Date(Date.now() + durationInHours * 60 * 60 * 1000);
      await BookingModel.create({
        userId,
        parkingBay: availableBay._id,
        bookedAt: new Date(),
        expiresAt,
      });

      // Return the bay number and geo-location of the parking space
      const [longitude, latitude] = parkingSpace.geoLocation.coordinates;
      return {
        bayNumber: availableBay.number,
        latitude,
        longitude,
      };
    } catch (error) {
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  }

  async getBooking(id: string): Promise<Booking> {
    try {
      const booking = await BookingModel.findById(id).populate("parkingBay").exec();
      if (!booking) {
        throw new Error("Booking not found");
      }
      return booking;
    } catch (error) {
      throw new Error(`Failed to retrieve booking: ${error.message}`);
    }
  }

  async updateBooking(id: string, input: Partial<Booking>): Promise<boolean> {
    try {
      const updatedBooking = await BookingModel.findByIdAndUpdate(id, input, { new: true }).exec();
      if (!updatedBooking) {
        throw new Error("Booking not found");
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to update booking: ${error.message}`);
    }
  }

  async deleteBooking(id: string): Promise<boolean> {
    try {
      const updatedBooking = await BookingModel.findByIdAndUpdate(
        id,
        { deleted: true, deletedOn: new Date().toISOString() },
        { new: true }
      ).exec();
      if (!updatedBooking) {
        throw new Error("Booking not found");
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to delete booking: ${error.message}`);
    }
  }
}
