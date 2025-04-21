'use client';

import Image from 'next/image';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const formId = '17'; // Reemplaza este número con el ID real de tu formulario

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const formData = new FormData();
      
      // Campos requeridos por Contact Form 7
      formData.append('_wpcf7', formId);
      formData.append('_wpcf7_version', '5.8.4');
      formData.append('_wpcf7_locale', 'en_US');
      formData.append('_wpcf7_unit_tag', `wpcf7-f${formId}-o1`);
      formData.append('_wpcf7_container_post', '0');
      
      // Campo del email
      formData.append('your-email', email);

      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;
      console.log('Attempting to submit to:', url);
      console.log('Form data:', Object.fromEntries(formData));

      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: formData
      });

      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (responseData.status === 'mail_sent' || responseData.status === 'validation_failed') {
        setStatus(responseData.status === 'mail_sent' ? 'success' : 'error');
        setMessage(responseData.message);
        if (responseData.status === 'mail_sent') {
          setEmail('');
        }
      } else {
        throw new Error(responseData.message || 'Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error details:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Error al enviar el formulario');
    }
  };

  return (
    <section className="container mx-auto px-4 py-40">
      <div className="flex items-center justify-center">
        <div className="max-w-[768px]">
          <div className="flex flex-col gap-6 text-center">
            <p className="text-[#161e24] font-semibold">-- Rather use email? --</p>
            <h2 className="text-[38px] text-[#161e24] font-thin uppercase">
              Never miss out on <span className="text-[#ff2c72] font-semibold">learning</span>
            </h2>
            <div className="relative w-full aspect-[2/1]">
              <Image
                src="/img/email.webp"
                alt="email"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <p className="text-[#161e24] font-light py-10">
              My monthly newsletter comes with a dosis of inspiration, a curated downloadable swatches color palette, quick design tips and the same resources I learn from.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center gap-4">
              <input
                name="your-email"
                placeholder="Enter your email address"
                className="w-full h-[58px] px-4 rounded-md border-b rounded-none outline-none border-[#e7e3de]"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className={`w-full lg:w-auto flex items-center justify-center text-white text-[20px] h-[58px] px-10 rounded-md bg-[#ff2c72] ${
                  status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#e62665]'
                }`}
              >
                <span>{status === 'loading' ? 'Sending...' : 'JOIN & LEARN'}</span>
              </button>
            </form>
            {message && (
              <p className={`mt-4 text-center ${
                status === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 