import { notFound } from 'next/navigation';
import { demoDallasPresentation } from '@/lib/data/demo';
import { ShareExperience } from '@/components/client/ShareExperience';
import { getRatesSnapshot } from '@/lib/services/rates';

export default async function SharePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (token !== demoDallasPresentation.share.token || demoDallasPresentation.share.disabled) return notFound();

  const rates = await getRatesSnapshot();
  return <ShareExperience presentation={demoDallasPresentation} ratesAsOf={rates.asOf} />;
}
