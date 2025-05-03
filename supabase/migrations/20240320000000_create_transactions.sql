create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade,
  amount decimal not null,
  reference text not null,
  status text not null,
  wallet text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Adicionar RLS
alter table public.transactions enable row level security;

-- Políticas de acesso
create policy "Usuários podem ver suas próprias transações"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Apenas admins podem inserir transações"
  on public.transactions for insert
  to authenticated
  using (auth.jwt() ->> 'role' = 'admin');

-- Trigger para atualizar updated_at
create trigger handle_updated_at before update on public.transactions
  for each row execute procedure moddatetime (updated_at); 