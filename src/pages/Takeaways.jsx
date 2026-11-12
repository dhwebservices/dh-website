/** /takeaways: own ordering instead of delivery-app commission (Nov 2026). */
import OfferPage from '../components/OfferPage'

export default function Takeaways() {
  return (
    <OfferPage
      eyebrow="For takeaways, cafés and restaurants"
      title="Your own ordering. No commission on every order."
      intro="Customers order and pay from your own ordering app, for collection or your own delivery. The delivery apps take a cut of every order; your own ordering doesn't."
      planId="booking-app"
      planLabel="Your own ordering app"
      included={[
        'Your menu, with sizes, extras and allergens',
        'Card payments into your own Stripe account, so the money goes straight to you',
        'Collection times, or delivery to the postcodes you choose',
        'New orders flagged to the kitchen the moment they come in',
        'Your regulars can reorder in a couple of taps',
        'You change prices and sold-out items yourself, from one screen',
      ]}
      sums={{
        title: 'The sums',
        body: 'Delivery apps typically charge restaurants a commission on every order, often between 14% and 30% depending on the plan; check your own statements for your figure. At 20%, every £1,000 of orders costs £200. Move some of your regulars to your own ordering and the app pays for itself quickly. Card processing through Stripe is a small percentage per payment, set by Stripe.',
      }}
      faqs={[
        ['Do I have to come off Just Eat or Uber Eats?', 'No. Keep them for new customers. Put your own ordering on your menus, bags and social media so your regulars order direct.'],
        ['Who delivers?', 'You do, or customers collect. If you rely on the apps\' own drivers, keep using them for those orders.'],
        ['How do I get paid?', 'Card payments go into your own Stripe account. We never hold your money.'],
        ['What does it cost after launch?', 'App care is £29 a month + VAT from launch: hosting, updates and fixes. Month to month, 30 days\' notice.'],
      ]}
    />
  )
}
