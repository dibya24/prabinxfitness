"use client"

import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

import "aos/dist/aos.css";

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const testimonials = [
  {
    name: "-Subash Achraya",
    location: "London, UK",
    text: "We got tickets from our friends because they didn't want to go. We didn't think it was going to be good but we went to try it out and I have to say it was one of the best magic show watched till date."
  },
  {
    name: "-Emily Coff",
    location: "London, UK",
    text: "It was the best money I've spent so far in Kathmandu in magic show, Absolutely hilarious! And he is such a nice person! Will definitely go see him again. Thank you for the amazing involvement."
  },
  {
    name: "-Shristi Miya",
    location: "London, UK",
    text: "Great time at the show. Saman thank you for making my time with my friend, Magic was mind blowing, You all were great. Keep Loving Magic and keep rising."
  },
  {
    name: "Emily Davis",
    location: "London, UK",
    text: "It was the best money I've spent so far in Kathmandu in magic show, Absolutely hilarious! And he is such a nice person! Will definitely go see him again. Thank you for the amazing involvement."
  }
]


const Testimonials = () => {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1200,
  //     easing: "ease-out-cubic",
  //     once: true,
  //   });
  // }, []);
  return (
    <div
      id='results'
      className="relative w-full bg-[#0F0F0F] overflow-hidden font-sans text-white">
      {/* INLINE STYLES (No external CSS needed) */}
      <style jsx global>
        {`
                .custom-pagination .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: rgba(255,255,255,0.3);
                    opacity: 1;
                    margin: 0 6px !important;
                    border-radius: 999px;
                    transition: all 0.3s ease;
                }

                .custom-pagination .swiper-pagination-bullet-active {
                    width: 24px;
                    background: #E8A428;
                    box-shadow: 0 0 10px #E8A428;
                }

                @media (max-width: 768px) {
                    .testimonial-prev,
                    .testimonial-next {
                        display: none;
                    }
                }
            `}
      </style>

      <div className='relative max-w-[1440px] mx-auto px-[20px] sm:px-[80px] py-20 flex flex-col gap-[30px] z-10'>
        {/* ========== HEADER ========== */}
        <div className='grid lg:grid-cols-2 gap-5 items-end'>
          {/* Title */}
          <div className='flex flex-col gap-2'>
            <div className='relative'>
              <h2
                className="absolute -top-6 left-0 text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-transparent"
                style={{
                  fontFamily: "var(--font-oswald)",
                }}
              >
                Services Provided
              </h2>

              <h3
                style={{ fontFamily: "var(--font-oswald)" }}
                className="relative pt-5 text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase text-[#FFF7DF] font-medium"
              >
                ELEVATE YOUR
                {" "}

                <span className="text-[#E8A428]">
                  FITNESS
                </span> {" "}
                EXPERIENCE
              </h3>
            </div>

            <p
              style={{ fontFamily: "var(--font-poppins)" }}
              className='text-sm sm:text-base leading-relaxed text-[#C0C0C0]'>
              Personalized programs, expert coaching, and proven methods to help you achieve real results.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="flex justify-end gap-3 mb-5">
            <button className="testimonial-prev w-10 h-10 rounded-full border border-[#E8A428]/20 flex items-center justify-center hover:bg-[#E8A428]/50 transition cursor-pointer">
              <ChevronLeft size={18} />
            </button>
            <button className="testimonial-next w-10 h-10 rounded-full border border-[#E8A428]/20 flex items-center justify-center hover:bg-[#E8A428]/50 transition cursor-pointer">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div>
          {/* CAROUSEL */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".testimonial-next",
              prevEl: ".testimonial-prev",
            }}
            pagination={{
              el: ".custom-pagination",
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-2xl bg-gradient-to-b from-[#E8A428] to-[#0F0F0F] p-[2px]">
                  <div className="rounded-2xl p-6 h-full bg-[#0F0F0F] backdrop-blur-md transition">

                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-[#F0EBE6] mb-4 opacity-70" />

                    <p
                      style={{ fontFamily: "var(--font-poppins)" }}
                      className="text-[14px] opacity-80 mb-6 ">
                      “{item.text}”
                    </p>

                    <div>
                      <h3
                        style={{ fontFamily: "var(--font-oswald)" }}
                        className="big-shoulders big-shoulders-medium text-[21px] text-[#C0C0C0]">
                        {item.name}
                      </h3>

                      <span
                        style={{ fontFamily: "var(--font-oswald)" }}
                        className='font-light text-[#C0C0C0]'
                      >{item.location}</span>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* PAGINATION */}
          <div className="custom-pagination flex justify-center mt-6"></div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials