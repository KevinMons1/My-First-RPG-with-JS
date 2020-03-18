let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d')

canvas2.width = 700;
canvas2.height = 200;

// Variable -----------------------------------------------------------

let j = 0;
let xe = 250;
let senceE = 0 // 0 = droite 1 = gauche
let fpsE = 0;

// function prédéfinie d'animation ------------------------------------

function drawFrameE(img, frameX, frameY, canvasX, canvasY){

    ctx2.drawImage(img, frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaleWidth, scaleHeight);

};

// Calcule de senceE -------------------------------------------------

// pour savoir si les ennemis
// doivent marcher vers a droite ou gauche

function calculeDuSenceE(){

    setTimeout(function(){

        if(xe < xh){
            senceE = 0;
        } else if(xe > xh){
            senceE = 1;
        }

        calculeDuSenceE();

    },500)

};
calculeDuSenceE()

// Old Man ------------------------------------------------------------

let oldMan = new Image();
oldMan.src = 'ennemis/Old_man.png'

oldMan.onload = function(){

    if(senceE == 0){

        postureBaseOldMan();
        butWalkOldMan();

    } else if(senceE == 1){
        postureBaseOldManReverse();
        butWalkOldManReverse();
    }
}

let oldManReverse = new Image();
oldManReverse.src = 'ennemis/Old_manReverse.png'

function postureBaseOldMan(){
        ctx2.clearRect(xe,yh,48,48)
        drawFrameE(oldMan,0,0,xe,yh)
}

function postureBaseOldManReverse(){
    ctx2.clearRect(xe,yh,48,48)
    drawFrameE(oldManReverse,0,0,xe,yh)
}

// Animation Walk Old Man ------------------------------------------

// droite
let arrayOldManWalk = [0, 1, 2, 3, 4, 5];
let oldManWalk = new Image();
oldManWalk.src = 'ennemis/Old_man_walk.png'

function oldManAnimWalk(){

        fpsE++;
        if(fpsE < 3){
            return;
        }
        fpsE = 0;
        ctx2.clearRect(xe,yh,48, 48);
        drawFrameE(oldManWalk,arrayOldManWalk[j],0,xe,yh);
        j++;
        xe += 3;
        if(j >= arrayOldManWalk.length){
            j = 0;
        }
}

// gauche
let arrayOldManWalkReverse = [5, 4, 3, 2, 1, 0];
let oldManWalkReverse = new Image();
oldManWalkReverse.src = 'ennemis/Old_man_walkReverse.png'

function oldManAnimWalkReverse(){

        fpsE++;
        if(fpsE < 3){
            return;
        }
        fpsE = 0;
        ctx2.clearRect(xe,yh,48, 48);
        drawFrameE(oldManWalkReverse,arrayOldManWalkReverse[j],0,xe,yh);
        j++;
        xe -= 3;
        if(j >= arrayOldManWalkReverse.length){
            j = 0;
        }
}

// Animation attack Old Man -----------------------------------------

// droite
let oldManAttack = new Image();
oldManAttack.src = 'ennemis/Old_man_attack.png';
let arrayOldManAttack = [0, 1, 2, 3]; // tableau séparent les sprite

// gauche
let oldManAttackReverse = new Image();
oldManAttackReverse.src = 'ennemis/Old_man_attackReverse.png';
let arrayOldManAttackReverse = [3, 2, 1, 0];

function oldManAnimAttack(){
    compteurForHurtHero++;
    fpsE++;
    if(fpsE < 2){
        return;
    }
    fpsE = 0;
    ctx2.clearRect(xe,yh,48,48);

    if(senceE == 0){
        drawFrameE(oldManAttack,arrayOldManAttack[j],0,xe,yh);
        j++;
        if(j >= arrayOldManAttack.length){
            j = 0;
        };
    } else if(senceE == 1){
        drawFrameE(oldManAttackReverse,arrayOldManAttackReverse[j],0,xe,yh);
        j++;
        if(j >= arrayOldManAttackReverse.length){
            j = 0;
        };
    };
};

// But de Old Man -----------------------------------------------------

function butWalkOldMan(){

        if(senceE == 0){ // avance vers la droite

            setTimeout(function(){

                if(xe >= xh - 20){

                    butWalkOldMan();
                    requestAnimationFrame(oldManAnimAttack)
                    requestAnimationFrame(heroAnimHurt)

                } else{
        
                    requestAnimationFrame(oldManAnimWalk);
                    butWalkOldMan();

            };
        },35);

    } else if(senceE == 1){ // avance vers la gauche

        setTimeout(function(){

            if(xe <= xh + 20){

                butWalkOldMan();
                requestAnimationFrame(oldManAnimAttack)
                requestAnimationFrame(heroAnimHurt)
    
            } else{
    
                requestAnimationFrame(oldManAnimWalkReverse);
                butWalkOldMan();

         };
      },35);
    };
};