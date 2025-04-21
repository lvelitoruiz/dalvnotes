import { Hero } from '@/components/Hero/Hero';
import { PostsSection } from '@/components/PostCard/PostsSection';
import { InspirationGallery } from '@/components/Inspiration/InspirationGallery';
import { Newsletter } from '@/components/Newsletter/Newsletter';
import { Highlights } from '@/components/Highlights/Highlights';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <PostsSection />
      <Highlights />
      <InspirationGallery />
      <Newsletter />
    </main>
  );
}
