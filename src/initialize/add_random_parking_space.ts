import { ParkingSpaceModel } from "../models/parking_space.js";
import { CameraModel } from "../models/camera.js";
import { ParkingBayModel } from "../models/parking_bay.js";

export async function addRandomParkingSpaces() {
    try {
        // Delete existing parking spaces, cameras, and bays
        await ParkingSpaceModel.deleteMany({});
        await ParkingBayModel.deleteMany({});
        await CameraModel.deleteMany({});

        // Array of three random geolocations for the Bellville area
        const parkingSpaceGeoLocations = [
            "-33.8984, 18.6296", // Bellville, Cape Town - Random coordinates
            "-33.9005, 18.6262",
            "-33.8968, 18.6334",
        ];

        for (const geoLocation of parkingSpaceGeoLocations) {
            // Split the geoLocation into latitude and longitude
            const [lat, lng] = geoLocation.split(",").map(coord => parseFloat(coord.trim()));

            // Create a new parking space with GeoJSON format
            const parkingSpace = await ParkingSpaceModel.create({
                geoLocation: {
                    type: "Point",
                    coordinates: [lng, lat]
                }
            });

            // Add between 30 to 50 parking bays for this parking space
            const numBays = Math.floor(Math.random() * 21) + 30; // Random number between 30 and 50
            const parkingBays = [];

            for (let i = 0; i < numBays; i++) {
                const parkingBay = await ParkingBayModel.create({
                    number: `Bay-${i + 1}`,
                    isAvailable: true,
                    parkingSpace: parkingSpace._id,
                });
                parkingBays.push(parkingBay);
            }

            // Update the parking space to include the bays
            parkingSpace.bays = parkingBays.map((bay) => bay._id);
            await parkingSpace.save();

            // Add 3 cameras for this parking space
            const cameras = [];
            for (let i = 0; i < 3; i++) {
                const camera = await CameraModel.create({
                    ipAddress: `192.168.1.${Math.floor(Math.random() * 100)}`,
                    parkingSpace: parkingSpace._id,
                });
                cameras.push(camera);
            }

            // Update the parking space to include the cameras
            parkingSpace.cameras = cameras.map((camera) => camera._id);
            await parkingSpace.save();

            console.log(`Parking space at [${lat}, ${lng}] created with ${numBays} bays and 3 cameras.`);
        }
    } catch (error) {
        console.error(`Failed to create parking spaces: ${error.message}`);
    }
}
