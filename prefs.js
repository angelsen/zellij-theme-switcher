// prefs-js.ts
import Adw from "gi://Adw";
import Gtk from "gi://Gtk";
import { ExtensionPreferences } from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";
var ZELLIJ_THEMES = [
  "default",
  "dracula",
  "gruvbox",
  "gruvbox-light",
  "nord",
  "tokyo-night",
  "tokyo-night-storm",
  "kanagawa",
  "catppuccin-frappe",
  "catppuccin-latte",
  "catppuccin-macchiato",
  "catppuccin-mocha",
  "github-dark",
  "github-light"
];
var ZellijThemeSwitcherPreferences = class extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    window._settings = this.getSettings();
    const page = new Adw.PreferencesPage();
    page.set_title("Zellij Theme Switcher");
    page.set_icon_name("preferences-system-symbolic");
    window.add(page);
    const themeGroup = new Adw.PreferencesGroup({
      title: "Theme Selection"
    });
    page.add(themeGroup);
    const lightRow = new Adw.ComboRow({
      title: "Light Mode Theme",
      subtitle: "Theme to use when GNOME is in light mode"
    });
    const darkRow = new Adw.ComboRow({
      title: "Dark Mode Theme",
      subtitle: "Theme to use when GNOME is in dark mode"
    });
    const model = new Gtk.StringList();
    ZELLIJ_THEMES.forEach((theme) => model.append(theme));
    lightRow.set_model(model);
    darkRow.set_model(model);
    const lightTheme = window._settings.get_string("light-theme");
    const darkTheme = window._settings.get_string("dark-theme");
    lightRow.set_selected(Math.max(0, ZELLIJ_THEMES.indexOf(lightTheme)));
    darkRow.set_selected(Math.max(0, ZELLIJ_THEMES.indexOf(darkTheme)));
    lightRow.connect("notify::selected", (row) => {
      const selected = row.get_selected();
      if (selected >= 0 && selected < ZELLIJ_THEMES.length) {
        window._settings.set_string("light-theme", ZELLIJ_THEMES[selected]);
      }
    });
    darkRow.connect("notify::selected", (row) => {
      const selected = row.get_selected();
      if (selected >= 0 && selected < ZELLIJ_THEMES.length) {
        window._settings.set_string("dark-theme", ZELLIJ_THEMES[selected]);
      }
    });
    themeGroup.add(lightRow);
    themeGroup.add(darkRow);
    const optionsGroup = new Adw.PreferencesGroup({
      title: "Behavior"
    });
    page.add(optionsGroup);
    const updateRow = new Adw.SwitchRow({
      title: "Update Running Sessions",
      subtitle: "Apply theme changes to already running Zellij sessions"
    });
    updateRow.set_active(window._settings.get_boolean("update-running-sessions"));
    updateRow.connect("notify::active", (row) => {
      window._settings.set_boolean("update-running-sessions", row.get_active());
    });
    optionsGroup.add(updateRow);
  }
};
export {
  ZellijThemeSwitcherPreferences as default
};
