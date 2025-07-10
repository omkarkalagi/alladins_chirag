const { exec } = require('child_process');

exec('npx tailwindcss -i ./src/index.css -o ./src/tailwind.output.css', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error building CSS: ${error}`);
    process.exit(1);
  }
  console.log(`CSS built successfully: ${stdout}`);
});