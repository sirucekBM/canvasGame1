import { Dust, Shot } from './particles.js';


const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    SHOOTING: 4,
}

class State{
    constructor(state,game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State{
    constructor(game){
        super('SITTING',game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 4;
    }
    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight') || input.includes('swipe left') || input.includes('swipe right')){
            this.game.player.setState(states.RUNNING,1);
        }
    }
}

export class Running extends State{
    constructor(game){
        super('RUNNING',game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.frameY = 3;
        this.game.player.maxFrame = 6;
    }
    handleInput(input){
        this.game.particles.push(new Dust(this.game, this.game.player.x + this.game.player.width/2-10, this.game.player.y+this.game.player.height-5));
        
        if(input.includes('ArrowDown')){
            this.game.player.setState(states.SITTING,0);
        } else if(input.includes('ArrowUp') || input.includes('swipe up')){
            this.game.player.setState(states.JUMPING,1); 
        }else if(input.includes(' ')){
            this.game.player.setState(states.SHOOTING,1); 
        }
    }
}

export class Jumping extends State{
    constructor(game){
        super('JUMPING', game);
    }
    enter(){
        if(this.game.player.onGround())this.game.player.vy -= 27;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 1;
    }
    handleInput(input){
        if(this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING,1);
        }else{
            if(input.includes('ArrowLeft') || input.includes('ArrowRight') || input.includes('swipe left') || input.includes('swipe right')){
                this.game.player.setState(states.RUNNING,1);
            }
        }
    }
}

export class Falling extends State{
    constructor(game){
        super('FALLING',game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 2;
    }
    handleInput(input){
        if(this.game.player.onGround()){
            this.game.player.setState(states.RUNNING,1);
        }else{
            this.game.player.setState(states.SHOOTING,1);
        }
    }
}

export class Shooting extends State{
    constructor(game){
        super('SHOOTING',game);
    }
    enter(){
        //this.game.player.frameX = 0;
        //this.game.player.maxFrame = 0;
        //this.game.player.frameY = 0;
    }
    handleInput(input){
        console.log("input: " + input)
        if(input.includes(' ')){
                this.game.player.shotProjectile(Date.now());
        }else{
            if(input.includes('ArrowUp')){
                this.game.player.setState(states.JUMPING,1); 
            }else if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
                this.game.player.setState(states.RUNNING,1);
            }else if(this.game.player.onGround()){
                this.game.player.setState(states.RUNNING,1);
            }
        }
    }
}