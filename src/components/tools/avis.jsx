"use client" 
import { testimonials } from "@/data/avis";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export default function Avis() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "start", slidesToScroll: 1 },
        [Autoplay()]
    );

    return (
        <div className="bg-primary">
            <div className="py-10 container mx-auto px-3 flex flex-col gap-10 ">
                <div className="flex items-center justify-center flex-col gap-6 text-center px-4">
                    <p className="text-3xl lg:text-6xl  mb-4 font-primary font-bold text-white uppercase ">
                        Découvrez ce que nos clients pensent de leurs œuvres signées Art by Warda.
                    </p>
                </div>

                <div className="overflow-hidden w-full max-w-6xl mx-auto cursor-grab active:cursor-grabbing font-primary" ref={emblaRef}>
                    <div className="flex pb-4 select-none ">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className={` shrink-0 w-full sm:w-1/2 px-6  flex flex-col justify-center gap-6 sm:border-x border-gray-300 `} >
                                <span className="text-3xl  mb-4 font-primary font-bold text-white uppercase ">- {testimonial.author}</span>
                                <p className="font-chillax text-sm sm:text-base text-white">{testimonial.text}</p>
                                <div className="flex justify-start text-white text-xl sm:text-3xl">{Array(testimonial.rating).fill("★").join("")}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
       
    );
}
