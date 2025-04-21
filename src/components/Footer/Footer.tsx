import Image from 'next/image';

interface SocialLinkProps {
  icon: string;
  href: string;
}

function SocialLink({ icon, href }: SocialLinkProps) {
  return (
    <a href={href} className="w-10 h-10 bg-[#b2ada6] rounded-full flex items-center justify-center text-white hover:bg-[#ff2c72] transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icon === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
        {icon === 'x' && <><path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-9.248M14.496 7l-4.969 6.783M8.267 4h11.733" /></>}
        {icon === 'instagram' && <><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>}
      </svg>
    </a>
  );
}

interface RSSLinkProps {
  text: string;
  href: string;
}

function RSSLink({ text, href }: RSSLinkProps) {
  return (
    <a href={href} className="flex items-center gap-2 text-[#161e24] hover:text-[#FF80AA] transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1" />
      </svg>
      <span className="text-[20px] font-light">{text}</span>
    </a>
  );
}

export function Footer() {
  const socialLinks: SocialLinkProps[] = [
    { icon: 'facebook', href: '#' },
    { icon: 'x', href: '#' },
    { icon: 'instagram', href: '#' }
  ];

  const rssLinks: RSSLinkProps[] = [
    { text: 'Inspiration', href: '#' },
    { text: 'Design', href: '#' },
    { text: 'Sidenotes', href: '#' },
    { text: 'All feeds bundled', href: '#' }
  ];

  return (
    <footer className="bg-[#fbfaf8]">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-9">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden flex-shrink-0 relative">
                <Image
                  src="/img/avatar.png"
                  alt="avatar"
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
              <div className="flex items-start flex-col">
                <h1 className="text-[30px] text-[#c6c4c0] font-thin mb-5">Hi I&apos;m Luis,</h1>
                <p className="text-[20px] text-[#161e24] font-light leading-relaxed">
                  I&apos;m a <a href="/about" className="text-[#FF80AA]">fullstack developer</a> and tech enthusiast based in Lima, Perú. This personal space reflects my journey through <a href="/posts/development" className="text-[#FF80AA]">code</a>, <a href="/posts/design" className="text-[#FF80AA]">design</a>, and life—always driven by a passion for learning and sharing what I know. I&apos;m into clean, thoughtful interfaces, clever architecture, and soulful ideas that make tech more human.
                </p>
                <p className="text-[20px] text-[#161e24] font-light mb-5">
                  Get to know me! <a href="#" className="text-[#FF80AA] inline-flex items-center">About myself 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </a>
                </p>
                <a className="flex items-center justify-center text-[#b2ada6] text-[20px] font-light gap-1 h-[56px] px-10 rounded-md border-2 border-[#e7e3de] hover:bg-[#ff2c72] hover:text-white hover:border-[#ff2c72] transition-colors duration-200 group" href="">
                  <span>Have a question?</span>
                  <span className="text-[#FF80AA] group-hover:text-white">Get In Touch</span>
                </a>
              </div>
            </div>
            <div className="mt-12 lg:pl-[154px]">
              <h1 className="text-sm text-[#c6c4c0] font-semibold mb-5">FIND ME ON!</h1>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <SocialLink key={index} {...link} />
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <h1 className="text-[30px] text-[#c6c4c0] font-thin mb-5">RSS Feed</h1>
            <div className="space-y-4">
              {rssLinks.map((link, index) => (
                <RSSLink key={index} {...link} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 