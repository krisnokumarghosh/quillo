"use client";

import { manropeFont } from "@/lib/fonts";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { ArrowUpRight } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

const images = [
  "https://assets.lummi.ai/assets/QmR9SES2yz9fPSYajDXbUdabbTTbkhx3qcwYJ9RXYv8W9z?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmRVZN8jcsPfrQJFWtjSbkNAmSUTqoNeeeJSqcyFeBvQeA?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmUAa47hiN5KzEKbXXff2zvDLiahSSzoNstQazpb1VqMHW?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmPBd9e3WXiB8rzUjDttjpzi7f84VxFbxrqJXChk46gH7y?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmWDicLkUoBnpjkVL8KF1URfxc6Nv6bJYdRkJCBHFS4YnN?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmNTKwFojDmLNHgUEdUsmDSLrhMBJR5rpAbGf98oGNaUzQ?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmZhb9gGbjPob2YTg34SMKdPvyS4hMvqudhVp8Cex1qhbU?auto=format&w=1500",
  "https://assets.lummi.ai/assets/Qmeq2uusH6fMS5WQSYqpUBWHNVnjJiUJqvM3iKsRtpJqNe?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmWAyFmZE7GKMTzrCjCeKKp1iMmTairiXGJYZjdxKgkdHZ?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmPrSQZbd53xF8tns6dGRV1ziJu1HBe8Vze9RboXJaqQRg?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmUNrr2TdtexxG27tVrrh9VZ8Z6AHUDgWsc6hrCXkNjUDB?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmaNYPdD6Kr38SHHxyUo6N9pbkbuV3p1JSnJnGa4ePBunR?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmckgyF89bMKT5RN9NqH8kdZm3v79uVD6mwQF1KwQy7REH?auto=format&w=1500",
];

const Banner = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!swiperRef.current) return;

      swiperRef.current.update();

      requestAnimationFrame(() => {
        swiperRef.current?.autoplay.stop();
        swiperRef.current?.autoplay.start();
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative w-full  min-h-screen overflow-hidden bg-linear-to-b from-[#778DA9]/25 via-[#E0E1DD]/40 to-white pt-27 md:pt-40 pb-12 md:pb-24 ">
      <h1
        className={`${manropeFont.className} text-center text-3xl md:text-5xl font-bold text-[#0D1B2A] tracking-tight mb-4 px-6`}
      >
        Insights,
        <br />
        Ideas &amp; Innovation
      </h1>

      <p className="text-center text-[#1B263B]/70 max-w-md mx-auto mb-8 md:mb-16 px-6">
        Explore expert articles, tech trends, and practical tips to keep your
        business ahead of the curve.
      </p>

      <div
        className="relative w-full lg:w-350 mx-auto overflow-hidden "
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          observer
          observeParents
          resizeObserver
          updateOnWindowResize
          slidesPerView="auto"
          watchSlidesProgress
          coverflowEffect={{
            rotate: 15,
            stretch: -20,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={800}
          className="w-full py-4!"
        >
          {images.map((src, i) => (
            <SwiperSlide
              key={i}
              className="w-40! sm:w-55! md:w-65! lg:w-75! h-50! sm:h-70! md:h-80! lg:h-90! rounded-2xl md:rounded-3xl overflow-hidden relative"
            >
              <Image
                src={src}
                alt="Blog highlight"
                fill
                sizes="(max-width: 640px) 160px, (max-width: 768px) 220px, (max-width: 1024px) 260px, 300px"
                className="object-cover"
                priority={i === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center mt-6 md:mt-12">
        <Button className="group h-13   rounded-full bg-[#0D1B2A] hover:bg-[#1B263B] text-[#E0E1DD] pl-5 pr-1.5 shadow-[0_12px_35px_rgba(13,27,42,0.18)] transition-all duration-300">
          <span className="text-lg font-semibold tracking-tight">
            Read Blogs
          </span>

          <span className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#E0E1DD] text-[#0D1B2A] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-6">
            <ArrowUpRight className="w-6 h-6" />
          </span>
        </Button>
      </div>
    </section>
  );
};

export default Banner;