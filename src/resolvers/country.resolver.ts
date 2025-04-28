import { Resolver, Query } from "type-graphql";
import { Country } from "../entities/country.entity";

@Resolver(Country)
export default class CountryResolver {
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return Country.find();
  }
}
