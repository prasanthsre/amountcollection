import React, { useState, useEffect } from "react";
import { Edit3, Trash2, Save, RotateCcw } from "lucide-react";

// Helper function for auto-calculation
const calculateValues = ({ amount, collection, excessamount, excessgiven }) => {
  const amt = parseFloat(amount) || 0;
  const coll = parseFloat(collection) || 0;
  const exc = parseFloat(excessamount) || 0;
  const excgi = parseFloat(excessgiven) || 0;

  return {
    bending: amt - coll,
    excessbending: exc - excgi,
  };
};

function ContactTables({ contacts, setContacts }) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    collection: "",
    excessamount: "",
    excessgiven: "",
    collectman: "00011",
    date: new Date().toISOString().split("T")[0],
  });
  const [calcValues, setCalcValues] = useState({ bending: 0, excessbending: 0 });

  // Auto calculate bending
  useEffect(() => {
    setCalcValues(calculateValues(formData));
  }, [formData.amount, formData.collection, formData.excessamount, formData.excessgiven]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save contact
  const handleSave = () => {
    if (!formData.name) {
      alert("Name is required");
      return;
    }
    const newContact = {
      ...formData,
      bending: calcValues.bending,
      excessbending: calcValues.excessbending,
      createdAt: new Date(),
      _id: Date.now().toString(), // fake ID
    };
    setContacts([newContact, ...contacts]);
    handleClear();
  };

  // Clear form
  const handleClear = () => {
    setFormData({
      name: "",
      amount: "",
      collection: "",
      excessamount: "",
      excessgiven: "",
      collectman: "00011",
      date: new Date().toISOString().split("T")[0],
    });
    setCalcValues({ bending: 0, excessbending: 0 });
  };

  // Delete row
  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c._id !== id));
  };

  return (
    <div className="space-y-10">
      {/* Form Table */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Collection</th>
              <th className="px-4 py-2">Excess Amount</th>
              <th className="px-4 py-2">Excess Given</th>
              <th className="px-4 py-2">Bending</th>
              <th className="px-4 py-2">Excess Bending</th>
              <th className="px-4 py-2">Collector</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Enter name"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  name="collection"
                  value={formData.collection}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  name="excessamount"
                  value={formData.excessamount}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  name="excessgiven"
                  value={formData.excessgiven}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="px-4 py-2 text-rose-600 font-semibold">
                {calcValues.bending}
              </td>
              <td className="px-4 py-2 text-orange-600 font-semibold">
                {calcValues.excessbending}
              </td>
              <td className="px-4 py-2">
                <select
                  name="collectman"
                  value={formData.collectman}
                  onChange={handleChange}
                  className="border rounded px-2 py-1"
                >
                  <option value="00011">00011</option>
                  <option value="00022">00022</option>
                  <option value="00033">00033</option>
                </select>
              </td>
              <td className="px-4 py-2">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border rounded px-2 py-1"
                />
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={handleSave}
                  className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-1"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
                <button
                  onClick={handleClear}
                  className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" /> Clear
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Main Contacts Table */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Collection</th>
              <th className="px-4 py-2">Excess Amount</th>
              <th className="px-4 py-2">Excess Given</th>
              <th className="px-4 py-2">Bending</th>
              <th className="px-4 py-2">Excess Bending</th>
              <th className="px-4 py-2">Collector</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500">
                  No contacts found
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr key={c._id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2 text-emerald-600">{c.amount}</td>
                  <td className="px-4 py-2 text-blue-600">{c.collection}</td>
                  <td className="px-4 py-2 text-amber-600">{c.excessamount}</td>
                  <td className="px-4 py-2 text-purple-600">{c.excessgiven}</td>
                  <td className="px-4 py-2 text-rose-600">{c.bending}</td>
                  <td className="px-4 py-2 text-orange-600">{c.excessbending}</td>
                  <td className="px-4 py-2">{c.collectman}</td>
                  <td className="px-4 py-2 text-gray-500">
                    {new Date(c.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200">
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
    </div>
  );
}

export default ContactTables;
