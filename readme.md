# Zellij Theme Switcher

A GNOME extension that automatically switches Zellij themes based on the system's light/dark mode setting.

## Features

- Automatically updates Zellij theme when GNOME switches between light and dark modes
- Configurable themes for both light and dark mode
- Option to update running Zellij sessions immediately
- Simple preferences dialog to configure themes

## Installation

### From source

1. Clone this repository:
   ```bash
   git clone https://github.com/angelsen/zellij-theme-switcher
   cd zellij-theme-switcher
   ```

2. Install the extension:
   ```bash
   # For development/testing:
   gnome-extensions install --force .
   gnome-extensions enable zellij-theme-switcher@angelsen.github.io
   
   # For system-wide installation:
   make install
   ```

3. Restart GNOME Shell:
   - On X11: Alt+F2, then type 'r' and press Enter
   - On Wayland: Log out and log back in

## Configuration

After installation, you can configure the extension through GNOME Extensions Settings:

1. Open the Extensions app or visit `gnome-extensions prefs zellij-theme-switcher@angelsen.github.io`
2. Select your preferred Zellij themes for light and dark modes
3. Choose whether to update running Zellij sessions when the theme changes

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
