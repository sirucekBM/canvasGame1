class Explosion{
    constructor(game) {
    this.game = game;
    this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speedX + this.game.speed;
        //this.y -= this.speedY;
        this.size *= 1.1;//speed sizing
        if(this.size >50)this.markedForDeletion = true;
    }
}

export class FireExplosion extends Explosion{
    constructor(game, x, y,color){
        super(game);
        this.size =  Math.random()* 3 + 2;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = Math.random()*4;
        this.color = color;
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
