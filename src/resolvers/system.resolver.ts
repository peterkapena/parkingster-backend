import { Resolver, Query, Authorized } from "type-graphql";
import packageJson from '../../package.json' assert { type: 'json' };
import { getVersions } from "../getVersions.js";

// console.log(packageJson.version);

@Resolver()
export default class SystemResolver {
  @Query(() => String)
  @Authorized()
  async getCurrentVersion(): Promise<String> {
    return packageJson.version;
  }

  @Authorized()
  @Query(() => [String])
  async getVersions(): Promise<String[]> {
    return getVersions()
  }
}