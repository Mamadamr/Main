"use client";
import { useState } from "react";

type Admin = {
  id: number;
  name: string;
  email: string;
};

const initialAdmins: Admin[] = [
  { id: 1, name: "مدیر اصلی", email: "admin@example.com" },
];

export default function AdminsPage() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addAdmin = () => {
    if (!name || !email) return;
    const newAdmin = { id: Date.now(), name, email };
    setAdmins((prev) => [...prev, newAdmin]);
    setName("");
    setEmail("");
  };

  const removeAdmin = (id: number) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">ادمین‌ها</h1>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="font-semibold mb-2">اضافه کردن ادمین جدید</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="نام"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 flex-1"
          />
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={addAdmin}
            className="bg-blue-500 text-white p-2 rounded"
          >
            اضافه کردن
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">نام</th>
            <th className="p-3 text-left">ایمیل</th>
            <th className="p-3 text-left">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{admin.id}</td>
              <td className="p-3">{admin.name}</td>
              <td className="p-3">{admin.email}</td>
              <td className="p-3">
                <button
                  onClick={() => removeAdmin(admin.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
