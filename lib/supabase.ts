/**
 * Supabase client helper that uses fetch directly so no heavy SDK is required.
 * Gracefully falls back to server-side logging if env vars are absent.
 */

export async function insertToSupabase(table: string, payload: Record<string, unknown>) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log(`[Supabase Mock] Env vars not set. Logging submission for table "${table}":`, JSON.stringify(payload, null, 2));
    return { success: true, mocked: true };
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[Supabase Error] ${table} insert failed (${res.status}):`, errorText);
      return { success: false, error: errorText };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (err: unknown) {
    console.error(`[Supabase Network Error] Failed to insert to ${table}:`, err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
