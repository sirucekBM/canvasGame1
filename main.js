import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy} from './enemies.js';
import { LaserWeapon } from './weapons.js';
import { UI } from './UI.js';


window.addEventListener('load',function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 500;
    const startLives = 10;
    const fullScreenButton = this.document.getElementById('fullScreenButton');
    fullScreenButton.addEventListener('click',toggleFullScreen);


    class Game{
        constructor(width,height,lives){
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.background = new Background(this);
            this.speed = 0;
            this.lives = lives;
            this.maxSpeed = 3;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies=[];
            this.particles = [];
            this.weapons = [];
            this.explosions = [];
            this.listBox =[];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.ammo = 30;
            this.gameOver = false;
            this.fontColor = 'black';
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }

        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys,deltaTime);
            // handelEnemy
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            }else{
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy =>{
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy),1);
            });
            this.particles.forEach((particle, index) => {
                particle.update();
                if(particle.markedForDeletion) this.particles.splice(index,1);
            });
            this.weapons.forEach((weapon, index) => {
                weapon.update();
                if(weapon.markedForDeletion) this.weapons.splice(index,1);
            });
            this.explosions.forEach((explosion, index) => {
                explosion.update();
                if(explosion.markedForDeletion) this.explosions.splice(index,1);
            });

            this.listBox.forEach((box, index) => {
                box.update();
                if(box.markedForDeletion){
                    this.listBox.splice(index,1);
                }
            })


        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            });
            this.weapons.forEach(weapon =>{
                weapon.draw(context);
            });

            this.particles.forEach(particle =>{
                particle.draw(context);
            });

            this.explosions.forEach(explosion =>{
                explosion.draw(context);
            });

            this.listBox.forEach((box, index) => {
                box.draw(context);
            })

            this.UI.draw(context);
        }

        restart(){
                lastTime = 0;
                this.player.x = 0;
                this.player.y = this.height - this.player.height - this.groundMargin;
                this.player.frameY = 0;
                this.player.maxFrame = 5;
                this.enemyTimer = 0;
                this.gameOver = false;
                this.lives = startLives;
                this.enemies=[];
                this.speed = 0;
                this.player.speed = 0;
                this.ammo = 30;
                this.score = 0;
                animate(0);
        }




        addEnemy(){
            if(this.speed > 0 && Math.random()<0.5){
                this.enemies.push(new GroundEnemy(this));
            }
            else if (this.speed > 0 )this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }

    }

    const game = new Game(canvas.width,canvas.height,startLives);
    console.log(game);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver)requestAnimationFrame(animate);
    }

    function toggleFullScreen(){
        if(!document.fullscreenElement){
            canvas.requestFullscreen().catch(err =>{
                alert(`err neni full screen mode: ${err.message}`)
            });
        }else{
            document.exitFullscreen();
        }
    }

   // document.addEventListener("keydown", (e) => {
   //     e.preventDefault();
    //    if (e.key === 'zEnter') {
   //         game.restart();
   //     }
  //  });


    animate(0);
});