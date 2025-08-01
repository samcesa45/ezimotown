'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BackToTop() {
  const circleRef = useRef<SVGCircleElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', updateVisibility);
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  useEffect(() => {
    if (!circleRef.current) return;

    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;

    gsap.to(circleRef.current, {
      strokeDashoffset: 0,
      strokeDasharray: circumference,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(circleRef.current, {
            strokeDashoffset: circumference * (1 - progress),
          });
        },
      },
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 size-9 rounded-full bg-black-8 shadow-lg flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Scroll to top"
    >
      {/* Background scroll progress circle */}
      <svg viewBox="0 0 36 36" className="absolute w-full h-full">
        <g transform="rotate(-90 18 18)">
          <circle
            className="text-gray-300"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            cx="18"
            cy="18"
            r="15.9155"
          />
          <circle
            ref={circleRef}
            className="text-gold"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            cx="18"
            cy="18"
            r="15.9155"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
        </g>
      </svg>

      {/* Centered arrow icon */}
      <ArrowUp className="size-5 text-white z-10" />
    </button>
  );
}
