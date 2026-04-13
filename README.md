# Biblia Rapida

Aplicacao web para busca rapida de versiculos da Biblia (Almeida Revista e Corrigida), com foco em uso direto por texto no campo de pesquisa.

## Funcionalidades

- Busca por livro e capitulo (exemplo: `sl 119`)
- Busca por versiculo especifico (exemplo: `jo 3 16`)
- Busca por intervalo de versiculos (exemplo: `jo 3 16-18`)
- Suporte a abreviacoes de livros (exemplo: `gn`, `sl`, `jo`, `1co`)
- URL sincronizada com a busca via query string (`?search=`)
- Interface simples e responsiva

## Stack

- React 19
- TypeScript
- Vite 6
- TanStack Query
- Tailwind CSS 4
- Radix UI

## Requisitos

- Node.js 18.18+ (recomendado 20+)
- npm, pnpm, yarn ou bun

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador:

```txt
http://localhost:5173
```

## Scripts disponiveis

- `npm run dev`: inicia o Vite em modo desenvolvimento
- `npm run build`: gera build de producao
- `npm run preview`: sobe um servidor para testar a build
- `npm run lint`: executa o ESLint

## Formato de busca

Use sempre espacos para separar os termos:

- `[livro] [capitulo]`
- `[livro] [capitulo] [versiculo]`
- `[livro] [capitulo] [versiculo-inicial]-[versiculo-final]`

Exemplos validos:

- `sl 119`
- `jo 3 16`
- `jo 3 16-18`
- `1co 13`

## Estrutura principal

- `src/App.tsx`: layout principal e input de busca
- `src/hooks/useSearchBible.ts`: carregamento do JSON e busca
- `src/lib/bible/parseQuery.ts`: parser da entrada textual
- `src/lib/bible/filterVerses.ts`: filtro dos versiculos
- `src/assets/almeida_rc.json`: base de dados biblica

## Licenca

Defina a licenca do projeto neste arquivo (por exemplo, MIT), se desejar publicar o repositorio.
