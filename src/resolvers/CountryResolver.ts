import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/Country";
import { Continent } from "../entities/Continent";
import { validateOrReject } from "class-validator";

@Resolver()
export class CountryResolver {

  // Mutation pour créer un pays
  @Mutation(() => Country)
  async createCountry(
    @Arg("name") name: string,
    @Arg("code") code: string,
    @Arg("flag") flag: string,
    @Arg("continentCode") continentCode: string  
  ): Promise<Country> {
    try {
      // Récupérer le continent à partir du code en utilisant BaseEntity
      const continent = await Continent.findOne({
        where: { code: continentCode },
      });

      if (!continent) {
        throw new Error("Continent not found!");
      }

      // Création de l'objet Country avec les données
      const country = new Country();
      country.name = name;
      country.code = code;
      country.flag = flag;
      country.continent = continent;

      // Validation des données avant sauvegarde
      await validateOrReject(country).catch(errors => {
        throw new Error(`Validation failed! ${errors}`);
      });

      // Sauvegarde du pays dans la base de données
      await country.save();

      return country;  // Retourner le pays créé
    } catch (error) {
      console.error("Erreur lors de la création du pays:", error);
      throw new Error("Erreur lors de la création du pays.");
    }
  }

  // Query pour obtenir tous les pays
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    try {
      // Récupérer tous les pays avec leurs continents associés
      const countries = await Country.find({
        relations: ["continent"], // Inclure la relation continent dans la requête
      });
      return countries;
    } catch (error) {
      console.error("Erreur lors de la récupération des pays:", error);
      throw new Error("Erreur lors de la récupération des pays.");
    }
  }

  // Query pour obtenir un pays par son code
  @Query(() => Country, { nullable: true })
  async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    try {
      // Rechercher un pays par son code, avec la relation continent
      const country = await Country.findOne({
        where: { code },
        relations: ["continent"], // Inclure la relation continent dans la requête
      });
      return country;
    } catch (error) {
      console.error("Erreur lors de la récupération du pays par code:", error);
      throw new Error("Erreur lors de la récupération du pays par code.");
    }
  }

  // Query pour obtenir tous les pays d'un continent
  @Query(() => [Country])
  async getCountriesByContinent(@Arg("continentCode") continentCode: string): Promise<Country[]> {
    try {
      // Trouver le continent par son code
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