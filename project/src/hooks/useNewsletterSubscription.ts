import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useNewsletterSubscription() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const subscribe = async (email: string) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: subscriptionError } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (subscriptionError) throw subscriptionError;

      setSuccess(true);
    } catch (e) {
      setError('Failed to subscribe. Please try again.');
      console.error('Newsletter subscription error:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    success,
    subscribe,
  };
}