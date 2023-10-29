
$(document).ready(function () {
    const grid = $('.gridCanva');
    let isGameOver = false;
    let platformCount = 5;
    let doodleLeftSpace = 50;
    let startPoint = 10;
    let doodleBottomSpace = startPoint;
    let platforms = [];  
    let upTimerId;
    const doodle = document.createElement('div');
    let downTimerId = '';
    let isJumping = true;
    let isGoingRight = false;
    let isGoingLeft = false;
    let rightTimerId;
    let leftTimerId;
    let score = 0;
    
  


    function Platform (newPlatBottom){
        this.bottom = newPlatBottom;
        this.left = Math.random() * 315;
        this.visual = document.createElement('div');
        const visual = this.visual;
        visual.classList.add('platform');
        visual.style.left = this.left + 'px';
        visual.style.bottom = this.bottom + 'px';
        grid.append(visual);
    }
    function createPlatforms(){
        for (let i = 0; i < platformCount; i++) {
            let platformGap = 600 / platformCount;
             let newPlatBottom = 100 + i * platformGap;
             let newPlatform = new Platform(newPlatBottom);
             platforms.push(newPlatform);
             console.log(newPlatform)
        }
    }

        function createDoodle(){
            
            $(doodle).addClass('doodler');  
            grid.append(doodle);
            doodleLeftSpace = platforms[0].left + 18;
            doodleBottomSpace = platforms[0].bottom + 20;
            doodle.style.left = doodleLeftSpace + 'px';
            doodle.style.bottom = doodleBottomSpace + 'px';
        }
   
        function movingPlatforms(){
            platforms.forEach( platform =>{
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';
                if (platform.bottom < 0){
                    let firsPlatform = platforms[0].visual;
                    firsPlatform.classList.remove('platform')
                    platforms.shift()
                    score++;
                    let newPlatform = new Platform(600);
                    platforms.push(newPlatform);
                }
            });
        }

       function jump(){
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function(){
            doodleBottomSpace += 20;
            doodle.style.bottom = doodleBottomSpace + 'px';
            if (doodleBottomSpace >startPoint + 250 ){
                fall();
            }
        },30)
       }
       function fall(){
        clearInterval(upTimerId);
        isJumping = false;
        downTimerId = setInterval(function(){
            doodleBottomSpace -= 5;
            doodle.style.bottom = doodleBottomSpace + 'px';
            if ( doodleBottomSpace <= 0){
                gameOver();
            }
            platforms.forEach(platform =>{
                if(
                    (doodleBottomSpace >= platform.bottom) &&
                    (doodleBottomSpace <= platform.bottom + 20) &&
                    ((doodleLeftSpace + 60) >= platform.left) &&
                    (doodleLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ){
                    startPoint = doodleBottomSpace;
                    jump();
                }
            })
        }, 30) 
       }

       function gameOver(){
        isGameOver = true;
        while(grid.firsChild){
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
       }
       function moveRight(){
        if (isGoingLeft){
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }
        isGoingRight = true;
        rightTimerId = setInterval(function(){
            if(doodleLeftSpace <=340){
                doodleLeftSpace +=5;
                doodle.style.left = doodleLeftSpace + 'px';
            } else moveLeft()
        }, 20)
       }
       function moveLeft(){
        if (isGoingRight){
            clearInterval(rightTimerId)
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerId = setInterval(function(){
            if(doodleLeftSpace >=0){
                doodleLeftSpace -=5;
                doodle.style.left = doodleLeftSpace + 'px';
            } else moveRight()
            
        }, 20)
       }

       function moveStraigth(){
        isGoingLeft = false;
        isGoingRight = false;
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
       }
       function control(e){
        document.addEventListener('keyup', function(event){
            var button = event.key;
            console.log(event)
            switch (button) {
                case 'ArrowRight':
                    moveRight();
                    break;
               
                case 'ArrowLeft':
                    moveLeft();
                    break;
                
                case 'ArrowUp':
                    moveStraigth();
                    break;
             
                case 'ArrowDown':
                    console.log(button)
                    break;
        
                default:
                break;
            }
        })
       }
        function start(){
            if (!isGameOver){
                createPlatforms();
                createDoodle(); 
            }
         } 



        start();
        $('.button1').click(function () {
            setInterval(movingPlatforms, 60);
            control();
            jump();
            $(".button1").addClass('erase');
           
        });
        $('.button2').click(function () {
            document.location.reload();
        });
       
});
