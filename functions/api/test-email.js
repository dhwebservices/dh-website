export async function onRequest(context) {
  const { env } = context
  const resendKey = env.RESEND_API_KEY
  const fromEmail = env.FROM_EMAIL || 'DH Website Services <noreply@dhwebsiteservices.co.uk>'

  if (!resendKey) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: ['david@dhwebsiteservices.co.uk'],
        subject: 'Test Email from Cloudflare Function',
        html: 'This is a test email sent directly from the Cloudflare Pages Function.<br/><br/>If you receive this, the email integration is working!',
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      return new Response(JSON.stringify({
        success: false,
        error: result,
        status: response.status
      }, null, 2), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({
      success: true,
      result: result
    }, null, 2), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }, null, 2), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
