import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
    </main>
  );
}
