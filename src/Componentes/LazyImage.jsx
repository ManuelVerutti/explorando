import React, { useState, useEffect } from 'react';
import './LazyImage.css';

function LazyImage({ src, alt, ...props }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <img
      className='LaziImage'
      src={src}
      alt={alt}
      style={{ opacity: loaded ? 1 : 0 }}
      {...props}
    />
  );
}

export default LazyImage;