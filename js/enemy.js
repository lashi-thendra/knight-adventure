let points = 0;


class Enemy {
    constructor(path, velocity, attackDistance, elevation, initialLeft, diePoints, respawnLeft){
        this.knightVelocity = 0;
        this.path = path;
        this.velocity = velocity;
        this.respawnLeft =  respawnLeft;
        this.attackDistance =  attackDistance;
        this.diePoints = diePoints;
        this.enemey = document.createElement('div');
        this.enemey.style.backgroundImage = path;
        this.enemey.classList.add('enemy');
        this.enemey.style.bottom = elevation + "px";
        this.enemey.style.left = initialLeft + "px";
        document.body.append(this.enemey);
    }

    die(){
        $("#score").removeClass('animate__bounce');
        this.enemey.style.left = `${this.respawnLeft}px`;
        console.log("enemy dead");
        setTimeout(()=>{$("#score").addClass('animate__bounce')},0)
        setTimeout(()=>{$("#score").removeClass('animate__bounce')},1000)
    }

    killThePlayer(){
        knightAction = "Dead";
        isDead = true;
        setTimeout(()=>{
            $('#modal-button').trigger('click');
            clearInterval(mainInterval);
            clearInterval(enemyInterval);
        },500);
        

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
        let jEl = $(this.enemey);
        jEl.css.left = this.initialLeft;
    }

}

let snail = new Enemy('url(img/enemy/1.gif)', 3, 50 , 100 , 1500 , 5 , 1500);
let bird = new Enemy('url(img/enemy/2.gif)', 4, 50 , 300, 1000 , 10, 2000);
let tree = new Enemy('url(img/enemy/3.gif)', 0, 50 , 100, 1130, 2, 2000);

let enemyInterval = setInterval(()=>{
    [snail, bird, tree].forEach((obj)=> checkforKillDie(obj));
}, 20);

function checkforKillDie(obj){
    obj.move();
        let distance = Math.hypot(knight.offsetLeft + 100 - (obj.enemey.offsetLeft + 75),
             knight.offsetTop + 100 - (obj.enemey.offsetTop+ 75));

        if(distance < 100){
            obj.killThePlayer();
        }

        if(distance < 120 && attachBool){
            obj.die();
            points += obj.diePoints;
            document.querySelector('div > span').innerText = points;
        } 
}

moveEnemies = function(){
    snail.moveWithKnight();
    bird.moveWithKnight();
    tree.moveWithKnight();
}

$('#play-again').on('click',()=> resetGame());

function resetGame(){
    points  = 0;

}
