const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 정적 파일 제공 (index.html, css, js)
app.use(express.static('public'));

// 디렉토리의 파일 목록을 JSON으로 반환
app.get('/data/:dir', (req, res) => {
    const directoryPath = path.join(__dirname, 'data', req.params.dir);
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('디렉토리 읽기 오류');
        }
        res.json(files); // 파일 목록을 JSON 형식으로 반환
    });
});

// 파일 내용 읽기
app.get('/data/:dir/:file', (req, res) => {
    const filePath = path.join(__dirname, 'data', req.params.dir, req.params.file);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('파일 읽기 오류');
        }
        res.send(data); // 파일 내용을 반환
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});