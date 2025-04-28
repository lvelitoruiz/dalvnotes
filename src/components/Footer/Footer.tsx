'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { ContactForm } from '../ContactForm/ContactForm';
import Link from 'next/link';

interface SocialLinkProps {
  icon: string;
  href: string;
}

function SocialLink({ icon, href }: SocialLinkProps) {
  return (
    <a href={href} className="w-10 h-10 bg-[#b2ada6] rounded-full flex items-center justify-center text-white hover:bg-[#ff2c72] transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icon === 'github' && <><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></>}
        {icon === 'x' && <><path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-9.248M14.496 7l-4.969 6.783M8.267 4h11.733" /></>}
        {icon === 'linkedin' && <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>}
        {icon === 'website' && <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>}
      </svg>
    </a>
  );
}

// interface RSSLinkProps {
//   text: string;
//   href: string;
// }

// function RSSLink({ text, href }: RSSLinkProps) {
//   return (
//     <a href={href} target="_blank" className="flex items-center gap-2 text-[#161e24] hover:text-[#FF80AA] transition-colors">
//       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M4 11a9 9 0 0 1 9 9" />
//         <path d="M4 4a16 16 0 0 1 16 16" />
//         <circle cx="5" cy="19" r="1" />
//       </svg>
//       <span className="text-[20px] font-light">{text}</span>
//     </a>
//   );
// }

export function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const socialLinks: SocialLinkProps[] = [
    { icon: 'github', href: 'https://github.com/lvelitoruiz' },
    { icon: 'linkedin', href: 'https://linkedin.com/in/luisvelito' },
    { icon: 'website', href: 'https://luisvelito.com' }
  ];

  // const rssLinks: RSSLinkProps[] = [
  //   { text: 'Artículos', href: '/rss/articles' },
  //   { text: 'Inspiración', href: '/rss/inspiration' },
  //   { text: 'Tutoriales', href: '/rss/tutorial' },
  //   { text: 'Todos juntos', href: '/rss.xml' }
  // ];

  return (
    <footer className="bg-[#fbfaf8]">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden flex-shrink-0 relative">
                <Image
                  src="/img/retrato.png"
                  alt="avatar"
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
              <div className="flex items-start flex-col">
                <h1 className="text-[30px] text-[#c6c4c0] font-thin mb-5">Hola soy Luis,</h1>
                <p className="text-[20px] text-[#161e24] font-light leading-relaxed">
                  Soy un <Link href="/about" className="text-[#FF80AA]">desarrollador fullstack</Link> y entusiasta de la tecnología basado en Lima, Perú. Este espacio personal refleja mi viaje a través del <Link href="/posts/development" className="text-[#FF80AA]">código</Link>, el <Link href="/posts/design" className="text-[#FF80AA]">diseño</Link> y la vida—siempre impulsado por la pasión de aprender y compartir lo que sé. Me apasionan las interfaces limpias, la arquitectura inteligente y las ideas significativas que hacen que la tecnología sea más humana.
                </p>
                <p className="text-[20px] text-[#161e24] font-light mb-5">
                  <a href="https://luisvelito.com/" target="_blank" className="text-[#FF80AA] inline-flex items-center">Conóceme!  
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </a>
                </p>
                <a
                  className="flex items-center justify-center text-[#b2ada6] text-[20px] font-light gap-1 h-[56px] px-10 rounded-md border-2 border-[#e7e3de] hover:bg-[#ff2c72] hover:text-white hover:border-[#ff2c72] transition-colors duration-200 group"
                  onClick={() => setIsModalOpen(true)}
                  href="#"
                >
                  <span>¿Tienes alguna pregunta?</span>
                  <span className="text-[#FF80AA] group-hover:text-white">Contáctame!</span>
                </a>
              </div>
            </div>
            <div className="mt-12 lg:pl-[154px]">
              <h1 className="text-sm text-[#c6c4c0] font-semibold mb-5">Encuéntrame en:</h1>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <SocialLink key={index} {...link} />
                ))}
              </div>
            </div>
          </div>
          {/* <div className="md:col-span-3">
            <h1 className="text-[30px] text-[#c6c4c0] font-thin mb-5">RSS Feed</h1>
            <div className="space-y-4">
              {rssLinks.map((link, index) => (
                <RSSLink key={index} {...link} />
              ))}
            </div>
          </div> */}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="¿Cómo puedo ayudarte?"
      >
        <ContactForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </footer>
  );
} 