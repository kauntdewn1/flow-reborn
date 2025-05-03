# 📦 Projeto FLOW//RE_BORN – Requirements

Este documento lista todas as dependências essenciais e recomendações de bibliotecas necessárias para rodar o projeto localmente, incluindo libs de animação, autenticação e integrações externas.

---

## 📁 Dependências principais

### Framework & Core

- **Next.js** (`^14.x` ou superior)
- **React** (`^18.x` ou superior)
- **TypeScript** (`^5.x`)

### Estilo

- **Tailwind CSS**
- **styled-components**
- **postcss**
- **autoprefixer**

### Animações e UI

- **framer-motion**
- **lucide-react** (ícones)

### Feedbacks e Notificações

- **react-hot-toast**

### Backend e Autenticação

- **@supabase/supabase-js**
- **@supabase/auth-helpers-nextjs** _(se necessário para autenticação mais avançada)_

### Utilitários

- **clsx** _(condicional de classes)_
- **date-fns** _(formatação de datas)_

### SEO & Head Management

- **next/head** _(já incluso no Next.js)_

### Adicionais

- **Netlify CLI**
- **@netlify/plugin-nextjs**

---

## 📦 Comandos recomendados

```bash
# Instalar pacotes principais
npm install

# Animações
npm install framer-motion

# Toasts
npm install react-hot-toast

# Supabase (opcional ou para versão com auth e backend real)
npm install @supabase/supabase-js

# Corrigir possíveis vulnerabilidades
npm audit fix --force

# Instalar Netlify CLI e plugin Next.js
npm install -g netlify-cli
npm install -D @netlify/plugin-nextjs

# Iniciar servidor de desenvolvimento
npm run dev

# Build do projeto
npm run build

# Iniciar em produção
npm run start

# Verificar linting
npm run lint
```

---

## 🔐 Variáveis de ambiente (.env)

- `NEXT_PUBLIC_SUPABASE_URL=`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=`
- `NEXT_PUBLIC_HELIO_API_KEY=`
- `HELIO_API_SECRET=`
- `HELIO_SHARED_TOKEN=`
- `NEXT_PUBLIC_SUPABASE_DATABASE_URL=`
- `NEXT_PUBLIC_SITE_URL=`

> Nota: Estas variáveis são necessárias apenas se o Supabase e Helio estiverem ativos.

---

## ✅ Checklists de pós-instalação

- [ ] Verificar se `.env` foi copiado de `.env.example`
- [ ] Executar `npm run dev` sem erros
- [ ] Confirmar que `/landing`, `/login` e `/dashboard` estão acessíveis
- [ ] Executar build com `npm run build` com sucesso
- [ ] Verificar se todas as dependências foram instaladas corretamente
- [ ] Configure as variáveis de ambiente
- [ ] Execute o servidor de desenvolvimento para testar
- [ ] Verifique se o build está funcionando
- [ ] Configure o Netlify CLI e plugin Next.js

---

> Mantenha este arquivo sempre atualizado conforme novas libs forem adicionadas ao projeto.
