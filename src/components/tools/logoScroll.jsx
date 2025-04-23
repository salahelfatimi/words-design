"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from 'embla-carousel-auto-scroll'

export default  function LogoScroll() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ stopOnInteraction: false, speed: 0.3 }),
  ]);
  const images = [
    { image: "societe-fiduciaire-du-maroc.png", title: "societe fiduciaire du maroc" },
    { image: "societe-generale.png", title: "societe generale" },
    { image: "trafic-genius.png", title: "trafic genius" },
    { image: "societe-fiduciaire-du-maroc.png", title: "societe fiduciaire du maroc" },
    { image: "societe-generale.png", title: "societe generale" },
    { image: "trafic-genius.png", title: "trafic genius" },
    { image: "societe-fiduciaire-du-maroc.png", title: "societe fiduciaire du maroc" },
    { image: "societe-generale.png", title: "societe generale" },
    { image: "trafic-genius.png", title: "trafic genius" },
  ];

  return (
    <div className=" py-10 bg-primary">
      <div className=" w-full  mx-auto  cursor-grab active:cursor-grabbing">
        <div className="py-2 overflow-hidden" ref={emblaRef}>
          <div className="flex flex-row flex-nowrap gap-32 pl-32 ">        
            {images.map((src, index) => ( 
              <img width={600} height={300} src={`/img/logoPartner/${src.image}`} className=" select-none  max-w-none h-16 w-auto" alt={src.title} title={src.title} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
   
  );
}