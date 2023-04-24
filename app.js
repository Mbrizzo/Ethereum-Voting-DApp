require('dotenv').config();

// Conecta ao blockchain usando Web3
const web3 = new web3('http://localhost:7545'); 
// Certifique-se que a porta 7545 no Ganache esteja aberta.
// Se for usar infura utilize "https://mainnet.infura.io/v3/seu-ID-do-projeto" para a rede principal e lembre-se de ter eth real na sua carteira.
// Se for usar infura na rede de testes "https://ropsten.infura.io/v3/seu_codigo_do_projeto_infura" e lembre-se de obter eth faucet em sua carteira.
// Se for usar em outra rede, consulte o endereço correto.

// Importação do contrato
const contractAbi = JSON.parse(process.env.CONTRACT_ABI);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

// Atualiza os resultados na interface
async function updateResults() {
    const candidateCount = await contractInstance.methods.getCandidateCount().call();

    for (let i = 1; i <= candidateCount; i++) {
        const candidateName = await contractInstance.methods.getCandidateName(i).call();
        const votes = await contractInstance.methods.getVotesForCandidate(i).call();    
    
    document.getElementById(`candidato${i}`).innerText = candidateName;
    document.getElementById(`votos${i}`).innerText = votes;
    }
}

// Atualizar os resultados quando a página for carregada
window.addEventListener('load', () => {
    updateResults();
  });