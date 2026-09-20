const fs = require('fs');
const path = require('path');
const repoRoot = path.resolve(__dirname, '..');
const outDir = path.join(repoRoot, 'release-assets');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const dbPath = path.join(repoRoot, 'src', 'data', 'booksDatabase.ts');
const content = fs.readFileSync(dbPath, 'utf8');
const lines = content.split(/\r?\n/);

const books = [];
let currentId = null;

for (const line of lines) {
  const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
  if (idMatch) {
    currentId = idMatch[1];
  }
  const urlMatch = line.match(/pdfUrl:\s*['"](.*(?:\.pdf|\.PDF))['"]/i) || line.match(/pdfUrl:\s*['"]([^'"]+)['"]/);
  if (urlMatch && currentId) {
    books.push({ id: currentId, pdfUrl: urlMatch[1] });
    currentId = null;
  }
}

console.log(`Found ${books.length} books in booksDatabase.ts`);

let copied = 0;
let missing = 0;

for (const b of books) {
  let relPath = b.pdfUrl.replace(/^\//, '');
  relPath = decodeURIComponent(relPath);
  const srcPath = path.join(repoRoot, 'public', relPath);
  const destPath = path.join(outDir, `${b.id}.pdf`);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    copied++;
  } else {
    console.log(`Missing file: ${b.id} -> ${b.pdfUrl}`);
    missing++;
  }
}

console.log(`Successfully prepared ${copied} release assets in ./release-assets/`);
if (missing > 0) {
  console.log(`Missing files: ${missing}`);
}
