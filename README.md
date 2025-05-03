# FLOW//REBORN

Projeto de sobrevivência digital com interface militar/hacker.

## 📦 Dependências principais

### 🔧 Instalação rápida

```bash
npm install
```

### 🧱 Pacotes Essenciais

| Pacote                | Função Principal                                   |
| --------------------- | -------------------------------------------------- |
| next                  | Framework React para SSR e SSG                     |
| react                 | Biblioteca base para UI                            |
| typescript            | Tipagem estática segura                            |
| tailwindcss           | Estilização rápida e responsiva                    |
| lucide-react          | Ícones modernos e leves                            |
| framer-motion         | Animações insanas (motion, transitions)            |
| react-hot-toast       | Toasts para notificações e feedbacks               |
| @supabase/supabase-js | Integração com Supabase                            |
| clsx                  | Combinar classes CSS com lógica condicional        |
| eslint, prettier      | Padrões de código e formatação automática          |
| postcss, autoprefixer | Utilitários para o Tailwind funcionar corretamente |

### 🛠️ Comandos Úteis

```bash
npm run dev        # Rodar ambiente de desenvolvimento
npm run build      # Build de produção otimizado
npm run lint       # Verificar erros e padrões de código
npm run start      # Rodar build de produção
```

## 🎯 Estrutura do Projeto

```plaintext
mello-reburn/
├── app/                    # Páginas e rotas da aplicação
│   ├── bunker/            # Área de membros
│   ├── dashboard/         # Painel principal
│   ├── mentoria/          # Página de mentoria
│   └── profile/           # Perfil do usuário
├── components/            # Componentes reutilizáveis
├── public/               # Arquivos estáticos
└── styles/              # Estilos globais
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave
```

## 🚀 Deploy

O projeto está configurado para deploy na Vercel:

1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

## 📝 Licença

Todos os direitos reservados © MELLØ
