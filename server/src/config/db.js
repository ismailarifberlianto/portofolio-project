require("dotenv").config();
const { MongoClient } = require("mongodb");

const {
  MONGOLOQUENT_DATABASE_URI = "mongodb://localhost:27017",
  MONGOLOQUENT_DATABASE_NAME = "mongoloquent",
} = process.env;

async function connectDB() {
  const client = new MongoClient(MONGOLOQUENT_DATABASE_URI);

  try {
    await client.connect();
    await client.db(MONGOLOQUENT_DATABASE_NAME).command({ ping: 1 });
    console.log(`MongoDB connected, database name: "${MONGOLOQUENT_DATABASE_NAME}"`);
  } catch (err) {
    console.error("Failed to connect MongoDB :", err.message);
    process.exit(1); // hentikan proses kalau DB tidak bisa diakses
  } finally {
    await client.close(); // koneksi test ini ditutup; Mongoloquent buka koneksinya sendiri saat dipakai model
  }
}

module.exports = connectDB;