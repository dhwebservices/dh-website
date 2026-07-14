export async function onRequest(context) {
  const { env } = context

  return new Response(JSON.stringify({
    hasResendKey: !!env.RESEND_API_KEY,
    resendKeyLength: env.RESEND_API_KEY?.length || 0,
    resendKeyPrefix: env.RESEND_API_KEY?.substring(0, 5) || 'missing',
    hasFromEmail: !!env.FROM_EMAIL,
    fromEmail: env.FROM_EMAIL || 'missing',
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  })
}
