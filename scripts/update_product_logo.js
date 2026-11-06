const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../components/ProductLogo.tsx');
let c = fs.readFileSync(filePath, 'utf8');

const caseG1 = `    case 'g1-mart': {
      // Emerald / green grocery emblem from G1 Mart
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius,
          }}
          className={\`shrink-0 flex items-center justify-center bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-xs shadow-emerald-500/25 select-none overflow-hidden p-0.5 \${className}\`}
          title="G1 Mart Logo"
          aria-label="G1 Mart Logo"
        >
          <Image
            src="/products/logos/g1-mart-icon.png"
            alt="G1 Mart Mark"
            width={Math.round(size * 0.85)}
            height={Math.round(size * 0.85)}
            className="object-contain"
            unoptimized
          />
        </div>
      );
    }
`;

if (!c.includes("'g1-mart'")) {
  c = c.replace('    default:', caseG1 + '\n    default:');
  fs.writeFileSync(filePath, c, 'utf8');
  console.log('Successfully updated ProductLogo.tsx');
} else {
  console.log('Already updated');
}
