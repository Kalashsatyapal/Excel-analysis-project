import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/protected/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setMsg(res.data.msg))
      .catch(() => setMsg("Unauthorized"));
  }, []);

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (selected && (selected.name.endsWith(".xlsx") || selected.name.endsWith(".xls"))) {
      setFile(selected);
      setUploadStatus("");
    } else {
      setFile(null);
      setUploadStatus("❌ Only Excel files (.xlsx, .xls) are allowed.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload/excel", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus(`✅ Uploaded successfully! Rows processed: ${res.data.data}`);
    } catch (err) {
      setUploadStatus("❌ Upload failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="md:w-1/4 bg-white/70 backdrop-blur-md border-r p-6 shadow-lg rounded-r-xl">
        <h3 className="text-2xl font-extrabold text-gray-800 mb-6 tracking-tight">📁 Dashboard</h3>
        <ul className="space-y-3 text-gray-700 text-lg">
          <li className="hover:text-blue-600 transition duration-200 cursor-pointer">🏠 Home</li>
          <li className="hover:text-blue-600 transition duration-200 cursor-pointer">📤 Upload</li>
          <li className="hover:text-blue-600 transition duration-200 cursor-pointer">⚙️ Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="md:w-3/4 p-8 space-y-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome, User 👋</h2>
          <p className="text-gray-700 text-lg">{msg}</p>
        </div>

        <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">📤 Upload Excel File</h3>
          <div className="space-y-6">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFile}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-purple-500 file:text-white hover:file:brightness-110 transition"
            />
            <button
              onClick={handleUpload}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-200 shadow-md"
            >
              🚀 Upload
            </button>
            {uploadStatus && (
              <p
                className={`mt-2 text-sm ${
                  uploadStatus.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {uploadStatus}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
