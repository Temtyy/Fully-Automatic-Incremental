const themes = {
    default: {
        textColor: "#000000",
        bgColor: "#FFFFFF",
        superPointColor: "#005c51"
    },
    dark: {
        textColor: "#FFFFFF",
        bgColor: "#000000",
        superPointColor: "#00ffe1"
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
        "--super-point-color": themes[theme].superPointColor
    });
}