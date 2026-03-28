window.addEventListener("message", e => {
    if (e.origin === "https://galaxy.click") {
        const r = e.data;
        console.log(r);
        switch (r.type) {
            case "info": {
                if (r.logged_in === true) {
                    player.settings.cloudSaving = true;
                }
                if (player.settings.autoThemeSet) {
                    if (r.theme_preference !== "dark") {
                        setTheme("default");
                    }
                    else {
                        setTheme("dark");
                    }
                }
                break;
            }
            default: {
                console.log("Invalid response type.");
            }
        }
    }
});