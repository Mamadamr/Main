"use client"
import { useState } from "react";
import Toast from "@/components/admin/Toast";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning";
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // حالت فرم‌ها
  const [general, setGeneral] = useState({
    siteName: "",
    logo: "",
    timezone: "Asia/Tehran",
  });
  const [support, setSupport] = useState({ email: "", phone: "", address: "" });
  const [users, setUsers] = useState([
    { name: "مدیر اصلی", email: "admin@example.com" },
  ]);
  const [payment, setPayment] = useState({ currency: "IRR", apiKey: "" });
  const [notifications, setNotifications] = useState({
    emailEnabled: true,
    smsEnabled: false,
  });
  const [seo, setSeo] = useState({ metaTitle: "", metaDescription: "" });
  const [security, setSecurity] = useState({
    sessionTimeout: 30,
    enable2FA: false,
  });
  const [advanced, setAdvanced] = useState({ customCSS: "", customJS: "" });

  const saveTab = async (tab: string) => {
    setLoading(true);
    try {
      let body;
      switch (tab) {
        case "general":
          body = general;
          break;
        case "support":
          body = support;
          break;
        case "users":
          body = users;
          break;
        case "payment":
          body = payment;
          break;
        case "notifications":
          body = notifications;
          break;
        case "seo":
          body = seo;
          break;
        case "security":
          body = security;
          break;
        case "advanced":
          body = advanced;
          break;
      }
      // مثال API call
      const res = await fetch(`/api/settings/${tab}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("خطا در ذخیره");
      setToast({
        message: `${tab.toUpperCase()} با موفقیت ذخیره شد!`,
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setToast({ message: "خطا در ذخیره", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // لیست تب‌ها
  const tabs = [
    { id: "general", label: "عمومی" },
    { id: "support", label: "پشتیبانی" },
    { id: "users", label: "کاربران" },
    { id: "payment", label: "پرداخت" },
    { id: "notifications", label: "اطلاع‌رسانی" },
    { id: "seo", label: "سئو و آنالیتیکس" },
    { id: "security", label: "امنیت" },
    { id: "advanced", label: "پیشرفته" },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">تنظیمات سایت</h1>

      {/* تب‌ها */}
      <div className="flex flex-wrap gap-2 mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            } transition`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* محتوای تب */}
      <div className="bg-white p-6 rounded shadow">
        {activeTab === "general" && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="نام سایت"
              value={general.siteName}
              onChange={(e) =>
                setGeneral({ ...general, siteName: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="لوگو (URL)"
              value={general.logo}
              onChange={(e) => setGeneral({ ...general, logo: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <select
              value={general.timezone}
              onChange={(e) =>
                setGeneral({ ...general, timezone: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option>Asia/Tehran</option>
              <option>UTC</option>
              <option>America/New_York</option>
            </select>
          </div>
        )}

        {activeTab === "support" && (
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="ایمیل پشتیبانی"
              value={support.email}
              onChange={(e) =>
                setSupport({ ...support, email: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="شماره تلفن"
              value={support.phone}
              onChange={(e) =>
                setSupport({ ...support, phone: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="آدرس"
              value={support.address}
              onChange={(e) =>
                setSupport({ ...support, address: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </div>
        )}

        {activeTab === "users" && (
          <div className="flex flex-col gap-2">
            {users.map((u, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={u.name}
                  onChange={(e) => {
                    const newUsers = [...users];
                    newUsers[i].name = e.target.value;
                    setUsers(newUsers);
                  }}
                  className="border p-2 rounded flex-1"
                />
                <input
                  type="email"
                  value={u.email}
                  onChange={(e) => {
                    const newUsers = [...users];
                    newUsers[i].email = e.target.value;
                    setUsers(newUsers);
                  }}
                  className="border p-2 rounded flex-1"
                />
              </div>
            ))}
            <button
              onClick={() => setUsers([...users, { name: "", email: "" }])}
              className="bg-blue-500 text-white p-2 rounded mt-2"
            >
              اضافه کردن کاربر
            </button>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="کلید API"
              value={payment.apiKey}
              onChange={(e) =>
                setPayment({ ...payment, apiKey: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <select
              value={payment.currency}
              onChange={(e) =>
                setPayment({ ...payment, currency: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option>IRR</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.emailEnabled}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    emailEnabled: e.target.checked,
                  })
                }
              />{" "}
              فعال سازی ایمیل
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.smsEnabled}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    smsEnabled: e.target.checked,
                  })
                }
              />{" "}
              فعال سازی پیامک
            </label>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Meta Title"
              value={seo.metaTitle}
              onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <textarea
              placeholder="Meta Description"
              value={seo.metaDescription}
              onChange={(e) =>
                setSeo({ ...seo, metaDescription: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </div>
        )}

        {activeTab === "security" && (
          <div className="flex flex-col gap-4">
            <input
              type="number"
              placeholder="Timeout session (minutes)"
              value={security.sessionTimeout}
              onChange={(e) =>
                setSecurity({
                  ...security,
                  sessionTimeout: parseInt(e.target.value),
                })
              }
              className="border p-2 rounded w-full"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={security.enable2FA}
                onChange={(e) =>
                  setSecurity({ ...security, enable2FA: e.target.checked })
                }
              />{" "}
              فعال سازی 2FA
            </label>
          </div>
        )}

        {activeTab === "advanced" && (
          <div className="flex flex-col gap-4">
            <textarea
              placeholder="Custom CSS"
              value={advanced.customCSS}
              onChange={(e) =>
                setAdvanced({ ...advanced, customCSS: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <textarea
              placeholder="Custom JS"
              value={advanced.customJS}
              onChange={(e) =>
                setAdvanced({ ...advanced, customJS: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </div>
        )}

        <button
          onClick={() => saveTab(activeTab)}
          disabled={loading}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
