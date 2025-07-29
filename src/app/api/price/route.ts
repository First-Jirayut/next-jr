// src/app/api/price/route.ts
import redis from '../../lib/redis';

export async function GET() {
  try {
    // 💡 รายชื่อเหรียญต้องตรงกับฝั่ง WebSocket
    const symbols = ['btcusdt', 'ethusdt', 'bnbusdt', 'adausdt', 'xrpusdt'];

    const prices = await Promise.all(
      symbols.map(async (symbol) => {
        const price = await redis.get(`price:${symbol}`);
        return { symbol, price };
      })
    );

    return Response.json({ prices });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
