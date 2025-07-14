"use client";
import React, { useState } from "react";

const CONTACT_INFO = {
  phone: "081-234-5678",
  email: "sweetshop@email.com",
  address: "123/45 ถนนขนมหวาน ต.ขนม อ.ขนมหวาน จ.หวาน 12345",
  facebook: "sweetshopth",
  line: "@sweetshopth",
  ig: "sweetshopth",
};

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-100 via-cyan-100 via-60% to-pink-50 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-xl p-6 md:p-10 backdrop-blur-md">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-blue-900 mb-8 drop-shadow">ติดต่อเรา</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {/* ข้อมูลติดต่อ */}
          <div className="space-y-4">
            <div className="font-bold text-blue-700 text-lg mb-2">ข้อมูลร้านขนมหวาน</div>
            <div className="flex items-center gap-2 text-gray-700"><span className="text-blue-400">📞</span> {CONTACT_INFO.phone}</div>
            <div className="flex items-center gap-2 text-gray-700"><span className="text-blue-400">✉️</span> {CONTACT_INFO.email}</div>
            <div className="flex items-center gap-2 text-gray-700"><span className="text-blue-400">📍</span> {CONTACT_INFO.address}</div>
            <div className="flex items-center gap-2 text-gray-700"><span className="text-blue-400">🌐</span> Facebook: <a href={`https://facebook.com/${CONTACT_INFO.facebook}`} className="underline hover:text-pink-500" target="_blank">{CONTACT_INFO.facebook}</a></div>
            <div className="flex items-center gap-2 text-gray-700"><span className="text-blue-400">💬</span> Line: <a href={`https://line.me/R/ti/p/~${CONTACT_INFO.line.replace('@','')}`} className="underline hover:text-pink-500" target="_blank">{CONTACT_INFO.line}</a></div>
            <div className="flex items-center gap-2 text-gray-700"><span className="text-blue-400">📸</span> IG: <a href={`https://instagram.com/${CONTACT_INFO.ig}`} className="underline hover:text-pink-500" target="_blank">{CONTACT_INFO.ig}</a></div>
          </div>
          {/* ฟอร์มส่งข้อความ */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="font-bold text-blue-700 text-lg mb-2">ส่งข้อความถึงร้าน</div>
            {sent ? (
              <div className="text-green-600 font-semibold text-center py-8">ส่งข้อความเรียบร้อยแล้ว!<br/>ขอบคุณที่ติดต่อร้านขนมหวานค่ะ 🍰</div>
            ) : (
              <>
                <div>
                  <label className="block font-medium mb-1 text-gray-700">ชื่อ-นามสกุล</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-300 outline-none"
                    placeholder="ชื่อของคุณ"
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
                    className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-300 outline-none"
                    placeholder="เบอร์โทรของคุณ"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-700">ข้อความ</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-300 outline-none"
                    placeholder="สอบถามหรือฝากข้อความถึงร้าน"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg shadow transition"
                >
                  ส่งข้อความ
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
