const WebSocket = require("ws");
const Redis = require("ioredis");
const redis = new Redis();

const coins = ["btcusdt", "ethusdt", "bnbusdt", "adausdt", "xrpusdt"];
const streamUrl = `wss://stream.binance.com:9443/stream?streams=${coins.map(c => `${c}@trade`).join("/")}`;
const ws = new WebSocket(streamUrl);

// เก็บราคาล่าสุดไว้ใน memory
const priceBuffer = {};

ws.on("open", () => {
  console.log("✅ Connected to Binance WebSocket");
});

ws.on("message", (data) => {
  try {
    const parsed = JSON.parse(data);
    const symbol = parsed?.data?.s?.toLowerCase();
    const price = parsed?.data?.p;

    if (symbol && price) {
      priceBuffer[symbol] = price; // อัปเดตราคาใน buffer
    }
  } catch (err) {
    console.error("❌ Error parsing WebSocket message:", err.message);
  }
});

// รันทุก 5 วินาทีเพื่อลง Redis
setInterval(() => {
  Object.entries(priceBuffer).forEach(([symbol, price]) => {
    redis.set(`price:${symbol}`, price);
    console.log(`🕒 [5s] Saved price:${symbol} → ${price}`);
  });
}, 5000);
