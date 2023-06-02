class Enemy {
    constructor(path, velocity, attackDistance, elevation, initialLeft, diePoints, respawnLeft){
        this.knightVelocity = 0;
        this.path = path;
        this.velocity = velocity;
        this.respawnLeft =  respawnLeft;
        this.attackDistance =  attackDistance;
        this.diePoints = diePoints;
        this.initialLeft = initialLeft;
        this.enemey = document.createElement('div');
        this.enemey.style.backgroundImage = path;
        this.enemey.classList.add('enemy');
        this.enemey.style.bottom = elevation + "px";
        this.enemey.style.left = initialLeft + "px";
        mainSection.append(this.enemey);
    }

    die(){
        if(this.enemey.offsetLeft > 0){
            $("#score").removeClass('animate__bounce');
            setTimeout(()=>{$("#score").addClass('animate__bounce')},0);
            points += this.diePoints;
            document.querySelector('#score > span').innerText = points;
        }
        this.enemey.style.left = `${this.respawnLeft}px`;
        console.log("enemy dead");
    }

    killThePlayer(){
        knightAction = "Dead";
        $('#modal-button').trigger('click');
        clearInterval(mainInterval);
        clearInterval(enemyInterval);
        killKnightAndPlaceOnGround();
    }

    move(){
        this.enemey.style.left = `${this.enemey.offsetLeft - this.velocity }px`;
        if(this.enemey.offsetLeft < -200){
            this.die();
        }
    }

    moveWithKnight(){
        this.enemey.style.left = `${this.enemey.offsetLeft - (this.velocity/3 + 3) }px`;
    }

    reset(){
        console.log("reset");
        let jEl = $(this.enemey);
        jEl.css('left',`${this.initialLeft}px` );
    }

}

let snail = new Enemy('url(img/enemy/1.gif)', 3, 50 , 100 , 1500 , 5 , 1500);
let bird = new Enemy('url(img/enemy/2.gif)', 4, 50 , 300, 1000 , 10, 2000);
let tree = new Enemy('url(img/enemy/3.gif)', 0, 50 , 100, 1130, 2, 2000);

let enemyInterval = setInterval(()=>{
    [snail, bird, tree].forEach((obj)=> checkforKillDie(obj));
}, 20);

moveEnemies = function(){
    snail.moveWithKnight();
    bird.moveWithKnight();
    tree.moveWithKnight();
}

btnPlayGain.on('click', ()=>{
    playagain();
} );

function checkforKillDie(obj){
    obj.move();
        let distance = Math.hypot(knight.offsetLeft + 100 - (obj.enemey.offsetLeft + 75),
             knight.offsetTop + 100 - (obj.enemey.offsetTop+ 75));

        if(distance < 100){
            audioRunning.pause();
            $('#modal-text').text(`Total score: ${points}`);
            obj.killThePlayer();
        }

        if(distance < 120 && attachBool && (kinghtImageNumber >= 5 && kinghtImageNumber <= 8)){
            obj.die();
        } 
}



function killKnightAndPlaceOnGround(){
    console.log("dead");
    audioHurt.play();
    isDead = true;
    kinghtImageNumber = 0;
    knight.style.transform = "scale(1)";
    knight.style.bottom = "80px";
    let isFalling = true;
    let isDying = true;
    const killAnimationInterval = setInterval(()=>{
        knight.style.bottom = "80px";
        knight.style.transform = "scale(1.3)";
        kinghtImageNumber++;
        
        if(angle > 90) angle = angle-90;
        if(angle >= 0){
            knight.style.top = originalOffsetTop - 350*Math.sin(angle/180*Math.PI) + "px"; 
            angle --;
            if(angle <= 0){
                isFalling = false;
                console.log("falling ",isFalling);
            } 
        }
        if(kinghtImageNumber <= 10){
            knight.style.backgroundImage = `url('img/knight/Dead (${kinghtImageNumber}).png')`;
            if(kinghtImageNumber >= 10){
                isDying = false;
                console.log("is Dying", isDying);
            } 
        }
        console.log(killAnimationInterval);
        if((!isFalling && !isDying) || (kinghtImageNumber > 200)){
            console.log("clearing in");
            clearInterval(killAnimationInterval);
        } 
    },20);
}

function playagain(){
    [snail, bird, tree].forEach(obj => obj.reset());
    points = 0;
    $('#score > span').text(0);
    knight.style.left = "100px";
    knight.style.transform = "scale(1)";
    kinghtImageNumber = 1;
    isDead  =false;
    jumpBool = false;
    attachBool = false;
    runBool = false;
    count = 0;
    knightAction = 'Idle';
    mainInterval = setInterval(()=> {
        gamePlay();
        [snail, bird, tree].forEach(obj => checkforKillDie(obj));
    }, 20);
}


