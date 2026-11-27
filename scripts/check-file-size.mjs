// Why: holds rule code-organisation 3, a file size limit that ESLint cannot express.
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const MAX_LINES = 300;
const files = execSync('git ls-files --cached --others --exclude-standard', { encoding: 'utf8' })
  .split('\n')
  .filter((f) => /\.(ts|tsx|js|mjs)$/.test(f));

const tooLong = files
  .map((file) => ({ file, lines: readFileSync(file, 'utf8').split('\n').length }))
  .filter(({ lines }) => lines > MAX_LINES);

for (const { file, lines } of tooLong) console.error(`${file}: ${lines} lines (max ${MAX_LINES})`);
if (tooLong.length > 0) process.exit(1);
console.log(`File size check passed (${files.length} files, max ${MAX_LINES} lines).`);
