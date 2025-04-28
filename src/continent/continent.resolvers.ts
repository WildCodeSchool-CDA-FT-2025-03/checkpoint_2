import { Query, Resolver, Arg } from "type-graphql";
import { ContinentInput } from "./continent.entities";
import { Country } from "../country/country.entities";

@Resolver()
export class ContinentResolvers {
  @Query(() => [Country])
  async getAllCountriesByContinent(@Arg("myContinent") myContinent: ContinentInput): Promise<Country[]> {
    return await Country.find({
        relations: {
          continent: true
        },
        where: {
          continent: { name: myContinent.name }
        }
     }
    );
  }
};