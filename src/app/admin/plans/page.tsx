"use client";
import React, { useState } from "react";

export default function AdminPage() {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = { title, price: parseFloat(price), description, image };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        setMessage("added");
        setPrice("");
        setTitle("");
        setDescription("");
        setImage("");
      } else {
        setMessage("error while adding");
      }
    } catch (error) {
      setMessage("error while connecting to server");
    }
  };
  return (
    <div className="p-6 max-w-2xl mx-auto text-black">
      <h1 className="text-2xl font bold mb-6"> CREATE PLANS</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
          className="w-full text-black p-2 border rounded"
        />
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="image address"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-600"
        >
          CREATE
              </button>
              {message && <p className="mt-4 text-green-600">{ message}</p>}
      </form>
    </div>
  );
}
