export class UI{
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        context.fillText('Score: ' + this.game.score,20,50);
        context.fillText('Ammo: ' + this.game.ammo,20,90);
        context.fillText('Lives: ' + this.game.player.lives,20,130);

        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily; 
            context.fillText('GAME OVER ',this.game.width * 0.5 ,this.game.height * 0.5);          
        }
        context.restore();
    }
}