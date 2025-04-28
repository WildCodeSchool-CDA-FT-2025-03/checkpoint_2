import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Continent, ContinentInput } from "../entities/continent.entity";
import { Country } from "../entities/country.entity";

@Resolver(Continent)
export default class ContinentResolver {
  // Get all continents
  @Query(() => [Continent])
  async getAllContinents(): Promise<Continent[]> {
    return Continent.find({ relations: ["countries"] });
  }

  // Get one continent by id
  @Query(() => Continent)
  async getOneContinentById(@Arg("id") id: number): Promise<Continent | null> {
    return Continent.findOne({ where: { id }, relations: ["countries"] });
  }

  // Get all countries by continent code
  @Query(() => [Country])
  async getCountriesByContinent(@Arg("continentCode") continentCode: string): Promise<Country[]> {
    const continent = await Continent.findOne({
      where: { continent_code: continentCode },
      relations: ["countries"],
    });

    if (!continent) {
      throw new Error("Continent not found");
    }

    return continent.countries;
  }

  // Create a new continent
  @Mutation(() => Continent)
  async createContinent(@Arg("continentInput") continentInput: ContinentInput): Promise<Continent> {
    const continent = new Continent();
    continent.continent_name = continentInput.continent_name;
    continent.continent_code = continentInput.continent_code;
    await continent.save();
    return continent;
  }
}
