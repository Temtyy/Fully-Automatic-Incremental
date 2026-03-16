class upgrade {
    buyUpgrade() {
        if (this.level.lt(this.maxLevel) && player[this.currency].gte(this.cost())) {
            if (typeof(this.spendsCurrency) == "undefined" || this.spendsCurrency == true) player[this.currency] = player[this.currency].sub(this.cost());
            this.level = this.level.add(1);
            
            if (this.currency != "points") {
                if (typeof(this.spendsCurrency) == "undefined" || this.spendsCurrency == true) player[this.currency + "Subtracted"] = player[this.currency + "Subtracted"].add(this.cost());
            }

            if (player.upgrades[this.id]) player.upgrades[this.id] = player.upgrades[this.id].add(1);
            else player.upgrades[this.id] = new Decimal(1);
            $( "#upgrade-cost-" + this.id ).text(format(this.cost()));
            $( "#upgrade-level-disp-" + this.id ).text(format(this.level, 0));
            return true;
        }
        return false;
    }
    constructor(data) {
        Object.assign(this, data);
        this.level = new Decimal(0);
    }
}

let upgrades = [
    new upgrade({
        id: 0,
        name: "The first one",
        description: "Start gaining one point per second.",
        cost() {
            return new Decimal(0);
        },
        maxLevel: new Decimal(1),
        previousUpg: -1,
        currency: "points"
    }),
    new upgrade({
        id: 1,
        name: "The second one",
        description: "Multiply point gain by x2.",
        cost() {
            return new Decimal(10);
        },
        maxLevel: new Decimal(1),
        previousUpg: 0,
        currency: "points"
    }),
    new upgrade({
        id: 2,
        name: "The third one",
        description: "Multiply point gain by x3.",
        cost() {
            return new Decimal(15);
        },
        maxLevel: new Decimal(1),
        previousUpg: 1,
        currency: "points"
    }),
    new upgrade({
        id: 3,
        name: "The repeatable one",
        description: "Multiply point gain by x1.25 every level.",
        cost() {
            return new Decimal(30).mul(new Decimal(2).pow(this.level));
        },
        maxLevel: new Decimal(10),
        previousUpg: 1,
        currency: "points"
    }),
    new upgrade({
        id: 4,
        name: "The fourth one, I think?",
        description: "Multiply point gain by x4.",
        cost() {
            return new Decimal(100);
        },
        maxLevel: new Decimal(1),
        previousUpg: 2,
        currency: "points"
    }),
    new upgrade({
        id: 5,
        name: "The something one",
        description: "Multiply point gain by x1.1 every level.",
        cost() {
            return new Decimal(400).mul(new Decimal(1.2).pow(this.level));
        },
        maxLevel: new Decimal(100),
        previousUpg: 4,
        currency: "points"
    }),
    new upgrade({
        id: 6,
        name: "A little boost",
        description: "Multiply point gain by x5.",
        cost() {
            return new Decimal(1000);
        },
        maxLevel: new Decimal(1),
        previousUpg: 4,
        currency: "points"
    }),
    new upgrade({
        id: 7,
        name: "Repeat",
        description: "Multiply point gain by x1.5 every level.",
        cost() {
            return new Decimal(1000).mul(new Decimal(2).pow(this.level));
        },
        maxLevel: new Decimal(50),
        previousUpg: 3,
        currency: "points"
    }),
    new upgrade({
        id: 8,
        name: "Repeater",
        description: "Multiply point gain by x1.25 every level.",
        cost() {
            return new Decimal(1e15).mul(new Decimal(1.5).pow(this.level));
        },
        maxLevel: new Decimal(100),
        previousUpg: 5,
        currency: "points"
    }),
    new upgrade({
        id: 9,
        name: "Repeaterer",
        description: "Multiply point gain by x1.125 every level.",
        cost() {
            return new Decimal(1e18).mul(new Decimal(1.25).pow(this.level));
        },
        maxLevel: new Decimal(1000),
        previousUpg: 5,
        currency: "points"
    }),
    new upgrade({
        id: 10,
        name: "Need some help?",
        description: "Multiply point gain by x3 every level.",
        cost() {
            return new Decimal(1e20).mul(new Decimal(2.5).pow(this.level));
        },
        maxLevel: new Decimal(4),
        previousUpg: 7,
        currency: "points"
    }),
    new upgrade({
        id: 11,
        name: "Need some help?",
        description: "Multiply point gain by x1.05 every level.",
        cost() {
            return new Decimal(1e38).mul(new Decimal(2).pow(this.level));
        },
        maxLevel: new Decimal(1000),
        previousUpg: 8,
        currency: "points",
        spendsCurrency: false
    }),
    new upgrade({
        id: 12,
        name: "Because I can help!",
        description: "Raise point gain by ^1.01 every level.",
        cost() {
            return new Decimal(1e40).mul(this.level.add(1).pow(this.level));
        },
        maxLevel: new Decimal(25),
        previousUpg: 8,
        currency: "points",
        spendsCurrency: false
    }),
    new upgrade({
        id: 13,
        name: "The final push to 1e100!",
        description: "Multiply your points by x2 every level.",
        cost() {
            return new Decimal(1e85).mul(new Decimal(2.1).pow(this.level));
        },
        maxLevel: new Decimal(16),
        previousUpg: 12,
        currency: "points",
        spendsCurrency: false
    }),
    new upgrade({
        id: 14,
        name: "New points?",
        description: "Multiply your point gain by x5.",
        cost() {
            return new Decimal(2);
        },
        maxLevel: new Decimal(1),
        previousUpg: 13,
        currency: "superPoints",
    }),
    new upgrade({
        id: 15,
        name: "New points!",
        description: "Multiply your point gain by x4.",
        cost() {
            return new Decimal(5);
        },
        maxLevel: new Decimal(1),
        previousUpg: 14,
        currency: "superPoints",
    }),
    new upgrade({
        id: 16,
        name: "Pretty cool, right?",
        description: "Multiply your point gain by x3.",
        cost() {
            return new Decimal(10);
        },
        maxLevel: new Decimal(1),
        previousUpg: 15,
        currency: "superPoints",
    }),
    new upgrade({
        id: 17,
        name: "Unnamed upgrade #1",
        description: "Multiply your point gain by x&pi;<sup>&pi;</sup>.",
        cost() {
            return new Decimal(20);
        },
        maxLevel: new Decimal(1),
        previousUpg: 16,
        currency: "superPoints",
    }),
    new upgrade({
        id: 18,
        name: "Unnamed upgrade #2",
        description: "Raise you point gain by ^1.01.",
        cost() {
            return new Decimal(25);
        },
        maxLevel: new Decimal(1),
        previousUpg: 17,
        currency: "superPoints",
    }),
    new upgrade({
        id: 19,
        name: "One with a huge level cap",
        description: "Multiply point gain by x1.001 every level.",
        cost() {
            return new Decimal(1e118).mul(new Decimal(1.005).pow(this.level));
        },
        maxLevel: new Decimal(100000),
        previousUpg: 9,
        currency: "points",
        spendsCurrency: false
    }),
    new upgrade({
        id: 20,
        name: "Unnamed upgrade #3",
        description: "Multiply point gain by x2.5 every level.",
        cost() {
            return new Decimal(25).mul(new Decimal(2).pow(this.level));
        },
        maxLevel: new Decimal(5),
        previousUpg: 18,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 21,
        name: "Unnamed upgrade #4",
        description: "Multiply point gain by x3.5 every level.",
        cost() {
            return new Decimal(40).mul(new Decimal(3).pow(this.level));
        },
        maxLevel: new Decimal(4),
        previousUpg: 18,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 22,
        name: "Unnamed upgrade #5",
        description: "Multiply point gain by x4.5 every level.",
        cost() {
            return new Decimal(75).mul(new Decimal(4).pow(this.level));
        },
        maxLevel: new Decimal(3),
        previousUpg: 18,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 23,
        name: "Unnamed upgrade #6",
        description: "Multiply point gain by x5.5 every level.",
        cost() {
            return new Decimal(150).mul(new Decimal(5).pow(this.level));
        },
        maxLevel: new Decimal(2),
        previousUpg: 18,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 24,
        name: "Unnamed upgrade #7",
        description: "Multiply point gain by x6.5 every level.",
        cost() {
            return new Decimal(275);
        },
        maxLevel: new Decimal(1),
        previousUpg: 18,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 25,
        name: "Something new?",
        description: "Multiply super point gain by x1.25 every level.",
        cost() {
            return new Decimal(650).mul(new Decimal(2).pow(this.level));
        },
        maxLevel: new Decimal(16),
        previousUpg: 20,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 26,
        name: "A second super point multiplier",
        description: "Multiply super point gain by x1.128 every level.",
        cost() {
            return new Decimal(2000).mul(new Decimal(1.13).pow(this.level));
        },
        maxLevel: new Decimal(8),
        previousUpg: 22,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 27,
        name: "Something new for normal points",
        description: "Unlock new point upgrades.",
        cost() {
            return new Decimal(9500);
        },
        maxLevel: new Decimal(1),
        previousUpg: 26,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 28,
        name: "Back to the points",
        description: "Multiply point gain by x&pi; every level.",
        cost() {
            return new Decimal(6e131).mul(new Decimal(Math.PI + 0.1).pow(this.level));
        },
        maxLevel: new Decimal(3),
        previousUpg: 27,
        currency: "points",
    }),
    new upgrade({
        id: 29,
        name: "One with a different cost formula",
        description: "Multiply point gain by x10 every level.",
        cost() {
            return new Decimal(1e133).mul(this.level.add(1).pow(this.level.pow(1.56)));
        },
        maxLevel: new Decimal(5),
        previousUpg: 28,
        currency: "points",
    }),
    new upgrade({
        id: 30,
        name: "A huge super point boost",
        description: "Increase super point gain exponent by +0.025",
        cost() {
            return new Decimal(2.5e140);
        },
        maxLevel: new Decimal(1),
        previousUpg: 29,
        currency: "points",
    }),
    new upgrade({
        id: 31,
        name: "Another huge super point boost",
        description: "Divide required point base by 1e4.",
        cost() {
            return new Decimal(3e140);
        },
        maxLevel: new Decimal(1),
        previousUpg: 30,
        currency: "points",
    }),
    new upgrade({
        id: 32,
        name: "A point boost",
        description: "Raise point gain by ^1.05.",
        cost() {
            return new Decimal(35000000);
        },
        maxLevel: new Decimal(1),
        previousUpg: 31,
        currency: "superPoints",
    }),
    new upgrade({
        id: 33,
        name: "Huge super point boost again",
        description: "Divide required point base by 1e6.",
        cost() {
            return new Decimal(6e8);
        },
        maxLevel: new Decimal(1),
        previousUpg: 32,
        currency: "superPoints",
    }),
    new upgrade({
        id: 34,
        name: "This one has a different cost formula",
        description: "Multiply point gain by x25.",
        cost() {
            return new Decimal(3e9).mul(this.level.add(1).pow(this.level.pow(0.9).pow(this.level.gte(7) ? this.level.pow(0.1) : 1)));
        },
        maxLevel: new Decimal(10),
        previousUpg: 33,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 35,
        name: "One without a huge level cap",
        description: "Multiply point gain by x1.1.",
        cost() {
            return new Decimal(1e154).mul(new Decimal(1.025).pow(this.level.pow(1.35)));
        },
        maxLevel: new Decimal(100),
        previousUpg: 33,
        currency: "points",
        spendsCurrency: false
    }),
    new upgrade({
        id: 36,
        name: "High cost, high reward",
        description: "Raise point gain by ^1.05.",
        cost() {
            return new Decimal(1e162).pow(this.level.add(1).pow(new Decimal(0.235).mul(this.level.gte(2) ? this.level.sub(1) : 1)));
        },
        maxLevel: new Decimal(8),
        previousUpg: 35,
        currency: "points",
        spendsCurrency: false
    }),
    new upgrade({
        id: 37,
        name: "Low cost, low reward",
        description: "Multiply point gain by x1.03.",
        cost() {
            return new Decimal(1e180).mul(new Decimal(1.06).pow(this.level));
        },
        maxLevel: new Decimal(64),
        previousUpg: 35,
        currency: "points",
        spendsCurrency: false
    }),
    new upgrade({
        id: 38,
        name: "Mid cost, mid reward",
        description: "Multiply point gain by x1.5.",
        cost() {
            return new Decimal(1e182).mul(new Decimal(1.75).pow(this.level));
        },
        maxLevel: new Decimal(16),
        previousUpg: 37,
        currency: "points",
        spendsCurrency: false
    }),
    new upgrade({
        id: 39,
        name: "This one spends points?",
        description: "Multiply point gain by x5.25.",
        cost() {
            return new Decimal(1e188).mul(new Decimal(20).pow(this.level));
        },
        maxLevel: new Decimal(10),
        previousUpg: 38,
        currency: "points",
    }),
    new upgrade({
        id: 40,
        name: "New points!",
        description: "Multiply super point gain by x3 and point gain by x50.",
        cost() {
            return new Decimal(1);
        },
        maxLevel: new Decimal(1),
        previousUpg: 38,
        currency: "ultraPoints",
    }),
    new upgrade({
        id: 41,
        name: "A boost to points",
        description: "Multiply point gain by x1,000.",
        cost() {
            return new Decimal(1);
        },
        maxLevel: new Decimal(1),
        previousUpg: 40,
        currency: "ultraPoints",
    }),
    new upgrade({
        id: 42,
        name: "This is the point where the game slows down",
        description: "Multiply point gain by x500.",
        cost() {
            return new Decimal(3);
        },
        maxLevel: new Decimal(1),
        previousUpg: 41,
        currency: "ultraPoints",
    }),
    new upgrade({
        id: 43,
        name: "Just wait",
        description: "Multiply point gain by x99 every level.",
        cost() {
            return new Decimal(1.85e22).mul(this.level.add(1).pow(this.level.pow(0.75)));
        },
        maxLevel: new Decimal(10),
        previousUpg: 42,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 44,
        name: "More waiting",
        description: "Multiply point gain by x25.",
        cost() {
            return new Decimal(20);
        },
        maxLevel: new Decimal(1),
        previousUpg: 42,
        currency: "ultraPoints",
    }),
    new upgrade({
        id: 45,
        name: "Even more waiting",
        description: "Multiply point gain by x250.",
        cost() {
            return new Decimal(21);
        },
        maxLevel: new Decimal(1),
        previousUpg: 44,
        currency: "ultraPoints",
    }),
    new upgrade({
        id: 46,
        name: "Funny number",
        description: "Multiply point gain by x69.",
        cost() {
            return new Decimal(105);
        },
        maxLevel: new Decimal(1),
        previousUpg: 45,
        currency: "ultraPoints",
    }),
    new upgrade({
        id: 47,
        name: "A big boost",
        description: "Multiply point gain by x1,000.",
        cost() {
            return new Decimal(300);
        },
        maxLevel: new Decimal(1),
        previousUpg: 46,
        currency: "ultraPoints",
    }),
    new upgrade({
        id: 48,
        name: "Increased ultra boost",
        description: "Increase UP boost's exponent by +0.25.",
        cost() {
            return new Decimal(1200);
        },
        maxLevel: new Decimal(1),
        previousUpg: 47,
        currency: "ultraPoints",
        tooltip: "x<sup>0.5</sup>=>x<sup>0.75</sup>",
        spendsCurrency: false
    }),
    new upgrade({
        id: 49,
        name: "An average multiplier",
        description: "Multiply point gain by x2,500 and super point gain by x12.5.",
        cost() {
            return new Decimal(1.5e28);
        },
        maxLevel: new Decimal(1),
        previousUpg: 48,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 50,
        name: "Increased ultra boost",
        description: "Increase UP boost's exponent by +0.25.",
        cost() {
            return new Decimal(10000);
        },
        maxLevel: new Decimal(1),
        previousUpg: 49,
        currency: "ultraPoints",
        tooltip: "x<sup>0.75</sup>=>x",
        spendsCurrency: false
    }),
    new upgrade({
        id: 51,
        name: "Wait...",
        description: "Multiply point gain by x10,000 and super point gain by x25.",
        cost() {
            return new Decimal(2e30);
        },
        maxLevel: new Decimal(1),
        previousUpg: 50,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 52,
        name: "Super point increase",
        description: "Increase super point exponent by +0.075.",
        cost() {
            return new Decimal(2.25e35);
        },
        maxLevel: new Decimal(1),
        previousUpg: 51,
        currency: "superPoints",
        spendsCurrency: false
    }),
    new upgrade({
        id: 53,
        name: "One with a huge level cap: The extension",
        description: "Multiply point gain by x1.01 every level.",
        cost() {
            return new Decimal("3e342").mul(new Decimal(1.02).pow(this.level));
        },
        maxLevel: new Decimal(10000),
        previousUpg: 19,
        currency: "points",
        spendsCurrency: false
    }),
    new upgrade({
        id: 54,
        name: "A help",
        description: "Multiply point gain by x10.",
        cost() {
            return new Decimal("1e343").mul(new Decimal(10).pow(this.level));
        },
        maxLevel: new Decimal(4),
        previousUpg: 19,
        currency: "points",
        spendsCurrency: false
    }),
    new upgrade({
        id: 55,
        name: "Increased ultra boost again",
        description: "Multiply UP boost's exponent by x2.",
        cost() {
            return new Decimal(7.5e14);
        },
        maxLevel: new Decimal(1),
        previousUpg: 19,
        currency: "ultraPoints",
        tooltip: "x=>x<sup>2</sup>",
        spendsCurrency: false
    }),
]