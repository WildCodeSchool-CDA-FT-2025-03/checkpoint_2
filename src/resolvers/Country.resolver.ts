import { Arg, Mutation, Query } from "type-graphql";
import { Country, CountryInput } from "../entities/country.entity";
import { EntityNotFoundError } from "typeorm";
import { ApolloError } from "apollo-server-errors";
import { validate } from "class-validator";


export class CountryResolver {

  @Mutation(() => Boolean)
  async createCountry(@Arg("data") data: CountryInput ) {
    const countryEntity = new Country()
    countryEntity.code = data.code;
    countryEntity.name = data.name;
    countryEntity.flag = data.flag;

    const error = await validate(countryEntity);
    if (error.length > 0) {
      console.error(error)
      throw new Error("validation failed")
    }
    countryEntity.save();
    return true
  }

  @Query(() => [Country])
  async getCountries(): Promise<Country[] | null> {
    return await Country.find();
  }

  @Query(() => Country)
  async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    try {
      return await Country.findOneOrFail({ where: { code } })
    } catch (error) {
      console.log(error)
      if (error instanceof EntityNotFoundError) {
        throw new ApolloError(
          `Country code ${code} not found`,
          "COUNTRY_NOT_FOUND",
          { code }
        );
      }
    }
  }
}