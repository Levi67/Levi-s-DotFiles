# Hyprland Rice Setup Summary

- Wlan waybar modules, but only if so activated in another config file
- Audio level and device chooser layout
- Eww pop up for vpn selecter + media
- Maybe in the control panel pop up a cpu + gpu util thing

## 1. Hyprland Setup
- Install and configure Hyprland as your Wayland compositor.
- Configure `hyprland.conf` with:
  - Workspace names and auto-assignment (`windowrulev2`) for:
    - Workspace 1: Spotify + Vesktop
    - Workspace 2: Zen Browser
    - Workspace 3: Empty (future apps)
    - Workspace 4: Neovim (terminal)
    - Workspace 5: Terminal for build/run
  - Keybindings (including lock screen toggle).
  - Autostart apps script to launch apps in the correct workspaces.

## 2. Wallpaper and Color Sync
- Use **swww** to manage wallpapers.
- On wallpaper change:
  - Run **pywal** on current wallpaper (from swww’s database) to generate color palette.
  - Dynamically update colors for:
    - Waybar (battery, VPN, weather modules, media player)
    - Cava and cmatrix
    - Kitty terminal (optional)
- Implement fallback or clamp color logic to avoid weird palettes.

## 3. Waybar Configuration
- Modules:
  - Battery (only shows if battery exists)
  - Custom VPN module:
    - Detects WireGuard config named "VPN"
    - Shows VPN status and allows toggle on click
  - Weather module
  - Media player module (using playerctl)
- Colors dynamically update on wallpaper change (via pywal).

## 4. Wofi Configuration
- Layout with apps list on the right.
- Wallpaper snippet or blurred wallpaper image on the left.
- Styled to match rice colors.

## 5. Kitty Terminal Setup
- Use kitty terminal.
- Configure startup script or kitty config for custom hello/welcome screen with ASCII art and colors.
- Assign kitty to workspace 4 or 5 for development and terminal work.

## 6. Hyprlock Setup
- Install and configure hyprlock.
- Create lock script that:
  - Fetches current wallpaper path from swww
  - Creates blurred version for lock background
  - Launches hyprlock with blurred wallpaper
- Bind `SUPER+L` in Hyprland to run lock script.
- Enable caps lock and fail attempt indicators.

## 7. Workspace and App Layout
- Workspace assignments:
  - 1: Spotify + Vesktop
  - 2: Zen Browser
  - 3: Empty for future apps
  - 4: Neovim (likely in kitty terminal)
  - 5: Terminal for build/run
- Use `windowrulev2` to assign apps automatically.
- Autostart script to launch apps on correct workspaces.

## 8. Zen Browser Custom Start Page
- Create fully custom HTML + CSS start page (optionally with JavaScript).
- Place it locally (e.g., `~/startpage/index.html`).
- Set Zen Browser start/home page to `file:///home/levi/startpage/index.html`.
- Design:
  - Apps/bookmarks list on right
  - Wallpaper snippet/image on left
  - Optional widgets or dynamic info.

---

## Bonus Tips
- Test wallpapers carefully and tweak pywal options (`--saturate`, `--lightness`) to get balanced colors.
- Use fallback color logic for apps like cava and cmatrix.
- Keep some UI element colors fixed for readability.
- Consider integrating local scripts or APIs into your custom start page for dynamic data.

---

If you want help writing scripts or configs for any part, just ask!
