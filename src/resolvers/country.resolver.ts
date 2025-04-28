import { validate } from "class-validator";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Country } from "../entities/country.entity";

@Resolver()
export class CountryResolver {
  @Mutation(() => Country)
  async createCountry(
    @Arg("code", () => String) code: string,
    @Arg("name", () => String) name: string,
    @Arg("flag", () => String) flag: string
  ): Promise<Country> {
    const country = Country.create({ code, name, flag });

    const errors = await validate(country);
    if (errors.length > 0) {
      throw new Error(
        `Validation failed: ${errors.map((e) => e.constraints).join(", ")}`
      );
    }

    return country.save();
  }
}
