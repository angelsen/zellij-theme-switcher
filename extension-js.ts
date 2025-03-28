'use strict';

import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class ZellijThemeSwitcherExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this._interfaceSettings = null;
        this._settingsChangedId = 0;
        this._settings = null;
        this._logger = null;
    }

    enable() {
        this._settings = this.getSettings();
        
        // Initialize logger (GNOME Shell 48+)
        try {
            this._logger = this.getLogger();
            this._logger.info('Enabling extension');
        } catch (e) {
            // Fallback for older GNOME Shell versions
            console.log(`${this.metadata.name}: Enabling extension`);
        }
        
        // Connect to GNOME interface settings to detect theme changes
        this._interfaceSettings = new Gio.Settings({
            schema_id: 'org.gnome.desktop.interface'
        });
        
        this._settingsChangedId = this._interfaceSettings.connect(
            'changed::color-scheme',
            this._onThemeChanged.bind(this)
        );
        
        // Initial run to set theme according to current mode
        this._onThemeChanged();
    }

    disable() {
        if (this._interfaceSettings && this._settingsChangedId) {
            this._interfaceSettings.disconnect(this._settingsChangedId);
            this._settingsChangedId = 0;
        }
        
        if (this._logger) {
            this._logger.info('Disabling extension');
        } else {
            console.log(`${this.metadata.name}: Disabling extension`);
        }
        
        this._interfaceSettings = null;
        this._settings = null;
        this._logger = null;
    }

    _onThemeChanged() {
        const colorScheme = this._interfaceSettings.get_string('color-scheme');
        const isDarkMode = colorScheme.includes('dark');
        
        // Get theme names from settings
        const themeName = isDarkMode ? 
            this._settings.get_string('dark-theme') : 
            this._settings.get_string('light-theme');
        
        this._updateZellijTheme(themeName);
    }

    _updateZellijTheme(themeName) {
        try {
            // Get user config directory
            const configDir = GLib.build_filenamev([GLib.get_home_dir(), '.config', 'zellij']);
            const configFile = GLib.build_filenamev([configDir, 'config.kdl']);
            
            if (this._logger) {
                this._logger.debug(`Updating Zellij theme to: ${themeName}`);
            }
            
            // Create config directory if it doesn't exist
            const dir = Gio.File.new_for_path(configDir);
            if (!dir.query_exists(null)) {
                dir.make_directory_with_parents(null);
            }
            
            // Read existing config file or create it
            let configContent = '';
            const file = Gio.File.new_for_path(configFile);
            
            if (file.query_exists(null)) {
                const [success, contents] = file.load_contents(null);
                if (success) {
                    configContent = new TextDecoder().decode(contents);
                }
            }
            
            // Use a more precise regex to match theme line in KDL format
            // This searches for a standalone theme line anywhere in the file
            const themeRegex = /^\s*theme\s*"[^"]*"\s*(?:\/\/.*)?$/m;
            
            // Check if theme line exists and replace it
            if (themeRegex.test(configContent)) {
                // Replace theme line
                configContent = configContent.replace(themeRegex, `theme "${themeName}" // Set by GNOME extension`);
            } else {
                // Add new theme line at the end of the file
                configContent = configContent.trim();
                configContent += configContent.length > 0 ? '\n\n' : '';
                configContent += `theme "${themeName}" // Set by GNOME extension\n`;
            }
            
            // Write back to file
            const bytes = new TextEncoder().encode(configContent);
            file.replace_contents(bytes, null, false, 
                Gio.FileCreateFlags.REPLACE_DESTINATION, null);
            
            // We don't need to manually update running sessions as Zellij watches the config file
            // and applies changes automatically
            
        } catch (e) {
            if (this._logger) {
                this._logger.error(`Error updating Zellij theme: ${e}`);
            } else {
                logError(e);
            }
        }
    }
    
    _updateRunningSessions() {
        // Send signal to update running Zellij sessions if needed
        try {
            if (this._logger) {
                this._logger.debug('Updating running Zellij sessions');
            }
            GLib.spawn_command_line_async('zellij action options --config-dir ~/.config/zellij');
        } catch (e) {
            // Ignore errors here, as Zellij might not be running
            if (this._logger) {
                this._logger.debug('Failed to update running Zellij sessions (might not be running)');
            }
        }
    }
}
