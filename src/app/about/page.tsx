"use client";
import React, { useRef, useState } from "react";

export default function AboutPage() {
  const [profileImg, setProfileImg] = useState<string>(
    "https://source.unsplash.com/160x160/?team,people"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImgClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setProfileImg(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-8 border border-blue-100 flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <img
          src={profileImg}
          alt=""
          className="w-32 h-32 rounded-full mb-6 object-cover border-4 border-blue-200 shadow cursor-pointer hover:opacity-80 transition"
          onClick={handleImgClick}
          title="Click to upload profile picture"
        />
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 text-center drop-shadow">About Us</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Welcome to our About page.<br />
          This site is built with <span className="font-semibold text-blue-600">Next.js App Router</span>.<br />
          We are passionate about building modern web applications that are fast, beautiful, and easy to use.
        </p>
        <div className="w-full flex flex-col gap-2">
          <div className="bg-blue-50 rounded-lg p-4 text-blue-900 text-center">
            <span className="font-semibold">Our Mission:</span> Deliver high quality, user-centric web solutions.
          </div>
          <div className="bg-blue-100 rounded-lg p-3 text-blue-800 text-center">
            <span className="font-semibold">Contact:</span> info@example.com
          </div>
        </div>
      </div>
    </div>
  );
}