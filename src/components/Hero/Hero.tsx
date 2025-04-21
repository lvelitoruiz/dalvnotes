import Image from 'next/image';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  color?: string;
}

const StyledLink = ({ href, children, color = '#9283a8' }: LinkProps) => (
  <a
    href={href}
    className="uppercase font-semibold transition-shadow duration-300 shadow-[inset_0_-1px_0_rgba(146,131,168,0.5),0_0_0_rgba(146,131,168,0.5)] hover:shadow-[inset_0_-80px_0_rgba(146,131,168,0.2),0_1px_0_rgba(146,131,168,0.2)]"
    style={{ color }}
  >
    {children}
  </a>
);

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 relative">
          <Image 
            src="/img/avatar.png" 
            alt="avatar" 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 192px, 192px"
            priority
          />
        </div>
        <div className="flex-1">
          <div className="text-center md:text-left space-y-4">
            <p className="text-2xl text-foreground leading-[1.6]">
              Hi, I&apos;m Luis Velito! Explore my{' '}
              <StyledLink href="/posts/development" color="#786596">development insights</StyledLink>{' '}
              and{' '}
              <StyledLink href="/posts/tutorial">tutorials</StyledLink> shaped by years 
              of experience in both{' '}
              <StyledLink href="#" color="#ffb41f">frontend</StyledLink>{' '}
              and{' '}
              <StyledLink href="#" color="#7e4b71">backend</StyledLink>. Dive into 
              the{' '}
              <StyledLink href="/posts/articles" color="#81adcc">creative and technical processes</StyledLink>{' '}
              behind my projects, and{' '}
              <StyledLink href="/posts/inspiration" color="#FF80AA">get inspired</StyledLink>{' '}
              to push the limits of what you can build. Check out my{' '}
              <StyledLink href="/resources" color="#161e24">curated resources</StyledLink>, 
              and explore my thoughts on tech trends, design, innovation, and the little 
              details that make code beautiful. Let&apos;s grow and create together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 