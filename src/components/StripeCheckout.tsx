'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';

// Initialize Stripe (use your publishable key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface StripeCheckoutProps {
  priceId: string;
  licenseType: 'regular' | 'extended';
  buttonText: string;
  buttonClass: string;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  priceId,
  licenseType,
  buttonText,
  buttonClass,
}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);

  const handleCheckout = async () => {
    if (!email) {
      setShowEmailInput(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          licenseType,
          customerEmail: email,
        }),
      });

      const { sessionId, url } = await response.json();

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        // Fallback to client-side redirect
        const stripe = await stripePromise;
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId });
          if (error) {
            console.error('Stripe checkout error:', error);
            alert('Payment failed. Please try again.');
          }
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showEmailInput) {
    return (
      <div className="space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          className="w-full px-4 py-3 border border-slate-200 rounded-full focus:outline-none focus:border-primary-500"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && email && handleCheckout()}
          autoFocus
        />
        <button
          onClick={handleCheckout}
          disabled={loading || !email}
          className={buttonClass}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Processing...
            </div>
          ) : (
            'Continue to Payment'
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={buttonClass}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Processing...
        </div>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default StripeCheckout;