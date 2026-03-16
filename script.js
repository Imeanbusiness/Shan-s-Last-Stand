let fps = 60;
let frameDuration = 1000 / fps;

let trueLevel = 1;
let trueXP = 10;
let trueXPCap = 10;
let PlayerName = "Player";
let ProfilePicture = "1";


function StartTheGame() {
    document.getElementById("PlayerProfile").style.opacity = 0;
    document.getElementById("mainMenu").style.display = "flex";
    document.getElementById("PlayerProfile").style.display = "grid";
    for (let i = 0; i < 61; i++) {
        setTimeout(() => {
            document.getElementById("mainMenu").style.opacity = i/60;
            document.getElementById("PlayerProfile").style.opacity = i/60;
            document.getElementById("ClickToPlay").style.opacity = (60-i)/60;
            console.log((60-i)/60)
            if (i == 60) {
                document.getElementById("ClickToPlay").style.display = "none";
                viewportWidth = window.innerWidth;
                viewportHeight = window.innerHeight;
                WindowPixels = viewportHeight * viewportWidth;
                intendedWindowSize = 1920 * 1080;

                console.log("Viewport Size: " + viewportWidth + "x" + viewportHeight);
                console.log(Math.sqrt((WindowPixels / intendedWindowSize)));
                

                BodyZoom = Math.sqrt((WindowPixels / intendedWindowSize)) * 1.2;

                body.style.width = viewportWidth/BodyZoom + "px";
                body.style.height = viewportHeight/BodyZoom + "px";




                document.body.style.zoom = BodyZoom;
                document.body.backgroundSize = "cover";
            }
            
        }, 16*i)
        
    }
    
}

function setProfilePicture (pfpId) {
    switch (pfpId) {
        case "1": return "Assets/Images/Player.png";
        case "2": return "Assets/Images/Dom.png";
        case "3": return "Assets/Images/Zuk.png";
        case "4": return "Assets/Images/Cheng.png";
        case "5": return "Assets/Images/Mason.png";
    }
    return "Assets/Images/Player.png"
}

function GetPlayerTitle(level) {
    if (level >= 100) {
        return "THE CALC SLAYER"
    } else if (level >= 95) {
        return "CALC VETERAN"
    } else if (level >= 90) {
        return "CALC WARRIOR"
    } else if (level >= 85) {
        return "CALC WARRIOR"
    } else if (level >= 80) {
        return "CALC ROOKIE"
    } else if (level >= 75) {
        return "CALC NOOB"
    } else if (level >= 70) {
        return "PRECALC SLAYER"
    } else if (level >= 65) {
        return "PRECALC VETERAN"
    } else if (level >= 60) {
        return "PRECALC WARRIOR"
    } else if (level >= 55) {
        return "PRECALC SURVIVOR"
    } else if (level >= 50) {
        return "ALGEBRA MASTER"
    } else if (level >= 45) {
        return "ALGEBRA VETERAN"
    } else if (level >= 40) {
        return "ALGEBRA WARRIOR"
    } else if (level >= 35) {
        return "ALGEBRA SURVIVOR"
    } else if (level >= 30) {
        return "SLAYER"
    } else if (level >= 25) {
        return "VETERAN"
    } else if (level >= 20) {
        return "WARRIOR"
    } else if (level >= 15) {
        return "SURVIVOR"
    } else if (level >= 10) {
        return "EXPERIENCED NOOB"
    } else if (level >= 5) {
        return "BETTER NOOB"
    } else {
        return "NOOB"
    }


}

function convertBigNumber(num) {
    if (num >= 1e18) {
        return (num / 1e18).toFixed(1) + "Q";
    } else if (num >= 1e15) {
        return (num / 1e15).toFixed(1) + "q";
    } if (num >= 1e12) {
        return (num / 1e12).toFixed(1) + "T";
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + "B";
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + "M";
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + "K";
    } else {
        return num;
    }
    
}

function preloadImages(imagePaths) {
    const promises = imagePaths.map(path => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = path;
        });
    });
    return Promise.all(promises);
}

const imagePaths = [
    'Assets/Images/20251008_104436.jpg',
    'Assets/Images/ApocoByrne.png',
    'Assets/Images/AttackingRead.png',
    'Assets/Images/Background.webp',
    'Assets/Images/BlackScreen.jpg',
    'Assets/Images/BlackScreen.png',
    'Assets/Images/BurntTires.jpg',
    'Assets/Images/Byrne.jpg',
    'Assets/Images/Calc.png',
    'Assets/Images/Calc.webp',
    'Assets/Images/CalcBook.jpg',
    'Assets/Images/Chair.png',
    'Assets/Images/Cheng.jpg',
    'Assets/Images/Cheng.png',
    'Assets/Images/DarkWood.jpg',
    'Assets/Images/Dom.png',
    'Assets/Images/DomPFP.jpg',
    'Assets/Images/DomPFP.png',
    'Assets/Images/grayWood.jpg',
    'Assets/Images/HappyShan.webp',
    'Assets/Images/HudPicture.png',
    'Assets/Images/LovedayBack.jpg',
    'Assets/Images/LovedayClass.png',
    'Assets/Images/Macbook.jpg',
    'Assets/Images/Macbook.png',
    'Assets/Images/Mason.png',
    'Assets/Images/Matrix.png',
    'Assets/Images/MCPencil.png',
    'Assets/Images/MobileGameplay.jpg',
    'Assets/Images/MonitorLeft.png',
    'Assets/Images/MonitorRight.png',
    'Assets/Images/MoxonRoom.png',
    'Assets/Images/MRFONGROOM.png',
    'Assets/Images/NormalShan.webp',
    'Assets/Images/Oak.jpg',
    'Assets/Images/PencilShredder.png',
    'Assets/Images/PhysicsClass.png',
    'Assets/Images/Player.png',
    'Assets/Images/Player2.png',
    'Assets/Images/Player3.png',
    'Assets/Images/Player4.png',
    'Assets/Images/PlayerAttacking.png',
    'Assets/Images/PlayerAttacking2.png',
    'Assets/Images/PlayerAttacking3.png',
    'Assets/Images/PlayerAttacking4.png',
    'Assets/Images/PlayerAttackingMC.png',
    'Assets/Images/PlayerHUDBG.jpg',
    'Assets/Images/PlayerMC.png',
    'Assets/Images/Portal.webp',
    'Assets/Images/Projector.png',
    'Assets/Images/Robotikroom.png',
    'Assets/Images/ShanAssaultRifle.png',
    'Assets/Images/ShanDisappointed.webp',
    'Assets/Images/ShanPencil.png',
    'Assets/Images/ShanPlay.png',
    'Assets/Images/Shauniper.png',
    'Assets/Images/Shauntgun.png',
    'Assets/Images/ShotgunShot.png',
    'Assets/Images/ShotgunShot.webp',
    'Assets/Images/Shower.jpg',
    'Assets/Images/SP.png',
    'Assets/Images/Wheels.png',
    'Assets/Images/Zuk.png'
];

(function(){
    'use strict';
    
    
    //FPSCount
    //bodyzoom
    
    const player = document.getElementById("player");
    const gameArea = document.getElementById("gameArea");
    const FPSCounter = document.getElementById("FPSCounter");
    FPSCounter.style.display = "none";
    
    const isGameActive = () => {
        try {
            return gameArea && window.getComputedStyle(gameArea).display !== 'none';
        } catch (e) {
            return false;
        }
    };

    
    const messagesContainer = (() => {
        let m = document.getElementById('GameMessages');
        if (!m && gameArea) {
            m = document.createElement('div');
            m.id = 'GameMessages';
            
            m.style.pointerEvents = 'none';
            gameArea.appendChild(m);
        }
        return m;
    })();



    let mouseX = 0;
    let mouseY = 0;

    const body = document.body;

    
    const crosshair = document.createElement("div");
    
    
    crosshair.style.position = "absolute";
    crosshair.style.width = "10px";
    crosshair.style.height = "10px";
    crosshair.style.background = "transparent";
    crosshair.style.border = "2px solid red";
crosshair.style.borderRadius = "50%";
crosshair.style.left = "50%";
crosshair.style.top = "50%";
crosshair.style.transform = "translate(-50%, -50%)";
crosshair.style.pointerEvents = "none"; 
crosshair.style.display = "none";
crosshair.style.zIndex = "9999";

gameArea.appendChild(crosshair);



const Mobilecrosshair = document.createElement("div");
    
    
    Mobilecrosshair.id = "Mobilecrosshair";
    Mobilecrosshair.style.position = "absolute";
    Mobilecrosshair.style.width = "10px";
    Mobilecrosshair.style.height = "10px";
    Mobilecrosshair.style.background = "transparent";
    Mobilecrosshair.style.border = "2px solid red";
Mobilecrosshair.style.borderRadius = "50%";
Mobilecrosshair.style.left = "50%";
Mobilecrosshair.style.top = "50%";
Mobilecrosshair.style.transform = "translate(-50%, -50%)";
Mobilecrosshair.style.pointerEvents = "none"; 
Mobilecrosshair.style.display = "none";
Mobilecrosshair.style.zIndex = "9999";

gameArea.appendChild(Mobilecrosshair);


const pauseButton = document.getElementById("pauseButton");
const attackButton = document.getElementById("attackButton");





function useAttack() {
    if (attack == false && Atdelay <= 0) {
            attack = true;
           
            FirstAttack = true;
            attackingDelay = 0;
        }
}










attackButton.addEventListener("touchstart", function(e) {
    e.preventDefault();
    
    mouseHeld = true;
    useAttack();
}, { passive: false });

attackButton.addEventListener("touchend", function(e) {
    e.preventDefault();
    mouseHeld = false;
}, { passive: false });

attackButton.addEventListener("touchcancel", function(e) {
    e.preventDefault();
    mouseHeld = false;
}, { passive: false });


pauseButton.addEventListener("click", () => {
    if (isGameActive() && gameStarted) {
        pauseGame();

    }
});

const pencilButton = document.getElementById("pencilButton");

pencilButton.addEventListener("touchstart", function(e) {
    e.preventDefault();
    CurrWeap = 0;

}, { passive: false });

const dashButton = document.getElementById("dashButton");

dashButton.addEventListener("touchstart", function(e) {
    e.preventDefault();
    if (dashtimer >= 60 && !dashing) {
        speed = 20;
        dashing = true;
        dashtimer = 0;
        dashCharge = false;
        invinc = true;
        setTimeout(() => { invinc = false; }, 200);
        lockdirection = movdirection;
    }

}, { passive: false });

const switchButton = document.getElementById("switchButton");

switchButton.addEventListener("touchstart", function(e) {
    e.preventDefault();
    CurrWeap++;
    if ( CurrWeap > 4) CurrWeap = 1;

}, { passive: false });
   




gameArea.addEventListener("click", () => {
    gameArea.requestPointerLock();
});


document.addEventListener("pointerlockchange", () => {
    if (document.pointerLockElement === gameArea) {
       
        crosshair.style.display = "block"; 
    } else {
        
        crosshair.style.display = "none"; 
    }
});


document.addEventListener("mousemove", (e) => {
    if (document.pointerLockElement === gameArea) {
        mouseX += e.movementX;
        mouseY += e.movementY;
        
        mouseX = Math.max(0, Math.min(gameArea.offsetWidth, mouseX));
        mouseY = Math.max(0, Math.min(gameArea.offsetHeight, mouseY));
    }
});

gameArea.addEventListener("mousemove", (e) => {
     if (!gameArea && !gameStarted) return;
     gameArea.requestPointerLock();
    try {
        const rect = gameArea.body.getBoundingClientRect();
        mouseX = e.clientX - rect.left; 
        mouseY = e.clientY - rect.top;  
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


    const ShotgunCooldown = 1100; 
    const CalcgunCooldown = 1500;
    const RiflegunCooldown = 67;
    const PencilShredderCooldown = 100;
    const MCCooldown = 300;
    const iFrames = 1000;
    const BaseSpeed = 5.5 * 60/fps;
    let Projweapon = "";
    
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
    let totalFrames = 0;
    let timerd = 0;
    let activateTimerReset = false;
    
    let dashing = false;
    let dashtimer = 45;
    let Hmessagetimer = 0;
    let SBmessagetimer = 0;
    let WeaponMessageTimer = 0;
    let MoveChance = 0;
    let MoveChanceTimer = 0;
    let FPSChecked = 0;
    
    let viewportWidth;
    let viewportHeight;
    let WindowPixels;
    let intendedWindowSize;

    let pausedGame = false;
    
    
    let BodyZoom;
    
    body.style.width = viewportWidth/BodyZoom + "px";
    body.style.height = viewportHeight/BodyZoom + "px";
    
    
    
    const joystick = document.getElementById("movementJoystick");
    const knob = document.getElementById("movementJoystickInner");
    const Aimingjoystick = document.getElementById("aimingJoystick");
    const AimingKnob = document.getElementById("aimingJoystickInner");

    let centerKnob;
    let centerAimingKnob;
    let maxRadius;
    let deadzone;

    let knobmarginX;
    let knobmarginY;
    let AimingknobmarginX;
    let AimingknobmarginY;


    let joystickAimingDeg = 0;
    let RoomType = 0;

    
    const ouch = new Audio('Assets/Music/Ouch.mp3'); 
    const ShotgunSound = new Audio('Assets/Music/ShotgunSound.mp3');
    const CalcgunSound = new Audio('Assets/Music/Pew.mp3');
    const backgroundMusic = new Audio("Assets/Music/TheLastStand.mp3");
    const masonDeath = new Audio("Assets/Music/MasonDeath.mp3");
    const deathSound = new Audio("Assets/Music/ShanDeath.mp3");
    const domDeath = new Audio("Assets/Music/DomDeath.mp3");
    const chengDeath = new Audio("Assets/Music/ChengDeath.mp3");
    const ZukDeath = new Audio("Assets/Music/ZukDeath.mp3");
    const dashCharged = new Audio("Assets/Music/DashCharge.mp3");
    const MCSwoosh = new Audio("Assets/Music/MCSwoosh.mp3");
    const TheyDontStopComing = new Audio("Assets/Music/TheyDontStopComing.mp3");
    const ATMOC = new Audio("Assets/Music/ATMOC.mp3");
    const SAD = new Audio("Assets/Music/SeekAndDestroy.mp3");
    const RITW = new Audio("Assets/Music/RITW.mp3");
    const ChugSFX = new Audio("Assets/Music/ChugSFX.mp3");
    const Vrm = new Audio("Assets/Music/Vrm.mp3");
    const PILINGBODIES = new Audio("Assets/Music/PilingBodies.mp3");
    const RifleSound = new Audio("Assets/Music/RifleSound.mp3");


    function playSound(sound) {
        
        if (browserType =="Safari" && device=="phone") {
            sound.play();
            return;
        }
        if (browserType =="Safari" && device=="tablet") {
            sound.play();
            return;
        }

        let SFXON = localStorage.getItem(Filename+"SFX");
        if (SFXON != "true") return;
        const newAudioInstance = sound.cloneNode(); 
        newAudioInstance.play();
    }

    
    let enemyProjectiles = [];



    let framespassed = 0;
    let framhechecking = false;
    

    
    let MathQuest = false;
    let Atdelay = 0;
    let Mult = 1;
    let Boost = false;
    let attackingDelay = 0;
    let BoostTime = 0;
    let attack = false;
    let FirstAttack = false;
    let spawnEnemy = 0;
    
    let number1 = 0, number2 = 0, number3 = 0, chance = 0, ans = null;
    let newMessage = null;
    let time = 0;
    let level = 1;




    var device = "null"
    const webname = "Imeanbusiness"
    const ua = navigator.userAgent
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    device = "phone"
    } else if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    device = "tablet"
    } else {
    device = "desktop"
    }

    console.log("Device Type: "+device)

    
    function getBrowserType() {
        const userAgent = navigator.userAgent;
        console.log("User Agent: " + userAgent);
        if (userAgent.includes("Edge")) {
            return "Microsoft Edge";
        } else if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
            
            return "Google Chrome";
        } else if (userAgent.includes("Firefox")) {
            return "Mozilla Firefox";
        } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
            
            return "Safari";
        } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
            return "Opera";
        } else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
            return "Internet Explorer";
        } else {
            return "Unknown Browser";
        }
    }
    

const browserType = getBrowserType();
//pause

function showDamage(x, y, damage) {
    const dmgEl = document.createElement("div");
    dmgEl.innerText = Math.floor(damage); 
    dmgEl.style.position = "absolute";
    dmgEl.style.left = `${x}px`;
    dmgEl.style.top = `${y}px`;
    dmgEl.style.color = "yellow";
    dmgEl.style.fontWeight = "bold";
    dmgEl.style.fontSize = "18px";
    dmgEl.style.textShadow = "1px 1px 2px black";
    dmgEl.style.pointerEvents = "none"; 
    gameArea.appendChild(dmgEl);

    
    let pos = 0;



    let floatUp = setInterval(() => {
        pos += 1;
        dmgEl.style.top = `${y - pos}px`;
        dmgEl.style.opacity = 1 - pos / 30;
        if (pos >= 30) {
            clearInterval(floatUp);
            dmgEl.remove();
        }
    }, 16); 
}

function MusicVolume(volume) {
    if (volume == 0 && browserType == "Safari") {
        backgroundMusic.muted = true;
        TheyDontStopComing.muted = true;
        ATMOC.muted = true;
        SAD.muted = true;
        RITW.muted = true;
        PILINGBODIES.muted = true;
        console.log("Muted the music for Safari!");
        return;
    } else if (volume == 1 && browserType == "Safari") {
        backgroundMusic.muted = false;
        TheyDontStopComing.muted = false;
        SAD.muted = false;
        ATMOC.muted = false;
        RITW.muted = false;
        PILINGBODIES.muted = false;
        return;
    }
    backgroundMusic.volume = volume;
    TheyDontStopComing.volume = volume;
    ATMOC.volume = volume;
    SAD.volume = volume;
    RITW.volume = volume;
    PILINGBODIES.volume = volume;
}

function SFXVolume(volume) {
    if (volume == 0 && browserType == "Safari") {
        ouch.muted = true;
        ShotgunSound.muted = true;
        Vrm.muted = true;
        ChugSFX.muted = true;
        CalcgunSound.muted = true;
        deathSound.muted = true;
        domDeath.muted = true;
        masonDeath.muted = true;
        chengDeath.muted = true;
        ZukDeath.muted = true;
        dashCharged.muted = true;
        MCSwoosh.muted = true;
        RifleSound.muted = true;
        return;
    } else if (volume == 1 && browserType == "Safari") {
        ouch.muted = false;
        ShotgunSound.muted = false;
        CalcgunSound.muted = false;
        Vrm.muted = false;
        ChugSFX.muted = false;
        deathSound.muted = false;
        domDeath.muted = false;
        masonDeath.muted = false;
        chengDeath.muted = false;
        ZukDeath.muted = false;
        dashCharged.muted = false;
        MCSwoosh.muted = false;
        RifleSound.muted = false;
        return;
    }
    ouch.volume = volume;
    ShotgunSound.volume = volume;
    CalcgunSound.volume = volume;
    deathSound.volume = volume;
    domDeath.volume = volume;
    masonDeath.volume = volume;
    chengDeath.volume = volume;
    ZukDeath.volume = volume;
    dashCharged.volume = volume;
    MCSwoosh.volume = volume;
    RifleSound.volume = volume;
}


window.onload = function() {

    if (!localStorage.getItem(Filename+"hasVisited3")) {
        localStorage.setItem(Filename+"hasVisited3", "true");
        localStorage.setItem(Filename+"XP", "0");
        localStorage.setItem(Filename+"Level", "1");
        localStorage.setItem(Filename+"PlayerName", "Player");
        localStorage.setItem(Filename+"ProfilePicture", "1");

    } else {
        trueXP = parseInt(localStorage.getItem(Filename+"XP"));
        trueLevel = parseInt(localStorage.getItem(Filename+"Level"));
        PlayerName = localStorage.getItem(Filename+"PlayerName");
        ProfilePicture = localStorage.getItem(Filename+"ProfilePicture");
    }


    trueXPCap = Math.floor(5000 * (1.1 ** (trueLevel-1)));
    
    document.getElementById("PlayerLevel").innerHTML =  trueLevel;
    document.getElementById("PlayerXP").innerHTML =  "XP: " + convertBigNumber(trueXP) +" / " + convertBigNumber(trueXPCap);
    document.getElementById("PlayerTitle").innerHTML = GetPlayerTitle(trueLevel);
    document.getElementById("PlayerName").innerHTML = PlayerName;


    if (!localStorage.getItem(Filename+"hasVisited2")) {
        localStorage.setItem(Filename+"hasVisited2", "true");
        localStorage.setItem(Filename+"FPSCap", "60")
    } else {
        fps = parseInt(localStorage.getItem(Filename+"FPSCap"));
        frameDuration = 1000 / fps;
        console.log(fps);
    }

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
    if (!localStorage.getItem(Filename+"hasVisited1")) {
        localStorage.setItem(Filename+"hasVisited1", "true");
        localStorage.setItem(Filename+"Music", "true");
        localStorage.setItem(Filename+"SFX", "true");
        localStorage.setItem(Filename+"SHS", "true");
    } else {
        let MusicON = localStorage.getItem(Filename+"Music");
        let SFXON = localStorage.getItem(Filename+"SFX");
        if (MusicON == "true") {
            MusicVolume(1);
        } else {
            MusicVolume(0);
        }

        if (SFXON == "true") {
            SFXVolume(1);
        } else {
            SFXVolume(0);
        }
        



    }


    

    
    
    if (browserType == "Safari" && device != "desktop") {
        alert("EW! You're on Safari! Gross! Some features of the game are BREAKING because of you! I want to stick it to Apple! Please tell them to fix their damn browser! Some features may not work as intended because of that damn company!");
    }
    
    document.addEventListener("wheel", function(e) {
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) { 
            e.preventDefault();
            
                
                    
                }
                console.log(CurrWeap)
                if (e.deltaY < 0) {
                    CurrWeap--;
                    if (CurrWeap < 0) {
                        CurrWeap = 0;
                    }
                } else if (e.deltaY > 0) {
        
        CurrWeap++;
        if (CurrWeap > 4) {
            CurrWeap = 4;
        }
    }
}, { passive: false }); 
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    WindowPixels = viewportHeight * viewportWidth;
    intendedWindowSize = 1920 * 1080;

    console.log("Viewport Size: " + viewportWidth + "x" + viewportHeight);
    console.log(Math.sqrt((WindowPixels / intendedWindowSize)));
    

    BodyZoom = Math.sqrt((WindowPixels / intendedWindowSize)) * 1.2;

    body.style.width = viewportWidth/BodyZoom + "px";
    body.style.height = viewportHeight/BodyZoom + "px";




    document.body.style.zoom = BodyZoom;
    document.body.backgroundSize = "cover";

    // Preload images

    

    let activePointerId = null;

    maxRadius = Math.min(200*BodyZoom, 200*BodyZoom) / 2; 
    deadzone = 17*BodyZoom; 
    console.log(`Joystick maxRadius: ${maxRadius}px`);

    try {
        if (browserType == "Safari" && 'zoom' in document.body.style) {
            document.body.style.transform = '';
            document.body.style.zoom = zoom;
        } else {
            document.body.style.zoom = '';
            document.body.style.transformOrigin = '0 0';
            document.body.style.transform = `scale(${zoom})`;
        }
    } catch (e) {
        // silent fallback
        try { document.body.style.zoom = zoom; } catch (err) {}
    }
    

    function getKnobRelativePosition() {
        knob.getBoundingClientRect();
        const rect = knob.getBoundingClientRect();
        let x = rect.left
        let y = rect.top
        if (browserType == "Safari") {
            x *= BodyZoom;
            y *= BodyZoom;
        }
        return { x, y };
    }
    
    let holdingKnob = false;
    
    knobmarginX = -40 * BodyZoom;
    knobmarginY = -40 * BodyZoom;
    if (browserType == "Safari") {
        
        
    }
    
    
    let JoystickAngle = 0;
    
    centerKnob = getKnobRelativePosition();
    

    function knobPosition(x, y) {
        knob.style.top = y+50+"%"
        knob.style.left = x+50+"%"
    }
    
    function resetKnob() {
        knobPosition(0, 0);
    }
    
    joystick.addEventListener("touchstart", (ev) => {
        ev.preventDefault();
        holdingKnob = true;
    }, { passive: false });
    
    joystick.addEventListener("pointerdown", (ev) => {

        ev.preventDefault();
        holdingKnob = true;
        let dx = ev.clientX-centerKnob.x+knobmarginX;
        let dy = ev.clientY-centerKnob.y+knobmarginY;
        activePointerId = ev.pointerId;
        
        if (dx > maxRadius) dx = maxRadius;
        if (dx < -maxRadius) dx = -maxRadius;
        if (dy > maxRadius) dy = maxRadius;
        if (dy < -maxRadius) dy = -maxRadius;
        knobPosition(((dx/maxRadius)*100/2), ((dy/maxRadius)*100/2));
        let totalMove = Math.sqrt(dx**2 + dy**2);
        if (totalMove < deadzone) {
        } else {
            JoystickAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            if (JoystickAngle < 0) JoystickAngle += 360;
            if (JoystickAngle > 360) JoystickAngle -= 360;
            if (JoystickAngle >= 337.5 || JoystickAngle < 22.5) {
                keysPressed["w"] = true;
            } else if (JoystickAngle >= 22.5 && JoystickAngle < 67.5) {
                keysPressed["w"] = true;
                keysPressed["d"] = true;
            } else if (JoystickAngle >= 67.5 && JoystickAngle < 112.5) {
                keysPressed["d"] = true;
            } else if (JoystickAngle >= 112.5 && JoystickAngle < 157.5) {
                keysPressed["s"] = true;
                keysPressed["d"] = true;
            } else if (JoystickAngle >= 157.5 && JoystickAngle < 202.5) {
                keysPressed["s"] = true;
            } else if (JoystickAngle >= 202.5 && JoystickAngle < 247.5) {
                keysPressed["s"] = true;
                keysPressed["a"] = true;
            } else if (JoystickAngle >= 247.5 && JoystickAngle < 292.5) {
                keysPressed["a"] = true;
            } else if (JoystickAngle >= 292.5 && JoystickAngle < 337.5) {
                keysPressed["w"] = true;
                keysPressed["a"] = true;
            }

        }
        
        
        
        
    }, { passive: false });
    
    joystick.addEventListener("pointerup", (ev) => {
        holdingKnob = true;
        ev.preventDefault();
        resetKnob();
        keysPressed["w"] = false;
        keysPressed["a"] = false;
        keysPressed["s"] = false;
        keysPressed["d"] = false;

    }, { passive: false });

    joystick.addEventListener("pointermove", (ev) => {
        
        if (activePointerId != ev.pointerId) return;
        if (!holdingKnob) return;
        keysPressed["w"] = false;
        keysPressed["a"] = false;
        keysPressed["s"] = false;
        keysPressed["d"] = false;

        ev.preventDefault();
        let dx = ev.clientX-centerKnob.x+knobmarginX;
        let dy = ev.clientY-centerKnob.y+knobmarginY;
        
        if (dx > maxRadius) dx = maxRadius;
        if (dx < -maxRadius) dx = -maxRadius;
        if (dy > maxRadius) dy = maxRadius;
        if (dy < -maxRadius) dy = -maxRadius;
        knobPosition(((dx/maxRadius)*100/2), ((dy/maxRadius)*100/2));
        let totalMove = Math.sqrt(dx**2 + dy**2);
        if (totalMove < deadzone) {
        } else {
            JoystickAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            if (JoystickAngle < 0) JoystickAngle += 360;
            if (JoystickAngle > 360) JoystickAngle -= 360;
            if (JoystickAngle >= 337.5 || JoystickAngle < 22.5) {
                keysPressed["w"] = true;
            } else if (JoystickAngle >= 22.5 && JoystickAngle < 67.5) {
                keysPressed["w"] = true;
                keysPressed["d"] = true;
            } else if (JoystickAngle >= 67.5 && JoystickAngle < 112.5) {
                keysPressed["d"] = true;
            } else if (JoystickAngle >= 112.5 && JoystickAngle < 157.5) {
                keysPressed["s"] = true;
                keysPressed["d"] = true;
            } else if (JoystickAngle >= 157.5 && JoystickAngle < 202.5) {
                keysPressed["s"] = true;
            } else if (JoystickAngle >= 202.5 && JoystickAngle < 247.5) {
                keysPressed["s"] = true;
                keysPressed["a"] = true;
            } else if (JoystickAngle >= 247.5 && JoystickAngle < 292.5) {
                keysPressed["a"] = true;
            } else if (JoystickAngle >= 292.5 && JoystickAngle < 337.5) {
                keysPressed["w"] = true;
                keysPressed["a"] = true;
            }

        }
    }, { passive: false });

    joystick.style.display = "none";
    
      







    document.getElementById("TrueLoadingText").innerHTML = "Loading Scaling...";

    

    

    let activePointerId2 = null;

    let AimingmaxRadius = Math.min(200*BodyZoom, 200*BodyZoom) / 2; 
    let Aimingdeadzone = 17*BodyZoom; 
    console.log(`Aiming Joystick maxRadius: ${maxRadius}px`);
    

    function getAimingKnobRelativePosition() {
        AimingKnob.getBoundingClientRect();
        const rect = AimingKnob.getBoundingClientRect();
        let x = rect.left
        let y = rect.top
        if (browserType == "Safari") {
            x *= BodyZoom;
            y *= BodyZoom;
        }
        return { x, y };
    }
    
    console.log("Initial knob position:", getAimingKnobRelativePosition());
    let holdingAimingKnob = false;
    
    AimingknobmarginX = -40 * BodyZoom;
    AimingknobmarginY = -40 * BodyZoom;

    

    centerAimingKnob = getAimingKnobRelativePosition();
    
    function AimingknobPosition(x, y) {
        AimingKnob.style.top = y+50+"%"
        AimingKnob.style.left = x+50+"%"
    }

    function resetAimingKnob() {
        AimingknobPosition(0, 0);
    }

    Aimingjoystick.addEventListener("touchstart", (ev) => {
        ev.preventDefault();
        holdingAimingKnob = true;
    }, { passive: false });

    
    Aimingjoystick.addEventListener("pointerdown", (ev) => {

        ev.preventDefault();
        holdingAimingKnob = true;
        
        let dx = ev.clientX-centerAimingKnob.x+AimingknobmarginX;
        let dy = ev.clientY-centerAimingKnob.y+AimingknobmarginY;
        activePointerId2 = ev.pointerId;
        
        if (dx > maxRadius) dx = maxRadius;
        if (dx < -maxRadius) dx = -maxRadius;
        if (dy > maxRadius) dy = maxRadius;
        if (dy < -maxRadius) dy = -maxRadius;
        AimingknobPosition(((dx/maxRadius)*100/2), ((dy/maxRadius)*100/2));
        let totalMove = Math.sqrt(dx**2 + dy**2);
        if (totalMove < deadzone) {
        } else {
            joystickAimingDeg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            if (joystickAimingDeg < 0) joystickAimingDeg += 360;
            if (joystickAimingDeg > 360) joystickAimingDeg -= 360;
        }
        
        
        
    }, { passive: false });

    Aimingjoystick.addEventListener("pointerup", (ev) => {
        ev.preventDefault();
        holdingAimingKnob = false;
        resetAimingKnob();

    }, { passive: false });

    Aimingjoystick.addEventListener("pointermove", (ev) => {
        
        if (activePointerId2 != ev.pointerId) return;
        if (!holdingAimingKnob) return;
       let dx = ev.clientX-centerAimingKnob.x+AimingknobmarginX;
        let dy = ev.clientY-centerAimingKnob.y+AimingknobmarginY;
        activePointerId2 = ev.pointerId;
        
        if (dx > maxRadius) dx = maxRadius;
        if (dx < -maxRadius) dx = -maxRadius;
        if (dy > maxRadius) dy = maxRadius;
        if (dy < -maxRadius) dy = -maxRadius;
        AimingknobPosition(((dx/maxRadius)*100/2), ((dy/maxRadius)*100/2));
        let totalMove = Math.sqrt(dx**2 + dy**2);
        if (totalMove < deadzone) {
        } else {
            joystickAimingDeg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            if (joystickAimingDeg < 0) joystickAimingDeg += 360;
            if (joystickAimingDeg > 360) joystickAimingDeg -= 360;
        }
    }, { passive: false });

    Aimingjoystick.style.display = "none";
    
    if (viewportHeight > viewportWidth && device == "phone") {
        dashButton.style.top = "10%";
        joystick.style.bottom = "2%";
        Aimingjoystick.style.bottom = "2%";
        pencilButton.style.top = "75%";
        switchButton.style.top = "75%";
        pencilButton.style.left = "26%";
        switchButton.style.right = "26%";
        attackButton.style.top = "8%";
    } else {
        dashButton.style.top = "20%";
        joystick.style.bottom = "5%";
        Aimingjoystick.style.bottom = "5%";
        pencilButton.style.top = "45%";
        switchButton.style.top = "45%";
        pencilButton.style.left = "10%";
        switchButton.style.right = "12%";
        attackButton.style.top = "13%";
    }

    if (device == "phone" && browserType == "Safari") {
        pauseButton.style.fontSize = "25px";
        attackButton.style.fontSize = "75px";
        dashButton.style.fontSize = "60px";
        pencilButton.style.fontSize = "40px";
        switchButton.style.fontSize = "50px";
        
         let BodyZoomZOOM = BodyZoom * 2;
        this.document.getElementById("HealthTitle").style.transform = "scale("+BodyZoom+")" 
        this.document.getElementById("WeaponTitle").style.transform = "scale("+BodyZoom+")" 
        this.document.getElementById("AmmoTitle").style.transform = "scale("+BodyZoom+")" 
        this.document.getElementById("SanityTitle").style.transform = "scale("+BodyZoom+")" 
        this.document.getElementById("WaveTitle").style.transform = "scale("+BodyZoom+")" 
        this.document.getElementById("ScoreTitle").style.transform = "scale("+BodyZoom+")" 
        this.document.getElementById("HP").style.transform = "scale("+BodyZoom+")" 
        this.document.getElementById("weapon").style.transform = "scale("+BodyZoom+")" 
        this.document.getElementById("shots").style.transform = "scale("+BodyZoom+")" 
        this.document.getElementById("sanity").style.transform = "scale("+BodyZoom+")" 
        this.document.getElementById("wave").style.transform = "scale("+BodyZoom+")" 
        this.document.getElementById("Score").style.transform = "scale("+BodyZoom+")" 
        
        

    }
    
    function loadInGame() {
        for (let i = 0; i < 61; i++) {
            setTimeout(() => {
                document.getElementById("LoadingDisplay").style.opacity = (60-i)/60;
                console.log((60-i)/60)
                if (i == 60) {
                    document.getElementById("LoadingDisplay").style.display = "none";
                    viewportWidth = window.innerWidth;
                    viewportHeight = window.innerHeight;
                    WindowPixels = viewportHeight * viewportWidth;
                    intendedWindowSize = 1920 * 1080;
    
                    console.log("Viewport Size: " + viewportWidth + "x" + viewportHeight);
                    console.log(Math.sqrt((WindowPixels / intendedWindowSize)));
                    
    
                    BodyZoom = Math.sqrt((WindowPixels / intendedWindowSize)) * 1.2;
    
                    body.style.width = viewportWidth/BodyZoom + "px";
                    body.style.height = viewportHeight/BodyZoom + "px";
    
    
    
    
                    document.body.style.zoom = BodyZoom;
                    document.body.backgroundSize = "cover";
                }
                
            }, 16*i)

    }
        
    }
    loadProfile();
    document.getElementById("TrueLoadingText").innerHTML = "Loading Assets...";
    preloadImages(imagePaths).then(() => {
        loadInGame();
    }).catch((error) => {
        console.error('Failed to preload images:', error);
        loadInGame();
    });


    





}

window.addEventListener("click", () => {
    backgroundMusic.play();
    backgroundMusic.loop = true;   
    
}, { once: true });


MathQuest = false;
let Wave = 1;
let invinc = false;
let score = 0;
let playerhp =  100;

let camplevel = 1;
let currCamplevel = 1;
let CampEnemyCount = -1;


let x = 280;
let y = 280;
let speed = 5.5 * 60/fps;
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


let projectiles = [];
const projectileSpeed = 20; 

const keysPressed = {};
let enemies = [];


function showOverlay(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.style.display = 'flex';
    gameStarted = false; // pause game loop
    
    // Clear any pressed keys
    for (let key in keysPressed) {
        keysPressed[key] = false;
    }
    try {
        const healthMsg = document.getElementById("HealthMessage");
        if (healthMsg) healthMsg.remove();

        const sbMsg = document.getElementById("SBMessage");
        if (sbMsg) sbMsg.remove();

        const wpMsg = document.getElementById("WeaponMessage");
        if (wpMsg) wpMsg.remove();
    } catch (e) {}
}

function hideOverlay(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.style.display = 'none';
    if (id !== 'deathMenu') { // Don't resume if dead
        gameStarted = true; // resume game loop
    }
}

function pauseGame() {
    if (isGameActive) {
        try {
            document.exitPointerLock();
        } catch (e) {
            console.log(e);
        }
        showOverlay('pauseMenu');
    }
}

//

document.addEventListener("keydown", e => {
    keysPressed[e.key.toLowerCase()] = true;
    
    if (e.key === "p" && isGameActive() && gameStarted) {
        pauseGame();
    }
    if (e.key === "Escape" && isGameActive() && gameStarted) {
        pauseGame();
    }

});
document.addEventListener("keyup", e => {
    keysPressed[e.key.toLowerCase()] = false
    
    
    if (e.key.toLowerCase()=="h") { 
        alert("Controls:\nWASD or Arrow Keys to move\nSpace to shoot\nShift to dash. You will hear a chime when cooldown is over\nP to pause.\nCalculus books are score boosters. Shaunulators heal you and give sanity.\n1, 2, 3, or scroll wheel to toggle weapons. 1 for the Shauntgun, 2 for the Shauniper, 3 for the Asshaunt Rifle.\nC for melee pencil to regain sanity. You gain sanity per kill.\n\nSanity affects damage! Sanity is sacrificed every shot.\nSurvive as many waves as you can!");
    
        for (let key in keysPressed) {
            keysPressed[key] = false;
        }
    }
});


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
    
    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.height = height+"px";
    this.el.style.width = width+"px";
    this.el.id = "enemy"+enemyCount;
    this.el.style.backgroundImage = "url('"+fileName+"')";
    this.el.style.backgroundSize = "cover";

    
    this.hpText = document.createElement("div");
    this.hpText.style.position = "absolute";
    this.hpText.style.top = "-15px"; 
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

        
        this.hpText.innerText = Math.ceil(this.enemyHP);

        
        let angleRad = Math.atan2(dy, dx); 
        let angleDeg = angleRad * (180 / Math.PI); 
        this.el.style.transform = `rotate(${angleDeg+90+180}deg)`;
        }
    }
}

class PinkyCharger {
  constructor(x, y, speed, enemyHP, damage, fileName, width, height) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.enemyHP = enemyHP;
    this.fileName = fileName;
    this.damage =damage
    this.width = width;
    this.height = height;

    this.baseSpeed = speed;

    this.framesPassed = 0;
    this.chargeInterval = (120 / (difficulty/3)) * (fps/60); 
    this.chargeTime = (70 / (difficulty/3)) * (fps/60);
    
    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.height = height+"px";
    this.el.style.width = width+"px";
    this.el.id = "enemy"+enemyCount;
    this.el.style.backgroundImage = "url('"+fileName+"')";
    this.el.style.backgroundSize = "cover";

    
    this.hpText = document.createElement("div");
    this.hpText.style.position = "absolute";
    this.hpText.style.top = "-15px"; 
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

        
        this.hpText.innerText = Math.ceil(this.enemyHP);

        
        let angleRad = Math.atan2(dy, dx); 
        let angleDeg = angleRad * (180 / Math.PI); 
        this.el.style.transform = `rotate(${angleDeg+90+180}deg)`;
        }
        this.framesPassed++;

        if (this.framesPassed>=this.chargeInterval && this.framesPassed<=this.chargeInterval+this.chargeTime) {
            if (this.speed != this.baseSpeed*4) {
                
                this.speed = this.baseSpeed*8;

            }

        } else if (this.framesPassed>this.chargeInterval+this.chargeTime) {
            this.framesPassed = 0;
        } else {
            this.speed = this.baseSpeed;
        }


    }
}


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
    this.fireCooldown = 0; 
    this.fireInterval = (90 / (difficulty/3)) * (fps/60); 
        
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
        
        const centerX = this.x + (this.width ? this.width / 2 : 0);
        const centerY = this.y + (this.height ? this.height / 2 : 0);
        const dx = targetX - centerX;
        const dy = targetY - centerY;
        const dist = Math.hypot(dx, dy);
        
        if (dist > 170 && this.fireCooldown <= (this.fireInterval - 15)) {
            
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
            this.el.style.left = `${this.x}px`;
            this.el.style.top = `${this.y}px`;
            
            let angleRad = Math.atan2(dy, dx);
            let angleDeg = angleRad * (180 / Math.PI);
            this.el.style.transform = `rotate(${angleDeg + 90 + 180}deg)`;
        } else {
            
            
            if (this.fireCooldown <= 0) {
                this.fireCooldown = this.fireInterval;
                this.fireAt(targetX, targetY);
                
                
            }
            
            
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
                
            } else if ((dist > 170)) {
                this.x += (dx / dist) * this.speed;
                this.y += (dy / dist) * this.speed;
                this.el.style.left = `${this.x}px`;
                this.el.style.top = `${this.y}px`;
                
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
                    
                    let angleRad = Math.atan2(dy, dx);
                    let angleDeg = angleRad * (180 / Math.PI);
    
                    if (angleDeg < 0) {
                        angleDeg = 360 - angleDeg
                    }
                }


                this.el.style.transform = `rotate(${angleDeg + 90 + 180}deg)`;
                if (this.x < 25) {
                    this.x = 25
                }
                if (this.x > 625) {
                    this.x = 625
                }
                if (this.y <25) {
                    this.y = 25
                }
                if (this.y > 625) {
                    this.y = 625
                }
            }

        }
        if (this.fireCooldown > 0) this.fireCooldown--;
        
        this.hpText.innerText = Math.ceil(this.enemyHP);
    }

    fireAt(targetX, targetY) {
        
        const proj = document.createElement('div');
        proj.style.position = 'absolute';
        proj.style.width = '15px';
        proj.style.height = '15px';
        
        
        proj.style.backgroundImage = 'url("Assets/Images/Wheels.png")';
        proj.style.backgroundSize = "cover";
        proj.style.backgroundRepeat = "no-repeat";
        proj.style.backgroundPosition = "center";
        
        const startX = this.x + (this.width ? this.width / 2 : 0);
        const startY = this.y + (this.height ? this.height / 2 : 0);
        proj.style.left = `${startX}px`;
        proj.style.top = `${startY}px`;
        gameArea.appendChild(proj);
        
        const dx = targetX - startX;
        const dy = targetY - startY;
        const dist = Math.hypot(dx, dy) || 1;
        const speed = (11*difficulty/3)*60/fps; 
        const vx = (dx / dist) * speed;
        const vy = (dy / dist) * speed;
        
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
    
    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.height = "80px";
    this.el.style.width = "80px";
    this.el.id = "enemy"+enemyCount;
    this.el.style.backgroundImage = "url('Assets/Images/Zuk.png')";
    this.el.style.backgroundSize = "cover";

    
    this.hpText = document.createElement("div");
    this.hpText.style.position = "absolute";
    this.hpText.style.top = "-15px"; 
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

        
        this.hpText.innerText = Math.ceil(this.enemyHP);

        
        let angleRad = Math.atan2(dy, dx); 
        let angleDeg = angleRad * (180 / Math.PI); 
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
    

    
    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.height = "45px";
    this.el.style.width = "45px";
    this.el.id = "enemy"+enemyCount;
    this.el.style.backgroundImage = "url('Assets/Images/Calc.png')";
    this.el.style.backgroundSize = "cover";
    gameArea.appendChild(this.el);
  }
}

class ScoreBoost {
    constructor(x, y) {
    this.x = x;
    this.y = y;
    

    
    this.el = document.createElement("div");
    this.el.style.position = "absolute";
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.height = "45px";
    this.el.style.width = "45px";
    this.el.id = "enemy"+enemyCount;
    this.el.style.backgroundImage = "url('Assets/Images/CalcBook.jpg')";
    this.el.style.backgroundSize = "cover";
    gameArea.appendChild(this.el);
  }
}


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
        totalFrames += Math.max((0, (framespassed-1)*frameCheckTime));
        FPSChecked += 1;
        document.getElementById("FPSCounter").innerHTML = "FPS: "+Math.max((0, (framespassed-1)*frameCheckTime))+"<br>Average FPS: "+(Math.round((totalFrames/(FPSChecked)) *10)/10);

        
        framespassed = 0;
    } else {
    }
    
}




let obstacles = [];

function createObstacleElement(x, y, width, height, color, backgroundimage) {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    
    if (backgroundimage != "") {
        el.style.backgroundImage = "url('"+backgroundimage+"')";
        el.style.backgroundSize = "cover";
        el.style.backgroundRepeat = "none";

    } else {

        el.style.background = color || "rgba(0,0,0,1)";
    }
    

    
    return el;
}


function addObstacle(x, y, width, height, options = {}) {
    const color = options.color || "rgba(0,0,0,1)";
    const backgroundimage = options.backgroundimage || "";
    const blocksProjectiles = options.blocksProjectiles !== false; 
    const el = createObstacleElement(x, y, width, height, color, backgroundimage);
    gameArea.appendChild(el);
    const obstacle = { x, y, width, height, el, blocksProjectiles };
    obstacles.push(obstacle);
    return obstacle;
}

function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
    return !(ax + aw <= bx || ax >= bx + bw || ay + ah <= by || ay >= by + bh);
}


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
        
        if (px < ox) {
            
            px -= overlapX;
        } else {
            
            px += overlapX;
        }
    } else {
        
        if (py < oy) {
            
            py -= overlapY;
        } else {
            
            py += overlapY;
        }
    }

    return { x: px, y: py };
}


function overlapsAnyObstacle(x, y, w, h) {
    for (let i = 0; i < obstacles.length; i++) {
        const o = obstacles[i];
        if (rectsOverlap(x, y, w, h, o.x, o.y, o.width, o.height)) return true;
    }
    return false;
}

function getValidSpawnRect(w, h, maxAttempts = 20) {
    
    const min = 40;
    const max = 610; 
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
        let sid = Math.random() * 100000000;
        let el = document.getElementById("LastDamage"+sid);
        if (!el) {
            el = document.createElement("div");
            el.id = "LastDamage" + sid;
            el.style.position = "absolute";
            el.style.color = "#ffd700";
            el.style.fontWeight = "bold";
            el.style.fontSize = "18px";
            el.style.textShadow = "1px 1px 2px black";
            el.style.pointerEvents = "none";
            gameArea.appendChild(el);
        }
        el.innerText = Math.floor(damage);
        el.style.left = `${x+20 - Math.random()* 40}px`;
        el.style.top = `${y - Math.random()* 80}px`;
        el.style.opacity = 1;
       //if (lastDamageTimeout) clearTimeout(lastDamageTimeout);
        lastDamageTimeout = setTimeout(() => {
            try { const n = document.getElementById("LastDamage"+sid); if (n) n.remove(); } catch (e) {}
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


let elem = document.documentElement;


function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { 
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { 
    elem.msRequestFullscreen();
  }
}




function startRoom(mapNumber, IGTimer) {
    fps = parseInt(localStorage.getItem(Filename+"FPSCap"));
        frameDuration = 1000 / fps;
        

        IGTimer *= 60/fps;
        console.log(speed);
    if (IGTimer == 0) {
        enemies.forEach(enemy => enemy.el.remove());
        enemies = [];
        document.getElementById("ScoreTitle").innerHTML = "Score";
        document.getElementById("WaveTitle").innerHTML = "Wave";
        
        switch (mapNumber) {
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
            case 5: moxonCenter();
                break;
        }
        startGameFromMenu();
        
    } else {

        if (mapNumber == 5 && IGTimer == 1) { //MoxonCenterFix
            x = 200;

        } 
        
        if (mapNumber == 0) {
            if (currCamplevel == 1) {
                if (CampEnemyCount <= 20 && CampEnemyCount >= 16) {

                    if (IGTimer == 150) {
                           
                                
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
        } 
    }

    
    if (enemyProjectiles.length > 0) {
        const areaWidth = 650;
        const areaHeight = 650;
        enemyProjectiles = enemyProjectiles.filter((p) => {
            p.x += p.dx;
            p.y += p.dy;
            p.el.style.left = `${p.x}px`;
            p.el.style.top = `${p.y}px`;
            
            if (p.x < 0 || p.x > areaWidth || p.y < 0 || p.y > areaHeight) {
                p.el.remove();
                return false;
            }
            
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
                    return false;
                }
            } catch (e) {}
            return true;
        });
    }

}


function startCutscene(image, durationMs, text, bg) {
    
    
    
    
    try {
        
        const slides = Array.isArray(image) ? image.slice() : [image];
        const texts = Array.isArray(text) ? text.slice() : slides.map(() => (text || ""));
        const delay = Math.max(200, Number(durationMs) || 2000);

        
        const existing = document.getElementById('cutsceneOverlay');
        if (existing) existing.remove();

        
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

        
        

        document.body.appendChild(overlay);

        let idx = 0;
        let removed = false;

        const showSlide = i => {
            if (removed) return;
            const img = slides[i];
            const t = texts[i] || "";
            
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

        
        const timers = [];
        const total = slides.length;
        for (let i = 0; i < total; i++) {
            const when = i * delay;
            timers.push(setTimeout(() => {
                showSlide(i);
            }, when));
        }
        
        timers.push(setTimeout(() => {
            try { overlay.remove(); } catch (e) {}
            removed = true;
        }, total * delay));

        
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









function handleEnemyDeath(enemy) {
    try { enemy.el.remove(); } catch (e) {}
    
    score += 250 * Mult;
    
    
    if (enemy.fileName == "Assets/Images/Zuk.png") {
        score += 250 * Mult;
        tankCount = Math.max(0, tankCount - 1);
        try { playSound(ZukDeath); } catch (e) {}
    } else if (enemy.fileName == "Assets/Images/Mason.png") {
        score += 375 * Mult;
        tankCount = Math.max(0, tankCount - 1);
        try { playSound(masonDeath); } catch (e) {}
    } else if (enemy.fileName == "Assets/Images/Shower.jpg") {
        score += 750 * Mult;
        showerCount = Math.max(0, showerCount - 1);
    } else if (enemy.fileName == "Assets/Images/Cheng.png") {
        score+= 125 * Mult;
        try { playSound(chengDeath); } catch (e) {}
        chargerCount = Math.max(0, chargerCount - 1);
    } else {
        try { playSound(domDeath); } catch (e) {}
        chargerCount = Math.max(0, chargerCount - 1);
    }

    
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


function EnemySpawnCampaign(type, enx = -1, eny = -1, delayMs = 900) {
    
    
    
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


    


    switch (t) {
        case 'dom':
            damage = 4 * difficulty / 2;
            enemyHP = Math.floor((600 * (0.9 + Wave/10) ** 2) * difficulty / 2);
            speed = Math.floor(3 * difficulty / 3);
            fileName = 'Assets/Images/Dom.png'; width = 40; height = 40; break;
        case 'mason':
            damage = 10 * difficulty / 2;
            enemyHP = Math.floor((1200 * (0.9 + Wave/10) ** 2) * difficulty / 2);
            speed = 0.6 * difficulty / 3;
            fileName = 'Assets/Images/Mason.png'; width = 52; height = 52; break;
        case 'ranged':
            damage = Math.floor(5 * difficulty / 2);
            enemyHP = Math.floor((500 * (0.9 + Wave/10) ** 2) * difficulty / 2);
            speed = 3.5 * difficulty / 3;
            fileName = 'Assets/Images/Cheng.png'; width = 40; height = 40; break;
        case 'zuk':
            damage = Math.floor(6 * difficulty / 2);
            enemyHP = Math.floor((1500 * (0.9 + Wave/10) ** 2) * difficulty / 2);
            speed = 0.75 * difficulty / 3;
            fileName = 'Assets/Images/Zuk.png'; width = 60; height = 60; break;
        case 'shower':
            damage = Math.floor(16 * difficulty / 2);
            enemyHP = Math.floor((4500 * (0.9 + Wave/10) ** 2) * difficulty / 2);
            speed = 0.2 * difficulty / 3;
            fileName = 'Assets/Images/Shower.jpg'; width = 70; height = 70; break;
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

    if (fps == 30) {
        speed*=2;
    }

    
    const portal = document.createElement('div');
    portal.style.position = 'absolute';
    portal.style.left = `${ex}px`;
    portal.style.top = `${ey}px`;
    portal.style.transform = 'translate(-50%, -50%)';
    const pSize = Math.max(40, Math.min(120, Math.max(width, height)));
    portal.style.width = `${pSize}px`;
    portal.style.height = `${pSize}px`;
    portal.style.borderRadius = '50%';
    portal.style.backgroundImage = "url('Assets/Images/Portal.webp')";
    portal.style.backgroundSize = 'cover';
    portal.style.opacity = '0';
    portal.style.transition = 'opacity 300ms ease-in-out';
    portal.style.pointerEvents = 'none';
    gameArea.appendChild(portal);

    
    setTimeout(() => { portal.style.opacity = '1'; }, 10);
    
    setTimeout(() => { portal.style.opacity = '0'; }, 10 + Math.max(0, delayMs / 2));
    setTimeout(() => {
        try { portal.remove(); } catch (e) {}
        
        if (fileName === 'HealPickup') {
            enemies.push(new HealPickup(ex, ey));
            healthCount++;
            enemyCount++;
        } else if (fileName === 'ScoreBoost') {
            enemies.push(new ScoreBoost(ex, ey));
            scoreBoostCount = Math.max(0, scoreBoostCount + 1);
            enemyCount++;
        } else {
            
            if (fileName === 'Assets/Images/Cheng.png') {
                enemies.push(new RangedCharger(ex, ey, speed, enemyHP, damage, 'Assets/Images/Cheng.png', width, height));
            } else if (fileName === 'Assets/Images/Mason.png') {
                enemies.push(new PinkyCharger(ex, ey, speed, enemyHP, damage, fileName, width, height));
            }
            else {
                enemies.push(new Charger(ex, ey, speed, enemyHP, damage, fileName, width, height));
            }
            
            if (fileName == 'Assets/Images/Zuk.png' || fileName == 'Assets/Images/Mason.png') {
                tankCount = Math.max(0, tankCount + 1);
            } else if (fileName == 'Assets/Images/Shower.jpg') {
                showerCount = Math.max(0, showerCount + 1);
            } else {
                chargerCount = Math.max(0, chargerCount + 1);
            }
            enemyCount++;
        }
    }, 10 + delayMs + 10);

    return true;
}






function lovedayRoom() {
    TheyDontStopComing.play();
    TheyDontStopComing.loop = true;
    gameArea.style.backgroundImage = "url('Assets/Images/LovedayClass.png')"
    addObstacle(0, 0, 40, 140, { backgroundimage: "Assets/Images/DarkWood.jpg" });   
    addObstacle(90, 100, 70, 40, { backgroundimage: "Assets/Images/DarkWood.jpg" });   
    addObstacle(160, 60, 40, 80, { backgroundimage: "Assets/Images/DarkWood.jpg" }); 
    addObstacle(500, 100, 150, 50, { color: "grey" });
    addObstacle(250, 200, 150, 350, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    
    for (let i = 0; i < 7; i++) {
        addObstacle(262.5, 210+45*i, 25, 20, { backgroundimage: "Assets/Images/MonitorRight.png" }); 
    }
    for (let i = 0; i < 7; i++) {
        addObstacle(362.5, 210+45*i, 25, 20, { backgroundimage: "Assets/Images/MonitorLeft.png" }); 
    }
    addObstacle(0, 215, 50, 370, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    for (let i = 0; i < 7; i++) {
        addObstacle(12.5, 230+45*i, 25, 20, { backgroundimage: "Assets/Images/MonitorRight.png" }); 
    }
    addObstacle(600, 215, 50, 370, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    for (let i = 0; i < 7; i++) {
        addObstacle(612.5, 230+45*i, 25, 20, { backgroundimage: "Assets/Images/MonitorLeft.png" }); 
    }
    addObstacle(320, 225, 10, 300, { color: "black" });

}

function roboticsRoom() { //roboticsRoom
    ATMOC.play();
    ATMOC.loop = true;
    gameArea.style.backgroundImage = "url('Assets/Images/Robotikroom.png')"
     addObstacle(0, 50, 50, 550, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    for (let i = 0; i < 9; i++) {
        addObstacle(12.5, 70+60*i, 25, 20, { backgroundimage: "Assets/Images/MonitorRight.png" }); 
    }
    addObstacle(600, 50, 50, 550, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    for (let i = 0; i < 9; i++) {
        addObstacle(612.5, 70+60*i, 25, 20, { backgroundimage: "Assets/Images/MonitorLeft.png" }); 
    }
    addObstacle(140, 100, 145, 60, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    addObstacle(375, 100, 145, 60, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    addObstacle(140, 270, 145, 60, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    addObstacle(375, 270, 145, 60, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    addObstacle(140, 440, 145, 60, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    addObstacle(375, 440, 145, 60, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    addObstacle(75-15, 450-15, 70, 70, { backgroundimage: "Assets/Images/Chair.png", blocksProjectiles: false });
    addObstacle(540-15, 280-15, 70, 70, { backgroundimage: "Assets/Images/Chair.png", blocksProjectiles: false });
    addObstacle(470, 135, 35, 20, { color: "#000000" }); 
    addObstacle(150, 600, 500, 50, { color: "#32527B" });
    
}

function moxonRoom() { //actually moxons 
    addObstacle(80, 0, 55, 120, { backgroundimage: "Assets/Images/DarkWood.jpg" }); 
    SAD.play();
    SAD.loop = true;
    gameArea.style.backgroundImage = "url('Assets/Images/MoxonRoom.png')"
    addObstacle(80, 240, 65, 65*2.5, { backgroundimage: "Assets/Images/grayWood.jpg" }); 
    addObstacle(80, 500, 490, 65, { backgroundimage: "Assets/Images/grayWood.jpg" }); 
    addObstacle(505, 240, 65, 65*4, { backgroundimage: "Assets/Images/grayWood.jpg" });
    addObstacle(215, 255, 65, 130, { backgroundimage: "Assets/Images/grayWood.jpg" });
    addObstacle(445, 60, 70, 70, { backgroundimage: "Assets/Images/Chair.png", blocksProjectiles: false });
    addObstacle(135, 110, 70, 70, { backgroundimage: "Assets/Images/Chair.png", blocksProjectiles: false });
    addObstacle(290, 250, 70, 60, { color: "black" });
    addObstacle(327, 260, 30, 22, { backgroundimage: "Assets/Images/Projector.png" });
    addObstacle(215, 340, 220, 65, { backgroundimage: "Assets/Images/grayWood.jpg" });
    addObstacle(650-215-65, 255, 65, 130, { backgroundimage: "Assets/Images/grayWood.jpg" });
}

function englishRoom() {
    RITW.play();
    RITW.loop = true;
    gameArea.style.backgroundImage = "url('Assets/Images/MRFONGROOM.png')"

    addObstacle(80, 210, 65, 330, { backgroundimage: "Assets/Images/grayWood.jpg" }); 
    

    addObstacle(490, 210, 65, 140, { backgroundimage: "Assets/Images/grayWood.jpg" }); 

    addObstacle(490, 455, 65, 80, { backgroundimage: "Assets/Images/grayWood.jpg" }); 

    addObstacle(215, 270, 200, 65, { backgroundimage: "Assets/Images/grayWood.jpg" }); 
    addObstacle(90, 260, 20, 25, { color: "#000000" }); 

    addObstacle(110, 430, 20, 25, { color: "#000000" }); 

    addObstacle(215, 470, 200, 65, { backgroundimage: "Assets/Images/grayWood.jpg" }); 
    addObstacle(290, 490, 25, 20, { color: "#000000" }); 
    addObstacle(415+12.5-10, 470+7.5-10, 70, 70, { backgroundimage: "Assets/Images/Chair.png", blocksProjectiles: false}); 
    addObstacle(500, 0, 70, 130, { color: "#947A54" }); 
    addObstacle(540, 60, 25, 32, { backgroundimage: "Assets/Images/Macbook.png" }); 
    addObstacle(497.5-20, 575, 120, 65, {  backgroundimage: "Assets/Images/PlayerHUDBG.jpg" }); 
    addObstacle(80, 0, 65, 65, { backgroundimage: "Assets/Images/grayWood.jpg" }); 
    

    
    
}

function physicsRoom() {
    PILINGBODIES.play();
    PILINGBODIES.loop = true;
    gameArea.style.backgroundImage = "url('Assets/Images/PhysicsClass.png')"

    addObstacle(175, 120, 300, 80, { color: "#6699cc" }); 
    addObstacle(550, 0, 100, 70, { color: "#55342b" }); 
    addObstacle(0, 290, 160, 65, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    addObstacle(245, 340, 160, 65, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    addObstacle(490, 290, 160, 65, { backgroundimage: "Assets/Images/Oak.jpg" });
    addObstacle(0, 290+170, 160, 65, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    addObstacle(245, 340+170, 160, 65, { backgroundimage: "Assets/Images/Oak.jpg" }); 
    addObstacle(490, 290+170, 160, 65, { backgroundimage: "Assets/Images/Oak.jpg" });  
    

    
    

    
    
}




let lastFrameTime = 0;

scoreBoostCount = 0;
attackingDelay = 0

function update(timestamp) {
  try {


    if (!gameStarted) {
            requestAnimationFrame(update);
            return; 
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











    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    WindowPixels = viewportHeight * viewportWidth;
    intendedWindowSize = 1920 * 1080;

    console.log("Viewport Size: " + viewportWidth + "x" + viewportHeight);
    console.log(Math.sqrt((WindowPixels / intendedWindowSize)));
    

    BodyZoom = Math.sqrt((WindowPixels / intendedWindowSize)) * 1.2;

    body.style.width = viewportWidth/BodyZoom + "px";
    body.style.height = viewportHeight/BodyZoom + "px";




    document.body.style.zoom = BodyZoom;
    document.body.backgroundSize = "cover";
    maxRadius = Math.min(200*BodyZoom, 200*BodyZoom) / 2; 
    deadzone = 17*BodyZoom; 

    knobmarginX = -40 * BodyZoom;
    knobmarginY = -40 * BodyZoom;
    
    AimingknobmarginX = -40 * BodyZoom;
    AimingknobmarginY = -40 * BodyZoom;

    function getKnobRelativePositionWithJoystick() {
        joystick.getBoundingClientRect();
        const rect = joystick.getBoundingClientRect();
        let x = rect.left - knobmarginX;
        let y = rect.top - knobmarginY;
        if (browserType == "Safari") {
            x *= BodyZoom;
            y *= BodyZoom;
        }
        return { x, y };
    }

    function getAimingKnobRelativePositionWithJoystick() {
        Aimingjoystick.getBoundingClientRect();
        const rect = Aimingjoystick.getBoundingClientRect();
        let x = rect.left - AimingknobmarginX;
        let y = rect.top - AimingknobmarginY;
        if (browserType == "Safari") {
            x *= BodyZoom;
            y *= BodyZoom;
        }
        return { x, y };
    }

    centerKnob = getKnobRelativePositionWithJoystick();
    centerAimingKnob = getAimingKnobRelativePositionWithJoystick();

    //centerKnob = joystick.getBoundingClientRect();
    console.log(centerAimingKnob)   ;
    if (viewportHeight > viewportWidth && device == "phone") {
        dashButton.style.top = "10%";
        joystick.style.bottom = "2%";
        Aimingjoystick.style.bottom = "2%";
        pencilButton.style.top = "75%";
        switchButton.style.top = "75%";
        pencilButton.style.left = "26%";
        switchButton.style.right = "26%";
        attackButton.style.top = "8%";
    } else {
        dashButton.style.top = "20%";
        joystick.style.bottom = "5%";
        Aimingjoystick.style.bottom = "5%";
        pencilButton.style.top = "45%";
        switchButton.style.top = "45%";
        pencilButton.style.left = "10%";
        switchButton.style.right = "12%";
        attackButton.style.top = "13%";
    }

    if (device == "phone" && browserType == "Safari") {
        pauseButton.style.fontSize = "25px";
        attackButton.style.fontSize = "75px";
        dashButton.style.fontSize = "60px";
        pencilButton.style.fontSize = "40px";
        switchButton.style.fontSize = "50px";
        
         let BodyZoomZOOM = BodyZoom * 1.6;
        document.getElementById("HealthTitle").style.fontSize = (17*BodyZoomZOOM)+"px"
        document.getElementById("WeaponTitle").style.fontSize = (17*BodyZoomZOOM)+"px"
        document.getElementById("AmmoTitle").style.fontSize = (17*BodyZoomZOOM)+"px"
        document.getElementById("SanityTitle").style.fontSize = (17*BodyZoomZOOM)+"px"
        document.getElementById("WaveTitle").style.fontSize = (17*BodyZoomZOOM)+"px"
        document.getElementById("ScoreTitle").style.fontSize = (17*BodyZoomZOOM)+"px"
        document.getElementById("HP").style.fontSize = (14*BodyZoomZOOM)+"px"
        document.getElementById("weapon").style.fontSize = (12*BodyZoomZOOM)+"px"
        document.getElementById("shots").style.fontSize = (14*BodyZoomZOOM)+"px"
        document.getElementById("sanity").style.fontSize = (14*BodyZoomZOOM)+"px"
        document.getElementById("wave").style.fontSize = (14*BodyZoomZOOM)+"px"
        document.getElementById("Score").style.fontSize = (14*BodyZoomZOOM)+"px"
        
        

    }

        if (Boost==true && BoostTime <= 360 * (fps/60)) {
            Mult = 2
            BoostTime++
        } else {
            Boost = false
            Mult = true;
        }


        if (CurrWeap == 0 && !attack) {
            player.src = "Assets/Images/PlayerMC.png"
        }
        if (CurrWeap == 1 && !attack) {
            player.src = "Assets/Images/Player.png"
        }
        if (CurrWeap == 2 && !attack) {
            player.src = "Assets/Images/Player2.png"
        }
        if (CurrWeap == 3 && !attack) {
            player.src = "Assets/Images/Player3.png"
        }
        if (CurrWeap == 4 && !attack) {
            player.src = "Assets/Images/Player4.png"
        }

        
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

        if (SBmessagetimer >= 60*(fps/60)) {
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
           
            MoveChanceTimer = 0;
        }
        
        if (keysPressed["1"] && CurrWeap != 1) {
            CurrWeap = 1;
            attack = false; 
            
            Atdelay = 15/(fps/60);
            attackingDelay = 20000;
            }
            
        if (keysPressed["2"] && CurrWeap != 2) {
            CurrWeap = 2;
            attack = false; 
            
            Atdelay = 5/(fps/60);
            attackingDelay = 20000;
            }

        if (keysPressed["3"] && CurrWeap != 3) {
            CurrWeap = 3;
            attack = false; 
            
            Atdelay = 30/(fps/60);
            attackingDelay = 20000;
            }

        if (keysPressed["4"] && CurrWeap != 4) {
            CurrWeap = 4;
            attack = false; 
            
            Atdelay = 15/(fps/60);
            attackingDelay = 20000;
            }

        if (keysPressed["c"] && CurrWeap != 0) {
            CurrWeap = 0;
            attack = false; 
            
            Atdelay = 15/(fps/60);
            attackingDelay = 20000;
            }
                
        Atdelay--
        attackingDelay++
        
        
        if (attack && attackingDelay >= MCCooldown/1000 * fps && CurrWeap == 0) {
            attack = false 
        }
        if (attack && attackingDelay >= ShotgunCooldown/1000 * fps && CurrWeap == 1) {
            attack = false 
        }
        if (attack && attackingDelay >= CalcgunCooldown/1000 * fps && CurrWeap == 2) {
            attack = false 
        }
        if (attack && attackingDelay >= RiflegunCooldown/1000 * fps && CurrWeap == 3) {
            attack = false 
        }
        if (attack && attackingDelay >= PencilShredderCooldown/1000 * fps && CurrWeap == 4) {
            attack = false 
        }


        if (keysPressed[" "] && attack == false && Atdelay <= 0) {
            attack = true;
           
            FirstAttack = true;
            attackingDelay = 0;
        }

        if (mouseHeld && !attack && Atdelay <= 0) {
                attack = true;
              
                FirstAttack = true;
                attackingDelay = 0;
        }


        


    dashtimer+=60/fps;
    framespassed++;
    FPSCount();

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
        if (fps == 30) {
            speed *= 2;
        }
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

    if (!dashing) {
        dx *= 60/fps
        dy *= 60/fps

    }


    if (dx !== 0 && dy !== 0) {
        dx /= Math.sqrt(2);
        dy /= Math.sqrt(2);
    }

    if (dx < 0) {
        if (dy < 0 ) {
            movdirection = "nw";
            
        } else if (dy > 0) {
            movdirection = "sw";
            
        } else {
            movdirection = "w";
           
        }
    } else if (dx > 0) {
        if (dy < 0 ) {
            movdirection = "ne";
           
        } else if (dy > 0) {
            movdirection = "se";
           
        } else {
            movdirection = "e";
           
        }
    } else {
        if (dy < 0) {
            movdirection = "n";
           
        } else if (dy > 0) {
            movdirection = "s";
           
        }
    }

    x += dx;
    y += dy;

    
    const angleRad = Math.atan2(mouseY - y, mouseX - x);
    let angleDeg = 0;
    if (angleRad * (180 / Math.PI)+90 < 0 ) {
        angleDeg = 360 + angleRad * (180 / Math.PI)+90;

    } else {
        angleDeg = angleRad * (180 / Math.PI)+90;
    }

    if (device == "phone" || device == "tablet") {
        angleDeg = joystickAimingDeg;
        let changeLeft = (x + (200 * Math.cos((angleDeg-90) * (Math.PI / 180))))
        if (changeLeft < 25) {
            changeLeft = 25
        }
        if (changeLeft > 625) {
            changeLeft = 625
        }
        let changeTop = (y + (200 * Math.sin((angleDeg-90) * (Math.PI / 180))))
        if (changeTop < 25) {
            changeTop = 25
        }
        if (changeTop > 625) {
            changeTop = 625
        }
        Mobilecrosshair.style.left = changeLeft + "px";
        Mobilecrosshair.style.top = changeTop + "px";
    }

    
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
            player.src = "Assets/Images/PlayerAttackingMC.png";
        } else if (CurrWeap == 1) {
            player.src = "Assets/Images/PlayerAttacking.png";
        } else if (CurrWeap == 2) {
            player.src = "Assets/Images/PlayerAttacking2.png";
        } else if (CurrWeap == 3) {
            player.src = "Assets/Images/PlayerAttacking3.png";
        } else if (CurrWeap == 4) {
            player.src = "Assets/Images/PlayerAttacking4.png";
        }
        player.style.transform = `translate(-50%, -50%) rotate(${angleDeg+180}deg)`;
    }
    
    if (obstacles.length > 0) {
        
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
    
    


    
    if (spawntime > 50/(60/fps) && RoomType != 0) {
        spawnEnemy = Math.random()*100*(2/difficulty)*(fps/60)
        if (spawnEnemy < 3 && spawnEnemy > 2.4 && chargerCount<7) { 
                    
                    if (EnemySpawnCampaign('ranged')) {
                        spawntime = 0;
                    }
        }
        if (spawnEnemy < 1 && chargerCount<7) { 
                    
                    if (EnemySpawnCampaign('dom')) {
                        spawntime = 0;
                    }
        }
        if (spawnEnemy <1.3 && spawnEnemy > 1 && healthCount<2 && elapsed > 600) { 
                    
                    if (EnemySpawnCampaign('heal')) {
                        spawntime = 0;
                    }
        }
        if (spawnEnemy < 1.6 && spawnEnemy > 1.3 && tankCount<3 && Wave>1) { 
                    if (EnemySpawnCampaign('zuk')) {
                        spawntime = 0;
                    }
        }
        if (spawnEnemy <2 && spawnEnemy > 1.9 && showerCount<2 && Wave>3) { 
                    if (EnemySpawnCampaign('shower')) {
                        spawntime = 0;
                    }
        }
        if (spawnEnemy < 2.1 && spawnEnemy > 2 && scoreBoostCount<1) { 
                    if (EnemySpawnCampaign('score')) {
                        spawntime = 0;
                    }
        }
        if (spawnEnemy > 3 && spawnEnemy < 3.25 && tankCount<3 && Wave>2) {
            if (EnemySpawnCampaign('mason')) {
                spawntime = 0;
            }
        }

    }
    if (playerhp >= 80+level*20) {
        playerhp = 80+level*20
    }
    elapsed++
    spawntime++

    
    

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
    
   enemies.forEach((enemy, idx) => {
       if (!colliding[idx] && (enemy instanceof Charger || enemy instanceof RangedCharger || enemy instanceof Tank || enemy instanceof PinkyCharger)) {
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
                playerhp = Math.min(playerhp + 5+Math.floor(10/(0.9+Wave/10)), 100); 
                sanity += 3;
                if (sanity > 100) {
                    sanity = 100;
                }
                enemy.el.remove();
                enemies.splice(idx, 1);
                healthCount = Math.max(healthCount - 1, 0);
                
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
                
                setFlash("rgba(128, 128, 128, 0.25)", 120);
            } else if (enemy instanceof ScoreBoost) {
                
                Boost = true;
                BoostTime = 0;
                enemy.el.remove();
                enemies.splice(idx, 1);
                scoreBoostCount = Math.max(scoreBoostCount - 1, 0);
                
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

                
                startBoostOverlay(360 * (1000/(fps*(60/fps))));

                

                
            }  else if (enemy instanceof Charger || enemy instanceof RangedCharger || enemy instanceof PinkyCharger) {
                if (!invinc) {
                    playerhp -= Math.floor((enemy.damage + Math.floor(Math.random() * 5)) * (0.9 + Wave / 10) ** 2);
                    if (playerhp <= 0) {
                        playerhp = 0;
                        playSound(deathSound);
                    }
                    
                    invinc = true;
                    playSound(ouch);
                    
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
            
            try {
                obstacles.forEach(o => { if (o && o.el) o.el.remove(); });
            } catch (e) { }
            obstacles = [];
            showMainMenu();
            startGameFromMenu();
        }
    } catch (e) {}


    
    
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
    
    try {
        switch (CurrWeap) {
            case 0: document.getElementById("weapon").innerText = "M. Pencil"; break;
            case 1: document.getElementById("weapon").innerText = "Shauntgun"; break;
            case 2: document.getElementById("weapon").innerText = "Shauniper"; break;
            case 3: document.getElementById("weapon").innerText = "Asshaunt Rifle"; break;
            case 4: document.getElementById("weapon").innerText = "Pencil Shredder"; break;
        }
        
    } catch (e) {}
    
    try {
        const dashPct = Math.min(100, Math.floor((Math.min(dashtimer, fps) / fps) * 100));
        document.getElementById("dash").innerText = dashPct + " %";
    } catch (e) {}
    

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
                   
                    playerhp = 100+level*20; 
                  
    }

    try {
        const shanEl = document.getElementById("ShanImage");
        if (shanEl) {
            
            if (sanity <= 33) {
                shanEl.src = "Assets/Images/ShanDisappointed.webp";
            } else if (sanity <= 66) {
                shanEl.src = "Assets/Images/NormalShan.webp";
            } else {
                shanEl.src = "Assets/Images/HappyShan.webp";
            }

            
            const maxHp = 80 + level * 20;
            const hpRatio = Math.max(0, Math.min(1, playerhp / maxHp));
            const tint = Math.max(0, Math.min(1, 1 - hpRatio));

            
            shanEl.style.transition = "filter 150ms linear, box-shadow 150ms linear";
            shanEl.style.filter = `sepia(${tint}) saturate(${1 + tint * 3}) hue-rotate(-20deg) brightness(${1 - tint * 0.15})`;
            shanEl.style.boxShadow = `inset 0 0 ${10 + tint * 40}px rgba(255,0,0,${0.25 * tint})`;
        }
    } catch (e) {}
    
    if (attack && FirstAttack) {
        FirstAttack = false;
        
    if (CurrWeap == 1 && sanity >= Math.floor(difficulty/2)+1) {    
            sanity -= Math.floor(difficulty/2)+1;
                if (sanity < 0) {
                    sanity = 0;
                }
                
                
                
                
                playSound(ShotgunSound);
                
                
                for (let i = 0; i < 10; i++) {
                    const projEl = document.createElement("div");
                    projEl.style.position = "absolute";
                    
                    projEl.style.width = "5px";
                    projEl.style.height = "5px";
                    
                    projEl.style.borderRadius = "3px";
                    
                    const shotgunVelocity = 45 + Math.random()*10;
                    
                    projEl.style.background = "	#686868";
                    const spread = 15; 
                    chance = (Math.random()-0.5) * (spread*2);
                    let posx = mouseX - x;
                    let posy = mouseY - y;
                    let AngleShot =  angleDeg;
                    let trueAngle = AngleShot+chance;
                    let shotX = Math.cos((trueAngle-90)* Math.PI / 180)  * 60/fps;
                    let shotY = Math.sin((trueAngle-90)* Math.PI / 180) * 60/fps;
                    const dirVec = {x: shotX, y: shotY};
                    
                    const startX = x + (dirVec.x * shotgunVelocity)/(60/fps);
                    const startY = y + (dirVec.y * shotgunVelocity)/(60/fps);
                    projEl.style.left = `${startX}px`;
                    projEl.style.top = `${startY}px`;
                    projEl.style.transform = `rotate(${trueAngle-90}deg)`;
                    gameArea.appendChild(projEl);
                    projectiles.push({ x: startX, y: startY, dx: dirVec.x, dy: dirVec.y, el: projEl });
                    Projweapon = CurrWeap;

                }
                const radius = 80;
            const dia = radius * 2;
            const aoe = document.createElement('div');
            aoe.style.position = 'absolute';
            aoe.style.width = dia + 'px';
            aoe.style.height = dia + 'px';
            aoe.style.borderRadius = '50%';
            
            const centerX = x;
            const centerY = y;
            aoe.style.left = `${centerX}px`;
            aoe.style.top = `${centerY}px`;
            aoe.style.transform = 'translate(-50%, -50%)';
            
            aoe.style.background = 'transparent';
            aoe.style.opacity = '0.95';
            aoe.style.zIndex = 9998;
            gameArea.appendChild(aoe);
            
            let killed = false;
            enemies = enemies.filter((enemy) => {
                const enemyCenterX = enemy.x + (enemy.width ? enemy.width/2 : 0);
                const enemyCenterY = enemy.y + (enemy.height ? enemy.height/2 : 0);
                const dist = Math.hypot(enemyCenterX - centerX, enemyCenterY - centerY);
                const enemyHalf = enemy.width ? Math.max(enemy.width, enemy.height)/2 : 20;
                if (dist <= radius + enemyHalf) {
                    const blocked = lineBlockedByObstacles(centerX, centerY, enemyCenterX, enemyCenterY);
                    if (!blocked && !killed) {
                        
                        const dmg = 1200 * (1+(0.1*(level-1)));
                        const dealt = applyDamage(enemy, dmg);
                        showLastDamageAbovePlayer(dealt);
                        
                        killed = true;
                        if (enemy.enemyHP <= 0) {
                            CampEnemyCount--;
                            handleEnemyDeath(enemy);
                            return false;
                        } else {
                            
                            try {
                                if (enemy.hpText) enemy.hpText.innerText = convertBigNumber(Math.ceil(enemy.enemyHP));
                            } catch (e) {}
                            
                            return true; 
                        }
                    }
                }
                return true;
            });
            setTimeout(() => { el.remove(); }, 50);
        } else if (CurrWeap == 0) {
            
            const radius = 80;
            const dia = radius * 2;
            const aoe = document.createElement('div');
            aoe.style.position = 'absolute';
            aoe.style.width = dia + 'px';
            aoe.style.height = dia + 'px';
            aoe.style.borderRadius = '50%';
            
            const centerX = x;
            const centerY = y;
            aoe.style.left = `${centerX}px`;
            aoe.style.top = `${centerY}px`;
            aoe.style.transform = 'translate(-50%, -50%)';
            
            aoe.style.background = 'transparent';
            aoe.style.opacity = '0.95';
            aoe.style.zIndex = 9998;
            gameArea.appendChild(aoe);
            MCSwoosh.play();
            
            let killed = false;
            enemies = enemies.filter((enemy) => {
                const enemyCenterX = enemy.x + (enemy.width ? enemy.width/2 : 0);
                const enemyCenterY = enemy.y + (enemy.height ? enemy.height/2 : 0);
                const dist = Math.hypot(enemyCenterX - centerX, enemyCenterY - centerY);
                const enemyHalf = enemy.width ? Math.max(enemy.width, enemy.height)/2 : 20;
                if (dist <= radius + enemyHalf) {
                    const blocked = lineBlockedByObstacles(centerX, centerY, enemyCenterX, enemyCenterY);
                    if (!blocked && !killed) {
                        
                        const dmg = (400 + (2000 * ((100 - sanity) / 100) * ((100 - sanity) / 100))) * (1+(0.1*(level-1)));
                        const dealt = applyDamage(enemy, dmg);
                        showLastDamageAbovePlayer(dealt);
                        
                        killed = true;
                        if (enemy.enemyHP <= 0) {
                            CampEnemyCount--;
                            handleEnemyDeath(enemy);
                            sanity = Math.min(100, sanity + 4);
                            return false;
                        } else {
                            
                            try {
                                if (enemy.hpText) enemy.hpText.innerText = convertBigNumber(Math.ceil(enemy.enemyHP));
                            } catch (e) {}
                            
                            return true; 
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
            
            const projEl = document.createElement("div");
            projEl.style.position = "absolute";
            
            projEl.style.width = "28px";
            projEl.style.height = "8px";
            
            projEl.style.borderRadius = "2px";
            
            
            
            projEl.style.backgroundImage = "url('Assets/Images/SP.png')"
            
            projEl.style.backgroundSize = "cover";
            projEl.style.backgroundRepeat = "no-repeat";
            projEl.style.backgroundPosition = "center";
            
            
            playSound(CalcgunSound);
            
             
            let AngleShot =  angleDeg;
            let trueAngle = AngleShot;
            let shotX = Math.cos((trueAngle-90)* Math.PI / 180) * 60/fps;
            let shotY = Math.sin((trueAngle-90)* Math.PI / 180) * 60/fps;
            const dirVec = {x: shotX, y: shotY};
            
            const startX = x + (dirVec.x * 35)/(60/fps);
            const startY = y + (dirVec.y * 35)/(60/fps);
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
            
            const projEl = document.createElement("div");
            projEl.style.position = "absolute";
            
            projEl.style.width = "24px";
            projEl.style.height = "4px";
            
            projEl.style.borderRadius = "2px";
            
            
            
            projEl.style.background = "orange";
            
            
            
            
            playSound(RifleSound);
            
            
           
            const spread = 8; 
            chance = (Math.random()-0.5) * (spread*2);
            let posx = mouseX - x;
            let posy = mouseY - y;
            let AngleShot =  angleDeg;
            let trueAngle = AngleShot+chance;
            let shotX = Math.cos((trueAngle-90)* Math.PI / 180)  * 60/fps;
            let shotY = Math.sin((trueAngle-90)* Math.PI / 180) * 60/fps;
            const dirVec = {x: shotX, y: shotY};
            
            const startX = x + (dirVec.x * 35)/(60/fps);
            const startY = y + (dirVec.y * 35)/(60/fps);
            projEl.style.left = `${startX}px`;
            projEl.style.top = `${startY}px`;
            projEl.style.transform = `rotate(${trueAngle-90}deg)`;
            gameArea.appendChild(projEl);
            projectiles.push({ x: startX, y: startY, dx: dirVec.x, dy: dirVec.y, el: projEl });
            Projweapon = CurrWeap;
        } else if (CurrWeap == 4 && sanity >= 2) {
                      sanity -= 2;
                if (sanity < 0) {
                    sanity = 0;
                }
                
                
                
                
                playSound(ChugSFX);
                playSound(Vrm);
                
                for (let i = 0; i < 15; i++) {
                    const projEl = document.createElement("div");
                    projEl.style.position = "absolute";
                    
                    projEl.style.width = "6px";
                    projEl.style.height = "6px";
                    
                    projEl.style.borderRadius = "3.2px";
                    
                    const shotgunVelocity = 35 + Math.random()*12;
                    
                    projEl.style.background = "#C99C73";
                    const spread = 18; 
                    chance = (Math.random()-0.5) * (spread*2);
                    let posx = mouseX - x;
                    let posy = mouseY - y;
                    let AngleShot =  angleDeg;
                    let trueAngle = AngleShot+chance;
                    let shotX = Math.cos((trueAngle-90)* Math.PI / 180)  * 60/fps;
                    let shotY = Math.sin((trueAngle-90)* Math.PI / 180) * 60/fps;
                    const dirVec = {x: shotX, y: shotY};
                    
                    const startX = x + (dirVec.x * shotgunVelocity)/(60/fps);
                    const startY = y + (dirVec.y * shotgunVelocity)/(60/fps);
                    projEl.style.left = `${startX}px`;
                    projEl.style.top = `${startY}px`;
                    projEl.style.transform = `rotate(${trueAngle-90}deg)`;
                    gameArea.appendChild(projEl);
                    projectiles.push({ x: startX, y: startY, dx: dirVec.x, dy: dirVec.y, el: projEl });
                    Projweapon = CurrWeap;

                }
                const radius = 50;
            const dia = radius * 2;
            const aoe = document.createElement('div');
            aoe.style.position = 'absolute';
            aoe.style.width = dia + 'px';
            aoe.style.height = dia + 'px';
            aoe.style.borderRadius = '50%';
            
            const centerX = x;
            const centerY = y;
            aoe.style.left = `${centerX}px`;
            aoe.style.top = `${centerY}px`;
            aoe.style.transform = 'translate(-50%, -50%)';
            
            aoe.style.background = 'transparent';
            aoe.style.opacity = '0.95';
            aoe.style.zIndex = 9998;
            gameArea.appendChild(aoe);
            
            let killed = false;
            enemies = enemies.filter((enemy) => {
                const enemyCenterX = enemy.x + (enemy.width ? enemy.width/2 : 0);
                const enemyCenterY = enemy.y + (enemy.height ? enemy.height/2 : 0);
                const dist = Math.hypot(enemyCenterX - centerX, enemyCenterY - centerY);
                const enemyHalf = enemy.width ? Math.max(enemy.width, enemy.height)/2 : 20;
                if (dist <= radius + enemyHalf) {
                    const blocked = lineBlockedByObstacles(centerX, centerY, enemyCenterX, enemyCenterY);
                    if (!blocked && !killed) {
                        
                        const dmg = 7500 * (1+(0.1*(level-1)));
                        const dealt = applyDamage(enemy, dmg);
                        showLastDamageAbovePlayer(dealt);
                        
                        killed = true;
                        if (enemy.enemyHP <= 0) {
                            CampEnemyCount--;
                            handleEnemyDeath(enemy);
                            return false;
                        } else {
                            
                            try {
                                if (enemy.hpText) enemy.hpText.innerText = convertBigNumber(Math.ceil(enemy.enemyHP));
                            } catch (e) {}
                            
                            return true; 
                        }
                    }
                }
                return true;
            });
            setTimeout(() => { el.remove(); }, 50);
        } else {
            attack = false; 
                try { const existing = document.getElementById("WeaponMessage"); if (existing) existing.remove(); } catch (e) {}
                newMessage = document.createElement("div");
                newMessage.id = "WeaponMessage";
                newMessage.className = 'gameMessage';
                newMessage.innerHTML = "Not enough sanity to attack! Press C to regain!";
                SBmessagetimer = 0;
                if (messagesContainer) messagesContainer.appendChild(newMessage);
            
        }
    }

    
    
    if (projectiles.length > 0) {
        const areaWidth = 650;
        const areaHeight = 650;
        const calcDamage = (enemy) => {
            if (Projweapon == 2) {
    
                enemy.enemyHP -= Math.floor(((1500)) * (1+(0.1*(level-1))));
            } else if (Projweapon == 3) {
                enemy.enemyHP -= Math.floor((350) * (1+(0.1*(level-1))));
            } else if (Projweapon == 4) {
                enemy.enemyHP -= Math.floor((50) * (1+(0.1*(level-1))));
            } else if (Projweapon == 1) {
                enemy.enemyHP -= Math.floor((120) * (1+(0.1*(level-1))));
            }
        };
        projectiles = projectiles.filter((p) => {
            p.x += p.dx * projectileSpeed;
            p.y += p.dy * projectileSpeed;
            p.el.style.left = `${p.x}px`;
            p.el.style.top = `${p.y}px`;
            
            if (p.x < 0 || p.x > areaWidth || p.y < 0 || p.y > areaHeight) {
                p.el.remove();
                return false;
            }
            
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
            
            
            const projRect = p.el.getBoundingClientRect();
            for (let i = 0; i < enemies.length; i++) {
                const enemy = enemies[i];
                if (!(enemy instanceof Charger || enemy instanceof RangedCharger || enemy instanceof Tank || enemy instanceof PinkyCharger)) continue;
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
                    return false; 
                }
            }
            return true; 
        });
    }
    
    enemies.forEach(enemy => {
        if (enemy instanceof Charger || enemy instanceof RangedCharger || enemy instanceof Tank || enemy instanceof PinkyCharger) {
            enemy.hpText.innerText = convertBigNumber(Math.ceil(enemy.enemyHP));
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
    showOverlay('arenaMenu');
    document.getElementById('nextAreaButton').onclick = () => {
        hideOverlay('arenaMenu');
        camplevel++;
        if (currCamplevel === 1) {
            NextLevelSquare(550, 80);
        }
    };
}






if (playerhp <= 0) {
    //pause
    gameStarted = false;
    document.exitPointerLock();
    deathSound.volume = 1;
    
    
    playerhp = 100;
    activateTimerReset = false;
    setTimeout(() => {
        
        time = Math.floor(elapsed/fps)
        totalFrames = 0;
        FPSChecked = 0;
        
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
            
            enemies.forEach(enemy => enemy.el.remove());
            enemies = [];
            chargerCount = 0;
            healthCount = 0;
            enemyCount = 0;
            showerCount = 0;
            scoreBoostCount = 0;
            tankCount = 0;
            timerd = 0;
            transitioning = false;
            framespassed = 0;
            
            
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
            document.getElementById("dmTitle").innerHTML = "YOU DIED.";
            // Update death stats
            document.getElementById('deathStats').innerHTML = 
                `Final Score: ${score}<br>` +
                `Survived: ${time} seconds<br>` +
                `Wave: ${Wave}`;
                try {
                    document.exitPointerLock();

                } catch (e) {

                }
            let SHS = localStorage.getItem(Filename+"SHS");
            if (SHS == "true") {
                document.getElementById('highScoreStats').innerHTML = 
                    `High Score: ${localStorage.getItem(Filename+"HS")}<br>` +
                    `Best Time: ${localStorage.getItem(Filename+"Time")} seconds<br>` +
                    `Highest Wave: ${localStorage.getItem(Filename+"Wave")}`;
            }

            trueXP += score;
            let leveledup = 0;
            while (true) {
                trueXPCap = Math.floor(5000 * (1.1 ** (trueLevel-1)));

                if (trueXP < trueXPCap) {
                    break;
                }
                trueXP -= trueXPCap;
                trueLevel++;
                leveledup++;
            }

            trueXPCap = Math.floor(5000 * (1.1 ** (trueLevel-1)))

            let xpText = "You earned " + convertBigNumber(score) + " XP. ";

            if (leveledup > 0) {
                xpText += "<br>You leveled up " + leveledup + " times.<br>You are now level " + trueLevel + ".";
            }

            localStorage.setItem(Filename+"XP", trueXP);
            localStorage.setItem(Filename+"XPCap", trueXPCap);
            localStorage.setItem(Filename+"Level", trueLevel);

            document.getElementById('XPStats').innerHTML = xpText;
            
            showOverlay('deathMenu');
            document.getElementById('restartButton').onclick = () => {
                hideOverlay('deathMenu');
                score = 0;
                elapsed = 0;
                Wave = 0;
                gameStarted = false;
                showMainMenu();
            };
    }, 1);
    } 
    
    if (sanity <= 33) {
        document.getElementById("ShanImage").src = "Assets/Images/ShanDisappointed.webp";
    }else if (sanity <= 66) {
        document.getElementById("ShanImage").src = "Assets/Images/NormalShan.webp";
    } else {
        document.getElementById("ShanImage").src = "Assets/Images/HappyShan.webp";
    }
    
    requestAnimationFrame(update);
} catch (err) {
    console.error('Game loop error:', err);
  }
  
}

requestAnimationFrame(update);

function loadProfile() {
    ProfilePicture = localStorage.getItem(Filename+"ProfilePicture");
    document.getElementById("PlayerLevel").innerHTML =  trueLevel;
    document.getElementById("PlayerXP").innerHTML =  "XP: " + convertBigNumber(trueXP) +" / " + convertBigNumber(trueXPCap);
    document.getElementById("PlayerTitle").innerHTML = GetPlayerTitle(trueLevel);
    document.getElementById("PlayerName").innerHTML = PlayerName;
    document.getElementById("profilePicture").src = setProfilePicture(ProfilePicture);
}

let gameStarted = false;
let difficultyLevel = 1; 
let difficulty = 1; 

function showGameUI() {
    document.getElementById("background-video").style.display = "none";
    const menu = document.getElementById("mainMenu");
    const diff = document.getElementById("difficultyMenu");
    const opt = document.getElementById("optionsMenu");
    const area = document.getElementById("gameArea");
    const hud = document.getElementById("playerHUD");
    const maps = document.getElementById("mapMenu");
    const fpsco = document.getElementById("FPSCounter");
    const pp = document.getElementById("PlayerProfile");
    if (fpsco) fpsco.style.display = "flex";
    if (menu) menu.style.display = "none";
    if (diff) diff.style.display = "none";
    if (maps) maps.style.display = "none";
    if (opt) opt.style.display = "none";
    if (area) area.style.display = "block";
    if (hud) hud.style.display = "grid";
    if (pp) pp.style.display = "none";
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    if (device == "phone" || device == "tablet") {
        document.getElementById("pauseButton").style.display = "flex";
        document.getElementById("attackButton").style.display = "flex";
        document.getElementById("movementJoystick").style.display = "flex";
        document.getElementById("aimingJoystick").style.display = "flex";
        document.getElementById("pencilButton").style.display = "flex";
        document.getElementById("dashButton").style.display = "flex";
        document.getElementById("switchButton").style.display = "flex";
        document.getElementById("Mobilecrosshair").style.display = "flex";
        
    
    }
        
    
}

function showMainMenu() {
    document.getElementById("background-video").style.display = "flex";
    if (device == "phone" || device == "tablet") {
        document.getElementById("pauseButton").style.display = "none";
        document.getElementById("attackButton").style.display = "none";
        document.getElementById("movementJoystick").style.display = "none";
        document.getElementById("aimingJoystick").style.display = "none";
        document.getElementById("pencilButton").style.display = "none";
        document.getElementById("dashButton").style.display = "none";
        document.getElementById("switchButton").style.display = "none";
        document.getElementById("Mobilecrosshair").style.display = "none";
    }
    document.getElementById("FPSCounter").innerHTML = "FPS: 0";
    const menu = document.getElementById("mainMenu");
    const diff = document.getElementById("difficultyMenu");
    const opt = document.getElementById("optionsMenu");
    const area = document.getElementById("gameArea");
    const hud = document.getElementById("playerHUD");
    const fpsco = document.getElementById("FPSCounter");
    const pp = document.getElementById("PlayerProfile");
    if (fpsco) fpsco.style.display = "none";
    if (menu) menu.style.display = "flex";
    if (diff) diff.style.display = "none";
    if (area) area.style.display = "none";
    if (opt) opt.style.display = "none";
    if (hud) hud.style.display = "none";
    if (pp) pp.style.display = "grid";
    TheyDontStopComing.pause();
    TheyDontStopComing.currentTime = 0;
    ATMOC.pause();
    ATMOC.currentTime = 0;
    RITW.pause();
    RITW.currentTime = 0;
    RITW.pause();
    RITW.currentTime = 0;
    SAD.pause();
    SAD.currentTime = 0;
    PILINGBODIES.pause();
    PILINGBODIES.currentTime = 0;
    backgroundMusic.play()
    backgroundMusic.loop = true;
    loadProfile();
}


let boostOverlayActive = false;
let boostOverlayTimeout = null;

function setFlash(color, durationMs = 150) {
    const el = document.getElementById("screenFlash");
    if (!el) return;
    el.style.display = "block";
    el.style.background = color;
    setTimeout(() => {
        
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

    
    gameArea.appendChild(el);
}



async function startGameFromMenu() {
    document.getElementById("ScoreTitle").innerHTML = "Score";
    document.getElementById("WaveTitle").innerHTML = "Wave";
    
    if (RoomType == 0 && camplevel == 1) {
        level = 1;
        console.log("Room Type:", RoomType);
        document.getElementById("ScoreTitle").innerHTML = "XP";
        document.getElementById("WaveTitle").innerHTML = "Level";

        
        startCutscene("Assets/Images/ShanPFP.png", 3000, "Shanvanth: Must do calculus... ARGH", "Assets/Images/LovedayBack.jpg");
        await sleep(3000);
        startCutscene("Assets/Images/DomPFP.png", 2000, "Dominic: Shaun... shut it. ", "Assets/Images/LovedayBack.jpg");
        await sleep(2000);
        startCutscene("Assets/Images/ShanPFP.png", 1000, "Shanvanth: I'm not.. I... ", "Assets/Images/LovedayBack.jpg");
        await sleep(1000);
        startCutscene("", 5000, "Shanvanth: This calculus... It's too easy... I must go back to the future!", "Assets/Images/BlackScreen.jpg");
        await sleep(5000);
        startCutscene("", 2500, "Dominic: Uh... Shanvanth what are you doing??", "Assets/Images/BlackScreen.jpg");
        await sleep(2500);
        startCutscene("", 3500, "Shanvanth: WHY ARE THERE... SO MANY OF YOU... MUST KILL THEM ALL... ", "Assets/Images/BlackScreen.jpg");
        await sleep(3500);
        startCutscene("", 4500, "Dominic: Shaun..?", "Assets/Images/BlackScreen.jpg");
        await sleep(4500);
        console.log("Level:",level);
        
        currCamplevel = 1;
        CampEnemyCount = 20; 
    } else if (RoomType === 0 && camplevel === 2) {
        console.log("Room Type:", RoomType);
        document.getElementById("ScoreTitle").innerHTML = "XP";
        document.getElementById("WaveTitle").innerHTML = "Level";
        console.log("Level:",level);
        
        startCutscene("Assets/Images/ShanPFP.png", 3000, "Huhhhhh?", "Assets/Images/LovedayBack.jpg");
        await sleep(3000);



        startCutscene("Assets/Images/ShanPFP.png", 3000, "wdaddqd", "Assets/Images/LovedayBack.jpg");
        await sleep(3000);
        
        CampEnemyCount = 10; 
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


document.addEventListener("DOMContentLoaded", () => {
    // Set up overlay menu handlers
    document.getElementById('resumeButton').onclick = () => {
        hideOverlay('pauseMenu');
        gameStarted = true;
    };
    
    document.getElementById('quitButton').onclick = () => {
        hideOverlay('pauseMenu');
        playerhp = -99999; // This will trigger the death sequence which resets everything
    };
    const playBtn = document.getElementById("playButton");
    const helpBtn = document.getElementById("helpButton");
    const scoresBtn = document.getElementById("highScoresButton");
    const optBtn = document.getElementById("optionsButton");
    const diffMenu = document.getElementById("difficultyMenu");
    const optMenu = document.getElementById("optionsMenu");
    const mainMenu = document.getElementById("mainMenu");
    const survivalMenu = document.getElementById("survivalMenu");
    const survivalBtn = document.getElementById("survivalButton");
    const backBtn = document.getElementById("backToMain");
    const backBtn2 = document.getElementById("backToMain2");
    const backBtn3 = document.getElementById("backToMain3");
    const backBtn4 = document.getElementById("backToMain4");
    const backBtn5 = document.getElementById("backToMain5");
    const d1 = document.getElementById("difficulty1");
    const d2 = document.getElementById("difficulty2");
    const d3 = document.getElementById("difficulty3");
    const d4 = document.getElementById("difficulty4");
    const diffDesc = document.getElementById("difficultyDesc");
    const mapDesc = document.getElementById("mapDesc");
    const survivalDesc = document.getElementById("survivalDesc");
    const optDesc = document.getElementById("optionsDesc");
    const mapmenu = document.getElementById("mapMenu");
    const pfpMenu = document.getElementById("pfpMenu");
    const m0 = document.getElementById("map0");
    const m1 = document.getElementById("map1");
    const m2 = document.getElementById("map2");
    const m3 = document.getElementById("map3");
    const m4 = document.getElementById("map4");
    const m5 = document.getElementById("map5");
    const o1 = document.getElementById("options1");
    const o2 = document.getElementById("options2");
    const o3 = document.getElementById("options3");
    const o4 = document.getElementById("options4");
    const o5 = document.getElementById("options5");
    const o6 = document.getElementById("options6");
    const p1 = document.getElementById("PFP1");
    const p2 = document.getElementById("PFP2");
    const p3 = document.getElementById("PFP3");
    const p4 = document.getElementById("PFP4");
    const p5 = document.getElementById("PFP5");
    let chosenMap = 0;
    if (helpBtn) helpBtn.addEventListener("click", () => {
           window.open("help.html", "_blank");

        
    });
    if (scoresBtn) scoresBtn.addEventListener("click", () => {
        document.getElementById("dmTitle").innerHTML = "STATS"
         let SHS = localStorage.getItem(Filename+"SHS");
         document.getElementById('deathStats').innerHTML = "";
         document.getElementById('XPStats').innerHTML = "";
            document.getElementById('highScoreStats').innerHTML = 
                `High Score: ${localStorage.getItem(Filename+"HS")}<br>` +
                `Best Time: ${localStorage.getItem(Filename+"Time")} seconds<br>` +
                `Highest Wave: ${localStorage.getItem(Filename+"Wave")}`;
        
        showOverlay('deathMenu');
        document.getElementById('restartButton').onclick = () => {
            hideOverlay('deathMenu');
            
        };
    });
    
    if (playBtn) playBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (mainMenu) mainMenu.style.display = "none";
        if (mapmenu) mapmenu.style.display = "flex";
        loadProfile();
    });

    if (survivalBtn) survivalBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (mapmenu) mapmenu.style.display = "none";
        if (survivalMenu) survivalMenu.style.display = "flex";
        loadProfile();
    });

    if (optBtn) optBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (mainMenu) mainMenu.style.display = "none";
        if (optMenu) optMenu.style.display = "flex";
        let MusicON = localStorage.getItem(Filename+"Music");
        let SFXON = localStorage.getItem(Filename+"SFX");
        let SHSON = localStorage.getItem(Filename+"SHS");
        if (MusicON == "true") {
            o1.innerHTML = "Music: ON";
        } else {
            o1.innerHTML = "Music: OFF";
        }

        if (SFXON == "true") {
            o2.innerHTML = "SFX: ON";
        } else {
            o2.innerHTML = "SFX: OFF";
        }

        if (SHSON == "true") {
            o3.innerHTML = "Show High Score: ON";
        } else {
            o3.innerHTML = "Show High Score: OFF";
        }

        if (localStorage.getItem(Filename+"FPSCap") == "30") {
            o4.innerHTML = "FPS Cap: 30";
            fps = 30;
            frameDuration = 1000 / fps;
        } else {
            o4.innerHTML = "FPS Cap: 60";
            fps = 60;
            frameDuration = 1000 / fps;
        }
    });

    if (backBtn) backBtn.addEventListener("click", () => {
     
            loadProfile();
            if (diffMenu) diffMenu.style.display = "none";
            if (mapmenu) mapmenu.style.display = "flex";

        
    });

     if (backBtn2) backBtn2.addEventListener("click", () => {
     
            loadProfile();
            if (mapmenu) mapmenu.style.display = "none";
            if (mainMenu) mainMenu.style.display = "flex";

        
    });


    if (backBtn3) backBtn3.addEventListener("click", () => {
     
            loadProfile();
            if (optMenu) optMenu.style.display = "none";
            if (mainMenu) mainMenu.style.display = "flex";

        
    });

    if (backBtn4) backBtn4.addEventListener("click", () => {
            loadProfile();
       
            if (pfpMenu) pfpMenu.style.display = "none";
            if (optMenu) optMenu.style.display = "flex";

        
    });

    if (backBtn5) backBtn5.addEventListener("click", () => {
            loadProfile();
       
            if (survivalMenu) survivalMenu.style.display = "none";
            if (mapmenu) mapmenu.style.display = "flex";

        
    });


    if (o1) o1.addEventListener("click", () => {
        let MusicON = localStorage.getItem(Filename+"Music");
        if (MusicON == "true") {
            localStorage.setItem(Filename+"Music", "false");
            MusicVolume(0);
            o1.innerHTML = "Music: OFF";
        } else {
            localStorage.setItem(Filename+"Music", "true");
            MusicVolume(1);
            o1.innerHTML = "Music: ON";
        }
        
    });
    if (o2) o2.addEventListener("click", () => {
        let SFXON = localStorage.getItem(Filename+"SFX");
        if (SFXON == "true") {
            localStorage.setItem(Filename+"SFX", "false");
            SFXVolume(0);
            o2.innerHTML = "SFX: OFF";
        } else {
            localStorage.setItem(Filename+"SFX", "true");
            SFXVolume(1);
            o2.innerHTML = "SFX: ON";
        }
    });

    if (o3) o3.addEventListener("click", () => {
        let SHSON = localStorage.getItem(Filename+"SHS");
        if (SHSON == "true") {
            localStorage.setItem(Filename+"SHS", "false");
            o3.innerHTML = "Show High Score: OFF";
        } else {
            localStorage.setItem(Filename+"SHS", "true");
            o3.innerHTML = "Show High Score: ON";
        }
        console.log("Show High Score set to:", localStorage.getItem(Filename+"SHS"));
    });

    if (o4) o4.addEventListener("click", () => {
        let SHSON = localStorage.getItem(Filename+"FPSCap");
        if (SHSON == "30") {
            localStorage.setItem(Filename+"FPSCap", "60");
            o4.innerHTML = "FPS Cap: 60";
        } else {
            localStorage.setItem(Filename+"FPSCap", "30");
            o4.innerHTML = "FPS Cap: 30";
        }
        console.log("Show High Score set to:", localStorage.getItem(Filename+"SHS"));
    });

    if (o5) o5.addEventListener("click", () => {
        const newName = prompt("Insert your new player name:");
        if (newName != PlayerName && newName != null && newName.trim() !== "") {
            localStorage.setItem(Filename+"PlayerName", newName);
            PlayerName = newName;
            document.getElementById("PlayerName").innerHTML = PlayerName;
        }
    });

    if (o6) o6.addEventListener("click", () => {
        if (optMenu) optMenu.style.display = "none";
        if (pfpMenu) pfpMenu.style.display = "flex";
    });
    
    difficulty = 0;
    function chooseDifficulty(level) {
        difficultyLevel = level;
        difficulty = level; 
        diffMenu.style.display = "none";
        mapmenu.style.display = "flex";
        chooseMap(chosenMap);
        
        
        
        
        
    }

    function MapChoice(map) {
        chosenMap = map;
        survivalMenu.style.display = "none";
        diffMenu.style.display = "flex";
    }
    
    if (m0) m0.addEventListener("click", () => {
        alert("Sorry, the campaign is still being worked on right now!")
    });
    if (m1) m1.addEventListener("click", () => MapChoice(1));
    if (m2) m2.addEventListener("click", () => MapChoice(2));
    if (m3) m3.addEventListener("click", () => MapChoice(3));
    if (m4) m4.addEventListener("click", () => MapChoice(4));
    if (m5) m5.addEventListener("click", () => MapChoice(5));

    function chooseMap(map) {
        RoomType = map;
        if (map == 0) {
            alert("Sorry, the campaign is still being worked on right now!")
            return;
        } else if (map == 1) {
            lovedayRoom();
        } else if (map == 2) {
            roboticsRoom();
        } else if (map == 3) {
            englishRoom();
        } else if (map == 4) {
            physicsRoom();
        } else if (map == 5) {
            moxonRoom();
        }
        camplevel = 1;
        startGameFromMenu();

    }

    if (p1) p1.addEventListener("click", () => {
        localStorage.setItem(Filename+"ProfilePicture", "1");
        document.getElementById("profilePicture").src = setProfilePicture("1");
    });

    if (p2) p2.addEventListener("click", () => {
        console.log("P2 clicked");
        localStorage.setItem(Filename+"ProfilePicture", "2");
        document.getElementById("profilePicture").src = setProfilePicture("2");
    });

    if (p3) p3.addEventListener("click", () => {
        localStorage.setItem(Filename+"ProfilePicture", "3");
        document.getElementById("profilePicture").src = setProfilePicture("3");
    });

    if (p4) p4.addEventListener("click", () => {
        localStorage.setItem(Filename+"ProfilePicture", "4");
        document.getElementById("profilePicture").src = setProfilePicture("4");
    });

    if (p5) p5.addEventListener("click", () => {
        localStorage.setItem(Filename+"ProfilePicture", "5");
        document.getElementById("profilePicture").src = setProfilePicture("5");
    });



    function reallyChooseThat() {
        console.log(device);
        if (device != "phone" && device != "tablet") {
            if (confirm("Are you sure you want to choose this difficulty? It's not even remotely fair!")) {
                chooseDifficulty(4);
            }

        } else {
            chooseDifficulty(4);
        }
    }
    if (d1) d1.addEventListener("click", () => chooseDifficulty(1));
    if (d2) d2.addEventListener("click", () => chooseDifficulty(2));
    if (d3) d3.addEventListener("click", () => chooseDifficulty(3));
    if (d4) d4.addEventListener("click", () => reallyChooseThat());

    function setDesc(msg) {
        if (!diffDesc) return;
        diffDesc.innerHTML = msg;
        diffDesc.style.display = msg ? "block" : "none";
    }

    function setMDesc(msg) {
        if (!mapDesc) return;
        mapDesc.innerHTML = msg;
        mapDesc.style.display = msg ? "block" : "none";
    }

     function setSDesc(msg) {
        if (!survivalDesc) return;
        survivalDesc.innerHTML = msg;
        survivalDesc.style.display = msg ? "block" : "none";
    }

    function setOptDesc(msg) {
        if (!optDesc) return;
        optDesc.innerHTML = msg;
        optDesc.style.display = msg ? "block" : "none";
    }

    if (d1) d1.addEventListener("mouseenter", () => setDesc("A nice and easy baby puzzle.<br>Enemies are slow and deal less damage. Enemies spawn less often. Are you new to this math stuff or something? Sanity regain sanity faster. Weapons cost less sanity to fire<br>Score Multiplier: x0.25"));
    if (d2) d2.addEventListener("mouseenter", () => setDesc("A balanced practice exam.<br>The enemies are normal speed and deal normal damage. Sanity is regained at a normal rate. Firing weapons takes a normal amount of sanity. Recommended for average players.<br>Score Multiplier: x1"));
    if (d3) d3.addEventListener("mouseenter", () => setDesc("Tough test.<br>Faster and more agile enemies, heavier damage. Mistakes are not recommended. Enemies spawn more often. Sanity is regained slower. Firing weapons takes a little more of sanity.<br>Score Multiplier: x1.75"));
    if (d4) d4.addEventListener("mouseenter", () => setDesc("Unfair final.<br>Brutal stats. You were warned. Sanity is never auto regained. Weapons cost more sanity. Enemies are lighting fast and deal insane damage. Enemies swarm you. Mistakes are not allowed. Only a master of calc can last even 20 seconds.<br>Score Multiplier: x4"));
    const clearDesc = () => setDesc("");
    if (d1) d1.addEventListener("mouseleave", clearDesc);
    if (d2) d2.addEventListener("mouseleave", clearDesc);
    if (d3) d3.addEventListener("mouseleave", clearDesc);
    if (d4) d4.addEventListener("mouseleave", clearDesc);

    if (m0) m0.addEventListener("mouseenter", () => setMDesc("The full expeirence of Shanvanth's Last Stand. WARNING: Not working yet"));
    if (survivalBtn) survivalBtn.addEventListener("mouseenter", () => setMDesc("Endless waves of enemies that just keep getting stronger. How long can your survive?"));
    if (m1) m1.addEventListener("mouseenter", () => setSDesc("Difficulty: Easy.<br>Description: Ah, Mr. Loveday's room, a nice open haven for Shanvanth. Now it has become a warzone. Where is Mr. Loveday?"));
    if (m2) m2.addEventListener("mouseenter", () => setSDesc("Difficulty: Hard.<br>Description: A closed off room with chairs blocking the way. Shanvanth will get swarmed very quickly if he isn't efficient with his defence."));
    if (m3) m3.addEventListener("mouseenter", () => setSDesc("Difficulty: Medium.<br>Description: A semi open room with desks and chairs all over. Shanvanth must face his lunch room's actual purpose."));
    if (m4) m4.addEventListener("mouseenter", () => setSDesc("Difficulty: Hard.<br>Description: Shanvanth's physics room, turned into a colloseum. Ms. Labrash's Table plan now gets in the way of Shanvanth's shots and movements, who will struggle to survive."));
    if (m5) m5.addEventListener("mouseenter", () => setSDesc("Difficulty: Easy.<br>Description: Shanvanth digs more into his mind... is something.. wrong with him? A semi open map, something seriously wrong must have happened in here..."));
    
    const clearmapDesc = () => setMDesc("");
    const clearSDesc = () => setSDesc("");
    if (m0) m0.addEventListener("mouseleave", clearmapDesc);
    if (survivalBtn) survivalBtn.addEventListener("mouseleave", clearmapDesc);
    if (m1) m1.addEventListener("mouseleave", clearSDesc);
    if (m2) m2.addEventListener("mouseleave", clearSDesc);
    if (m3) m3.addEventListener("mouseleave", clearSDesc);
    if (m4) m4.addEventListener("mouseleave", clearSDesc);
    if (m5) m5.addEventListener("mouseleave", clearSDesc);


    if (o1) o1.addEventListener("mouseenter", () => setOptDesc("Toggle background music on or off. Turns off both the menu and in-game music."));
    if (o2) o2.addEventListener("mouseenter", () => setOptDesc("Toggle sound effects on or off. Includes Death sounds, weapon sounds, enemy sounds, and the dash chime."));
    if (o3) o3.addEventListener("mouseenter", () => setOptDesc("Toggle whether to show your high score at the end of each game."));
    if (o4) o4.addEventListener("mouseenter", () => setOptDesc("Toggle FPS Cap from 60 to 30. If you're consistently running under 50 fps, or you are playing at a lower power mode, you should play on 30 fps. Play on 60 fps for the best experience."));
    if (o5) o5.addEventListener("mouseenter", () => setOptDesc("Change your player name. This will be used for your player profile"));
    if (o6) o6.addEventListener("mouseenter", () => setOptDesc("Change your player profile picture to a character in game."));
    const clearOptDesc = () => setOptDesc("");
    if (o1) o1.addEventListener("mouseleave", clearOptDesc);
    if (o2) o2.addEventListener("mouseleave", clearOptDesc);
    if (o3) o3.addEventListener("mouseleave", clearOptDesc);
    if (o4) o4.addEventListener("mouseleave", clearOptDesc);
    if (o5) o5.addEventListener("mouseleave", clearOptDesc);
    if (o6) o6.addEventListener("mouseleave", clearOptDesc);
    
});


const originalUpdate = update;
    update = function(timestamp) {
    if (!gameStarted) {
        requestAnimationFrame(update);
        return;
    }
    originalUpdate(timestamp);
};

    
    window.ShansLastStand = {
        showMainMenu: showMainMenu,
        showGameUI: showGameUI
    };

    
    try { Object.freeze(window.ShansLastStand); } catch (e) {}

})();
