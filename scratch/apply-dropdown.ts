// Run once to apply dropdown validation to existing Orders sheet
// Usage: bun scratch/apply-dropdown.ts

import { setupOrderSheetDropdown } from '../src/lib/sheets';

async function main() {
  console.log('Applying dropdown validation to Orders!I (Status) column...');
  await setupOrderSheetDropdown();
  console.log('Done!');
}

main().catch(console.error);
