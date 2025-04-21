import Link from 'next/link';

interface MoreButtonProps {
  text: string;
  variant?: 'light' | 'dark';
  href: string;
}

export function MoreButton({ text, variant = 'dark', href }: MoreButtonProps) {
  return (
    <div className="text-center mt-12">
      <Link
        href={href}
        className={`
          flex inline-flex items-center justify-center 
          px-8 h-[63px] border-2 rounded-md text-[20px] font-bold 
          transition-colors duration-200
          ${variant === 'dark' 
            ? 'border-black text-black hover:bg-[#ff2c72] hover:text-white hover:border-[#ff2c72]' 
            : 'border-white text-white hover:bg-[#ff2c72] hover:text-white hover:border-[#ff2c72]'
          }
        `}
      >
        <span>{text}</span>
      </Link>
    </div>
  );
} 