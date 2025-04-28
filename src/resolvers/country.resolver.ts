import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/country.entity";
import { validate } from "class-validator";

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find();
  }

  @Query(() => Country)
  async country(@Arg("code") code: string): Promise<Country | null> {
    const country = await Country.findOne({ where: { code } });
    if (!country) {
      throw new Error("Country not found");
    }
    return country;
  }

  @Mutation(() => Country)
  async createCountry(@Arg("name") name: string, @Arg("code") code: string, @Arg("flag") flag: string): Promise<Country> {
    const country = new Country();
    country.name = name;
    country.code = code;
    country.flag = flag;
    
    const errors = await validate(country);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.map(e => Object.values(e.constraints || {}).join(', ')).join(', ')}`);
    }
    
    await country.save();
    return country;
  }
}