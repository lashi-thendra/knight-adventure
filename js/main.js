
let element;  
let topx = 50;  
let leftx = 0;
let classes = ["back", "mid", "front"];
let classx = 0;
let treeNumber = 1;
let moveTreeBool = false;
let runBool = false;
let knightAction = 'Idle';
let runFoward = true;
let dx = 10;
let jumpBool = false;
let attachBool = false;

let knight = document.getElementById('knight');

let sun = document.getElementById('sun');
let forests = Array.from(document.querySelectorAll(".forest"));
// sun.style.backgroundImage('img/sun.png');

sun.style.backgroundImage = "url(img/sun.png)";
forests.forEach(elem => elem.style.backgroundImage = 'url(img/forest.1.png)');


for (let i = 0 ; i < 3; i++) {
    classx = classes[i];
    for (let j = 0; j < 9 -i; j++) {
        
        element = document.createElement('div');
        element.classList.add(classx);
        element.style.top = 100 + 5*i + "px";

        leftx =  ((i===1)? 300: 0 ) + (200 + i*50 )*j;
        element.style.left = leftx + "px";
        

        treeNumber = Math.random()*6 + 1;
        element.style.backgroundImage = `url(img/tree/${Math.floor(treeNumber)}.1.png)`;

        element.style.transform =`scale(${0.9 + i*0.2})`
        // element.style.filter =  `blur(${0.6*(3-i)}px)`;

        element.replaceTree = replaceTree;

        document.body.append(element)
    }
    leftx = -100 + i*250;
}

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
    } 
}

function run(){
    if(knight.offsetLeft >= innerWidth/2){
        moveTree();
        dx = 0;
    }else{
        dx = 10;
    }

    if(runFoward){
        knight.style.left = knight.offsetLeft + dx + "px";
        
    }
    else knight.style.left = knight.offsetLeft - 10 + "px";
}

function attack(){

}

let angle = 0;
let originalOffsetTop = knight.offsetTop ;
function jump(){
    knight.style.top = originalOffsetTop - 200*Math.sin(angle/180*Math.PI) + "px"; 
    angle += 5;
    if(angle >= 180){
        angle = 0;
        jumpBool = false;
        knightAction = runBool? "Run":"Idle";
    }
}

addEventListener('keydown', (eventData)=>{
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
    }
});

addEventListener('keypress', (eventData)=>{
    if(eventData.key == " "){
        jumpBool = true;
        knightAction = "Jump";
    }
    
});



let kinghtImageNumber = 1;
let count = 0;
setInterval(()=>{
    count++;
    // if(count % 5 != 0) return;
    if(kinghtImageNumber === 10) kinghtImageNumber =1;
    knight.style.backgroundImage = 
    `url('img/knight/freeknight/png/${knightAction} (${kinghtImageNumber}).png')`;
    if(count % 3 === 0) kinghtImageNumber++;
    if(count === 10) count = 0;
    if(moveTreeBool) moveTree();
    if(jumpBool) jump();
    if(attachBool){
        attack();
        if(angle === 0) return;
    } 
    if(runBool) run();
},20);


