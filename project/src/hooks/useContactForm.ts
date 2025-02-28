import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: submissionError } = await supabase
        .from('contact_submissions')
        .insert([data]);

      if (submissionError) throw submissionError;

      setSuccess(true);
    } catch (e) {
      setError('Failed to submit form. Please try again.');
      console.error('Contact form submission error:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    success,
    submitForm,
  };
}