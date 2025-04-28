import { Resolver, Query } from "type-graphql";
import { Country } from "../entities/country.entity";

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find();
  }
}