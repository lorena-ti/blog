# Blog
![](https://img.shields.io/badge/angular-black?style=for-the-badge&logo=angular&logoColor=white)
![](https://img.shields.io/badge/typescript-black?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/javascript-black?style=for-the-badge&logo=javascript&logoColor=white)

## Sobre
Blog pessoal feito em [Angular](https://angular.dev/) para documentar meu aprendizado e projetos que irei desenvolver ao longo da graduação.

Trata-se de um projeto de aprendizado e, portanto, pode não seguir as melhores práticas de implementação, bem como ainda não possui testes.

## Bibliotecas Utilizadas
- [Angular Material](https://material.angular.dev) para componentes visuais;
- [fontawesome-free](https://www.npmjs.com/package/@fortawesome/fontawesome-free) para ícones;
- [gray-matter](https://www.npmjs.com/package/gray-matter) para obter metadados do frontmatter de arquivos markdown;
- [fs-extra](https://www.npmjs.com/package/fs-extra) para buscar e obter o conteúdo de arquivos;
- [ngx-markdown](https://www.npmjs.com/package/ngx-markdown) para renderizar markdown com:
  - [marked](https://www.npmjs.com/package/marked) para converter markdown para HTML;
  - [prismjs](https://www.npmjs.com/package/prismjs) e [prism-themes](https://www.npmjs.com/package/prism-themes) para destacar código;
  - [mermaid](https://www.npmjs.com/package/mermaid) para renderizar diagramas.

## Como Funciona
- Os artigos do blog são arquivos markdown que ficam armazenados na pasta `/public/posts`, sempre separados por ano e mês e seguem a convenção de nome `id_titulo-do-post` (o id determina a ordem de exibição do artigo no blog);

- Com o `fs-extra`, uma busca recursiva por arquivos markdown é feita nessa pasta e o conteúdo de cada arquivo é obtido;

- Cada arquivo possui um frontmatter com os metadados de cada artigo (diagrama de capa, título, categoria, data, descrição e tags), que são obtidos pelo `gray-matter`;

- Esses metadados são convertidos para o formato JSON e são armazenados no arquivo `posts-index.json`, que é utilizado para fazer a listagem de artigos;

- Quando um artigo é selecionado pelo usuário, os dados que determinam a pasta onde ele está armazenado (ano e mês) e o nome do arquivo correspondente (id e título) são passados como parâmetros à rota `/artigos`;

- Os parâmetros são recuperados, o caminho do artigo é encontrado e o artigo é renderizado com o `ngx-markdown`.

## Licença
Este projeto está sob a [licença MIT](LICENSE.md).
