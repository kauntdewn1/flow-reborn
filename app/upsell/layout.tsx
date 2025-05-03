import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function UpsellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40">
        <Header />
      </div>
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
} 