#!/bin/bash

# Criar estrutura de pastas
mkdir -p app/{auth/login,auth/signup,dashboard,bunker,soon,mentoria,upsell,landing,profile,admin,invites} \
components \
lib/{hooks,utils} \
public/images/icons \
styles \
docs

# Arquivos em app
touch app/{layout.tsx,page.tsx}
touch app/auth/login/page.tsx
touch app/auth/signup/page.tsx
touch app/dashboard/{layout.tsx,page.tsx}
touch app/bunker/{layout.tsx,page.tsx}
touch app/soon/page.tsx
touch app/mentoria/page.tsx
touch app/upsell/page.tsx
touch app/landing/page.tsx
touch app/profile/page.tsx
touch app/admin/{layout.tsx,page.tsx}
touch app/invites/page.tsx

# Arquivos em components
touch components/{Header.tsx,Footer.tsx,HeroSection.tsx,Layout.tsx,PrivateRoute.tsx,UserProfileCard.tsx,AdminPanelCard.tsx,InviteManager.tsx,SoonBanner.tsx,Loading.tsx,Button.tsx,Input.tsx}

# Arquivos em lib
touch lib/{supabaseClient.ts,auth.ts,database.types.ts,mockUser.ts}
touch lib/hooks/{useAuth.ts,useToast.ts,useUserData.ts,useInvite.ts}
touch lib/utils/{formatDate.ts,guards.ts,constants.ts}

# Arquivos em public/images
touch public/images/{logo.svg,bg.png,hero-face.png}
touch public/images/icons/.keep

# Arquivos em styles
touch styles/index.css

# Arquivos em docs
touch docs/{README.md,database-schema.md,supabase-tables.sql,roadmap.md,deployment.md}

# Arquivos na raiz (se ainda não tiverem sido criados)
touch .env .env.example .gitignore next.config.cjs tsconfig.json package.json

echo "✅ Estrutura MELLO REBURN criada com sucesso no projeto atual!"
