import { Client } from 'pg';

async function seed() {
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    user: process.env.DATABASE_USER || 'hamrotourist',
    password: process.env.DATABASE_PASSWORD || 'hamrotourist_dev',
    database: process.env.DATABASE_NAME || 'hamrotourist',
  });

  try {
    await client.connect();
    console.log('Connected to database for seeding');

    // Plans are already seeded in migration, verify they exist
    const plans = await client.query('SELECT * FROM plans');
    console.log(`Plans in database: ${plans.rows.length}`);
    for (const plan of plans.rows) {
      console.log(`  - ${plan.display_name} ($${plan.price_monthly}/mo)`);
    }

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
