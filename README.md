# Projeto DNC API Battle Front

## Visão Geral

Este projeto é uma aplicação frontend desenvolvida em React para um jogo de batalha onde jogadores selecionam personagens e monstros para lutar em uma arena. A comunicação com o backend é feita via API REST e WebSocket (Socket.IO) para interações em tempo real durante as batalhas.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface do usuário, utilizando componentes funcionais e hooks para gerenciamento de estado e ciclo de vida.
- **React Router**: Gerenciamento de rotas para navegação entre páginas da aplicação.
- **Axios**: Cliente HTTP para comunicação com a API REST do backend.
- **Socket.IO Client**: Biblioteca para comunicação em tempo real via WebSocket com o servidor backend, permitindo atualizações instantâneas durante as batalhas.
- **Jest e React Testing Library**: Ferramentas para testes unitários e de integração, garantindo a qualidade e estabilidade do código.
- **Vite**: Ferramenta de build e desenvolvimento rápido para projetos frontend modernos.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática opcional, melhorando a manutenção e robustez do código.
- **ESLint**: Ferramenta de linting para garantir a qualidade e consistência do código.

## Boas Práticas Adotadas

- **Componentização**: A interface é dividida em componentes reutilizáveis e isolados, facilitando a manutenção e escalabilidade.
- **Gerenciamento de Estado com Hooks**: Uso de `useState` e `useEffect` para controlar o estado local e efeitos colaterais de forma clara e eficiente.
- **Comunicação Assíncrona**: Uso de Axios para chamadas HTTP e Socket.IO para comunicação em tempo real, garantindo uma experiência responsiva ao usuário.
- **Tratamento de Erros**: Implementação de captura e exibição de erros tanto nas requisições HTTP quanto na comunicação via WebSocket.
- **Testes Automatizados**: Cobertura de testes unitários e de integração para componentes e páginas principais, assegurando a qualidade do software.
- **Estilização Modular**: Uso de CSS modular para evitar conflitos de estilos e facilitar a manutenção visual.

## Arquitetura do Projeto

O projeto segue uma arquitetura baseada em componentes React, organizada da seguinte forma:

- **Páginas (`src/paginas/`)**: Contêm as principais telas da aplicação, como a seleção de jogadores e a arena de batalha.
- **Componentes (`src/componentes/`)**: Componentes reutilizáveis que compõem a interface, como controles de batalha, cabeçalhos, listas de jogadores e monstros.
- **Serviços (`src/servicos/`)**: Configurações e instâncias para comunicação com APIs e WebSocket.
- **Estilos (`src/estilos/`)**: Arquivos CSS organizados para estilização modular e global da aplicação.

A comunicação com o backend é feita por meio de uma API REST para dados estáticos (jogadores, monstros) e via WebSocket para eventos em tempo real durante as batalhas. O estado da aplicação é gerenciado localmente nos componentes, com atualizações disparadas pelos eventos do servidor.

## Funcionamento Geral

1. O usuário seleciona um jogador e um monstro na tela de seleção.
2. A aplicação busca os dados necessários via API REST.
3. Ao iniciar a batalha, conecta-se ao servidor WebSocket e entra em uma sala específica.
4. Eventos em tempo real atualizam o estado da batalha, exibindo informações do jogador, adversário e histórico de combate.
5. O usuário pode realizar ações (atacar, defender, especial, desistir) que são enviadas ao backend.
6. O histórico de combate é atualizado a cada turno, mostrando as ações realizadas.
7. A batalha termina quando um jogador vence ou desiste, com o estado atualizado e exibido na interface.

## Como Executar o Projeto

- Certifique-se que o backend da API e o servidor Socket.IO estejam rodando e acessíveis.
- Instale as dependências com `npm install`.
- Inicie o frontend com `npm run dev` ou comando equivalente.
- Acesse a aplicação no navegador pelo endereço configurado.

## Melhorias Futuras

- Adicionar tratamento de erros mais detalhado e feedback ao usuário.
- Melhorar a interface com animações e responsividade.
- Implementar autenticação de usuários e sessões persistentes.
- Expandir as mecânicas de batalha com mais tipos de ações.

---

Este README oferece uma visão completa do projeto, suas tecnologias, boas práticas e arquitetura para facilitar o entendimento e desenvolvimento da aplicação.
