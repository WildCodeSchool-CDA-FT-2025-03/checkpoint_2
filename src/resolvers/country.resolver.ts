import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/country.entity";

@Resolver(Country)
export default class CountryResolver {
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return Country.find();
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("name") name: string,
    @Arg("code") code: string,
    @Arg("flag") flag: string
  ): Promise<Country> {
    const country = Country.create({
      name: name || "",
      code: code || "",
      flag: flag || "",
    });
    await country.save();
    return country;
  }
}
