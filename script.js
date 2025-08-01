const workerBtn = document.getElementById("worker");
const goldenEggBtn = document.getElementById("golden-egg");
const eggClickBtn = document.getElementById("egg-click");
const upgradeBtns = document.querySelectorAll(".upgrade-btn");
const eggMultiplierBtn = document.getElementById("percent-upgrade");
const multiEggClickBtn = document.getElementById("multi-egg");
const xpClickBtn = document.getElementById("xp-upgrade");
const mutliGoldEggBtn = document.getElementById("multi-gold-egg");
const xpMultiBtn = document.getElementById("xp-percent-upgrade");
class Upgrades {
    constructor() {
        this.eggClickLevel = 0;
        this.workerLevel = 0;
        this.workerTime = 3000
        this.goldEggChanceLevel = 0;
        this.xpClickLevel = 0;
    }

    eggPerClick() {
        return 1 + this.eggClickLevel;
    }

    worker() {
        const workerRate = setInterval(() => {
            totalEggs += Math.floor(this.workerLevel * 1.2);
            eggCount.innerHTML = Math.floor(totalEggs);
        }, 3000) // add workerTime
        // 
        return workerRate;
    }

    goldenEggChance() {
        return (1 + this.goldEggChanceLevel) * 0.01;
    }
    xpPerClick() {
        return 0 + (4 * this.xpClickLevel);
    }
}

class Costs {
    clickEggCost() {
        return Math.floor(10 * Math.pow(1.5, upgrades.eggClickLevel));
    }

    workerCost() {
        return Math.floor(25 * Math.pow(2, upgrades.workerLevel));
    }

    goldenEggChanceCost() {
        return Math.floor(50 * Math.pow(4, upgrades.goldEggChanceLevel));
    }
    xpPerClickCost() {
        return Math.floor(200 * Math.pow(1.5, upgrades.xpClickLevel))
    }
}

class GoldUpgrades {
    constructor() {
        this.eggMultiplierLevel = 0; // fixed spelling
        this.xpMultiplierLevel = 0;
    }

    eggMultiplier() {
        return Math.pow(1.2, this.eggMultiplierLevel);
    }
    xpMultiplier() {
        return Math.pow (1.2, this.xpMultiplierLevel)
    }
}

class GoldCosts {
    eggMultiplierCost() {
        return 1 + (goldUpgrades.eggMultiplierLevel * 2);
    }
    xpMultiplierCost() {
        return 3 + (goldUpgrades.eggMultiplierLevel);
    }
}

// ====== VARIABLES ======
let totalEggs = Math.floor(0);
let goldenEggs = 0;

const upgrades = new Upgrades();
const cost = new Costs();
const goldUpgrades = new GoldUpgrades();
const goldCosts = new GoldCosts();

const eggCount = document.querySelector(".eggs");
const eggRateStatMsg = document.querySelector(".stats");
const goldEggDisplay = document.querySelector(".gold-egg-counter");

// ===== xp bar ======

  const progressBar = document.querySelector(".xp");
    let currentExp = 0;
    let minXp = 0;
    let maxXp = 100;
    let level = 1;
    let availablePerks = 0;
    const perkCount = document.querySelector(".perk-count")
    perkCount.innerHTML = `Perks: ${level}`;

    const levelMsg = document.querySelector(".level");

function xpBar() {
 
    const percent = (currentExp - minXp) / (maxXp - minXp) * 100;
    if (currentExp < maxXp) {
        currentExp += (4 + upgrades.xpPerClick()) * goldUpgrades.xpMultiplier();
    }
    if (currentExp >= maxXp) {
        currentExp = 0;
        level++;
        availablePerks++;
        maxXp = Math.floor(maxXp * 1.3);
        perkCount.innerHTML = `Perks: ${availablePerks}`;
    }
    
    progressBar.style.width = `${(currentExp / maxXp) * 100}%`
    levelMsg.innerHTML = `Level: ${level}`;
    const xpMsg = document.getElementById("xp-amount").innerHTML = `${currentExp} / ${maxXp}`;
    
}
class Perks {
    constructor() {
    this.multiEggClickLevel = 0;
    this.fastWorkersLevel = 0;
    this.multiGoldEggLevel = 0;
    }
    multiEggClick() {
        return (this.multiEggClickLevel * 5);
    }
    fastWorkersLevel() {
        return upgrades.workerTime - (this.fastWorkersLevel * 100);
    }
    multiGoldEggs() {
        return 1 + this.multiGoldEggLevel;
    }
}
const perks = new Perks();
class PerksCosts {
    multiEggClickCost() {
        return 2 + (perks.multiEggClickLevel * 2);
    }
    fastWorkersLevelCost() {
        return perks.fastWorkersLevel * 2;
    }
    multiGoldEggsCost() {
        return 5 + perks.multiEggClickLevel * 2;
    }
}
const perkCosts = new PerksCosts();
// ====== CLICK EVENT ======
document.getElementById("click").addEventListener("click", () => {
    totalEggs += upgrades.eggPerClick() * goldUpgrades.eggMultiplier() + perks.multiEggClick();
    eggCount.innerHTML = Math.floor(totalEggs);

    if (Math.random() < upgrades.goldenEggChance()) {
        const goldEggPopUp = document.getElementById("gold-eggs");
        goldEggPopUp.classList.add("gold-egg-animation");
        goldenEggs+= 1 + perks.multiGoldEggs();
        goldEggDisplay.innerHTML = `Golden Eggs: ${goldenEggs}`;

        setTimeout(() => {
            goldEggPopUp.classList.remove("gold-egg-animation");
        }, 3000);
    }
    xpBar();
    document.querySelector(".egg-count").innerHTML = `Eggs: ${totalEggs}`
});

// ====== UPGRADE FUNCTIONS ======
class UpgradeFunctions {

    // EGG UPGRADES

    buyClickUpgrade() {
        let eggCost = cost.clickEggCost();
        if (totalEggs >= eggCost) {
            totalEggs -= eggCost;
            upgrades.eggClickLevel++;
            eggCount.innerHTML = Math.floor(totalEggs);
        }

        eggClickBtn.innerHTML = cost.clickEggCost();
        eggRateStatMsg.innerHTML = `${Math.floor(upgrades.eggPerClick() * goldUpgrades.eggMultiplier()) + perks.multiEggClick()} eggs / click`;
        document.querySelector(".egg-upg-desc").innerHTML = `+${upgrades.eggPerClick()} eggs per click`;
    }

    buyWorkerUpgrade() {
        let eggCost = cost.workerCost();
        if (totalEggs >= eggCost) {
            totalEggs -= eggCost;
            upgrades.workerLevel++;
            eggCount.innerHTML = Math.floor(totalEggs);
            upgrades.worker();
        }

        workerBtn.innerHTML = cost.workerCost();
        document.querySelector(".worker-upg-desc").innerHTML = `+${upgrades.workerLevel} egg / 3s`;
    }

    buyGoldEggChanceUpgrade() {
        let eggCost = cost.goldenEggChanceCost();
        if (totalEggs >= eggCost) {
            totalEggs -= eggCost;
            upgrades.goldEggChanceLevel++;
            eggCount.innerHTML = Math.floor(totalEggs);
        }

        goldenEggBtn.innerHTML = cost.goldenEggChanceCost();
        document.querySelector(".gold-upg-desc").innerHTML = `${upgrades.goldEggChanceLevel + 1}%`;
    }
    buyXpClickUpgrade() {
        let eggCost = cost.xpPerClickCost();
        if (totalEggs >= eggCost) {
            totalEggs -= eggCost;
            upgrades.xpClickLevel++;
            eggCount.innerHTML = Math.floor(totalEggs);
        }
        xpClickBtn.innerHTML = cost.xpPerClickCost();
        document.querySelector(".xp-upgrade-desc").innerHTML = `+ ${upgrades.xpPerClick()}`;
    }

    // GOLD EGG UPGRADES

    buyEggMultiplierUpgrade() {
        let eggCost = goldCosts.eggMultiplierCost();
        if (goldenEggs >= eggCost) {
            goldenEggs -= eggCost;
            goldUpgrades.eggMultiplierLevel++;
            goldEggDisplay.innerHTML = `Golden Eggs: ${goldenEggs}`;
        }

        eggMultiplierBtn.innerHTML = goldCosts.eggMultiplierCost();
        document.querySelector(".multiplier-upg-desc").innerHTML =
            `${Math.floor((goldUpgrades.eggMultiplier() - 1) * 100)}%`;
    }
    buyXpMultiplierUpgrade() {
        let eggCost = goldCosts.xpMultiplierCost(); 
        if (goldenEggs >= eggCost) {
            goldenEggs -= eggCost;
            goldUpgrades.eggMultiplierLevel++;
            goldEggDisplay.innerHTML = `Golden Eggs: ${goldenEggs}`;

        }
        xpMultiBtn.innerHTML = goldCosts.xpMultiplierCost();
        document.querySelector(".xp-multipler-upg-desc").innerHTML = `${Math.floor(goldUpgrades.xpMultiplier( -1) * 100)}%`
    }
    // PERK UPGRADES

    buyMultiEggClick() {
        let eggCost = perkCosts.multiEggClickCost();
       
        if (availablePerks >= eggCost) {
            availablePerks -= eggCost;
            perks.multiEggClickLevel++;
            perkCount.innerHTML = `Perks: ${availablePerks}`;
        }
        const statMsg = document.querySelector(".multi-egg-click-upg-desc");
        statMsg.innerHTML = `+ ${perks.multiEggClickLevel * 5}`;
        multiEggClickBtn.innerHTML = perkCosts.multiEggClickCost();
    }
    buyMultiGoldEggs() {
        let eggCost = perkCosts.multiGoldEggsCost();
        if (availablePerks >= eggCost) {
            availablePerks -= eggCost;
            perks.multiGoldEggLevel++;
            perkCount.innerHTML = `Perks: ${availablePerks}`;
        }
        const statMsg = document.querySelector(".multi-gold-egg-upg");
        statMsg.innerHTML = `+ ${perks.multiGoldEggLevel}`;
        mutliGoldEggBtn.innerHTML = perkCosts.multiGoldEggsCost();
    }
}

const upgradeFunctions = new UpgradeFunctions();
// ====== EVENT LISTENERS ======
eggClickBtn.addEventListener("click", () => upgradeFunctions.buyClickUpgrade());
workerBtn.addEventListener("click", () => upgradeFunctions.buyWorkerUpgrade());
goldenEggBtn.addEventListener("click", () => upgradeFunctions.buyGoldEggChanceUpgrade());
eggMultiplierBtn.addEventListener("click", () => upgradeFunctions.buyEggMultiplierUpgrade());
multiEggClickBtn.addEventListener("click", () => upgradeFunctions.buyMultiEggClick());
xpClickBtn.addEventListener("click", () => upgradeFunctions.buyXpClickUpgrade());
mutliGoldEggBtn.addEventListener("click", () => upgradeFunctions.buyMultiGoldEggs());
xpMultiBtn.addEventListener("click", () => upgradeFunctions.buyXpMultiplierUpgrade());
// ====== INITIAL VALUES ======
eggClickBtn.innerHTML = cost.clickEggCost();
workerBtn.innerHTML = cost.workerCost();
goldenEggBtn.innerHTML = cost.goldenEggChanceCost();
eggMultiplierBtn.innerHTML = goldCosts.eggMultiplierCost();
multiEggClickBtn.innerHTML = perkCosts.multiEggClickCost();
xpClickBtn.innerHTML = cost.xpPerClickCost();
mutliGoldEggBtn.innerHTML = perkCosts.multiGoldEggsCost();
 xpMultiBtn.innerHTML = goldCosts.xpMultiplierCost();

