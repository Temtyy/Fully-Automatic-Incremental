const achievements = [
    {
        title: "The beginning",
        description: "Start the game. Reward: Unlock 4 new achievements.",
        unlocked() { return getPointGain(1).gt(0) },
        visible() { return true; }
    },
    {
        title: "The first of many",
        description: "Get the <s>first</s> second upgrade.",
        unlocked() { return hasLevel(1, 1) },
        visible() { return hasAch(0); }
    },
    {
        title: "That's a lot of points",
        description: "Get 1e10 points.",
        unlocked() { return player.points.gte(1e10) },
        visible() { return hasAch(0); }
    },
    {
        title: "Even more points",
        description: "Get 1e50 points.",
        unlocked() { return player.points.gte(1e50) },
        visible() { return hasAch(0); }
    },
    {
        title: "Something new",
        description: "Get 1e100 points.",
        unlocked() { return player.points.gte(1e100) },
        visible() { return hasAch(0); }
    },
];