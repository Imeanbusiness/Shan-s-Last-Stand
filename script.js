(function(){
    'use strict';

    // DOM refs
    const player = document.getElementById("player");
    const gameArea = document.getElementById("gameArea");

    // Config constants
    const ShotgunCooldown = 1100; // milliseconds
    const CalcgunCooldown = 1500;
    const iFrames = 1000;
    const BaseSpeed = 5.5;

    // Game state (declared here so they're not globals on window)
    let sanity = 50;
    let sanityTimer = 0;
    let puzzlecooldown = 4000;
    let healthCount = 0;
    let scoreBoostCount = 0;
    let tankCount = 0;
    let showerCount = 0;
    let spawntime = 0;
    let elapsed = 0;
    let shanstate = 2;
    let CurrWeap = 1;
    let dashCharge = false;
    const Filename = "ShansStand/";

    // Player control state
    let dashing = false;
    let dashtimer = 90;
    let Hmessagetimer = 0;
    let SBmessagetimer = 0;

    // Audio
    const ouch = new Audio('Ouch.mp3'); // Replace with your sound file path
    const ShotgunSound = new Audio('ShotgunSound.mp3');
    const CalcgunSound = new Audio('Pew.mp3');
    const backgroundMusic = new Audio("shaunsshotgun.mp3");
    const deathSound = new Audio("ShanDeath.mp3");
    const domDeath = new Audio("DomDeath.mp3");
    const ZukDeath = new Audio("ZukDeath.mp3");
    const dashCharged = new Audio("DashCharge.mp3");

    // Other globals that were previously implicitly global
    let MathQuest = false;
    let Atdelay = 0;
    let Mult = 1;
    let Boost = false;
    let attackingDelay = 0;
    let BoostTime = 0;
    let attack = false;
    let FirstAttack = false;
    let spawnEnemy = 0;
    // transient vars that must not be globals
    let number1 = 0, number2 = 0, number3 = 0, chance = 0, ans = null;
    let newMessage = null;
    let time = 0;


function showDamage(x, y, damage) {
    const dmgEl = document.createElement("div");
    dmgEl.innerText = Math.floor(damage); // round down
    dmgEl.style.position = "absolute";
    dmgEl.style.left = `${x}px`;
    dmgEl.style.top = `${y}px`;
    dmgEl.style.color = "yellow";
    dmgEl.style.fontWeight = "bold";
    dmgEl.style.fontSize = "18px";
    dmgEl.style.textShadow = "1px 1px 2px black";
    dmgEl.style.pointerEvents = "none"; // won't block clicks
    gameArea.appendChild(dmgEl);

    // Animate floating up & fading out
    let pos = 0;
    const floatUp = setInterval(() => {
        pos += 1;
        dmgEl.style.top = `${y - pos}px`;
        dmgEl.style.opacity = 1 - pos / 30;
        if (pos >= 30) {
            clearInterval(floatUp);
            dmgEl.remove();
        }
    }, 16); // ~60fps
}




window.onload = function() {
    if (!localStorage.getItem(Filename+"hasVisited")) {
        localStorage.setItem(Filename+"hasVisited", "true");
        localStorage.setItem(Filename+"HS", 0);
        localStorage.setItem(Filename+"Time", 0);
        localStorage.setItem(Filename+"Wave", 0);
    } else {
        let hs = localStorage.getItem(Filename+"HS");
        let maxtime = localStorage.getItem(Filename+"Time");
        let maxwave = localStorage.getItem(Filename+"Wave");

    }
    alert("Welcome to the game!\nControls:\nWASD or Arrow Keys to move\nSpace to shoot\nShift to dash. You will hear a chime when cooldown is over\nC to answer a math question to regain sanity\n\nSanity affects damage! Sanity is sacrificed every few seconds.\nSurvive as many waves as you can!");

    backgroundMusic.play();
    backgroundMusic.loop = true;   // 🔁 make it loop
    backgroundMusic.volume = 2;  // optional: set volume
}

window.addEventListener("click", () => {
    backgroundMusic.play();
    backgroundMusic.loop = true;   // 🔁 make it loop
    backgroundMusic.volume = 2;
}, { once: true });

//calc
MathQuest = false;
let Wave = 1;
let invinc = false;
let score = 0;
let playerhp =  100;
//forEach
let x = 280;
let y = 280;
let speed = 5;
let direction = "n";
let lockdirection = "n";
const chargerSize = 60;
let chargerCount = 0;
attack = false;
FirstAttack = false;
let enemyCount = 0;
const directionAngles = {
  n: 180,
  ne: 225,
  e: 270,
  se: 315,
  s: 0,
  sw: 45,
  w: 90,
  nw: 135
};

const directionAnglesShots = {
  n: 0,
  ne: 45,
  e: 90,
  se: 135,
  s: 180,
  sw: 225,
  w: 270,
  nw: 315
};

//forEa

// Direction unit vectors for projectile movement
const directionVectors = {
  n:  { x:  0, y: -1 },
  ne: { x:  Math.SQRT1_2, y: -Math.SQRT1_2 },
  e:  { x:  1, y:  0 },
  se: { x:  Math.SQRT1_2, y:  Math.SQRT1_2 },
  s:  { x:  0, y:  1 },
  sw: { x: -Math.SQRT1_2, y:  Math.SQRT1_2 },
  w:  { x: -1, y:  0 },
  nw: { x: -Math.SQRT1_2, y: -Math.SQRT1_2 }
};

// Simple projectile list for weapon 2
let projectiles = [];
const projectileSpeed = 20; // pixels per frame

const keysPressed = {};
let enemies = [];

// Track key press/release
document.addEventListener("keydown", e => {keysPressed[e.key.toLowerCase()] = true
   if (e.key === "Escape") {
        alert("Game Paused. Press OK to resume.");
        for (let key in keysPressed) {
            keysPressed[key] = false;
        }
        try {
            const healthMsg = document.getElementById("HealthMessage");
            if (healthMsg) healthMsg.remove();

            const sbMsg = document.getElementById("SBMessage");
            if (sbMsg) sbMsg.remove();
        } catch (e) {

        }
}

});
document.addEventListener("keyup", e => {keysPressed[e.key.toLowerCase()] = false
    if (e.key.toLowerCase()=="c"  && !MathQuest) {
        MathQuest = true;
        sanity-=10;
        number1 = Math.floor(Math.random()*1000)
        number2 = Math.floor(Math.random()*100)
        number3 = Math.floor(Math.random()*50)
        chance = Math.floor(Math.random()*4)
        if (chance == 1) {
            ans = prompt("What is "+number1+" + "+number2+" ? Round your answer! Don't let Shan just sacrifice his sanity!")
            if (ans == number1+number2) {
                sanity += 20;
                alert("Correct! You feel a bit more sane.")
            } else {
                alert("Wrong Answer! Psycho!")
            }
        } else if (chance == 2) {
            ans = prompt("What is "+number1+" - "+number3+" ? Round your answer! Don't let Shan just sacrifice his sanity!")
            if (ans == number1-number3) {
                sanity += 20;
                alert("Correct! You feel a bit more sane.")
            } else {
                alert("Wrong Answer! Psycho!")
            }
        } else if (chance == 0) {
            ans = prompt("What is "+number3+" * "+number2+" ? Round your answer! Don't let Shan just sacrifice his sanity!")
            if (ans == number3*number2) {
                sanity += 20;
                alert("Correct! You feel a bit more sane.")
            } else {
                alert("Wrong Answer! Psycho!")
            }
        } else if (chance == 3) {
            ans = prompt("What is "+number1+" / "+number3+" ? Round your answer! Don't let Shan just sacrifice his sanity!")
            if (ans == Math.floor(number1 / number3)) {
                sanity += 20;
                alert("Correct! You feel a bit more sane.")
            } else {
                alert("Wrong Answer! Psycho!")
            }
        } else {
            ans = prompt("What is ("+number2+"^"+number3+")%"+number1+"-67 ? Round your answer! Don't let Shan just sacrifice his sanity!")
            if (ans == Math.floor(number2**number3%number1-67)) {
                sanity += 10000;
                alert("Correct! You feel super sane!")
            } else {
                alert("Wrong Answer! Psycho!")
            }
        }
        if (sanity > 100) {
            sanity = 100;
        }
        console.log(sanity)
        try {
            const healthMsg = document.getElementById("HealthMessage");
            if (healthMsg) healthMsg.remove();

            const sbMsg = document.getElementById("SBMessage");
            if (sbMsg) sbMsg.remove();
        } catch (e) {

        }
        for (let key in keysPressed) {
            keysPressed[key] = false;
        }
        setTimeout(() => { 
        MathQuest = false;
        }, puzzlecooldown);

    }
    if (e.key.toLowerCase()=="h") { 
        alert("Controls:\nWASD or Arrow Keys to move\nSpace to shoot\nShift to dash. You will hear a chime when cooldown is over\n1, 2 to toggle weapons. 1 for the Shauntgun, 2 for the Shauniper.\nC to answer a math question to regain sanity\n\nSanity affects damage! Sanity is sacrificed every few seconds.\nSurvive as many waves as you can!");
        for (let key in keysPressed) {
            keysPressed[key] = false;
        }
    }
});

// Enemy class
class Charger {
  constructor(x, y, speed, enemyHP, damage, fileName, width, height) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.enemyHP = enemyHP;
    this.fileName = fileName;
    this.damage =damage
    this.width = width;
    this.height = height;
    // Create the DOM element
    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.height = height+"px";
    this.el.style.width = width+"px";
    this.el.id = "enemy"+enemyCount;
    this.el.style.backgroundImage = "url('"+fileName+"')";
    this.el.style.backgroundSize = "cover";

    // Create HP display
    this.hpText = document.createElement("div");
    this.hpText.style.position = "absolute";
    this.hpText.style.top = "-15px"; // above the enemy
    this.hpText.style.left = "50%";
    this.hpText.style.transform = "translateX(-50%)";
    this.hpText.style.color = "red";
    this.hpText.style.fontSize = "14px";
    this.hpText.style.fontWeight = "bold";
    this.hpText.style.textAlign = "center";
    this.hpText.innerText = this.enemyHP;

    this.el.appendChild(this.hpText);
    gameArea.appendChild(this.el);
  }

    moveToward(targetX, targetY) {
        let dx = targetX - this.x;
        let dy = targetY - this.y;
        let dist = Math.hypot(dx, dy);
        if (dist > 0) {
        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;
        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;

        // Update HP text
        this.hpText.innerText = Math.ceil(this.enemyHP);

        // 🔥 Rotate enemy toward player
        let angleRad = Math.atan2(dy, dx); // radians
        let angleDeg = angleRad * (180 / Math.PI); // convert to degrees
        this.el.style.transform = `rotate(${angleDeg+90+180}deg)`;
        }
    }
}

class Tank {
  constructor(x, y, speed, enemyHP, sound) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.enemyHP = enemyHP;
    this.sound = sound;
    // Create the DOM element
    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.height = "80px";
    this.el.style.width = "80px";
    this.el.id = "enemy"+enemyCount;
    this.el.style.backgroundImage = "url('Zuk.png')";
    this.el.style.backgroundSize = "cover";

    // Create HP display
    this.hpText = document.createElement("div");
    this.hpText.style.position = "absolute";
    this.hpText.style.top = "-15px"; // above the enemy
    this.hpText.style.left = "50%";
    this.hpText.style.transform = "translateX(-50%)";
    this.hpText.style.color = "red";
    this.hpText.style.fontSize = "14px";
    this.hpText.style.fontWeight = "bold";
    this.hpText.style.textAlign = "center";
    this.hpText.innerText = this.enemyHP;

    this.el.appendChild(this.hpText);
    gameArea.appendChild(this.el);
  }

    moveToward(targetX, targetY) {
        let dx = targetX - this.x;
        let dy = targetY - this.y;
        let dist = Math.hypot(dx, dy);
        if (dist > 0) {
        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;
        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;

        // Update HP text
        this.hpText.innerText = Math.ceil(this.enemyHP);

        // 🔥 Rotate enemy toward player
        let angleRad = Math.atan2(dy, dx); // radians
        let angleDeg = angleRad * (180 / Math.PI); // convert to degrees
        this.el.style.transform = `rotate(${angleDeg+90+180}deg)`;
        }
    }
}
Atdelay = 0;
Mult = 1
Boost = false
scoreBoostCount = 0;

class HealPickup {
    constructor(x, y) {
    this.x = x;
    this.y = y;
    

    // Create the DOM element
    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.height = "45px";
    this.el.style.width = "45px";
    this.el.id = "enemy"+enemyCount;
    this.el.style.backgroundImage = "url('Calc.png')";
    this.el.style.backgroundSize = "cover";
    gameArea.appendChild(this.el);
  }
}

class ScoreBoost {
    constructor(x, y) {
    this.x = x;
    this.y = y;
    

    // Create the DOM element
    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.height = "45px";
    this.el.style.width = "45px";
    this.el.id = "enemy"+enemyCount;
    this.el.style.backgroundImage = "url('CalcBook.jpg')";
    this.el.style.backgroundSize = "cover";
    gameArea.appendChild(this.el);
  }
}


// ---------------- Obstacle System ----------------
// Simple axis-aligned rectangular obstacles within the game area
let obstacles = [];

function createObstacleElement(x, y, width, height, color) {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.background = color || "rgba(0,0,0,0.15)";
    return el;
}

// Public API: add a collidable rectangular obstacle to the map
function addObstacle(x, y, width, height, options = {}) {
    const color = options.color || "rgba(0,0,0,0.15)";
    const blocksProjectiles = options.blocksProjectiles !== false; // default true
    const el = createObstacleElement(x, y, width, height, color);
    gameArea.appendChild(el);
    const obstacle = { x, y, width, height, el, blocksProjectiles };
    obstacles.push(obstacle);
    return obstacle;
}

function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
    return !(ax + aw <= bx || ax >= bx + bw || ay + ah <= by || ay >= by + bh);
}

// Resolve player vs obstacle overlap by pushing player out along the smallest axis
function resolvePlayerObstacleCollision(px, py, pw, ph, obstacle) {
    const ox = obstacle.x;
    const oy = obstacle.y;
    const ow = obstacle.width;
    const oh = obstacle.height;

    const pRight = px + pw;
    const pBottom = py + ph;
    const oRight = ox + ow;
    const oBottom = oy + oh;

    const overlapX = Math.min(pRight, oRight) - Math.max(px, ox);
    const overlapY = Math.min(pBottom, oBottom) - Math.max(py, oy);

    if (overlapX < overlapY) {
        // Push on X axis
        if (px < ox) {
            // player on left, push left
            px -= overlapX;
        } else {
            // player on right, push right
            px += overlapX;
        }
    } else {
        // Push on Y axis
        if (py < oy) {
            // player above, push up
            py -= overlapY;
        } else {
            // player below, push down
            py += overlapY;
        }
    }

    return { x: px, y: py };
}

// ---------- Spawning helpers to avoid obstacles ----------
function overlapsAnyObstacle(x, y, w, h) {
    for (let i = 0; i < obstacles.length; i++) {
        const o = obstacles[i];
        if (rectsOverlap(x, y, w, h, o.x, o.y, o.width, o.height)) return true;
    }
    return false;
}

function getValidSpawnRect(w, h, maxAttempts = 20) {
    // Keep within arena with padding
    const min = 40;
    const max = 610; // 650 - 40
    for (let i = 0; i < maxAttempts; i++) {
        const ex = Math.random() * (max - min) + min;
        const ey = Math.random() * (max - min) + min;
        const rx = ex;
        const ry = ey;
        if (!overlapsAnyObstacle(rx, ry, w, h)) {
            return { x: ex, y: ey };
        }
    }
    return null;
}

// -------- Line of sight against obstacles (blocksProjectiles=true) --------
function segmentsIntersect(p1x, p1y, p2x, p2y, q1x, q1y, q2x, q2y) {
    function orient(ax, ay, bx, by, cx, cy) {
        return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    }
    function onSegment(ax, ay, bx, by, cx, cy) {
        return Math.min(ax, bx) <= cx && cx <= Math.max(ax, bx) &&
               Math.min(ay, by) <= cy && cy <= Math.max(ay, by);
    }
    const o1 = orient(p1x, p1y, p2x, p2y, q1x, q1y);
    const o2 = orient(p1x, p1y, p2x, p2y, q2x, q2y);
    const o3 = orient(q1x, q1y, q2x, q2y, p1x, p1y);
    const o4 = orient(q1x, q1y, q2x, q2y, p2x, p2y);

    if (o1 === 0 && onSegment(p1x, p1y, p2x, p2y, q1x, q1y)) return true;
    if (o2 === 0 && onSegment(p1x, p1y, p2x, p2y, q2x, q2y)) return true;
    if (o3 === 0 && onSegment(q1x, q1y, q2x, q2y, p1x, p1y)) return true;
    if (o4 === 0 && onSegment(q1x, q1y, q2x, q2y, p2x, p2y)) return true;

    return (o1 > 0) !== (o2 > 0) && (o3 > 0) !== (o4 > 0);
}

function lineBlockedByObstacles(x1, y1, x2, y2) {
    for (let i = 0; i < obstacles.length; i++) {
        const o = obstacles[i];
        if (!o.blocksProjectiles) continue;
        const left = o.x;
        const right = o.x + o.width;
        const top = o.y;
        const bottom = o.y + o.height;
        // if either endpoint is inside the obstacle, treat as blocked
        if (x1 >= left && x1 <= right && y1 >= top && y1 <= bottom) return true;
        if (x2 >= left && x2 <= right && y2 >= top && y2 <= bottom) return true;
        // check intersection with each rectangle edge
        if (segmentsIntersect(x1, y1, x2, y2, left, top, right, top)) return true;      // top
        if (segmentsIntersect(x1, y1, x2, y2, right, top, right, bottom)) return true;  // right
        if (segmentsIntersect(x1, y1, x2, y2, right, bottom, left, bottom)) return true;// bottom
        if (segmentsIntersect(x1, y1, x2, y2, left, bottom, left, top)) return true;    // left
    }
    return false;
}

// -------- Damage helpers --------
function applyDamage(enemy, damageAmount) {
    const hpBefore = enemy.enemyHP;
    enemy.enemyHP -= damageAmount;
    const applied = Math.max(0, Math.min(hpBefore, damageAmount));
    return applied;
}

let lastDamageTimeout = null;
function showLastDamageAbovePlayer(damage) {
    try {
        let el = document.getElementById("LastDamage");
        if (!el) {
            el = document.createElement("div");
            el.id = "LastDamage";
            el.style.position = "absolute";
            el.style.color = "#ffd700";
            el.style.fontWeight = "bold";
            el.style.fontSize = "18px";
            el.style.textShadow = "1px 1px 2px black";
            el.style.pointerEvents = "none";
            gameArea.appendChild(el);
        }
        el.innerText = Math.floor(damage);
        el.style.left = `${x}px`;
        el.style.top = `${y - 80}px`;
        el.style.opacity = 1;
        if (lastDamageTimeout) clearTimeout(lastDamageTimeout);
        lastDamageTimeout = setTimeout(() => {
            try { const n = document.getElementById("LastDamage"); if (n) n.remove(); } catch (e) {}
        }, 600);
    } catch (e) {}
}

// Choose a detour waypoint around the first blocking obstacle between enemy and player
function findDetourTarget(enemyX, enemyY, playerX, playerY) {
    // Identify the first obstacle that blocks the segment
    let blocker = null;
    for (let i = 0; i < obstacles.length; i++) {
        const o = obstacles[i];
        if (!o.blocksProjectiles) continue;
        const left = o.x, right = o.x + o.width, top = o.y, bottom = o.y + o.height;
        // Any edge intersection => it's a blocker
        const hit = segmentsIntersect(enemyX, enemyY, playerX, playerY, left, top, right, top) ||
                    segmentsIntersect(enemyX, enemyY, playerX, playerY, right, top, right, bottom) ||
                    segmentsIntersect(enemyX, enemyY, playerX, playerY, right, bottom, left, bottom) ||
                    segmentsIntersect(enemyX, enemyY, playerX, playerY, left, bottom, left, top);
        if (hit) { blocker = o; break; }
    }
    if (!blocker) return { x: playerX, y: playerY };

    // Use expanded corners of the blocker as potential waypoints
    const pad = 10;
    const corners = [
        { x: blocker.x - pad, y: blocker.y - pad },
        { x: blocker.x + blocker.width + pad, y: blocker.y - pad },
        { x: blocker.x - pad, y: blocker.y + blocker.height + pad },
        { x: blocker.x + blocker.width + pad, y: blocker.y + blocker.height + pad }
    ];

    // Keep within arena
    const inBounds = (pt) => pt.x >= 0 && pt.x <= 650 && pt.y >= 0 && pt.y <= 650;

    // Prefer corners visible from enemy; score by distance to player plus small step cost
    let best = null;
    for (let i = 0; i < corners.length; i++) {
        const c = corners[i];
        if (!inBounds(c)) continue;
        if (!lineBlockedByObstacles(enemyX, enemyY, c.x, c.y)) {
            const distToPlayer = Math.hypot(playerX - c.x, playerY - c.y);
            const stepCost = Math.hypot(c.x - enemyX, c.y - enemyY) * 0.2;
            const score = distToPlayer + stepCost;
            if (!best || score < best.score) best = { x: c.x, y: c.y, score };
        }
    }
    // If none visible, just pick the corner with the lowest score ignoring visibility
    if (!best) {
        for (let i = 0; i < corners.length; i++) {
            const c = corners[i];
            if (!inBounds(c)) continue;
            const distToPlayer = Math.hypot(playerX - c.x, playerY - c.y);
            const stepCost = Math.hypot(c.x - enemyX, c.y - enemyY) * 0.3;
            const score = distToPlayer + stepCost;
            if (!best || score < best.score) best = { x: c.x, y: c.y, score };
        }
    }
    return best ? { x: best.x, y: best.y } : { x: playerX, y: playerY };
}

// Game loop
function lovedayRoom() {
    gameArea.style.backgroundImage = "url('LovedayClass.png')"
    addObstacle(0, 0, 40, 120, { color: "#947A54" });   
    addObstacle(110, 80, 80, 40, { color: "#947A54" });   
    addObstacle(190, 0, 40, 120, { color: "#947A54" }); 
    addObstacle(500, 100, 150, 50, { color: "grey" });
    addObstacle(250, 200, 150, 350, { color: "#F8DFA1" }); 
    
    for (let i = 0; i < 7; i++) {
        addObstacle(262.5, 210+45*i, 25, 20, { color: "#000000" }); 
    }
    for (let i = 0; i < 7; i++) {
        addObstacle(362.5, 210+45*i, 25, 20, { color: "#000000" }); 
    }
    addObstacle(0, 215, 50, 370, { color: "#F8DFA1" }); 
    for (let i = 0; i < 7; i++) {
        addObstacle(12.5, 230+45*i, 25, 20, { color: "#000000" }); 
    }
    addObstacle(600, 215, 50, 370, { color: "#F8DFA1" }); 
    for (let i = 0; i < 7; i++) {
        addObstacle(612.5, 230+45*i, 25, 20, { color: "#000000" }); 
    }
    addObstacle(320, 225, 10, 300, { color: "white" });

}
function roboticsRoom() {
    gameArea.style.backgroundImage = "url('Robotikroom.png')"
     addObstacle(0, 50, 50, 550, { color: "#F8DFA1" }); 
    for (let i = 0; i < 9; i++) {
        addObstacle(12.5, 70+60*i, 25, 20, { color: "#000000" }); 
    }
    addObstacle(600, 50, 50, 550, { color: "#F8DFA1" }); 
    for (let i = 0; i < 9; i++) {
        addObstacle(612.5, 70+60*i, 25, 20, { color: "#000000" }); 
    }
    addObstacle(140, 100, 145, 60, { color: "#F8DFA1" }); 
    addObstacle(375, 100, 145, 60, { color: "#F8DFA1" }); 
    addObstacle(140, 270, 145, 60, { color: "#F8DFA1" }); 
    addObstacle(375, 270, 145, 60, { color: "#F8DFA1" }); 
    addObstacle(140, 440, 145, 60, { color: "#F8DFA1" }); 
    addObstacle(375, 440, 145, 60, { color: "#F8DFA1" }); 
    addObstacle(75, 450, 40, 40, { color: "#333333", blocksProjectiles: false });
    addObstacle(540, 280, 40, 40, { color: "#333333", blocksProjectiles: false });
    addObstacle(470, 135, 35, 20, { color: "#000000" }); 
    addObstacle(150, 600, 500, 50, { color: "#32527B" });
    
}

let lastFrameTime = 0;
const fps = 60;
const frameDuration = 1000 / fps;
scoreBoostCount = 0;
attackingDelay = 0

function update(timestamp) {
  try {
    if (!timestamp) timestamp = performance.now();
    const delta = timestamp - lastFrameTime;

    if (delta >= frameDuration) {
      lastFrameTime = timestamp - (delta % frameDuration);

      let dx = 0, dy = 0;

    
      sanityTimer++;
      if (difficulty == 4) {
        if (sanityTimer >= 75) {
            sanityTimer = 0;
            if (sanity > 0) {
                sanity -= 1;
            } else {
                sanity = 0;
            }
        }
      } else if (difficulty == 3) {
        if (sanityTimer >= 100) {
            sanityTimer = 0;
            if (sanity > 0) {
                sanity -= 1;
            } else {
                sanity = 0;
            }
        }
      } else if (difficulty == 2) {
        if (sanityTimer >= 150) {
            sanityTimer = 0;
            if (sanity > 0) {
                sanity -= 1;
            } else {
                sanity = 0;
            }
        }
      }


      if (x <50) {
        x = 50
      }
      if (x > 650) {
        x = 650
      }
      if (y <50) {
        y = 50
      }
      if (y > 650) {
        y = 650
      }



        if (Boost==true && BoostTime <= 360) {
            Mult = 2
            BoostTime++
        } else {
            Boost = false
            Mult = true;
        }

        if (CurrWeap == 1 && !attack) {
            player.src = "Player.png"
        }
        if (CurrWeap == 2 && !attack) {
            player.src = "Player2.png"
        }

        // Increment message timers only while messages are present
        try {
            const sbMsg = document.getElementById("SBMessage");
            if (sbMsg) {
                SBmessagetimer++;
            } else {
                SBmessagetimer = 0;
            }
        } catch (e) {}
        try {
            const healthMsg = document.getElementById("HealthMessage");
            if (healthMsg) {
                Hmessagetimer++;
            } else {
                Hmessagetimer = 0;
            }
        } catch (e) {}

        if (SBmessagetimer >= 60) {
            try {
    
                const sbMsg = document.getElementById("SBMessage");
                if (sbMsg) sbMsg.remove();
            } catch (e) {
    
            }
        }
        if (Hmessagetimer >= 60) {
            try {
                const healthMsg = document.getElementById("HealthMessage");
                if (healthMsg) healthMsg.remove();

            } catch (e) {
    
            }
        }

        
        if (keysPressed["1"] && CurrWeap != 1) {
            CurrWeap = 1;
            attack = false; // cancel any current firing
            // reset cooldowns; only apply load time for shotgun (15 frames)
            Atdelay = 15;
            attackingDelay = 20000;
            }
            
        if (keysPressed["2"] && CurrWeap != 2) {
            CurrWeap = 2;
            attack = false; // cancel any current firing
            // reset cooldowns; only apply load time for calc gun (5 frames)
            Atdelay = 5;
            attackingDelay = 20000;
            }
                
        Atdelay--
        attackingDelay++
        
        
        if (attack && attackingDelay >= ShotgunCooldown/1000 * 60 && CurrWeap == 1) {
            attack = false 
        }
        if (attack && attackingDelay >= CalcgunCooldown/1000 * 60 && CurrWeap == 2) {
            attack = false 
        }


        if (keysPressed[" "] && attack == false && Atdelay <= 0) {
            attack = true;
            console.log("attack!")
            FirstAttack = true;
            attackingDelay = 0;
        }
    dashtimer++;
    
    if (dashtimer >= 4) {
        speed = BaseSpeed;
        dashing = false;
    }
    
    if (dashtimer >= 50 && !dashCharge) {
        dashCharge = true; 
        dashCharged.play();

    }
    
    if (keysPressed["shift"] && dashtimer >= 60 && !dashing) {
        speed = 25;
        dashing = true;
        dashtimer = 0;
        dashCharge = false;
        
        lockdirection = direction;
    }

    if (keysPressed["w"] || keysPressed["arrowup"]) {
        if (y >= 50) {

            dy -= speed;
        } else {
            y = 50;
        }


    }

   






    if (keysPressed["s"] || keysPressed["arrowdown"]) {
        if (y <= 600) {

            dy += speed;
        } else {
            y = 600;
        }

    } 

    if (keysPressed["a"] || keysPressed["arrowleft"]) {
        if (x >= 50) {

            dx -= speed;
        } else {
            x = 50;
        }

    }

    if (keysPressed["d"] || keysPressed["arrowright"]) {
        if (x <= 600) {

            dx += speed;
        } else {
            x = 600;
        }

    }

    if (dashing) {
        switch (lockdirection) {
            case "n": dy = -speed; dx = 0; break;
            case "ne": dy = -speed; dx = speed; break;
            case "e": dy = 0; dx = speed; break;
            case "se": dy = speed; dx = speed; break;
            case "s": dy = speed; dx = 0; break;
            case "sw": dy = speed; dx = -speed; break;
            case "w": dy = 0; dx = -speed; break;
            case "nw": dy = -speed; dx = -speed; break;
        }
    }

    

    if (attack) {
        dx = dx*0.8;
        dy = dy*0.8;
    }

    


    if (dx !== 0 && dy !== 0) {
        dx /= Math.sqrt(2);
        dy /= Math.sqrt(2);
    }

    if (dx < 0) {
        if (dy < 0 ) {
            direction = "nw";
            console.log(direction)
        } else if (dy > 0) {
            direction = "sw";
            console.log(direction)
        } else {
            direction = "w";
            console.log(direction)
        }
    } else if (dx > 0) {
        if (dy < 0 ) {
            direction = "ne";
            console.log(direction)
        } else if (dy > 0) {
            direction = "se";
            console.log(direction)
        } else {
            direction = "e";
            console.log(direction)
        }
    } else {
        if (dy < 0) {
            direction = "n";
            console.log(direction)
        } else if (dy > 0) {
            direction = "s";
            console.log(direction)
        }
    }

    x += dx;
    y += dy;

    // Resolve player vs obstacles
    if (obstacles.length > 0) {
        // player is 65x65 and positioned with center at (x,y)
        let px = x - 32.5;
        let py = y - 32.5;
        const pw = 65;
        const ph = 65;
        for (let i = 0; i < obstacles.length; i++) {
            const o = obstacles[i];
            if (rectsOverlap(px, py, pw, ph, o.x, o.y, o.width, o.height)) {
                const resolved = resolvePlayerObstacleCollision(px, py, pw, ph, o);
                px = resolved.x;
                py = resolved.y;
            }
        }
        x = px + 32.5;
        y = py + 32.5;
    }

    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
    //player.src = "Player.png";
    player.style.transform = `translate(-50%, -50%) rotate(${directionAngles[direction]}deg)`;

    if (attack) {
        if (CurrWeap == 1) {
            player.src = "PlayerAttacking.png";
        } else if (CurrWeap == 2) {
            player.src = "PlayerAttacking2.png";
        }
        player.style.transform = `translate(-50%, -50%) rotate(${directionAngles[direction]}deg)`;
    }

    // --- Charger Spawning ---
    if (spawntime > 50) {
        spawnEnemy = Math.random()*100*(2/difficulty)

        if (spawnEnemy < 1 && chargerCount<7) { // ~1% chance per frame
          const spawn = getValidSpawnRect(50, 50);
          if (spawn) {
            let ex = spawn.x; let ey = spawn.y;
            enemies.push(new Charger(ex, ey, 3*difficulty/3, (350*(0.9+Wave/10)**2)*difficulty/2, 4*difficulty/2, "Dom.png", 50, 50));
            enemyCount++;
            chargerCount++;
            spawntime = 0;
          }
        }
        if (spawnEnemy <1.3 && spawnEnemy > 1 && healthCount<2 && elapsed > 600) { // ~1% chance per frame
          const spawn = getValidSpawnRect(45, 45);
          if (spawn) {
            let ex = spawn.x; let ey = spawn.y;
            enemies.push(new HealPickup(ex, ey));
            healthCount++;
            enemyCount++;
            spawntime = 0;
          }
        }
        if (spawnEnemy < 1.6 && spawnEnemy > 1.3 && tankCount<3 && Wave>1) { // ~1% chance per frame
          const spawn = getValidSpawnRect(70, 70);
          if (spawn) {
            let ex = spawn.x; let ey = spawn.y;
            enemies.push(new Charger(ex, ey, 0.75*difficulty/3, (700*(0.9+Wave/10)**2)*difficulty/2, 6*difficulty/2, "Zuk.png", 70, 70));
            tankCount++;
            enemyCount++;
            spawntime = 0;
          }
        }
        if (spawnEnemy <2 && spawnEnemy > 1.9 && showerCount<2 && Wave>2) { // ~1% chance per frame
          const spawn = getValidSpawnRect(85, 85);
          if (spawn) {
            let ex = spawn.x; let ey = spawn.y;
            enemies.push(new Charger(ex, ey, 0.2*difficulty/3, (3000*(0.9+Wave/10)**2)*difficulty/2, 16*difficulty/2, "Shower.jpg", 85, 85));
            showerCount++;
            enemyCount++;
            spawntime = 0;
          }
        }
        if (spawnEnemy < 2.1 && spawnEnemy > 2 && scoreBoostCount<1) { // ~1% chance per frame
          const spawn = getValidSpawnRect(45, 45);
          if (spawn) {
            let ex = spawn.x; let ey = spawn.y;
            enemies.push(new ScoreBoost(ex, ey));
            scoreBoostCount++;
            enemyCount++;
            spawntime = 0;
          }
        }

    }
    if (playerhp >= 100) {
        playerhp = 100
    }
    elapsed++
    spawntime++

    // --- Enemy Movement ---
    // Track which enemies are colliding

    let colliding = Array(enemies.length).fill(false);
    for (let i = 0; i < enemies.length; i++) {
      for (let j = i + 1; j < enemies.length; j++) {
        const e1 = enemies[i];
        const e2 = enemies[j];
        if (
          e1.x < e2.x + e1.width &&
          e1.x + e2.width > e2.x &&
          e1.y < e2.y + e1.width &&
          e1.y + e2.width > e2.y
        ) {
          colliding[i] = true;
          colliding[j] = true;
          // Push them apart
          let dx = e1.x - e2.x;
          let dy = e1.y - e2.y;
          let dist = Math.hypot(dx, dy);
          if (dist === 0) dist = 1;
          let push = 10;
          e1.x += (dx / dist) * push;
          e1.y += (dy / dist) * push;
          e2.x -= (dx / dist) * push;
          e2.y -= (dy / dist) * push;
          e1.el.style.left = `${e1.x}px`;
          e1.el.style.top = `${e1.y}px`;
          e2.el.style.left = `${e2.x}px`;
          e2.el.style.top = `${e2.y}px`;
        }
      }
    }
    // Only move enemies that are not colliding
   enemies.forEach((enemy, idx) => {
        if (!colliding[idx] && (enemy instanceof Charger || enemy instanceof Tank)) {
            const enemyCenterX = enemy.x + (enemy.width ? enemy.width/2 : 0);
            const enemyCenterY = enemy.y + (enemy.height ? enemy.height/2 : 0);
            let targetX = x;
            let targetY = y;
            if (lineBlockedByObstacles(enemyCenterX, enemyCenterY, x, y)) {
                const detour = findDetourTarget(enemyCenterX, enemyCenterY, x, y);
                targetX = detour.x;
                targetY = detour.y;
            }
            enemy.moveToward(targetX, targetY);
            // Resolve enemy vs obstacles after movement
            if (obstacles.length > 0 && enemy.width && enemy.height) {
                for (let k = 0; k < obstacles.length; k++) {
                    const o = obstacles[k];
                    if (rectsOverlap(enemy.x, enemy.y, enemy.width, enemy.height, o.x, o.y, o.width, o.height)) {
                        const resolved = resolvePlayerObstacleCollision(enemy.x, enemy.y, enemy.width, enemy.height, o);
                        enemy.x = resolved.x;
                        enemy.y = resolved.y;
                        enemy.el.style.left = `${enemy.x}px`;
                        enemy.el.style.top = `${enemy.y}px`;
                    }
                }
            }
        }
    });
        enemies.forEach((enemy, idx) => {
        const playerRect = player.getBoundingClientRect();
        const enemyRect = enemy.el.getBoundingClientRect();

        const touching = !(playerRect.right < enemyRect.left ||
                        playerRect.left > enemyRect.right ||
                        playerRect.bottom < enemyRect.top ||
                        playerRect.top > enemyRect.bottom);

        if (touching) {
            if (enemy instanceof HealPickup) {
                playerhp = Math.min(playerhp + 5+Math.floor(10/(0.9+Wave/10)), 100); // heal 30, max 100
                sanity += 2;
                if (sanity > 100) {
                    sanity = 100;
                }
                enemy.el.remove();
                enemies.splice(idx, 1);
                healthCount = Math.max(healthCount - 1, 0);
                // Remove any existing message before creating a new one
                try { const existing = document.getElementById("HealthMessage"); if (existing) existing.remove(); } catch (e) {}
                newMessage = document.createElement("p");
                newMessage.style.position = "absolute";
                newMessage.id = "HealthMessage"

                newMessage.style.transform = `translate(-50%, -50%)`;
                newMessage.style.top = "5%";
                newMessage.style.left = "52%";
                newMessage.style.width = "100%"
                gameArea.appendChild(newMessage)
                document.getElementById("HealthMessage").innerHTML = "Picked up a healing Shaunulator"
                Hmessagetimer = 0;
                if (playerhp < 40) {
                    newMessage.style.top = "5%";
                    newMessage.style.left = "52%";
                    document.getElementById("HealthMessage").innerHTML = "Picked up a healing Shaunulator that you really need!"
                }
                

                setTimeout(() => {
                    try { const m = document.getElementById("HealthMessage"); if (m) m.remove(); } catch (e) {}
                }, 1200);
                // Flash grey on heal
                setFlash("rgba(128, 128, 128, 0.25)", 120);
            } else if (enemy instanceof ScoreBoost) {
                
                Boost = true;
                BoostTime = 0;
                enemy.el.remove();
                enemies.splice(idx, 1);
                scoreBoostCount = Math.max(scoreBoostCount - 1, 0);
                // Remove any existing message before creating a new one
                try { const existing = document.getElementById("SBMessage"); if (existing) existing.remove(); } catch (e) {}
                newMessage = document.createElement("p");
                newMessage.style.position = "absolute";
                newMessage.id = "SBMessage"
                SBmessagetimer = 0;
                newMessage.style.transform = `translate(-50%, -50%)`;
                newMessage.style.top = "2%";
                newMessage.style.left = "20%";
                gameArea.appendChild(newMessage)
                document.getElementById("SBMessage").innerHTML = "You got the score boost!"
                

                setTimeout(() => {
                    try { const m = document.getElementById("SBMessage"); if (m) m.remove(); } catch (e) {}
                }, 1200);

                // Yellow overlay for duration
                startBoostOverlay(360 * (1000/60));

                

                
            }  else if (enemy instanceof Charger) {
                if (!invinc) {
                    playerhp -= Math.floor((enemy.damage + Math.floor(Math.random() * 5)) * (0.9 + Wave / 10) ** 2);
                    if (playerhp < 0) {
                        playerhp = 0;
                        deathSound.play();
                    }
                    console.log("Player HP:", playerhp);
                    invinc = true;
                    ouch.play();
                    // Flash red on damage
                    setFlash("rgba(255, 0, 0, 0.25)", 120);
                    setTimeout(() => {
                        invinc = false;
                    }, iFrames);
                }
            }
        }
        
    });


    // --- Enemy-Enemy Collision ---
    
    for (let i = 0; i < enemies.length; i++) {
      for (let j = i + 1; j < enemies.length; j++) {
        const e1 = enemies[i];
        const e2 = enemies[j];
        // Simple AABB collision
        if (
          e1.x < e2.x + chargerSize &&
          e1.x + chargerSize > e2.x &&
          e1.y < e2.y + chargerSize &&
          e1.y + chargerSize > e2.y
        ) {
          // Push them apart
          let dx = e1.x - e2.x;
          let dy = e1.y - e2.y;
          let dist = Math.hypot(dx, dy);
          if (dist === 0) dist = 1;
          let push = 10; // pixels to push apart
          e1.x += (dx / dist) * push;
          e1.y += (dy / dist) * push;
          e2.x -= (dx / dist) * push;
          e2.y -= (dy / dist) * push;
          // Update DOM positions
          e1.el.style.left = `${e1.x}px`;
          e1.el.style.top = `${e1.y}px`;
          e2.el.style.left = `${e2.x}px`;
          e2.el.style.top = `${e2.y}px`;
        }
      }
    }

    document.getElementById("Score").innerText =  score;
    document.getElementById("HP").innerText =  playerhp+" %";
    document.getElementById("wave").innerText =  Wave;
    document.getElementById("sanity").innerText =  sanity+" %";
    // Weapon name
    try {
        document.getElementById("weapon").innerText = CurrWeap == 1 ? "Shauntgun" : "Shauniper";
    } catch (e) {}
    // Dash recharge percent (0-100)
    try {
        const dashPct = Math.min(100, Math.floor((Math.min(dashtimer, 60) / 60) * 100));
        document.getElementById("dash").innerText = dashPct + " %";
    } catch (e) {}
    //damageEnemies

    if (attack && FirstAttack) {
        FirstAttack = false;
        if (CurrWeap == 1) {
            const el = document.createElement("div");
            el.style.position = "absolute";
            el.style.transform = `translate(-50%, -50%) rotate(${directionAnglesShots[direction]+270}deg)`;
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            if (direction == "n") { el.style.left = `${x}px`; el.style.top = `${y-50}px`; }
            if (direction == "ne") { el.style.left = `${x+40}px`; el.style.top = `${y-50}px`; }
            if (direction == "e") { el.style.left = `${x+55}px`; el.style.top = `${y-7}px`; }
            if (direction == "se") { el.style.left = `${x+40}px`; el.style.top = `${y+50}px`; }
            if (direction == "s") { el.style.left = `${x}px`; el.style.top = `${y+55}px`; }
            if (direction == "sw") { el.style.left = `${x-50}px`; el.style.top = `${y+50}px`; }
            if (direction == "w") { el.style.left = `${x-55}px`; el.style.top = `${y-7}px`; }
            if (direction == "nw") { el.style.left = `${x-50}px`; el.style.top = `${y-50}px`; }
            el.style.height = "85px";
            el.style.width = "130px";
            el.id = "ShotgunShot";
            el.style.backgroundImage = "url('ShotgunShot.png')";
            el.style.backgroundSize = "cover";
            ShotgunSound.play();
            gameArea.appendChild(el);
            switch (direction) {
                case "n": el.style.left = `${x}px`; el.style.top = `${y-70}px`; break;
                case "ne": el.style.left = `${x+45}px`; el.style.top = `${y-60}px`; break;
                case "e": el.style.left = `${x+75}px`; el.style.top = `${y-7}px`; break;
                case "se": el.style.left = `${x+50}px`; el.style.top = `${y+60}px`; break;
                case "s": el.style.left = `${x}px`; el.style.top = `${y+75}px`; break;
                case "sw": el.style.left = `${x-50}px`; el.style.top = `${y+55}px`; break;
                case "w": el.style.left = `${x-65}px`; el.style.top = `${y-7}px`; break;
                case "nw": el.style.left = `${x-50}px`; el.style.top = `${y-50}px`; break;
            }
            const shotRect = el.getBoundingClientRect();
            enemies = enemies.filter((enemy) => {
                const enemyRect = enemy.el.getBoundingClientRect();
                const overlap = !(shotRect.right < enemyRect.left || shotRect.left > enemyRect.right || shotRect.bottom < enemyRect.top || shotRect.top > enemyRect.bottom);
                if (overlap) {
                    // Compute line from player center to enemy center in game coords
                    const playerCenterX = x;
                    const playerCenterY = y;
                    const enemyCenterX = enemy.x + (enemy.width ? enemy.width/2 : 0);
                    const enemyCenterY = enemy.y + (enemy.height ? enemy.height/2 : 0);
                    const blocked = lineBlockedByObstacles(playerCenterX, playerCenterY, enemyCenterX, enemyCenterY);
                    if (!blocked) {
                        const dmg = (1100*sanity/100)+ (score/100) * (sanity/100);
                        const dealt = applyDamage(enemy, dmg);
                        showLastDamageAbovePlayer(dealt);
                        if (enemy.enemyHP <= 0) {
                            enemy.el.remove();
                            score += 250*Mult;
                            if (enemy.fileName == "Zuk.png") {
                                score += 250*Mult;
                                tankCount -= 1;
                                ZukDeath.play();
                            } else if (enemy.fileName == "Shower.jpg") {
                                score += 750*Mult;
                                showerCount -= 1;
                            } else {
                                domDeath.play();
                                chargerCount--
                            }
                            return false;
                        }
                    }
                }
                return true;
            });
            if (score >= Wave*2500) { Wave++; }
            setTimeout(() => { el.remove(); }, 50);
        } else if (CurrWeap == 2) {
            // Spawn a projectile 20x3 that flies until collision
            const projEl = document.createElement("div");
            projEl.style.position = "absolute";
            projEl.style.width = "20px";
            projEl.style.height = "3px";
            projEl.style.background = "black";
            projEl.style.borderRadius = "2px";
            CalcgunSound.play();
            // start slightly in front of player
            const dirVec = directionVectors[direction];
            const startX = x + dirVec.x * 35;
            const startY = y + dirVec.y * 35;
            projEl.style.left = `${startX}px`;
            projEl.style.top = `${startY}px`;
            projEl.style.transform = `rotate(${directionAnglesShots[direction]+90}deg)`;
            gameArea.appendChild(projEl);
            projectiles.push({ x: startX, y: startY, dx: dirVec.x, dy: dirVec.y, el: projEl });
        }
    }

    // Update and resolve weapon 2 projectiles
    if (projectiles.length > 0) {
        const areaWidth = 650;
        const areaHeight = 650;
        const calcDamage = (enemy) => {
            enemy.enemyHP -= (800 * sanity / 100) + (score / 200) * (sanity / 100);
        };
        projectiles = projectiles.filter((p) => {
            p.x += p.dx * projectileSpeed;
            p.y += p.dy * projectileSpeed;
            p.el.style.left = `${p.x}px`;
            p.el.style.top = `${p.y}px`;
            // border check
            if (p.x < 0 || p.x > areaWidth || p.y < 0 || p.y > areaHeight) {
                p.el.remove();
                return false;
            }
            // obstacle collision (if configured to block)
            for (let k = 0; k < obstacles.length; k++) {
                const o = obstacles[k];
                if (!o.blocksProjectiles) continue;
                const projRect = p.el.getBoundingClientRect();
                const obsRect = o.el.getBoundingClientRect();
                const overlapObs = !(projRect.right < obsRect.left || projRect.left > obsRect.right || projRect.bottom < obsRect.top || projRect.top > obsRect.bottom);
                if (overlapObs) {
                    p.el.remove();
                    return false;
                }
            }
            // enemy collision
            const projRect = p.el.getBoundingClientRect();
            for (let i = 0; i < enemies.length; i++) {
                const enemy = enemies[i];
                if (!(enemy instanceof Charger || enemy instanceof Tank)) continue;
                const enemyRect = enemy.el.getBoundingClientRect();
                const overlap = !(projRect.right < enemyRect.left || projRect.left > enemyRect.right || projRect.bottom < enemyRect.top || projRect.top > enemyRect.bottom);
                if (overlap) {
                    const before = enemy.enemyHP;
                    calcDamage(enemy);
                    const dealt = Math.max(0, before - enemy.enemyHP);
                    showLastDamageAbovePlayer(dealt);
                    if (enemy.enemyHP <= 0) {
                        enemy.el.remove();
                        score += 250*Mult;
                        if (enemy.fileName == "Zuk.png") {
                            score += 250*Mult;
                            tankCount -= 1;
                            ZukDeath.play();
                        } else if (enemy.fileName == "Shower.jpg") {
                            score += 1250*Mult;
                            showerCount -= 1;
                        } else {
                            domDeath.play();
                            chargerCount--
                        }
                        enemies.splice(i, 1);
                        if (score >= Wave*2500) { Wave++; }
                    }
                    p.el.remove();
                    return false; // remove projectile on hit
                }
            }
            return true; // keep flying
        });
    }
             
    enemies.forEach(enemy => {
    if (enemy instanceof Charger || enemy instanceof Tank) {
        enemy.hpText.innerText = Math.ceil(enemy.enemyHP);
    }
});
    }
    if (playerhp <= 0) {
        // Reset everything
        playerhp = 100;
        time = Math.floor(elapsed/60)
    
    
        x = 280;
        y = 280;
        direction = "n";
        attack = false;
        FirstAttack = false;
        invinc = false;
        sanity = 50;
        sanityTimer = 0;
        


        for (let key in keysPressed) {
            keysPressed[key] = false;
        }
        // Remove all enemies from DOM
        enemies.forEach(enemy => enemy.el.remove());
        enemies = [];
        chargerCount = 0;
        healthCount = 0;
        enemyCount = 0;
        showerCount = 0;
        scoreBoostCount = 0;
        tankCount = 0;

        // Remove all obstacle DOM elements and clear obstacle list so rooms don't persist after death
        try {
            obstacles.forEach(o => { if (o && o.el) o.el.remove(); });
        } catch (e) { }
        obstacles = [];
        score *= (difficulty/2)**2;
        score = Math.floor(score);

        console.log("Game Reset!");
        if (score > localStorage.getItem(Filename+"HS")) {
            localStorage.setItem(Filename+"HS", score);
        }
        if (time > localStorage.getItem(Filename+"Time")) {
            localStorage.setItem(Filename+"Time", time);
        }
        if (Wave > localStorage.getItem(Filename+"Wave")) {
            localStorage.setItem(Filename+"Wave", Wave);
        }
        alert("You Died! Returning to main menu. Your final score was: " + score+"\nYou survived for "+time+" seconds and reached wave "+Wave+".");
        alert("High Score: "+localStorage.getItem(Filename+"HS")+"\nLongest Time Survived: "+localStorage.getItem(Filename+"Time")+" seconds\nHighest Wave Reached: "+localStorage.getItem(Filename+"Wave"));
        score = 0;
        elapsed = 0;
        Wave =0;
        gameStarted = false;
        showMainMenu();
    }

    if (sanity <= 33) {
        document.getElementById("ShanImage").src = "ShanDisappointed.webp";
    }else if (sanity <= 66) {
        document.getElementById("ShanImage").src = "NormalShan.webp";
    } else {
        document.getElementById("ShanImage").src = "HappyShan.webp";
    }
    requestAnimationFrame(update);
  } catch (err) {
    console.error('Game loop error:', err);
  }
  
}

requestAnimationFrame(update);
//score

// --------------- Main Menu wiring ---------------
let gameStarted = false;
let difficultyLevel = 1; // 1-4
let difficulty = 1; // alias used in spawn formulas

function showGameUI() {
    const menu = document.getElementById("mainMenu");
    const diff = document.getElementById("difficultyMenu");
    const area = document.getElementById("gameArea");
    const hud = document.getElementById("playerHUD");
    const maps = document.getElementById("mapMenu");
    if (menu) menu.style.display = "none";
    if (diff) diff.style.display = "none";
    if (maps) maps.style.display = "none";
    if (area) area.style.display = "block";
    if (hud) hud.style.display = "grid";
}

function showMainMenu() {
    const menu = document.getElementById("mainMenu");
    const diff = document.getElementById("difficultyMenu");
    const area = document.getElementById("gameArea");
    const hud = document.getElementById("playerHUD");
    if (menu) menu.style.display = "flex";
    if (diff) diff.style.display = "none";
    if (area) area.style.display = "none";
    if (hud) hud.style.display = "none";
}

// --------------- Screen Flash Helpers ---------------
let boostOverlayActive = false;
let boostOverlayTimeout = null;

function setFlash(color, durationMs = 150) {
    const el = document.getElementById("screenFlash");
    if (!el) return;
    el.style.display = "block";
    el.style.background = color;
    setTimeout(() => {
        // If boost is active, keep yellow; else clear
        if (boostOverlayActive) {
            el.style.background = "rgba(255, 255, 0, 0.2)";
        } else {
            el.style.display = "none";
            el.style.background = "transparent";
        }
    }, durationMs);
}

function startBoostOverlay(durationMs) {
    const el = document.getElementById("screenFlash");
    if (!el) return;
    boostOverlayActive = true;
    el.style.display = "block";
    el.style.background = "rgba(255, 255, 0, 0.2)";
    if (boostOverlayTimeout) clearTimeout(boostOverlayTimeout);
    boostOverlayTimeout = setTimeout(() => {
        boostOverlayActive = false;
        el.style.display = "none";
        el.style.background = "transparent";
    }, durationMs);
}

function startGameFromMenu() {
    if (gameStarted) return;
    gameStarted = true;
    showGameUI();

}

document.addEventListener("DOMContentLoaded", () => {
    const playBtn = document.getElementById("playButton");
    const helpBtn = document.getElementById("helpButton");
    const scoresBtn = document.getElementById("highScoresButton");
    const diffMenu = document.getElementById("difficultyMenu");
    const mainMenu = document.getElementById("mainMenu");
    const backBtn = document.getElementById("backToMain");
    const backBtn2 = document.getElementById("backToMain2");
    const d1 = document.getElementById("difficulty1");
    const d2 = document.getElementById("difficulty2");
    const d3 = document.getElementById("difficulty3");
    const d4 = document.getElementById("difficulty4");
    const diffDesc = document.getElementById("difficultyDesc");
    const mapDesc = document.getElementById("mapDesc");
    const mapmenu = document.getElementById("mapMenu");
    const m1 = document.getElementById("map1");
    const m2 = document.getElementById("map2");
    if (helpBtn) helpBtn.addEventListener("click", () => {
        alert("Controls:\nWASD or Arrow Keys to move\nSpace to shoot\nShift to dash. You will hear a chime when cooldown is over\n1, 2 to toggle weapons. 1 for the Shauntgun, 2 for the Shauniper.\nC to answer a math question to regain sanity\n\nSanity affects damage! Sanity is sacrificed every few seconds.\nSurvive as many waves as you can!");
    });
    if (scoresBtn) scoresBtn.addEventListener("click", () => {
        const hs = localStorage.getItem(Filename+"HS") || 0;
        const maxtime = localStorage.getItem(Filename+"Time") || 0;
        const maxwave = localStorage.getItem(Filename+"Wave") || 0;
        alert("High Score: "+hs+"\nLongest Time Survived: "+maxtime+" seconds\nHighest Wave Reached: "+maxwave);
    });
    // Override play to open difficulty menu instead
    if (playBtn) playBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (mainMenu) mainMenu.style.display = "none";
        if (diffMenu) diffMenu.style.display = "flex";
    });
    if (backBtn) backBtn.addEventListener("click", () => {
     
       
            if (diffMenu) diffMenu.style.display = "none";
            if (mainMenu) mainMenu.style.display = "flex";

        
    });

     if (backBtn2) backBtn2.addEventListener("click", () => {
     
       
            if (mapmenu) mapmenu.style.display = "none";
            if (mainMenu) mainMenu.style.display = "flex";

        
    });

    difficulty = 0;
    function chooseDifficulty(level) {
        difficultyLevel = level;
        difficulty = level; // keep both in sync for existing formulas
        diffMenu.style.display = "none";
        mapmenu.style.display = "flex";
        // Randomly choose a map for now
        //const map = Math.random() < 0.5 ? 1 : 2;
        //chooseMap(map);
        if (m1) m1.addEventListener("click", () => chooseMap(1));
        if (m2) m2.addEventListener("click", () => chooseMap(2));
        //startGameFromMenu();
    }

    function chooseMap(map) {
        if (map == 1) {
            lovedayRoom();
        } else if (map == 2) {
            roboticsRoom();
        }
        startGameFromMenu();
    }


    function reallyChooseThat() {
        if (confirm("Are you sure you want to choose this difficulty? It's not even remotely fair!")) {
            chooseDifficulty(4);
        }
    }
    if (d1) d1.addEventListener("click", () => chooseDifficulty(1));
    if (d2) d2.addEventListener("click", () => chooseDifficulty(2));
    if (d3) d3.addEventListener("click", () => chooseDifficulty(3));
    if (d4) d4.addEventListener("click", () => reallyChooseThat());

    function setDesc(msg) {
        if (!diffDesc) return;
        diffDesc.textContent = msg;
        diffDesc.style.display = msg ? "block" : "none";
    }

    function setMDesc(msg) {
        if (!mapDesc) return;
        mapDesc.textContent = msg;
        mapDesc.style.display = msg ? "block" : "none";
    }

    if (d1) d1.addEventListener("mouseenter", () => setDesc("A nice and easy baby puzzle. Enemies are slow and deal less damage. Enemies spawn less often. Are you new to this math stuff or something? Sanity is never reduced. Score Multiplier: x0.25"));
    if (d2) d2.addEventListener("mouseenter", () => setDesc("A balanced practice exam. The enemies are normal speed and deal normal damage. Sanity is reduced at a normal rate. Recommended for average players. Score Multiplier: x1"));
    if (d3) d3.addEventListener("mouseenter", () => setDesc("Tough test. Faster and more agile enemies, heavier damage. Mistakes are not recommended. Enemies spawn more often. Sanity is reduced faster. Score Multiplier: x1.75"));
    if (d4) d4.addEventListener("mouseenter", () => setDesc("Unfair final. Brutal stats. You were warned. Sanity is reduced faster. Enemies are lighting fast and deal insane damage. Enemies swarm you. Mistakes are not allowed. Only a master of calc can last even 20 seconds. Score Multiplier: x4"));
    const clearDesc = () => setDesc("");
    if (d1) d1.addEventListener("mouseleave", clearDesc);
    if (d2) d2.addEventListener("mouseleave", clearDesc);
    if (d3) d3.addEventListener("mouseleave", clearDesc);
    if (d4) d4.addEventListener("mouseleave", clearDesc);


    if (m1) m1.addEventListener("mouseenter", () => setMDesc("Difficulty: Easy. Description: Ah, Mr. Loveday's room, a nice open haven for Shanvanth. Now it has become a warzone. Where is Mr. Loveday?"));
    if (m2) m2.addEventListener("mouseenter", () => setMDesc("Difficulty: Hard. Description: A closed off room with chairs blocking the way. Shanvanth will get swarmed very quickly if he isn't efficient with his defence."));
    const clearmapDesc = () => setMDesc("");
    if (m1) m1.addEventListener("mouseleave", clearmapDesc);
    if (m2) m2.addEventListener("mouseleave", clearmapDesc);
});

// Gate the loop to wait for menu
const originalUpdate = update;
    update = function(timestamp) {
    if (!gameStarted) {
        requestAnimationFrame(update);
        return;
    }
    originalUpdate(timestamp);
};

    // Expose a very small API intentionally: only what's needed externally
    window.ShansLastStand = {
        showMainMenu: showMainMenu,
        showGameUI: showGameUI
    };

    // Prevent accidental/hostile overwrite from console
    try { Object.freeze(window.ShansLastStand); } catch (e) {}

})();
