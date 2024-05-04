"use client";

import Image from "next/image";

const ServerImage = () => {
  return (
    <Image
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      alt="Photo by Drew Beamer"
      fill
      className="rounded-md object-cover"
    />
  );
};

export default ServerImage;
