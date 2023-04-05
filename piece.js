export class Piece{
    constructor(game,box,x,y){
        this.size = 1;// Math.random()* 10 + 10;
        this.markedForDeletion = false;
        this.x = box.x + x;
        this.y = box.y + y;
        this.num = Math.floor(Math.random()*10) + 1; 
        this.speedX = Math.floor(Math.random()*15) + 10;
        //this.speedX = this.num * Math.round(Math.random()) ? 1 : -1;
        this.speedY = Math.random()* 3 + 3;
        this.markedForDeletion = false;
        this.box = box;
        this.game = game
    };
    draw(context){
        context.fillStyle = 'rgba(' + this.box.R + ',' + this.box.G + ',' + this.box.B + ',' + this.box.A +')'; context.fillRect(this.x,this.y,this.box.sizeX,this.box.sizeY);
    }
    update(){
        this.y += this.speedY;
        this.x -= 2;
        if(this.y > this.game.height)this.markedForDeletion = true;
    }
}