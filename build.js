const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
  try {
    // Build extension.js
    await esbuild.build({
      entryPoints: ['extension-js.ts'],
      outfile: 'extension.js',
      bundle: true,
      format: 'esm',
      target: 'es2020',
      external: ['gi://*', 'resource://*'],
      plugins: [
        {
          name: 'gnome-shell-types-remover',
          setup(build) {
            // Remove ambient imports
            build.onLoad({ filter: /\.ts$/ }, async (args) => {
              let content = await fs.promises.readFile(args.path, 'utf8');
              
              // Remove ambient imports
              content = content.replace(/import\s+['"]@girs\/[^'"]+['"]\s*;?\n?/g, '');
              
              return { contents: content, loader: 'ts' };
            });
          },
        },
      ],
    });

    // Build prefs.js
    await esbuild.build({
      entryPoints: ['prefs-js.ts'],
      outfile: 'prefs.js',
      bundle: true,
      format: 'esm',
      target: 'es2020',
      external: ['gi://*', 'resource://*'],
      plugins: [
        {
          name: 'gnome-shell-types-remover',
          setup(build) {
            // Remove ambient imports
            build.onLoad({ filter: /\.ts$/ }, async (args) => {
              let content = await fs.promises.readFile(args.path, 'utf8');
              
              // Remove ambient imports
              content = content.replace(/import\s+['"]@girs\/[^'"]+['"]\s*;?\n?/g, '');
              
              return { contents: content, loader: 'ts' };
            });
          },
        },
      ],
    });

    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();