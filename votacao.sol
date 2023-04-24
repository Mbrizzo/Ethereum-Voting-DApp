// SPDX-License-Identifier: MIT
// Para testar o contrato você pode usar o Ganache ou implementar na rede Ethereum Testnet.
pragma solidity ^0.8.0;

contract Votacao {
    // Estrutura do candidato
    struct Candidato {
        string nome;
        uint256 votos;
    }
// Mapeamento dos candidatos
    mapping(uint256 => Candidato) public candidatos;

    // Total de candidatos
    uint256 public totalCandidatos;

    // Construtor do contrato
    constructor(string[] memory nomesCandidatos) {
        for (uint256 i = 0; i < nomesCandidatos.length; i++) {
            totalCandidatos++;
            candidatos[totalCandidatos] = Candidato(nomesCandidatos[i], 0);
        }
    }

    // Função de votação
    function votar(uint256 candidato) public {
        require(candidato <= totalCandidatos && candidato > 0, "candidato invalido.");
        candidatos[candidato].votos++;
    }

    // Função de contagem de votos
    function contagemVotos(uint256 candidato) public view returns (uint256) {
        require(candidato <= totalCandidatos && candidato > 0, "Candidato invalido.");
        return candidatos[candidato].votos;
    }
}