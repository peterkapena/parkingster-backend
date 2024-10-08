import { Mutation, Resolver, Arg, Query } from "type-graphql";
import { CreateStoneInput, CreateStoneOutput } from "../schema/stone/create.stone.js";
import { GetStoneOutput } from "../schema/stone/get.stone.js";
import { UpdateStoneOutput, UpdateStoneInput } from "../schema/stone/update.stone.js";
import { StoneService } from "../services/stone.service.js";

@Resolver()
export default class StoneResolver {
    constructor(private stoneService: StoneService) {
        this.stoneService = new StoneService();
    }

    @Mutation(() => CreateStoneOutput)
    async createStone(
        @Arg("input") input: CreateStoneInput
    ): Promise<CreateStoneOutput> {
        return this.stoneService.createStone(input);
    }

    @Query(() => GetStoneOutput)
    async getStone(
        @Arg("input") input: String
    ): Promise<GetStoneOutput> {
        return this.stoneService.getStone(input);
    }

    @Mutation(() => UpdateStoneOutput)
    async updateStone(
        @Arg("input") input: UpdateStoneInput
    ): Promise<UpdateStoneOutput> {
        return this.stoneService.updateStone(input);
    }

    @Mutation(() => GetStoneOutput)
    async deleteStone(
        @Arg("input") input: String
    ): Promise<GetStoneOutput> {
        return this.stoneService.deleteStone(input);
    }

    @Query(() => [GetStoneOutput])
    async getStones(): Promise<GetStoneOutput[]> {
        return this.stoneService.getStones();
    }
}