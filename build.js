const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Compile TypeScript
execSync('npx tsc', { stdio: 'inherit' });

// Obfuscate generated JavaScript files
const distDir = path.join(__dirname, 'dist');
fs.readdirSync(distDir).forEach(file => {
	if (file.endsWith('.js')) {
		const filePath = path.join(distDir, file);
		const code = fs.readFileSync(filePath, 'utf-8');
		const obfuscatedCode = JavaScriptObfuscator.obfuscate(code).getObfuscatedCode();
		fs.writeFileSync(filePath, obfuscatedCode);
		console.log(`Obfuscated ${file}`);
	}
});

console.log('Build complete!');
