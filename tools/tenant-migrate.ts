/**
 * Tenant Migration Runner
 * Applies all tenant schema migrations to every existing tenant schema.
 * Usage: pnpm tenant-migrate
 */
import { Client } from 'pg';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

async function run() {
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    user: process.env.DATABASE_USER || 'hamrotourist',
    password: process.env.DATABASE_PASSWORD || 'hamrotourist_dev',
    database: process.env.DATABASE_NAME || 'hamrotourist',
  });

  await client.connect();
  console.log('Connected to database');

  // Get all tenant schemas
  const result = await client.query(
    `SELECT schema_name FROM tenants WHERE schema_name IS NOT NULL`,
  );
  const schemas = result.rows.map((r: { schema_name: string }) => r.schema_name);
  console.log(`Found ${schemas.length} tenant schemas`);

  // Read migration files
  const migrationDir = join(__dirname, '..', 'migrations', 'tenant');
  let migrationFiles: string[] = [];
  try {
    migrationFiles = readdirSync(migrationDir)
      .filter((f) => f.endsWith('.sql'))
      .sort();
  } catch {
    console.log('No tenant migrations found in migrations/tenant/');
    await client.end();
    return;
  }

  if (migrationFiles.length === 0) {
    console.log('No tenant migration files to run');
    await client.end();
    return;
  }

  console.log(`Found ${migrationFiles.length} migration files`);

  for (const schema of schemas) {
    console.log(`\nMigrating schema: ${schema}`);
    await client.query(`SET search_path TO "${schema}"`);

    for (const file of migrationFiles) {
      const sql = readFileSync(join(migrationDir, file), 'utf-8');
      try {
        await client.query(sql);
        console.log(`  Applied: ${file}`);
      } catch (err: any) {
        console.error(`  Failed: ${file} — ${err.message}`);
      }
    }
  }

  await client.query('SET search_path TO public');
  await client.end();
  console.log('\nTenant migration complete');
}

run().catch((err) => {
  console.error('Migration runner failed:', err);
  process.exit(1);
});
