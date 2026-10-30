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
    const {
      name,
      email,
      portfolioUrl,
      challengeOrIdea,
      solutionDetails,
      whyYou,
      honeypot,
    } = body;

    // 3. Honeypot trap: if filled by a bot, fake success without storing
    if (honeypot && honeypot.trim() !== '') {
      console.warn(`[Honeypot Triggered] Application bot submission discarded from ${ip}`);
      return NextResponse.json({ success: true, message: 'Application received' });
    }

    // 4. Validate required fields
    if (!name || !email || !challengeOrIdea || !solutionDetails || !whyYou) {
      return NextResponse.json(
        {
          error:
            'Missing required fields. Please ensure Name, Email, Challenge/Idea, Solution, and Why You are filled out.',
        },
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
      portfolio_url: portfolioUrl?.trim() || null,
      challenge_or_idea: challengeOrIdea.trim(),
      solution_details: solutionDetails.trim(),
      why_you: whyYou.trim(),
      status: 'submitted',
    };

    const result = await insertToSupabase('applications', payload);

    if (!result.success && !result.mocked) {
      return NextResponse.json(
        {
          error:
            'Failed to record your application. Please try again or email contact@orenty.in.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Application recorded successfully.',
    });
  } catch (error: unknown) {
    console.error('API Apply Error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
