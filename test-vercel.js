import axios from 'axios';

const BASE_URL = 'https://tmodloadermcp.vercel.app';

async function testVercelAPI() {
  console.log('🧪 Testando API TModLoader MCP na Vercel...\n');

  try {
    // Teste 1: Health Check
    console.log('1️⃣ Testando Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Teste 2: Info
    console.log('2️⃣ Testando Info...');
    const infoResponse = await axios.get(`${BASE_URL}/api/info`);
    console.log('✅ Info:', infoResponse.data);
    console.log('');

    // Teste 3: MCP Documentation
    console.log('3️⃣ Testando MCP Documentation...');
    const mcpResponse = await axios.post(`${BASE_URL}/api/index`, {
      method: 'get_tmodloader_documentation',
      params: { topic: 'items' }
    });
    console.log('✅ MCP Documentation:', mcpResponse.data);
    console.log('');

    // Teste 4: Tutorial Guide
    console.log('4️⃣ Testando Tutorial Guide...');
    const tutorialResponse = await axios.post(`${BASE_URL}/api/index`, {
      method: 'get_tutorial_guide',
      params: { 
        tutorial_type: 'basic_mod',
        difficulty: 'beginner'
      }
    });
    console.log('✅ Tutorial Guide:', tutorialResponse.data);
    console.log('');

    console.log('🎉 Todos os testes passaram! API funcionando perfeitamente na Vercel!');
    console.log(`🌐 URL: ${BASE_URL}`);
    console.log('📊 Endpoints disponíveis:');
    console.log(`   - Health: ${BASE_URL}/api/health`);
    console.log(`   - Info: ${BASE_URL}/api/info`);
    console.log(`   - MCP: ${BASE_URL}/api/index`);

  } catch (error) {
    console.error('❌ Erro nos testes:', error.response?.data || error.message);
  }
}

testVercelAPI(); 