let player = {
    points: new Decimal("1e300"),
    superPoints: new Decimal(0),
    superPointsSubtracted: new Decimal(0), //worst way to do this but i'm making it like this anyway
    ultraPoints: new Decimal(0),
    ultraPointsSubtracted: new Decimal(0), //worst way to do this but i'm making it like this anyway
    upgrades: []
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
        upgrades: upgradeTable
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
        upgrades: upgradeTable
    }
}

function save() {
    let saveFile = btoa(JSON.stringify(serializePlayer()));
    localStorage.setItem("fullyAutomaticSaveFile", saveFile);
}

function load() {
    let saveFile = localStorage.getItem("fullyAutomaticSaveFile");
    saveFile = JSON.parse(atob(saveFile));
    player = deserializePlayer(saveFile);
    for (let i = 0; i < upgrades.length; i++) {
        if ((upgrades[i].previousUpg == -1 || upgrades[upgrades[i].previousUpg].level.equals(upgrades[upgrades[i].previousUpg].maxLevel)) && upgrades[i].level.lt(upgrades[i].maxLevel)) {
            $( "#upgrade-" + i ).removeClass("hidden");
        }
        else {
            $( "#upgrade-" + i ).addClass("hidden");
        }
    }
}
