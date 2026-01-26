module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=UTF-8");

  if (req.url === "/snake") {
    res.end(`<!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <title>스네이크 게임</title>
        <!-- 스타일과 스크립트 그대로 -->
      </head>
      <body>
        <h1>스네이크 게임 🎮</h1>
        <div id="scoreboard">Score: 0</div>
        <canvas id="gameCanvas" width="400" height="400"></canvas>
        <button id="restartBtn">재시작</button>
        <script>
          // JS 코드 그대로
        </script>
      </body>
      </html>`);
  } else {
    res.end("<h1>홈페이지: /snake 로 접속하세요</h1>");
  }
};