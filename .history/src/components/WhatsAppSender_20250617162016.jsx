import { useState } from "react";

function WhatsAppSender() {
  const [numbers, setNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);

  const sendMessages = () => {
    const phoneList = numbers
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n !== "");

    if (phoneList.length === 0) {
      alert("Mohon masukkan setidaknya satu nomor WhatsApp");
      return;
    }

    if (!message.trim()) {
      alert("Mohon masukkan pesan yang akan dikirim");
      return;
    }

    setIsSending(true);
    setTotalContacts(phoneList.length);
    setProgress(0);

    phoneList.forEach((num, i) => {
      setTimeout(() => {
        const url = `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
        setProgress(i + 1);

        if (i === phoneList.length - 1) {
          setIsSending(false);
        }
      }, i * 3000); // 3 second delay between messages
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-center">
          <div className="flex items-center justify-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.51c.545-1.5.892-2.453.993-2.553.099-.099.198-.05.273-.025.074.025.124.074.174.124.05.05.099.124.124.174.025.05.025.124-.025.198-.05.074-.124.174-.198.273l-.174.198c-.05.05-.1.124-.025.223.075.099.793 1.265 1.015 1.64.223.372.397.397.545.347.149-.05.595-.223 1.19-.694.595-.471.993-.941 1.115-1.09.124-.15.198-.125.273-.075.075.05.446.545.47.595.025.05.025.273-.074.397-.099.124-.446.52-.619.694-.174.174-.347.26-.52.347-.174.1-.347.075-.446-.025-.099-.1-.198-.174-.347-.6-.149-.422-.595-1.463-.644-1.588-.05-.124-.025-.198.025-.273.05-.074.124-.124.174-.174.05-.05.1-.1.149-.174.05-.074.025-.124 0-.174-.025-.05-.074-.1-.174-.149-.099-.05-.446-.347-.595-.471-.149-.124-.248-.185-.347-.185-.099 0-.198.05-.297.149-.099.1-.367.372-.456.52-.089.15-.173.124-.248.074-.074-.05-.545-.2-1.04-.694-.471-.471-.787-1.006-.892-1.19-.099-.174-.008-.273.074-.372.075-.1.174-.223.248-.347.075-.124.1-.198.149-.322.05-.124.025-.198-.025-.273-.05-.074-.446-1.09-.615-1.49-.167-.397-.334-.342-.446-.342-.124 0-.272.008-.421.008z" />
            </svg>
            <h2 className="text-2xl font-bold text-white">
              WhatsApp Bulk Sender
            </h2>
          </div>
          <p className="mt-2 text-green-100">
            Kirim pesan ke banyak kontak sekaligus
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Numbers Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nomor WhatsApp (1 per baris)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                rows={6}
                placeholder="Contoh:\n6281234567890\n6289876543210"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                disabled={isSending}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                {numbers.split("\n").filter((n) => n.trim() !== "").length}{" "}
                kontak
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pesan
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              rows={4}
              placeholder="Tulis pesan yang akan dikirim..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSending}
            />
            <div className="text-xs text-gray-500 mt-1">
              {message.length}/1000 karakter
            </div>
          </div>

          {/* Progress Bar */}
          {isSending && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  Progress: {progress}/{totalContacts}
                </span>
                <span>{Math.round((progress / totalContacts) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${(progress / totalContacts) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Jangan tutup browser ini selama pengiriman berlangsung
              </p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={sendMessages}
            disabled={isSending}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition duration-200 ${
              isSending
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
            }`}
          >
            {isSending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Mengirim...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Kirim ke Semua
              </>
            )}
          </button>

          {/* Tips */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
              Tips Penggunaan
            </h3>
            <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
              <li>
                Gunakan format nomor internasional (contoh: 6281234567890)
              </li>
              <li>Pastikan nomor sudah terdaftar di WhatsApp</li>
              <li>
                Tunggu hingga semua tab terbuka sebelum menutup halaman ini
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsAppSender;
