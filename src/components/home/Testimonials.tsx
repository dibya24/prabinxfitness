"use client";

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Testimonial {
    quote: string
    name: string
    role: string
    company: string
    tilt: number
}

const TESTIMONIALS: Testimonial[] = [
    {
        quote: "They didn't just ship the redesign — they rebuilt how we think about our product.",
        name: 'Mira Okafor',
        role: 'Head of Product',
        company: 'Lumen Analytics',
        tilt: -3,
    },
    {
        quote: 'Every review call ended with more ideas than we started with. Rare.',
        name: 'Devon Cole',
        role: 'Founder',
        company: 'Northwind',
        tilt: 2,
    },
    {
        quote: "Six weeks in, our activation rate doubled. The work spoke before the metrics did.",
        name: 'Priya Raman',
        role: 'VP Growth',
        company: 'Fathom',
        tilt: -2,
    },
    {
        quote: "We've worked with a dozen agencies. This was the first one that argued with us — and was right.",
        name: 'Sam Ilić',
        role: 'CTO',
        company: 'Vector Labs',
        tilt: 3,
    },
    {
        quote: 'The kind of craft you notice in the hover states nobody asked for.',
        name: 'Elena Torres',
        role: 'Design Lead',
        company: 'Hearth',
        tilt: -1.5,
    },
    {
        quote: 'They handed off a system, not a deck. Eighteen months later it still holds.',
        name: 'Jonas Whitfield',
        role: 'Engineering Manager',
        company: 'Fathom',
        tilt: 2.5,
    },
]

gsap.registerPlugin(ScrollTrigger)

const initials = (name: string): string =>
    name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

const Testimonials: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const markRef = useRef<HTMLDivElement>(null)
    const rowARef = useRef<HTMLDivElement>(null)
    const rowBRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>('.tst-card')

            if (reduceMotion) {
                gsap.set(cards, { opacity: 1, y: 0 })
                return
            }

            cards.forEach((card) => {
                const tilt = parseFloat(card.dataset.tilt || '0')
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 70, rotate: tilt * 2.2 },
                    {
                        opacity: 1,
                        y: 0,
                        rotate: tilt,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 92%',
                        },
                    }
                )
            })

            const parallaxTrigger = {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
            }

            if (rowARef.current) {
                gsap.to(rowARef.current, { yPercent: -10, ease: 'none', scrollTrigger: parallaxTrigger })
            }
            if (rowBRef.current) {
                gsap.to(rowBRef.current, { yPercent: 8, ease: 'none', scrollTrigger: parallaxTrigger })
            }
            if (markRef.current) {
                gsap.to(markRef.current, {
                    rotate: 22,
                    scale: 1.12,
                    ease: 'none',
                    scrollTrigger: parallaxTrigger,
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const rowA = TESTIMONIALS.slice(0, 3)
    const rowB = TESTIMONIALS.slice(3, 6)

    return (
        <section className="tst-section" ref={sectionRef}>
            <div className="tst-mark" ref={markRef} aria-hidden="true">
                &rdquo;
            </div>

            <header className="tst-header">
                <span className="tst-eyebrow">Client voices</span>
                <h2 className="tst-heading">
                    Say it with <em>their</em> names on it.
                </h2>
                <p className="tst-subhead">
                    Six people who had no reason to be kind about the work — and were.
                </p>
            </header>

            <div className="tst-grid">
                <div className="tst-row" ref={rowARef}>
                    {rowA.map((t) => (
                        <TestimonialCard key={t.name} t={t} />
                    ))}
                </div>
                <div className="tst-row tst-row--offset" ref={rowBRef}>
                    {rowB.map((t) => (
                        <TestimonialCard key={t.name} t={t} />
                    ))}
                </div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Manrope:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        .tst-section {
          position: relative;
          overflow: hidden;
          background: #150F1A;
          padding: 7rem 6vw 8rem;
          isolation: isolate;
        }

        .tst-mark {
          position: absolute;
          top: -8rem;
          right: -2rem;
          font-family: 'Fraunces', serif;
          font-size: min(50vw, 42rem);
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(245, 239, 230, 0.08);
          pointer-events: none;
          z-index: 0;
          transform: rotate(8deg);
          user-select: none;
        }

        .tst-header {
          position: relative;
          z-index: 1;
          max-width: 42rem;
          margin: 0 0 4.5rem;
        }

        .tst-eyebrow {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #FF8B5E;
          margin-bottom: 1.1rem;
        }

        .tst-heading {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(2.2rem, 4.6vw, 3.6rem);
          line-height: 1.08;
          color: #F5EFE6;
          margin: 0 0 1.1rem;
          letter-spacing: -0.01em;
        }

        .tst-heading em {
          font-style: italic;
          font-weight: 500;
          color: #7FE7C4;
        }

        .tst-subhead {
          font-family: 'Manrope', sans-serif;
          font-size: 1.05rem;
          color: #9C8FA8;
          line-height: 1.6;
          margin: 0;
        }

        .tst-grid {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .tst-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          will-change: transform;
        }

        .tst-row--offset {
          margin-top: 2.5rem;
        }

        @media (max-width: 900px) {
          .tst-row {
            grid-template-columns: 1fr;
          }
          .tst-row--offset {
            margin-top: 0;
          }
          .tst-section {
            padding: 5rem 6vw 5rem;
          }
        }

        .tst-card {
          background: #201828;
          border: 1px solid #2E2438;
          border-radius: 14px;
          padding: 2rem 1.9rem 1.7rem;
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
          transform-origin: center bottom;
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          will-change: transform, opacity;
        }

        .tst-card:hover {
          transform: rotate(0deg) translateY(-4px) !important;
          border-color: #FF8B5E;
          box-shadow: 0 22px 40px -20px rgba(0, 0, 0, 0.55);
        }

        .tst-quote {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-style: italic;
          font-size: 1.18rem;
          line-height: 1.42;
          color: #F5EFE6;
          margin: 0;
        }

        .tst-footer {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-top: auto;
        }

        .tst-avatar {
          flex-shrink: 0;
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF8B5E, #7FE7C4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Mono', monospace;
          font-size: 0.78rem;
          font-weight: 700;
          color: #150F1A;
        }

        .tst-person {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }

        .tst-name {
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: 0.92rem;
          color: #F5EFE6;
        }

        .tst-role {
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          color: #9C8FA8;
        }

        @media (prefers-reduced-motion: reduce) {
          .tst-card {
            transition: none;
          }
        }
      `}</style>
        </section>
    )
}

const TestimonialCard: React.FC<{ t: Testimonial }> = ({ t }) => (
    <article className="tst-card" data-tilt={t.tilt} style={{ transform: `rotate(${t.tilt}deg)` }}>
        <p className="tst-quote">&ldquo;{t.quote}&rdquo;</p>
        <div className="tst-footer">
            <div className="tst-avatar">{initials(t.name)}</div>
            <div className="tst-person">
                <span className="tst-name">{t.name}</span>
                <span className="tst-role">
                    {t.role}, {t.company}
                </span>
            </div>
        </div>
    </article>
)

export default Testimonials