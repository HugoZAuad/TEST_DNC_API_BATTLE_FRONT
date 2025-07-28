# Projeto DNC API Battle Front

## Visão Geral

Este projeto é uma aplicação frontend desenvolvida em React para um jogo de batalha onde jogadores selecionam personagens e monstros para lutar em uma arena. A comunicação com o backend é feita via API REST e WebSocket (Socket.IO) para interações em tempo real durante as batalhas.

## Arquitetura

- **React**: Framework utilizado para construção da interface do usuário.
- **React Router**: Gerencia o roteamento entre páginas, como seleção de jogadores e arena.
- **Axios**: Realiza requisições HTTP para a API backend para buscar jogadores e monstros.
- **Socket.IO Client**: Comunicação em tempo real com o servidor backend para atualizações da batalha.
- **Componentização**: A aplicação é organizada em componentes reutilizáveis, como ArenaPlayers, BattleControls, BattleLog, entre outros.
- **Gerenciamento de estado**: Utiliza hooks do React (`useState`, `useEffect`) para controlar estado e efeitos colaterais.
- **Fluxo de batalha em tempo real**:
  - Conexão ao namespace padrão do Socket.IO no backend.
  - Entrada em salas de batalha via eventos.
  - Escuta de atualizações e mudanças de status da batalha.
  - Emissão de ações do jogador (ataque, defesa, especial, desistência) para o backend.
- **Estilização**: Uso de CSS modular e estilos globais para a interface.

## Funcionalidades Principais

- Tela de seleção de jogador e monstro.
- Arena de batalha em tempo real com:
  - Exibição das informações do jogador e do adversário.
  - Botões de ação: atacar, defender, especial e desistir.
  - Registro das ações da batalha exibido por turno.
  - Mensagens dinâmicas de status refletindo o estado da batalha.
- Gerenciamento da conexão WebSocket com tratamento de erros.
- Desistência automática caso o jogador saia da arena.

## Estrutura de Arquivos

- `src/paginas/`: Contém as páginas principais, como `Arena.jsx` e `SelecaoJogador.jsx`.
- `src/componentes/`: Componentes reutilizáveis da interface, como `ArenaPlayers.jsx`, `BattleControls.jsx`, `BattleLog.jsx`.
- `src/servicos/`: Configurações de API e socket (`api.js`, `socket.js`).
- `src/estilos/`: Arquivos CSS para estilização dos componentes e páginas.

## Como Funciona

1. Na tela de seleção, o usuário escolhe um jogador e um monstro.
2. A aplicação busca os jogadores e monstros disponíveis na API backend.
3. Ao iniciar a batalha, conecta-se ao servidor Socket.IO do backend.
4. O jogador entra em uma sala de batalha e aguarda um adversário ou bot.
5. Quando a batalha começa, eventos em tempo real atualizam o estado da batalha.
6. Os jogadores realizam ações por meio dos botões, que emitem eventos para o backend.
7. O registro da batalha é atualizado com as ações realizadas em cada turno.
8. Jogadores podem desistir ou sair, o que gera um evento de desistência.

## Observações

- A lógica da batalha, como cálculo de dano e gerenciamento de turnos, é responsabilidade do backend.
- A aplicação trata erros de conexão e atualiza a interface conforme necessário.
- O registro da batalha exibe apenas as ações da batalha, sem informações dos jogadores ou monstros.
- Os botões de ação são desabilitados quando não é o turno do jogador.

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

Este README oferece uma visão completa do projeto, sua arquitetura e funcionalidades para facilitar o entendimento e desenvolvimento da aplicação.
