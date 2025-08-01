import React from 'react';
import HeroSection from '.';

const MarathonHero = () => {
  return (
    <HeroSection
      title="Marathon"
      description="The Ezimo Marathon is a true test of endurance and community spirit, drawing runners from near and far to challenge themselves across scenic routes that showcase the natural beauty of Ezimo. More than just a race, it’s a celebration of determination, unity, and the town’s commitment to health and togetherness."
      bgImage="marathon-hero.jpg"
      subSections={[
        {
          title: 'A Celebration of Heritage',
          para: `The Ezimo Marathon is more than a race, it’s a vibrant journey that weaves athletic endurance with the rich tapestry of our culture. Along the route, runners and spectators alike experience colorful masquerades, folklore reenactments.`,
        },
        {
          title: 'Where Endurance Meets Community',
          para: `The Ezimo Marathon is more than a race, it’s a shared journey that strengthens bonds and inspires pride in the community. Along the route, runners and spectators alike experience colorful masquerades, folklore reenactments, and lively festivities that bring Ezimo’s heritage to life`,
        },
      ]}
    />
  );
};

export default MarathonHero;
