<script>
  import Form from './lib/Form.svelte';
  import Console from './lib/Console.svelte';
  import OptionsModal from './lib/OptionsModal.svelte';
  import { onMount, onDestroy } from 'svelte';
  import optionsData from './lib/options.json';

  let ws;
  let messages = [];
  let wsLogs = [];
  let inputMessage = '';
  let isChecked = true;
  let showModal = false;
  let selectedOptions = [];

  function addLog(type, content) {
    const log = {
      id: Date.now(),
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
      addLog('receive', `데이터 수신: ${JSON.stringify(data)}`);
    };

    ws.onerror = (error) => {
      addLog('error', `웹소켓 에러: ${JSON.stringify(error, null, 2)}`);
    };

    ws.onclose = () => {
      addLog('info', '웹소켓 연결 종료');
    };
  });

  onDestroy(() => {
    if (ws) ws.close();
  });

  function handleSubmit() {
    const data = {
      target: inputMessage,
      Ai: isChecked ? "true" : "false",
      options: selectedOptions
    };
    
    ws.send(JSON.stringify(data));
    addLog('send', `데이터 전송: ${JSON.stringify(data)}`);
    inputMessage = '';
  }
</script>

<main>
  <div class="container">
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
      /></div>
  </div>
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