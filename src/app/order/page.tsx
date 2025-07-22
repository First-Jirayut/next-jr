"use client";
import React, { useState } from "react";

const OrdersPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [success, setSuccess] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const cartStr = localStorage.getItem('cart_items');
      if (cartStr) {
        setCartItems(JSON.parse(cartStr));
      }
    }
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ที่นี่จะเชื่อมต่อ backend จริงในอนาคต
    setSuccess(true);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-100 via-cyan-100 via-60% to-pink-50 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-xl p-6 md:p-10 backdrop-blur-md">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-blue-900 mb-8 drop-shadow">สั่งซื้อขนมหวาน</h1>
        {success ? (
          <div className="text-center text-green-600 font-bold text-lg py-10">
            ขอบคุณสำหรับการสั่งซื้อ!<br />
            ทางร้านจะติดต่อกลับโดยเร็วที่สุดค่ะ 🍰
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* ตะกร้าสินค้า */}
            <div>
              <h2 className="text-xl font-bold text-blue-700 mb-4">รายการที่สั่ง</h2>
              <div className="space-y-3">
                {cartItems.map((item, idx) => (
                  <div key={item.name + '-' + idx} className="flex items-center gap-3 bg-blue-50/60 rounded-lg p-2 shadow-sm">
                    <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="object-cover w-full h-full"
                        loading="lazy"
                        onError={e => (e.currentTarget.src = 'https://placehold.co/56x56?text=No+Image')}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-500">จำนวน: {item.qty}</div>
                    </div>
                    <div className="font-bold text-pink-600">{item.price * item.qty} บาท</div>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg text-blue-900">
                <span>รวม</span>
                <span>{total} บาท</span>
              </div>
            </div>
            {/* ฟอร์มสั่งซื้อ */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold text-blue-700 mb-4">ข้อมูลผู้สั่งซื้อ</h2>
              <div>
                <label className="block font-medium mb-1 text-gray-700">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-300 outline-none placeholder-gray-300"
                  placeholder="เช่น สมชาย ใจดี"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-300 outline-none placeholder-gray-300"
                  placeholder="เบอร์โทร"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">ที่อยู่สำหรับจัดส่ง</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-300 outline-none placeholder-gray-300"
                  placeholder="ที่อยู่สำหรับจัดส่ง"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg shadow transition"
              >
                ยืนยันสั่งซื้อ
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
