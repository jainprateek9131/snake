function init(){
canvas = document.getElementById("mycanva");
W=H=canvas.width=canvas.height=1000;
pen = canvas.getContext('2d');
cs=50;
score =5;
game_over=false;
food = getRandomFood();
food_img = new Image();
food_img.src = "apple.png";
trophy = new Image();
trophy.src = "trophy.png";

snake = {
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",

        createSnake:function(){
                for(var i=this.init_len;i>0;i--){
                        this.cells.push({x:i,y:0});
                }
        },

        drawSnake:function(){
                for(var i=0;i<this.cells.length;i++){
                        pen.fillStyle = this.color;
                        pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-1);
                }
        },
        updateSnake:function(){
                var headX = this.cells[0].x;
                var headY = this.cells[0].y;

                if(headX == food.x && headY==food.y){
                        console.log("foodeaten");
                        food=getRandomFood();
                        score++;
                }else{
                        this.cells.pop();
                }
                var nextX,nextY;

                        if(this.direction=="right"){
                                nextX = headX + 1;
                                nextY = headY;
                        }
                        else if(this.direction=="left"){
                                nextX = headX - 1;
                                nextY = headY;
                        }
                        else if(this.direction=="down"){
                                nextX = headX;
                                nextY = headY + 1;
                        }
                        else{
                                nextX = headX;
                                nextY = headY - 1;
                        }
                this.cells.unshift({x:nextX,y:nextY});
                var lastX = Math.round(W/cs);
                var lastY = Math.round(H/cs);
                if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].y>lastY || this.cells[0].x>lastX){
                        game_over=true;
                }
        }
        
};
snake.createSnake();
function keyfn(e){
        if(e.key == "ArrowUp"){
                snake.direction="up";
        }if(e.key == "ArrowDown"){
                snake.direction="down";
        }if(e.key == "ArrowRight"){
                snake.direction="right";
        }if(e.key == "ArrowLeft"){
                snake.direction="left";
        }
        console.log(snake.direction);
}
document.addEventListener('keydown',keyfn);
}
function draw(){
pen.clearRect(0,0,W,H);
snake.drawSnake();
pen.fillStyle=food.color;
pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
pen.drawImage(trophy,30,20,cs,cs);
pen.fillStyle="blue";
pen.font="25px Roboto";
pen.fillText(score,50,50);
}
function update(){
snake.updateSnake();
}
function getRandomFood(){
        var foodX = Math.round(Math.random()*(W-cs)/cs);
        var foodY = Math.round(Math.random()*(H-cs)/cs);
        var food = {
                x:foodX,
                y:foodY,
                color:"red"
        }
        return food;
}
function gameloop(){
        if(game_over==true){
                clearInterval(f);
                alert("gameover");
        }
draw();
update();
}
init();
f = setInterval(gameloop,100);