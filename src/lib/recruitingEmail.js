export function buildApplicationConfirmationEmail(application, job) {
  const firstName = (application.first_name || application.full_name || application.email || 'there').split(' ')[0]
  return `
    <div style="font-family:Arial,sans-serif;max-width:620px;padding:32px;background:#ffffff">
      <h1 style="font-size:24px;color:#1D1D1F;margin:0 0 12px">Application received, ${firstName}</h1>
      <p style="font-size:15px;line-height:1.7;color:#6E6E73;margin:0 0 18px">Thanks for applying for <strong>${job.title}</strong> at DH Website Services. We have received your application and CV successfully.</p>
      <div style="padding:18px 20px;border:1px solid #E8E8ED;border-radius:14px;background:#F5F5F7">
        <div style="font-size:13px;color:#1D1D1F;margin-bottom:8"><strong>Application reference:</strong> ${application.application_ref}</div>
        <div style="font-size:13px;color:#1D1D1F"><strong>Role:</strong> ${job.title}</div>
      </div>
      <p style="font-size:14px;line-height:1.7;color:#6E6E73;margin:18px 0 0">Our HR team will review your application and contact you if we would like to move forward.</p>
      <p style="font-size:14px;line-height:1.7;color:#6E6E73">Regards,<br/>DH Website Services HR</p>
    </div>
  `
}

export function buildInternalApplicationEmail(application, job) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:700px;padding:32px;background:#ffffff">
      <h2 style="font-size:22px;color:#1D1D1F;margin:0 0 10px">New application received</h2>
      <p style="font-size:14px;color:#6E6E73;margin:0 0 20px">Submitted from the public careers page.</p>
      <table style="width:100%;border-collapse:collapse">
        ${[
          ['Applicant', application.full_name],
          ['Email', application.email],
          ['Phone', application.phone || '—'],
          ['Role', job.title],
          ['Reference', application.application_ref],
          ['Commission acknowledgment', application.commission_acknowledged ? 'Confirmed' : 'Missing'],
          ['CV', application.cv_file_url ? `<a href="${application.cv_file_url}">Open CV</a>` : '—'],
        ].map(([label, value]) => `<tr><td style="padding:10px 14px;border:1px solid #E8E8ED;background:#F5F5F7;font-weight:600;font-size:13px;width:180px">${label}</td><td style="padding:10px 14px;border:1px solid #E8E8ED;font-size:13px">${value}</td></tr>`).join('')}
      </table>
      <div style="margin-top:22px;padding:18px 20px;border:1px solid #E8E8ED;border-radius:14px;background:#FAFAFA">
        <div style="font-size:13px;font-weight:600;color:#1D1D1F;margin-bottom:8">Experience summary</div>
        <div style="font-size:13px;line-height:1.7;color:#424245;white-space:pre-wrap">${application.experience_summary || '—'}</div>
      </div>
    </div>
  `
}
