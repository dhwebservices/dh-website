alter table if exists public.shop_orders
  add column if not exists stripe_checkout_session_id text,
  add column if not exists stripe_payment_intent_id text,
  add column if not exists payment_confirmed_at timestamptz,
  add column if not exists confirmation_emailed_at timestamptz,
  add column if not exists awaiting_dispatch_emailed_at timestamptz,
  add column if not exists delivered_emailed_at timestamptz;

create index if not exists idx_shop_orders_checkout_session on public.shop_orders(stripe_checkout_session_id);
