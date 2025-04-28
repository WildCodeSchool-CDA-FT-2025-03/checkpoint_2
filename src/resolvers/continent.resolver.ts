import { Arg, Mutation, Resolver } from "type-graphql";
import { Continent } from "../entities/continent.entity";

@Resolver()
export class ContinentResolver {
  @Mutation(() => Continent)
  async createContinent(
    @Arg("name", () => String) name: string,
    @Arg("code", () => String) code: string
  ): Promise<Continent> {
    const continent = Continent.create({ name, code });
    return await continent.save();
  }
}
