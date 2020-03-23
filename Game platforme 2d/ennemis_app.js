// Variable -----------------------------------------------------------

let j = 0;
let fpsE = 0;
let veAnim = 3;

// function prédéfinie d'animation ------------------------------------

function drawFrameE(img, frameX, frameY, canvasX, canvasY){

    ctx2.drawImage(img, frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaleWidth, scaleHeight);

};

// Calcule de senceE -------------------------------------------------


/* pour savoir si les ennemis
   doivent marcher vers a droite ou gauche
*/

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

function oldManApparition(){
        
        if(senceE == 0){

            postureBaseOldMan();
            butWalkOldMan();
    
        } else if(senceE == 1){
            postureBaseOldManReverse();
            butWalkOldMan();
        };

};

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
        xe += veAnim;
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
        xe -= veAnim;
        if(j >= arrayOldManWalkReverse.length){
            j = 0;
        }
}

// Animation attack Old Man -----------------------------------------

// droite
let oldManAttack = new Image();
oldManAttack.src = 'ennemis/Old_man_attack.png';
let arrayOldManAttack = [0, 1, 2, 3];

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
    }
};

// Animation Old Man Mort --------------------------------------------

// droite
let oldManMort = new Image();
oldManMort.src = 'ennemis/Old_man_death.png';
let arrayOldManMort = [0, 1, 2, 3];

function oldManAnimMort(){

    fpsE++;
    if(fpsE < 3){
        return;
    };
    fpsE = 0;
    ctx2.clearRect(xe,yh,48, 48);
    drawFrameE(oldManMort,arrayOldManMort[j],0,xe,yh);
    j++;
    if(j >= arrayOldManMort.length){
        ctx2.clearRect(48,48,xe,yh)
    };
};

// gauche
let oldManMortReverse = new Image();
oldManMortReverse.src = 'ennemis/Old_man_deathReverse.png';
let arrayOldManMortReverse = [3, 2, 1, 0];

function oldManAnimMortReverse(){

    fpsE++;
    if(fpsE < 3){
        return;
    };
    fpsE = 0;
    ctx2.clearRect(xe,yh,48, 48);
    drawFrameE(oldManMortReverse,arrayOldManMortReverse[j],0,xe,yh);
    j++;
    if(j >= arrayOldManMortReverse.length){
        ctx2.clearRect(48,48,xe,yh)
    };
};



// But de Old Man -----------------------------------------------------

function oldManRevive(){
        
    vieOldMan = 10;
    //score += 10;
    //document.getElementById('score').innerHTML = `Score : ${score}`
    let xeRandom = Math.floor(Math.random(1) * 2)
    fpsE = 0;
    j = 0;
    if(xeRandom == 0){
        xe = -30
    } else if (xeRandom == 1){
        xe = 730
    }
}

function butWalkOldMan(){

    mortOldMan = false;

    if(vieOldMan > 0){

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

    } else if (vieOldMan <= 0){

    if(senceE == 0){ // droite

        setTimeout(function(){

            requestAnimationFrame(oldManAnimMort);
            butWalkOldMan();

            if(j >= arrayOldManMort.length){
                oldManRevive();
            }

        },30)

    }

    if(senceE == 1){ // gauche

        setTimeout(function(){

            requestAnimationFrame(oldManAnimMortReverse);
            butWalkOldMan();

            if(j >= arrayOldManMortReverse.length){
                oldManRevive();
            }
            
        },30)
    }
  } 
  
   /* if (vieOldMan == 0){

        setTimeout(function(){
            score += 10;
            document.getElementById('score').innerHTML = `Score : ${score}`;
        },500)
    } */
};


/*
---------------------------------
---------------------------------
---------------------------------
---------------------------------
---------------------------------
---------------------------------
---------------------------------
---------------------------------
---------------------------------
*/

// class OldManEnnemi{
//     constructor(xe, j, fpsE, senceE ){
//         this.xe = xe;
//         this.j = j;
//         this.fpsE = fpsE;
//         this.senceE = senceE;
//     }

// }