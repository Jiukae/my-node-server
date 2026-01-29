// 간단한 메모리 저장소 (연습용)
const users = {}; // { username: password }
let currentUser = null; // 로그인된 사용자 이름 저장

module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=UTF-8");

  // 메인 페이지
  if (req.url === "/") {
    res.end(`
      <!DOCTYPE html>
      <html lang="ko">
        <head>
          <meta charset="UTF-8">
          <title>The Snake Game</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;700;900&display=swap">
          <style>
            body {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;   
              height:100vh;
              margin:0;
              font-family: 'Outfit', sans-serif;
              flex-direction: column;
              text-align:center;
            }
            
            h1 {
              font-size: 64px;
              background: linear-gradient(90deg, #3498db, #8e44ad, #3498db);
              background-size: 200% auto;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              color: transparent;
              animation: gradientMove 2s linear infinite alternate,
                        updown 1s ease-in-out infinite alternate;
              position: relative;
              margin-top: 100px;
              text-align: center;
            }
            @keyframes gradientMove {
              from { background-position: 0% 50%; }
              to   { background-position: 100% 50%; }
            }
            @keyframes updown {
              from { transform: translateY(0); }
              to   { transform: translateY(-30px); }
            }
            p {
              font-weight: 100px;
              font-size: 30px
            }
            input {
              padding: 10px;
              font-size: 16px;
              margin-top: 20px;
            }
            button {
              padding: 10px 20px;
              font-size: 16px;
              margin-left: 10px;
            }
            header {
              position: absolute;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              display: flex;
              gap: 20px;
            }
            header a {
              text-decoration: none;
              color: white;
              font-weight: 400px;
              background: rgba(0,0,0,0.3);
              padding: 8px 12px;
              border-radius: 8px;
              font-size: 12px;

            }
            header a:hover {
              background: rgba(0,0,0,0.6);
            }
            .game-link {
              text-decoration: none;
              color: white;
              font-weight: bold;
              background: linear-gradient(45deg, #3498db, #8e44ad);
              padding: 16px 20px;
              border-radius: 8px;
              font-size: 20px;
            }
            a:hover {
              background: linear-gradient(45deg, #3498db, #8e44ad);
            }
            a {
              font-size: 20px;
              color: black;
              margin-right: 20px; /* 오른쪽에 20px 간격 */
              text-decoration: none;
              font-weight: 400px;
            }
            
            .layout {
              display: flex;
              height: 100%;
            }

            .sidebar {
              position: fixed;
              left: 0;
              top: 0;
              height: 100vh;
              width: 200px;
              background: #2c3e50;
              color: white;
              padding: 20px;
              box-shadow: 2px 0 5px rgba(0,0,0,0.1);
              animation: rainbowBg 20s linear infinite;
            }
            @keyframes rainbowBg {
              0%   { background-color: red; }
              16%  { background-color: orange; }
              33%  { background-color: yellow; }
              50%  { background-color: green; }
              66%  { background-color: blue; }
              83%  { background-color: violet; }
              100% { background-color: red; }
            }
            .main-content {
              background-image: url("https://img.freepik.com/free-photo/3d-christmas-winter-landscape-with-falling-snow_1048-17353.jpg?t=st=1769682466~exp=1769686066~hmac=9c32214e4cd17d678a5ef1b9433981e61bdfcaf6ed241a96a3feca1887ea3712");
              margin-left: 200px;        /* aside 너비만큼 오른쪽으로 밀기 */
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              color: white;
            }



          </style>
        </head>
        <body>
          <div class="layout">
            <aside class="sidebar">
              <h2>메뉴</h2>
              <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Register</a></li>
              </ul>
            </aside>
            <main class="main-content">
              <h1 id="title">The Snake Game</h1>
              <br>
              <p>Eat Apples • Dodge Walls • Survive Longer</p>
              <br>
              <a class="game-link" href="/snake">Game Start</a>
              <br>
              <br>
              <br>
              ${
                currentUser
                  ? `<p>User: ${currentUser}</p>`
                  : `<a href="/login">Login</a><a href="/signup">Register</a>`
              }
            </main>
          </div>
        </body>
      </html>
    `);
  }

  // 소개 페이지
  else if (req.url === "/about") {
    res.end(`
      <!<h1>소개 페이지</h1><p>이 서버는 Node.js로 만든 연습용 웹사이트입니다 😎</p><a href='/'>홈으로</a>`);
  }

  // 회원가입 GET
  else if (req.url === "/signup" && req.method === "GET") {
    res.end(`
      <h1>회원가입</h1>
      <form method="POST" action="/signup">
        <input name="username" placeholder="아이디" required /><br><br>
        <input name="password" type="password" placeholder="비밀번호" required /><br><br>
        <button type="submit">가입하기</button>
      </form>
      <a href="/login">로그인 페이지로</a>
    `);
  }

  // 회원가입 POST
  else if (req.url === "/signup" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const params = new URLSearchParams(body);
      const username = params.get("username");
      const password = params.get("password");
      if (users[username]) {
        res.end("<h1>이미 존재하는 아이디입니다 😅</h1><a href='/signup'>다시 시도</a>");
      } else {
        users[username] = password;
        res.end(`<h1>회원가입 성공 🎉</h1><p>${username}님 환영합니다!</p><a href='/login'>로그인하기</a>`);
      }
    });
  }

  // 로그인 GET
  else if (req.url === "/login" && req.method === "GET") {
    res.end(`
      <h1>로그인</h1>
      <form method="POST" action="/login">
        <input name="username" placeholder="아이디" required /><br><br>
        <input name="password" type="password" placeholder="비밀번호" required /><br><br>
        <button type="submit">로그인</button>
      </form>
      <a href="/signup">회원가입 페이지로</a>
    `);
  }

  // 로그인 POST
  else if (req.url === "/login" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const params = new URLSearchParams(body);
      const username = params.get("username");
      const password = params.get("password");
      if (users[username] && users[username] === password) {
        currentUser = username; // 로그인 성공 시 저장
        res.end(`<h1>로그인 성공 🎉</h1><p>${username}님 환영합니다!</p><a href='/'>홈으로</a>`);
      } else {
        res.end("<h1>로그인 실패 ❌</h1><a href='/login'>다시 시도</a>");
      }
    });
  }



  // 스네이크 게임
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
  <a href="/">홈으로 돌아가기</a>
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
    res.statusCode = 404;
    res.end("<h1>404 Not Found</h1><a href='/'>홈으로 돌아가기</a>");
  }
};