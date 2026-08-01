import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workroom',
  robots: { index: false, follow: false },
};

export default function WorkroomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
