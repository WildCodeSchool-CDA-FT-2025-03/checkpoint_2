import { validate } from "class-validator";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Continent } from "../entities/continent.entity";
import { Country } from "../entities/country.entity";

@Resolver()
export class CountryResolver {
  @Mutation(() => Country)
  async createCountry(
    @Arg("code", () => String) code: string,
    @Arg("name", () => String) name: string,
    @Arg("flag", () => String) flag: string,
    @Arg("continentCode", () => String) continentCode: string
  ): Promise<Country> {
    const continent = await Continent.findOne({
      where: { code: continentCode },
    });
    if (!continent) {
      throw new Error(`Continent with code ${continentCode} not found`);
    }

    const country = Country.create({ code, name, flag, continent });

    const errors = await validate(country);
    if (errors.length > 0) {
      throw new Error(
        `Validation failed: ${errors.map((e) => e.constraints).join(", ")}`
      );
    }

    return country.save();
  }
}
