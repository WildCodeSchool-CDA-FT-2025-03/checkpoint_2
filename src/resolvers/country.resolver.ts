import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country, CountryInput } from "../entities/country.entity";

@Resolver(Country)
export default class CountryResolver {
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return Country.find();
  }

  @Query(() => Country)
  async getOneCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    return Country.findOne({ where: { code } });
  }

  @Mutation(() => Country)
  async createCountry(@Arg("countryInput") countryInput: CountryInput): Promise<Country> {
    const country = new Country();
    country.name = countryInput.name;
    country.code = countryInput.code;
    country.flag = countryInput.flag;
    await country.save();
    return country;
  }
}
