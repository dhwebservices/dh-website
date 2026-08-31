/**
 * Line icons for the marketing blocks.
 *
 * These replace the emoji the CMS still stores (💻 🎨 🛠 👥 …). Emoji render
 * differently on every platform, cannot be coloured, and were being pushed
 * through `filter: grayscale(1) opacity(0.4)` to stop them clashing -- which
 * left them as grey blobs. Content keeps its emoji; this maps them to a real
 * icon, and anything unrecognised falls through to the original character so
 * an editor can never break a card by typing something new.
 */

const PATHS = {
  code: <><path d="M8 6 3 12l5 6" /><path d="m16 6 5 6-5 6" /></>,
  phone: <><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M10.5 18.5h3" /></>,
  game: <><path d="M7 12h4M9 10v4" /><circle cx="15.5" cy="11" r=".9" /><circle cx="17.5" cy="13.5" r=".9" /><path d="M17.4 7H6.6a4.6 4.6 0 0 0-4.5 3.7l-.9 5A3.2 3.2 0 0 0 4.3 19c1 0 1.9-.5 2.5-1.3L8 16h8l1.2 1.7c.6.8 1.5 1.3 2.5 1.3a3.2 3.2 0 0 0 3.1-3.3l-.9-5A4.6 4.6 0 0 0 17.4 7Z" /></>,
  design: <><path d="M12 3 4 11l3 3" /><path d="m14 5 5 5-8 8H6v-5z" /><path d="M3 21h7" /></>,
  support: <><path d="M14.5 5.5a4 4 0 0 0 5 5L21 9a6 6 0 0 1-8.2 6.5L7 21.3a2.3 2.3 0 0 1-3.3-3.3l5.8-5.8A6 6 0 0 1 15 4z" /></>,
  people: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5.5a3 3 0 0 1 0 5.8" /><path d="M18 14.5a6 6 0 0 1 3 5.5" /></>,
  lock: <><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  award: <><circle cx="12" cy="9" r="5" /><path d="m8.5 13.5-1 7.5 4.5-2.5 4.5 2.5-1-7.5" /></>,
  bolt: <><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></>,
  rocket: <><path d="M13.5 3C17 3 21 7 21 10.5c0 2-4 6-6.5 7.5L9 13 4.5 8.5C6 6 10 3 13.5 3z" /><circle cx="14.5" cy="9.5" r="1.6" /><path d="M6 16c-1.5 1.5-1.5 4-1.5 4S7 20 8.5 18.5" /></>,
  check: <><path d="m4 12.5 5 5L20 6.5" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.2 8.3-8 9.8C7.2 20.3 4 16.5 4 12V6z" /></>,
  search: <><circle cx="11" cy="11" r="6" /><path d="m20 20-3.5-3.5" /></>,
  cart: <><circle cx="9.5" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2.5 3h2.6l2.6 12h11L21 7H6" /></>,
}

/** What the CMS currently stores, mapped to the set above. */
const FROM_EMOJI = {
  '💻': 'code', '🖥': 'code', '⌨️': 'code',
  '📱': 'phone', '📲': 'phone',
  '🎮': 'game', '🕹': 'game', '🕹️': 'game',
  '🎨': 'design', '✏️': 'design',
  '🛠': 'support', '🛠️': 'support', '🔧': 'support', '⚙️': 'support',
  '👥': 'people', '🧑‍💼': 'people',
  '🔒': 'lock', '🔐': 'lock',
  '🏆': 'award', '🥇': 'award',
  '⚡': 'bolt', '🚀': 'rocket',
  '✓': 'check', '✅': 'check', '☑️': 'check',
  '🛡': 'shield', '🛡️': 'shield',
  '🔍': 'search', '🔎': 'search',
  '🛒': 'cart',
}

export function Icon({ name, size = 22, color = 'var(--accent)', strokeWidth = 1.6, style }) {
  const key = PATHS[name] ? name : FROM_EMOJI[String(name || '').trim()]
  const paths = PATHS[key]

  // Unrecognised: render whatever the editor typed rather than nothing.
  if (!paths) {
    return <span style={{ fontSize: size, lineHeight: 1, ...style }}>{name}</span>
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {paths}
    </svg>
  )
}

export default Icon
