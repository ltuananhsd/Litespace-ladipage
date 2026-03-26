import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 w-full py-20">
      <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="space-y-4 text-center md:text-left">
          <div className="text-3xl font-black text-white font-headline">LITE Space</div>
          <p className="font-label text-xs tracking-wide uppercase font-semibold max-w-xs">
            © 2024 LITE Space. Built for the Aerostat Collective.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 font-label text-xs tracking-wide uppercase font-black">
          <Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link>
          <Link className="hover:text-white transition-colors" href="#">Terms of Service</Link>
          <Link className="hover:text-white transition-colors" href="#">Twitter</Link>
          <Link className="hover:text-white transition-colors" href="#">LinkedIn</Link>
          <Link className="hover:text-white transition-colors" href="#">Support</Link>
        </div>
      </div>
    </footer>
  );
}
