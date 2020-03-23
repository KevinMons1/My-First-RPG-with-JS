
let playGame = document.getElementById('btnPlay');
let game = false;

playGame.addEventListener('click', function(){

    game = true;
    document.getElementById('menu').style.display = 'none';

    musique();
    heroApparition();
    oldManApparition();
    tempsSurvie();

})

// Canvas -------------------------------------------------------------

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')

canvas.width = 700;
canvas.height = 200;

let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');

canvas2.width = 700;
canvas2.height = 200;

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
let xe = -30;
let xb = 640;
let yb = 100;
let posture = true;
let sence = 0; // 0 = droitre 1 = gauche
let senceE = 0; // 0 = droite 1 = gauche
let senceB = 0; // 0 = droite 1 = gauche
let compteurForHurtHero = 0;
let vieHero = 0;
let arrayVieHero = ['❤️❤️❤️❤️❤️', '❤️❤️❤️❤️', '❤️❤️❤️', '❤️❤️', '❤️']
let vieOldMan = 10;
let vieOldWoman = 50;
//let score = 0;
let survie = 1;

// function prédéfinie d'animation ------------------------------------

function drawFrame(img, frameX, frameY, canvasX, canvasY){

    ctx.drawImage(img, frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaleWidth, scaleHeight);

};

function gainVie(){

    setTimeout(function(){
        
        if(vieHero >= 1){
            let audioVie = new Audio('gainVie.mp3');
            audioVie.play();
            vieHero--;
            perteVie();
        }

        gainVie();
    },30000);

};
gainVie();

function perteVie(){

    document.getElementById('vie').innerHTML = arrayVieHero[vieHero]

    if(vieHero == 5){
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('votreScore').innerHTML = `Vous avez tenu ${survie} secondes !`
    };

};

function musique(){
    let audio = new Audio('music.mp3');
    audio.play();
}

// Posture de base ------------------------------------------------------

let hero = new Image();
hero.src = 'hero/GraveRobber.png'

function heroApparition(){

        postureBase();

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

        // vie de l'enemie
        if(xh + 20 >= xe && senceE == 1){
            vieOldMan--
        }

        // vie Boss
        if(xh + 10 >= xb && senceB == 1){
            vieOldWoman--
        }

    } else if(sence == 1){

        drawFrame(heroAttackReverse,arrayHeroAttackReverse[i],0,xh,yh);
        i++;
        if(i >= arrayHeroAttackReverse.length){
            i = 0;
        } 

        // vie de l'enemie
        if(xh + 20 >= xe && senceE == 0){
            vieOldMan--
        }

        // vie Boss
        if(xh - 10 <= xb && senceB == 0){
            vieOldWoman--
        }
    }
    console.log('Ennemis : ' + vieOldMan)
    console.log('Boss : ' + vieOldWoman)
}

// Animation blesser -----------------------------------------------------

let heroHurt = new Image();
heroHurt.src = 'hero/GraveRobber_hurt.png';

let heroHurtReverse = new Image();
heroHurtReverse.src = 'hero/GraveRobberReverse_hurt.png';

function heroAnimHurt(){

    if(sence == 0){

        if(!(compteurForHurtHero <= 60)){
            fps++;
            if(fps < 2){
                return;
            }
            fps = 0;
            ctx.clearRect(xh,yh,48, 48);
            drawFrame(heroHurt,1,0,xh,yh);
            vieHero++;
            perteVie()
            compteurForHurtHero = 0;
        };
    } else if(sence == 1){

        if(!(compteurForHurtHero <= 60)){
            fps++;
            if(fps < 2){
                return;
            }
            fps = 0;
            ctx.clearRect(xh,yh,48, 48);
            drawFrame(heroHurtReverse,1,0,xh,yh);
            vieHero++;
            perteVie()
            compteurForHurtHero = 0;
        };
    };
};

// Declanchement animation ------------------------------------------------

document.addEventListener('keydown', toucheHeroAnimWalk)

function toucheHeroAnimWalk(e){
    let FLECHE_DROITE = 39;
    let FLECHE_GAUCHE = 37;
    let ESPACE = 32; 

    // avance a droite
    if(e.keyCode === FLECHE_DROITE){
        xh += vx;
        posture = false;
        requestAnimationFrame(heroAnimWalk);
        sence = 0;
        bloqueMur();
    };

    // avance a gauche
    if(e.keyCode === FLECHE_GAUCHE){
        xh -= vx;
        posture = false;
        requestAnimationFrame(heroAnimWalkReverse);
        sence = 1;
        bloqueMur();
    }

    // attack
    if(e.keyCode === ESPACE){
        posture = false;
        requestAnimationFrame(heroAnimAttack);
    };
};

// Bloquage des murs --------------------------------------------------

function bloqueMur(){

    // gauche
    if(xh <= -20){
        xh = -19;
    }
    //droite
    if(xh >= 675){
        xh = 674;
    };

};

function tempsSurvie(){


    setTimeout(function(){
        survie++;
        document.getElementById('tempsSurvieHTML').innerHTML =
        `Survie : ${survie} secondes`;
        tempsSurvie();
    },1000)

    if(survie == 30 || survie == 150 || survie == 300 || survie == 500|| survie == 750){
        butWalkOldWoman()
        ctx3.clearRect(xb,yb,96,96)
        ctx2.clearRect(xe,yh,48,48)
        xe = -800;
        xb = 640;
        vieOldWoman = 50;
    };

}
