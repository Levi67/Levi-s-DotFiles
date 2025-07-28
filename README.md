# Levi's Dotfiles

Minimal and efficient dotfiles managed with **GNU Stow**.

This setup is built for **Arch Linux** with the **Hyprland** Wayland compositor, using a personalized configuration of tools like **Waybar**, **Kitty**, **Fish**, and more.

- For questions or ideas, feel free to reach out via Discord: **.levi68**

## 🧩 What's inside

- **Hyprland**: Dynamic tiling Wayland compositor with custom keybindings and window rules  
- **Waybar**: Top bar with blur, color scheme, and media/volume modules  
- **Nvim**: Lightweight terminal editor with a clean look  
  _Note: config is still a work in progress and not recommended to copy yet_  
- **Fish**: Minimal shell setup with fast prompt and sensible aliases  
- Additional configs for tools like `waypaper`, `wofi`, and others

## ⚙️ Requirements

Make sure the following packages are installed:

```bash
sudo pacman -S git stow
```

## ⚙️ Installation

Just an example, you can use the cmds you want:
```bash

# Clone directly into your home directory
git clone https://github.com/yourusername/dotfiles.git

cd ~/dotfiles

# Stow everything
stow .

```
