// SPDX-License-Identifier: MIT
// Para testar o contrato você pode usar o Ganache ou implementar na rede Ethereum Testnet.
pragma solidity ^0.8.0;

contract Votacao {
    // Estrutura do candidato
    struct Candidato {
        string nome;
        uint256 votos;
    }
}