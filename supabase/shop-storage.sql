insert into storage.buckets (id, name, public)
values ('shop-product-images', 'shop-product-images', true)
on conflict (id) do update set public = excluded.public;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public can view shop product images'
  ) then
    create policy "Public can view shop product images"
    on storage.objects
    for select
    using (bucket_id = 'shop-product-images');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can upload shop product images'
  ) then
    create policy "Authenticated users can upload shop product images"
    on storage.objects
    for insert
    to authenticated
    with check (bucket_id = 'shop-product-images');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can update shop product images'
  ) then
    create policy "Authenticated users can update shop product images"
    on storage.objects
    for update
    to authenticated
    using (bucket_id = 'shop-product-images')
    with check (bucket_id = 'shop-product-images');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can delete shop product images'
  ) then
    create policy "Authenticated users can delete shop product images"
    on storage.objects
    for delete
    to authenticated
    using (bucket_id = 'shop-product-images');
  end if;
end $$;
