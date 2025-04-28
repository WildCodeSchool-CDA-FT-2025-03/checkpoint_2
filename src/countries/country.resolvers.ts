import { Mutation, Resolver, Query, Arg } from "type-graphql";
import { Country, CountryInput } from "./country.entity";
import { validate } from "class-validator";

@Resolver()
class CountryResolver {
  @Query(() => [Country])
  async getAllCountry() {
    return await Country.find();
  }

  @Query(() => Country)
  async getOneCountryByCode(@Arg("code") code: string) {
    return await Country.findOneByOrFail({ code });
  }

  @Mutation(() => Country)
  async create(@Arg("data") data: CountryInput) {
    const country = new Country();

    Object.assign(country, data);
    // const error = await validate(country);
    // console.log(error);

    // if (error.length > 0) {
    //   throw new Error("Champs invalides");
    // }
    const newCountry = await country.save();
    return newCountry;
  }
}

export default CountryResolver;
