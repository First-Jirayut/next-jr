"use client";
import React from "react";
import { useRouter } from "next/navigation";

const MenuPage = () => {
  const router = useRouter();
  const [cart, setCart] = React.useState<any[]>([]);

  // --- Mapping สำหรับแสดงชื่อหมวดหมู่ให้อ่านง่าย ---
  const CATEGORY_LABELS: Record<string, string> = {
    cake: "เค้ก",
    bakery: "เบเกอรี่",
    icecream: "ไอศกรีม",
    drink: "เครื่องดื่ม",
    อื่นๆ: "อื่นๆ"
  };

  const [loadingMenu, setLoadingMenu] = React.useState(true);
  const [errorMenu, setErrorMenu] = React.useState<string | null>(null);
  const [menuByCategory, setMenuByCategory] = React.useState<Record<string, any[]>>({});

  // ดึงเมนูจาก Supabase API
  React.useEffect(() => {
    const fetchMenu = async () => {
      setLoadingMenu(true);
      setErrorMenu(null);
      try {
        const res = await fetch('https://jedwmjvmxaprhbleemxn.supabase.co/rest/v1/menu?select=*', {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZHdtanZteGFwcmhibGVlbXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NjkwOTYsImV4cCI6MjA2ODE0NTA5Nn0.Y3XECtmkfvCGrKF7XbphChjnQSIuuiQG5ksxJKNbfcE',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZHdtanZteGFwcmhibGVlbXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NjkwOTYsImV4cCI6MjA2ODE0NTA5Nn0.Y3XECtmkfvCGrKF7XbphChjnQSIuuiQG5ksxJKNbfcE'
          }
        });
        
        if (!res.ok) throw new Error('โหลดเมนูไม่สำเร็จ');
        const data = await res.json();
        console.log("data" , data)
        // สมมติว่าแต่ละรายการมีฟิลด์ category
        const grouped: Record<string, any[]> = {};
        data.forEach((item: any) => {
          const cat = item.category || 'อื่นๆ';
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(item);
        });
        setMenuByCategory(grouped);
      } catch (err: any) {
        setErrorMenu(err.message || 'เกิดข้อผิดพลาด');
      } finally {
        setLoadingMenu(false);
      }
    };
    fetchMenu();
  }, []);

  // โหลด cart จาก localStorage เมื่อ component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const cartStr = localStorage.getItem('cart_items');
      if (cartStr) {
        setCart(JSON.parse(cartStr));
      }
    }
  }, []);

  // เพิ่มเมนูอาหารลง cart (คลิกที่ card)
  const handleMenuClick = (item: any) => {
    handleIncrease(item);
  };

  // เพิ่มจำนวนสินค้า
  const handleIncrease = (item: any) => {
    let newCart = [...cart];
    const idx = newCart.findIndex(i => i.name === item.name);
    if (idx > -1) {
      newCart[idx].qty += 1;
    } else {
      newCart.push({ ...item, qty: 1 });
    }
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart_items', JSON.stringify(newCart));
    }
  };

  // ลดจำนวนสินค้า
  const handleDecrease = (item: any) => {
    let newCart = [...cart];
    const idx = newCart.findIndex(i => i.name === item.name);
    if (idx > -1) {
      if (newCart[idx].qty > 1) {
        newCart[idx].qty -= 1;
      } else {
        newCart.splice(idx, 1);
      }
      setCart(newCart);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart_items', JSON.stringify(newCart));
      }
    }
  };


  // ไปหน้าชำระเงิน
  const handleGoToOrder = () => {
    router.push('/order');
  };

  // ล้างตะกร้าสินค้า
  const handleClearCart = () => {
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart_items');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-100 via-cyan-100 via-60% to-pink-50 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-5xl bg-white/80 rounded-2xl shadow-xl p-6 md:p-10 backdrop-blur-md">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 mb-10 drop-shadow">เมนูขนมหวาน</h1>

        {/* --- ดึงข้อมูลเมนูจาก Supabase --- */}
        <div className="space-y-10">
          {loadingMenu ? (
            <div className="text-center text-lg text-gray-400">กำลังโหลดเมนู...</div>
          ) : errorMenu ? (
            <div className="text-center text-red-500">เกิดข้อผิดพลาดในการโหลดเมนู</div>
          ) : (
            Object.entries(menuByCategory).map(([catName, items]) => (
              <section key={catName}>
                <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-6 bg-pink-400 rounded-full"></span>
                  {CATEGORY_LABELS[catName] || catName}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(items as any[]).map((item, idx) => {
                    const cartItem = cart.find((i) => i.name === item.name);
                    return (
                      <div
                        key={item.name + '-' + idx}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-3 border border-gray-100 cursor-pointer relative"
                        onClick={() => handleMenuClick(item)}
                        tabIndex={0}
                        role="button"
                        aria-label={`เลือก ${item.name}`}
                      >
                        {cartItem && cartItem.qty > 0 && (
                          <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5 font-bold shadow z-10">
                            {cartItem.qty}
                          </span>
                        )}
                        <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden mb-2 flex items-center justify-center">
                          <img
                            src={item.image || 'https://placehold.co/96x96?text=No+Image'}
                            alt={item.name}
                            className="object-cover w-full h-full"
                            loading="lazy"
                            onError={e => (e.currentTarget.src = 'https://placehold.co/96x96?text=No+Image')}
                          />
                        </div>
                        <div className="text-base font-semibold text-gray-800 text-center mb-1">{item.name}</div>
                        <div className="text-sm text-pink-600 font-bold">{item.price} บาท</div>
                        <div className="flex items-center gap-1 mt-2">
                          <button
                            onClick={e => { e.stopPropagation(); handleDecrease(item); }}
                            className="px-2 py-1 rounded bg-red-400 hover:bg-red-500 font-bold text-lg cursor-pointer"
                            disabled={!cartItem || cartItem.qty === 0}
                            aria-label={`ลดจำนวน ${item.name}`}
                          >-</button>
                          <span className="mx-2 min-w-[24px] text-pink-600 text-center select-none">{cartItem?.qty || 0}</span>
                          <button
                            onClick={e => { e.stopPropagation(); handleIncrease(item); }}
                            className="px-2 py-1 rounded bg-green-400 hover:bg-green-500 text-white font-bold text-lg cursor-pointer"
                            aria-label={`เพิ่มจำนวน ${item.name}`}
                          >+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
      {/* Floating Clear Cart Button */}
      <button
        className="fixed z-50 bottom-24 cursor-pointer right-6 px-5 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-base shadow-2xl transition disabled:opacity-60"
        onClick={handleClearCart}
        disabled={cart.length === 0}
      >
        ล้างตะกร้าสินค้า
      </button>
      {/* Floating Order Button */}
      <button
        className="fixed z-50 bottom-6 cursor-pointer right-6 px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg shadow-2xl transition disabled:opacity-60"
        onClick={handleGoToOrder}
        disabled={cart.length === 0}
        style={{ minWidth: 180 }}
      >
        ชำระเงิน ({cart.reduce((sum, i) => sum + i.qty, 0)})
      </button>
    </div>
  );
};

export default MenuPage;
