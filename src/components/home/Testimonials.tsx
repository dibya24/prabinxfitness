"use client";

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { CONTENT } from '@/src/constants/content'

import "aos/dist/aos.css";
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"


type TestimonialSectionData = {
  backgroundTitle: string;
  title: string;
  highlightText: string;
  titleEnd: string;
  description: string;
};

type TestimonialData = {
  id: number;
  name: string;
  location: string;
  text: string;
};

const Testimonials = ({
  sectionData,
  reviews,
}: {
  sectionData?: TestimonialSectionData | null;
  reviews?: TestimonialData[] | null;
}) => {
  const testimonial = {
    heading: {
      backgroundTitle: sectionData?.backgroundTitle || CONTENT.testimonials.heading.backgroundTitle,
      title: sectionData?.title || CONTENT.testimonials.heading.title,
      highlightText: sectionData?.highlightText || CONTENT.testimonials.heading.highlightText,
      titleEnd: sectionData?.titleEnd || CONTENT.testimonials.heading.titleEnd,
    },
    description: sectionData?.description || CONTENT.testimonials.description,
    reviews: reviews && reviews.length > 0 ? reviews : CONTENT.testimonials.reviews,
  };

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
                className="absolute -top-5 left-0 text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-transparent"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,.12)",
                  fontFamily: "var(--font-oswald)",
                }}
              >
                {testimonial.heading.backgroundTitle}
              </h2>

              <h3
              data-aos="fade-up"
                            data-aos-delay="200"
                style={{ fontFamily: "var(--font-oswald)" }}
                className="relative pt-5 text-3xl sm:text-4xl lg:text-5xl leading-tight uppercase text-[#FFF7DF] font-medium"
              >
                {testimonial.heading.title}
                {" "}

                <span className="text-[#E8A428]">
                  {testimonial.heading.highlightText}
                </span> {" "}

                {testimonial.heading.titleEnd}
              </h3>
            </div>

            <p
            data-aos="fade-up"
                            data-aos-delay="300"
              style={{ fontFamily: "var(--font-poppins)" }}
              className='text-sm sm:text-base leading-relaxed text-[#C0C0C0]'>
              {testimonial.description}
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
            {CONTENT.testimonials.reviews.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="rounded-2xl bg-gradient-to-b from-[#E8A428] to-[#0F0F0F] p-[2px] h-full">
                  <div className="rounded-2xl p-6 h-full bg-[#0F0F0F] backdrop-blur-md transition hover:bg-[#141414]">

                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-[#F0EBE6] mb-4 opacity-70" />

                    {/* Testimonial */}
                    <p
                      style={{ fontFamily: "var(--font-poppins)" }}
                      className="text-[14px] leading-7 text-[#C0C0C0] mb-6"
                    >
                      &ldquo;{item.text}&rdquo;
                    </p>

                    {/* Client Details */}
                    <div className="mt-auto">
                      <h3
                        style={{ fontFamily: "var(--font-oswald)" }}
                        className="text-[21px] text-[#FFF7DF] uppercase"
                      >
                        {item.name}
                      </h3>

                      <span
                        style={{ fontFamily: "var(--font-poppins)" }}
                        className="text-sm text-[#C0C0C0]"
                      >
                        {item.location}
                      </span>
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