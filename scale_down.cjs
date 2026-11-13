const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'landing');

function processFile(filePath) {
  if (!filePath.endsWith('.jsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Downscale Hero
  content = content.replace(/text-5xl md:text-7xl/g, 'text-4xl md:text-6xl');
  content = content.replace(/text-xl md:text-2xl/g, 'text-lg md:text-xl');
  
  // Downscale section headers
  content = content.replace(/text-3xl md:text-5xl/g, 'text-2xl md:text-4xl');
  content = content.replace(/mb-16/g, 'mb-12');
  
  // Downscale text-lg and text-xl for subtexts
  content = content.replace(/text-lg font-semibold/g, 'text-base font-semibold');
  content = content.replace(/text-2xl font-bold/g, 'text-xl font-bold');
  
  // Downscale padding
  content = content.replace(/py-16/g, 'py-12');
  content = content.replace(/py-24/g, 'py-16');
  content = content.replace(/p-10/g, 'p-8');
  
  // Downscale widths
  content = content.replace(/max-w-7xl/g, 'max-w-6xl');
  content = content.replace(/max-w-6xl/g, 'max-w-5xl');
  
  // Downscale icons in features
  content = content.replace(/w-16 h-16/g, 'w-12 h-12');
  content = content.replace(/w-8 h-8/g, 'w-6 h-6');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated sizes in ${filePath}`);
  }
}

if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir);
  files.forEach(file => processFile(path.join(dir, file)));
}
