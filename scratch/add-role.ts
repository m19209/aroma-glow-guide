import { Database } from 'bun:sqlite';
const sqlite = new Database('./local.db');
try {
  sqlite.run('ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT "user"');
  console.log('Column added');
} catch (e) {
  console.log('Might exist', e);
}
