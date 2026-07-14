export default function BrandLogo({ compact = false }) {
  return (
    <span className={`brand-logo${compact ? ' is-compact' : ''}`}>
      <img src="/dh-logo-icon.png" alt="DH Website Services logo" className="brand-logo__icon" />
      <span className="brand-logo__text">
        <span>DH Website</span>
        <span>Services</span>
      </span>
    </span>
  )
}
