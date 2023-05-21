
let element;  
let topx = 50;  
let leftx = 0;
let classes = ["back", "mid", "front"];
let classx = 0;
let treeNumber = 1;
for (let i = 0; i < 3; i++) {
    classx = classes[i];
    for (let j = 0; j < 10; j++) {
        
        element = document.createElement('div');
        element.classList.add(classx);
        element.style.top = 20*i + "px";

        leftx =  300*j - 100*i;
        element.style.left = leftx + "px";
        

        treeNumber = Math.random()*6 + 1;
        element.style.backgroundImage = `url(/img/tree/${Math.floor(treeNumber)}.png)`;

        element.style.transform =`scale(${0.9 + i*0.2})`
        element.style.filter =  `blur(${0.6*(3-i)}px)`;

        document.body.append(element)
    }
    leftx = -100 + i*250;
}

let frontTrees;
let midTrees;
let backTrees;
addEventListener('keydown', (eventData)=>{
    if(eventData.key === "ArrowRight"){
        frontTrees = Array.from(document.getElementsByClassName('front'));
        midTrees = Array.from(document.getElementsByClassName('mid'));
        backTrees = Array.from(document.getElementsByClassName('back'));
        

        frontTrees.forEach(element => {
            element.style.left = element.offsetLeft - 3 + "px";
        });
        midTrees.forEach(element => {
            element.style.left = element.offsetLeft - 2 + "px";
        });
        backTrees.forEach(element => {
            element.style.left = element.offsetLeft - 1 + "px";
        });
    }
})