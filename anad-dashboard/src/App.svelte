<script>
  import Form from './lib/Form.svelte';
  import Console from './lib/Console.svelte';
  import Modal from './lib/Modal.svelte';
  import { onMount, onDestroy } from 'svelte';
  import optionsData from './lib/options.json';

  let ws;
  let messages = [];
  let wsLogs = [];
  let inputMessage = '';
  let isChecked = false;
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
      addLog('error', `웹소켓 에러: ${error}`);
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
    <Form
      {handleSubmit}
      bind:inputMessage
      bind:isChecked
      on:openOptions={() => showModal = true}
    />
    <Console {wsLogs} />
    <Modal
      bind:show={showModal}
      options={optionsData}
      bind:selectedOptions
    />
  </div>
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0.5rem;
    }
  }
</style>