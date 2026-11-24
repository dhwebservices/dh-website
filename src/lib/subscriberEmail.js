function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

export function buildSubscriberEmail(rawFirstName) {
  const firstName = escapeHtml(rawFirstName)
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Welcome to DH Website Services</title></head>
<body style="margin:0;padding:0;background:#F5F5F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
<div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

  <div style="height:4px;background:#C8102E"></div>

  <!-- Hero -->
  <div style="padding:48px 48px 32px;text-align:center">
    <div style="height:1px;background:#E5E7EB;margin:0 auto 24px"></div>
    <h1 style="font-size:28px;font-weight:700;color:#1A1612;letter-spacing:-0.02em;margin:0 0 12px">You're on the list, ${firstName}!</h1>
    <p style="font-size:16px;color:#6E6E73;line-height:1.65;margin:0">Thanks for joining the DH Website Services community. Your exclusive discount is just around the corner.</p>
  </div>

  <!-- Divider -->
  <div style="height:1px;background:#F0F0F2;margin:0 48px"></div>

  <!-- What happens next -->
  <div style="padding:32px 48px">
    <h2 style="font-size:18px;font-weight:700;color:#1A1612;margin:0 0 20px">What happens next?</h2>
    <div style="display:flex;flex-direction:column;gap:16px">
      ${['We will email you the discount code.','It works on any package: Starter, Growth, Pro or Enterprise.','When you are ready, most websites are built in 7 days.'].map((step, i) => `
      <div style="display:flex;align-items:flex-start;gap:16px;padding:16px 20px;background:#F9FAFB;border-radius:12px;border:1px solid #E5E7EB">
        <div style="width:32px;height:32px;border-radius:50%;background:#1A1612;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;line-height:32px;text-align:center">${i+1}</div>
        <p style="font-size:14px;color:#3D3D3F;line-height:1.6;margin:0;padding-top:4px">${step}</p>
      </div>`).join('')}
    </div>
  </div>

  <!-- Divider -->
  <div style="height:1px;background:#F0F0F2;margin:0 48px"></div>

  <!-- Packages preview -->
  <div style="padding:32px 48px">
    <h2 style="font-size:18px;font-weight:700;color:#1A1612;margin:0 0 8px">Our packages</h2>
    <p style="font-size:14px;color:#6E6E73;margin:0 0 20px">Professional websites built for growth. From concept to deployment.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${[['Starter','From £449','5-page professional website'],['Growth','From £999','10-page + blog + full SEO'],['Pro','From £1,499','15 pages + e-commerce ready'],['Enterprise','From £2,499','Full enterprise + HR system']].map(([name,price,desc]) => `
      <div style="padding:16px;background:#F9FAFB;border-radius:12px;border:1px solid #E5E7EB">
        <div style="font-size:13px;font-weight:700;color:#1A1612;margin-bottom:4px">${name}</div>
        <div style="font-size:16px;font-weight:700;color:var(--accent);margin-bottom:6px">${price}</div>
        <div style="font-size:12px;color:#6E6E73">${desc}</div>
      </div>`).join('')}
    </div>
  </div>

  <!-- CTA -->
  <div style="padding:24px 48px 48px;text-align:center">
    <a href="https://dhwebsiteservices.co.uk/contact" style="display:inline-block;padding:14px 36px;background:#1A1612;color:#ffffff;text-decoration:none;border-radius:100px;font-size:14px;font-weight:700;letter-spacing:0.01em">Book a free call →</a>
    <p style="font-size:13px;color:#A1A1A6;margin:20px 0 0">Questions? Call us on <a href="tel:+441443805303" style="color:var(--accent);text-decoration:none">01443 805303</a>, or email <a href="mailto:clients@dhwebsiteservices.co.uk" style="color:var(--accent);text-decoration:none">clients@dhwebsiteservices.co.uk</a></p>
  </div>

  <!-- Footer -->
  <div style="background:#F5F5F7;padding:24px 48px;text-align:center;border-top:1px solid #E5E7EB">
    <p style="font-size:12px;color:#A1A1A6;margin:0;line-height:1.6">
      © ${new Date().getFullYear()} DH Website Services · David Hooper Home Limited · Co. No. 17018784<br>
      Pontypridd, Wales · <a href="https://dhwebsiteservices.co.uk/privacy" style="color:#A1A1A6">Privacy Policy</a> · <a href="https://dhwebsiteservices.co.uk" style="color:#A1A1A6">Unsubscribe</a>
    </p>
  </div>

</div>
</body></html>`
}
