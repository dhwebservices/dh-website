function escapeHtml(value = '') {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function nl2br(value = '') {
  return escapeHtml(value).replace(/\n/g, '<br/>')
}

function buildEmailShell({ eyebrow, title, intro, accent = '#2F6FED', detailRows = [], bodyBlocks = [] }) {
  return `
    <div style="margin:0;padding:28px 16px;background:#F4F7FB;font-family:Arial,sans-serif;color:#182033">
      <div style="max-width:660px;margin:0 auto;background:#FFFFFF;border:1px solid #DEE6F3;border-radius:24px;overflow:hidden;box-shadow:0 12px 34px rgba(19,35,79,0.08)">
        <div style="padding:24px 28px;background:linear-gradient(135deg, ${accent} 0%, #101827 100%);color:#FFFFFF">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;opacity:0.72">${escapeHtml(eyebrow)}</div>
          <div style="font-size:28px;font-weight:700;line-height:1.12;letter-spacing:-0.03em;margin-top:10px">${escapeHtml(title)}</div>
          <div style="font-size:14px;line-height:1.75;opacity:0.9;margin-top:12px">${escapeHtml(intro)}</div>
        </div>
        <div style="padding:28px">
          <div style="padding:18px;border:1px solid #D9E1F2;border-radius:18px;background:#F7F9FC">
            ${detailRows.map((row, index) => `
              <div style="${index < detailRows.length - 1 ? 'padding-bottom:14px;border-bottom:1px solid #E7ECF5;margin-bottom:14px;' : ''}">
                <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A8499;margin-bottom:6px">${escapeHtml(row.label)}</div>
                <div style="font-size:14px;line-height:1.65;color:#182033">${row.html ? row.value : escapeHtml(row.value)}</div>
              </div>
            `).join('')}
          </div>
          ${bodyBlocks.join('')}
          <div style="margin-top:24px;font-size:14px;line-height:1.75;color:#44506A">
            Regards,<br/><strong style="color:#182033">DH Website Services HR</strong>
          </div>
        </div>
      </div>
    </div>
  `
}

export function buildApplicationConfirmationEmail(application, job) {
  const firstName = (application.first_name || application.full_name || application.email || 'there').split(' ')[0]
  return buildEmailShell({
    eyebrow: 'Application received',
    title: `Application received, ${firstName}`,
    intro: `Thanks for applying for ${job.title}. We have received your application and CV successfully.`,
    accent: '#2F6FED',
    detailRows: [
      { label: 'Application reference', value: application.application_ref },
      { label: 'Role', value: job.title },
      { label: 'Department', value: job.department || 'General' },
      { label: 'Package', value: job.salary_text || (job.commission_only ? 'Commission only' : 'Discussed at interview') },
    ],
    bodyBlocks: [
      `<div style="margin-top:20px;padding:16px 18px;border-radius:16px;background:#EEF4FF;border:1px solid #D6E4FF">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5170A6;margin-bottom:8px">What happens next</div>
        <div style="font-size:14px;line-height:1.7;color:#20304D">Our hiring team will review your application and contact you if we would like to move you forward.</div>
      </div>`,
    ],
  })
}

export function buildInternalApplicationEmail(application, job) {
  const screeningAnswers = Object.entries(application.screening_answers || {})
  return buildEmailShell({
    eyebrow: 'New application',
    title: `New application for ${job.title}`,
    intro: 'A new candidate has applied through the public careers page.',
    accent: '#101827',
    detailRows: [
      { label: 'Applicant', value: application.full_name },
      { label: 'Email', value: application.email },
      { label: 'Phone', value: application.phone || '—' },
      { label: 'Role', value: job.title },
      { label: 'Reference', value: application.application_ref },
      { label: 'Commission acknowledgement', value: application.commission_acknowledged ? 'Confirmed' : 'Missing' },
      { label: 'CV', value: application.cv_file_url ? `<a href="${application.cv_file_url}" style="color:#2F6FED;text-decoration:none">Open CV</a>` : '—', html: true },
    ],
    bodyBlocks: [
      `<div style="margin-top:20px;padding:18px;border:1px solid #E7ECF5;border-radius:18px;background:#FFFFFF">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A8499;margin-bottom:8px">Experience summary</div>
        <div style="font-size:14px;line-height:1.7;color:#20304D">${nl2br(application.experience_summary || '—')}</div>
      </div>`,
      screeningAnswers.length ? `
        <div style="margin-top:16px;padding:18px;border:1px solid #E7ECF5;border-radius:18px;background:#FFFFFF">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A8499;margin-bottom:10px">Screening responses</div>
          ${screeningAnswers.map(([key, value], index) => `
            <div style="${index < screeningAnswers.length - 1 ? 'padding-bottom:12px;border-bottom:1px solid #EEF2F8;margin-bottom:12px;' : ''}">
              <div style="font-size:12px;font-weight:700;color:#44506A;margin-bottom:6px">${escapeHtml(key)}</div>
              <div style="font-size:14px;line-height:1.7;color:#20304D">${nl2br(String(value || '—'))}</div>
            </div>
          `).join('')}
        </div>
      ` : '',
    ].filter(Boolean),
  })
}
