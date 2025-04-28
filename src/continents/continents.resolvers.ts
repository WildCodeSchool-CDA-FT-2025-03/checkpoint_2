import { Resolver, Query, Arg } from "type-graphql";
import { Continent } from "./continents.entity";

@Resolver()
class ContinentResolver {
  @Query(() => Continent)
  async getOneContinentByCode(@Arg("name") name: string) {
    return await Continent.findOne({
      where: { name },
      relations: ["country"],
    });
  }
}

export default ContinentResolver;
