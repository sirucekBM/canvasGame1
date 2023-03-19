class Weapon{
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }
    update(){
        this.x +=10;
        if(this.x > this.game.width)this.markedForDeletion = true;
    }
}

export class LaserWeapon extends Weapon{
    constructor(game, x, y){
        super(game);
        this.size = 5;// Math.random()* 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = 1;
        this.speedY = 1;
        this.color = 'red';
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size,0,Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}