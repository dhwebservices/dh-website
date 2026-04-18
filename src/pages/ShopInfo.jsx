const CONTENT = {
  delivery: {
    title: 'Delivery',
    body: 'Orders placed through the DH Website Services shop are reviewed by our team, procured from suppliers, and then dispatched through the agreed fulfilment route. Delivery timing depends on supplier confirmation and product availability.',
  },
  returns: {
    title: 'Returns',
    body: 'Returns are reviewed through DH Website Services. Please contact the team with the order number, device details, and reason for return before sending any goods back.',
  },
  warranty: {
    title: 'Warranty',
    body: 'Warranty support depends on the manufacturer and supplier route used for the product. DH Website Services will coordinate the initial support path and provide the next required steps.',
  },
  cancellations: {
    title: 'Cancellations',
    body: 'Orders can be cancelled before supplier procurement has been completed. Once a supplier order has been placed, cancellation is subject to the supplier’s terms and any costs already incurred.',
  },
}

export default function ShopInfo({ page, type }) {
  const content = CONTENT[type || page] || CONTENT.delivery

  return (
    <main style={{ padding: 'calc(var(--nav-h) + 40px) max(24px, 50vw - 580px) 96px' }}>
      <div style={{ maxWidth: 820, display: 'grid', gap: 18 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>
          Shop policy
        </div>
        <h1 style={{ fontSize: 'clamp(34px, 5vw, 54px)', lineHeight: 0.98, letterSpacing: '-0.05em', fontWeight: 600 }}>{content.title}</h1>
        <div style={{ padding: 28, borderRadius: 24, border: '1px solid var(--border-light)', background: '#fff', fontSize: 16, lineHeight: 1.9, color: 'var(--mid)' }}>
          {content.body}
        </div>
      </div>
    </main>
  )
}
