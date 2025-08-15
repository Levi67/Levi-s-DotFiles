#!/bin/bash
# Clone dharmx/walls into ~/Pictures/walls

# Make sure the target directory exists
mkdir -p ~/Pictures

# Clone (or re-clone) the repo
if [ -d ~/Pictures/walls ]; then
    echo "Directory ~/Pictures/walls already exists. Removing it..."
    rm -rf ~/Pictures/walls
fi

git clone https://github.com/dharmx/walls.git ~/Pictures/walls
