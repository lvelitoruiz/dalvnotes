import Image from 'next/image';

export function Newsletter() {
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
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <input
                placeholder="Enter your email address"
                className="w-full h-[58px] px-4 rounded-md border-b rounded-none outline-none border-[#e7e3de]"
                type="text"
              />
              <button className="w-full lg:w-auto flex items-center justify-center text-white text-[20px] h-[58px] px-10 rounded-md bg-[#ff2c72]">
                <span>JOIN & LEARN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 