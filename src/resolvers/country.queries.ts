import { Arg, Query, Resolver } from "type-graphql";
import { Country } from "../entities/country.entity";

@Resolver()
export class CountryQueries {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find();
  }

  @Query(() => Country, { nullable: true })
  async country(
    @Arg("code", () => String) code: string
  ): Promise<Country | null> {
    return Country.findOne({ where: { code } });
  }
}
