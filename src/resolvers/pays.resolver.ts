import { Arg, InputType, Mutation, Resolver, Query, Field } from "type-graphql";
import { PaysEntity } from "../entities/pays.entity";

@InputType()
export class PaysInput {
  constructor() {
    this.name = "";
    this.code = "";
    this.flag = "";
  }

  @Field()
  name: string;
  @Field()
  code: string;
  @Field()
  flag: string;
}

@Resolver(PaysEntity)
class PaysResolver {
  @Query(() => [PaysEntity])
  async getPays(): Promise<PaysEntity[]> {
    const pays = await PaysEntity.find();
    return pays;
  }

  @Query(() => PaysEntity)
  async getOnePays(@Arg("code") code: string): Promise<PaysEntity> {
    const pays = await PaysEntity.findOne({ where: { code: code } });
    return pays;
  }

  @Mutation(() => String)
  async createPays(@Arg("pays") pays: PaysInput): Promise<string> {
    const new_pays = new PaysEntity();
    new_pays.name = pays.name;
    new_pays.flag = pays.flag;
    new_pays.code = pays.code;

    const result = await new_pays.save();

    return `${result.id}`;
  }
}

export default PaysResolver;
