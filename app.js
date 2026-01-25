const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <title>내 첫 서버</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f8ff;
          text-align: center;
          padding-top: 50px;
        }
        h1 {
          color: #2c3e50;
        }
        p {
          color: #16a085;
          font-size: 18px;
        }
        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #3498db;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
        .button:hover {
          background-color: #2980b9;
        }
      </style>
    </head>
    <body>
      <h1>안녕하세요! Node.js 서버 🚀</h1>
      <p>포트 ${PORT}에서 실행 중입니다.</p>
      <a href="/about" class="button">소개 페이지로 이동</a>
    </body>
    </html>
  `);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});