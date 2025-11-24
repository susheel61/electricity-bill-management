import { getBills } from '../lib/bills';
import { Dashboard } from '../components/Dashboard';

export default async function Home() {
  const bills = await getBills();

  return (
    <main className="min-h-screen bg-gray-50">
      <Dashboard bills={bills} />
    </main>
  );
}
