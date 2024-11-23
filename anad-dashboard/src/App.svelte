<script>
  import { onMount, onDestroy } from 'svelte';
  import Form from './lib/Form.svelte';
  import Console from './lib/Console.svelte';
  import OptionsModal from './lib/OptionsModal.svelte';
  import { marked } from 'marked'; // marked 라이브러리 임포트

  import { inputArguments } from './lib/store'; 
  import optionsData from './lib/options.json';

  marked.setOptions({
    gfm: true, // GitHub Flavored Markdown 사용
    breaks: true, // 줄바꿈을 허용
    sanitize: false, // HTML을 허용 (true로 설정하면 HTML이 제거됨)
  });

  let ws;
  let fileWs; 
  let messages = [];
  let file_messages = [];
  let wsLogs = [];
  let inputMessage = '';
  let isChecked = true;
  let showModal = false;
  let selectedOptions = [];
  let logIdCounter = 0; // 로그 ID 카운터 추가
  let currentArguments; // store 값을 저장할 변수
  let isFileViewerVisible = false; // 파일 뷰어 가시성 상태 추가
  let fileViewerContent = ''; // 파일 내용을 저장할 변수 추가
  let isFileViewerConnected = false; // 파일 뷰어 연결 상태 추가
  let fileViewerFiles = new Map(); // 파일 이름과 내용을 저장할 Map 객체로 변경
  let selectedFile = null; // 선택된 파일을 저장할 변수 추가

  // store 구독
  inputArguments.subscribe(value => {
    currentArguments = value;
  });

  function toggleFileViewer() {
    isFileViewerVisible = !isFileViewerVisible; // 파일 뷰어 가시성 토글
  }

  function connectFileWebSocket() {
    fileWs = new WebSocket('ws://192.168.16.218:5678');
    addLog('info', '파일 웹소켓 연결 시도 중...');

    fileWs.onopen = () => {
      addLog('success', '파일 웹소켓 연결 성공!');
    };

    fileWs.onmessage = (event) => {
      
      const data = JSON.parse(event.data); // 수신한 데이터를 JSON으로 파싱
      if (Array.isArray(data) && data.length > 0) {
        data.forEach(({ file, content }) => {
          if (file) {
            fileViewerFiles.set(file, content); // 파일 이름을 키로, 내용을 값으로 저장
            addLog('info', `파일 웹소켓 데이터 수신: ${file}`);
            
          }
        });
        file_messages = [...fileViewerFiles.keys()]; // 파일 목록 업데이트
      }
    };

    fileWs.onerror = (error) => {
      addLog('error', '파일 웹소켓 연결 실패');
    };

    fileWs.onclose = () => {
      addLog('info', '파일 웹소켓 연결 종료');
      isFileViewerConnected = false; // 연결 상태 업데이트
    };
  }

  function addLog(type, content) {
    const log = {
      id: logIdCounter++, // 카운터를 사용하여 고유한 ID 생성
      timestamp: new Date().toLocaleTimeString(),
      type,
      content
    };
    wsLogs = [...wsLogs, log];
  }

  onMount(() => {
    ws = new WebSocket('ws://192.168.16.218:6789');
    addLog('info', '웹소켓 연결 시도 중...');
    
    ws.onopen = () => {
      addLog('success', '웹소켓 연결 성공!');
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      messages = [...messages, data];
      
      let message = data.message;

      switch (message) {
          case "Target Valid":
              ws.send(JSON.stringify({ command: "ai_start" }));
              break;

          case "executeFinish":
              addLog('info', 'Nuclei Execute가 완료되었습니다.'); // executeFinish 로그
              break;

          case "ai_start":
              addLog('info', 'AI 시작 명령이 처리되었습니다.'); // ai_start 로그
              break;

          default:
              addLog('warning', `데이터 수신: ${message}`);
      }
    };

    ws.onerror = (error) => {
      addLog('error', `웹소켓 연결 실패`);
    };

    ws.onclose = () => {
      addLog('info', '웹소켓 연결 종료');
    };

  });

  onDestroy(() => {
    if (ws) ws.close();
    if (fileWs) fileWs.close();
  });

  function handleSubmit() {
    if (!inputMessage) {
      addLog('warning', '타겟을 입력해주세요.');
      return; 
    }
    
    inputMessage = inputMessage.trim();
    const target = inputMessage.includes(',') ? inputMessage.split(',').map(item => item.trim()) : inputMessage;

    const urlPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;
    const isValidUrl = (url) => urlPattern.test(url);

    if (typeof target === 'string' && isValidUrl(target)) {
      const data = {
        command: "execute",
        target: target,
        Ai: isChecked ? "true" : "false",
        options: currentArguments
      };
      
      
      ws.send(JSON.stringify(data));
      connectFileWebSocket(); 
      addLog('send', `데이터 전송: ${JSON.stringify(data)}`);

    }     
    else if (Array.isArray(target) && target.every(isValidUrl)) {
      const data = {
        command: "multiple_execute",
        target: target,
        Ai: isChecked ? "true" : "false",
        options: currentArguments
      };

      ws.send(JSON.stringify(data));
      connectFileWebSocket(); 
      addLog('send', `데이터 전송: ${JSON.stringify(data)}`);
    } else {
      addLog('warning', '유효하지 않은 URL입니다.');
    }
    inputMessage = '';
  }

  function handleWheel(event) {
    const fileList = event.currentTarget;
    fileList.scrollLeft += event.deltaY; // 마우스 휠에 따라 가로 스크롤
    event.preventDefault(); // 기본 스크롤 동작 방지
  }

  function handleFileClick(file) {
    selectedFile = file; // 클릭한 파일을 선택
  }

  // 파일 뷰어 관련 반응형 선언 추가
  $: {
    if (selectedFile) {
      const content = fileViewerFiles.get(selectedFile);
      fileViewerContent = marked(content);
    }
  }
</script>

<main>
  <div class={`container ${isFileViewerVisible ? 'file-viewer-visible' : ''}`}>
    <div class="logo">
      <h1>iPark</h1>
    </div>

    <div class="form">
      <Form
        {handleSubmit}
        bind:inputMessage
        bind:isChecked
        bind:showModal
      />
    </div>

    <div class="console">
      <Console {wsLogs} />
      <OptionsModal 
        bind:showModal
        options={optionsData}
        bind:selectedOptions
        {$inputArguments} 
      />
    </div>

    {#if isFileViewerVisible}
      <div class="file-viewer">
        <div class="file-viewer-header">
          <h2>파일 뷰어</h2>
          <div class="file-list" on:wheel={handleWheel}>
              {#each file_messages as file}
                <div 
                  class="file-item" 
                  class:selected={selectedFile === file}
                  title={file}
                  on:click={() => handleFileClick(file)}
                >
                <h3>{file.length > 20 ? '...' + file.slice(-10) : file}</h3>
                </div>
              {/each}
          </div>
        </div>
        <div class="file-content">
          {@html fileViewerContent}
        </div>
      </div>
    {/if}
  </div>

  <button class="toggle-button" on:click={toggleFileViewer}>
    {isFileViewerVisible ? '파일 뷰어 숨기기' : '파일 뷰어 보기'}
  </button>
</main>

<style>
  .container {  
    display: grid;
    gap: 0px 0px;
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    grid-template-areas:
      ". logo ."
      ". form ."
      ". console .";
    grid-template-rows: .8fr 1fr 1.5fr;
    grid-template-columns: 1fr 1.5fr 1fr;
  }

  .file-viewer-visible {
    grid-template-areas:
      ". logo file-viewer"
      ". form file-viewer"
      ". console file-viewer";
    grid-template-columns: 0.2fr 1.5fr 2.3fr;
  }

  .file-viewer {
      grid-area: file-viewer;
      width: 92%;
      height: 90dvh;
      margin-top: 1%;
      justify-self: center;
      align-self: start; /* 상단 정렬 */
      display: flex; /* 플렉스 박스 사용 */
      flex-direction: column; /* 세로 방향으로 정렬 */
      border: 1px solid #ccc; /* 테두리 추가 */
      border-radius: 8px; /* 모서리 둥글게 */
      padding: 10px; /* 패딩 추가 */
      background-color: #2e2e2e; /* 배경색 변경 (검은색 아님) */
      color: #d4d4d4; /* 글자색 변경 */
      overflow-y: auto; /* 세로 스크롤 가능 */
  }

  .file-viewer-header h2 {
    margin-top: 1%;
    margin-bottom: 2%;
    margin-right: 3%;
    white-space: nowrap;
  }

  .file-viewer .file-viewer-header {
    background-color: #2e2e2e;
    padding: 0 0.8rem;
    display: flex; /* 플렉스 박스 사용 */
    justify-content: space-between; /* 헤더의 요소들 사이에 공간 배분 */
    align-items: center; /* 수직 중앙 정렬 */
    border-bottom: 1px solid #3d3d3d;
    flex-shrink: 0; /* 헤더의 크기를 고정 */
    /* width: 0.5vw; */
  }
  

  .file-viewer .file-content {
      white-space: pre-wrap; /* 줄 바꿈 처리 */
      word-break: break-all; /* 단어가 길어질 경우 줄 바꿈 */
      line-height: 1.4; /* 줄 간격 조정 */

  }

  .file-viewer .file-content {
    padding: 1rem;
    overflow-y: auto; /* 스크롤 추가 */
    overflow-x: auto;
    flex: 1; /* 남은 공간을 차지 */
    min-height: 0; /* 중요: flex-grow가 작동하게 함 */
    height: 100dvh;
  }

  /* 스크롤 바 스타일 */
  .file-viewer .file-content::-webkit-scrollbar {
    width: 8px; /* 스크롤 바의 너비 */
    height: 8px;
  }

  .file-viewer .file-content::-webkit-scrollbar-thumb {
    background-color: #4a90e2; /* 스크롤 바의 색상 */
    border-radius: 4px; /* 스크롤 바의 모서리 둥글게 */
  }

  .file-viewer .file-content::-webkit-scrollbar-track {
    background: #2e2e2e; /* 스크롤 바의 배경 색상 */
  }

  .file-list {
    display: flex; /* 가로 방향으로 정렬 */
    overflow-x: hidden; /* 가로 스크롤 숨기기 */
    white-space: nowrap; /* 줄 바꿈 방지 */
    color: white; /* 스크롤 바의 배경 색상 */
    opacity: 0.5;
    background-color: #737171;
    border-radius: 8px;
    margin-bottom: .5rem;
  }

  .file-list .file-item {
    display: flex; /* 플렉스 박스 사용 */
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
    margin-right: .3rem;
    cursor: pointer; /* 커서 포인터 */
    margin-bottom: 0;
    padding: 0.3rem; /* 패딩 줄이기 */
    height: 4dvh; /* 높이 줄이기 */
    line-height: 1.2; /* 줄 간격 조정 */
    border: 2px solid transparent; /* 기본 테두리 설정 (투명으로 고정) */
    border-radius: 8px; /* 모서리 둥글게 */
    transition: background-color 0.3s, border-color 0.3s; /* 부드러운 전환 효과 */
    color: white;
  }

  .file-list .file-item:hover { /* 선택된 파일 아이템 스타일 */
    color: white; /* 선택된 파일의 글자색 */
    opacity: 1; /* 클릭 시 투명도 변경 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* 클릭 시 그림자 추가 */
    background-color: #2e2e2e; /* 선택된 파일의 배경색 변경 */
    border-color: #737171; /* 선택된 파일의 테두리 색상 변경 */
  }

  .file-list .file-item.selected { /* 선택된 파일 아이템 스타일 */
    color: white; /* 선택된 파일의 글자색 */
    opacity: 1; /* 클릭 시 투명도 변경 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* 클릭 시 그림자 추가 */
    background-color: #2e2e2e; /* 선택된 파일의 배경색 변경 */
    border-color: #737171; /* 선택된 파일의 테두리 색상 변경 */
  }

  .toggle-button {
    position: fixed; /* 화면 고정 */
    bottom: 20px; /* 아래쪽 여백 */
    right: 20px; /* 오른쪽 여백 */
    padding: 10px 20px; /* 패딩 */
    background-color: #007bff; /* 배경색 */
    color: white; /* 글자색 */
    border: none; /* 테두리 없음 */
    border-radius: 5px; /* 모서리 둥글게 */
    cursor: pointer; /* 커서 포인터 */
    transition: background-color 0.3s; /* 배경색 전환 효과 */
  }

  .toggle-button:hover {
    background-color: #0056b3; /* 호버 시 배경색 변경 */
  }

  .logo { 
    grid-area: logo;
    justify-self: center;
    align-self: center;   
  }

  .form { 
    grid-area: form;
    justify-self: center;
    align-self: center; 
    width: 100%;
  }

  .console { 
    grid-area: console;
    justify-self: center;
    align-self: center;  
    width: 100%; 
    height: 100%;
  }
</style>