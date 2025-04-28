import { Arg, Query, Resolver } from "type-graphql";
import { Continent } from "../entities/continent.entity";
import { Country } from "../entities/country.entity";

@Resolver()
export class ContinentQueries {
  @Query(() => [Continent])
  async continents(): Promise<Continent[]> {
    return await Continent.find();
  }

  @Query(() => Continent, { nullable: true })
  async continent(
    @Arg("code", () => String) code: string
  ): Promise<Continent | null> {
    return await Continent.findOne({ where: { code } });
  }

  @Query(() => [Country])
  async countriesByContinent(
    @Arg("continentCode", () => String) continentCode: string
  ): Promise<Country[]> {
    const continent = await Continent.findOne({
      where: { code: continentCode },
      relations: ["countries"],
    });

    if (!continent) {
      throw new Error(`Continent with code ${continentCode} not found`);
    }

    return continent.countries;
  }
}
