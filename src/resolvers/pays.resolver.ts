import { Arg, InputType, Mutation, Resolver, Query, Field } from "type-graphql";
import { PaysEntity } from "../entities/pays.entity";
import { ContinentEntity } from "../entities/continents.entity";

@InputType()
export class ContinentInput {
  @Field()
  name: string;
}

@InputType()
export class PaysInput {
  @Field()
  name: string;
  @Field()
  code: string;
  @Field()
  flag: string;

  @Field()
  continent: string;
}

@Resolver(PaysEntity)
class PaysResolver {
  @Query(() => [PaysEntity])
  async getPays(): Promise<PaysEntity[]> {
    const pays = await PaysEntity.find({ relations: ["continent_entity"] });
    return pays;
  }

  @Query(() => PaysEntity)
  async getOnePays(@Arg("code") code: string): Promise<PaysEntity> {
    const pays = await PaysEntity.findOne({ where: { code: code } });
    return pays;
  }

  @Query(() => [PaysEntity])
  async getPaysContient(
    @Arg("continent") continent: ContinentInput,
  ): Promise<PaysEntity[]> {
    const pays = await PaysEntity.find({
      relations: ["continent_entity"],
      where: { continent_entity: continent },
    });
    return pays;
  }

  @Mutation(() => String)
  async createPays(@Arg("pays") pays: PaysInput): Promise<string> {
    let current_continent = null;
    const continent = (await ContinentEntity.findOne({
      where: { name: pays.continent },
    })) as ContinentEntity;

    if (continent) {
      current_continent = continent;
    } else {
      current_continent = new ContinentEntity();
      current_continent.name = pays.continent;
      current_continent.pays = [];
      await current_continent.save();
    }

    const new_pays = new PaysEntity();
    new_pays.name = pays.name;
    new_pays.flag = pays.flag;
    new_pays.code = pays.code;
    new_pays.continent_entity = current_continent;

    const result = await new_pays.save();

    return `${result.id}`;
  }
}

export default PaysResolver;
