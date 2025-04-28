import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/country.entities";
import { CountryInput } from "../inputs/country.input";

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return await Country.find();
  }

  @Query(() => Country, { nullable: true })
  async getCountryByCode(
    @Arg("code") code: string
  ): Promise<Country | null> {
    return await Country.findOneBy({ code });
  }

  @Mutation(() => Country)
  async addCountry(
    @Arg("data") data: CountryInput
  ): Promise<Country> {
    const country = new Country();
    country.name = data.name;
    country.code = data.code;
    country.flag = data.flag;
  
    await country.save();
    return country;
  }
}