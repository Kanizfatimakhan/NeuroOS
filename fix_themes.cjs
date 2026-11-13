const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'components', 'landing')
];

function processFile(filePath) {
  if (!filePath.endsWith('.jsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace hardcoded body text colors
  content = content.replace(/text-white/g, 'text-text-main');
  content = content.replace(/text-gray-400/g, 'text-text-muted');
  content = content.replace(/text-gray-300/g, 'text-text-muted');
  content = content.replace(/text-gray-500/g, 'text-text-muted');
  content = content.replace(/text-gray-200/g, 'text-text-main');
  content = content.replace(/text-\[\#1d1d1f\]/g, 'text-text-main');
  
  // Replace hardcoded backgrounds
  content = content.replace(/bg-\[\#050505\]/g, 'bg-bg-dark');
  content = content.replace(/bg-\[\#f5f5f7\]/g, 'bg-bg-dark');
  content = content.replace(/bg-black\/50/g, 'bg-panel');
  content = content.replace(/bg-black\/40/g, 'bg-panel');
  content = content.replace(/bg-white\/10/g, 'bg-glass');
  content = content.replace(/bg-white\/20/g, 'bg-glass/50');
  content = content.replace(/bg-white\/5/g, 'bg-glass/20');
  
  // Replace hardcoded borders
  content = content.replace(/border-white\/10/g, 'border-glass-border');
  content = content.replace(/border-white\/20/g, 'border-glass-border');
  content = content.replace(/border-white\/5/g, 'border-glass-border');
  content = content.replace(/border-gray-200/g, 'border-glass-border');
  content = content.replace(/border-gray-800/g, 'border-glass-border');
  
  // Fix specific layout backgrounds
  content = content.replace(/bg-bg-dark text-white/g, 'bg-bg-dark text-text-main');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => processFile(path.join(dir, file)));
  }
});
