import { readFileSync } from 'fs';
import { join } from 'path';
import { Client } from 'pg';

async function runMasterMigration() {
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    user: process.env.DATABASE_USER || 'hamrotourist',
    password: process.env.DATABASE_PASSWORD || 'hamrotourist_dev',
    database: process.env.DATABASE_NAME || 'hamrotourist',
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const sqlPath = join(__dirname, '..', '..', '..', '..', 'migrations', 'master', '001_initial.sql');
    const sql = readFileSync(sqlPath, 'utf-8');

    await client.query(sql);
    console.log('Master migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMasterMigration();
