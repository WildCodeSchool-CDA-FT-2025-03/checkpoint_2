import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Continent } from "../entities/Continent";
import { Country } from "../entities/Country";
import { AppDataSource } from "../data-source";
import { validateOrReject } from "class-validator";

@Resolver()
export class ContinentResolver {

  // Mutation pour créer un continent
  @Mutation(() => Continent)
  async createContinent(
    @Arg("name") name: string,
    @Arg("code") code: string
  ): Promise<Continent> {
    try {
      const continent = new Continent();
      continent.name = name;
      continent.code = code;

      // Validation des données avant la sauvegarde
      await validateOrReject(continent).catch(errors => {
        throw new Error(`Validation failed! ${errors}`);
      });

      // Sauvegarder le continent dans la base de données
      await continent.save();  
      return continent;
    } catch (error) {
      console.error("Erreur lors de la création du continent:", error);
      throw new Error("Erreur lors de la création du continent.");
    }
  }

  // Query pour obtenir tous les continents
  @Query(() => [Continent])
  async getAllContinents(): Promise<Continent[]> {
    try {
      const continents = await Continent.find();
      return continents;
    } catch (error) {
      console.error("Erreur lors de la récupération des continents:", error);
      throw new Error("Erreur lors de la récupération des continents.");
    }
  }

  // Query pour obtenir un continent par son code
  @Query(() => Continent, { nullable: true })
  async getContinentByCode(@Arg("code") code: string): Promise<Continent | null> {
    try {
      const continent = await Continent.findOne({
        where: { code },
        relations: ["countries"], // Inclure les pays associés
      });
      return continent;
    } catch (error) {
      console.error("Erreur lors de la récupération du continent:", error);
      throw new Error("Erreur lors de la récupération du continent.");
    }
  }

  // Query pour obtenir les pays d'un continent
  @Query(() => [Country])
  async getCountriesByContinent(@Arg("continentCode") continentCode: string): Promise<Country[]> {
    try {
      // Trouver le continent par son code via BaseEntity
      const continent = await Continent.findOne({
        where: { code: continentCode },
        relations: ["countries"],  // Inclure les pays associés au continent
      });

      if (!continent) {
        throw new Error("Continent not found!");
      }

      // Retourner les pays associés au continent
      return continent.countries;
    } catch (error) {
      console.error("Erreur lors de la récupération des pays par continent:", error);
      throw new Error("Erreur lors de la récupération des pays par continent.");
    }
  }
}