export class InputHandler{
    constructor(game){
        this.game=game;
        this.keys = [];
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
            
            if(e.key === 'zEnter'){
                this.game.debug = !this.game.debug && this.game.gameOver
                this.game.restart();
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
            console.log('start');
        });

        window.addEventListener('touchmove',e=>{
            console.log('move');
        });

        window.addEventListener('touchend',e=>{
            console.log('end');
        });

    }

}