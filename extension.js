// extension-js.ts
import Gio from "gi://Gio";
import GLib from "gi://GLib";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
var ZellijThemeSwitcherExtension = class extends Extension {
  constructor(metadata) {
    super(metadata);
    this._interfaceSettings = null;
    this._settingsChangedId = 0;
    this._settings = null;
    this._logger = null;
  }
  enable() {
    this._settings = this.getSettings();
    try {
      this._logger = this.getLogger();
      this._logger.info("Enabling extension");
    } catch (e) {
      console.log(`${this.metadata.name}: Enabling extension`);
    }
    this._interfaceSettings = new Gio.Settings({
      schema_id: "org.gnome.desktop.interface"
    });
    this._settingsChangedId = this._interfaceSettings.connect(
      "changed::color-scheme",
      this._onThemeChanged.bind(this)
    );
    this._onThemeChanged();
  }
  disable() {
    if (this._interfaceSettings && this._settingsChangedId) {
      this._interfaceSettings.disconnect(this._settingsChangedId);
      this._settingsChangedId = 0;
    }
    if (this._logger) {
      this._logger.info("Disabling extension");
    } else {
      console.log(`${this.metadata.name}: Disabling extension`);
    }
    this._interfaceSettings = null;
    this._settings = null;
    this._logger = null;
  }
  _onThemeChanged() {
    const colorScheme = this._interfaceSettings.get_string("color-scheme");
    const isDarkMode = colorScheme.includes("dark");
    const themeName = isDarkMode ? this._settings.get_string("dark-theme") : this._settings.get_string("light-theme");
    this._updateZellijTheme(themeName);
  }
  _updateZellijTheme(themeName) {
    try {
      const configDir = GLib.build_filenamev([GLib.get_home_dir(), ".config", "zellij"]);
      const configFile = GLib.build_filenamev([configDir, "config.kdl"]);
      if (this._logger) {
        this._logger.debug(`Updating Zellij theme to: ${themeName}`);
      }
      const dir = Gio.File.new_for_path(configDir);
      if (!dir.query_exists(null)) {
        dir.make_directory_with_parents(null);
      }
      let configContent = "";
      const file = Gio.File.new_for_path(configFile);
      if (file.query_exists(null)) {
        const [success, contents] = file.load_contents(null);
        if (success) {
          configContent = new TextDecoder().decode(contents);
        }
      }
      const themeRegex = /^\s*theme\s*"[^"]*"\s*(?:\/\/.*)?$/m;
      if (themeRegex.test(configContent)) {
        configContent = configContent.replace(themeRegex, `theme "${themeName}" // Set by GNOME extension`);
      } else {
        configContent = configContent.trim();
        configContent += configContent.length > 0 ? "\n\n" : "";
        configContent += `theme "${themeName}" // Set by GNOME extension
`;
      }
      const bytes = new TextEncoder().encode(configContent);
      file.replace_contents(
        bytes,
        null,
        false,
        Gio.FileCreateFlags.REPLACE_DESTINATION,
        null
      );
    } catch (e) {
      if (this._logger) {
        this._logger.error(`Error updating Zellij theme: ${e}`);
      } else {
        logError(e);
      }
    }
  }
  _updateRunningSessions() {
    try {
      if (this._logger) {
        this._logger.debug("Updating running Zellij sessions");
      }
      GLib.spawn_command_line_async("zellij action options --config-dir ~/.config/zellij");
    } catch (e) {
      if (this._logger) {
        this._logger.debug("Failed to update running Zellij sessions (might not be running)");
      }
    }
  }
};
export {
  ZellijThemeSwitcherExtension as default
};
