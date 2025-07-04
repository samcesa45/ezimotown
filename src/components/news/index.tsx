'use client';
import React, { useRef, useState } from 'react';
import { Button } from '../ui/buttons';
import Image from 'next/image';
import ArrowIcon from '../svgs/arrow-icon';
import { motion } from 'motion/react';
import { cardVariant } from '../ui/cards/client-masonry';
import { Spinner } from '../ui/spinner';
import Link from 'next/link';
import { paths } from '@/config/paths';
import { useGetPosts } from '@/features/posts/api/get-posts';
import LightBoxGallery from '../ui/lightbox';
import MagnifyIcon from '../svgs/search-icon';

export default function BlogNews() {
  const scrollRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [lightImages, setLightImages] = useState<
    { src: string; alt: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const postQuery = useGetPosts();
  const posts = postQuery?.data?.data;

  if (postQuery.isLoading) {
    return (
      <div className="flex relative h-screen w-screen bg-black items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (postQuery?.isError) {
    return (
      <section className="w-full relative  bg-black pt-8 pb-6 sm:pt-16 md:pt-22.5 lg:pt-[67px] min-h-auto lg:min-h-[100vh] px-4  lg:px-20">
        <p className="font-normal text-[12px] underline sm:no-underline sm:text-base text-white mb-2">
          Error showing blogs
        </p>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <section className="w-full relative  bg-black pt-8 pb-6 sm:pt-16 md:pt-22.5 lg:pt-[67px] min-h-auto lg:min-h-[100vh] px-4  lg:px-20">
        <p className="font-normal text-[12px] underline sm:no-underline sm:text-base text-white mb-2">
          No blogs to show
        </p>
      </section>
    );
  }

  const handleImageClick = (images: typeof lightImages, idx: number) => {
    setLightImages(images);
    setCurrentIndex(idx);
    setIsOpen(true);
  };
  return (
    <>
      <section className="w-full relative  bg-black pt-8 pb-6 sm:pt-16 md:pt-22.5 lg:pt-[67px] min-h-auto lg:min-h-[100vh] px-4  lg:px-20">
        <div className="flex justify-between items-center pb-8 md:pb-16">
          <div>
            <motion.h6 className="text-gray-80 text-[12px] sm:text-xl md:text-2xl font-normal">
              Similar News
            </motion.h6>
          </div>
          <Link href={paths.posts.getHref()}>
            <Button
              icon={<ArrowIcon />}
              className="font-helvetica  text-[10px] sm:text-[12px]  md:text-lg text-gray-60 rounded-[10.2px]"
            >
              View All News
            </Button>
          </Link>
        </div>

        {/* blog story card */}
        <div className="grid grid-cols-2  md:grid-cols-3 gap-6 items-center justify-center mx-auto lg:gap-y-24">
          {posts?.map((post) => {
            const imgs = post.images.map((img) => ({
              src: `${process.env.NEXT_PUBLIC_URL}/${img?.path}`,
              alt: img.label,
            }));
            return (
              <motion.div
                key={post.id}
                variants={cardVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ root: scrollRef }}
                className="group cursor-pointer"
              >
                {/* Image Container with Overlay */}
                <div
                  className="relative rounded-[10.2px] overflow-hidden mb-4"
                  onClick={() => handleImageClick(imgs, 0)}
                >
                  <Image
                    src={imgs[0]?.src}
                    alt={imgs[0]?.alt}
                    width={434}
                    height={188}
                    className="max-h-[100px] md:max-h-[188px] object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay for hover effect */}
                  <div className="absolute inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <MagnifyIcon className="text-gold w-10 h-10 md:w-14 md:h-14" />
                  </div>
                </div>

                <motion.p className="font-semibold text-[12px]  sm:text-base text-white mb-2">
                  {post?.title}
                </motion.p>
                <motion.h6 className="text-[#98989A] mb-4">
                  {post?.category?.name}
                </motion.h6>
                <Link href={paths.post.getHref(post?.slug)}>
                  <Button
                    icon={<ArrowIcon />}
                    className="bg-black-8  rounded-[10.2px] text-gray-60 text-lg font-normal w-full"
                  >
                    Read More
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
        {/* blog story card */}
      </section>
      <LightBoxGallery
        slides={lightImages}
        startIndex={currentIndex}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
