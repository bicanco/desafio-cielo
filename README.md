# Desafio Cielo

Este projeto foi desenvolvido utilizando Angular 12.2.18

## Rodando o projeto

Para rodar o projeto é necessário cloná-lo localmente e instalar as dependências do projeto com o comando abaixo.
```
npm i
```

Após instalar as dependências, é possível rodar o projeto utilizando os comandos a seguir:
```
npm start
npm run db
```
É importante deixar os dois comandos rodando ao mesmo tempo, um em cada terminal.
O primeiro comando é responsável por disponibilizar o front-end na porta 4200(`http://localhost:4200`).
Já o segundo comando, é responsável por disponibilizar um serviço/API para consumo do front-end na porta 4000 no caminho `accountEntries`(`http://localhost:4000/accountEntries`).

## Funcionalidades do projeto

O projeto disponibiliza duas funcionalidades principais.
A primeira é a vizualização de um dashboard com o resumo dos lançamentos por bandeira do cartão, utilizando um gráfico do tipo [sunburst](https://plotly.com/python/sunburst-charts/), em que é possível visualizar a distribuição dos canais e das formas de pagamento utilizados para cada bandeira. O gráfico é interativo, e é possível clicar nos setores para destacá-los. Caso já estejam destacados, para retornar à visualização anterior, basta clicar ao centro.

A outra funcionalidade é a apresentação de uma tabela paginada com os dados dos lançamentos, onde é possível filtrar os lançamentos, buscando um valor específico em qualquer uma das colunas que desejar, uma coluna por vez.

É possível acessar a segunda funcionalidade a partir botão `Ver Detalhes` no canto esquerdo do dashboard.
Para retornar ao dashboard, é possível tanto clicar na seta de retorno do navegador, quanto clicar no breadcrumb presente no header.
