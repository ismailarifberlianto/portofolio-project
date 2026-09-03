require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../src/models/User");

async function seed() {
  const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || "Kebumen1234", 10);

  const admin = await User.firstOrCreate(
    { email: process.env.SEED_ADMIN_EMAIL || "admin@mail.com" },
    { username: "adminmail", email: process.env.SEED_ADMIN_EMAIL || "admin@mail.com", passwordHash }
  );

  console.log("Admin siap:", admin.email);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});