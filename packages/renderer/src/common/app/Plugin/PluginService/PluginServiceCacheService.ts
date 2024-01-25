import { DataSource, DataSourceOptions } from "typeorm";

export interface PluginServiceCacheService {
  data_source: DataSource;
}

export interface PluginServiceCacheServiceOption {
  database_name: string;
  typeorm?: (option: DataSourceOptions) => DataSourceOptions;
}

export function create_PluginServiceCacheService(
  option: PluginServiceCacheServiceOption
): PluginServiceCacheService {
  const typeorm_transfer = option.typeorm ?? ((it) => it);

  const dsoptions: DataSourceOptions = typeorm_transfer({
    type: "sqlite",
    database: option.database_name,
    entities: [],
  });

  const data_source = new DataSource(dsoptions);

  return {
    data_source,
  };
}
