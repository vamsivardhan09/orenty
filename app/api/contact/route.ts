import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { insertToSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting by IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const rateCheck = checkRateLimit(ip, 5, 60 * 1000);

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await req.json();
    const { name, email, company, service, details, budget, website } = body;

    // 3. Honeypot trap: if filled by a bot, fake success without storing
    if (website && website.trim() !== '') {
      console.warn(`[Honeypot Triggered] Contact bot submission discarded from ${ip}`);
      return NextResponse.json({ success: true, message: 'Inquiry received' });
    }

    // 4. Validate required fields
    if (!name || !email || !details) {
      return NextResponse.json(
        { error: 'Missing required fields: Name, Email, and Details are mandatory.' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address provided.' },
        { status: 400 }
      );
    }

    // 5. Store in Supabase or fallback log
    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      service: service?.trim() || 'Software Development',
      details: details.trim(),
      budget: budget?.trim() || null,
      status: 'pending',
    };

    const result = await insertToSupabase('contacts', payload);

    if (!result.success && !result.mocked) {
      return NextResponse.json(
        { error: 'Failed to record your inquiry. Please try again or email contact@orenty.in.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
    });
  } catch (error: unknown) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
