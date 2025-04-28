import { Resolver, Query } from "type-graphql";

@Resolver()
export class CountryResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello World';
  }
}