#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { spawn } = require('child_process');
const os = require('os');

// Read version from package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const VERSION = packageJson.version;
const EXTENSION_ID = 'zellij-theme-switcher@angelsen.github.io';
const RELEASE_URL = `https://github.com/angelsen/zellij-theme-switcher/releases/latest/download/${EXTENSION_ID}.shell-extension.zip`;
const TEMP_DIR = path.join(os.tmpdir(), 'zellij-theme-switcher-install');
const ZIP_PATH = path.join(TEMP_DIR, `${EXTENSION_ID}.shell-extension.zip`);

// Create temporary directory
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

console.log('📦 Downloading Zellij Theme Switcher extension...');

// Download the extension
const file = fs.createWriteStream(ZIP_PATH);
https.get(RELEASE_URL, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download: ${response.statusCode} ${response.statusMessage}`);
    process.exit(1);
  }
  
  response.pipe(file);
  
  file.on('finish', () => {
    file.close();
    console.log('✅ Download complete');
    installExtension();
  });
}).on('error', (err) => {
  fs.unlinkSync(ZIP_PATH);
  console.error(`Download error: ${err.message}`);
  process.exit(1);
});

function installExtension() {
  console.log('🔧 Installing GNOME extension...');
  
  const install = spawn('gnome-extensions', ['install', '--force', ZIP_PATH]);
  
  install.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  
  install.stderr.on('data', (data) => {
    console.error(data.toString());
  });
  
  install.on('close', (code) => {
    if (code !== 0) {
      console.error(`Installation failed with code ${code}`);
      process.exit(1);
    }
    
    console.log('✅ Extension installed successfully');
    console.log(`\n🚀 To enable the extension, run:\n  gnome-extensions enable ${EXTENSION_ID}\n`);
    console.log('📝 To configure the extension, run:');
    console.log(`  gnome-extensions prefs ${EXTENSION_ID}`);
    
    // Clean up
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  });
}