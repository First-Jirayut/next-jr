'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPrice, setPrice, resetPrice } from '@/store/priceSlice';

const mockSymbols = ['btcusdt', 'ethusdt', 'bnbusdt', 'adausdt', 'xrpusdt'];
const CryptoPrice = () => {
  const dispatch = useAppDispatch();
  const { prices, isLoading, error, lastUpdated } = useAppSelector((state) => state.price);

  const handleFetchPrice = () => dispatch(fetchPrice());
  const handleSetPrice = () => {
    const mockPrices = mockSymbols.map((symbol) => ({
      symbol,
      price: (Math.random() * 100000 + 1000).toFixed(2),
    }));
    dispatch(setPrice(mockPrices));
  };
  const handleResetPrice = () => dispatch(resetPrice());

  const formatLastUpdated = (timestamp: number | null) => {
    if (!timestamp) return 'ไม่เคยอัปเดต';
    return new Date(timestamp).toLocaleString('th-TH');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Cryptocurrency Prices
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {prices.map(({ symbol, price }) => (
            <div key={symbol} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 text-center border border-white/30">
              <div className="text-xl font-semibold text-gray-700 uppercase mb-2">{symbol}</div>
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                {price ? Number(price).toLocaleString() : '---'}
              </div>
              <div className="text-sm text-gray-500 mt-1">บาท (THB)</div>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-6 bg-gray-50 rounded-xl p-6 mb-10">
          <div>
            <div className="text-2xl mb-2">{isLoading ? '🔄' : '✅'}</div>
            <p className="text-sm font-medium text-gray-700">สถานะ</p>
            <p className="text-xs text-gray-500">{isLoading ? 'กำลังโหลด...' : 'พร้อมใช้งาน'}</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🕒</div>
            <p className="text-sm font-medium text-gray-700">อัปเดตล่าสุด</p>
            <p className="text-xs text-gray-500">{formatLastUpdated(lastUpdated)}</p>
          </div>
          <div>
            <div className="text-2xl mb-2">{error ? '❌' : '✅'}</div>
            <p className="text-sm font-medium text-gray-700">สถานะข้อผิดพลาด</p>
            <p className="text-xs text-gray-500">{error ?? 'ปกติ'}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button onClick={handleFetchPrice} disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl shadow transition disabled:bg-gray-300">
            📡 Fetch API
          </button>
          <button onClick={handleSetPrice}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl shadow">
            🎲 Random BTC
          </button>
          <button onClick={handleResetPrice}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-xl shadow">
            🧹 Reset
          </button>
          <button onClick={handleResetPrice}
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl shadow">
            🔄 Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default CryptoPrice;
