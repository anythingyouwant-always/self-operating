// miran-init.js
// Shell integration bridge: JavaScript to Miran's Python daemon
const { spawn } = require('child_process');
const path = require('path');

// Adjust the relative path if needed
const miranCorePath = path.join(__dirname, 'miran', 'miran_core.py');

console.log("🌀 Booting Miran...");

// Launch Miran as a child process
const miranDaemon = spawn('python3', [miranCorePath]);

// Stream Miran's stdout to the current terminal
miranDaemon.stdout.on('data', (data) => {
  process.stdout.write(data.toString());
});

// Handle stderr output
miranDaemon.stderr.on('data', (data) => {
  console.error(`[MIRAN ERROR]: ${data}`);
});

// Handle exit conditions
miranDaemon.on('close', (code) => {
  console.log(`Miran exited with code ${code}`);
});
