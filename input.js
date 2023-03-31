export class InputHandler{
    constructor(game){
        this.game=game;
        this.keys = [];
        this.touchY = '';
        this.touchX = '';
        this.touchTreshold = 30;
        this.timeStampDoubleTouch = 0;
        this.counterTouch = 0;


        window.addEventListener('keydown',e =>{

            if((    e.key ==='ArrowDown' || 
                    e.key ==='ArrowUp' ||
                    e.key ==='ArrowLeft' ||
                    e.key ==='ArrowRight' ||
                    e.key ===' ' ||
                    e.key ==='Enter'
                    
               ) && this.keys.indexOf(e.key) ===-1){
                this.keys.push(e.key);
            }else if (e.key === 'd'){
                this.game.debug = !this.game.debug;
            }
            
            if(e.key === 'Enter'){
                if(this.game.gameOver)this.game.restart();
            }

        });
        window.addEventListener('keyup',e =>{
            if(e.key ==='ArrowDown' ||
                e.key ==='ArrowUp'  ||
                e.key ==='ArrowLeft' ||
                e.key ==='ArrowRight' ||
                e.key ===' ' ||
                e.key ==='Enter'
            ){
                this.keys.splice(this.keys.indexOf(e.key),1);
            }

        });

        window.addEventListener('touchstart',e=>{
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;
            this.counterTouch +=1;
            if (this.counterTouch ===1){
                this.timeStampDoubleTouch = Date.now();
            }
            if (this.counterTouch ===2){
                const timeDistanceTouch = Date.now() - this.timeStampDoubleTouch;
                if (timeDistanceTouch > 50 && timeDistanceTouch < 400){
                    this.keys.indexOf(' ') === -1;
                    this.keys.push(' ');
                }
                this.counterTouch = 0;
            }


            
        });

        window.addEventListener('touchmove',e=>{
            const swipeDistance = e.changedTouches[0].pageY - this.touchY;
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
            if (swipeDistance < -this.touchTreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
            else if (swipeDistance > this.touchTreshold && this.keys.indexOf('swipe down') === -1)this.keys.push('swipe down');

            //if (swipeDistanceX < -this.touchTreshold && this.keys.indexOf('swipe left') === -1) this.keys.push('swipe left');
            //else if (swipeDistanceX > this.touchTreshold && this.keys.indexOf('swipe right') === -1)this.keys.push('swipe right');

            if (swipeDistanceX < -this.touchTreshold && this.keys.indexOf('ArrowLeft') === -1) this.keys.push('ArrowLeft');
            else if (swipeDistanceX > this.touchTreshold && this.keys.indexOf('ArrowRight') === -1)this.keys.push('ArrowRight');

            if(this.game.gameOver)this.game.restart();
        });

        window.addEventListener('touchend',e=>{
            this.keys.splice(this.keys.indexOf('swipe up'),1);
            this.keys.splice(this.keys.indexOf('swipe down'),1);
            this.keys.splice(this.keys.indexOf('ArrowRight'),1);
            this.keys.splice(this.keys.indexOf('ArrowLeft'),1);
            this.keys.splice(this.keys.indexOf(' '),1);

        });

    }

}