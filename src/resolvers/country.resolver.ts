import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { validate } from "class-validator";
import { Country } from "../entities/country.entity";

@Resolver()
export class CountryResolver {
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
