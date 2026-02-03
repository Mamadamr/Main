const API_BASE = "http://127.0.0.1:9000";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop()!.split(";").shift()!);
  return null;
}

export async function getCsrf() {
  await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
}

export async function adminLogin(formData: FormData) {
  await getCsrf();

  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN")!,
    },
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}
