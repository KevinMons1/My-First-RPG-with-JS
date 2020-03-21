let canvas3 = document.getElementById('canvas3');
let ctx3 = canvas2.getContext('2d')

canvas3.width = 700;
canvas3.height = 200;

// Variable -----------------------------------------------------------

let k = 0;
let senceB = 0; // 0 = droite 1 = gauche
let fpsB = 0;

// function prédéfinie d'animation ------------------------------------

function drawFrameB(img, frameX, frameY, canvasX, canvasY){

    ctx3.imageSmoothingEnabled = false;
    ctx3.drawImage(img, frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaleWidth * 2, scaleHeight * 2);

};

// Calcule de senceB -------------------------------------------------


/* pour savoir si les ennemis
   doivent marcher vers a droite ou gauche
*/

function calculeDuSenceB(){

    setTimeout(function(){

        if(xb < xh - 50){
            senceB = 0;
        } else if(xb > xh + 50){
            senceB = 1;
        }

        calculeDuSenceB();

    },500)

};
calculeDuSenceB()

// Old Woman ------------------------------------------------------------

let oldWoman = new Image();
oldWoman.src = 'ennemis/Old_woman.png';

let oldWomanReverse = new Image();
oldWomanReverse.src = 'ennemis/Old_womanReverse.png';

function apparitionOldWoman(){

        postureBaseOldWomanReverse();
        butWalkOldWoman();
};

function postureBaseOldWoman(){
    ctx3.clearRect(xb,yb,48,48)
    drawFrameB(oldWoman,0,0,xb,yh)
}

function postureBaseOldWomanReverse(){
    ctx3.clearRect(xb,yb,48,48)
    drawFrameB(oldWomanReverse,0,0,xb,yh)
}

// Animation Walk Old Woman ------------------------------------------

// droite
let arrayOldWomanWalk = [0, 1, 2, 3, 4, 5];
let oldWomanWalk = new Image();
oldWomanWalk.src = 'ennemis/Old_woman_walk.png'

function oldWomanAnimWalk(){

        fpsB++;
        if(fpsB < 3){
            return;
        }
        fpsB = 0;
        ctx3.clearRect(xb,yb,97, 97);
        drawFrameB(oldWomanWalk,arrayOldWomanWalk[k],0,xb,yb);
        k++;
        xb += veAnim;
        if(k >= arrayOldWomanWalk.length){
            k = 0;
        };
};

// gauche
let arrayOldWomanWalkReverse = [5, 4, 3, 2, 1, 0];
let oldWomanWalkReverse = new Image();
oldWomanWalkReverse.src = 'ennemis/Old_woman_walkReverse.png'

function oldWomanAnimWalkReverse(){

        fpsB++;
        if(fpsB < 3){
            return;
        }
        fpsB = 0;
        ctx3.clearRect(xb,yb,97, 97);
        drawFrameB(oldWomanWalkReverse,arrayOldWomanWalkReverse[k],0,xb,yb);
        k++;
        xb -= veAnim;
        if(k >= arrayOldWomanWalkReverse.length){
            k = 0;
        };
};

// Animation attack Old Woman -----------------------------------------

// droite
let oldWomanAttack = new Image();
oldWomanAttack.src = 'ennemis/Old_woman_attack.png';
let arrayOldWomanAttack = [0, 1, 2, 3];

// gauche
let oldWomanAttackReverse = new Image();
oldWomanAttackReverse.src = 'ennemis/Old_woman_attackReverse.png';
let arrayOldWomanAttackReverse = [3, 2, 1, 0];

function oldWomanAnimAttack(){
    compteurForHurtHero += 3;
    fpsB++;
    if(fpsB < 2){
        return;
    }
    fpsB = 0;
    ctx3.clearRect(xb,yb,97, 97);
    if(senceB == 0){
        drawFrameB(oldWomanAttack,arrayOldWomanAttack[k],0,xb,yb);
        k++;
        if(k >= arrayOldWomanAttack.length){
            k = 0;
        };
    } else if(senceB == 1){
        drawFrameB(oldWomanAttackReverse,arrayOldWomanAttackReverse[k],0,xb,yb);
        k++;
        if(k >= arrayOldWomanAttackReverse.length){
            k = 0;
        };
    }
};

// Animation Old Woman Mort --------------------------------------------

// droite
let oldWomanMort = new Image();
oldWomanMort.src = 'ennemis/Old_woman_death.png';
let arrayOldWomanMort = [0, 1, 2, 3];

function oldWomanAnimMort(){

    fpsB++;
    if(fpsB < 3){
        return;
    };
    fpsB = 0;
    ctx3.clearRect(xb,yb,97, 97);
    drawFrameB(oldWomanMort,arrayOldWomanMort[k],0,xb,yb);
    k++;
    if(b >= arrayOldWomanMort.length){
        ctx3.clearRect(xb,yb,97, 97);
    };
};

// gauche
let oldWomanMortReverse = new Image();
oldWomanMortReverse.src = 'ennemis/Old_woman_deathReverse.png';
let arrayOldWomanMortReverse = [3, 2, 1, 0];

function oldWomanAnimMortReverse(){

    fpsB++;
    if(fpsB < 3){
        return;
    };
    fpsB = 0;
    ctx3.clearRect(xb,yb,97, 97);
    drawFrameB(oldWomanMortReverse,arrayOldWomanMortReverse[K],0,xb,yb);
    k++;
    if(k >= arrayOldWomanMortReverse.length){
        ctx3.clearRect(xb,yb,97, 97);
    };
};



// But de Old Woman -----------------------------------------------------

function butWalkOldWoman(){

    if(vieOldWoman > 0){

        if(senceB == 0){ // avance vers la droite

            setTimeout(function(){

                if(xb >= xh - 40){

                    butWalkOldWoman();
                    requestAnimationFrame(oldWomanAnimAttack)
                    requestAnimationFrame(heroAnimHurt)

                } else{
        
                    requestAnimationFrame(oldWomanAnimWalk);
                    butWalkOldWoman();

                };
            },80);

        } else if(senceB == 1){ // avance vers la gauche

            setTimeout(function(){

                if(xb <= xh - 25){

                    butWalkOldWoman();
                    requestAnimationFrame(oldWomanAnimAttack)
                    requestAnimationFrame(heroAnimHurt)
        
                } else{
        
                    requestAnimationFrame(oldWomanAnimWalkReverse);
                    butWalkOldWoman();

                    };
            },80);
        };

    } else if (vieOldWoman <= 0){

    if(senceB == 0){ // droite

        setTimeout(function(){

            requestAnimationFrame(oldWomanAnimMort);
            butWalkOldWoman();

            // if(k >= arrayOldWomanMort.length){
            //     oldWomanRevive();
            // }

        },30)

    }

    if(senceB == 1){ // gauche

        setTimeout(function(){

            requestAnimationFrame(oldWomanAnimMortReverse);
            butWalkOldWoman();

            // if(k >= arrayOldWomanMortReverse.length){
            //     oldWomanRevive();
            // }
            
        },30)
    };
  };
};