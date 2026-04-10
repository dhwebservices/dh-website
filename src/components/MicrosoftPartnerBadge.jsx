export default function MicrosoftPartnerBadge({ width = 240, framed = false, style = {} }) {
  const frameStyle = framed
    ? {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '18px 20px',
        borderRadius: 22,
        background: 'white',
        border: '1px solid var(--border-light)',
      }
    : {}

  return (
    <div style={{ ...frameStyle, ...style }}>
      <img
        src="/microsoft-partner.svg"
        alt="Microsoft Partner"
        style={{
          display: 'block',
          width: '100%',
          maxWidth: width,
          height: 'auto',
        }}
      />
    </div>
  )
}
