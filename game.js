// Boot Sequence Animation
async function runBootSequence() {
    const bootText = document.getElementById('boot-text');
    const bootSequence = document.getElementById('boot-sequence');
    const gameContainer = document.getElementById('game-container');

    const bootMessages = [
        { text: 'ORBITAL SALVAGE SYSTEMS v0.01', delay: 50, class: 'info' },
        { text: 'Initializing core systems...', delay: 30 },
        { text: '[OK] Memory allocation complete', delay: 20, class: 'success' },
        { text: '[OK] Neural interface connected', delay: 20, class: 'success' },
        { text: '[OK] Quantum encryption enabled', delay: 20, class: 'success' },
        { text: '[OK] Debris field scanners online', delay: 20, class: 'success' },
        { text: '', delay: 300 },
        { text: 'Loading security protocols...', delay: 30 },
        { text: '[OK] Firewall active', delay: 20, class: 'success' },
        { text: '[OK] Defense grid armed', delay: 20, class: 'success' },
        { text: '', delay: 300 },
        { text: '════════════════════════════════════', delay: 10, class: 'info' },
        { text: '     SECURE LOGIN REQUIRED', delay: 50, class: 'warning' },
        { text: '════════════════════════════════════', delay: 10, class: 'info' },
        { text: '', delay: 500 },
        { text: 'Username: ', delay: 50, typing: true },
        { text: 'grn.dfndr', delay: 80, typing: true, class: 'info' },
        { text: '', delay: 300 },
        { text: 'Password: ', delay: 50, typing: true },
        { text: '********', delay: 100, typing: true, class: 'info' },
        { text: '', delay: 500 },
        { text: 'Authenticating...', delay: 30 },
        { text: '[OK] Identity verified', delay: 600, class: 'success' },
        { text: '[OK] Access granted', delay: 300, class: 'success' },
        { text: '', delay: 300 },
        { text: 'Welcome, Runner.', delay: 50, class: 'success' },
        { text: 'Establishing connection to debris field...', delay: 30 },
        { text: '', delay: 500 },
        { text: 'SYSTEM READY', delay: 100, class: 'success' }
    ];

    async function typeText(text, className = '') {
        return new Promise(resolve => {
            let i = 0;
            const span = document.createElement('span');
            if (className) span.className = className;
            bootText.appendChild(span);

            const interval = setInterval(() => {
                if (i < text.length) {
                    span.textContent += text[i];
                    i++;
                } else {
                    clearInterval(interval);
                    bootText.appendChild(document.createElement('br'));
                    resolve();
                }
            }, 50);
        });
    }

    async function addLine(text, className = '') {
        const span = document.createElement('span');
        if (className) span.className = className;
        span.textContent = text;
        bootText.appendChild(span);
        bootText.appendChild(document.createElement('br'));
        bootText.scrollTop = bootText.scrollHeight;
    }

    for (const msg of bootMessages) {
        if (msg.typing) {
            await typeText(msg.text, msg.class);
        } else {
            await addLine(msg.text, msg.class);
        }
        await new Promise(resolve => setTimeout(resolve, msg.delay));
    }

    // Fade out boot sequence
    await new Promise(resolve => setTimeout(resolve, 800));
    bootSequence.classList.add('fade-out');

    // Fade in game
    await new Promise(resolve => setTimeout(resolve, 500));
    gameContainer.style.transition = 'opacity 1s';
    gameContainer.style.opacity = '1';

    // Remove boot sequence after fade
    setTimeout(() => {
        bootSequence.remove();
    }, 1000);
}

// Game State
const game = {
    metal: 0,
    totalClicks: 0,
    metalPerClick: 1,
    metalPerSecond: 0,
    defenseRating: 0,

    spaceships: {
        'Recon Drone': 0,
        'Interceptor': 0,
        'Gunship': 0,
        'Destroyer': 0,
        'Capital Ship': 0,
        'Titan-Class': 0
    },

    shipsDeployed: {
        'Recon Drone': 0,
        'Interceptor': 0,
        'Gunship': 0,
        'Destroyer': 0,
        'Capital Ship': 0,
        'Titan-Class': 0
    },

    upgrades: {
        'Plasma Cutter': 0,
        'Nano-Drill': 0,
        'Salvage Bot': 0,
        'Breach Protocol': 0,
        'Orbital Platform': 0,
        'Singularity Engine': 0,
        'Aegis Protocol': 0,
        'Neural Link': 0,
        'Quantum Firewall': 0
    },

    upgradeData: {
        'Plasma Cutter': { cost: 50, bonus: 1, type: 'click' },
        'Nano-Drill': { cost: 500, bonus: 5, type: 'click' },
        'Salvage Bot': { cost: 100, bonus: 1, type: 'passive' },
        'Breach Protocol': { cost: 1000, bonus: 10, type: 'passive' },
        'Orbital Platform': { cost: 5000, bonus: 50, type: 'passive' },
        'Singularity Engine': { cost: 25000, bonus: 250, type: 'passive' },
        'Aegis Protocol': { cost: 200, bonus: 2, type: 'defense' },
        'Neural Link': { cost: 2000, bonus: 5, type: 'defense' },
        'Quantum Firewall': { cost: 10000, bonus: 10, type: 'defense' }
    },

    spaceshipCosts: {
        'Recon Drone': 1000,
        'Interceptor': 5000,
        'Gunship': 25000,
        'Destroyer': 100000,
        'Capital Ship': 500000,
        'Titan-Class': 2500000
    },

    spaceshipIncome: {
        'Recon Drone': 5,
        'Interceptor': 25,
        'Gunship': 100,
        'Destroyer': 500,
        'Capital Ship': 2500,
        'Titan-Class': 12500
    },

    shipDurability: {
        'Recon Drone': 0.70,
        'Interceptor': 0.75,
        'Gunship': 0.80,
        'Destroyer': 0.85,
        'Capital Ship': 0.90,
        'Titan-Class': 0.95
    },

    shipIcons: {
        'Recon Drone': '▸',
        'Interceptor': '▶',
        'Gunship': '◆',
        'Destroyer': '◈',
        'Capital Ship': '◉',
        'Titan-Class': '◙'
    },

    hackThresholds: [10000, 50000, 100000, 250000, 500000, 1000000, 2500000, 5000000],
    lastThresholdCrossed: -1,
    underAttack: false,
    showingWarning: false,
    warningTimeLeft: 0,
    isBossBattle: false,
    defenseClicksNeeded: 0,
    defenseClicksDone: 0,
    defenseTimeLeft: 0,

    randomAttackEnabled: false,
    timeSinceLastAttack: 0,
    nextAttackIn: 0,
    randomAttackCount: 0,

    combatLog: []
};

// Initialize game
function init() {
    setupUpgrades();
    setupFleet();
    setupEventListeners();
    updateDisplay();

    // Start passive income loop
    setInterval(passiveIncomeLoop, 100);
}

// Setup upgrades list
function setupUpgrades() {
    const upgradesList = document.getElementById('upgrades-list');

    for (const [name, data] of Object.entries(game.upgradeData)) {
        const item = document.createElement('div');
        item.className = 'upgrade-item';

        let typeText = data.type === 'click' ? 'HARV.PWR' :
                      data.type === 'defense' ? 'DEFENSE' : 'AUTO.MINE';
        let bonusText = data.type === 'click' ? `+${data.bonus} /click` :
                       data.type === 'defense' ? `-${data.bonus} clicks needed` :
                       `+${data.bonus} /sec`;

        item.innerHTML = `
            <div class="item-info">
                <div class="item-name">>> ${name.toUpperCase()}</div>
                <div class="item-type">[${typeText}]</div>
                <div class="item-bonus">BONUS: ${bonusText}</div>
                <div class="item-count" data-upgrade="${name}">QTY: 0</div>
            </div>
            <div class="item-buttons">
                <button class="buy-button" data-upgrade="${name}">
                    ACQUIRE<br>${data.cost} CR
                </button>
            </div>
        `;

        upgradesList.appendChild(item);
    }
}

// Setup fleet list
function setupFleet() {
    const fleetList = document.getElementById('fleet-list');

    for (const [name, cost] of Object.entries(game.spaceshipCosts)) {
        const item = document.createElement('div');
        item.className = 'ship-item';
        const icon = game.shipIcons[name];
        const income = game.spaceshipIncome[name];

        item.innerHTML = `
            <div class="item-info">
                <div class="item-name">${icon} ${name.toUpperCase()}</div>
                <div class="item-bonus">OUTPUT: +${income} /sec</div>
                <div class="item-count" data-ship-hangar="${name}">HANGAR: 0</div>
                <div class="item-count" data-ship-deployed="${name}">DEPLOYED: 0</div>
            </div>
            <div class="item-buttons">
                <button class="build-button" data-ship="${name}">
                    BUILD<br>${cost.toLocaleString()} CR
                </button>
                <button class="deploy-button" data-ship="${name}">DEPLOY</button>
                <button class="recall-button" data-ship="${name}">RECALL</button>
            </div>
        `;

        fleetList.appendChild(item);
    }
}

// Event listeners
function setupEventListeners() {
    // Mine button (support both click and touch)
    const mineButton = document.getElementById('mine-button');
    mineButton.addEventListener('click', mine);
    mineButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        mine();
    });

    // Tab switching
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab;
            switchTab(tab);
        });
    });

    // Log toggle
    document.getElementById('log-toggle').addEventListener('click', toggleLog);

    // Upgrade buttons
    document.querySelectorAll('.buy-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const upgrade = e.target.dataset.upgrade;
            buyUpgrade(upgrade);
        });
    });

    // Ship buttons
    document.querySelectorAll('.build-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ship = e.target.dataset.ship;
            buildShip(ship);
        });
    });

    document.querySelectorAll('.deploy-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ship = e.target.dataset.ship;
            deployShip(ship);
        });
    });

    document.querySelectorAll('.recall-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ship = e.target.dataset.ship;
            recallShip(ship);
        });
    });

    // Defend button (support both click and touch)
    const defendButton = document.getElementById('defend-button');
    defendButton.addEventListener('click', defendClick);
    defendButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        defendClick();
    });

    // Prevent zoom on double-tap for mobile
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        const lastTouch = document.lastTouchEnd || 0;
        if (now - lastTouch <= 300) {
            e.preventDefault();
        }
        document.lastTouchEnd = now;
    }, { passive: false });
}

// Switch tabs
function switchTab(tabName) {
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Toggle combat log
function toggleLog() {
    const logContent = document.getElementById('log-content');
    const toggleBtn = document.getElementById('log-toggle');

    if (logContent.classList.contains('collapsed')) {
        logContent.classList.remove('collapsed');
        toggleBtn.textContent = '▼';
    } else {
        logContent.classList.add('collapsed');
        toggleBtn.textContent = '▶';
    }
}

// Log collapsed state
let logCollapsed = true;

// Mine action
function mine() {
    game.metal += game.metalPerClick;
    game.totalClicks++;
    updateDisplay();
}

// Buy upgrade
function buyUpgrade(upgradeName) {
    const cost = getUpgradeCost(upgradeName);

    if (game.metal >= cost) {
        game.metal -= cost;
        game.upgrades[upgradeName]++;

        const data = game.upgradeData[upgradeName];
        if (data.type === 'click') {
            game.metalPerClick += data.bonus;
        } else if (data.type === 'defense') {
            game.defenseRating += data.bonus;
        } else {
            recalculatePassiveIncome();
        }

        updateDisplay();
    }
}

// Build ship
function buildShip(shipName) {
    const cost = game.spaceshipCosts[shipName];

    if (game.metal >= cost) {
        game.metal -= cost;
        game.spaceships[shipName]++;
        updateDisplay();
    }
}

// Deploy ship
function deployShip(shipName) {
    if (game.spaceships[shipName] > 0) {
        game.spaceships[shipName]--;
        game.shipsDeployed[shipName]++;
        recalculatePassiveIncome();
        logEvent(`>> DEPLOYED: ${shipName}`);
        updateDisplay();
    }
}

// Recall ship
function recallShip(shipName) {
    if (game.shipsDeployed[shipName] > 0) {
        game.shipsDeployed[shipName]--;
        game.spaceships[shipName]++;
        recalculatePassiveIncome();
        logEvent(`<< RECALLED: ${shipName}`);
        updateDisplay();
    }
}

// Get upgrade cost (increases with each purchase)
function getUpgradeCost(upgradeName) {
    const baseCost = game.upgradeData[upgradeName].cost;
    const owned = game.upgrades[upgradeName];
    return Math.floor(baseCost * Math.pow(1.15, owned));
}

// Recalculate passive income
function recalculatePassiveIncome() {
    let total = 0;

    // From upgrades
    for (const [name, count] of Object.entries(game.upgrades)) {
        const data = game.upgradeData[name];
        if (data.type === 'passive') {
            total += data.bonus * count;
        }
    }

    // From deployed ships
    for (const [name, count] of Object.entries(game.shipsDeployed)) {
        total += game.spaceshipIncome[name] * count;
    }

    game.metalPerSecond = total;

    // Enable random attacks if mining rate is high enough
    if (game.metalPerSecond >= 50 && !game.randomAttackEnabled) {
        game.randomAttackEnabled = true;
        scheduleNextRandomAttack();
    }
}

// Passive income loop
function passiveIncomeLoop() {
    if (game.metalPerSecond > 0) {
        game.metal += game.metalPerSecond / 10;
    }

    // Update warning timer
    if (game.showingWarning) {
        game.warningTimeLeft -= 0.1;
        if (game.warningTimeLeft <= 0) {
            hideWarning();
        } else {
            document.getElementById('warning-countdown').textContent = `${game.warningTimeLeft.toFixed(1)}s`;
        }
    }

    // Check for threshold breaches
    if (!game.underAttack && !game.showingWarning) {
        checkHackThreshold();
    }

    // Check for random attacks
    if (game.randomAttackEnabled && !game.underAttack && !game.showingWarning) {
        game.timeSinceLastAttack += 0.1;
        if (game.timeSinceLastAttack >= game.nextAttackIn) {
            showWarning(false); // false = not a boss
        }
    }

    // Update defense timer
    if (game.underAttack) {
        game.defenseTimeLeft -= 0.1;
        if (game.defenseTimeLeft <= 0) {
            hackFailed();
        } else {
            document.getElementById('attack-timer').textContent = `TIME: ${game.defenseTimeLeft.toFixed(1)}s`;
        }
    }

    updateDisplay();
}

// Check hack threshold
function checkHackThreshold() {
    for (let i = 0; i < game.hackThresholds.length; i++) {
        if (game.metal >= game.hackThresholds[i] && i > game.lastThresholdCrossed) {
            game.lastThresholdCrossed = i;
            showWarning(true); // true = boss battle
            break;
        }
    }
}

// Show warning before attack
function showWarning(isBoss) {
    game.showingWarning = true;
    game.isBossBattle = isBoss;
    game.warningTimeLeft = 3.0;

    const warningOverlay = document.getElementById('warning-overlay');
    const warningText = document.getElementById('warning-text');

    if (isBoss) {
        warningText.innerHTML = 'BOSS THREAT INCOMING<br>PREPARE DEFENSES';
        warningText.style.color = '#ff0000';
    } else {
        warningText.innerHTML = 'HOSTILE FLEET INCOMING<br>BRACE FOR IMPACT';
        warningText.style.color = '#ff4400';
    }

    warningOverlay.classList.remove('hidden');
}

// Hide warning and start attack
function hideWarning() {
    game.showingWarning = false;
    document.getElementById('warning-overlay').classList.add('hidden');

    if (game.isBossBattle) {
        triggerHackAttack();
    } else {
        triggerRandomAttack();
    }
}

// Trigger hack attack (threshold-based - BOSS BATTLE)
function triggerHackAttack() {
    game.underAttack = true;
    // Boss battles are significantly harder
    const baseClicks = 40 + (game.lastThresholdCrossed * 15);
    game.defenseClicksNeeded = Math.max(10, baseClicks - game.defenseRating);
    game.defenseClicksDone = 0;
    game.defenseTimeLeft = 15.0; // More time for boss battles

    logEvent('!!! BOSS BREACH DETECTED !!!');

    document.getElementById('connection-status').className = 'connection-status compromised';
    document.getElementById('connection-status').innerHTML =
        '!!! BOSS BREACH DETECTED !!!<br>Connection: COMPROMISED<br>!!! MAJOR THREAT !!!';

    document.getElementById('attack-warning').innerHTML =
        'ELITE NETRUNNER DETECTED<br>ATTEMPTING MAJOR DATA HEIST';

    document.getElementById('attack-overlay').classList.remove('hidden');
    document.getElementById('attack-progress').textContent =
        `FIREWALL STATUS: 0/${game.defenseClicksNeeded}`;
}

// Trigger random attack (periodic, easier than boss battles)
function triggerRandomAttack() {
    game.underAttack = true;
    game.randomAttackCount++;

    // Periodic attacks get harder with each wave (accelerating difficulty)
    const baseClicks = 12;
    const miningBonus = Math.min(20, Math.floor(game.metalPerSecond / 25)); // Caps at 20
    const progressionBonus = Math.floor((game.randomAttackCount - 1) * (game.randomAttackCount) / 2); // Triangular: 0,1,3,6,10,15...
    const totalBeforeDefense = baseClicks + miningBonus + progressionBonus;
    game.defenseClicksNeeded = Math.max(5, totalBeforeDefense - game.defenseRating);
    game.defenseClicksDone = 0;
    game.defenseTimeLeft = 10.0;

    console.log(`Attack #${game.randomAttackCount}: base=${baseClicks}, mining=${miningBonus}, progression=${progressionBonus}, defense=-${game.defenseRating}, total=${game.defenseClicksNeeded}`);
    logEvent(`!!! RANDOM ATTACK #${game.randomAttackCount} (${game.defenseClicksNeeded} clicks) !!!`);

    document.getElementById('connection-status').className = 'connection-status compromised';
    document.getElementById('connection-status').innerHTML =
        '!!! RANDOM ATTACK !!!<br>Connection: HOSTILE<br>!!! DEFEND FLEET !!!';

    document.getElementById('attack-warning').innerHTML =
        'HOSTILE FLEET DETECTED<br>ATTACKING YOUR DEPLOYED SHIPS!';

    document.getElementById('attack-overlay').classList.remove('hidden');
    document.getElementById('attack-progress').textContent =
        `FIREWALL STATUS: 0/${game.defenseClicksNeeded}`;
}

// Schedule next random attack
function scheduleNextRandomAttack() {
    const baseInterval = Math.max(15, 60 - (game.metalPerSecond / 20));
    game.nextAttackIn = baseInterval * (0.7 + Math.random() * 0.6);
    game.timeSinceLastAttack = 0;
}

// Defend click
function defendClick() {
    if (!game.underAttack) return;

    game.defenseClicksDone++;
    document.getElementById('attack-progress').textContent =
        `FIREWALL STATUS: ${game.defenseClicksDone}/${game.defenseClicksNeeded}`;

    if (game.defenseClicksDone >= game.defenseClicksNeeded) {
        hackDefeated();
    }
}

// Hack defeated
function hackDefeated() {
    game.underAttack = false;
    document.getElementById('attack-overlay').classList.add('hidden');

    const bonus = Math.floor(game.metal * 0.05);
    game.metal += bonus;

    logEvent(`✓✓ ATTACK REPELLED! +${bonus.toLocaleString()} CR`);

    document.getElementById('connection-status').className = 'connection-status secure';
    document.getElementById('connection-status').innerHTML =
        `ATTACK REPELLED!<br>Connection: SECURE<br>+${bonus.toLocaleString()} CR BONUS`;

    if (game.randomAttackEnabled) {
        scheduleNextRandomAttack();
    }

    setTimeout(resetConnectionStatus, 3000);
}

// Hack failed
function hackFailed() {
    game.underAttack = false;
    document.getElementById('attack-overlay').classList.add('hidden');

    const lostCredits = Math.floor(game.metal * 0.30);
    game.metal = Math.max(0, game.metal - lostCredits);

    const [destroyed, totalDestroyed] = destroyShips();

    logEvent(`!! DEFENSE FAILED: -${lostCredits.toLocaleString()} CR`);
    if (totalDestroyed > 0) {
        logEvent(`!! TOTAL LOSSES: ${totalDestroyed} ships`);
    }

    let statusMsg = '!!! ATTACK SUCCESSFUL !!!<br>';
    if (totalDestroyed > 0) {
        statusMsg += `-${totalDestroyed} SHIPS DESTROYED<br>`;
    }
    statusMsg += `-${lostCredits.toLocaleString()} CR STOLEN`;

    document.getElementById('connection-status').className = 'connection-status compromised';
    document.getElementById('connection-status').innerHTML = statusMsg;

    if (game.randomAttackEnabled) {
        scheduleNextRandomAttack();
    }

    setTimeout(resetConnectionStatus, 5000);
}

// Destroy ships
function destroyShips() {
    const destroyed = {};
    let totalDestroyed = 0;

    for (const [shipName, count] of Object.entries(game.shipsDeployed)) {
        if (count > 0) {
            let survivors = 0;
            // Boss battles reduce survival rate by 20%
            const survivalRate = game.isBossBattle
                ? Math.max(0.3, game.shipDurability[shipName] - 0.2)
                : game.shipDurability[shipName];

            for (let i = 0; i < count; i++) {
                if (Math.random() < survivalRate) {
                    survivors++;
                }
            }

            const losses = count - survivors;
            if (losses > 0) {
                destroyed[shipName] = losses;
                totalDestroyed += losses;
                game.shipsDeployed[shipName] = survivors;
                logEvent(`XX DESTROYED: ${losses}x ${shipName}`);
            }
        }
    }

    if (totalDestroyed > 0) {
        recalculatePassiveIncome();
    }

    return [destroyed, totalDestroyed];
}

// Reset connection status
function resetConnectionStatus() {
    document.getElementById('connection-status').className = 'connection-status';
    document.getElementById('connection-status').innerHTML =
        'Breach Protocol Active<br>Connection: SECURE<br>Decryption: 100%';
}

// Log event
function logEvent(message) {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const logEntry = `[${timestamp}] ${message}\n`;

    game.combatLog.push(logEntry);
    if (game.combatLog.length > 20) {
        game.combatLog.shift();
    }

    const logDisplay = document.getElementById('log-content');
    logDisplay.textContent = game.combatLog.slice(-10).join('');
    logDisplay.scrollTop = logDisplay.scrollHeight;
}

// Update display
function updateDisplay() {
    // Stats
    document.getElementById('metal-stat').textContent =
        `│ SCRAP METAL......: ${Math.floor(game.metal).toLocaleString()}`;
    document.getElementById('mps-stat').textContent =
        `│ MINING RATE......: ${game.metalPerSecond.toLocaleString()} /sec`;
    document.getElementById('mpc-stat').textContent =
        `│ HARVEST POWER....: ${game.metalPerClick.toLocaleString()} /click`;
    document.getElementById('clicks-stat').textContent =
        `│ TOTAL EXTRACTS...: ${game.totalClicks.toLocaleString()}`;
    document.getElementById('defense-stat').textContent =
        `│ DEFENSE RATING...: ${game.defenseRating}`;

    // Upgrades
    for (const [name, count] of Object.entries(game.upgrades)) {
        const cost = getUpgradeCost(name);
        const countEl = document.querySelector(`[data-upgrade="${name}"].item-count`);
        const btnEl = document.querySelector(`[data-upgrade="${name}"].buy-button`);

        if (countEl) countEl.textContent = `QTY: ${count}`;
        if (btnEl) {
            btnEl.innerHTML = `ACQUIRE<br>${cost.toLocaleString()} CR`;
            btnEl.disabled = game.metal < cost;
        }
    }

    // Ships
    for (const shipName of Object.keys(game.spaceships)) {
        const hangarCount = game.spaceships[shipName];
        const deployedCount = game.shipsDeployed[shipName];
        const cost = game.spaceshipCosts[shipName];

        const hangarEl = document.querySelector(`[data-ship-hangar="${shipName}"]`);
        const deployedEl = document.querySelector(`[data-ship-deployed="${shipName}"]`);
        const buildBtn = document.querySelector(`[data-ship="${shipName}"].build-button`);
        const deployBtn = document.querySelector(`[data-ship="${shipName}"].deploy-button`);
        const recallBtn = document.querySelector(`[data-ship="${shipName}"].recall-button`);

        if (hangarEl) hangarEl.textContent = `HANGAR: ${hangarCount}`;
        if (deployedEl) deployedEl.textContent = `DEPLOYED: ${deployedCount}`;

        if (buildBtn) buildBtn.disabled = game.metal < cost;
        if (deployBtn) deployBtn.disabled = hangarCount === 0;
        if (recallBtn) recallBtn.disabled = deployedCount === 0;
    }
}

// Start boot sequence then game
runBootSequence().then(() => {
    init();
});
