import { Mutation, Query, Resolver, Arg, Int } from "type-graphql";
import { Country, CountryInput } from "./country.entities";

@Resolver()
export class CountryResolvers {
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return await Country.find();
  }

  @Mutation(() => Int)
  async createCountry(@Arg("data") data: CountryInput): Promise<number> {
    const country = new Country();
    country.name = data.name;
    country.code = data.code;
    country.flag = data.flag;
    const result = await country.save();
    return result.id;
  }
};