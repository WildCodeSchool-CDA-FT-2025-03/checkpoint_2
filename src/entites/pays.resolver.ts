import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Pays } from "./pays.entity";
import { Length, IsNotEmpty, Validate, validate } from "class-validator";
import dataSource from "../db/data-source";

@Resolver()
export class PaysResolver {
  @Query(() => [Pays])
  async getPaysList() {
    const paysRepository = dataSource.getRepository(Pays);
    return paysRepository.find();
  }

  @Query(() => Pays, { nullable: true })
  async getPaysByCode(
    @Arg("code") code: string
  ) {
    const paysRepository = dataSource.getRepository(Pays);
    return paysRepository.findOneBy({ code });
  }

@Mutation(() => Pays)
async createPays(
  @Arg("name") name: string,
  @Arg("code") code: string,
  @Arg("flag") flag: string
) 
{
    const paysRepository = dataSource.getRepository(Pays)
  const NewPays = paysRepository.create({ name, code, flag });

  const errors = await validate(NewPays);
  if (errors.length > 0) {
    throw new Error(`Validation failed!`);
  }

  await paysRepository.save(NewPays);
  return NewPays;
}
}
