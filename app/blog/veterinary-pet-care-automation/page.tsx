import ArticleLayout from '../../components/Article/ArticleLayout';
import { getBlogPost } from '@/lib/blog-content';

const post = getBlogPost('veterinary-pet-care-automation')!;

export const metadata = {
  title: 'Veterinary AI: Automating Appointment Booking, Emergency Triage, and Pet Health Reminders | Brandverse',
  description: 'Veterinary clinics, animal hospitals, and pet care businesses use AI voice agents to handle appointment bookings, emergency triage calls, prescription refill requests, vaccination reminders, and follow-ups 24/7.',
  openGraph: { title: 'Veterinary AI: Automating Appointment Booking, Emergency Triage, and Pet Health Reminders', description: 'Veterinary clinics, animal hospitals, and pet care businesses use AI voice agents to handle appointment bookings, emergency triage calls, prescription refill requests, vaccination reminders, and follow-ups 24/7.', type: 'article' as const, siteName: 'Brandverse' },
  twitter: { card: 'summary_large_image' as const, title: 'Veterinary AI: Automating Appointment Booking, Emergency Triage, and Pet Health Reminders', description: 'Veterinary clinics, animal hospitals, and pet care businesses use AI voice agents to handle appointment bookings, emergency triage calls, prescription refill requests, vaccination reminders, and follow-ups 24/7.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://brandverse.tech/blog/veterinary-pet-care-automation' },
};

export default function Post() {
  return (
    <ArticleLayout
      slug={post.slug}
      title="Veterinary AI: Automating Appointment Booking, Emergency Triage, and Pet Health Reminders"
      subtitle="Veterinary clinics, animal hospitals, and pet care businesses use AI voice agents to handle appointment bookings, emergency triage calls, prescription refill requests, vaccination reminders, and follow-ups 24/7."
      description={post.excerpt}
      date="Jul 27, 2026"
      readTime="9 min read"
      category={post.category}
      accent="blue"
      takeaways={post.takeaways}
      faqs={post.faqs}
    >
      <section className="space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}
