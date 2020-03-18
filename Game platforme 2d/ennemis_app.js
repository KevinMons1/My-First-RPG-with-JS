// Variable -----------------------------------------------------------

let j = 0;
let xe = 500;
let senceE = 0 // 0 = droite 1 = gauche
let fpsE = 0;


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
        ctx.clearRect(xe,yh,48,48)
        drawFrame(oldMan,0,0,xe,yh)
}

function postureBaseOldManReverse(){
    ctx.clearRect(xe,yh,48,48)
    drawFrame(oldManReverse,0,0,xe,yh)
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
        ctx.clearRect(xe,yh,48, 48);
        drawFrame(oldManWalk,arrayOldManWalk[j],0,xe ,yh);
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
        ctx.clearRect(xe,yh,48, 48);
        drawFrame(oldManWalkReverse,arrayOldManWalkReverse[j],0,xe ,yh);
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
oldManAttackReverse.src = 'ennemis/Old_man_attack.png';
let arrayoldManAttackReverse = [3, 2, 1, 0];

function oldManAnimAttack(){

}

// But de Old Man -----------------------------------------------------

function butWalkOldMan(){

        if(senceE == 0){ // avance vers la droite

            setTimeout(function(){

                if(xe >= xh - 50){

                    butWalkOldMan();
                    postureBaseOldMan();
        
                } else{
        
                    requestAnimationFrame(oldManAnimWalk);
                    butWalkOldMan();

            }
        },35)

    } else if(senceE == 1){ // avance vers la gauche

        setTimeout(function(){

            if(xe <= xh + 50){

                butWalkOldMan();
                postureBaseOldManReverse();
    
            } else{
    
                requestAnimationFrame(oldManAnimWalkReverse);
                butWalkOldMan();
         }
      },35)
    }
    
}