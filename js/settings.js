function changeUpgradeDisplay() {
    switch (player.settings.upgradeDisplayMode) {
        case "current": {
            player.settings.upgradeDisplayMode = "important";
            break;
        }
        case "important": {
            player.settings.upgradeDisplayMode = "all";
            break;
        }
        case "all": {
            player.settings.upgradeDisplayMode = "current";
            break;
        }
        default: {
            player.settings.upgradeDisplayMode = "current";
        }
    }
    $("#upgDisp").text("Current upgrade display: " + String(player.settings.upgradeDisplayMode).charAt(0).toUpperCase() + String(player.settings.upgradeDisplayMode).slice(1));
}

