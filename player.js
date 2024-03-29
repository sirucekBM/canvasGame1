import { Sitting, Running, Jumping,  Falling, Shooting } from "./playerStates.js";
import { LaserWeapon } from './weapons.js';
import { FireExplosion } from './explosion.js';
import { Piece } from './piece.js';

export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight =  1
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.timeStampProjectile = 0;
        this.states = [new Sitting(this.game),new Running(this.game),new Jumping(this.game), new Falling(this.game), new Shooting(this.game)];

    }

    restart(){
        this.x = 0;
        this.y = this.game.height - this.height;
        this.frameY = 0;
        this.maxFrame = 5;
        this.gameOver = false;
        animate(0);
    }

    update(input,deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        //horizontalni pohyb
        this.x += this.speed;
        if(input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if(this.x < 0 ) this.x = 0;
        if(this.x > this.game.width - this.width)this.x = this.game.width - this.width;
        //vertikalni pohyb
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //sprite animace
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX<this.maxFrame)this.frameX++;
            else this.frameX = 0;
        }else{
            this.frameTimer += deltaTime;
        }


    }
    draw(context){
        if(this.game.debug)context.strokeRect(this.x,this.y,this.width,this.height);
        context.drawImage(this.image,this.frameX * this.width,this.frameY * this.height,this.width, this.height, this.x,this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){
        console.log('status:' + state);
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
        
    }

    shotProjectile(stampTime){
        if(this.game.ammo > 0 && stampTime - this.timeStampProjectile > 100){
            this.timeStampProjectile = stampTime;
            this.game.weapons.push(new LaserWeapon(this.game, this.x + this.width-20, this.y+20));
            this.game.ammo -= 1;
        }
        
    }


    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x < this.x +this.width && enemy.x + enemy.width >this.x && enemy.y < this.y + this.height && enemy.y + enemy.height >this.y
            ){
                
                enemy.markedForDeletion = true;
                if(enemy.type=="ground" || enemy.type =="spider"){
                    this.game.lives -=1;
                    for (let i = 0; i < 5; i++) {
                        this.game.explosions.push(new FireExplosion(this.game, enemy.x + enemy.width/2, enemy.y + enemy.height/2,'red'));
                    }
                    this.getListBoxs(enemy);
                }else{
                    this.game.score++;
                    this.game.ammo +=1;
                    for (let i = 0; i < 5; i++) {
                        this.game.explosions.push(new FireExplosion(this.game, enemy.x + enemy.width/2, enemy.y + enemy.height/2,'green'));
                    }
                    this.getListBoxs(enemy);
                }
            }else{

            }

            if(this.game.lives<1)this.game.gameOver = true;

        });

    }
    newRandom(min, max) {
        return Math.floor(Math.random() * (min - max)+max);
      }

    getListBoxs(enemy) {
        //let listBox =[];
        for(let i=0;i<200;i++){
            var box = {
                x: 0,
                y: 0,
                sizeX: 4,
                sizeY: 4,
                R: 0,
                G: 0,
                B: 0,
                A: 0.9
            };    
            box.x = this.newRandom(0,enemy.width);
            box.y = this.newRandom(0,enemy.height);
            box.R = this.newRandom(100,250);
            box.G = this.newRandom(0,200);
            box.B = this.newRandom(0,200);
    
            this.game.listBox.push(new  Piece(this.game,box,enemy.x ,enemy.y));
      }
      
    }

}