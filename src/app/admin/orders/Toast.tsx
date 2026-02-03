"use client";

export default function Toast({ text }: { text: string }) {
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded">
      {text}
    </div>
  );
}
