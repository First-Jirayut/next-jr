'use client';

import { use } from 'react';
import CryptoPrice from '@/crypto/CryptoPrice';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CryptoSlugPage({ params }: PageProps) {
  const { slug } = use(params); 
  if (slug === 'crypto-price') {
    return <CryptoPrice />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">ไม่พบข้อมูลของ: {slug}</h1>
    </div>
  );
}
