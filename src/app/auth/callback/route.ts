import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/dashboard'
  const errorParam = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // Bepaal de juiste HTTPS redirect basis-URL (voorkom HTTP reverse-proxy mismatch op Vercel)
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https'
  const isLocal = process.env.NODE_ENV === 'development'
  const siteUrl = isLocal ? origin : (forwardedHost ? `${forwardedProto}://${forwardedHost}` : origin)

  // 1. Fout doorgegeven vanuit OAuth provider of Supabase
  if (errorParam || errorDescription) {
    console.error('Auth callback provider error:', errorParam, errorDescription)
    const errText = errorDescription || errorParam || 'Inloggen via provider is geannuleerd of mislukt.'
    return NextResponse.redirect(`${siteUrl}/login?error=${encodeURIComponent(errText)}`)
  }

  // 2. PKCE code exchange (Google OAuth of PKCE Magic Link)
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${siteUrl}${next}`)
    }
    console.error('Auth callback exchangeCode error:', error)
    return NextResponse.redirect(`${siteUrl}/login?error=${encodeURIComponent(error.message)}`)
  }

  // 3. Token hash verification (Email Magic Link of bevestigingslink)
  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!error) {
      return NextResponse.redirect(`${siteUrl}${next}`)
    }
    console.error('Auth callback verifyOtp error:', error)
    return NextResponse.redirect(`${siteUrl}/login?error=${encodeURIComponent(error.message)}`)
  }

  // Geen code of token_hash ontvangen
  return NextResponse.redirect(`${siteUrl}/login?error=${encodeURIComponent('Geen geldige inlogcode ontvangen.')}`)
}
