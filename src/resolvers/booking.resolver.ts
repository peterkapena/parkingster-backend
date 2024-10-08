import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { BookingService } from "../services/booking.service.js";
import { AvailableBayInfo } from "../schema/bay/get.available.bays.js";
import { BookingInput, BookingResponse } from "../schema/bay/create.booking.js";

@Resolver()
export default class BookingResolver {
    constructor(private bookingService: BookingService) {
        this.bookingService = new BookingService();
    }

    @Query(() => [AvailableBayInfo])
    async getAvailableBays(@Arg("destination") destination: string): Promise<AvailableBayInfo[]> {
        return await this.bookingService.getAvailableBays(destination);
    }

    @Mutation(() => BookingResponse)
    async createBooking(
        @Arg("bookingData") bookingData: BookingInput
    ): Promise<BookingResponse> {
        const { userId, parkingSpaceId, durationInHours } = bookingData;
        const { bayNumber, latitude, longitude } = await this.bookingService.createBooking(userId, parkingSpaceId, durationInHours);

        return {
            bayNumber,
            geoLocation: {
                latitude,
                longitude,
            },
        };
    }
}
