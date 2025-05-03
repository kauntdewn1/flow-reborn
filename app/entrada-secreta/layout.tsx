import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EntradaSecretaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
} 