#!/usr/bin/env node

import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

async function testWebServer() {
  console.log('🧪 Testando servidor web TModLoader MCP...\n');

  try {
    // Teste 1: Health check
    console.log('1. Testando health check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);

    // Teste 2: Info endpoint
    console.log('\n2. Testando info endpoint...');
    const infoResponse = await axios.get(`${BASE_URL}/info`);
    console.log('✅ Info:', infoResponse.data);

    // Teste 3: MCP endpoint
    console.log('\n3. Testando MCP endpoint...');
    const mcpResponse = await axios.post(`${BASE_URL}/mcp`, {
      method: 'get_tmodloader_documentation',
      params: { topic: 'items' }
    });
    console.log('✅ MCP response:', mcpResponse.data);

    // Teste 4: Test endpoint
    console.log('\n4. Testando test endpoint...');
    const testResponse = await axios.post(`${BASE_URL}/test/get_tutorial_guide`, {
      tutorial_type: 'basic_mod',
      difficulty: 'beginner'
    });
    console.log('✅ Test response:', testResponse.data);

    console.log('\n🎉 Todos os testes passaram!');
    console.log('\n📋 URLs disponíveis:');
    console.log(`  Health: ${BASE_URL}/health`);
    console.log(`  Info: ${BASE_URL}/info`);
    console.log(`  MCP: ${BASE_URL}/mcp`);
    console.log(`  Test: ${BASE_URL}/test/:tool`);

    console.log('\n🚀 Servidor web está pronto para deploy!');

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

testWebServer(); 