import Image from "next/image";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  color?: string;
}

const StyledLink = ({ href, children, color = "#9283a8" }: LinkProps) => (
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
      {/* <div className="flex justify-center items-center mb-12 w-full h-36 overflow-hidden">
        <svg
          width="247.49644886363635"
          height="304.915625"
          viewBox="0 0 250 308"
          className="w-auto h-36"
        >
          <defs id="SvgjsDefs1015"></defs>
          <g
            id="SvgjsG1016"
            transform="matrix(1,0,0,1,0,19)"
            fill="#111111"
          >
            <rect y="0" height="1" width="1" opacity="0"></rect>
            <rect y="284" width="250" height="5"></rect>
          </g>
          <g
            id="SvgjsG1017"
            transform="matrix(2.2222222222222223,0,0,2.2222222222222223,13.88888888888889,-35.333333333333336)"
            fill="#111111"
          >
            <g xmlns="http://www.w3.org/2000/svg">
              <path d="M80,28v35H20V28 M84,24H16v43h68V24L84,24z"></path>
              <polygon points="57.614,74 57.29,74 42.705,74 42.379,74 5,74 5.964,76 94.035,76 95,74  "></polygon>
              <polygon points="84.555,69 15.608,69 5,72 95,72  "></polygon>
            </g>
          </g>
          <g
            id="SvgjsG1018"
            transform="matrix(2.175816721438355,0,0,2.175816721438355,-9.136689910327242,127.05686280004133)"
            fill="#111111"
          >
            <path d="M4.1992 40 l0 -27.617 l9.1016 0 c8.4961 0 12.813 5.7031 12.813 13.789 c0 8.1445 -4.3164 13.828 -12.813 13.828 l-9.1016 0 z M8.0859 36.4844 l5.0586 0 c6.0352 0 8.9063 -4.0039 8.9063 -10.313 c0 -6.2695 -2.8711 -10.293 -8.9063 -10.293 l-5.0586 0 l0 20.605 z M57.03630859375 40 l-2.3047 -6.4453 l-12.344 0 l-2.3047 6.4453 l-4.043 0 l10.176 -27.617 l4.6875 0 l10.176 27.617 l-4.043 0 z M43.59910859375 30.1562 l9.9219 0 l-4.9609 -13.926 z M76.7099234375 36.4844 l9.4336 0 l0 3.5156 l-13.32 0 l0 -27.617 l3.8867 0 l0 24.102 z M114.99698828125 12.383 l4.1016 0 l-10.156 27.617 l-4.0625 0 l-10.117 -27.617 l4.082 0 l8.0859 22.852 z"></path>
          </g>
          <g
            id="SvgjsG1019"
            transform="matrix(1.677787745104063,0,0,1.677787745104063,-7.045532163059996,203.84693348550573)"
            fill="#111111"
          >
            <path d="M22.813 12.383 l3.8672 0 l0 27.617 l-4.1992 0 l-14.434 -21.914 l0 21.914 l-3.8477 0 l0 -27.617 l4.1602 0 l14.453 21.816 l0 -21.816 z M53.44312109375 40.37109 c-7.832 0 -13.809 -5.3906 -13.809 -14.199 c0 -8.7891 5.9766 -14.16 13.809 -14.16 c7.793 0 13.789 5.3711 13.789 14.16 c0 8.8086 -5.9961 14.199 -13.789 14.199 z M53.44312109375 36.7187 c5.5273 0 9.9023 -3.8281 9.9023 -10.547 c0 -6.6602 -4.375 -10.488 -9.9023 -10.488 c-5.5469 0 -9.9414 3.8281 -9.9414 10.488 c0 6.7188 4.3945 10.547 9.9414 10.547 z M94.8933046875 12.383 l0 3.4961 l-6.9922 0 l0 24.121 l-3.8477 0 l0 -24.121 l-7.0117 0 l0 -3.4961 l17.852 0 z M121.63745703125 15.879000000000001 l-11.055 0 l0 8.5938 l9.7461 0 l0 3.4766 l-9.7461 0 l0 8.5352 l11.055 0 l0 3.5156 l-15.02 0 l0 -27.617 l15.02 0 l0 3.4961 z M143.342234375 40.37109 c-5.7617 0 -9.9805 -2.7539 -10.918 -7.4414 l3.9648 -0.9375 c0.625 3.2227 3.418 5.0781 7.0898 5.0781 c2.9492 0 5.7813 -1.2109 5.7227 -4.5313 c-0.039063 -3.2813 -3.5938 -4.1797 -7.3633 -5.2148 c-4.2773 -1.1719 -8.5547 -2.5195 -8.5547 -7.5977 c0 -5.1367 4.2383 -7.7148 9.2578 -7.7148 c4.8633 0 9.2383 2.0508 10.273 6.7969 l-3.7695 0.95703 c-0.68359 -3.0664 -3.2422 -4.4336 -6.3281 -4.4336 c-2.7734 0 -5.5273 1.2109 -5.5273 4.3555 c0 2.8516 3.0859 3.6914 6.582 4.6289 c4.3945 1.1914 9.4336 2.5586 9.4336 8.1055 c0 5.5859 -4.6875 7.9492 -9.8633 7.9492 z"></path>
          </g>
        </svg>
      </div> */}
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
            <p className="text-2xl text-foreground font-thin leading-[2]">
              ¡Hola, soy Luis Velito! Explora mis{" "}
              <StyledLink href="/posts/articles" color="#786596">
                artículos de desarrollo
              </StyledLink>{" "}
              y <StyledLink href="/posts/tutorial">tutoriales</StyledLink>{" "}
              basados en años de experiencia tanto en{" "}
              <StyledLink href="#" color="#ffb41f">
                frontend
              </StyledLink>{" "}
              como en{" "}
              <StyledLink href="#" color="#7e4b71">
                backend
              </StyledLink>
              . Descubre los{" "}
              <StyledLink href="/posts/articles" color="#81adcc">
                procesos creativos y técnicos
              </StyledLink>{" "}
              detrás de mis proyectos, y{" "}
              <StyledLink href="/posts/inspiration" color="#FF80AA">
                encuentra inspiración
              </StyledLink>{" "}
              para llevar tus creaciones al siguiente nivel. Explora mis{" "}
              <StyledLink href="/posts/inspiration" color="#161e24">
                recursos seleccionados
              </StyledLink>
              , y conoce mis perspectivas sobre tendencias tecnológicas, diseño,
              innovación y los pequeños detalles que hacen que el código sea
              hermoso. ¡Crezcamos y construyamos juntos!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
