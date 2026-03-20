let player = {
    points: new Decimal("1e500"),
    superPoints: new Decimal(0),
    superPointsSubtracted: new Decimal(0), //worst way to do this but i'm making it like this anyway
    ultraPoints: new Decimal(0),
    ultraPointsSubtracted: new Decimal(0), //worst way to do this but i'm making it like this anyway
    megaPoints: new Decimal(0),
    megaPointsSubtracted: new Decimal(0), //worst way to do this but i'm making it like this anyway
    upgrades: [],
    settings: {
        upgradeDisplayMode: "current",
        theme: "default"
    }
};

function serializePlayer() {
    let upgradeTable = [];
    for (let i = 0; i < player.upgrades.length; i++) {
        upgradeTable[i] = player.upgrades[i].toString();
    }
    return {
        points: player.points.toString(),
        superPoints: player.superPoints.toString(),
        superPointsSubtracted: player.superPointsSubtracted.toString(),
        ultraPoints: player.ultraPoints.toString(),
        ultraPointsSubtracted: player.ultraPointsSubtracted.toString(),
        upgrades: upgradeTable,
        settings: player.settings
    }
}

function deserializePlayer(save) {
    let upgradeTable = [];
    for (let i = 0; i < save.upgrades.length; i++) {
        upgradeTable[i] = new Decimal(save.upgrades[i]);
    }
    return {
        points: new Decimal(save.points),
        superPoints: new Decimal(save.superPoints),
        superPointsSubtracted: new Decimal(save.superPointsSubtracted),
        ultraPoints: new Decimal(save.ultraPoints),
        ultraPointsSubtracted: new Decimal(save.ultraPointsSubtracted),
        upgrades: upgradeTable,
        settings: save.settings
    }
}

function save() {
    let saveFile = btoa(JSON.stringify(serializePlayer()));
    localStorage.setItem("fullyAutomaticSaveFile", saveFile);
}

function load() {
    let saveFile = localStorage.getItem("fullyAutomaticSaveFile");
    if (saveFile != null) {
        saveFile = JSON.parse(atob(saveFile));
        player = deserializePlayer(saveFile);
        for (let i = 0; i < player.upgrades.length; i++) {
            upgrades[i].level = player.upgrades[i];
        }
    }
}

function importSave() {
    let saveFile = prompt("Input your save file here:");
    if (saveFile != null && save != "") {
        saveFile = JSON.parse(atob(saveFile));
        player = deserializePlayer(saveFile);
        for (let i = 0; i < player.upgrades.length; i++) {
            upgrades[i].level = player.upgrades[i];
        }
    }
}

function exportSave() {
    let saveFile = btoa(JSON.stringify(serializePlayer()));
    navigator.clipboard.writeText(saveFile)
        .then(() => console.log("Exported save successfully!"))
        .catch(err => console.error("Error while exporting save:", err))
}

function hardReset() {
    if (confirm("Are you sure you want to reset your save? Your save will be lost FOREVER!")) {
        localStorage.removeItem("fullyAutomaticSaveFile");
        location.reload();
    }
}
