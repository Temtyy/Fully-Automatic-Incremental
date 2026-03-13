let bulkBuyAmount = 1024;

$( document ).ready(function() {
    //startup stuff
    const pointDisplay = $( "#points" );
    pointDisplay.text(format(player.points));
    //generating upgrades
    for(let i = 0; i < upgrades.length; i++) {
        generateUpgrade(i, upgrades[i].currency.substr(0, upgrades[i].currency.length - 1));
    }
    //start loop
    for (let i = 0; i < upgrades.length; i++) {
        if ((upgrades[i].previousUpg == -1 || upgrades[upgrades[i].previousUpg].level.equals(upgrades[upgrades[i].previousUpg].maxLevel)) && upgrades[i].level.lt(upgrades[i].maxLevel)) {
            $( "#upgrade-" + i ).removeClass("hidden");
        }
        else {
            $( "#upgrade-" + i ).addClass("hidden");
        }
    }
    $("#start").on("click", function() {
        $("#start").hide();
        lastTime = Date.now();
        setInterval(() => {mainLoop(Date.now());}, 50);
    });
    //tabs
    $("#toAchTab").on("click", function() {
        $("#game").addClass("hidden");
        $("#achTab").removeClass("hidden");
    });
    $("#toGameTab").on("click", function() {
        $("#game").removeClass("hidden");
        $("#achTab").addClass("hidden");
    });
    //achievements tab
    for (let i = 0; i < achievements.length; i++) {
        generateAchievement(i);
    }
});

let lastTime = 0;

function mainLoop(currentTime) {
    if (lastTime == 0) lastTime = currentTime;
    //delta time
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    //showing the upgrades
    for (let i = 0; i < upgrades.length; i++) {
        if ((upgrades[i].previousUpg == -1 || upgrades[upgrades[i].previousUpg].level.equals(upgrades[upgrades[i].previousUpg].maxLevel)) && upgrades[i].level.lt(upgrades[i].maxLevel)) {
            $( "#upgrade-" + i ).removeClass("hidden");
            for (let k = 0; k < bulkBuyAmount && upgrades[i].buyUpgrade(); k++) {}
        }
        else {
            $( "#upgrade-" + i ).addClass("hidden");
        }
    }
    //achievements 
    for (let i = 0; i < achievements.length; i++) {
        if (achievements[i].unlocked()) {
            $("#achievement-" + i).removeClass("locked");
        }
        if (achievements[i].visible()) {
            $("#achievement-" + i).removeClass("hidden");
        }
    }
    //points
    player.points = player.points.add(getPointGain(deltaTime));
    $("#points").text(format(player.points));
    $("#pps").text(format(getPointGain(1)));
    //super points
    if (player.points.gte(1e100) || player.superPoints.gte(0.00001)) $( "#superPointSection").removeClass("hidden");
    player.superPoints = getSuperPointGain();
    $("#superPoints").text(format(player.superPoints));
    $("#nextSP").text(format(reverseSuperPointGain()));
    //ultra points
    if (player.superPoints.gte(5e19) || player.ultraPoints.gte(0.00001)) $( "#ultraPointSection").removeClass("hidden");
    player.ultraPoints = getUltraPointGain();
    $("#ultraPoints").text(format(player.ultraPoints));
    $("#UPboost").text(format(GetUltraPointEffect()));
    $("#nextUP").text(format(reverseUltraPointGain()));
}

function generateUpgrade(id, section) {
    let upgradeBox = $("<div>", {
        class: "upgrade " + ((section != "point") ? section : ""),
        id: "upgrade-" + id
    });

    let title = $("<span>", {
        class: "upgrade-title",
        text: upgrades[id].name
    });
    upgradeBox.append(title);
    upgradeBox.append("<br>");

    let desc = $("<span>", {
        class: "upgrade-desc",
        html: upgrades[id].description
    });
    upgradeBox.append(desc);
    upgradeBox.append("<br>");

    let cost = $("<span>", {
        class: "upgrade-cost",
        html: ((typeof(upgrades[id].spendsCurrency) == "boolean" && upgrades[id].spendsCurrency == false) ? "Requires:" : "Cost:") + " <span id=\"upgrade-cost-" + id + "\">" + format(upgrades[id].cost()) + "</span> " + upgrades[id].currency
    });
    upgradeBox.append(cost);
    upgradeBox.append("<br>");

    let level = $("<span>", {
        class: "upgrade-level",
        id: "upgrade-level-" + id,
        html: "Level: <span id=\"upgrade-level-disp-" + id + "\">" + format(upgrades[id].level, 0) + "</span>/" + format(upgrades[id].maxLevel, 0)
    });
    upgradeBox.append(level);
    upgradeBox.append("<br>");

    $( "#" + section + "Section" ).append(upgradeBox);
}

function generateAchievement(id) {
    let achBox = $("<div>", {
        class: "achievement",
        id: "achievement-" + id
    });

    if (!achievements[id].unlocked()) {
        achBox.addClass("locked");
    }

    if (!achievements[id].visible()) {
        achBox.addClass("hidden");
    }

    let title = $("<h3>", {
        class: "achievement-title",
        text: achievements[id].title
    });
    achBox.append(title);

    let desc = $("<span>", {
        class: "achievement-desc",
        html: achievements[id].description
    });
    achBox.append(desc);
    achBox.append("<br>");

    $("#ach").append(achBox);
}

function getPointGain(deltaTime) {
    let gain = new Decimal(0);
    if (upgradeMaxed(0)) gain = gain.add(1);
    if (upgradeMaxed(1)) gain = gain.mul(2);
    if (upgradeMaxed(2)) gain = gain.mul(3);
    if (hasLevel(3, 1)) gain = gain.mul(new Decimal(1.25).pow(level(3)));
    if (upgradeMaxed(4)) gain = gain.mul(4);
    if (hasLevel(5, 1)) gain = gain.mul(new Decimal(1.1).pow(level(5)));
    if (upgradeMaxed(6)) gain = gain.mul(5);
    if (hasLevel(7, 1)) gain = gain.mul(new Decimal(1.5).pow(level(7)));
    if (hasLevel(8, 1)) gain = gain.mul(new Decimal(1.25).pow(level(8)));
    if (hasLevel(9, 1)) gain = gain.mul(new Decimal(1.125).pow(level(9)));
    if (hasLevel(10, 1)) gain = gain.mul(new Decimal(3).pow(level(10)));
    if (hasLevel(11, 1)) gain = gain.mul(new Decimal(1.05).pow(level(11)));
    if (hasLevel(12, 1)) gain = gain.pow(new Decimal(1.01).pow(level(12)));
    if (hasLevel(13, 1)) gain = gain.mul(new Decimal(2).pow(level(13)));
    if (upgradeMaxed(14)) gain = gain.mul(5);
    if (upgradeMaxed(15)) gain = gain.mul(4);
    if (upgradeMaxed(16)) gain = gain.mul(3);
    if (upgradeMaxed(17)) gain = gain.mul(Math.pow(Math.PI, Math.PI));
    if (upgradeMaxed(18)) gain = gain.pow(1.01);
    if (hasLevel(19, 1)) gain = gain.mul(new Decimal(1.001).pow(level(19)));
    if (hasLevel(20, 1)) gain = gain.mul(new Decimal(2.5).pow(level(20)));
    if (hasLevel(21, 1)) gain = gain.mul(new Decimal(3.5).pow(level(21)));
    if (hasLevel(22, 1)) gain = gain.mul(new Decimal(4.5).pow(level(22)));
    if (hasLevel(23, 1)) gain = gain.mul(new Decimal(5.5).pow(level(23)));
    if (upgradeMaxed(24)) gain = gain.mul(6.5);
    if (hasLevel(28, 1)) gain = gain.mul(new Decimal(Math.PI).pow(level(28)));
    if (hasLevel(29, 1)) gain = gain.mul(new Decimal(10).pow(level(29)));
    if (upgradeMaxed(32)) gain = gain.pow(1.05);
    if (hasLevel(34, 1)) gain = gain.mul(new Decimal(25).pow(level(34)));
    if (hasLevel(35, 1)) gain = gain.mul(new Decimal(1.1).pow(level(35)));
    if (hasLevel(36, 1)) gain = gain.pow(new Decimal(1.05).pow(level(36)));
    if (hasLevel(37, 1)) gain = gain.mul(new Decimal(1.03).pow(level(37)));
    if (hasLevel(38, 1)) gain = gain.mul(new Decimal(1.5).pow(level(38)));
    if (hasLevel(39, 1)) gain = gain.mul(new Decimal(5.25).pow(level(39)));
    if (upgradeMaxed(40)) gain = gain.mul(50);
    gain = gain.mul(GetUltraPointEffect());
    if (player.devSpeed) return gain.mul(deltaTime).mul(player.devSpeed);
    return gain.mul(deltaTime);
}

function getSuperPointGain() {
    let points = player.points;
    let exponent = new Decimal(0.1);
    if (upgradeMaxed(30)) exponent = exponent.add(0.025);
    let base = new Decimal(1e100);
    if (upgradeMaxed(31)) base = base.div(1e4);
    if (upgradeMaxed(33)) base = base.div(1e6);
    points = points.div(base);
    points = points.pow(exponent);
    if (hasLevel(25, 1)) points = points.mul(new Decimal(1.25).pow(level(25)));
    if (hasLevel(26, 1)) points = points.mul(new Decimal(1.128).pow(level(26)));
    if (upgradeMaxed(40)) points = points.mul(3);
    points = points.floor().sub(player.superPointsSubtracted).max(player.superPoints);
    return points;
}

function reverseSuperPointGain() {
    let points = player.superPoints.add(1).add(player.superPointsSubtracted);
    let exponent = new Decimal(0.1);
    if (upgradeMaxed(30)) exponent = exponent.add(0.025);
    let base = new Decimal(1e100);
    if (upgradeMaxed(31)) base = base.div(1e4);
    if (upgradeMaxed(33)) base = base.div(1e6);
    if (hasLevel(25, 1)) points = points.div(new Decimal(1.25).pow(level(25)));
    if (hasLevel(26, 1)) points = points.div(new Decimal(1.128).pow(level(26)));
    if (upgradeMaxed(40)) points = points.div(3);
    points = points.pow(new Decimal(1).div(exponent));
    points = points.mul(base);
    return points;
}

function getUltraPointGain() {
    let points = player.superPoints;
    let exponent = new Decimal(0.4);
    let base = new Decimal(1e20);
    points = points.div(base);
    points = points.pow(exponent);
    points = points.floor().sub(player.ultraPointsSubtracted).max(player.ultraPoints);
    return points;
}

function reverseUltraPointGain() {
    let points = player.ultraPoints.add(1).add(player.ultraPointsSubtracted);
    let exponent = new Decimal(0.4);
    let base = new Decimal(1e20);
    points = points.pow(new Decimal(1).div(exponent));
    points = points.mul(base);
    return points;
}

function GetUltraPointEffect() {
    let points = player.ultraPoints.add(1);
    let exponent = new Decimal(0.5);
    return points.pow(exponent);
}