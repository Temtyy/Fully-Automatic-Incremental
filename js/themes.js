const themes = {
    default: {
        textColor: "#000000",
        bgColor: "#FFFFFF",
        achievementColor: "#BBB",
        superPointColor: "#005c51",
        megaPointColor: "#308f00"
    },
    dark: {
        textColor: "#FFFFFF",
        bgColor: "#000000",
        achievementColor: "#444",
        superPointColor: "#00ffe1",
        megaPointColor: "#4de600"
    }
}

let currentTheme = 0;

function switchTheme() {
    currentTheme = (currentTheme + 1) % Object.keys(themes).length;
    setTheme(Object.keys(themes)[currentTheme]);
    player.settings.theme = Object.keys(themes)[currentTheme];
    $("#theme").text("Current theme: " + String(player.settings.theme).charAt(0).toUpperCase() + String(player.settings.theme).slice(1))
}

function setTheme(theme) {
    $(":root").css({
        "--text-color": themes[theme].textColor,
        "--bg-color": themes[theme].bgColor,
        "--achievement-bg-color": themes[theme].achievementColor,
        "--super-point-color": themes[theme].superPointColor,
        "--mega-point-color": themes[theme].megaPointColor
    });
}