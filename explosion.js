class Explosion{
    constructor(game) {
    this.game = game;
    this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speedX + this.game.speed-2;
        //this.y -= this.speedY;
        this.size *= 1.95;//speed sizing
        if(this.size >200)this.markedForDeletion = true;
    }
}

export class FireExplosion extends Explosion{
    constructor(game, x, y){
        super(game);
        this.size = 20;// Math.random()* 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'red';
    };
    draw(context){
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.size,0,Math.PI * 2);
        context.fillStyle = this.color;
        context.strokeStyle  = this.color;
        context.lineWidth = 5;
        //context.fill();
        context.stroke();
        context.restore();
    }
}
