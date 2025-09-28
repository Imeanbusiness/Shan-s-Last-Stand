const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");
sanity = 50;
const ShotgunCooldown = 1100; // milliseconds
sanityTimer = 0;
puzzlecooldown = 5000;
healthCount = 0;
tankCount = 0;
spawntime = 0;
elapsed = 0;
shanstate = 2;
Filename = "ShansStand/"


const ouch = new Audio('Ouch.mp3'); // Replace with your sound file path
const ShotgunSound = new Audio('ShotgunSound.mp3');
const backgroundMusic = new Audio("shaunsshotgun.mp3");
const deathSound = new Audio("ShanDeath.mp3");
const domDeath = new Audio("DomDeath.mp3");


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
    alert("Welcome to the game! Use WASD or Arrow keys to move, Space to shoot, and C to answer a math question to regain sanity.\nSanity affects damage! Sanity is sacrificed every few seconds.\nSurvive as many waves as you can!");
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

const keysPressed = {};
let enemies = [];

// Track key press/release
document.addEventListener("keydown", e => {keysPressed[e.key.toLowerCase()] = true
   if (e.key === "Escape") {
        alert("Game Paused. Press OK to resume.");
        for (let key in keysPressed) {
            keysPressed[key] = false;
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
        for (let key in keysPressed) {
            keysPressed[key] = false;
        }
        setTimeout(() => { 
        MathQuest = false;
        }, puzzlecooldown);

    }
});

// Enemy class
class Charger {
  constructor(x, y, speed, enemyHP, damage, fileName, sound) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.enemyHP = enemyHP;
    this.fileName = fileName;
    this.damage =damage
    this.sound = sound;
    // Create the DOM element
    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.height = "60px";
    this.el.style.width = "60px";
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

// Game loop
let lastFrameTime = 0;
const fps = 60;
const frameDuration = 1000 / fps;

function update(timestamp) {
  try {
    if (!timestamp) timestamp = performance.now();
    const delta = timestamp - lastFrameTime;

    if (delta >= frameDuration) {
      lastFrameTime = timestamp - (delta % frameDuration);

      let dx = 0, dy = 0;

    
      sanityTimer++;
        if (sanityTimer >= 90) { // every 5 seconds at 60fps
            sanityTimer = 0;
            if (sanity > 0) {
                sanity -= 1;
            } else {
                sanity = 0;
            }
        }

    if (keysPressed[" "] && attack == false) {
        attack = true;
        console.log("attack!")
        FirstAttack = true;


        setTimeout(() => {
            attack = false;
        }, ShotgunCooldown);
    }

    


    if (keysPressed["w"] || keysPressed["arrowup"]) {
        if (y >= 50) {

            dy -= speed;
        } else {
            y = 50;
        }


    }

   






    if (keysPressed["s"] || keysPressed["arrowdown"]) {
        if (y <= 550) {

            dy += speed;
        } else {
            y = 550;
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
        if (x <= 550) {

            dx += speed;
        } else {
            x = 550;
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

    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
    player.src = "Player.png";
    player.style.transform = `translate(-50%, -50%) rotate(${directionAngles[direction]}deg)`;

    if (attack) {
        player.src = "PlayerAttacking.png";
        player.style.transform = `translate(-50%, -50%) rotate(${directionAngles[direction]}deg)`;
    }

    // --- Charger Spawning ---
    if (spawntime > 50) {
        if (Math.random()*100 < 1 && chargerCount<9) { // ~1% chance per frame
          let ex = Math.random() * 520 + 40; // inside game area
          let ey = Math.random() * 520 + 40;
          enemies.push(new Charger(ex, ey, 2, 400*(0.9+Wave/10)**2, 5, "Dom.png")); // speed = 2
          enemyCount++;
          chargerCount++;
          spawntime = 0;
        }
        if (Math.random()*100 <1.2 && Math.random()*100 > 1 && healthCount<2 && elapsed > 600) { // ~1% chance per frame
          let ex = Math.random() * 520 + 40; // inside game area
          let ey = Math.random() * 520 + 40;
          enemies.push(new HealPickup(ex, ey)); // speed = 2
          healthCount++;
          enemyCount++;
          spawntime = 0;
        }
        if (Math.random()*100 <1.6 && Math.random()*100 > 1.3 && chargerCount<92 && Wave>1) { // ~1% chance per frame
          let ex = Math.random() * 520 + 40; // inside game area
          let ey = Math.random() * 520 + 40;
          enemies.push(new Charger(ex, ey, 0.75, 800*(0.9+Wave/10)**2, 8, "Zuk.png")); // speed = 2
          chargerCount++;
          enemyCount++;
          spawntime = 0;
        }
        if (Math.random()*100 <2 && Math.random()*100 > 1.97 && chargerCount<2 && Wave>2) { // ~1% chance per frame
          let ex = Math.random() * 520 + 40; // inside game area
          let ey = Math.random() * 520 + 40;
          enemies.push(new Charger(ex, ey, 0.25, 4000*(0.9+Wave/10)**2, 20, "Shower.jpg")); // speed = 2
          chargerCount++;
          enemyCount++;
          spawntime = 0;
        }

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
          e1.x < e2.x + chargerSize &&
          e1.x + chargerSize > e2.x &&
          e1.y < e2.y + chargerSize &&
          e1.y + chargerSize > e2.y
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
            enemy.moveToward(x, y);
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
            } else if (enemy instanceof Charger) {
                if (!invinc) {
                    playerhp -= Math.floor((enemy.damage + Math.floor(Math.random() * 5)) * (0.9 + Wave / 10) ** 2);
                    if (playerhp < 0) {
                        playerhp = 0;
                        deathSound.play();
                    }
                    console.log("Player HP:", playerhp);
                    invinc = true;
                    ouch.play();
                    setTimeout(() => {
                        invinc = false;
                    }, 500);
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
    //damageEnemies

    if (attack && FirstAttack) {
        FirstAttack = false;
        const el = document.createElement("div");
        el.style.position = "absolute";

        el.style.transform = `translate(-50%, -50%) rotate(${directionAnglesShots[direction]+270}deg)`;
            el.style.left = `${x}px`;
            el.style.top = `${y}px`; 

        if (direction == "n") {
            el.style.left = `${x}px`;
            el.style.top = `${y-50}px`;

        }

        if (direction == "ne") {
            el.style.left = `${x+40}px`;
            el.style.top = `${y-50}px`;

        }

        if (direction == "e") {
            el.style.left = `${x+55}px`;
            el.style.top = `${y-7}px`;

        }

        if (direction == "se") {
            el.style.left = `${x+40}px`;
            el.style.top = `${y+50}px`;

        }

        if (direction == "s") {
            el.style.left = `${x}px`;
            el.style.top = `${y+55}px`;

        }

        if (direction == "sw") {
            el.style.left = `${x-50}px`;
            el.style.top = `${y+50}px`;

        }

        if (direction == "w") {
            el.style.left = `${x-55}px`;
            el.style.top = `${y-7}px`;

        }
        if (direction == "nw") {
            el.style.left = `${x-50}px`;
            el.style.top = `${y-50}px`;

        }

        el.style.height = "65px";
        el.style.width = "100px";
        el.id = "ShotgunShot";
        el.style.backgroundImage = "url('ShotgunShot.png')";
        el.style.backgroundSize = "cover";
        ShotgunSound.play();
        gameArea.appendChild(el);

        switch (direction) {
            case "n": el.style.left = `${x}px`; el.style.top = `${y-50}px`; break;
            case "ne": el.style.left = `${x+40}px`; el.style.top = `${y-50}px`; break;
            case "e": el.style.left = `${x+55}px`; el.style.top = `${y-7}px`; break;
            case "se": el.style.left = `${x+40}px`; el.style.top = `${y+50}px`; break;
            case "s": el.style.left = `${x}px`; el.style.top = `${y+55}px`; break;
            case "sw": el.style.left = `${x-50}px`; el.style.top = `${y+50}px`; break;
            case "w": el.style.left = `${x-55}px`; el.style.top = `${y-7}px`; break;
            case "nw": el.style.left = `${x-50}px`; el.style.top = `${y-50}px`; break;
        }

       

        // Check for collision with each enemy
        const shotRect = el.getBoundingClientRect();
        enemies = enemies.filter((enemy) => {
            const enemyRect = enemy.el.getBoundingClientRect();

            const overlap = !(shotRect.right < enemyRect.left ||
                            shotRect.left > enemyRect.right ||
                            shotRect.bottom < enemyRect.top ||
                            shotRect.top > enemyRect.bottom);

            if (overlap) {
                enemy.enemyHP -= (900*sanity/100)+ (score/100) * (sanity/100);
                if (enemy.enemyHP <= 0) {
                    enemy.el.remove();
                    chargerCount--;
                    score += 200;
                    domDeath.play();
                    return false; // remove enemy
                }
            }

            return true; // keep enemy
        });
        if (score >= Wave*2000) { 
            Wave++;
        }
        // Remove the shot after a short time
        setTimeout(() => {
            el.remove();
        }, 50);
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
        enemyCount = 0;

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
        alert("You Died! Game will reset. Your final score was: " + score+"\nYou survived for "+time+" seconds and reached wave "+Wave+".");
        alert("High Score: "+localStorage.getItem(Filename+"HS")+"\nLongest Time Survived: "+localStorage.getItem(Filename+"Time")+" seconds\nHighest Wave Reached: "+localStorage.getItem(Filename+"Wave"));
        score = 0;
        elapsed = 0;
        Wave =0;
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
