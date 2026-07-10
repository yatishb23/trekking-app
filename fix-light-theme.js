const fs = require('fs');

const files = [
  'app/about/page.tsx', 
  'app/blog/[slug]/page.tsx', 
  'app/blog/page.tsx', 
  'app/contact/page.tsx', 
  'app/gallery/page.tsx', 
  'app/safety/page.tsx', 
  'app/treks/page.tsx', 
  'components/home/testimonials.tsx', 
  'components/footer.tsx'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  
  // Replace section backgrounds
  c = c.replace(/className="([^"]*)bg-zinc-950([^"]*)"/g, (match, p1, p2) => {
    // Keep buttons dark
    if (p1.includes('fixed') || p1.includes('hover:') || p1.includes('inline-flex') || p1.includes('w-full') || p2.includes('px-8') || p2.includes('py-6')) {
      return match;
    }
    // Change section to light theme
    return `className="${p1}bg-gray-50 border border-gray-200${p2}"`.replace(/text-white/g, 'text-zinc-900');
  });

  // Global replacements in these files for remaining light theme adjustments
  c = c.replace(/border-white\/20/g, 'border-gray-200')
       .replace(/border-white\/10/g, 'border-gray-200')
       .replace(/bg-white\/10/g, 'bg-white')
       .replace(/bg-white\/5/g, 'bg-white')
       .replace(/text-gray-300/g, 'text-gray-600')
       .replace(/text-gray-400/g, 'text-gray-500');

  // Any remaining generic text-white in these light files (excluding buttons that are bg-zinc-950)
  // Actually, let's carefully replace text-white only if it's NOT next to a dark bg
  // We'll replace text-white with text-zinc-900, but then fix buttons
  c = c.replace(/text-white/g, 'text-zinc-900');
  
  // Fix buttons that became black-on-black
  c = c.replace(/bg-zinc-950([^"]*?)text-zinc-900/g, 'bg-zinc-950$1text-white');
  c = c.replace(/text-zinc-900([^"]*?)bg-zinc-950/g, 'text-white$1bg-zinc-950');

  // Fix about page hero overlay
  c = c.replace(/bg-zinc-950\/40/g, 'bg-zinc-900\/40'); // keep hero dark
  c = c.replace(/bg-zinc-950\/20/g, 'bg-zinc-900\/20');
  
  // In footer, bg-zinc-950 is the main tag
  c = c.replace(/<footer className="([^"]*)bg-zinc-950([^"]*)"/g, (m, p1, p2) => {
     return `<footer className="${p1}bg-gray-50 border-t border-gray-200${p2}"`.replace(/text-zinc-900/g, 'text-zinc-900');
  });

  fs.writeFileSync(f, c, 'utf8');
});
console.log('Script ran successfully');
