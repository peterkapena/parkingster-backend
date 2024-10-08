import { Resolver } from "type-graphql";
 
@Resolver()
export default class CameraResolver {
 
    // @Mutation(() => Camera)
    // async createCamera(
    //     @Arg("input") input: Partial<Camera>
    // ): Promise<Camera> {
    //     return this.cameraService.createCamera(input);
    // }

    // @Query(() => Camera)
    // async getCamera(
    //     @Arg("id") id: string
    // ): Promise<Camera> {
    //     return this.cameraService.getCamera(id);
    // }

    // @Mutation(() => Boolean)
    // async updateCamera(
    //     @Arg("id") id: string,
    //     @Arg("input") input: Partial<Camera>
    // ): Promise<Boolean> {
    //     return this.cameraService.updateCamera(id, input);
    // }

    // @Mutation(() => Boolean)
    // async deleteCamera(
    //     @Arg("id") id: string
    // ): Promise<Boolean> {
    //     return this.cameraService.deleteCamera(id);
    // }
}
