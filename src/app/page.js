import LeaderboardComponent from '@/components/leaderboard';
import Layout from '@/components/layout';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <Layout>
        <LeaderboardComponent
          actionId="c312d1072c8249b389b2c31e9cb6dc04"
        />
      </Layout>
    </main>
  );
}