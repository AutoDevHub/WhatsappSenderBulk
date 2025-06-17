import { useState } from "react";

function WhatsAppSender() {
  const [numbers, setNumbers] = useState("");
  const [message, setMessage] = useState("");

  const sendMessages = () => {
    const phoneList = numbers
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n !== "");

    phoneList.forEach((num, i) => {
      const url = `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
      setTimeout(() => {
        window.open(url, "_blank");
      }, i * 1000); // jeda 1 detik antar pesan
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">WhatsApp Bulk Sender</h2>
      <label className="block mb-2 font-semibold">Nomor (1 per baris)</label>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows="6"
        placeholder="6281234567890"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
      />
      <label className="block mb-2 font-semibold">Pesan</label>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows="4"
        placeholder="Halo, ini pesan otomatis..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={sendMessages}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
      >
        Kirim ke Semua
      </button>
    </div>
  );
}

export default WhatsAppSender;
