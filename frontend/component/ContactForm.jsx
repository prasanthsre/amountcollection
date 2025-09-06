import React, { useState, useEffect } from "react";
import axios from "axios";
import { Save, RotateCcw, Calculator } from "lucide-react";

// Helper to auto calculate values
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

function ContactForm({ setContacts, contacts, editingContact, setEditingContact }) {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [collection, setCollection] = useState("");
  const [excessamount, setExcessAmount] = useState("");
  const [excessgiven, setExcessGiven] = useState("");
  const [bending, setBending] = useState("");
  const [excessbending, setExcessBending] = useState("");
  const [collectman, setCollectMan] = useState("00011");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing contact when editing
  useEffect(() => {
    if (editingContact) {
      setDate(editingContact.date ? editingContact.date.split("T")[0] : "");
      setName(editingContact.name);
      setAmount(editingContact.amount);
      setCollection(editingContact.collection);
      setExcessAmount(editingContact.excessamount);
      setExcessGiven(editingContact.excessgiven);
      setBending(editingContact.bending);
      setExcessBending(editingContact.excessbending);
      setCollectMan(editingContact.collectman);
    }
  }, [editingContact]);

  // Auto update bending fields
  useEffect(() => {
    const { bending: calcBending, excessbending: calcExcessBending } =
      calculateValues({ amount, collection, excessamount, excessgiven });
    setBending(calcBending);
    setExcessBending(calcExcessBending);
  }, [amount, collection, excessamount, excessgiven]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Name is required");

    setIsSubmitting(true);

    const contactData = {
      name,
      amount,
      collection,
      excessamount,
      excessgiven,
      bending,
      excessbending,
      collectman,
      date: date ? new Date(date) : null,
    };

    try {
      if (editingContact) {
        // Update
        const res = await axios.put(
          `http://localhost:5000/api/contacts/${editingContact._id}`,
          contactData
        );
        setContacts(
          contacts.map((c) => (c._id === res.data._id ? res.data : c))
        );
        setEditingContact(null);
      } else {
        // Create
        const res = await axios.post(
          "http://localhost:5000/api/contacts",
          contactData
        );
        setContacts([res.data, ...contacts]);
      }

      handleClear();
    } catch (err) {
      console.error("❌ Error saving contact:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setDate("");
    setName("");
    setAmount("");
    setCollection("");
    setExcessAmount("");
    setExcessGiven("");
    setBending("");
    setExcessBending("");
    setCollectMan("00011");
    setEditingContact(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          {editingContact ? "Edit Contact" : "Add New Contact"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Field */}
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Transaction Date
          </label>
          <input
            type="date"
            className="w-half px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Contact Name
            </label>
            <select  name="names" id="names"
              className="w-half  px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white placeholder-slate-400"
             
              value={name}
              onChange={(e) => setName(e.target.value)}
              required >
          <option value="">Select contact name</option>
<option value="01hanston iyyapan">01hanston iyyapan</option>
  <option value="02han madasamy">02han madasamy</option>
  <option value="03han marimuthu">03han marimuthu</option>
  <option value="04h Selvam 3">04h Selvam 3</option>
  <option value="05kannan gurusuresh">05kannan gurusuresh</option>
  <option value="06kannan vanniyaraj">06kannan vanniyaraj</option>
  <option value="07han mari">07han mari</option>
  <option value="08somu loganathan">08somu loganathan</option>
  <option value="09kan gopi">09kan gopi</option>
  <option value="10han chinna durai">10han chinna durai</option>
  <option value="11han sakthi">11han sakthi</option>
  <option value="12somu johnson">12somu johnson</option>
  <option value="13kann ganeshson">13kann ganeshson</option>
  <option value="14han suthakar">14han suthakar</option>
  <option value="15han mani">15han mani</option>
  <option value="16han pechimuthu">16han pechimuthu</option>
  <option value="17han gunam">17han gunam</option>
  <option value="18han Sakthi shanu">18han Sakthi shanu</option>
  <option value="19-----">19-----</option>
  <option value="20han kali">20han kali</option>
  <option value="21kanna vijay">21kanna vijay</option>
  <option value="22kan manikam">22kan manikam</option>
  <option value="23kan rajan">23kan rajan</option>
  <option value="24han bala">24han bala</option>
  <option value="25han vicky">25han vicky</option>
  <option value="26somu murugan vattam">26somu murugan vattam</option>
  <option value="27kann muthuraj">27kann muthuraj</option>
  <option value="28somu muthuthevar">28somu muthuthevar</option>
  <option value="29--gpay768 karthikyen">29--gpay768 karthikyen</option>
  <option value="30kann rajakani">30kann rajakani</option>
  <option value="31somu santhan murthi">31somu santhan murthi</option>
  <option value="32somu kumar f">32somu kumar f</option>
  <option value="33--gpay768 kishor">33--gpay768 kishor</option>
  <option value="34kannan v.v.d mariyappan">34kannan v.v.d mariyappan</option>
  <option value="6035-Q035----">6035-Q035----</option>
  <option value="36hans jeyaraman">36hans jeyaraman</option>
  <option value="37hans senthil">37hans senthil</option>
  <option value="38hans raja">38hans raja</option>
  <option value="39hans selvam">39hans selvam</option>
  <option value="40kannan Kannan">40kannan Kannan</option>
  <option value="041hons arunachalam">041hons arunachalam</option>
  <option value="42hons kabi">42hons kabi</option>
  <option value="6043-Q043-----">6043-Q043-----</option>
  <option value="44hons guna">44hons guna</option>
  <option value="45hons aruna">45hons aruna</option>
  <option value="46somu sekar">46somu sekar</option>
  <option value="47hans issaki bri">47hans issaki bri</option>
  <option value="48kann raja anna">48kann raja anna</option>
  <option value="49kan kumar fruits">49kan kumar fruits</option>
  <option value="50gpay397 mariyappan">50gpay397 mariyappan</option>
  <option value="jabaraj hos">jabaraj hos</option>
  <option value="Subramani hos">Subramani hos</option>
  <option value="vel kumar hos">vel kumar hos</option>
  <option value="Muthu tea hons">Muthu tea hons</option>
  <option value="vairavan somu">vairavan somu</option>
  <option value="jeevanatham hons">jeevanatham hons</option>
  <option value="guna sit hons">guna sit hons</option>
  <option value="john gpay768">john gpay768</option>
  <option value="sankar hons">sankar hons</option>
  <option value="lingam hons">lingam hons</option>
  <option value="kanagaraj Kannan">kanagaraj Kannan</option>
  <option value="MPR hons">MPR hons</option>
  <option value="raja cycle hons">raja cycle hons</option>
  <option value="mariyappan bekery Kannan">mariyappan bekery Kannan</option>
  <option value="ravi kannan">ravi kannan</option>
  <option value="ganeshson pookadi kannan">ganeshson pookadi kannan</option>
  <option value="rajakoram hons">rajakoram hons</option>
  <option value="murugan puthukotai-gpay397">murugan puthukotai-gpay397</option>
  <option value="gandi kannan">gandi kannan</option>
  <option value="setfon kannan">setfon kannan</option>
  <option value="Saravana kumar g pay 397">Saravana kumar g pay 397</option>
  <option value="samynathan gpay 768">samynathan gpay 768</option>
  <option value="prasanthmilk hans">prasanthmilk hans</option>
  <option value="manishop hans">manishop hans</option>
  <option value="jeyakumar Kannan">jeyakumar Kannan</option>
  <option value="Muthu bekery somu">Muthu bekery somu</option>
  <option value="kathiravan hons">kathiravan hons</option>
  <option value="marimuthupetai hans">marimuthupetai hans</option>
  <option value="ganesh cell hons">ganesh cell hons</option>
  <option value="Karthick hons">Karthick hons</option>
  <option value="Kannan tailor Kannan">Kannan tailor Kannan</option>
  <option value="isaikki somu">isaikki somu</option>
  <option value="balasuntharam somu">balasuntharam somu</option>
  <option value="velautham somu">velautham somu</option>
  <option value="murugan tower somu">murugan tower somu</option>
  <option value="Sathish tea somu">Sathish tea somu</option>
  <option value="magenthiran somu">magenthiran somu</option>
  <option value="charma durain somu">charma durain somu</option>
  <option value="Kannan auto somu">Kannan auto somu</option>
  <option value="murugan tailor somu">murugan tailor somu</option>
  <option value="m.m. mari somu">m.m. mari somu</option>
  <option value="gunasing somu">gunasing somu</option>
  <option value="maridass somu">maridass somu</option>
  <option value="marimuthu bakery kannan">marimuthu bakery kannan</option>
  <option value="unni hons">unni hons</option>
  </select>
          </div>

          {/* CollectionMan */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              CollectionMan
            </label>
            <select
              className="w-half  px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white cursor-pointer"
              value={collectman}
              onChange={(e) => setCollectMan(e.target.value)}
            >
              <option value="Kannan">Kannan</option>
              <option value="Hantson">Hantson</option>
              <option value="Somu">Somu</option>
            </select>
          </div>
        </div>

        {/* Financial Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Amount */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
              <input
                type="number"
                className="w-full pl-8 pr-3 sm:pr-4 py-2 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white placeholder-slate-400"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Collection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Collection
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
              <input
                type="number"
                className="w-half pl-8 pr-3 sm:pr-4 py-2 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white placeholder-slate-400"
                placeholder="0.00"
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
              />
            </div>
          </div>

          {/* Excess Amount */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Excess Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
              <input
                type="number"
                className="w-half  pl-8 pr-3 sm:pr-4 py-2 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white placeholder-slate-400"
                placeholder="0.00"
                value={excessamount}
                onChange={(e) => setExcessAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Excess Given */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Excess Given
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
              <input
                type="number"
                className="w-half  pl-8 pr-3 sm:pr-4 py-2 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white placeholder-slate-400"
                placeholder="0.00"
                value={excessgiven}
                onChange={(e) => setExcessGiven(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Calculated Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-blue-100">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Bending (Auto-calculated)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
              <input
                type="number"
                className="w-half  pl-8 pr-3 sm:pr-4 py-2 sm:py-3 border border-blue-200 rounded-lg sm:rounded-xl bg-white/60 text-slate-600 cursor-not-allowed"
                value={bending}
                readOnly
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Excess Bending (Auto-calculated)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
              <input
                type="number"
                className="w-half  pl-8 pr-3 sm:pr-4 py-2 sm:py-3 border border-blue-200 rounded-lg sm:rounded-xl bg-white/60 text-slate-600 cursor-not-allowed"
                value={excessbending}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-half  sm:w-auto flex-1 sm:flex-initial bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {editingContact ? "Update Contact" : "Save Contact"}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="w-full sm:w-auto flex-1 sm:flex-initial bg-slate-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:bg-slate-600 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
