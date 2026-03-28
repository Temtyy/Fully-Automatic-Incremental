const achievements = [
    {
        title: "The beginning",
        description: "Start the game.",
        tooltip: "Reward: Unlock 4 new achievements.",
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
        tooltip: "Reward: Unlock 5 new achievements.",
        unlocked() { return player.points.gte(1e100) },
        visible() { return hasAch(0); }
    },
    {
        title: "That's a lot",
        description: "Get 100 super points.",
        unlocked() { return player.superPoints.gte(100) },
        visible() { return hasAch(4); }
    },
    {
        title: "Back to the points",
        description: "Get the \"Something new for normal points\" upgrade.",
        unlocked() { return upgradeMaxed(27) },
        visible() { return hasAch(4); }
    },
    {
        title: "Huge boost",
        description: "Buy 1 level of the \"High cost, high reward\" upgrade.",
        unlocked() { return hasLevel(33, 1) },
        visible() { return hasAch(4); }
    },
    {
        title: "Dynamic upgrade!? Impossible!",
        description: "Buy the \"A dynamic upgrade!?\" upgrade.",
        unlocked() { return upgradeMaxed(56) },
        visible() { return hasAch(4); }
    },
    {
        title: "New points again",
        description: "Get 1 ultra point.",
        unlocked() { return player.ultraPoints.gte(1) },
        visible() { return hasAch(4); }
    },
];