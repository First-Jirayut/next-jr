// src/providers/ReduxProvider.tsx
'use client'

import { Provider } from 'react-redux';
import { store } from './index'; // <-- อัปเดต path ให้ตรงกับโปรเจกต์ของคุณ

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
