interface HeroProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  }
  const Hero: React.FC<HeroProps> = ({
    src,
    alt,
    width,
    height,
    className = ''
  }) => {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`max-w-full h-auto ${className}`}
        loading="lazy"
        decoding="async"
      />
    );
  };
 
export default Hero;