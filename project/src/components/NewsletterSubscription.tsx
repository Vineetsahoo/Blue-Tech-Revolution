import React, { useState } from 'react';
import { useNewsletterSubscription } from '../hooks/useNewsletterSubscription';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const { isSubmitting, error, success, subscribe } = useNewsletterSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await subscribe(email);
    if (!error) {
      setEmail('');
    }
  };

  return (
    <div className="bg-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-200 mb-6">
            Subscribe to our newsletter for the latest ocean cleanup initiatives
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 rounded-md text-gray-900"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 px-6 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {error && (
              <div className="mt-2 text-red-400 text-sm">{error}</div>
            )}
            {success && (
              <div className="mt-2 text-green-400 text-sm">
                Successfully subscribed to the newsletter!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}