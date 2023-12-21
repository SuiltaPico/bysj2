import { app } from "electron";
import { DataSource, DataSourceOptions } from "typeorm";

const options: DataSourceOptions = {
  type: "sqlite",
  database: `${app.getPath("userData")}/data/main.sqlite`,
  entities: ["./entity/*.js"],
};

async function main() {
  const data_source = new DataSource(options);
  await data_source.initialize();
  console.log(data_source);
}

main();
