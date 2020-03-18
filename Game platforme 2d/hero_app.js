/*
    Les zombies vont chercher le pq qu'on doit proteger
    si le zombie est proche du hero alors il attaque
*/

// Canvas -------------------------------------------------------------

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')

canvas.width = 700;
canvas.height = 200;

// Variables Globaux ---------------------------------------------------

let scale = 1; // multiplicateur de taille
let width = 48; // taille du sprite couper
let height = 48; // taille du sprite couper
let scaleWidth = scale * width; // taille sur le canvas
let scaleHeight = scale * height; // taille sur le canvas
let i = 0;
let fps = 0;
let xh = canvas.width / 2;
let yh = 150;
let vx = 2;
let posture = true;
let sence = 0; // 0 = droitre 1 = gauche

// function prédéfinie d'animation ------------------------------------

function drawFrame(img, frameX, frameY, canvasX, canvasY){

    ctx.drawImage(img, frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaleWidth, scaleHeight)

}

// Posture de base ------------------------------------------------------

let hero = new Image();
hero.src = 'hero/GraveRobber.png'

hero.onload = function(){
    postureBase(); // remettre onload
}

function postureBase(){
    if(posture){
        ctx.clearRect(xh,yh,48, 48)
        drawFrame(hero, 0, 0, xh, yh)
    }
}

// Animation de marche ------------------------------------------------

//droite
let arrayHeroWalk = [0, 1, 2, 3, 4, 5];
let heroWalk = new Image();
heroWalk.src = 'hero/GraveRobber_walk.png'

function heroAnimWalk(){

        fps++;
        if(fps < 2){
            return;
        }
        fps = 0;
        ctx.clearRect(xh,yh,48, 48);
        drawFrame(heroWalk,arrayHeroWalk[i],0,xh ,yh);
        i++;
        if(i >= arrayHeroWalk.length){
            i = 0;
        }
}

//gauche
let arrayHeroWalkReverse = [5, 4, 3, 2, 1, 0];
let heroWalkReverse = new Image();
heroWalkReverse.src = 'hero/GraveRobber_walkReverse.png'

function heroAnimWalkReverse(){

        fps++;
        if(fps < 2){
            return;
        }
        fps = 0;
        ctx.clearRect(xh,yh,48, 48);
        drawFrame(heroWalkReverse,arrayHeroWalkReverse[i],0,xh,yh);
        i++;
        if(i >= arrayHeroWalkReverse.length){
            i = 0;
        }
}

// Animation de l'attack ----------------------------------------------

// droite
let heroAttack = new Image();
heroAttack.src = 'hero/GraveRobber_attack1.png';
let arrayHeroAttack = [0, 1, 2, 3, 4, 5]; // tableau séparent les sprite
// gauche
let heroAttackReverse = new Image();
heroAttackReverse.src = 'hero/GraveRobber_attack1Reverse.png';
let arrayHeroAttackReverse = [5, 4, 3, 2, 1, 0];


function heroAnimAttack(){
    fps++;
    if(fps < 2){
        return;
    }
    fps = 0;
    ctx.clearRect(xh,yh,48, 48);

    if(sence == 0){
        drawFrame(heroAttack,arrayHeroAttack[i],0,xh,yh);
        i++;
        if(i >= arrayHeroAttack.length){
            i = 0;
        }
    } else if(sence == 1){
        drawFrame(heroAttackReverse,arrayHeroAttackReverse[i],0,xh,yh);
        i++;
        if(i >= arrayHeroAttackReverse.length){
            i = 0;
        }
    }
}

// Declanchement animation ------------------------------------------------

document.addEventListener('keydown', toucheHeroAnimWalk)

function toucheHeroAnimWalk(e){
    let FLECHE_DROITE = 39;
    let FLECHE_GAUCHE = 37;
    let ESPACE = 32; 

    // avance a droite
    if(e.keyCode === FLECHE_DROITE){
        xh += vx
        posture = false;
        requestAnimationFrame(heroAnimWalk)
        sence = 0;
        bloqueMur()
    }

    // avance a gauche
    if(e.keyCode === FLECHE_GAUCHE){
        xh -= vx
        posture = false;
        requestAnimationFrame(heroAnimWalkReverse)
        sence = 1;
        bloqueMur()
    }

    // attack
    if(e.keyCode === ESPACE){
        posture = false;
        requestAnimationFrame(heroAnimAttack)
    }
}

// Bloquage des murs --------------------------------------------------

function bloqueMur(){

    // gauche
    if(xh <= -20){
        xh = -19
    }
    //droite
    if(xh >= 675){
        xh = 674
    }

}