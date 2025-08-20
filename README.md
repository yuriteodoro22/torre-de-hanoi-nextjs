# Torre de Hanói - Next.js

Jogo Torre de Hanói desenvolvido em Next.js com Tailwind CSS e integração com Supabase para ranking de jogadores.

## Características

- ⚡ Next.js 13.5.1 com App Router
- 🎨 Tailwind CSS para estilização
- 🎯 Radix UI para componentes acessíveis
- 🗄️ Supabase para banco de dados e ranking
- 📱 Design responsivo
- 🏆 Sistema de pontuação e ranking

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/yuriteodoro22/torre-de-hanoi-nextjs.git
cd torre-de-hanoi-nextjs
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais do Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

4. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Scripts Disponíveis

- `npm run dev` - Executa o projeto em modo de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Executa a build de produção
- `npm run lint` - Executa o linter

## Deploy

Este projeto pode ser facilmente deployado no Vercel:

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente no painel do Vercel
3. O deploy será automático a cada push na branch main

## Tecnologias Utilizadas

- Next.js
- TypeScript
- Tailwind CSS
- Radix UI
- Supabase
- Zustand (gerenciamento de estado)
- React Hook Form
- Zod (validação)

## Estrutura do Projeto

```
├── app/                 # App Router do Next.js
│   ├── final/          # Página de resultado final
│   ├── play/           # Página do jogo
│   └── ranking/        # Página de ranking
├── components/         # Componentes React
│   └── ui/            # Componentes UI reutilizáveis
├── hooks/             # Custom hooks
├── lib/               # Utilitários e configurações
├── store/             # Gerenciamento de estado
└── ...
```

## Licença

MIT