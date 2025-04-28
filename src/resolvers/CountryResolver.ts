import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Country } from "../entities/Country";
import { AppDataSource } from "../data-source";


@Resolver()
export class CountryResolver {
  private countryRepository = AppDataSource.getRepository(Country);


  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return await this.countryRepository.find();
  }

  @Query(() => Country, { nullable: true })
  async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    return await this.countryRepository.findOneBy({ code });
  }
}