/** /holiday-lets: direct booking sites for caravans, lodges and cottages (Nov 2026). */
import OfferPage from '../components/OfferPage'

export default function HolidayLets() {
  return (
    <OfferPage
      eyebrow="For holiday lets, caravans and lodges"
      title="Take bookings direct. Keep the commission."
      intro="A booking website for your caravans, lodges or cottages, with calendars that sync both ways with Airbnb, VRBO and Booking.com, so nothing double-books. A guest who books direct doesn't cost you a platform fee."
      planId="pro"
      planLabel="Direct booking website"
      included={[
        'Every unit with photos, prices and live availability',
        'Two-way calendar sync (iCal) with Airbnb, VRBO, Booking.com and other listing sites',
        'Booking requests straight to your inbox, or card deposits paid into your own Stripe account',
        'Search and filters by dates, guests, pets and unit type',
        'Fast, mobile-first and set up for Google',
        'Up to 15 pages: the park, the area, FAQs, terms',
      ]}
      sums={{
        title: 'The sums',
        body: 'Listing sites typically take 15% or more of each booking between host and guest fees; check your own statements for your exact figure. On a £600 week, 15% is £90. At that rate, around twelve bookings that come to you direct instead of through a platform pay for the build, and every one after that is money you keep.',
      }}
      faqs={[
        ['Do I have to come off Airbnb or Booking.com?', 'No. Keep your listings. The calendars sync, so the platforms bring new guests and your own site takes the repeat and direct bookings.'],
        ['Can owners log in to see their unit?', 'Yes, if you manage units for owners. It depends how your current system works, so we confirm that part in writing before you pay anything.'],
        ['How do guests pay?', 'Either a booking request you confirm yourself, or a card deposit through your own Stripe account. The money goes to you, not to us.'],
        ['What about the Wales visitor levy?', 'Every holiday let in Wales has to register with the Welsh Revenue Authority by 31 March 2027, and councils can charge a per-night levy, starting with Cardiff on 1 April 2027. If guests book direct, the levy has to be shown, charged and recorded by your own booking system, so we build it into the brief. Our visitor levy guide, under Guides, explains the rules.'],
        ['What does it cost after launch?', 'Hosting, security, backups and updates are on a care plan from £35 a month + VAT, starting when the site goes live. Month to month, 30 days\' notice.'],
      ]}
    />
  )
}
