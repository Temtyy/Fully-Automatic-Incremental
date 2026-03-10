function level(id) {
    return upgrades[id].level;
}

function upgradeMaxed(id) {
    return level(id).equals(upgrades[id].maxLevel);
}

function hasLevel(id, levels) {
    return level(id).gte(levels);
}

function hasAch(id) {
    return achievements[id].unlocked();
}