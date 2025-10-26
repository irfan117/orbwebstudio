import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/common/Section';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <Section 
      title="Ready to start your project?"
      subtitle="Mari wujudkan ide Anda menjadi karya digital yang berdampak."
      background="gradient"
    >
      <div className="text-center">
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link href="/contact">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
