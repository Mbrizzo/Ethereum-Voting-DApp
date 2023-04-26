require('dotenv').config();
import abi from './abi';

// Conecta ao blockchain usando Web3
const Web3 = require('web3');
const web3 = new Web3('http://localhost:7545');
// Certifique-se que a porta 7545 no Ganache esteja aberta.
// Se for usar infura utilize "https://mainnet.infura.io/v3/seu-ID-do-projeto" para a rede principal e lembre-se de ter eth real na sua carteira.
// Se for usar infura na rede de testes "https://ropsten.infura.io/v3/seu_codigo_do_projeto_infura" e lembre-se de obter eth faucet em sua carteira.
// Se for usar em outra rede, consulte o endereço correto.

// Importação do contrato
const contractAbi = abi;
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

// Adicionar um novo candidato
async function adicionarCandidato(nome) {
    await contractInstance.methods.adicionarCandidato(nome).send({ from: web3.eth.accounts.givenProvider.selectedAddress });
    updateResults();
}

// Atualiza os resultados na interface
async function updateResults() {
    const candidateCount = await contractInstance.methods.getCandidateCount().call();

    for (let i = 1; i <= candidateCount; i++) {
        const candidateName = await contractInstance.methods.candidatos(i).call();
        const votes = await contractInstance.methods.getVotesForCandidate(i).call();    
    
    document.getElementById(`candidato${i}`).innerText = candidateName;
    document.getElementById(`votos${i}`).innerText = votes;
    }
}
// Função para votar em um candidato
async function vote(candidateId) {
    await contractInstance.methods.voteForCandidate(candidateId).send({from: web3.eth.accounts.givenProvider.selectedAddress});
    updateResults()
}


// Atualizar os resultados quando a página for carregada
window.addEventListener('load', () => {
    updateResults();
  });