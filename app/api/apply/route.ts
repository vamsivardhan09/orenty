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
      challengeSlug,
      solutionDetails,
      solutionUrl,
      shortNote,
      notes,
      whyYou,
      honeypot,
      website,
    } = body;

    const trap = honeypot || website;

    // 3. Honeypot trap: if filled by a bot, fake success without storing
    if (trap && trap.trim() !== '') {
      console.warn(`[Honeypot Triggered] Application bot submission discarded from ${ip}`);
      return NextResponse.json({ success: true, message: 'Application received' });
    }

    const resolvedChallenge = challengeOrIdea || challengeSlug || '';
    const resolvedSolution =
      solutionDetails ||
      (solutionUrl
        ? `Solution: ${solutionUrl}${shortNote || notes ? `\n\nNotes:\n${shortNote || notes}` : ''}`
        : '');
    const resolvedWhyYou = whyYou || 'Challenge solution submission';

    // 4. Validate required fields
    if (!name || !email || !resolvedChallenge || !resolvedSolution) {
      return NextResponse.json(
        {
          error:
            'Missing required fields. Please ensure Name, Email, Challenge/Idea, and Solution are filled out.',
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
      challenge_or_idea: resolvedChallenge.trim(),
      solution_details: resolvedSolution.trim(),
      why_you: resolvedWhyYou.trim(),
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
