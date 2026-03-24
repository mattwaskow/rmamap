-- Core schema for private-link interactive BOV platform
create table if not exists broker_profiles (
  id uuid primary key,
  user_id uuid not null,
  full_name text not null,
  title text,
  email text not null,
  phone text,
  company text not null,
  logo_url text,
  created_at timestamptz default now()
);

create table if not exists team_branding_settings (
  id uuid primary key default gen_random_uuid(),
  broker_profile_id uuid not null references broker_profiles(id) on delete cascade,
  primary_color text not null,
  accent_color text not null,
  tone_label text,
  watermark_enabled boolean default false
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  broker_profile_id uuid not null references broker_profiles(id) on delete cascade,
  name text not null,
  address text not null,
  city text not null,
  state text not null,
  submarket text,
  units int,
  year_built int,
  occupancy_pct numeric,
  avg_rent numeric,
  avg_rent_sf numeric,
  hero_image text,
  summary text,
  status text default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists property_photos (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  url text not null,
  caption text,
  sort_order int default 0
);

create table if not exists unit_mix (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  unit_type text not null,
  units int not null,
  avg_sf numeric,
  avg_rent numeric
);

create table if not exists underwriting_snapshots (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  snapshot_type text not null check (snapshot_type in ('t12','current','proforma','stabilized','cashflow_5y')),
  mode text not null default 'summary' check (mode in ('summary','detailed')),
  notes text,
  created_at timestamptz default now()
);

create table if not exists underwriting_line_items (
  id uuid primary key default gen_random_uuid(),
  snapshot_id uuid not null references underwriting_snapshots(id) on delete cascade,
  section text not null,
  line_key text not null,
  label text not null,
  amount numeric not null,
  unit text default 'annual'
);

create table if not exists valuation_assumptions (
  property_id uuid primary key references properties(id) on delete cascade,
  baseline_noi numeric not null,
  cap_rate_low numeric not null,
  cap_rate_mid numeric not null,
  cap_rate_high numeric not null,
  occupancy_baseline numeric not null,
  occupancy_sensitivity_pct numeric not null,
  egi_baseline numeric not null
);

create table if not exists valuation_buckets (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  bucket_label text not null,
  value numeric not null,
  cap_rate numeric not null,
  ppu numeric,
  ppsf numeric
);

create table if not exists debt_assumptions (
  property_id uuid primary key references properties(id) on delete cascade,
  leverage_pct numeric,
  amort_years int,
  dscr_min numeric,
  debt_constant numeric
);

create table if not exists sales_comps (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  name text not null,
  lat numeric,
  lng numeric,
  year_built int,
  units int,
  sale_price numeric,
  sale_date date,
  price_per_unit numeric,
  price_per_sf numeric,
  cap_rate numeric,
  distance_miles numeric,
  image_url text
);

create table if not exists rent_comps (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  name text not null,
  lat numeric,
  lng numeric,
  year_built int,
  units int,
  avg_rent numeric,
  avg_rent_sf numeric,
  distance_miles numeric
);

create table if not exists area_data (
  property_id uuid primary key references properties(id) on delete cascade,
  source_mode text not null default 'manual' check (source_mode in ('live','cache','manual')),
  payload jsonb not null,
  narrative text,
  updated_at timestamptz default now()
);

create table if not exists share_links (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  token text unique not null,
  password_hash text,
  expires_at timestamptz,
  disabled boolean default false,
  visibility jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table broker_profiles enable row level security;
alter table properties enable row level security;
alter table share_links enable row level security;

create policy broker_profile_owner on broker_profiles
  for all using (auth.uid() = user_id);

create policy property_owner on properties
  for all using (
    exists (
      select 1 from broker_profiles bp where bp.id = properties.broker_profile_id and bp.user_id = auth.uid()
    )
  );

create policy share_link_owner on share_links
  for all using (
    exists (
      select 1 from properties p
      join broker_profiles bp on bp.id = p.broker_profile_id
      where p.id = share_links.property_id and bp.user_id = auth.uid()
    )
  );
