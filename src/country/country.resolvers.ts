import { Query, Resolver } from "type-graphql";
import { Country } from "./country.entities";

@Resolver()
export class CountryResolvers {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return await Country.find();
  }
};