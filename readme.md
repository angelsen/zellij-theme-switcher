# Zellij Theme Switcher

[![Build and Release](https://github.com/angelsen/zellij-theme-switcher/actions/workflows/build.yml/badge.svg)](https://github.com/angelsen/zellij-theme-switcher/actions/workflows/build.yml)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GNOME Shell 44+](https://img.shields.io/badge/GNOME-44%2B-blueviolet)](https://github.com/angelsen/zellij-theme-switcher)

A GNOME extension that automatically switches [Zellij](https://zellij.dev) themes based on the system's light/dark mode setting.

<div align="center">
  <img src="https://raw.githubusercontent.com/angelsen/zellij-theme-switcher/main/assets/theme-switcher-demo.gif" alt="Theme Switcher Demo" width="700">
</div>

## ✨ Features

- 🌓 **Automatic theme switching** - Follows GNOME's light/dark mode automatically
- 🎨 **Configurable themes** - Choose your preferred themes for both light and dark modes
- 🔄 **Real-time updates** - Zellij sees changes immediately (no restart needed)
- 🛠️ **Easy configuration** - Simple preference dialog to set everything up

## 📦 Installation

### 🚀 One-line install (Recommended)

The easiest way to install is with npx directly from GitHub:

```bash
npx github:angelsen/zellij-theme-switcher
```

Then enable the extension:

```bash
gnome-extensions enable zellij-theme-switcher@angelsen.github.io
```

### 📥 Manual installation

You can also download the latest release directly from GitHub:

<a href="https://github.com/angelsen/zellij-theme-switcher/releases/latest/download/zellij-theme-switcher@angelsen.github.io.shell-extension.zip">
   <img src="https://img.shields.io/badge/Download-Latest%20Release-2ea44f" alt="Download Latest Release">
</a>

After downloading, install using:
```bash
gnome-extensions install --force zellij-theme-switcher@angelsen.github.io.shell-extension.zip
gnome-extensions enable zellij-theme-switcher@angelsen.github.io
```

### 👨‍💻 From source

For development or to get the latest changes:

```bash
# Clone the repository
git clone https://github.com/angelsen/zellij-theme-switcher
cd zellij-theme-switcher

# Build and install
npm install
npm run rebuild-install

# Enable the extension
gnome-extensions enable zellij-theme-switcher@angelsen.github.io
```

### 🔄 After installation

After enabling, you may need to restart GNOME Shell:
- On X11: <kbd>Alt</kbd>+<kbd>F2</kbd>, type `r`, press <kbd>Enter</kbd>
- On Wayland: Log out and log back in

## ⚙️ Configuration

After installation, you can configure the extension through GNOME Extensions Settings:

1. Open the Extensions app or visit:
   ```bash
   gnome-extensions prefs zellij-theme-switcher@angelsen.github.io
   ```
2. Select your preferred Zellij themes for light and dark modes

<div align="center">
  <img src="https://raw.githubusercontent.com/angelsen/zellij-theme-switcher/main/assets/preferences.png" alt="Preferences Dialog" width="600">
</div>

## 🧩 How It Works

The extension:
- Monitors GNOME's `color-scheme` setting
- Updates Zellij's config file (`~/.config/zellij/config.kdl`) with your chosen theme
- Works immediately as Zellij automatically reloads its config

## 📋 Requirements

- GNOME Shell 44 or later
- [Zellij](https://zellij.dev) installed and configured
- A system with GNOME's light/dark mode support

## 🛠️ Development

This extension is built with TypeScript and uses GNOME Shell type definitions.

```bash
# Install dependencies
npm install

# Build the extension
npm run build

# Test your changes
npm run rebuild-install
```

### 🧰 Technical Details

- Written in TypeScript with `@girs/gnome-shell` type definitions
- Built with esbuild for optimal bundling
- Follows GNOME extension structure and best practices
- Uses GSettings for configuration persistence

## 📄 License

[MIT License](LICENSE) © Fredrik Angelsen
