import { Resolver } from "type-graphql";
import { PaysEntity } from "../entities/pays.entity";

@Resolver(PaysEntity)
class PaysResolver {}

export default PaysResolver;
