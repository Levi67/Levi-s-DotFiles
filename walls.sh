#!/bin/bash

# === Config ===
# Target directory relative to current dir
TARGET_DIR="./Pictures/walls"

# Repositories to clone
REPOS=(
    "https://github.com/dharmx/walls.git"
    "https://github.com/mylinuxforwork/wallpaper.git"
)

# === Script ===

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Clone each repository
for REPO in "${REPOS[@]}"; do
    REPO_NAME=$(basename "$REPO" .git)
    CLONE_PATH="$TARGET_DIR/$REPO_NAME"

    if [ -d "$CLONE_PATH/.git" ]; then
        echo "🔁 Repo '$REPO_NAME' already cloned. Skipping."
    else
        echo "⬇️  Cloning $REPO into $CLONE_PATH"
        git clone "$REPO" "$CLONE_PATH"
    fi
done

echo "✅ Done. Repositories are in: $TARGET_DIR"
