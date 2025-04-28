import { Mutation, Query, Resolver, Arg, Int } from "type-graphql";
import { Country, CountryInput } from "./country.entities";
import { validate } from 'class-validator';

@Resolver()
export class CountryResolvers {
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return await Country.find();
  }

  @Query(() => Country)
  async getCountriesByCode(@Arg("code") code: string): Promise<Country | null> {
    return await Country.findOne({
      where: { code : code }
    });
  }

  @Mutation(() => Int)
  async createCountry(@Arg("data") data: CountryInput): Promise<number> {
    const country = new Country();
    country.name = data.name;
    country.code = data.code;
    country.flag = data.flag;
    const ifError = await validate(country).then(errors => {
      if (errors.length > 0) {
        console.error(errors);
        return -1;
      }
      return 1;
    });
    if(ifError === 1) {
      const result = await country.save();
      return result.id;
    }
    return -1;
  }
};