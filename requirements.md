# 📦 Projeto FLOW//RE_BORN – Requirements

Este documento lista todas as dependências essenciais e recomendações de bibliotecas necessárias para rodar o projeto localmente, incluindo libs de animação, autenticação e integrações externas.

---

## 📁 Dependências principais

### Framework & Core
<<<<<<< HEAD

=======
>>>>>>> 8f9ea7144e3fa3bee6d4c572676de5da6f16104a
- **Next.js** (`^14.x` ou superior)
- **React** (`^18.x` ou superior)
- **TypeScript** (`^5.x`)

### Estilo
<<<<<<< HEAD

=======
>>>>>>> 8f9ea7144e3fa3bee6d4c572676de5da6f16104a
- **Tailwind CSS**
- **styled-components**
- **postcss**
- **autoprefixer**

### Animações e UI
<<<<<<< HEAD

=======
>>>>>>> 8f9ea7144e3fa3bee6d4c572676de5da6f16104a
- **framer-motion**
- **lucide-react** (ícones)

### Feedbacks e Notificações
<<<<<<< HEAD

- **react-hot-toast**

### Backend e Autenticação

=======

- **react-hot-toast**

### Backend e Autenticação
>>>>>>>
>>>>>>> 8f9ea7144e3fa3bee6d4c572676de5da6f16104a
- **@supabase/supabase-js**
- **@supabase/auth-helpers-nextjs** *(se necessário para autenticação mais avançada)*

### Utilitários
<<<<<<< HEAD

=======
>>>>>>> 8f9ea7144e3fa3bee6d4c572676de5da6f16104a
- **clsx** *(condicional de classes)*
- **date-fns** *(formatação de datas)*

### SEO & Head Management
<<<<<<< HEAD

=======
>>>>>>> 8f9ea7144e3fa3bee6d4c572676de5da6f16104a
- **next/head** *(já incluso no Next.js)*

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
```

---

## 🔐 Variáveis de ambiente (.env)

- `NEXT_PUBLIC_SUPABASE_URL=`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=`

<<<<<<< HEAD
> Nota: Estas variáveis são necessárias apenas se o Supabase estiver ativo.
=======
*(Essas são necessárias apenas se Supabase estiver ativo.)*
>>>>>>> 8f9ea7144e3fa3bee6d4c572676de5da6f16104a

---

## ✅ Checklists de pós-instalação

- [ ] Verificar se `.env` foi copiado de `.env.example`
- [ ] Executar `npm run dev` sem erros
- [ ] Confirmar que `/landing`, `/login` e `/dashboard` estão acessíveis
- [ ] Executar build com `npm run build` com sucesso

---

<<<<<<< HEAD
> Mantenha este arquivo sempre atualizado conforme novas libs forem adicionadas ao projeto.
=======
> Mantenha este arquivo sempre atualizado conforme novas libs forem adicionadas ao projeto. 
>>>>>>> 8f9ea7144e3fa3bee6d4c572676de5da6f16104a
