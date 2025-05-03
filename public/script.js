const directorySelect = document.getElementById('directorySelect');
const fileSelect = document.getElementById('fileSelect');
const fileContent = document.getElementById('fileContent');

// 디렉토리 선택 시 파일 목록을 업데이트
directorySelect.addEventListener('change', function() {
    const directory = directorySelect.value;

    if (directory) {
        fetch(`/data/${directory}`)
            .then(response => response.json())
            .then(files => {
                // 파일 목록을 갱신
                fileSelect.innerHTML = '<option value="">파일 선택</option>';
                files.forEach(file => {
                    const option = document.createElement('option');
                    option.value = file;
                    option.textContent = file;
                    fileSelect.appendChild(option);
                });
                fileSelect.disabled = false;  // 파일 선택 가능
            })
            .catch(error => console.error('디렉토리 파일 목록을 가져오는 데 오류가 발생했습니다.', error));
    } else {
        fileSelect.disabled = true;  // 파일 선택 불가능
    }
});

// 파일 선택 시 파일 내용 표시
fileSelect.addEventListener('change', function() {
    const file = fileSelect.value;

    if (file) {
        fetch(`/data/${directorySelect.value}/${file}`)
            .then(response => response.text())
            .then(content => {
                fileContent.textContent = content;  // 파일 내용 표시
            })
            .catch(error => console.error('파일을 가져오는 데 오류가 발생했습니다.', error));
    } else {
        fileContent.textContent = '';  // 파일이 선택되지 않았을 경우
    }
});