import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { Pays, PaysInput } from "../pays/pays.entity";
import { validate } from "graphql";
import { rmSync } from "fs";

@Resolver(Pays)
export class PaysResolver {
  @Query(() => [Pays])
  async getPays(): Promise<Pays[]> {
    return await Pays.find();
  }

  @Mutation(() => Boolean)
  async createPays(@Arg("data") data: PaysInput) {
    try {
      const { name, code, flag } = data;

      // creation du pays
      const newPays: Pays = new Pays();
      newPays.name = name;
      newPays.code = code;
      newPays.flag = flag;

      // Validation des données

      //const error = await validate(newPays)

      const result = await newPays.save();

      if (result.id) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error();
    }
  }
}
