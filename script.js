(function(){
    'use strict';
    //game
    //fps
    //movechance
    //player
    const player = document.getElementById("player");
    const gameArea = document.getElementById("gameArea");

    // helper to determine whether the game area is currently visible/active
    const isGameActive = () => {
        try {
            return gameArea && window.getComputedStyle(gameArea).display !== 'none';
        } catch (e) {
            return false;
        }
    };

    // central messages container (stacked, centered at top of game area)
    const messagesContainer = (() => {
        let m = document.getElementById('GameMessages');
        if (!m && gameArea) {
            m = document.createElement('div');
            m.id = 'GameMessages';
            // visual layout handled by CSS; keep pointer-events none so it won't block clicks
            m.style.pointerEvents = 'none';
            gameArea.appendChild(m);
        }
        return m;
    })();



    let mouseX = 0;
    let mouseY = 0;
//dash
    const body = document.body;

    
    const crosshair = document.createElement("div");
    
    // Create visual crosshair
    crosshair.style.position = "absolute";
    crosshair.style.width = "10px";
    crosshair.style.height = "10px";
    crosshair.style.background = "transparent";
    crosshair.style.border = "2px solid red";
crosshair.style.borderRadius = "50%";
crosshair.style.left = "50%";
crosshair.style.top = "50%";
crosshair.style.transform = "translate(-50%, -50%)";
crosshair.style.pointerEvents = "none"; // Don't block clicks
crosshair.style.display = "none";
crosshair.style.zIndex = "9999";

gameArea.appendChild(crosshair);

// Request pointer lock on click
gameArea.addEventListener("click", () => {
    gameArea.requestPointerLock();
});

// Handle pointer lock changes
document.addEventListener("pointerlockchange", () => {
    if (document.pointerLockElement === gameArea) {
       // console.log("Pointer locked in game area.");
        crosshair.style.display = "block"; // Show our fake cursor
    } else {
        //console.log("Pointer unlocked.");
        crosshair.style.display = "none"; // Hide it
    }
});

// Track relative mouse movement when pointer is locked
document.addEventListener("mousemove", (e) => {
    if (document.pointerLockElement === gameArea) {
        mouseX += e.movementX;
        mouseY += e.movementY;
        
        mouseX = Math.max(0, Math.min(gameArea.offsetWidth, mouseX));
        mouseY = Math.max(0, Math.min(gameArea.offsetHeight, mouseY));
    }
});
//help
gameArea.addEventListener("mousemove", (e) => {
     if (!gameArea) return;
     gameArea.requestPointerLock();
    try {
        const rect = gameArea.body.getBoundingClientRect();
        mouseX = e.clientX - rect.left; // Mouse X relative to the game area
        mouseY = e.clientY - rect.top;  // Mouse Y relative to the game area
        crosshair.style.transform = "translate(-50%, -50%)";
        crosshair.style.left = mouseX+"px";
        crosshair.style.top = mouseY+"px";

    } catch(e) {}
});

let mouseHeld = false;

document.addEventListener("mousedown", () => {
    mouseHeld = true;
});

document.addEventListener("mouseup", () => {
    mouseHeld = false;
});
//playerAttacking
// Config constants
    const ShotgunCooldown = 1100; // milliseconds
    const CalcgunCooldown = 1500;
    const RiflegunCooldown = 67;
    const MCCooldown = 300;
    const iFrames = 1000;
    const BaseSpeed = 5.5;
    let Projweapon = "";
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
    let transitioning = false;
    const Filename = "ShansStand/";
    let timerd = 0;
    let activateTimerReset = false;
    // Player control state
    let dashing = false;
    let dashtimer = 45;
    let Hmessagetimer = 0;
    let SBmessagetimer = 0;
    let WeaponMessageTimer = 0;
    let MoveChance = 0;
    let MoveChanceTimer = 0;



    let RoomType = 0;

    // Audio
    const ouch = new Audio('Ouch.mp3'); // Replace with your sound file path
    const ShotgunSound = new Audio('ShotgunSound.mp3');
    const CalcgunSound = new Audio('Pew.mp3');
    const backgroundMusic = new Audio("shaunsshotgun.mp3");
    const deathSound = new Audio("ShanDeath.mp3");
    const domDeath = new Audio("DomDeath.mp3");
    const chengDeath = new Audio("ChengDeath.mp3");
    const ZukDeath = new Audio("ZukDeath.mp3");
    const dashCharged = new Audio("DashCharge.mp3");
    const MCSwoosh = new Audio("MCSwoosh.mp3");
    const TheyDontStopComing = new Audio("TheyDontStopComing.mp3");
    const ATMOC = new Audio("ATMOC.mp3");
    const RITW = new Audio("RITW.mp3");
    const PILINGBODIES = new Audio("PilingBodies.mp3");
    const RifleSound = new Audio("RifleSound.mp3");


    function playSound(sound) {
        //const originalAudio = document.getElementById('mySound');
        const newAudioInstance = sound.cloneNode(); // true for deep clone, but not necessary for audio elements
        newAudioInstance.play();
    }

    // Enemy projectile list
    let enemyProjectiles = [];



    let framespassed = 0;
    let framhechecking = false;
    

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
    let level = 1;


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
    alert("Controls:\nWASD or Arrow Keys to move\nSpace to shoot\nShift to dash. You will hear a chime when cooldown is over\nP to pause.\n1, 2 to toggle weapons. 1 for the Shauntgun, 2 for the Shauniper, 3 for the Asshaunt Rifle.\nC for melee pencil to regain sanity\n\nSanity affects damage! Sanity is sacrificed every shot.\nSurvive as many waves as you can!");
    document.addEventListener("wheel", function(e) {
    if (e.ctrlKey || e.metaKey) { // Check for Ctrl (Windows) or Cmd (Mac)
        e.preventDefault();
    }
}, { passive: false }); // Use passive: false to allow preventDefault
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const WindowPixels = viewportHeight * viewportWidth;
    const intendedWindowSize = 1920 * 1080;

    console.log("Viewport Size: " + viewportWidth + "x" + viewportHeight);

    document.body.style.zoom = Math.sqrt(WindowPixels / intendedWindowSize);
    backgroundMusic.play();
    backgroundMusic.loop = true;   // 🔁 make it loop
    backgroundMusic.volume = 2;  // optional: set volume
}

window.addEventListener("click", () => {
    backgroundMusic.play();
    backgroundMusic.loop = true;   // 🔁 make it loop
    backgroundMusic.volume = 2;
}, { once: true });
//showGame
//calc
MathQuest = false;
let Wave = 1;
let invinc = false;
let score = 0;
let playerhp =  100;

let camplevel = 1;
let currCamplevel = 1;
let CampEnemyCount = -1;

//forEach
let x = 280;
let y = 280;
let speed = 5;
let direction = "n";
let lockdirection = "n";
let movdirection = "n";
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
document.addEventListener("keydown", e => {
    keysPressed[e.key.toLowerCase()] = true;
    // Only allow pausing with Escape when the game is active/visible
    if (e.key === "p" && isGameActive()) {
        alert("Game Paused. Press OK to resume.");
        for (let key in keysPressed) {
            keysPressed[key] = false;
        }
        try {
            const healthMsg = document.getElementById("HealthMessage");
            if (healthMsg) healthMsg.remove();

            const sbMsg = document.getElementById("SBMessage");
            if (sbMsg) sbMsg.remove();

            const wpMsg = document.getElementById("WeaponMessage");
            if (wpMsg) sbMsg.remove();
        } catch (e) {

        }
    }

});
document.addEventListener("keyup", e => {
    keysPressed[e.key.toLowerCase()] = false
    // Only allow the 'c' math prompt when game is active/visible
    /*if (e.key.toLowerCase()=="c"  && !MathQuest && isGameActive()) {
        MathQuest = true;
        sanity-=10;
        number1 = Math.floor(Math.random()*1000)
        number2 = Math.floor(Math.random()*100)
        number3 = Math.floor(Math.random()*50)
        chance = Math.floor(Math.random()*5)
        if (chance == 1) {
            ans = prompt("What is "+number1+" + "+number2+" ? Round your answer! Don't let Shan just sacrifice his sanity!")
            if (ans == number1+number2) {
                sanity += 25;
                alert("Correct! You feel a bit more sane.")
            } else {
                alert("Wrong Answer! Psycho!")
            }
        } else if (chance == 2) {
            ans = prompt("What is "+number1+" - "+number3+" ? Round your answer! Don't let Shan just sacrifice his sanity!")
            if (ans == number1-number3) {
                sanity += 25;
                alert("Correct! You feel a bit more sane.")
            } else {
                alert("Wrong Answer! Psycho!")
            }
        } else if (chance == 0) {
            ans = prompt("What is "+number3+" * "+number2+" ? Round your answer! Don't let Shan just sacrifice his sanity!")
            if (ans == number3*number2) {
                sanity += 25;
                alert("Correct! You feel a bit more sane.")
            } else {
                alert("Wrong Answer! Psycho!")
            }
        } else if (chance == 3) {
            ans = prompt("What is "+number1+" / "+number3+" ? Round your answer! Don't let Shan just sacrifice his sanity!")
            if (ans == Math.floor(number1 / number3)) {
                sanity += 25;
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

            const wpMsg = document.getElementById("WeaponMessage");
            if (wpMsg) sbMsg.remove();
        } catch (e) {

        }
        for (let key in keysPressed) {
            keysPressed[key] = false;
        }
        setTimeout(() => { 
        MathQuest = false;
        }, puzzlecooldown);

    }*/
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
//Cheng.png
// Ranged variant: stops approaching when within 100px and fires projectiles at the player
class RangedCharger {
    constructor(x, y, speed, enemyHP, damage, fileName, width, height) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.enemyHP = enemyHP;
        this.fileName = fileName;
        this.damage = damage;
        this.width = width;
        this.height = height;
    this.fireCooldown = 0; // frames until next shot
    this.fireInterval = 90 / (difficulty/3); // frames between shots (~3s)
        // Create DOM
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.left = `${x}px`;
        this.el.style.top = `${y}px`;
        this.el.style.height = height + 'px';
        this.el.style.width = width + 'px';
        this.el.id = 'enemy' + enemyCount;
        this.el.style.backgroundImage = `url('${this.fileName}')`;
        this.el.style.backgroundSize = 'cover';
        this.hpText = document.createElement('div');
        this.hpText.style.position = 'absolute';
        this.hpText.style.top = '-15px';
        this.hpText.style.left = '50%';
        this.hpText.style.transform = 'translateX(-50%)';
        this.hpText.style.color = 'red';
        this.hpText.style.fontSize = '14px';
        this.hpText.style.fontWeight = 'bold';
        this.hpText.style.textAlign = 'center';
        this.hpText.innerText = this.enemyHP;
        this.el.appendChild(this.hpText);
        gameArea.appendChild(this.el);
    }

    moveToward(targetX, targetY) {
        // compute center distance
        const centerX = this.x + (this.width ? this.width / 2 : 0);
        const centerY = this.y + (this.height ? this.height / 2 : 0);
        const dx = targetX - centerX;
        const dy = targetY - centerY;
        const dist = Math.hypot(dx, dy);
        
        if (dist > 170 && this.fireCooldown <= (this.fireInterval - 15)) {
            // move toward player
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
            this.el.style.left = `${this.x}px`;
            this.el.style.top = `${this.y}px`;
            // Update rotation as in Charger
            let angleRad = Math.atan2(dy, dx);
            let angleDeg = angleRad * (180 / Math.PI);
            this.el.style.transform = `rotate(${angleDeg + 90 + 180}deg)`;
        } else {
            //MoveChance = 0;
            // stop moving and attempt to fire
            if (this.fireCooldown <= 0) {
                this.fireCooldown = this.fireInterval;
                this.fireAt(targetX, targetY);
                //MoveChance = Math.random()
                
            }
            //console.log
            // Update rotation as in Charger
            let angleRad = Math.atan2(dy, dx);
            let angleDeg = angleRad * (180 / Math.PI);
            let angleDash = angleDeg + 90
        
            if (this.fireCooldown >= (this.fireInterval - 15)) {

                
                

                if (angleDash >= 315 || angleDash <= 45) {
                    if (MoveChance > 0.5) {
                        this.x += (dx / dist) * 3 * this.speed;
    
                    } else {
                        this.x += -1 * (dx / dist) * 3 * this.speed;
                    }   
                    this.y += (dy / dist) * 0.5 * this.speed;
    
                }
    
                if (angleDash > 45 && angleDash <= 135) {
                    if (MoveChance > 0.5) {
                        this.y += (dy / dist) * 3 * this.speed;
    
                    } else {
                        this.y += -1 * (dy / dist) * 3 * this.speed;
                    }   
                    this.x += (dx / dist) * 0.5 * this.speed;
    
                }
    
                if (angleDash > 135 && angleDash <= 225) {
                    if (MoveChance > 0.5) {
                        this.x += (dx / dist) * 3 * this.speed;
    
                    } else {
                        this.x += -1 * (dx / dist) * 3 * this.speed;
                    }   
                    this.y += (dy / dist) * 0.5 * this.speed;
    
                }
    
                if (angleDash > 225 && angleDash < 315) {
                    if (MoveChance > 0.5) {
                        this.y += (dy / dist) * 3 * this.speed;
    
                    } else {
                        this.y += -1 * (dy / dist) * 3 * this.speed;
                    }   
                    this.x += (dx / dist) * 0.5 * this.speed;
    
                }
    
                this.el.style.left = `${this.x}px`;
                this.el.style.top = `${this.y}px`;
                this.el.style.transform = `rotate(${angleDash + 180}deg)`;
                //console.log("Cheng Angle: "+angleDash + " Cheng Speed: " +this.speed)
            } else if ((dist > 170)) {
                this.x += (dx / dist) * this.speed;
                this.y += (dy / dist) * this.speed;
                this.el.style.left = `${this.x}px`;
                this.el.style.top = `${this.y}px`;
                // Update rotation as in Charger
                let angleRad = Math.atan2(dy, dx);
                let angleDeg = angleRad * (180 / Math.PI);

                if (angleDeg < 0) {
                    angleDeg = 360 - angleDeg
                }


                this.el.style.transform = `rotate(${angleDeg + 90 + 180}deg)`;
            } else {
                if (MoveChance > 0.5) {
                    this.x -= 0.8 * (dx / dist) * this.speed;
                    this.y -= 0.8 * (dy / dist) * this.speed;
                    this.el.style.left = `${this.x}px`;
                    this.el.style.top = `${this.y}px`;
                    // Update rotation as in Charger
                    let angleRad = Math.atan2(dy, dx);
                    let angleDeg = angleRad * (180 / Math.PI);
    
                    if (angleDeg < 0) {
                        angleDeg = 360 - angleDeg
                    }

                } else {
                    this.x += 0.8 * (dx / dist) * this.speed;
                    this.y += 0.8 * (dy / dist) * this.speed;
                    this.el.style.left = `${this.x}px`;
                    this.el.style.top = `${this.y}px`;
                    // Update rotation as in Charger
                    let angleRad = Math.atan2(dy, dx);
                    let angleDeg = angleRad * (180 / Math.PI);
    
                    if (angleDeg < 0) {
                        angleDeg = 360 - angleDeg
                    }
                }


                this.el.style.transform = `rotate(${angleDeg + 90 + 180}deg)`;
            }

        }
        if (this.fireCooldown > 0) this.fireCooldown--;
        // Update HP text
        this.hpText.innerText = Math.ceil(this.enemyHP);
    }

    fireAt(targetX, targetY) {
        // create a projectile element aimed at the target
        const proj = document.createElement('div');
        proj.style.position = 'absolute';
        proj.style.width = '15px';
        proj.style.height = '15px';
        //proj.style.borderRadius = '50%';
        //proj.style.background = "orange";
        proj.style.backgroundImage = 'url("Wheels.png")';
        proj.style.backgroundSize = "cover";
        proj.style.backgroundRepeat = "no-repeat";
        proj.style.backgroundPosition = "center";
        // start at center of enemy
        const startX = this.x + (this.width ? this.width / 2 : 0);
        const startY = this.y + (this.height ? this.height / 2 : 0);
        proj.style.left = `${startX}px`;
        proj.style.top = `${startY}px`;
        gameArea.appendChild(proj);
        // compute velocity
        const dx = targetX - startX;
        const dy = targetY - startY;
        const dist = Math.hypot(dx, dy) || 1;
        const speed = 11*difficulty/3; // enemy projectile speed
        const vx = (dx / dist) * speed;
        const vy = (dy / dist) * speed;
        // projectile carries damage equal to this.damage
            enemyProjectiles.push({ x: startX, y: startY, dx: vx, dy: vy, el: proj, damage: this.damage });
            try { playSound(CalcgunSound); } catch (e) {}
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
//const

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

//fpsco
async function FPSCount() {
     document.getElementById("FPSCounter").style.display = "flex";
     let frameCheckTime = 1
    if (!framhechecking) {
        framhechecking = true;
        await sleep(1000/frameCheckTime);
        framhechecking = false;
        if (framespassed-1 <= 0) {
            framespassed = 1;
        }
        document.getElementById("FPSCounter").innerHTML = "FPS: "+Math.max((0, (framespassed-1)*frameCheckTime))
        //console.log("FPS:"+(framespassed-1))
        framespassed = 0;
    } else {
    }
    
}
//show
//curr
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

//function to create rooms

function startRoom(x, IGTimer) {
    if (IGTimer == 0) {
        enemies.forEach(enemy => enemy.el.remove());
        enemies = [];
        document.getElementById("ScoreTitle").innerHTML = "Score";
        document.getElementById("WaveTitle").innerHTML = "Wave";
        switch (x) {
            case 0: lovedayRoom();
            
                break;
            case 1: lovedayRoom();
                break;
            case 2: roboticsRoom();
                break;
            case 3: englishRoom();
                break;
            case 4: physicsRoom();
                break;
        }
        startGameFromMenu();
        
    } else {
        //use to set enemy spawns per level
        
        if (x == 0) {
            if (currCamplevel == 1) {
                if (CampEnemyCount <= 20 && CampEnemyCount >= 16) {

                    if (IGTimer == 150) {
                           
                                // schedule spawn with portal
                                EnemySpawnCampaign('dom', 80, 400);
                                spawntime = 0;
        
                        }
                    if (IGTimer == 170) {
                        const spawn = getValidSpawnRect(50, 50);
                        EnemySpawnCampaign('dom', 150, 200);
                        spawntime = 0;
                    }
                    if (IGTimer == 240) {
                        const spawn = getValidSpawnRect(50, 50);
                        EnemySpawnCampaign('dom', 500, 300);
                        spawntime = 0;
                    }
                    if (IGTimer == 260) {
                        const spawn = getValidSpawnRect(50, 50);
                        EnemySpawnCampaign('dom', 200, 600);
                        spawntime = 0;
                    }
                    if (IGTimer == 300) {
                        const spawn = getValidSpawnRect(50, 50);
                        EnemySpawnCampaign('dom', 250, 100);
                        spawntime = 0;
                    }
                }
                console.log("Camp Enemy Count: "+CampEnemyCount+ " Timer: "+activateTimerReset)
                if (CampEnemyCount <= 15   && CampEnemyCount >= 11 && !activateTimerReset) {
                    activateTimerReset = true;
                    console.log("Should work??")
                    timerd = 0;
                }

                if (CampEnemyCount <= 15  && CampEnemyCount >= 11) {
                    if (IGTimer == 150) {
                           
                                // schedule spawn with portal
                        EnemySpawnCampaign('dom', 80, 400);
                        spawntime = 0;
        
                    }
                    if (IGTimer == 170) {
                        const spawn = getValidSpawnRect(50, 50);
                        EnemySpawnCampaign('dom', 150, 200);
                        spawntime = 0;
                    }
                    if (IGTimer == 240) {
                        const spawn = getValidSpawnRect(50, 50);
                        EnemySpawnCampaign('dom', 500, 300);
                        spawntime = 0;
                    }
                    if (IGTimer == 260) {
                        const spawn = getValidSpawnRect(50, 50);
                        EnemySpawnCampaign('dom', 200, 600);
                        spawntime = 0;
                    }
                    if (IGTimer == 300) {
                        const spawn = getValidSpawnRect(50, 50);
                        EnemySpawnCampaign('dom', 250, 100);
                        spawntime = 0;
                    }
                }

                if (CampEnemyCount <= 10   && CampEnemyCount >= 6 && activateTimerReset) {
                    activateTimerReset = false;
                    timerd = 0;
                }

                if (CampEnemyCount <= 10   && CampEnemyCount >= 6) {
                    if (IGTimer == 150) {
                           
                                // schedule spawn with portal
                        EnemySpawnCampaign('dom', 80, 400);
                        spawntime = 0;
        
                    }
                    if (IGTimer == 170) {
                        const spawn = getValidSpawnRect(50, 50);
                        EnemySpawnCampaign('dom', 150, 200);
                        spawntime = 0;
                    }
                    if (IGTimer == 240) {
                        const spawn = getValidSpawnRect(50, 50);
                        EnemySpawnCampaign('dom', 500, 300);
                        spawntime = 0;
                    }
                    if (IGTimer == 260) {
                        const spawn = getValidSpawnRect(50, 50);
                        EnemySpawnCampaign('dom', 200, 600);
                        spawntime = 0;
                    }
                    if (IGTimer == 300) {
                        const spawn = getValidSpawnRect(50, 50);
                        EnemySpawnCampaign('dom', 250, 100);
                        spawntime = 0;
                    }
                }

                if (CampEnemyCount <= 5   && CampEnemyCount >= 1 && !activateTimerReset) {
                    activateTimerReset = true;
                    timerd = 0;
                }
                
            }
        } /*else if (x == 2) {
            if (timerd%250 == 0) {
                    const spawn = getValidSpawnRect(50, 50);
                    if (spawn) {
                        EnemySpawnCampaign('zuk');
                        spawntime = 0;
                    } else {
                        // No valid spawn found (likely crowded with obstacles); skip this spawn attempt
                        console.warn('No valid spawn found for roboticsRoom spawner; skipping spawn this tick.');
                    }
                }
        }
                */
    }

    // Update enemy-fired projectiles
    if (enemyProjectiles.length > 0) {
        const areaWidth = 650;
        const areaHeight = 650;
        enemyProjectiles = enemyProjectiles.filter((p) => {
            p.x += p.dx;
            p.y += p.dy;
            p.el.style.left = `${p.x}px`;
            p.el.style.top = `${p.y}px`;
            // border check
            if (p.x < 0 || p.x > areaWidth || p.y < 0 || p.y > areaHeight) {
                p.el.remove();
                return false;
            }
            // obstacle collision
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
            // collision with player
            try {
                const playerRect = player.getBoundingClientRect();
                const projRect = p.el.getBoundingClientRect();
                const hit = !(projRect.right < playerRect.left || projRect.left > playerRect.right || projRect.bottom < playerRect.top || projRect.top > playerRect.bottom);
                if (hit && !invinc) {
                    playerhp -= Math.floor(p.damage + Math.floor(Math.random() * 5));
                    if (playerhp < 0) playerhp = 0;
                    ouch.play();
                    setFlash('rgba(255,0,0,0.25)', 120);
                    invinc = true;
                    setTimeout(() => { invinc = false; }, iFrames);
                    p.el.remove();
                    return false;//shift
                }
            } catch (e) {}
            return true;
        });
    }

}
//click

function startCutscene(image, durationMs, text, bg) {
    // image: string or array of character-image urls
    // durationMs: ms per slide (total duration for single image)
    // text: string or array (if array, matched to images)
    // bg: optional background image url or background-position keyword ('left','right','center')
    try {
        // normalize inputs
        const slides = Array.isArray(image) ? image.slice() : [image];
        const texts = Array.isArray(text) ? text.slice() : slides.map(() => (text || ""));
        const delay = Math.max(200, Number(durationMs) || 2000);

        // remove any existing cutscene overlay
        const existing = document.getElementById('cutsceneOverlay');
        if (existing) existing.remove();

        // container that covers the viewport
        const overlay = document.createElement('div');
        overlay.id = 'cutsceneOverlay';
        overlay.style.position = 'fixed';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '10000';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'flex-end';
        overlay.style.justifyContent = 'center';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.6)';
        overlay.style.pointerEvents = 'auto';
        overlay.style.overflow = 'hidden';

        // background handling: if bg looks like an image path, use it as background; otherwise use as position
        if (bg) {
            const bgStr = String(bg);
            if (/\.(png|jpg|jpeg|webp|gif)$/i.test(bgStr) || bgStr.indexOf('url(') !== -1) {
                overlay.style.backgroundImage = `url('${bgStr}')`;
                overlay.style.backgroundSize = 'cover';
                overlay.style.backgroundPosition = 'center';
            } else {
                overlay.style.backgroundSize = 'cover';
                overlay.style.backgroundPosition = bgStr || 'center';
            }
        } else {
            overlay.style.backgroundColor = 'rgba(0,0,0,0.6)';
        }

        // character image element (bottom-left by default)
        const charEl = document.createElement('img');
        charEl.id = 'cutsceneChar';
        charEl.style.position = 'absolute';
        charEl.style.bottom = '8%';
        charEl.style.left = '4%';
        charEl.style.maxHeight = '60%';
        charEl.style.maxWidth = '35%';
        charEl.style.objectFit = 'contain';
        charEl.style.transition = 'opacity 300ms ease';
        charEl.style.opacity = '0';
        charEl.style.pointerEvents = 'none';
        overlay.appendChild(charEl);

        // text box at bottom center
        const textBox = document.createElement('div');
        textBox.id = 'cutsceneText';
        textBox.style.position = 'absolute';
        textBox.style.left = '50%';
        textBox.style.bottom = '4%';
        textBox.style.transform = 'translateX(-50%)';
        textBox.style.maxWidth = '90%';
        textBox.style.width = '900px';
        textBox.style.background = 'rgba(0,0,0,0.7)';
        textBox.style.color = 'white';
        textBox.style.padding = '14px 18px';
        textBox.style.borderRadius = '8px';
        textBox.style.fontSize = '18px';
        textBox.style.lineHeight = '1.3';
        textBox.style.textAlign = 'center';
        textBox.style.boxShadow = '0 6px 20px rgba(0,0,0,0.6)';
        textBox.style.pointerEvents = 'none';
        overlay.appendChild(textBox);

        // clicking overlay skips the cutscene
        /*overlay.addEventListener('click', () => {
            try { overlay.remove(); } catch (e) {}
        });*/

        document.body.appendChild(overlay);

        let idx = 0;
        let removed = false;

        const showSlide = i => {
            if (removed) return;
            const img = slides[i];
            const t = texts[i] || "";
            // fade out, change, fade in
            charEl.style.opacity = '0';
            setTimeout(() => {
                if (img) {
                    charEl.src = img;
                    charEl.style.display = 'block';
                } else {
                    charEl.style.display = 'none';
                }
                textBox.innerText = t;
                charEl.style.opacity = '1';
            }, 250);
        };

        // schedule sequence
        const timers = [];
        const total = slides.length;
        for (let i = 0; i < total; i++) {
            const when = i * delay;
            timers.push(setTimeout(() => {
                showSlide(i);
            }, when));
        }
        // final remove after last slide
        timers.push(setTimeout(() => {
            try { overlay.remove(); } catch (e) {}
            removed = true;
        }, total * delay));

        // return an object allowing manual control if caller wants it
        return {
            stop: () => {
                timers.forEach(t => clearTimeout(t));
                try { overlay.remove(); } catch (e) {}
                removed = true;
            }
        };
    } catch (err) {
        console.warn('startCutscene error', err);
        return null;
    }
}
// ...existing code...







// Centralized enemy death handler. Does DOM removal, scoring, counters and a 5% chance to drop a heal pickup.
function handleEnemyDeath(enemy) {
    try { enemy.el.remove(); } catch (e) {}
    // Base score
    score += 250 * Mult;
    // Extra handling based on type
    //console.log("Enemy File name: "+enemy.fil)
    if (enemy.fileName == "Zuk.png") {
        score += 250 * Mult;
        tankCount = Math.max(0, tankCount - 1);
        try { playSound(ZukDeath); } catch (e) {}
    } else if (enemy.fileName == "Shower.jpg") {
        score += 750 * Mult;
        showerCount = Math.max(0, showerCount - 1);
    } else if (enemy.fileName == "Cheng.png") {
        score+= 125 * Mult;
        try { playSound(chengDeath); } catch (e) {}
        chargerCount = Math.max(0, chargerCount - 1);
    } else {
        try { playSound(domDeath); } catch (e) {}
        chargerCount = Math.max(0, chargerCount - 1);
    }

    // 5% chance to drop a health pickup at the enemy's location. Defer to avoid mutating arrays mid-iteration.
    if (Math.random() < 0.05) {
        const hx = enemy.x || 0;
        const hy = enemy.y || 0;
        setTimeout(() => {
            try {
                enemies.push(new HealPickup(hx, hy));
                healthCount = Math.max(0, healthCount + 1);
                enemyCount++;
            } catch (e) {}
        }, 0);
    }
}

// Enemy spawn with portal animation and delay (fade-in then fade-out over ~600ms total)
function EnemySpawnCampaign(type, enx = -1, eny = -1, delayMs = 900) {
    // New signature: EnemySpawnCampaign(type, delayMs = 600)
    // `type` is a string selector: 'dom','ranged','zuk','shower','heal','score'
    // Map the type into the concrete parameters used to create the entity
    let damage = 0;
    let enemyHP = 0;
    let speed = 0;
    let fileName = '';
    let width = 50;
    let height = 50;
    const t = (type && typeof type === 'string') ? type.toString().toLowerCase() : null;
    if (!t) {
        console.warn('EnemySpawnCampaign: expected string type as first argument; got', type);
        return false;
    }


    //console.log(CampEnemyCount);


    switch (t) {
        case 'dom':
            damage = 4 * difficulty / 2;
            enemyHP = Math.floor((350 * (0.9 + Wave/10) ** 2) * difficulty / 2);
            speed = Math.floor(3 * difficulty / 3);
            fileName = 'Dom.png'; width = 40; height = 40; break;
        case 'ranged':
            damage = Math.floor(5 * difficulty / 2);
            enemyHP = Math.floor((250 * (0.9 + Wave/10) ** 2) * difficulty / 2);
            speed = 3.5 * difficulty / 3;
            fileName = 'Cheng.png'; width = 40; height = 40; break;
        case 'zuk':
            damage = Math.floor(6 * difficulty / 2);
            enemyHP = Math.floor((700 * (0.9 + Wave/10) ** 2) * difficulty / 2);
            speed = 0.75 * difficulty / 3;
            fileName = 'Zuk.png'; width = 60; height = 60; break;
        case 'shower':
            damage = Math.floor(16 * difficulty / 2);
            enemyHP = Math.floor((3000 * (0.9 + Wave/10) ** 2) * difficulty / 2);
            speed = 0.2 * difficulty / 3;
            fileName = 'Shower.jpg'; width = 70; height = 70; break;
        case 'heal':
        case 'healpickup':
            damage = 0; enemyHP = 0; speed = 0; fileName = 'HealPickup'; width = 45; height = 45; break;
        case 'score':
        case 'scoreboost':
            damage = 0; enemyHP = 0; speed = 0; fileName = 'ScoreBoost'; width = 45; height = 45; break;
        default:
            console.warn('EnemySpawnCampaign: unknown enemy type', damage);
            return false;
    }
    let ex;
    let ey;
    if (enx == -1 || eny == -1) {
        const spawn = getValidSpawnRect(width, height);
        if (!spawn) {
            console.warn('EnemySpawnCampaign: no valid spawn found for', fileName, 'skipping spawn.');
            return false;
        }
        ex = spawn.x;
        ey = spawn.y;
        
    } else {
        ex = enx;
        ey = eny;
    }

    // Create a portal visual at the spawn point
    const portal = document.createElement('div');
    portal.style.position = 'absolute';
    portal.style.left = `${ex}px`;
    portal.style.top = `${ey}px`;
    portal.style.transform = 'translate(-50%, -50%)';
    const pSize = Math.max(40, Math.min(120, Math.max(width, height)));
    portal.style.width = `${pSize}px`;
    portal.style.height = `${pSize}px`;
    portal.style.borderRadius = '50%';
    portal.style.backgroundImage = "url('Portal.webp')";
    portal.style.backgroundSize = 'cover';
    portal.style.opacity = '0';
    portal.style.transition = 'opacity 300ms ease-in-out';
    portal.style.pointerEvents = 'none';
    gameArea.appendChild(portal);

    // Fade in then fade out, spawn when fade-out completes
    setTimeout(() => { portal.style.opacity = '1'; }, 10);
    // fade out after half the delay
    setTimeout(() => { portal.style.opacity = '0'; }, 10 + Math.max(0, delayMs / 2));
    setTimeout(() => {
        try { portal.remove(); } catch (e) {}
        // Create the entity
        if (fileName === 'HealPickup') {
            enemies.push(new HealPickup(ex, ey));
            healthCount++;
            enemyCount++;
        } else if (fileName === 'ScoreBoost') {
            enemies.push(new ScoreBoost(ex, ey));
            scoreBoostCount = Math.max(0, scoreBoostCount + 1);
            enemyCount++;
        } else {
            // Special-case: Ranged variant that looks like Dom.png
            if (fileName === 'Cheng.png') {
                enemies.push(new RangedCharger(ex, ey, speed, enemyHP, damage, 'Cheng.png', width, height));
            } else {
                enemies.push(new Charger(ex, ey, speed, enemyHP, damage, fileName, width, height));
            }
            // classify counters
            if (fileName == 'Zuk.png') {
                tankCount = Math.max(0, tankCount + 1);
            } else if (fileName == 'Shower.jpg') {
                showerCount = Math.max(0, showerCount + 1);
            } else {
                chargerCount = Math.max(0, chargerCount + 1);
            }
            enemyCount++;
        }
    }, 10 + delayMs + 10);

    return true;
}




//CampEnemyCount

function lovedayRoom() {
    TheyDontStopComing.play();
    TheyDontStopComing.loop = true;
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
//"player"
function roboticsRoom() {
    ATMOC.play();
    ATMOC.loop = true;
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

function englishRoom() {
    RITW.play();
    RITW.loop = true;
    gameArea.style.backgroundImage = "url('MRFONGROOM.png')"

    addObstacle(80, 210, 65, 330, { color: "#F8DFA1" }); 
    //addObstacle(490, 210, 65, 330, { color: "#F8DFA1" }); 

    addObstacle(490, 210, 65, 140, { color: "#F8DFA1" }); 

    addObstacle(490, 455, 65, 80, { color: "#F8DFA1" }); 

    addObstacle(215, 270, 200, 65, { color: "#F8DFA1" }); 
    addObstacle(90, 260, 20, 25, { color: "#000000" }); 

    addObstacle(110, 430, 20, 25, { color: "#000000" }); 

    addObstacle(215, 470, 200, 65, { color: "#F8DFA1" }); 
    addObstacle(290, 490, 25, 20, { color: "#000000" }); 
    addObstacle(415+12.5, 470+7.5, 50, 50, { color: "#000000", blocksProjectiles: false}); 
    addObstacle(500, 0, 70, 130, { color: "#947A54" }); 
    addObstacle(540, 60, 25, 32, { color: "#a7a7a7" }); 
    addObstacle(540+12, 60+13.5, 5, 5, { color: "#eeeeee" }); 
    addObstacle(497.5-20, 575, 120, 65, { color: "#434343"}); 
    addObstacle(80, 0, 65, 65, { color: "#F8DFA1" }); 
    //addObstacle(0, 575, 90, 65, { color: "#434343", blocksProjectiles: false }); 

    /*
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
    */
    
}

function physicsRoom() {
    PILINGBODIES.play();
    PILINGBODIES.loop = true;
    gameArea.style.backgroundImage = "url('PhysicsClass.png')"

    addObstacle(175, 120, 300, 80, { color: "#6699cc" }); 
    addObstacle(550, 0, 100, 70, { color: "#55342b" }); 
    addObstacle(0, 290, 160, 65, { color: "#F8DFA1" }); 
    addObstacle(245, 340, 160, 65, { color: "#F8DFA1" }); 
    addObstacle(490, 290, 160, 65, { color: "#F8DFA1" });
    addObstacle(0, 290+170, 160, 65, { color: "#F8DFA1" }); 
    addObstacle(245, 340+170, 160, 65, { color: "#F8DFA1" }); 
    addObstacle(490, 290+170, 160, 65, { color: "#F8DFA1" });  
    //addObstacle(490, 210, 65, 330, { color: "#F8DFA1" }); 

    
    //addObstacle(0, 575, 90, 65, { color: "#434343", blocksProjectiles: false }); 

    /*
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
    */
    
}



//Math.min
let lastFrameTime = 0;
const fps = 60;
const frameDuration = 1000 / fps;
scoreBoostCount = 0;
attackingDelay = 0
//CampEnemy
function update(timestamp) {
  try {


    if (!gameStarted) {
            requestAnimationFrame(update);
            return; // Exit early if the game hasn't started
    }


    if (!timestamp) timestamp = performance.now();
    const delta = timestamp - lastFrameTime;

    if (delta >= frameDuration) {
      lastFrameTime = timestamp - (delta % frameDuration);

      let dx = 0, dy = 0;

        
      sanityTimer++;
      if (difficulty == 1) {
        if (sanityTimer >= 90) {
            sanityTimer = 0;
            if (sanity > 0) {
                sanity++;
            } else {
                sanity = 0;
            }
        }
      } else if (difficulty == 2) {
        if (sanityTimer >= 120) {
            sanityTimer = 0;
            if (sanity > 0) {
                sanity++;
            } else {
                sanity = 0;
            }
        }
      } else if (difficulty == 3) {
        if (sanityTimer >= 150) {
            sanityTimer = 0;
            if (sanity > 0) {
                sanity++;
            } else {
                sanity = 0;
            }
        }
      }
      if (sanity > 100) {
        sanity = 100;
      }

      if (sanity <= 0) {
        sanity = 0;
      }

      timerd++;
      startRoom(RoomType, timerd);


      if (x < 25) {
        x = 25
      }
      if (x > 625) {
        x = 625
      }
      if (y <25) {
        y = 25
      }
      if (y > 625) {
        y = 625
      }

      crosshair.style.transform = "translate(-50%, -50%)";
    crosshair.style.left = mouseX+"px";
    crosshair.style.top = mouseY+"px";

        if (Boost==true && BoostTime <= 360) {
            Mult = 2
            BoostTime++
        } else {
            Boost = false
            Mult = true;
        }


        if (CurrWeap == 0 && !attack) {
            player.src = "PlayerMC.png"
        }
        if (CurrWeap == 1 && !attack) {
            player.src = "Player.png"
        }
        if (CurrWeap == 2 && !attack) {
            player.src = "Player2.png"
        }
        if (CurrWeap == 3 && !attack) {
            player.src = "Player3.png"
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
            const sbMsg = document.getElementById("WeaponMessage");
            if (sbMsg) {
                WeaponMessageTimer++;
            } else {
                WeaponMessageTimer = 0;
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
        if (WeaponMessageTimer >= 60) {
            try {
    
                const sbMsg = document.getElementById("WeaponMessage");
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
    

        MoveChanceTimer++ 
        if (MoveChanceTimer>120) {
            MoveChance = Math.random();
           // console.log("Reset!")
            MoveChanceTimer = 0;
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

        if (keysPressed["3"] && CurrWeap != 3) {
            CurrWeap = 3;
            attack = false; // cancel any current firing
            // reset cooldowns; only apply load time for calc gun (5 frames)
            Atdelay = 30;
            attackingDelay = 20000;
            }

        if (keysPressed["c"] && CurrWeap != 0) {
            CurrWeap = 0;
            attack = false; // cancel any current firing
            // reset cooldowns; only apply load time for calc gun (5 frames)
            Atdelay = 15;
            attackingDelay = 20000;
            }
                
        Atdelay--
        attackingDelay++
        
        
        if (attack && attackingDelay >= MCCooldown/1000 * 60 && CurrWeap == 0) {
            attack = false 
        }
        if (attack && attackingDelay >= ShotgunCooldown/1000 * 60 && CurrWeap == 1) {
            attack = false 
        }
        if (attack && attackingDelay >= CalcgunCooldown/1000 * 60 && CurrWeap == 2) {
            attack = false 
        }
        if (attack && attackingDelay >= RiflegunCooldown/1000 * 60 && CurrWeap == 3) {
            attack = false 
        }


        if (keysPressed[" "] && attack == false && Atdelay <= 0) {
            attack = true;
           // console.log("attack!")
            FirstAttack = true;
            attackingDelay = 0;
        }

        if (mouseHeld && !attack && Atdelay <= 0) {
                attack = true;
              //  console.log("Mouse click attack!");
                FirstAttack = true;
                attackingDelay = 0;
        }


        


    dashtimer++;
    framespassed++;
    FPSCount();
    console.log(timerd);
    if (dashtimer >= 6) {
        speed = BaseSpeed;
        dashing = false;
    }
    
    if (dashtimer >= 50 && !dashCharge) {
        dashCharge = true; 
        dashCharged.play();

    }
    
    if (keysPressed["shift"] && dashtimer >= 60 && !dashing) {
        speed = 20;
        dashing = true;
        dashtimer = 0;
        dashCharge = false;
        invinc = true;
        setTimeout(() => { invinc = false; }, 200);
        lockdirection = movdirection;
    }

    if (keysPressed["w"] || keysPressed["arrowup"]) {
        if (y >= 25) {

            dy -= speed;
        } else {
            y = 25;
        }


    }

   






    if (keysPressed["s"] || keysPressed["arrowdown"]) {
        if (y <= 625) {

            dy += speed;
        } else {
            y = 625;
        }

    } 

    if (keysPressed["a"] || keysPressed["arrowleft"]) {
        if (x >= 25) {

            dx -= speed;
        } else {
            x = 25;
        }

    }

    if (keysPressed["d"] || keysPressed["arrowright"]) {
        if (x <= 625) {

            dx += speed;
        } else {
            x = 625;
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
            movdirection = "nw";
            //console.log(movdirection)
        } else if (dy > 0) {
            movdirection = "sw";
            //console.log(movdirection)
        } else {
            movdirection = "w";
           // console.log(movdirection)
        }
    } else if (dx > 0) {
        if (dy < 0 ) {
            movdirection = "ne";
           // console.log(movdirection)
        } else if (dy > 0) {
            movdirection = "se";
           // console.log(movdirection)
        } else {
            movdirection = "e";
           // console.log(movdirection)
        }
    } else {
        if (dy < 0) {
            movdirection = "n";
           // console.log(movdirection)
        } else if (dy > 0) {
            movdirection = "s";
           // console.log(movdirection)
        }
    }

    x += dx;
    y += dy;

    //dash

    const angleRad = Math.atan2(mouseY - y, mouseX - x);
    let angleDeg = 0;
    if (angleRad * (180 / Math.PI)+90 < 0 ) {
        angleDeg = 360 + angleRad * (180 / Math.PI)+90;

    } else {
        angleDeg = angleRad * (180 / Math.PI)+90;
    }

    //console.log("angle: "+angleDeg)
    if (angleDeg >= 337.5 || angleDeg < 22.5) {
        direction = "n"
    } else if (angleDeg >= 22.5 && angleDeg < 67.5) {
        direction = "ne"
    } else if (angleDeg >= 67.5 && angleDeg < 112.5) {
        direction = "e"
    } else if (angleDeg >= 112.5 && angleDeg < 157.5) {
        direction = "se"
    } else if (angleDeg >= 157.5 && angleDeg < 202.5) {
        direction = "s"
    } else if (angleDeg >= 202.5 && angleDeg < 247.5) {
        direction = "sw"
    } else if (angleDeg >= 247.5 && angleDeg < 292.5) {
        direction = "w"
    } else if (angleDeg >= 292.5 && angleDeg < 337.5) {
        direction = "nw"
    }
    player.style.transform = `translate(-50%, -50%) rotate(${angleDeg+180}deg)`;       
    if (attack) {
        if (CurrWeap == 0) {
            player.src = "PlayerAttackingMC.png";
        } else if (CurrWeap == 1) {
            player.src = "PlayerAttacking.png";
        } else if (CurrWeap == 2) {
            player.src = "PlayerAttacking2.png";
        } else if (CurrWeap == 3) {
            player.src = "PlayerAttacking3.png";
        }
        player.style.transform = `translate(-50%, -50%) rotate(${angleDeg+180}deg)`;
    }
    // Resolve player vs obstacles
    if (obstacles.length > 0) {
        // player is 65x65 and positioned with center at (x,y)
        let px = x - 25;
        let py = y - 25;
        const pw = 50;
        const ph = 50;
        for (let i = 0; i < obstacles.length; i++) {
            const o = obstacles[i];
            if (rectsOverlap(px, py, pw, ph, o.x, o.y, o.width, o.height)) {
                const resolved = resolvePlayerObstacleCollision(px, py, pw, ph, o);
                px = resolved.x;
                py = resolved.y;
            }
        }
        x = px + 25;
        y = py + 25;
    }

    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
    //player.src = "Player.png";
    //player.style.transform = `translate(-50%, -50%) rotate(${directionAngles[direction]}deg)`;

//rifle
    // --- Charger Spawning ---
    if (spawntime > 50 && RoomType != 0) {
        spawnEnemy = Math.random()*100*(2/difficulty)
        if (spawnEnemy < 3 && spawnEnemy > 2.4 && chargerCount<7) { // ~.6% chance per frame
                    // Attempt to schedule a Charger spawn with portal
                    if (EnemySpawnCampaign('ranged')) {
                        spawntime = 0;
                    }
        }
        if (spawnEnemy < 1 && chargerCount<7) { // ~1% chance per frame
                    // Attempt to schedule a Charger spawn with portal
                    if (EnemySpawnCampaign('dom')) {
                        spawntime = 0;
                    }
        }
        if (spawnEnemy <1.3 && spawnEnemy > 1 && healthCount<2 && elapsed > 600) { // ~.3% chance per frame
                    // Schedule a heal pickup spawn via portal visual
                    if (EnemySpawnCampaign('heal')) {
                        spawntime = 0;
                    }
        }
        if (spawnEnemy < 1.6 && spawnEnemy > 1.3 && tankCount<3 && Wave>1) { // ~.3% chance per frame
                    if (EnemySpawnCampaign('zuk')) {
                        spawntime = 0;
                    }
        }
        if (spawnEnemy <2 && spawnEnemy > 1.9 && showerCount<2 && Wave>2) { // ~1% chance per frame
                    if (EnemySpawnCampaign('shower')) {
                        spawntime = 0;
                    }
        }
        if (spawnEnemy < 2.1 && spawnEnemy > 2 && scoreBoostCount<1) { // ~1% chance per frame
                    if (EnemySpawnCampaign('score')) {
                        spawntime = 0;
                    }
        }
//proj
    }
    if (playerhp >= 80+level*20) {
        playerhp = 80+level*20
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
       if (!colliding[idx] && (enemy instanceof Charger || enemy instanceof RangedCharger || enemy instanceof Tank)) {
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
                sanity += 3;
                if (sanity > 100) {
                    sanity = 100;
                }
                enemy.el.remove();
                enemies.splice(idx, 1);
                healthCount = Math.max(healthCount - 1, 0);
                // Remove any existing message before creating a new one
                try { const existing = document.getElementById("HealthMessage"); if (existing) existing.remove(); } catch (e) {}
                newMessage = document.createElement("div");
                newMessage.id = "HealthMessage";
                newMessage.className = 'gameMessage';
                newMessage.innerHTML = "Picked up a healing Shaunulator";
                if (messagesContainer) messagesContainer.appendChild(newMessage);
                Hmessagetimer = 0;
                if (playerhp < 40) {
                    newMessage.innerHTML = "Picked up a healing Shaunulator that you really need!"
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
                newMessage = document.createElement("div");
                newMessage.id = "SBMessage";
                newMessage.className = 'gameMessage';
                newMessage.innerHTML = "You got the score boost!";
                SBmessagetimer = 0;
                if (messagesContainer) messagesContainer.appendChild(newMessage);
                

                setTimeout(() => {
                    try { const m = document.getElementById("SBMessage"); if (m) m.remove(); } catch (e) {}
                }, 1200);

                // Yellow overlay for duration
                startBoostOverlay(360 * (1000/60));

                

                
            }  else if (enemy instanceof Charger || enemy instanceof RangedCharger) {
                if (!invinc) {
                    playerhp -= Math.floor((enemy.damage + Math.floor(Math.random() * 5)) * (0.9 + Wave / 10) ** 2);
                    if (playerhp <= 0) {
                        playerhp = 0;
                        playSound(deathSound);
                    }
                    //console.log("Player HP:", playerhp);
                    invinc = true;
                    playSound(ouch);
                    // Flash red on damage
                    setFlash("rgba(255, 0, 0, 0.25)", 120);
                    setTimeout(() => {
                        invinc = false;
                    }, iFrames);
                }
            }
        }
        
    });


    try {
        if (x >= nextlevelsquare.x && x <= nextlevelsquare.x + 100 && y <= nextlevelsquare.y && y >= nextlevelsquare.y - 100 && RoomType == 0) {
            gameStarted = false;
            currCamplevel++;
            document.getElementById("nextLevel").remove();
            nextlevelsquare = null;
            x = 280;
            y = 280;
            direction = "n";
            attack = false;
            FirstAttack = false;
            invinc = false;
            enemies.forEach(enemy => enemy.el.remove());
            enemies = [];
            chargerCount = 0;
            healthCount = 0;
            enemyCount = 0;
            showerCount = 0;
            scoreBoostCount = 0;
            tankCount = 0;
            timerd = 0;
            transitioning = true;
            // Remove all obstacle DOM elements and clear obstacle list so rooms don't persist after death
            try {
                obstacles.forEach(o => { if (o && o.el) o.el.remove(); });
            } catch (e) { }
            obstacles = [];
            showMainMenu();
            startGameFromMenu();
        }
    } catch (e) {}

//death
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
   // console.log("X:", x, "Y:", y);
    document.getElementById("Score").innerText =  score;
    if (RoomType == 0) {
        document.getElementById("Score").innerText =  score+" / "+(Math.floor(level*2500*level/2));
    }
    document.getElementById("HP").innerText =  playerhp+" / "+(80+level*20);
    document.getElementById("wave").innerText =  Wave;
    if (RoomType == 0) {
        document.getElementById("wave").innerText =  level;
 
    }
    document.getElementById("sanity").innerText =  sanity+" %";
    // Level
    try {
        switch (CurrWeap) {
            case 0: document.getElementById("weapon").innerText = "M. Pencil"; break;
            case 1: document.getElementById("weapon").innerText = "Shauntgun"; break;
            case 2: document.getElementById("weapon").innerText = "Shauniper"; break;
            case 3: document.getElementById("weapon").innerText = "Asshaunt Rifle"; break;
        }
        //document.getElementById("weapon").innerText = CurrWeap == 1 ? "Shauntgun" : "Shauniper";
    } catch (e) {}
    // Dash recharge percent (0-100)
    try {
        const dashPct = Math.min(100, Math.floor((Math.min(dashtimer, 60) / 60) * 100));
        document.getElementById("dash").innerText = dashPct + " %";
    } catch (e) {}
    //damageEnemies

    if (!transitioning && score >= Math.floor(level*2500*level/2) && RoomType == 0) { 
                    level++; 
                    try { const existing = document.getElementById("SBMessage"); if (existing) existing.remove(); } catch (e) {}
                newMessage = document.createElement("div");
                newMessage.id = "SBMessage";
                newMessage.className = 'gameMessage';
                newMessage.innerHTML = "Level up! You are now level "+level;
                SBmessagetimer = 0;
                if (messagesContainer) messagesContainer.appendChild(newMessage);
                

                setTimeout(() => {
                    try { const m = document.getElementById("SBMessage"); if (m) m.remove(); } catch (e) {}
                }, 1200);
                   // alert("Level up! You are now level "+level); 
                    playerhp = 100+level*20; 
                  //  for (let k in keysPressed) { keysPressed[k] = false; } 
    }

    try {
        const shanEl = document.getElementById("ShanImage");
        if (shanEl) {
            // choose sprite by sanity as before
            if (sanity <= 33) {
                shanEl.src = "ShanDisappointed.webp";
            } else if (sanity <= 66) {
                shanEl.src = "NormalShan.webp";
            } else {
                shanEl.src = "HappyShan.webp";
            }

            // compute tint intensity from HP (0 = no tint, 1 = full tint)
            const maxHp = 80 + level * 20;
            const hpRatio = Math.max(0, Math.min(1, playerhp / maxHp));
            const tint = Math.max(0, Math.min(1, 1 - hpRatio));

            // smooth transition and visual effect: sepia + saturation + hue shift + inset red glow
            shanEl.style.transition = "filter 150ms linear, box-shadow 150ms linear";
            shanEl.style.filter = `sepia(${tint}) saturate(${1 + tint * 3}) hue-rotate(-20deg) brightness(${1 - tint * 0.15})`;
            shanEl.style.boxShadow = `inset 0 0 ${10 + tint * 40}px rgba(255,0,0,${0.25 * tint})`;
        }
    } catch (e) {}
    //
    if (attack && FirstAttack) {
        FirstAttack = false;//level
        //Attacking
    if (CurrWeap == 1 && sanity >= Math.floor(difficulty/2)+1) {    
            sanity -= Math.floor(difficulty/2)+1;
                if (sanity < 0) {
                    sanity = 0;
                }
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
                       
                        const dmg = (900) * (1+(0.1*(level-1)));
                        const dealt = applyDamage(enemy, dmg);
                        showLastDamageAbovePlayer(dealt);
                        if (enemy.enemyHP <= 0) {
                            CampEnemyCount--;
                            handleEnemyDeath(enemy);
                            return false;
                        }
                    }
                }
                return true;
            });
            if (score >= Wave*2500 && RoomType != 0) { Wave++; }
            

            setTimeout(() => { el.remove(); }, 50);
        } else if (CurrWeap == 0) {
            // Melee AoE: create a temporary black circle (50px radius) below the player
            const radius = 80;
            const dia = radius * 2;
            const aoe = document.createElement('div');
            aoe.style.position = 'absolute';
            aoe.style.width = dia + 'px';
            aoe.style.height = dia + 'px';
            aoe.style.borderRadius = '50%';
            // place slightly below player center so it appears under feet
            const centerX = x;
            const centerY = y;
            aoe.style.left = `${centerX}px`;
            aoe.style.top = `${centerY}px`;
            aoe.style.transform = 'translate(-50%, -50%)';
            //aoe.style.background = 'transparent';
            aoe.style.background = 'transparent';
            aoe.style.opacity = '0.95';
            aoe.style.zIndex = 9998;
            gameArea.appendChild(aoe);
            MCSwoosh.play();
            // Remove any enemies whose centers lie within radius and are not blocked by obstacles
            let killed = false;
            enemies = enemies.filter((enemy) => {
                const enemyCenterX = enemy.x + (enemy.width ? enemy.width/2 : 0);
                const enemyCenterY = enemy.y + (enemy.height ? enemy.height/2 : 0);
                const dist = Math.hypot(enemyCenterX - centerX, enemyCenterY - centerY);
                const enemyHalf = enemy.width ? Math.max(enemy.width, enemy.height)/2 : 20;
                if (dist <= radius + enemyHalf) {
                    const blocked = lineBlockedByObstacles(centerX, centerY, enemyCenterX, enemyCenterY);
                    if (!blocked && !killed) {
                        // apply AoE damage
                        const dmg = (100 + (1500 * ((100 - sanity) / 100) * ((100 - sanity) / 100))) * (1+(0.1*(level-1)));
                        const dealt = applyDamage(enemy, dmg);
                        showLastDamageAbovePlayer(dealt);
                        // If enemy died, remove it and mark a kill (only one kill per AoE)
                        killed = true;
                        if (enemy.enemyHP <= 0) {
                            CampEnemyCount--;
                            handleEnemyDeath(enemy);
                            sanity = Math.min(100, sanity + 4);
                            return false;
                        } else {
                            // Enemy wounded but still alive — update hp display and keep it in the list
                            try {
                                if (enemy.hpText) enemy.hpText.innerText = Math.ceil(enemy.enemyHP);
                            } catch (e) {}
                            // don't set killed; allow further AoE hits to affect others
                            return true; // keep this enemy in the array
                        }
                    }
                }
                return true;
            });

            if (score >= Wave*2500 && RoomType != 0) { Wave++; }
            
            setTimeout(() => { aoe.remove(); }, 50);
        } else if (CurrWeap == 2 && sanity >= Math.floor(difficulty/2)+3) {
            sanity -= Math.floor(difficulty/2)+3;
            if (sanity < 0) {
                sanity = 0;
            }
            // Spawn a projectile 20x3 that flies until collision
            const projEl = document.createElement("div");
            projEl.style.position = "absolute";
            // make the projectile slightly bigger so background images are visible
            projEl.style.width = "28px";
            projEl.style.height = "8px";
            //projEl.style.background = "black";
            projEl.style.borderRadius = "2px";
            // Use an existing projectile-like asset; 'SnipProj.png' wasn't present in the repo
            // so use ShotgunShot.png as a visible fallback. If you add a small projectile
            // sprite, replace the URL here.
            projEl.style.backgroundImage = "url('SP.png')";
            // correctly set background sizing/position so the image is visible
            projEl.style.backgroundSize = "cover";
            projEl.style.backgroundRepeat = "no-repeat";
            projEl.style.backgroundPosition = "center";
            // fallback color if image fails to load
            /*projEl.style.backgroundColor = "black";
            projEl.style.boxShadow = "0 0 6px rgba(255,255,255,0.15)";*/
            playSound(CalcgunSound);
            // start slightly in front of player
             const dirVec = {x: ((mouseX - x)/Math.sqrt((mouseX - x)**2 + (mouseY - y)**2)), y: ((mouseY - y)/Math.sqrt((mouseX - x)**2 + (mouseY - y)**2))};
            const startX = x + dirVec.x * 35;
            const startY = y + dirVec.y * 35;
            projEl.style.left = `${startX}px`;
            projEl.style.top = `${startY}px`;
            projEl.style.transform = `rotate(${angleDeg+90}deg)`;
            gameArea.appendChild(projEl);
            Projweapon = CurrWeap;
            projectiles.push({ x: startX, y: startY, dx: dirVec.x, dy: dirVec.y, el: projEl });
        } else if (CurrWeap == 3 && sanity >= 1) {
            sanity -= 1;
            if (sanity < 0) {
                sanity = 0;
            }
            // Spawn a projectile 20x3 that flies until collision
            const projEl = document.createElement("div");
            projEl.style.position = "absolute";
            // make the projectile slightly bigger so background images are visible
            projEl.style.width = "24px";
            projEl.style.height = "4px";
            //projEl.style.background = "black";
            projEl.style.borderRadius = "2px";
            // Use an existing projectile-like asset; 'SnipProj.png' wasn't present in the repo
            // so use ShotgunShot.png as a visible fallback. If you add a small projectile
            // sprite, replace the URL here.
            projEl.style.background = "orange";
            // correctly set background sizing/position so the image is visible
            /*projEl.style.backgroundSize = "cover";
            projEl.style.backgroundRepeat = "no-repeat";
            projEl.style.backgroundPosition = "center";*/
            // fallback color if image fails to load
            /*projEl.style.backgroundColor = "black";
            projEl.style.boxShadow = "0 0 6px rgba(255,255,255,0.15)";*/
            playSound(RifleSound);
            //shaun
            // start slightly in front of player
           
            const spread = 8; //spread of weapon in degrees
            chance = (Math.random()-0.5) * (spread*2);
            let posx = mouseX - x;
            let posy = mouseY - y;
            let AngleShot =  angleDeg;
            let trueAngle = AngleShot+chance;
            let shotX = Math.cos((trueAngle-90)* Math.PI / 180);
            let shotY = Math.sin((trueAngle-90)* Math.PI / 180);
            const dirVec = {x: shotX, y: shotY};
            //console.log("gunx: "+AngleShot)
            const startX = x + dirVec.x * 35;
            const startY = y + dirVec.y * 35;
            projEl.style.left = `${startX}px`;
            projEl.style.top = `${startY}px`;
            projEl.style.transform = `rotate(${trueAngle-90}deg)`;
            gameArea.appendChild(projEl);
            projectiles.push({ x: startX, y: startY, dx: dirVec.x, dy: dirVec.y, el: projEl });
            Projweapon = CurrWeap;
        } else {
            attack = false; // cancel attack if not enough sanity
                try { const existing = document.getElementById("WeaponMessage"); if (existing) existing.remove(); } catch (e) {}
                newMessage = document.createElement("div");
                newMessage.id = "WeaponMessage";
                newMessage.className = 'gameMessage';
                newMessage.innerHTML = "Not enough sanity to attack! Press C to regain!";
                SBmessagetimer = 0;
                if (messagesContainer) messagesContainer.appendChild(newMessage);
            //SBMessage
        }
    }

    //dash
    // Arena
    if (projectiles.length > 0) {
        const areaWidth = 650;
        const areaHeight = 650;
        const calcDamage = (enemy) => {
            if (Projweapon == 2) {
    
                enemy.enemyHP -= Math.floor((700+(700 * 0.5)) * (1+(0.1*(level-1))));
            } else if (Projweapon == 3) {
                enemy.enemyHP -= Math.floor((300) * (1+(0.1*(level-1))));
            }
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
            //setTimeout
            // enemy collision
            const projRect = p.el.getBoundingClientRect();
            for (let i = 0; i < enemies.length; i++) {
                const enemy = enemies[i];
                if (!(enemy instanceof Charger || enemy instanceof RangedCharger || enemy instanceof Tank)) continue;
                const enemyRect = enemy.el.getBoundingClientRect();
                const overlap = !(projRect.right < enemyRect.left || projRect.left > enemyRect.right || projRect.bottom < enemyRect.top || projRect.top > enemyRect.bottom);
                if (overlap) {
                    const before = enemy.enemyHP;
                    calcDamage(enemy);
                    const dealt = Math.max(0, before - enemy.enemyHP);
                    showLastDamageAbovePlayer(dealt);
                    if (enemy.enemyHP <= 0) {
                        CampEnemyCount--;
                        handleEnemyDeath(enemy);
                        enemies.splice(i, 1);
                        if (score >= Wave*2500 && RoomType != 0) { Wave++; }
                        
                    }
                    p.el.remove();
                    return false; // remove projectile on hit
                }
            }
            return true; // keep flying
        });
    }
    
    enemies.forEach(enemy => {
        if (enemy instanceof Charger || enemy instanceof RangedCharger || enemy instanceof Tank) {
            enemy.hpText.innerText = Math.ceil(enemy.enemyHP);
        }
    });
}
try {
        switch (CurrWeap) {
            case 0: document.getElementById("shots").innerText = "N/A";
            break;
            case 1: document.getElementById("shots").innerText = (Math.floor(sanity/(Math.floor(difficulty/2)+1)))+"/"+(Math.floor(100/(Math.floor(difficulty/2)+1)));
            break;
            case 2: document.getElementById("shots").innerText = (Math.floor(sanity/(Math.floor(difficulty/2)+3)))+"/"+(Math.floor(100/(Math.floor(difficulty/2)+3)));
            break;
            case 3: document.getElementById("shots").innerText = sanity+"/100";
            break;
        }
} catch (e) {}

if (!transitioning && CampEnemyCount <= 0 && RoomType === 0 && !nextlevelsquare) {
    alert("Arena cleared. Proceed to the next area.");
    camplevel++;
    if (currCamplevel === 1) {
        NextLevelSquare(550, 80);
    }
}
//dash
//fps
//console.log("CampEnemyCount:", CampEnemyCount, "camplevel:", camplevel, "currCamplevel:", currCamplevel);



if (playerhp <= 0) {
    deathSound.volume = 1;
    // Reset everything
    playerhp = 100;
    activateTimerReset = false;
    setTimeout(() => {
        
        time = Math.floor(elapsed/60)
        
        level = 1;
        x = 280;
        y = 280;
        direction = "n";
            attack = false;
            FirstAttack = false;
            invinc = false;
            sanity = 50;
            sanityTimer = 0;
            camplevel = 0;
            currCamplevel = 0;
            CampEnemyCount = -1;
            
            nextlevelsquare = null;
            lastlevelsquare = null;
            
            
            
            for (let key in keysPressed) {
                keysPressed[key] = false;
            }
            // start
            enemies.forEach(enemy => enemy.el.remove());
            enemies = [];//timer
            chargerCount = 0;
            healthCount = 0;
            enemyCount = 0;
            showerCount = 0;
            scoreBoostCount = 0;
            tankCount = 0;
            timerd = 0;
            transitioning = false;
            framespassed = 0;
            //if (score)
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
    }, 100);
    } //level up
    
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
//Wave++
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
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

function showMainMenu() {
    document.getElementById("FPSCounter").innerHTML = "FPS: 0"
    const menu = document.getElementById("mainMenu");
    const diff = document.getElementById("difficultyMenu");
    const area = document.getElementById("gameArea");
    const hud = document.getElementById("playerHUD");
    if (menu) menu.style.display = "flex";
    if (diff) diff.style.display = "none";
    if (area) area.style.display = "none";
    if (hud) hud.style.display = "none";
    TheyDontStopComing.pause();
    TheyDontStopComing.currentTime = 0;
    ATMOC.pause();
    ATMOC.currentTime = 0;
    RITW.pause();
    RITW.currentTime = 0;
    RITW.pause();
    RITW.currentTime = 0;
    PILINGBODIES.pause();
    PILINGBODIES.currentTime = 0;
    backgroundMusic.play()
    backgroundMusic.loop = true;
}
//fpsc
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//loveday


class LevelSquare {
    constructor(x, y) {
        this.x = x;
        this. y = y;
    }
}

let nextlevelsquare = null;
let lastlevelsquare = null;

function NextLevelSquare(x, y) {
    const el = document.createElement('div');
    el.id = 'nextLevel';
    el.textContent = "Next";
    el.style.position = 'absolute';
    el.style.width = '100px';
    el.style.height = '100px';
    el.style.lineHeight = '100px';
    el.style.textAlign = 'center';
    el.style.fontWeight = 'bold';
    el.style.color = '#ffffff';
    el.style.background = 'rgba(0,0,0,0.7)';
    el.style.border = '2px solid #fff';
    el.style.borderRadius = '6px';
    el.style.transform = 'translate(-50%, -50%)';
    el.style.zIndex = '10000';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.userSelect = 'none';
    nextlevelsquare = new LevelSquare(x, y);
    
    // allow manual positioning by dragging
    gameArea.appendChild(el);
}


function LastLevelSquare(x, y) {
    const el = document.createElement('div');
    el.id = 'lastLevel';
    el.textContent = "Back";
    el.style.position = 'absolute';
    el.style.width = '100px';
    el.style.height = '100px';
    el.style.lineHeight = '100px';
    el.style.textAlign = 'center';
    el.style.fontWeight = 'bold';
    el.style.color = '#ffffff';
    el.style.background = 'rgba(0,0,0,0.7)';
    el.style.border = '2px solid #fff';
    el.style.borderRadius = '6px';
    el.style.transform = 'translate(-50%, -50%)';
    el.style.zIndex = '10000';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.userSelect = 'none';
    lastlevelsquare = new LevelSquare(x, y);

    // Append to the DOM
    gameArea.appendChild(el);
}
//startGame
//Loveday

async function startGameFromMenu() {
    document.getElementById("ScoreTitle").innerHTML = "Score";
    document.getElementById("WaveTitle").innerHTML = "Wave";
    //RoomType = 0;
    if (RoomType == 0 && camplevel == 1) {
        level = 1;
        console.log("Room Type:", RoomType);
        document.getElementById("ScoreTitle").innerHTML = "XP";
        document.getElementById("WaveTitle").innerHTML = "Level";

        // Play cutscenes sequentially
        startCutscene("ShanPFP.png", 3000, "Shanvanth: Must do calculus... ARGH", "LovedayBack.jpg");
        await sleep(3000);
        startCutscene("DomPFP.png", 2000, "Dominic: Shaun... shut it. ", "LovedayBack.jpg");
        await sleep(2000);
        startCutscene("ShanPFP.png", 1000, "Shanvanth: I'm not.. I... ", "LovedayBack.jpg");
        await sleep(1000);
        startCutscene("", 5000, "Shanvanth: This calculus... It's too easy... I must go back to the future!", "BlackScreen.jpg");
        await sleep(5000);
        startCutscene("", 2500, "Dominic: Uh... Shanvanth what are you doing??", "BlackScreen.jpg");
        await sleep(2500);
        startCutscene("", 3500, "Shanvanth: WHY ARE THERE... SO MANY OF YOU... MUST KILL THEM ALL... ", "BlackScreen.jpg");
        await sleep(3500);
        startCutscene("", 4500, "Dominic: Shaun..?", "BlackScreen.jpg");
        await sleep(4500);
        console.log("Level:",level);
        // Initialize the first room
        currCamplevel = 1;
        CampEnemyCount = 20; // Set the number of enemies for the first level
    } else if (RoomType === 0 && camplevel === 2) {
        console.log("Room Type:", RoomType);
        document.getElementById("ScoreTitle").innerHTML = "XP";
        document.getElementById("WaveTitle").innerHTML = "Level";
        console.log("Level:",level);
        // Play cutscenes sequentially
        startCutscene("ShanPFP.png", 3000, "Huhhhhh?", "LovedayBack.jpg");
        await sleep(3000);



        startCutscene("ShanPFP.png", 3000, "wdaddqd", "LovedayBack.jpg");
        await sleep(3000);
        // Additional logic for the next campaign level can go here
        CampEnemyCount = 10; // Example: Set the number of enemies for the next level
    }
    if (RoomType === 0) {
        switch (currCamplevel) {
            case 1: lovedayRoom();
            break;
            case 2: roboticsRoom();
            break;
            default: lovedayRoom();
        }

    }


    transitioning = false;
    showGameUI();

    timerd = 0;
    enemies.forEach(enemy => enemy.el.remove());
     enemies = [];

    if (gameStarted) return;
    gameStarted = true;
}

CampEnemyCount = 999999999999;
//level = 1;

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
    const m0 = document.getElementById("map0");
    const m1 = document.getElementById("map1");
    const m2 = document.getElementById("map2");
    const m3 = document.getElementById("map3");
    const m4 = document.getElementById("map4");
    if (helpBtn) helpBtn.addEventListener("click", () => {
        alert("Controls:\nWASD or Arrow Keys to move\nSpace to shoot\nShift to dash. You will hear a chime when cooldown is over\nP to pause.\n1, 2 to toggle weapons. 1 for the Shauntgun, 2 for the Shauniper, 3 for the Asshaunt Rifle.\nC for melee pencil to regain sanity\n\nSanity affects damage! Sanity is sacrificed every shot.\nSurvive as many waves as you can!");
    });//alert
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
        if (m0) m0.addEventListener("click", () => chooseMap(0));
        if (m1) m1.addEventListener("click", () => chooseMap(1));
        if (m2) m2.addEventListener("click", () => chooseMap(2));
        if (m3) m3.addEventListener("click", () => chooseMap(3));
        if (m4) m4.addEventListener("click", () => chooseMap(4));
        //startGameFromMenu();
    }

    function chooseMap(map) {
        RoomType = map;
        if (map == 1) {
            lovedayRoom();
        } else if (map == 2) {
            roboticsRoom();
        } else if (map == 3) {
            englishRoom();
        } else if (map == 4) {
            physicsRoom();
        }
        camplevel = 1;
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

    if (d1) d1.addEventListener("mouseenter", () => setDesc("A nice and easy baby puzzle. Enemies are slow and deal less damage. Enemies spawn less often. Are you new to this math stuff or something? Sanity regain sanity faster. Weapons cost less sanity to fire Score Multiplier: x0.25"));
    if (d2) d2.addEventListener("mouseenter", () => setDesc("A balanced practice exam. The enemies are normal speed and deal normal damage. Sanity is regained at a normal rate. Firing weapons takes a normal amount of sanity. Recommended for average players. Score Multiplier: x1"));
    if (d3) d3.addEventListener("mouseenter", () => setDesc("Tough test. Faster and more agile enemies, heavier damage. Mistakes are not recommended. Enemies spawn more often. Sanity is regained slower. Firing weapons takes a normal amount of sanity. Score Multiplier: x1.75"));
    if (d4) d4.addEventListener("mouseenter", () => setDesc("Unfair final. Brutal stats. You were warned. Sanity is never auto regained. Weapons cost more sanity. Enemies are lighting fast and deal insane damage. Enemies swarm you. Mistakes are not allowed. Only a master of calc can last even 20 seconds. Score Multiplier: x4"));
    const clearDesc = () => setDesc("");
    if (d1) d1.addEventListener("mouseleave", clearDesc);
    if (d2) d2.addEventListener("mouseleave", clearDesc);
    if (d3) d3.addEventListener("mouseleave", clearDesc);
    if (d4) d4.addEventListener("mouseleave", clearDesc);

    if (m0) m0.addEventListener("mouseenter", () => setMDesc("Description: The full expeirence of Shanvanth's Last Stand"));
    if (m1) m1.addEventListener("mouseenter", () => setMDesc("Difficulty: Easy. Description: Ah, Mr. Loveday's room, a nice open haven for Shanvanth. Now it has become a warzone. Where is Mr. Loveday?"));
    if (m2) m2.addEventListener("mouseenter", () => setMDesc("Difficulty: Hard. Description: A closed off room with chairs blocking the way. Shanvanth will get swarmed very quickly if he isn't efficient with his defence."));
    if (m3) m3.addEventListener("mouseenter", () => setMDesc("Difficulty: Medium. Description: A semi open room with desks and chairs all over. Shanvanth must face his lunch room's actual purpose."));
    if (m4) m4.addEventListener("mouseenter", () => setMDesc("Difficulty: Medium. Description: A semi open room with desks and chairs all over. Shanvanth must face his lunch room's actual purpose."));
    //const clearmapDesc = () => setMDesc("");
    const clearmapDesc = () => setMDesc("");
    if (m0) m0.addEventListener("mouseleave", clearmapDesc);
    if (m1) m1.addEventListener("mouseleave", clearmapDesc);
    if (m2) m2.addEventListener("mouseleave", clearmapDesc);
    if (m3) m3.addEventListener("mouseleave", clearmapDesc);
    if (m4) m4.addEventListener("mouseleave", clearmapDesc);
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
//cutsc