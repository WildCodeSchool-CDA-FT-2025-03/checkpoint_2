import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Pays } from "../pays/pays.entity";

@Resolver(Pays)
export class PaysResolver {
  @Query(() => [Pays])
  async getHello(): Promise<Pays[]> {
    return await Pays.find();
  }
}
