"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const sweets = [
  {
    name: "เค้กช็อกโกแลตลาวา",
    image: "https://bakery-lover.com/wp-content/uploads/2021/09/135217.jpg",
    desc: "เค้กช็อกโกแลตเนื้อนุ่ม ไส้ลาวาเข้มข้น หอมละมุนทุกคำ",
    price: "89 บาท",
  },
  {
    name: "ชีสพายสตรอว์เบอร์รี่",
    image: "https://api2.krua.co/wp-content/uploads/2020/08/RB0156_ImageBanner_1140x507-01-scaled.jpg",
    desc: "ชีสพายเนื้อเนียน ราดซอสสตรอว์เบอร์รี่สดใหม่",
    price: "75 บาท",
  },
  {
    name: "บราวนี่นูเทลล่า",
    image: "https://lakcookingschool.com/web-upload/fck/editor-pic/images/%E0%B8%9A%E0%B8%A3%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B8%B5%E0%B9%88%E0%B8%99%E0%B8%B9%E0%B9%80%E0%B8%97%E0%B8%A5%E0%B8%A5%E0%B9%88%E0%B8%B2/S__30580762(1).jpg",
    desc: "บราวนี่เข้มข้น โรยนูเทลล่าเต็มคำ",
    price: "65 บาท",
  },
  {
    name: "มาการอง",
    image: "https://www.sgethai.com/wp-content/uploads/2021/09/210914-Content-%E0%B8%A1%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AD%E0%B8%87-%E0%B8%82%E0%B8%99%E0%B8%A1%E0%B8%AB%E0%B8%A7%E0%B8%B2%E0%B8%99%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%E0%B8%9D%E0%B8%A3%E0%B8%B1%E0%B9%88%E0%B8%87%E0%B9%80%E0%B8%A8%E0%B8%AA02.webp",
    desc: "มาการองสีสันสดใส หวานละมุน ละลายในปาก",
    price: "55 บาท",
  },
  
];

const promotions = [
  {
    title: "โปร 1 แถม 1!",
    detail: "ซื้อเค้กช็อกโกแลตลาวา 1 ชิ้น แถมฟรีอีก 1 ชิ้น (เฉพาะวันจันทร์)",
  },
  {
    title: "ส่งฟรี!",
    detail: "เมื่อสั่งครบ 300 บาทขึ้นไป ภายในเขตกรุงเทพฯ",
  },
];

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-10 px-4 text-center">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          className="w-full max-w-2xl"
        >
          {sweets.map((sweet, idx) => (
            <SwiperSlide key={sweet.name + idx}>
              <div className="flex flex-col items-center">
                <img
                  src={sweet.image}
                  alt={sweet.name}
                  className="rounded-3xl shadow-xl w-full max-h-80 object-cover mb-6 cursor-pointer"
                />
                <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 drop-shadow mb-2 flex items-center justify-center gap-2">
                  <span className="text-3xl"></span> {sweet.name}
                </h1>
                <p className="text-base text-blue-700/80 font-medium mb-2">{sweet.desc}</p>
                <span className="font-bold text-indigo-700 text-lg">{sweet.price}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Sweet Recommendations */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">ขนมหวานแนะนำจากทางร้าน</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sweets.map((sweet) => (
            <div key={sweet.name} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
              <img
                src={sweet.image}
                alt={sweet.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-lg text-blue-900 mb-1">{sweet.name}</h3>
              <p className="text-sm text-blue-700 mb-2">{sweet.desc}</p>
              <span className="font-bold text-indigo-700 text-base">{sweet.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Promotions Section */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-pink-700 mb-4">โปรโมชั่นพิเศษ</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {promotions.map((promo) => (
            <div key={promo.title} className="bg-gradient-to-r from-pink-200 to-yellow-100 rounded-xl shadow p-5 flex-1">
              <h3 className="text-xl font-bold text-pink-800 mb-1">{promo.title}</h3>
              <p className="text-pink-700 text-base">{promo.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;