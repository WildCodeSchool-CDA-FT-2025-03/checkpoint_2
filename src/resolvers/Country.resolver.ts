import { Arg, Mutation } from "type-graphql";
import { Country, CountryInput } from "../entities/country.entity";


export class CountryResolver {

  @Mutation(() => Boolean)
  async createCountry(@Arg("data") data: CountryInput ) {
    const countryEntity = new Country()
    countryEntity.code = data.code;
    countryEntity.name = data.name;
    countryEntity.flag = data.flag;

    countryEntity.save();
    return true
  }


}