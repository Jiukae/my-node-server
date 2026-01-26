// Vercel용 Node.js 핸들러
module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=UTF-8");

  if (req.url === "/") {
    res.end("<h1>홈페이지 🎉</h1><p>/snake 로 게임을 즐기거나 /about 페이지를 확인하세요.</p>");
  }

  else if (req.url === "/about") {
    res.end("<h1>About 페이지</h1><p>이 프로젝트는 Vercel에 배포된 Node.js 서버로 만든 스네이크 게임입니다 🐍</p>");
  }

  else if (req.url === "/snake") {
    res.end(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>스네이크 게임</title>
  <style>
    body { margin:0; display:flex; flex-direction:column; align-items:center; justify-content:center;
           height:100vh; background:linear-gradient(135deg,#1abc9c,#2c3e50); font-family:'Segoe UI',sans-serif; color:white; }
    h1 { margin-bottom:10px; text-shadow:2px 2px 5px rgba(0,0,0,0.5); }
    #scoreboard { font-size:24px; font-weight:bold; margin-bottom:20px; padding:10px 20px;
                  background:rgba(0,0,0,0.4); border-radius:10px; box-shadow:0 0 10px rgba(255,255,255,0.7); }
    canvas { background:rgba(255,255,255,0.1); border:3px solid #fff; border-radius:10px; box-shadow:0 0 20px rgba(0,0,0,0.7); }
    #restartBtn { margin-top:20px; padding:10px 20px; font-size:18px; font-weight:bold; color:#fff; background:#e74c3c;
                  border:none; border-radius:8px; cursor:pointer; box-shadow:0 0 10px rgba(0,0,0,0.5); }
    #restartBtn:hover { background:#c0392b; }
  </style>
</head>
<body>
  <h1>스네이크 게임 🎮</h1>
  <div id="scoreboard">Score: 0</div>
  <canvas id="gameCanvas" width="400" height="400"></canvas>
  <button id="restartBtn">재시작</button>
  <script>
    const canvas=document.getElementById("gameCanvas");const ctx=canvas.getContext("2d");
    const scoreboard=document.getElementById("scoreboard");const restartBtn=document.getElementById("restartBtn");
    const box=20;let snake,direction,food,score,game;
    function init(){snake=[{x:9*box,y:10*box}];direction="RIGHT";
      food={x:Math.floor(Math.random()*19+1)*box,y:Math.floor(Math.random()*19+1)*box};
      score=0;scoreboard.textContent="Score: "+score;if(game)clearInterval(game);game=setInterval(draw,100);}
    document.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"&&direction!=="RIGHT")direction="LEFT";
      else if(e.key==="ArrowUp"&&direction!=="DOWN")direction="UP";
      else if(e.key==="ArrowRight"&&direction!=="LEFT")direction="RIGHT";
      else if(e.key==="ArrowDown"&&direction!=="UP")direction="DOWN";});
    restartBtn.addEventListener("click",()=>{init();});
    function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="red";ctx.fillRect(food.x,food.y,box,box);
      for(let i=0;i<snake.length;i++){ctx.fillStyle=i===0?"#2ecc71":"#27ae60";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);ctx.strokeStyle="#1e8449";ctx.strokeRect(snake[i].x,snake[i].y,box,box);}
      let snakeX=snake[0].x;let snakeY=snake[0].y;
      if(direction==="LEFT")snakeX-=box;if(direction==="UP")snakeY-=box;
      if(direction==="RIGHT")snakeX+=box;if(direction==="DOWN")snakeY+=box;
      if(snakeX===food.x&&snakeY===food.y){score++;scoreboard.textContent="Score: "+score;
        food={x:Math.floor(Math.random()*19+1)*box,y:Math.floor(Math.random()*19+1)*box};}
      else{snake.pop();}
      const newHead={x:snakeX,y:snakeY};
      if(snakeX<0||snakeY<0||snakeX>=canvas.width||snakeY>=canvas.height||snake.some(seg=>seg.x===newHead.x&&seg.y===newHead.y)){
        clearInterval(game);alert("게임 오버! 점수: "+score);}
      snake.unshift(newHead);}
    init();
  </script>
</body>
</html>`);
  }

  else {
    res.end("<h1>404 Not Found</h1><p>존재하지 않는 경로입니다.</p>");
  }
};