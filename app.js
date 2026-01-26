const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=UTF-8");

  if (req.url === "/") {
    res.end(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <title>메인 페이지</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f0f8ff; text-align: center; padding-top: 50px; }
          h1 { color: #2c3e50; }
          p { color: #16a085; font-size: 18px; }
          a { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #3498db; color: white; text-decoration: none; border-radius: 5px; }
          a:hover { background: #2980b9; }
        </style>
      </head>
      <body>
        <h1>메인 페이지</h1>
        <p>환영합니다! 🚀</p>
        <a href="/about">소개 페이지로 이동</a>
      </body>
      </html>
    `);
  } else if (req.url === "/about") {
    res.end(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <title>소개 페이지</title>
        <style>
          body { font-family: Arial, sans-serif; background: #fffaf0; text-align: center; padding-top: 50px; }
          h1 { color: #8e44ad; }
          p { color: #2c3e50; font-size: 18px; }
          a { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #e67e22; color: white; text-decoration: none; border-radius: 5px; }
          a:hover { background: #d35400; }
        </style>
      </head>
      <body>
        <h1>소개 페이지</h1>
        <p>이 서버는 Node.js로 만든 연습용 웹사이트입니다 😎</p>
        <a href="/">홈으로 돌아가기</a>
      </body>
      </html>
    `);
  } else {
    res.statusCode = 404;
    res.end(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <title>404 오류</title>
      </head>
      <body style="text-align:center; padding-top:50px; font-family:Arial;">
        <h1>404 - 페이지를 찾을 수 없습니다</h1>
        <a href="/">홈으로 돌아가기</a>
      </body>
      </html>
    `);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});