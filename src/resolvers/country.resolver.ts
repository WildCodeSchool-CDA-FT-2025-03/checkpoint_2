import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country, CountryInput } from "../entities/country.entity";
import { Continent } from "../entities/continent.entity";

@Resolver(Country)
export default class CountryResolver {
  // Get all countries
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return Country.find({ relations: ["continent"] });
  }

  // Get one country by code
  @Query(() => Country)
  async getOneCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    return Country.findOne({ where: { code }, relations: ["continent"] });
  }

  // Create a new country
  @Mutation(() => Country)
  async createCountry(
    @Arg("countryInput") countryInput: CountryInput,
    @Arg("continentCode") continentCode: string
  ): Promise<Country> {
    const continent = await Continent.findOne({ where: { continent_code: continentCode } });
    if (!continent) {
      throw new Error("Continent not found");
    }

    const country = new Country();
    country.name = countryInput.name;
    country.code = countryInput.code;
    country.flag = countryInput.flag;
    country.continent = continent;

    await country.save();
    return country;
  }
}
