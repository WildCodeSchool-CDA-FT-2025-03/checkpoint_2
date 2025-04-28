import { Continent } from "../../continent/continent.entities";
import { dataSource } from "../client";

(async () => {
  console.info("Starting the migration");
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();
    await queryRunner.query("DELETE FROM continent");

    const continents = [
      { name: "Afrique" },
      { name: "Antarctique" },
      { name: "Asie" },
      { name: "Europe" },
      { name: "Amerique du nord" },
      { name: "Oceanie" },
      { name: "Amerique du sud" }
    ];

    for (const continent of continents) {
      const continentEntity = new Continent();
      continentEntity.name = continent.name;
      await queryRunner.manager.save(continentEntity);
    }

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
})();