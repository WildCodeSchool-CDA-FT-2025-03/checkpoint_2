import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/country.entity";
import { Continent } from "../entities/continent.entity";
import { validate } from "class-validator";

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find({ relations: ["continent"] });
  }

  @Query(() => Country)
  async country(@Arg("code", () => String) code: string): Promise<Country | null> {
    const country = await Country.findOne({ 
      where: { code },
      relations: ["continent"]
    });
    if (!country) {
      throw new Error("Country not found");
    }
    return country;
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("name", () => String) name: string, 
    @Arg("code", () => String) code: string, 
    @Arg("flag", () => String) flag: string,
    @Arg("continentCode", () => String) continentCode: string
  ): Promise<Country> {
    const continent = await Continent.findOne({ where: { code: continentCode } });
    if (!continent) {
      throw new Error("Continent not found");
    }

    const country = new Country();
    country.name = name;
    country.code = code;
    country.flag = flag;
    country.continent = continent;
    
    const errors = await validate(country);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.map(e => Object.values(e.constraints || {}).join(', ')).join(', ')}`);
    }
    
    await country.save();
    return country;
  }
}