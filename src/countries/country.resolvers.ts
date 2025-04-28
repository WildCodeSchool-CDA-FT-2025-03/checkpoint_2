import { Mutation, Resolver, Query, Arg } from "type-graphql";
import { Country, CountryInput } from "./country.entity";
import { validate } from "class-validator";
import { Continent } from "../continents/continents.entity";

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
    const { continent, flag, name, code } = data;
    const newContinent = new Continent();
    newContinent.name = continent;

    const country = new Country();

    Object.assign(country, { flag, name, code });
    country.continent = newContinent;
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
