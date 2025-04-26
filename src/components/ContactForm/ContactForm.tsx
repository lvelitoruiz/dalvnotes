'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const formId = '25'; // ID actualizado del formulario

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const data = new FormData();
      
      // Campos requeridos por Contact Form 7
      data.append('_wpcf7', formId);
      data.append('_wpcf7_version', '5.8.4');
      data.append('_wpcf7_locale', 'en_US');
      data.append('_wpcf7_unit_tag', `wpcf7-f${formId}-o1`);
      data.append('_wpcf7_container_post', '0');
      
      // Campos del formulario - usando los nombres exactos del formulario CF7
      data.append('your-name', formData.name);
      data.append('your-email', formData.email);
      data.append('your-subject', formData.subject);
      data.append('your-message', formData.message);

      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;
      console.log('Submitting to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: data
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (responseData.status === 'mail_sent') {
        setStatus('success');
        setMessage(responseData.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
        onSuccess?.();
      } else {
        throw new Error(responseData.message || 'Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error details:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Error al enviar el formulario');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="block text-[#161e24] mb-2">Tu nombre <span className="text-[#ff2c72]">*</span></label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
          className="w-full h-[58px] px-4 border-b border-[#e7e3de] outline-none"
        />
      </div>

      <div>
        <label className="block text-[#161e24] mb-2">Tu email <span className="text-[#ff2c72]">*</span></label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          className="w-full h-[58px] px-4 border-b border-[#e7e3de] outline-none"
        />
      </div>

      <div>
        <label className="block text-[#161e24] mb-2">Asunto <span className="text-[#ff2c72]">*</span></label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full h-[58px] px-4 border-b border-[#e7e3de] outline-none"
        />
      </div>

      <div>
        <label className="block text-[#161e24] mb-2">Tu mensaje (opcional)</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className="w-full p-4 border-b border-[#e7e3de] outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full flex items-center justify-center text-white text-[20px] h-[58px] px-10 rounded-md bg-[#ff2c72] ${
          status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#e62665]'
        }`}
      >
        <span>{status === 'loading' ? 'Enviando...' : 'Enviar'}</span>
      </button>

      {message && (
        <p className={`text-center ${
          status === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {message}
        </p>
      )}
    </form>
  );
} 