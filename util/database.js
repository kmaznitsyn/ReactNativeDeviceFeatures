import * as SQLite from "expo-sqlite";

const database = await SQLite.openDatabaseAsync("places.db");
database.execSync(`
  CREATE TABLE IF NOT EXISTS places (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  imageUri TEXT NOT NULL,
  address TEXT NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL
  )
  `);
