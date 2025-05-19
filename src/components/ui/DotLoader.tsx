export default function CircularDotLoader() {
    return (
      <div className="flex items-center justify-center h-24">
        <div className="relative w-12 h-12">
          {[...Array(8)].map((_, i) => {
            const angle = (360 / 8) * i;
            const delay = i * 0.1;
  
            return (
              <span
                key={i}
                className="absolute w-2 h-2 bg-blue-600 rounded-full animate-bounce-dot"
                style={{
                  top: `calc(50% - 0.25rem)`,
                  left: `calc(50% - 0.25rem)`,
                  transform: `rotate(${angle}deg) translate(18px)`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
  