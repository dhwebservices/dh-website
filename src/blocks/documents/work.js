/**
 * Shared content: our own products and the team. Read by home.js and
 * portfolio.js (and about.js for the team) so the facts live in one place.
 *
 * Status lines must stay literally true. Checked 6 Oct 2026:
 *   - Fish Tank: live on the App Store (id6801622379) and Google Play
 *     (com.dhwebsiteservices.fishtank), cross-platform multiplayer.
 *   - Fam & a Half (was FindMyGang): live on the App Store (id6819339433) since
 *     15 Oct 2026, iPhone only. Not on Google Play yet.
 *   - Staff portal: web app plus native iOS app, used internally. It ships to
 *     our own staff through TestFlight, so do not call it "on the App Store".
 *   - DH Phone: our own Twilio + Cloudflare phone system; 01443 805303 runs on
 *     it. The old Cardiff landline was not ported and is no longer shown
 *     anywhere on the site.
 *
 * No file here exports `blocks`, so the manifest generator skips it.
 */

export const WORK_ITEMS = [
  {
    name: 'Fish Tank',
    platforms: 'iPhone, iPad and Android',
    status: 'Live on the App Store and Google Play',
    tone: 'live',
    desc: 'A multiplayer fish game we designed, built and run. Players on iPhone and Android play against each other in real time, add friends, challenge them and climb a shared leaderboard.',
    points: 'Native Swift app for iOS, separate Android build · Cross-platform multiplayer on servers we run · Friends, challenges, push notifications and a daily leaderboard · Taken through Apple review and Google Play ourselves',
    icon: '/work/fish-tank-icon.png',
    image: '/work/fish-tank-title.jpg',
    imageAlt: 'Fish Tank on iPhone: the title screen with the tank, the Play button and the coin total',
    image2: '/work/fish-tank-home.jpg',
    image2Alt: 'Fish Tank on iPhone: a home aquarium full of fish',
    linkLabel: 'App Store',
    linkHref: 'https://apps.apple.com/gb/app/the-fish-tank/id6801622379',
    link2Label: 'Google Play',
    link2Href: 'https://play.google.com/store/apps/details?id=com.dhwebsiteservices.fishtank',
  },
  {
    name: 'Fam & a Half',
    platforms: 'iPhone',
    status: 'Live on the App Store',
    tone: 'live',
    desc: 'Free, private location sharing for family and friends, named after our own family group chat. Live map, arrival alerts, SOS and crash detection, pick-up requests and night-out circles. Free on the App Store.',
    icon: '/work/findmygang-icon.png',
    iconAlt: 'Fam & a Half app icon',
    panel: '#E7F1EC',
    linkLabel: 'See the app',
    linkHref: '/famandahalf/',
  },
  {
    name: 'DH Staff Portal',
    platforms: 'Web and native iOS app',
    status: 'In daily use',
    tone: 'internal',
    desc: 'The system we run our own staff on. Microsoft sign-in, rotas, clock-in, timesheets, leave approvals and payslips, with push notifications to the phone and shifts synced to Outlook.',
    icon: '/work/staff-portal-icon.png',
    iconAlt: 'DH Staff Portal app icon',
    panel: '#ECEEEC',
  },
  {
    name: 'DH Phone',
    platforms: 'Cloud phone system',
    status: 'Takes our calls',
    tone: 'internal',
    desc: 'Our own phone system, built to replace a hosted one. The greeting, the call menu, the queue and who rings in what order all run on our code, with Twilio carrying the calls. Ring 01443 805303 and you are on it.',
    flow: 'Incoming call → Greeting and menu → Queue → Rings the team',
    panel: '#F4F5F3',
  },
]

/*
 * Client websites we have built and still look after. Same rule as above:
 * only what is true and public. Never prices, contract terms or anything from
 * the client's admin. Checked 6 Nov 2026:
 *   - The Maltsters Arms, Pontypridd: live at maltstersponty.com since
 *     28 Oct 2026, built and hosted by us, with an admin the pub uses itself.
 */
export const CLIENT_SITES = [
  {
    name: 'The Maltsters Arms',
    place: 'Pub · Bridge Street, Pontypridd',
    status: 'Live',
    desc: 'A new website for a local pub. It is built around their own photos of the building at night, with a neon sign, the week\'s offers and what is on.',
    points: 'What\'s On page the pub updates itself · Their own login for opening hours, drinks, photos and notices · Mailing list for events · Built, hosted and looked after by us',
    image: '/work/maltsters-arms-site.jpg',
    imageSmall: '/work/maltsters-arms-site-960.jpg',
    imageAlt: 'The Maltsters Arms website: the pub at night with a red neon Maltsters Arms sign over it',
    url: 'maltstersponty.com',
    linkLabel: 'Visit the site',
    linkHref: 'https://maltstersponty.com/',
    caseStudyHref: '/case-studies/maltsters-arms/',
  },
]

/*
 * No mobile numbers here (8 Nov 2026): every call goes through 01443 805303
 * so DH Phone logs it, texts back if it is missed and can route it later.
 *
 * TODO(David): photos. Drop a square photo in public/team/ and set `photo` on
 * each person below; the initials are only a stand-in.
 */
export const TEAM_PEOPLE = [
  {
    name: 'David Hooper',
    role: 'Founder · Development',
    initials: 'DH',
    photo: '',
    email: 'david@dhwebsiteservices.co.uk',
    desc: 'Started the company. Designs and builds the apps, websites and the systems behind them, and takes them through Apple and Google review.',
  },
  {
    name: 'Jack Deane',
    role: 'Assistant Manager',
    initials: 'JD',
    photo: '',
    email: 'jack@dhwebsiteservices.co.uk',
    desc: 'Looks after enquiries, bookings and the day-to-day running of projects, and tests our apps on his own phone before they go out.',
    // Certificates and training shown under the name.
    badges: [
      { label: 'GDPR Foundations certified', detail: 'Measured Collective · Nov 2026' },
    ],
  },
]
