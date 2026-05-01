/**
 * Dev Seed Script
 * Seeds the database with development data.
 */
import { Client } from 'pg';

async function seed() {
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    user: process.env.DATABASE_USER || 'hamrotourist',
    password: process.env.DATABASE_PASSWORD || 'hamrotourist_dev',
    database: process.env.DATABASE_NAME || 'hamrotourist',
  });

  await client.connect();
  console.log('Connected to database for seeding');

  // Verify plans exist
  const plans = await client.query('SELECT * FROM plans ORDER BY price_monthly');
  console.log(`\nPlans (${plans.rows.length}):`);
  for (const p of plans.rows) {
    console.log(`  ${p.display_name} — $${p.price_monthly}/mo | Countries: ${p.max_countries} | Regions/Country: ${p.max_regions_per_country}`);
  }

  await client.end();
  console.log('\nSeed complete');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
