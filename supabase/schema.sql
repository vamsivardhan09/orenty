-- ORENTY (orenty.in) Supabase Database Schema
-- Run this migration in your Supabase SQL Editor

-- 1. Contacts Table (for Software Solutions inquiries)
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    service TEXT DEFAULT 'Software Development',
    details TEXT NOT NULL,
    budget TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted', 'archived'))
);

-- Index on email and created_at for fast lookups
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts from the Next.js API route
CREATE POLICY "Allow public insert to contacts"
    ON public.contacts
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow service role to read/manage all contacts
CREATE POLICY "Allow service role full access to contacts"
    ON public.contacts
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- 2. Applications Table (for Startup Lab challenges & general talent applications)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    portfolio_url TEXT,
    challenge_or_idea TEXT NOT NULL,
    solution_details TEXT NOT NULL,
    why_you TEXT NOT NULL,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'interview_scheduled', 'accepted', 'rejected'))
);

-- Index on challenge_or_idea and email
CREATE INDEX IF NOT EXISTS idx_applications_challenge ON public.applications(challenge_or_idea);
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts from the Next.js API route
CREATE POLICY "Allow public insert to applications"
    ON public.applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow service role to read/manage all applications
CREATE POLICY "Allow service role full access to applications"
    ON public.applications
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
