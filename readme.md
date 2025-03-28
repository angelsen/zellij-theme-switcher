# Zellij Theme Switcher

A GNOME extension that automatically switches Zellij themes based on the system's light/dark mode setting.

## Features

- Automatically updates Zellij theme when GNOME switches between light and dark modes
- Configurable themes for both light and dark mode
- Seamless theme switching (Zellij automatically watches its config file)
- Simple preferences dialog to configure themes

## Installation

### Using npx (Recommended)

The easiest way to install is with npx directly from GitHub:

```bash
# Install the extension
npx github:angelsen/zellij-theme-switcher

# Enable the extension
gnome-extensions enable zellij-theme-switcher@angelsen.github.io
```

After enabling, you may need to restart GNOME Shell:
- On X11: Alt+F2, then type 'r' and press Enter
- On Wayland: Log out and log back in

### From source

1. Clone this repository:
   ```bash
   git clone https://github.com/angelsen/zellij-theme-switcher
   cd zellij-theme-switcher
   ```

2. Install the extension:
   ```bash
   # Build and install:
   npm install
   npm run rebuild-install
   
   # Enable the extension:
   gnome-extensions enable zellij-theme-switcher@angelsen.github.io
   ```

3. Restart GNOME Shell:
   - On X11: Alt+F2, then type 'r' and press Enter
   - On Wayland: Log out and log back in

## Configuration

After installation, you can configure the extension through GNOME Extensions Settings:

1. Open the Extensions app or visit `gnome-extensions prefs zellij-theme-switcher@angelsen.github.io`
2. Select your preferred Zellij themes for light and dark modes

## How It Works

The extension monitors GNOME's `color-scheme` setting and updates the Zellij config file (`~/.config/zellij/config.kdl`) with the appropriate theme based on the current mode. When the system switches between light and dark mode, Zellij's theme will automatically follow.

## Requirements

- GNOME Shell 44 or later
- Zellij installed and configured
- A system that uses GNOME's light/dark mode setting

## Development

The extension is written in TypeScript and uses type definitions from the `@girs/gnome-shell` package.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the extension:
   ```bash
   npm run build-extension
   ```

3. Install and test:
   ```bash
   npm run install-extension
   ```

4. Or use the all-in-one rebuild and install command:
   ```bash
   npm run rebuild-install
   ```

### Build Process

The extension uses esbuild to transform TypeScript files to JavaScript while handling ambient imports properly. The build script:

1. Processes TypeScript files (`extension-js.ts` and `prefs-js.ts`)
2. Removes all `@girs` ambient module imports which are only needed for development
3. Bundles the code and generates the final `extension.js` and `prefs.js` files
4. Preserves ESM imports for GNOME Shell compatibility

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
