'use client';
import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { navLinks } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import MobileNav from '../mobile-menu';
import { usePathname } from 'next/navigation';
import PageLoader from '../ui/spinner/page-loader';

const BlogHero = () => {
  const scrollRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <PageLoader />
      <header
        className={`relative bg-cover bg-top my-gradient-bg bg-black-15 bg-blend-overlay bg-no-repeat md:bg-center  w-full h-[55vh] sm:h-[75vh] md:h-screen overflow-hidden`}
        style={{
          backgroundImage: `url(/assets/images/blog-hero.jpg)`,
        }}
      >
        {/* Top gradient */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />

        {/* Bottom gradient */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />

        {/* Optional texture overlay */}
        <div className="absolute inset-0 z-[2] opacity-20 bg-[url(/assets/images/newspaper-overlay.jpg)] bg-cover bg-repeat" />
        <div className="relative z-[3]">
          <nav
            className={`flex items-center bg-black md:bg-transparent justify-between lg:pl-[72px] lg:pr-[81px] py-10 h-[61px] md:pb-[105px] md:pt-[105px]  w-full`}
          >
            {/* logo */}
            <Link
              href="/"
              className="flex-shrink-0 relative size-[70px] md:size-56"
            >
              <Image
                src="/assets/logo/ezimo_logo.png"
                alt="Logo icon"
                width={1512}
                height={982}
                className="object-contain"
                priority
              />
            </Link>
            {/* logo */}
            {/* links */}
            <motion.div className="">
              <motion.ul className="space-y-3 hidden md:flex">
                {navLinks.map((link) => (
                  <motion.li
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 0.85 }}
                    whileTap={{ scale: 0.95 }}
                    key={link.id}
                    role="listitem"
                    className=" mx-4 font-normal text-[20px] leading-[100%] tracking-[0%]"
                  >
                    <Link
                      href={link.url}
                      className={`hover:text-white/70 transition-colors ${pathname === link.url ? 'text-gold' : 'text-white'}`}
                    >
                      {link.title}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
              >
                <Image
                  aria-hidden
                  src="/assets/svgs/hamburger.svg"
                  alt="hamburger icon"
                  width={16}
                  height={13}
                  className="object-contain w-auto h-auto mr-6 md:hidden cursor-pointer"
                />
              </button>
              {/* hamburger */}
            </motion.div>
            {/* links */}
          </nav>
          {/* <MobileNav/> */}
          {/* header-subcontainer */}

          {/* content */}
          <div className="text-center mt-12">
            <motion.h1
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ root: scrollRef }}
              transition={{ duration: 0.8 }}
              className="text-white font-poppins font-bold text-xl sm:text-4xl md:text-5xl lg:text-8xl md:mb-2"
            >
              The Latest from Our Blog
            </motion.h1>
            <motion.p
              initial={{ y: 10 }}
              whileInView={{ y: 0 }}
              viewport={{ root: scrollRef }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white font-helvetica mx-auto max-w-xs sm:max-w-sm md:max-w-[893px] text-[7.21px] sm:text-sm lg:text-lg font-normal text-center mt-1"
            >
              Dive into the heart of Ezimo with stories, voices, and vibrant
              moments that bring our heritage and culture to life. From colorful
              festivals and ancestral tales to everyday life in the community,
              our blog celebrates the rich traditions and dynamic spirit that
              make Ezimo unique.
            </motion.p>
          </div>
          {/* content */}
          {/* cultural */}
          <div
            className="flex justify-between w-full mt-10 lg:mt-24 px-8 lg:px-[94px]"
            ref={scrollRef}
            style={{ overflow: 'scroll' }}
          >
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ root: scrollRef }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h3 className="font-helvetica text-white text-[10px] lg:max-w-[550px] sm:text-sm md:text-xl lg:text-3xl font-normal mb-2 lg:mb-3">
                Ezimo Voices: Stories That Define Our Community
              </h3>
              <p className="font-helvetica text-white line-clamp-4 sm:line-clamp-none font-normal max-w-[150px] sm:max-w-[270px] md:max-w-[331px] text-[7.99px] sm:text-xs lg:text-sm">
                Experience the spirit of Ezimo through the personal stories,
                insights, and experiences of its people. From timeless legends
                to contemporary achievements, our voices come together to
                celebrate the resilience, culture, and dreams that shape who we
                are today.
              </p>
            </motion.div>
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ root: scrollRef }}
              transition={{ delay: 0.3, duration: 0.8 }}
              data-aos="fade-left"
            >
              <h3 className="font-helvetica text-white text-[10px] sm:text-sm md:text-xl lg:text-3xl font-normal mb-2 lg:mb-3">
                News, Culture & Community
              </h3>
              <p className="font-helvetica text-white line-clamp-4 sm:line-clamp-none font-normal max-w-[150px] sm:max-w-[270px] md:max-w-[331px] text-[7.99px] sm:text-xs lg:text-sm">
                Whether you’re a local or afar, our blog brings you closer to
                the heart, traditions, and everyday life that make Ezimo
                special. Stay connected and explore the stories that shape our
                town’s past, present, and future.
              </p>
            </motion.div>
          </div>
          {/* cultural */}
        </div>
      </header>
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default BlogHero;
