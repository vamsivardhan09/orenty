const fs = require('fs');

let css = fs.readFileSync('app/globals.css', 'utf8');

// Replace color tokens
css = css.replace('--bg: #05050A;', '--bg: #030306;');
css = css.replace('--surface-1: #0A0A12;', '--surface-1: #07070c;');
css = css.replace('--surface-2: #10101B;', '--surface-2: #0b0b12;');
css = css.replace('--surface-3: #171726;', '--surface-3: #12121e;');
css = css.replace('--border: rgba(255, 255, 255, 0.09);', '--border: rgba(255, 255, 255, 0.07);');
css = css.replace('--border-top: rgba(255, 255, 255, 0.20);', '--border-top: rgba(255, 255, 255, 0.18);');
css = css.replace('--text-2: #A9A9C0;', '--text-2: #A3A3B8;');
css = css.replace('--text-3: #8585A0;', '--text-3: #71718A;');

// Refine glass card to remove muddy purple drop shadow and replace with deep obsidian drop shadow + rim light
css = css.replace(
  'box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 30px 80px -40px rgba(124, 92, 255, 0.35);',
  'box-shadow: 0 12px 32px -12px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.08); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);'
);

// Add traveling laser animations & marquee styles if not present
if (!css.includes('laser-sweep')) {
  css += `

/* Horizontal Traveling Laser & Marquee Styles */
@keyframes laser-sweep {
  0% { transform: translateX(-100%); opacity: 0; }
  25% { opacity: 1; }
  75% { opacity: 1; }
  100% { transform: translateX(250%); opacity: 0; }
}

.laser-track {
  position: relative;
  overflow: hidden;
}

.laser-line-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(124, 92, 255, 0.4), rgba(56, 214, 255, 0.8), rgba(124, 92, 255, 0.4), transparent);
  animation: laser-sweep 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.laser-line-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(56, 214, 255, 0.4), rgba(124, 92, 255, 0.8), rgba(56, 214, 255, 0.4), transparent);
  animation: laser-sweep 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee-scroll 36s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}

/* HUD micro brackets */
.hud-corner-tl {
  position: absolute;
  top: -1px;
  left: -1px;
  width: 8px;
  height: 8px;
  border-top: 1.5px solid var(--secondary);
  border-left: 1.5px solid var(--secondary);
  opacity: 0.6;
  pointer-events: none;
}
.hud-corner-br {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 8px;
  height: 8px;
  border-bottom: 1.5px solid var(--secondary);
  border-right: 1.5px solid var(--secondary);
  opacity: 0.6;
  pointer-events: none;
}
`;
}

fs.writeFileSync('app/globals.css', css, 'utf8');
console.log('Successfully updated app/globals.css');
