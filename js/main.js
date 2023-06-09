let gameStarted = false;
let element;  
let topx = 50;  
let leftx = 0;
let classes = ["back", "mid", "front"];
let classx = 0;
let treeNumber = 1;

let runBool = false;
let knightAction = 'Idle';
let runFoward = true;
let dx = 10;
let jumpBool = false;
let attachBool = false;
let pitCount = 2;
let moveEnemies = function(){};
let points = 0;
let kinghtImageNumber = 1;
let count = 0;
let isDead = false;
let groundElems = [];
let angle = 0;
let dy = 2;

let knight = document.getElementById('knight');
let btnPlayGain = $('#btn-play-again');
let audioSwoosh = new Audio("audio/swoosh.mp3");
let audioHurt = new Audio("audio/hurt.mp3");
let audioRunning = new Audio("audio/running.mp3");
let audioJump = new Audio("audio/jump.mp3");
let mainSection = $('#main-section');
let mainInterval = null;

$(audioRunning).on('canplay',()=>console.log("can play"));

for (let i = 0 ; i < 3; i++) {
    classx = classes[i];
    for (let j = 0; j < 6 -i; j++) {
        
        element = document.createElement('div');
        element.classList.add(classx);
        element.classList.add("tree");
        element.style.bottom = 120 + "px";

        leftx =  ((i===1)? 300: 0 ) + (200 + i*50 )*j;
        element.style.left = leftx + "px";

        treeNumber = Math.floor(Math.random()*2) + 7;
        element.style.backgroundImage = `url(img/Object/obj${treeNumber}.png)`;
        
        element.replaceTree = replaceTree;

        mainSection.append(element)
    }
    leftx = -100 + i*250;
}


for (let index = 0; index < 15; index++) {
        let groundElem = document.createElement('div');
        groundElem.classList.add('ground');
        groundElem.style.bottom = 0;
        groundElem.style.left = 100*index + "px";
        groundElem.replaceGround = replaceGround;
        mainSection.append(groundElem);
        groundElems.push(groundElem);
}

addEventListener('keydown', (eventData)=>{
    
    if(isDead) return;
    if(eventData.key === "ArrowRight"){
        knightAction = jumpBool? "Jump":"Run";
        runBool = true;
        runFoward = true;
        knight.style.transform = 'scaleX(1)';
    }
    if(eventData.key === "ArrowLeft"){
        knightAction = jumpBool? "Jump":"Run"
        runBool = true;
        runFoward = false;
        knight.style.transform = 'scaleX(-1)';
    }
    if(eventData.key == "d"){
        knightAction = jumpBool? "JumpAttack":"Attack";
        attachBool = true;
    }
});

addEventListener('keyup', (eventData)=>{
    
    if(isDead) return;
    if(eventData.key === "ArrowRight"){
        knightAction = jumpBool? "Jump": "Idle";
        runBool = false;
    }
    if(eventData.key === "ArrowLeft"){
        knightAction = jumpBool? "Jump":"Idle";
        runBool = false;
    }
    if(eventData.key == "d"){
        knightAction = jumpBool? "Jump":`${runBool?'Run':'Idle'}`;
        attachBool = false;
        kinghtImageNumber = 1;
        audioSwoosh.pause();
    }
});

addEventListener('keypress', (eventData)=>{
    if(isDead) return;
    if(eventData.key == " "){
        jumpBool = true;
        knightAction = "Jump";
    }
});


let frontTrees = Array.from(document.getElementsByClassName('front'));
let midTrees = Array.from(document.getElementsByClassName('mid'));
let backTrees = Array.from(document.getElementsByClassName('back'));

function moveTree(){
    frontTrees.forEach(element => {
        element.style.left = element.offsetLeft - 3 + "px";
        element.replaceTree();
    });
    midTrees.forEach(element => {
        element.style.left = element.offsetLeft - 2 + "px";
        element.replaceTree();
    });
    backTrees.forEach(element => {
        element.style.left = element.offsetLeft - 1 + "px";
        element.replaceTree();
    });
}

function replaceTree(){
    if(this.offsetLeft <= -300){
        this.style.left = innerWidth + "px";
        points += 1;
        document.querySelector('#score > span').innerText = points;
    } 
}

function moveGround(){
    groundElems.forEach(elem => {
        elem.style.left = elem.offsetLeft - 3 + "px";
        elem.replaceGround();
    })
}

function replaceGround(){
    if(this.offsetLeft <= -100){
        let lastGround = groundElems[14];
        this.style.left = lastGround.offsetLeft + 120 + "px";
        groundElems.push(this);
        groundElems.shift();
    }
}

function run(){
    if(knightAction === "Attack") return;
    if(knight.offsetLeft >= innerWidth/2 - 100){
        moveTree();
        moveGround();
        moveEnemies();
        dx = 0;
    }else{
        dx = 10;
        moveEnemy = false;
    }

    if(runFoward){
        knight.style.left = knight.offsetLeft + dx + "px";
        
    }
    else knight.style.left = knight.offsetLeft - 10 + "px";
}


let originalOffsetTop = knight.offsetTop ;
function jump(){
    audioJump.play();
    knight.style.top = originalOffsetTop - 350*Math.sin(angle/180*Math.PI) + "px"; 
    if(angle >= 180){
        angle = 0;
        jumpBool = false;
        knightAction = runBool? "Run":"Idle";
    }
    angle += 2;
}

mainInterval = setInterval(gamePlay, 20);

function gamePlay(){
    count++;
    if(kinghtImageNumber >= 10) kinghtImageNumber =1;
    knight.style.backgroundImage = 
    `url('img/knight/${knightAction} (${kinghtImageNumber}).png')`;
    if(angle < 30){
        if(count % 3 === 0) kinghtImageNumber++;
    }

    if((kinghtImageNumber===5) && (knightAction.includes("Attack"))){
        audioSwoosh.play();
    } 
    if(count === 10) count = 0;
    if(jumpBool) jump();
    if(attachBool){
        audioRunning.pause();
        if(angle === 0) return;
    } 
    if(runBool){
        if(!jumpBool)audioRunning.play();
        else audioRunning.pause();
        run();
    }else{
        audioRunning.pause();
    } 
};










