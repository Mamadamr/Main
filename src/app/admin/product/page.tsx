"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

type ProductForm = {
  title: string;
  category_id: number | "";
  sku: string;
  price: number;
  stock: number;
  description: string;
  status: "active" | "inactive";
  image?: File | null;
};
type Product = {
  id: number;
  title: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  image?: string | null;
  category?: {
    id: number;
    title: string;
  };
};
type Category = {
  id: number;
  title: string;
};

const initialForm: ProductForm = {
  title: "",
  category_id: "",
  sku: "",
  price: 0,
  stock: 0,
  description: "",
  status: "active",
  image: null,
};

export default function AdminCreateProduct({
  currentUser,
}: {
  currentUser: any;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const [form, setForm] = useState<ProductForm>(initialForm);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);

  // ---------- Category CRUD ----------
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editCategoryTitle, setEditCategoryTitle] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  // ---------------- CSRF Helper ----------------
  function getCookie(name: string) {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  }

  async function csrfToken() {
    let token = getCookie("XSRF-TOKEN");
    if (!token) {
      await fetch("http://localhost:9000/sanctum/csrf-cookie", {
        credentials: "include",
      });
      token = getCookie("XSRF-TOKEN");
    }
    return token;
  }

  // ---------------- Fetch Categories ----------------
  async function loadCategories() {
    try {
      await csrfToken();
      const xsrfToken = getCookie("XSRF-TOKEN");
      const res = await fetch("http://localhost:9000/api/categories", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken || "",
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setCategories(data.data);
    } catch (err) {
      console.error(err);
      toast.error("خطا در دریافت دسته‌بندی‌ها");
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleCreateCategory() {
    if (!newCategoryTitle.trim()) {
      toast.error("عنوان دسته‌بندی الزامی است");
      return;
    }

    await csrfToken();
    const xsrfToken = getCookie("XSRF-TOKEN");

    const res = await fetch("http://localhost:9000/api/categories", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": xsrfToken || "",
      },
      body: JSON.stringify({ title: newCategoryTitle }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "خطا در ایجاد دسته‌بندی");
      return;
    }

    toast.success("دسته‌بندی اضافه شد");
    setNewCategoryTitle("");
    loadCategories(); // رفرش لیست
  }

  async function handleUpdateCategory(id: number) {
    if (!editCategoryTitle.trim()) {
      toast.error("عنوان الزامی است");
      return;
    }

    await csrfToken();
    const xsrfToken = getCookie("XSRF-TOKEN");
    const res = await fetch(`http://localhost:9000/api/categories/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": xsrfToken || "",
      },
      body: JSON.stringify({ title: editCategoryTitle }),
    });

    if (!res.ok) {
      toast.error("خطا در ویرایش دسته‌بندی");
      return;
    }

    toast.success("ویرایش شد");
    setEditCategoryId(null);
    setEditCategoryTitle("");
    loadCategories();
  }

  async function handleDeleteCategory(id: number) {
    if (!confirm("دسته‌بندی حذف شود؟")) return;

    await csrfToken();
    const xsrfToken = getCookie("XSRF-TOKEN");

    const res = await fetch(`http://localhost:9000/api/categories/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "X-XSRF-TOKEN": xsrfToken || "",
      },
    });

    if (!res.ok) {
      toast.error("خطا در حذف دسته‌بندی");
      return;
    }

    toast.success("حذف شد");
    loadCategories();
  }

  // ----------------------product handler-------------------//
  async function loadProducts() {
    try {
      setProductsLoading(true);
      await csrfToken();

      const xsrfToken = getCookie("XSRF-TOKEN");

      const res = await fetch("http://localhost:9000/api/products", {
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": xsrfToken || "",
        },
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      }
    } catch (err) {
      toast.error("خطا در دریافت محصولات");
    } finally {
      setProductsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDeleteProduct(id: number) {
    if (!confirm("محصول حذف شود؟")) return;

    await csrfToken();
    const xsrfToken = getCookie("XSRF-TOKEN");

    const res = await fetch(`http://localhost:9000/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "X-XSRF-TOKEN": xsrfToken || "",
      },
    });

    if (!res.ok) {
      toast.error("خطا در حذف محصول");
      return;
    }

    toast.success("محصول حذف شد");
    loadProducts();
  }

  // ---------------- Handle Image ----------------
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  }

  // ---------------- Start Edit ----------------
  async function startEditProduct(p: Product) {
    setIsEditing(true);
    setEditProductId(p.id);

    // مقداردهی اولیه از لیست
    setForm({
      title: p.title || "",
      category_id: p.category?.id ?? "",
      sku: "", // اگر API جزئیات دارد پایین تلاش می‌کنیم پر کنیم
      price: p.price ?? 0,
      stock: p.stock ?? 0,
      description: "",
      status: p.status ?? "active",
      image: null,
    });
    setPreview(p.image ? `http://localhost:9000/storage/${p.image}` : null);

    // تلاش برای دریافت جزئیات کامل محصول (در صورت وجود endpoint)
    try {
      await csrfToken();
      const xsrfToken = getCookie("XSRF-TOKEN");
      const res = await fetch(`http://localhost:9000/api/products/${p.id}`, {
        credentials: "include",
        headers: { "X-XSRF-TOKEN": xsrfToken || "" },
      });
      if (res.ok) {
        const data = await res.json();
        const d = data?.data;
        if (d) {
          setForm({
            title: d.title ?? p.title ?? "",
            category_id: d.category_id ?? p.category?.id ?? "",
            sku: d.sku ?? "",
            price: Number(d.price ?? p.price ?? 0),
            stock: Number(d.stock ?? p.stock ?? 0),
            description: d.description ?? "",
            status: (d.status as "active" | "inactive") ?? p.status ?? "active",
            image: null,
          });
          setPreview(
            d.image
              ? `http://localhost:9000/storage/${d.image}`
              : p.image
                ? `http://localhost:9000/storage/${p.image}`
                : null,
          );
        }
      }
    } catch {
      // اگر جزئیات نداشت، همان مقدار اولیه از لیست کافی است
    }

    // اسکرول به فرم
    setTimeout(() => {
      document.querySelector("form")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  function cancelEdit() {
    setIsEditing(false);
    setEditProductId(null);
    setForm(initialForm);
    setPreview(null);
  }

  // ---------------- Submit Handler (Create + Update) ----------------
  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title || !form.category_id) {
      toast.error("عنوان و دسته‌بندی الزامی هستند");
      return;
    }

    setLoading(true);
    const t = toast.loading(
      isEditing ? "در حال ویرایش محصول..." : "در حال ثبت محصول...",
    );

    try {
      await csrfToken();
      const xsrfToken = getCookie("XSRF-TOKEN");

      const body = new FormData();
      body.append("title", form.title);
      body.append("category_id", String(form.category_id));
      body.append("sku", form.sku);
      body.append("price", String(form.price));
      body.append("stock", String(form.stock));
      body.append("description", form.description);
      body.append("status", form.status);
      body.append("user_id", String(currentUser?.id ?? ""));
      if (form.image) body.append("image", form.image);

      let url = "http://localhost:9000/api/products";
      let method: "POST" | "PUT" = "POST";

      if (isEditing && editProductId) {
        // برای Laravel: ارسال با FormData و استفاده از _method=PUT
        url = `http://localhost:9000/api/products/${editProductId}`;
        method = "POST";
        body.append("_method", "PUT");
      }

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          // Content-Type را برای FormData ست نکنید
          "X-XSRF-TOKEN": xsrfToken || "",
        },
        body,
      });

      const data = await res.json();

      if (data.success) {
        toast.success(
          isEditing ? "محصول با موفقیت ویرایش شد!" : "محصول با موفقیت ثبت شد!",
          { id: t },
        );
        // ریست فرم/ویرایش
        cancelEdit();
        // رفرش لیست
        loadProducts();
      } else {
        toast.error(
          data.message ||
            (isEditing ? "خطا در ویرایش محصول" : "خطا در ثبت محصول"),
          { id: t },
        );
      }
    } catch (err: any) {
      toast.error(err.message || "خطای سرور", { id: t });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <Toaster />
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded shadow-md w-full max-w-lg space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">
            {isEditing ? "ویرایش محصول" : "ایجاد محصول جدید"}
          </h2>

          <input
            type="text"
            placeholder="عنوان محصول"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: +e.target.value })}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="SKU محصول"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-4">
            <input
              type="number"
              placeholder="قیمت"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: +e.target.value })}
              min={0}
              className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="موجودی"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: +e.target.value })}
              min={0}
              className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            placeholder="توضیحات محصول"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded mt-2"
            />
          )}

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as "active" | "inactive",
              })
            }
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">فعال</option>
            <option value="inactive">غیرفعال</option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? isEditing
                  ? "در حال ذخیره..."
                  : "در حال ثبت..."
                : isEditing
                  ? "ذخیره تغییرات"
                  : "ثبت محصول"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                انصراف
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ----------- Category Management ----------- */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg mt-8 space-y-4">
        <h3 className="text-xl font-bold">مدیریت دسته‌بندی‌ها</h3>

        {/* Create */}
        <div className="flex gap-2">
          <input
            value={newCategoryTitle}
            onChange={(e) => setNewCategoryTitle(e.target.value)}
            placeholder="عنوان دسته‌بندی جدید"
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={handleCreateCategory}
            className="bg-green-600 text-white px-4 rounded"
          >
            افزودن
          </button>
        </div>

        {/* List */}
        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between border rounded p-2"
            >
              {editCategoryId === cat.id ? (
                <input
                  value={editCategoryTitle}
                  onChange={(e) => setEditCategoryTitle(e.target.value)}
                  className="border p-1 rounded flex-1 mr-2"
                />
              ) : (
                <span>{cat.title}</span>
              )}

              <div className="flex gap-2">
                {editCategoryId === cat.id ? (
                  <button
                    onClick={() => handleUpdateCategory(cat.id)}
                    className="text-green-600"
                  >
                    ذخیره
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditCategoryId(cat.id);
                      setEditCategoryTitle(cat.title);
                    }}
                    className="text-blue-600"
                  >
                    ✏️
                  </button>
                )}

                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="text-red-600"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* product list */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-6xl mt-10">
        <h3 className="text-xl font-bold mb-6">محصولات</h3>

        {productsLoading ? (
          <p className="text-center text-gray-500">در حال بارگذاری...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">محصولی وجود ندارد</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* Image */}
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {p.image ? (
                    <img
                      src={`http://localhost:9000/storage/${p.image}`}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">بدون تصویر</span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold text-lg truncate">{p.title}</h4>

                  <p className="text-sm text-gray-500">
                    دسته‌بندی: {p.category?.title ?? "-"}
                  </p>

                  <div className="flex justify-between text-sm">
                    <span>💰 {p.price.toLocaleString()} تومان</span>
                    <span>📦 موجودی: {p.stock}</span>
                  </div>

                  <span
                    className={`inline-block text-xs px-2 py-1 rounded ${
                      p.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status === "active" ? "فعال" : "غیرفعال"}
                  </span>

                  {/* Actions */}
                  <div className="flex justify-between pt-3 border-t">
                    <button
                      onClick={() => startEditProduct(p)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      ✏️ ویرایش
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      🗑️ حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
