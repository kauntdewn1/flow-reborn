import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}
