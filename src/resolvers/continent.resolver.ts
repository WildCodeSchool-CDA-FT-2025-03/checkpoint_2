import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { Continent } from "../entities/continent.entity";
import { Country } from "../entities/country.entity";
import { validate } from "class-validator";

@Resolver(of => Continent)
export class ContinentResolver {
  @Query(() => [Continent])
  async continents(): Promise<Continent[]> {
    return Continent.find();
  }

  @Query(() => Continent)
  async continent(@Arg("code", () => String) code: string): Promise<Continent | null> {
    const continent = await Continent.findOne({ where: { code } });
    if (!continent) {
      throw new Error("Continent not found");
    }
    return continent;
  }

  @Query(() => [Country])
  async countriesByContinent(@Arg("continentCode", () => String) continentCode: string): Promise<Country[]> {
    const continent = await Continent.findOne({ where: { code: continentCode } });
    if (!continent) {
      throw new Error("Continent not found");
    }
    
    return Country.find({ 
      where: { continent: { id: continent.id } },
      relations: ["continent"] 
    });
  }

  @Mutation(() => Continent)
  async createContinent(
    @Arg("name", () => String) name: string, 
    @Arg("code", () => String) code: string
  ): Promise<Continent> {
    const continent = new Continent();
    continent.name = name;
    continent.code = code;
    
    const errors = await validate(continent);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.map(e => Object.values(e.constraints || {}).join(', ')).join(', ')}`);
    }
    
    await continent.save();
    return continent;
  }
} 