create extension if not exists pgcrypto;

create table if not exists public.shop_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.shop_products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.shop_categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  brand text not null,
  description text,
  image_url text,
  status text not null default 'active' check (status in ('active', 'inactive', 'archived')),
  featured boolean not null default false,
  seo_title text,
  seo_description text,
  procurement_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shop_product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.shop_products(id) on delete cascade,
  sku text unique,
  colour text,
  storage text,
  size text,
  model text,
  price numeric(12,2) not null default 0,
  compare_at_price numeric(12,2),
  cost_price numeric(12,2),
  is_available boolean not null default true,
  procurement_required boolean not null default true,
  lead_time_days integer not null default 2,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.shop_customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text not null,
  last_name text not null,
  phone text,
  account_status text not null default 'guest' check (account_status in ('guest', 'active', 'suspended')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shop_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid references public.shop_customers(id) on delete set null,
  email text not null,
  phone text,
  customer_name text not null,
  billing_address jsonb not null default '{}'::jsonb,
  shipping_address jsonb not null default '{}'::jsonb,
  subtotal numeric(12,2) not null default 0,
  discount_total numeric(12,2) not null default 0,
  shipping_total numeric(12,2) not null default 0,
  tax_total numeric(12,2) not null default 0,
  grand_total numeric(12,2) not null default 0,
  currency text not null default 'GBP',
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded', 'part_refunded')),
  order_status text not null default 'new' check (order_status in ('new', 'confirmed', 'awaiting_procurement', 'procured', 'ordered_from_supplier', 'ready_to_dispatch', 'dispatched', 'delivered', 'cancelled')),
  procurement_status text not null default 'not_started' check (procurement_status in ('not_started', 'checking_supplier', 'ordered', 'unavailable', 'completed')),
  fulfilment_status text not null default 'unfulfilled' check (fulfilment_status in ('unfulfilled', 'part_fulfilled', 'fulfilled', 'returned')),
  payment_provider text,
  payment_reference text,
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  payment_confirmed_at timestamptz,
  confirmation_emailed_at timestamptz,
  awaiting_dispatch_emailed_at timestamptz,
  delivered_emailed_at timestamptz,
  customer_notes text,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shop_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.shop_orders(id) on delete cascade,
  product_id uuid references public.shop_products(id) on delete set null,
  variant_id uuid references public.shop_product_variants(id) on delete set null,
  product_name text not null,
  variant_label text,
  sku text,
  quantity integer not null default 1,
  unit_price numeric(12,2) not null default 0,
  line_total numeric(12,2) not null default 0
);

create table if not exists public.shop_order_notes (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.shop_orders(id) on delete cascade,
  visibility text not null default 'internal' check (visibility in ('internal', 'customer')),
  author_name text,
  note text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_shop_categories_sort on public.shop_categories(sort_order, name);
create index if not exists idx_shop_products_category on public.shop_products(category_id);
create index if not exists idx_shop_products_status on public.shop_products(status, featured);
create index if not exists idx_shop_product_variants_product on public.shop_product_variants(product_id, is_available);
create index if not exists idx_shop_orders_customer on public.shop_orders(customer_id, created_at desc);
create index if not exists idx_shop_orders_status on public.shop_orders(order_status, payment_status, created_at desc);
create index if not exists idx_shop_orders_checkout_session on public.shop_orders(stripe_checkout_session_id);
create index if not exists idx_shop_order_items_order on public.shop_order_items(order_id);

alter table public.shop_categories disable row level security;
alter table public.shop_products disable row level security;
alter table public.shop_product_variants disable row level security;
alter table public.shop_customers disable row level security;
alter table public.shop_orders disable row level security;
alter table public.shop_order_items disable row level security;
alter table public.shop_order_notes disable row level security;
