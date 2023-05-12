import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserBarVisited } from "./entity/user-bar-visited";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [UserBarVisited],
  migrations: [],
  subscribers: [],
});
