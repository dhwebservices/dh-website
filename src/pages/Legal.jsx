import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const POLICIES = {
  '/privacy': {
    title: 'Privacy Policy',
    updated: 'January 2026',
    content: `
## 1. Who We Are
DH Website Services is operated by David Hooper Home Limited (Company No. 17018784), based in Cardiff, United Kingdom. We can be contacted at clients@dhwebsiteservices.co.uk or 029 2002 4218.

## 2. What Data We Collect
We collect information you provide directly to us, including:
- **Contact information:** Name, email address, phone number, business name
- **Project information:** Details about your website requirements and preferences
- **Payment information:** Processed securely via our payment provider — we do not store card details
- **Usage data:** Pages visited, browser type, IP address (via analytics)

## 3. How We Use Your Data
We use your information to:
- Respond to your enquiries and deliver our services
- Send project updates and communications
- Send invoices and process payments
- Improve our services and website
- Comply with legal obligations

We will never sell your personal data to third parties.

## 4. Legal Basis for Processing
We process your data on the following legal bases:
- **Contract:** To fulfil the services you've engaged us for
- **Legitimate interests:** To communicate with you and improve our services
- **Legal obligation:** Where required by law
- **Consent:** For marketing communications (where applicable)

## 5. Data Retention
We retain your data for as long as necessary to provide our services and comply with legal obligations. Client project data is typically retained for 7 years for tax purposes.

## 6. Your Rights
Under UK GDPR, you have the right to:
- Access the personal data we hold about you
- Correct inaccurate data
- Request deletion of your data
- Object to or restrict processing
- Data portability
- Lodge a complaint with the ICO (ico.org.uk)

To exercise any of these rights, contact us at clients@dhwebsiteservices.co.uk.

## 7. Cookies
We use cookies to improve your experience. See our Cookie Policy for details.

## 8. Contact
For any privacy-related queries: clients@dhwebsiteservices.co.uk
    `,
  },
  '/terms': {
    title: 'Terms of Use',
    updated: 'January 2026',
    content: `
## 1. Acceptance of Terms
By accessing our website (dhwebsiteservices.co.uk), you agree to these Terms of Use. If you do not agree, please do not use this site.

## 2. Use of This Website
You may use this website for lawful purposes only. You must not use it to transmit any harmful, offensive, or illegal content, or attempt to gain unauthorised access to any system.

## 3. Intellectual Property
All content on this website — including text, images, code, and design — is owned by DH Website Services or its licensors and is protected by copyright. You may not reproduce, distribute, or modify any content without prior written permission.

## 4. Disclaimer
Our website is provided on an "as is" basis. We make no warranties about its accuracy, completeness, or fitness for a particular purpose. We are not liable for any losses arising from use of this website.

## 5. External Links
This site may link to third-party websites. We are not responsible for the content or practices of those sites.

## 6. Governing Law
These terms are governed by the laws of England and Wales.

## 7. Changes
We may update these terms at any time. Continued use of the site after changes constitutes acceptance.
    `,
  },
  '/services-terms': {
    title: 'Services Terms & Conditions',
    updated: 'January 2026',
    content: `
## 1. Services
DH Website Services provides website design, development, hosting, and related digital services. The scope of work is agreed prior to project commencement.

## 2. Payment Terms
- A deposit (typically 50%) is required before work begins
- Remaining balance is due upon project completion before launch
- Invoices are due within 14 days of issue
- Late payments may incur interest at 8% above Bank of England base rate

## 3. Revisions
Each package includes a specified number of revision rounds. Additional revisions will be quoted and invoiced separately.

## 4. Client Responsibilities
You are responsible for providing accurate content, images, and brand materials in a timely manner. Delays caused by late content may affect delivery timelines.

## 5. Intellectual Property
Upon full payment, you receive ownership of the final deliverables. We retain the right to display the work in our portfolio (unless otherwise agreed).

## 6. Hosting & Maintenance
Monthly hosting plans continue on a rolling basis until cancelled with 30 days written notice. We are not liable for downtime caused by third-party infrastructure.

## 7. Liability
Our total liability for any claim is limited to the amount paid for the relevant services. We are not liable for indirect or consequential losses.

## 8. Termination
Either party may terminate the agreement with 30 days written notice. In the event of termination, payment is due for all work completed to date.
    `,
  },
  '/refunds': {
    title: 'Refunds & Cancellation Policy',
    updated: 'January 2026',
    content: `
## Refund Policy

### Deposits
Deposits are non-refundable once work has commenced, as they cover time spent on project planning, discovery, and initial design work.

### Project Cancellation
If you cancel a project after work has begun, payment is due for all work completed to the date of cancellation. We will provide an itemised breakdown of work completed.

### Completed Projects
Refunds are not available for completed projects that have been delivered as agreed. If you are unhappy with the outcome, please raise this through our complaints process.

### Hosting & Maintenance Plans
Monthly plans can be cancelled with 30 days written notice. We do not offer refunds for unused days within a billing period.

### Exceptions
We will consider refunds in exceptional circumstances at our discretion. Please contact us at clients@dhwebsiteservices.co.uk to discuss.

### Consumer Rights
Nothing in this policy affects your statutory rights under UK consumer protection law.
    `,
  },
  '/cookies': {
    title: 'Cookie Policy',
    updated: 'January 2026',
    content: `
## What Are Cookies?
Cookies are small text files stored on your device when you visit a website. They help us provide a better experience.

## Cookies We Use

### Essential Cookies
Required for the website to function. These cannot be disabled.
- Session management
- Security tokens

### Analytics Cookies
If analytics is enabled on this site, those tools may set cookies to help us understand usage and improve the website.

### Preference Cookies
May remember choices you make on the site where those features are available.

## Managing Cookies
You can control cookies through your browser settings. Disabling certain cookies may affect site functionality.

## Third-Party Cookies
Some pages may include content from third parties (e.g., embedded maps) which may set their own cookies. We do not control these.

## Contact
Cookie queries: clients@dhwebsiteservices.co.uk
    `,
  },
  '/acceptable-use': {
    title: 'Acceptable Use Policy',
    updated: 'January 2026',
    content: `
## Acceptable Use Policy

### Permitted Use
You may use our website and services for lawful business purposes in accordance with these terms.

### Prohibited Activities
You must not use our services to:
- Distribute spam, malware, or harmful content
- Infringe intellectual property rights
- Conduct illegal activities or facilitate others to do so
- Harass, abuse, or harm any individual
- Attempt to gain unauthorised access to systems
- Scrape or extract data without permission
- Resell our services without written agreement

### Consequences
Violation of this policy may result in immediate suspension of services without refund, and we reserve the right to report illegal activity to relevant authorities.

### Reporting
To report abuse or policy violations: clients@dhwebsiteservices.co.uk
    `,
  },
  '/accessibility': {
    title: 'Accessibility Statement',
    updated: 'January 2026',
    content: `
## Our Commitment
DH Website Services is committed to making our website accessible to all users, including those with disabilities.

## Standards
We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.

## Current Status
We continually work to improve accessibility. Current measures include:
- Semantic HTML structure
- Sufficient colour contrast ratios
- Focus-visible interactive elements
- Alt text on meaningful images
- Responsive design for all screen sizes

## Known Issues
We are aware that some areas of the site may not yet meet full WCAG 2.1 AA compliance, particularly around custom interactive behaviour and modal accessibility. We are actively working to address these.

## Feedback
If you experience accessibility barriers, please contact us:
- Email: clients@dhwebsiteservices.co.uk
- Phone: 029 2002 4218

We aim to respond to accessibility feedback within 5 business days.

## Enforcement
If you are not satisfied with our response, you may contact the Equality Advisory and Support Service (EASS).
    `,
  },
  '/security': {
    title: 'Security & Disclosure Policy',
    updated: 'January 2026',
    content: `
## Security Measures
We take the security of our website and client data seriously. Measures include:
- SSL/TLS encryption on all pages
- Secure, regularly updated infrastructure
- Access controls and authentication
- Regular security reviews

## Responsible Disclosure
If you discover a security vulnerability in our website or services, we ask that you:

1. **Do not** exploit the vulnerability or access data you are not authorised to access
2. **Report it to us** promptly at clients@dhwebsiteservices.co.uk
3. **Give us reasonable time** to investigate and remediate before any public disclosure
4. **Include details** such as steps to reproduce, impact, and any relevant screenshots

## What We Promise
- We will acknowledge your report within 3 business days
- We will investigate and keep you informed of progress
- We will not take legal action against researchers acting in good faith

## Contact
Security reports: clients@dhwebsiteservices.co.uk
    `,
  },
  '/complaints': {
    title: 'Complaints Policy',
    updated: 'January 2026',
    content: `
## Our Commitment
We aim to provide excellent service. If something goes wrong, we want to hear about it and put it right.

## How to Complain

### Step 1 — Contact Us Directly
Email: clients@dhwebsiteservices.co.uk
Phone: 029 2002 4218
Write: DH Website Services, Cardiff, United Kingdom

Please include:
- Your name and contact details
- A clear description of your complaint
- What outcome you are seeking

### Step 2 — Investigation
We will acknowledge your complaint within 2 business days and provide a full response within 14 business days. If we need more time, we will let you know.

### Step 3 — Escalation
If you are not satisfied with our response, you may seek independent advice or pursue the matter through the relevant dispute resolution scheme or court.

## Record Keeping
We keep records of all complaints for 3 years.

## Continuous Improvement
All complaints are reviewed periodically to identify trends and improve our services.
    `,
  },
}

function renderMarkdown(text) {
  return text
    .split('\n')
    .map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700, marginTop: '32px', marginBottom: '12px', color: 'var(--dark)' }}>{line.slice(3)}</h2>
      if (line.startsWith('### ')) return <h3 key={i} style={{ fontSize: '16px', fontWeight: 700, marginTop: '20px', marginBottom: '8px', color: 'var(--cyan)' }}>{line.slice(4)}</h3>
      if (line.startsWith('- ')) {
        const parts = line.slice(2).split(/\*\*(.*?)\*\*/)
        return <li key={i} style={{ fontSize: '14px', color: 'var(--mid)', lineHeight: 1.8, marginBottom: '4px', marginLeft: '16px' }}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: 'var(--dark)' }}>{p}</strong> : p)}</li>
      }
      if (/^\d+\./.test(line)) return <li key={i} style={{ fontSize: '14px', color: 'var(--mid)', lineHeight: 1.8, marginBottom: '6px', marginLeft: '16px' }}>{line.replace(/^\d+\.\s/, '')}</li>
      if (line.trim() === '') return <div key={i} style={{ height: '8px' }} />
      const parts = line.split(/\*\*(.*?)\*\*/)
      return <p key={i} style={{ fontSize: '14px', color: 'var(--mid)', lineHeight: 1.8, marginBottom: '8px' }}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: 'var(--dark)', fontWeight: 600 }}>{p}</strong> : p)}</p>
    })
}

export default function Legal() {
  const { pathname } = useLocation()
  const policy = POLICIES[pathname]

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  if (!policy) return (
    <main style={{ paddingTop: '88px', padding: '120px 24px', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>Page Not Found</h1>
      <Link to="/" style={{ color: 'var(--cyan)' }}>← Back to Home</Link>
    </main>
  )

  return (
    <main style={{ paddingTop: '88px' }}>
      <section style={{ padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.06em', color: 'var(--mid)', marginBottom: '32px', transition: 'color 0.15s' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--cyan)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--mid)'}
          >← Back to Home</Link>
          <div style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>
Legal
          </div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.0, marginBottom: '8px' }}>{policy.title}</h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--light)', letterSpacing: '0.06em', marginBottom: '40px' }}>Last updated: {policy.updated}</p>
          <div style={{ padding: '40px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px' }}>
            {renderMarkdown(policy.content)}
          </div>
          <div style={{ marginTop: '32px', padding: '20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '13.5px', color: 'var(--mid)' }}>
            Questions about this policy? Email us at{' '}
            <a href="mailto:clients@dhwebsiteservices.co.uk" style={{ color: 'var(--cyan)' }}>clients@dhwebsiteservices.co.uk</a>
          </div>
        </div>
      </section>
    </main>
  )
}
