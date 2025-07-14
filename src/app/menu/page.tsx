"use client";
import React from "react";

// ตัวอย่างข้อมูลเมนูแบ่งหมวดหมู่
const MENU_CATEGORIES = [
  {
    name: "เค้ก",
    items: [
      { name: "เค้กช็อกโกแลต", price: 85, img: "/images/cake-choco.jpg" },
      { name: "เค้กสตรอว์เบอร์รี่", price: 90, img: "/images/cake-strawberry.jpg" },
      { name: "ชีสเค้กบลูเบอร์รี่", price: 95, img: "/images/cake-blueberry.jpg" },
      { name: "ชีสเค้กบลูเบอร์รี่", price: 95, img: "/images/cake-blueberry.jpg" },
    ],
  },
  {
    name: "เบเกอรี่",
    items: [
      { name: "ครัวซองต์เนยสด", price: 55, img: "/images/croissant.jpg" },
      { name: "เดนิชผลไม้", price: 60, img: "/images/danish.jpg" },
      { name: "มาการอง", price: 40, img: "/images/macarons.jpg" },
    ],
  },
  {
    name: "ไอศกรีม",
    items: [
      { name: "ไอศกรีมวานิลลา", price: 50, img: "/images/ice-vanilla.jpg" },
      { name: "ไอศกรีมช็อกโกแลต", price: 50, img: "/images/ice-choco.jpg" },
    ],
  },
  {
    name: "เครื่องดื่ม",
    items: [
      { name: "ชาเขียวเย็น", price: 45, img: "/images/greentea.jpg" },
      { name: "โกโก้เย็น", price: 50, img: "/images/cocoa.jpg" },
      { name: "ลาเต้เย็น", price: 55, img: "/images/latte.jpg" },
    ],
  },
];

const MenuPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-100 via-cyan-100 via-60% to-pink-50 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-5xl bg-white/80 rounded-2xl shadow-xl p-6 md:p-10 backdrop-blur-md">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 mb-10 drop-shadow">เมนูขนมหวาน</h1>
        <div className="space-y-10">
        {MENU_CATEGORIES.map((cat) => (
          <section key={cat.name}>
            <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-pink-400 rounded-full"></span>
              {cat.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cat.items.map((item, idx) => (
                <div
                  key={item.name + '-' + idx}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-3 border border-gray-100"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden mb-2 flex items-center justify-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="object-cover w-full h-full"
                      loading="lazy"
                      onError={e => (e.currentTarget.src = 'https://placehold.co/96x96?text=No+Image')}
                    />
                  </div>
                  <div className="text-base font-semibold text-gray-800 text-center mb-1">{item.name}</div>
                  <div className="text-sm text-pink-600 font-bold">{item.price} บาท</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      </div>
    </div>
  );
};

export default MenuPage;
