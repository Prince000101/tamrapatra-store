import { useState } from "react";

const ImageWithSkeleton = ({ src, alt, className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-indigo-light/20 animate-pulse rounded-inherit" />
      )}
      {error ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-plum-dark text-gray-400 dark:text-ivory/30 text-3xl">
          🌿
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
};

export default ImageWithSkeleton;
