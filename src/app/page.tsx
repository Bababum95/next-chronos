import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 py-12 flex-1">
        <p>Hello</p>
        <p>Welcome to Chronos!</p>
      </div>
      <Footer />
    </div>
  );
}
