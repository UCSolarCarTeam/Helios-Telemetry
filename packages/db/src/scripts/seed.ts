import "dotenv/config";
import { generateFakeTelemetryData } from "@shared/helios-types/src/functions";
import { prisma } from "../data-source";
import { flattenTelemetryData } from "../services/DatabaseService";

/**
 * Seed script to populate the database with sample data
 *
 * This creates:
 * - 5 sample drivers with unique RFIDs
 * - Sample telemetry packets for each driver using generateFakeTelemetryData() from shared
 * - Sample lap data for each driver
 */

// Sample driver data
const sampleDrivers = [
  { rfid: "DRIVER001", Name: "Alex Johnson" },
  { rfid: "DRIVER002", Name: "Sarah Chen" },
  { rfid: "DRIVER003", Name: "Marcus Williams" },
  { rfid: "DRIVER004", Name: "Emma Rodriguez" },
  { rfid: "DRIVER005", Name: "David Kim" },
];

// Helper to generate random value within range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Helper to generate timestamp in the past
const pastTimestamp = (hoursAgo: number, minutesAgo: number = 0) => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date;
};

async function seed() {
  console.log("🌱 Starting database seeding...\n");

  try {
    // Initialize database connection
    await prisma.$connect();
    console.log("✅ Database connected");

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("\n🗑️  Clearing existing data...");
    await prisma.$executeRawUnsafe('DELETE FROM "telemetry_packet"');
    await prisma.$executeRawUnsafe('DELETE FROM "lap"');
    await prisma.$executeRawUnsafe('DELETE FROM "driver"');
    console.log("✅ Existing data cleared");

    // Seed Drivers
    console.log("\n👤 Seeding drivers...");
    for (const driver of sampleDrivers) {
      await prisma.$executeRawUnsafe(
        'INSERT INTO "driver" ("rfid", "Name") VALUES ($1, $2)',
        driver.rfid,
        driver.Name,
      );
    }
    const drivers = sampleDrivers;
    console.log(`✅ Created ${drivers.length} drivers`);

    // Seed Lap Data
    console.log("\n🏁 Seeding lap data...");
    const laps = [];
    for (let i = 0; i < drivers.length; i++) {
      const driver = drivers[i];
      // Create 3-5 laps per driver
      const lapCount = Math.floor(random(3, 6));
      
      for (let j = 0; j < lapCount; j++) {
        laps.push({
          rfid: driver.rfid,
          timestamp: pastTimestamp(i + 1, j * 10),
          LapTime: random(120, 180), // 2-3 minutes
          TotalPowerIn: random(1000, 1500),
          TotalPowerOut: random(800, 1200),
          NetPowerOut: random(700, 1000),
          Distance: random(2000, 3000), // meters
          EnergyConsumed: random(500, 800),
          AmpHours: random(10, 20),
          AveragePackCurrent: random(50, 80),
          BatterySecondsRemaining: random(3600, 7200),
          AverageSpeed: random(40, 60), // km/h
          AverageMotorWattage: random(800, 1200),
        });
      }
    }
    for (const lap of laps) {
      const entries = Object.entries(lap);
      const columns = entries.map(([key]) => `"${key}"`).join(", ");
      const values = entries.map(([, value]) => value);
      const placeholders = entries.map((_, i) => `$${i + 1}`).join(", ");

      await prisma.$executeRawUnsafe(
        `INSERT INTO "lap" (${columns}) VALUES (${placeholders})`,
        ...values,
      );
    }
    console.log(`✅ Created ${laps.length} lap records`);

    // Seed Telemetry Packets
    console.log("\n📡 Seeding telemetry packets...");
    const packets = [];
    for (let i = 0; i < drivers.length; i++) {
      const driver = drivers[i];
      // Create 10-15 telemetry packets per driver
      const packetCount = Math.floor(random(10, 16));

      for (let j = 0; j < packetCount; j++) {
        // Generate fake telemetry data using the shared function
        const fakeTelemetry = generateFakeTelemetryData();

        // Override specific fields for seeding purposes
        fakeTelemetry.Pi.Rfid = driver.rfid;
        fakeTelemetry.TimeStamp = Math.round(pastTimestamp(i + 1, j * 5).getTime() / 1000);
        fakeTelemetry.Title = `Telemetry Data - ${driver.Name}`;

        const flatPacket = flattenTelemetryData(fakeTelemetry);

        packets.push({
          ...flatPacket,
          RaceName: `Test Race ${i + 1}`,
        });
      }
    }
    for (const packet of packets) {
      const entries = Object.entries(packet).filter(([, value]) => value !== undefined);
      const columns = entries.map(([key]) => `"${key}"`).join(", ");
      const values = entries.map(([, value]) => value);
      const placeholders = entries.map((_, i) => `$${i + 1}`).join(", ");

      await prisma.$executeRawUnsafe(
        `INSERT INTO "telemetry_packet" (${columns}) VALUES (${placeholders}) ON CONFLICT ("timestamp", "rfid") DO NOTHING`,
        ...values,
      );
    }
    console.log(`✅ Created ${packets.length} telemetry packets`);

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("✨ Seeding completed successfully!");
    console.log("=".repeat(50));
    console.log(`📊 Summary:`);
    console.log(`   - Drivers: ${drivers.length}`);
    console.log(`   - Laps: ${laps.length}`);
    console.log(`   - Telemetry Packets: ${packets.length}`);
    console.log("=".repeat(50));
    console.log("\n💡 You can now query the database or start the server!");
    console.log("   - View drivers: SELECT * FROM driver;");
    console.log("   - View laps: SELECT * FROM lap LIMIT 10;");
    console.log("   - View telemetry: SELECT * FROM telemetry_packet LIMIT 10;\n");

  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("👋 Database connection closed\n");
  }
}

// Run the seed script
seed();
