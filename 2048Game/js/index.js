var board=[];
var score=0;
var hasMerged=[];
InitArr();
//初始化数组
function InitArr() {
    for(let i=0;i<4;i++){
        board[i]=[];
        hasMerged[i]=[];
        for (let j=0;j<4;j++){
            board[i][j]=0;
            hasMerged[i][j]=false;
        }
    }
}
//onload事件 加载页面
$(function () {
    InitGame();
});
//移动格子
function moveTok(fromx, fromy,tox, toy) {
    var cell=$('#number-cell-'+fromx+'-'+fromy);
    cell.animate({
        top:20+tox*110+'px',
        left:20+toy*110+'px',
    },200);
}
//是否能向左移动
function canMoveToLeft() {
    for (let i=0;i<4;i++){
        for (let j=1;j<4;j++){
            if(board[i][j]!=0){
                if (board[i][j-1]==0||board[i][j]==board[i][j-1]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//是否能向右移动
function canMoveToRight() {
    for (var i=0;i<4;i++){
        for (var j=0;j<3;j++){
            if(board[i][j]!=0){
                if (board[i][j+1]==0||board[i][j]==board[i][j+1]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//是否能向上移动
function canMoveToUp() {
    for (var i=1;i<4;i++){
        for (var j=0;j<4;j++){
            if(board[i][j]!=0){
                if (board[i-1][j]==0||board[i-1][j]==board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//是否能向下移动
function canMoveToDown() {
    for (var i=0;i<3;i++){
        for (var j=0;j<4;j++){
            if(board[i][j]!=0){
                if (board[i+1][j]==0||board[i+1][j]==board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//左移中  判断两个格子之间是否为空格子
function noBlockBetweenLeft(row,col1,col2,board) {
    for (let i=col1+1;i<col2;i++){
        if (board[row][i]!=0){
            return false;
        }
    }
    return true;
}
//右移中  判断两个格子之间是否为空格子
function noBlockBetweenRight(row,col1,col2,board) {
    for (let i=col1-1;i>col2;i--){
        if (board[row][i]!=0){
            return false;
        }
    }
    return true;
}
//上移中  判断两个格子之间是否为空格子
function noBlockBetweenUp(row1,row2,col,board) {
    for (let i=row1-1;i>row2;i--){
        if (board[i][col]!=0){
            return false;
        }
    }
    return true;
}
//下移中  判断两个格子之间是否为空格子
function noBlockBetweenDown(row1,row2,col,board) {
    for (let i=row1+1;i<row2;i++){
        if (board[i][col]!=0){
            return false;
        }
    }
    return true;
}
//键盘左  整体向左移动
function moveLeft() {
    if(!canMoveToLeft()){
        return false;
    }else {
        for (var i=0;i<4;i++){
            for (var j=1;j<4;j++) {
                if(board[i][j]!=0){
                    for (var k=0;k<j;k++){
                        if(board[i][k]==0&&noBlockBetweenLeft(i,k,j,board)){
                            moveTok(i,j,i,k);
                            board[i][k]=board[i][j];
                            board[i][j]=0;
                        }else if (board[i][k]==board[i][j]&&noBlockBetweenLeft(i,k,j,board)&&!hasMerged[i][k]) {
                            moveTok(i,j,i,k);
                            board[i][k]+=board[i][j];
                            board[i][j]=0;
                            hasMerged[i][k]=true;
                            score+=board[i][k];
                            updateScore(score);
                        }
                    }
                }
            }
        }
    }
    setTimeout(updateBoard(),200);
    return true;
}
//键盘右  整体向右移动
function moveRight() {
    if(!canMoveToRight()){
        return false;
    }else {
        for (var i=0;i<4;i++){
            for (var j=2;j>=0;j--) {
                if(board[i][j]!=0){
                    for (var k=3;k>j;k--){
                        if(board[i][k]==0&&noBlockBetweenRight(i,k,j,board)){
                            moveTok(i,j,i,k);
                            board[i][k]=board[i][j];
                            board[i][j]=0;
                        }else if (board[i][k]==board[i][j]&&noBlockBetweenRight(i,k,j,board)&&!hasMerged[i][k]) {
                            moveTok(i,j,i,k);
                            board[i][k]+=board[i][j];
                            board[i][j]=0;
                            score+=board[i][k];
                            updateScore(score);
                            hasMerged[i][k]=true;
                        }
                    }
                }
            }
        }
    }
    setTimeout(updateBoard(),200);
    return true;
}
//键盘上  整体向上移动
function moveUp() {
    if(!canMoveToUp()){
        return false;
    }else {
        for (var i=1;i<4;i++){
            for (var j=0;j<4;j++) {
                if(board[i][j]!=0){
                    for (var k=0;k<i;k++){
                        if(board[k][j]==0&&noBlockBetweenUp(i,k,j,board)){
                            moveTok(i,j,k,j);
                            board[k][j]=board[i][j];
                            board[i][j]=0;
                        }else if (board[k][j]==board[i][j]&&noBlockBetweenUp(i,k,j,board)&&!hasMerged[k][j]) {
                            moveTok(i,j,k,j);
                            board[k][j]+=board[i][j];
                            board[i][j]=0;
                            score+=board[k][j];
                            hasMerged[k][j]=true;
                            updateScore(score);
                        }
                    }
                }
            }
        }
    }
    setTimeout(updateBoard(),200);
    return true;
}
//键盘下  整体向下移动
function moveDown() {
    if(!canMoveToDown()){
        return false;
    }else {
        for (var i=2;i>=0;i--){
            for (var j=0;j<4;j++) {
                if(board[i][j]!=0){
                    for (var k=3;k>i;k--){
                        if(board[k][j]==0&&noBlockBetweenDown(i,k,j,board)){
                            moveTok(i,j,k,j);
                            board[k][j]=board[i][j];
                            board[i][j]=0;
                        }else if (board[k][j]==board[i][j]&&noBlockBetweenDown(i,k,j,board)&&!hasMerged[k][j]) {
                            moveTok(i,j,k,j);
                            board[k][j]+=board[i][j];
                            board[i][j]=0;
                            hasMerged[k][j]=true;
                            score+=board[k][j];
                            updateScore(score);
                        }
                    }
                }
            }
        }
    }
    setTimeout(updateBoard(),200);
    return true;
}
//更新分数
function updateScore(score){
    var objScore=$('#score');
    objScore.text(score);
}
//判断所有格子是否能移动
function nomove() {
    if(canMoveToDown()||canMoveToLeft()||canMoveToRight()||canMoveToUp()){
        return false;
    }
    return true;
}
//判断是否没有空格子
function nospace() {
    for (let i=0;i<4;i++){
        for (let j=0;j<4;j++){
            if (board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}
//判断游戏是否结束
function isgameover() {
    if (nospace()&&nomove()){
        return true;
    }
    return false;
}
//游戏结束动作
function gameover() {
    $('#grid-container').append('<div class="gameoverUI" id="gameoverUI" onclick="Restart()"><p>本次得分:  <span>'+score+'</span></p><div><a href="javascript:Restart()">再来一次</a></div></div>');
}
//移动格子后的动作
function doNext(){
    generateOneNumber();
    if(isgameover()){
        gameover();
    }
}
//键盘控制 上下左右
$(document).keydown(function (event) {
    switch (event.keyCode){
        case 37:
            if (moveLeft()){
                doNext();
            }
            break;
        case 38:
            if (moveUp()){
                doNext();
            }
            break;
        case 39:
            if (moveRight()){
                doNext();
            }
            break;
        case 40:
            if (moveDown()){
                doNext();
            }
            break;
    }
});
//更新格子情况
function updateBoard() {
    $('.number-cell').remove();
    for (var i=0;i<4;i++){
        for (var j=0;j<4;j++){
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var  cell=$('#number-cell-'+i+'-'+j);
            if(board[i][j]==0){
                cell.css('width','0px');
                cell.css('height','0px');
                cell.css('left',20+j*110+'px');
                cell.css('top',20+i*110+'px');
            }else {
                cell.css('width','100px');
                cell.css('height','100px');
                cell.css('left',20+j*110+'px');
                cell.css('top',20+i*110+'px');
                cell.css('backgroundColor',getBackGroundColorByNumber(board[i][j]));
                cell.css('color',getColorByNumber(board[i][j]));
                cell.text(board[i][j]);
            }
            hasMerged[i][j]=false;
        }
    }
}
//放置格子
function InitNumber(x, y, value) {
    var  cell=$('#number-cell-'+x+'-'+y);
    cell.css('backgroundColor',getBackGroundColorByNumber(board[x][y]));
    cell.css('color',getColorByNumber(board[x][y]));
    cell.text(value);
    cell.animate({
        width:'100px',
        height:'100px',
        left:20+y*110+'px',
        top:20+x*110+'px'
    },50);
}
//随机生成一个格子
function generateOneNumber() {
    var randX=parseInt(Math.floor(Math.random()*4));
    var randY=parseInt(Math.floor(Math.random()*4));
    while (true){
        if (board[randX][randY]===0){
            break;
        }
        randX=parseInt(Math.floor(Math.random()*4));
        randY=parseInt(Math.floor(Math.random()*4));
    }
    var randNumber=Math.random()<0.5?2:4;
    board[randX][randY]=randNumber;
    InitNumber(randX,randY,board[randX][randY]);
}
//不同数字对应不同的背景颜色
function getBackGroundColorByNumber(number) {
    switch (number){
        case 2: return '#eee4da';break;
        case 4: return '#eed0cf';break;
        case 8: return '#e8d2ee';break;
        case 16: return '#c4c0ee';break;
        case 32: return '#6b8dee';break;
        case 64: return '#9ceee8';break;
        case 128: return '#9eeed9';break;
        case 256: return '#89ee8d';break;
        case 512: return '#c2ee86';break;
        case 1024: return '#eeed80';break;
        case 2048: return '#eec37a';break;
        case 4096: return '#ee9154';break;
        case 8192: return '#ee4a53';break;
    }
}
//不同数字的颜色
function getColorByNumber(number) {
    if(number<4){
        return '#776e65';
    }
    else {
        return 'white';
    }
}
//重新开始游戏
function newGame() {
    updateScore(0);
    InitArr();
    InitGame();
}
//初始化游戏界面
function InitGame() {
    updateBoard();
    generateOneNumber();
    generateOneNumber();
}
//重新开始游戏
function Restart() {
    $('#gameoverUI').remove();
    newGame();
}