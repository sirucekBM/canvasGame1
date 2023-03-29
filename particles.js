class Particle{
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speedX + this.game.speed-2;
        this.y -= this.speedY;
        this.size *= 0.95;//speed sizing
        if(this.size <0.3)this.markedForDeletion = true;
    }
}

export class Dust extends Particle{
    constructor(game, x, y){
        super(game);
        this.size = 3;// Math.random()* 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = "rgba(255, 255, 255, 0.3)";
    };
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size,0,Math.PI * 2);
        context.fillStyle = this.color;
        context.strokeStyle  = this.color;
        context.fill();
        //context.stroke();
    }
}

export class Shot extends Particle{
    constructor(game, x, y){
        super(game);
        this.size = 20;// Math.random()* 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = 5;
        this.speedY = 0;
        this.color = 'red';
    };
    draw(context){
       // context.beginPath();
       // context.arc(this.x, this.y, this.size,0,Math.PI * 2);
       // context.fillStyle = this.color;
       // context.fill();
    }

}