import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Edit3, Trash2 } from "lucide-react"; // ✅ better icons

function ContactList({ setContacts, contacts }) {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("https://amountcollection.onrender.com/api/contacts");
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setContacts(sorted);
      } catch (err) {
        console.error("❌ Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [setContacts]);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      setContacts((prev) =>
        prev
          .filter((c) => c._id !== id)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      console.error("❌ Error deleting contact:", err);
    }
  };

  // Edit handler
  const handleEdit = (contact) => {
    alert(`Editing contact: ${contact.name}`);
  };

  // Filter & Search
  const filteredContacts = contacts.filter((c) => {
    const matchesFilter = filter ? c.collectman === filter : true;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.createdAt &&
        new Date(c.createdAt).toLocaleDateString().includes(search));
    return matchesFilter && matchesSearch;
  });

  // Badge colors
  const getCollectorBadgeColor = (collectman) => {
    const colors = {
      "00011": "bg-emerald-100 text-emerald-800 border border-emerald-300",
      "00022": "bg-blue-100 text-blue-800 border border-blue-300",
      "00033": "bg-purple-100 text-purple-800 border border-purple-300",
    };
    return colors[collectman] || "bg-gray-100 text-gray-800 border border-gray-300";
  };

  return (
    <>
      {/* Filter + Search */}
      <div className="flex gap-4">
        <select
          className="p-2 rounded bg-[#00277a] text-white cursor-pointer outline-0"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Kannan">Kannan</option>
          <option value="Hanston">Hanston</option>
          <option value="Somu">Somu</option>
        </select>

        <input
          type="text"
          placeholder="Search by name or date"
          className="p-3 rounded w-full bg-[#eff4ff] outline-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="w-full h-[415px] flex flex-col items-center justify-center rounded-[5px] mt-10 gap-4">
          <AiOutlineLoading3Quarters className="animate-spin text-3xl text-[#00277a]" />
          <p className="text-[#00277a] text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="mt-10 overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <h3 className="font-bold text-lg mb-4 px-4">Contacts List</h3>
          <table className="table-auto w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Name</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Amount</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Collection</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Excess Amount</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Excess Given</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Bending</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Excess Bending</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Collector</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Date</th>
                <th className="text-center px-6 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-6 text-gray-500">
                    No contacts found
                  </td>
                </tr>
              ) : (
                filteredContacts.map((c, i) => (
                  <tr
                    key={c._id}
                    className={`${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="px-6 py-3 font-medium text-gray-800">{c.name}</td>
                    <td className="px-6 py-3 font-bold text-emerald-600">{c.amount}</td>
                    <td className="px-6 py-3 font-semibold text-blue-600">{c.collection}</td>
                    <td className="px-6 py-3 text-amber-600">{c.excessamount}</td>
                    <td className="px-6 py-3 text-purple-600">{c.excessgiven}</td>
                    <td className="px-6 py-3 text-rose-600">{c.bending}</td>
                    <td className="px-6 py-3 text-orange-600">{c.excessbending}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getCollectorBadgeColor(
                          c.collectman
                        )}`}
                      >
                        {c.collectman}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(c)}
                        className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default ContactList;
