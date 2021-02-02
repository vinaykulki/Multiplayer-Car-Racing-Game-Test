var ball;
var position,database;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballref = database.ref('ball/position');
    ballref.on("value",readPosition,errorPosition);
}
function updatePosition(x,y){
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    });

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        updatePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        updatePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
        updatePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        updatePosition(0,+5);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}
function errorPosition(){
    console.log("error inside the data base")
}