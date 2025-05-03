import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image
            src="https://res.cloudinary.com/dgyocpguk/image/upload/v1745797779/logo_horz_bco_bgjc0l.png"
            alt="FLOW REBORN"
            width={160}
            height={53}
            className="h-12 w-auto opacity-50"
          />
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} FLOW REBORN. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
