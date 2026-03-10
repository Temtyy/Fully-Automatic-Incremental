const themes = {
    default: {
        textColor: "#000000",
        bgColor: "#FFFFFF"
    },
    dark: {
        textColor: "#FFFFFF",
        bgColor: "#000000"
    }
}

let currentTheme = 0;

function switchTheme() {
    currentTheme = (currentTheme + 1) % Object.keys(themes).length;
    $(":root").css({
        "--text-color": themes[Object.keys(themes)[currentTheme]].textColor,
        "--bg-color": themes[Object.keys(themes)[currentTheme]].bgColor,
    })
}

switchTheme();