import { useEffect, useState } from "react";
import api from "../api";

const Slot = () => {
  const [slots, setSlots] = useState([]);
  const [crowd, setCrowd] = useState({});
  const [booked, setBooked] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
  try {
    setLoading(true);

    const res = await api.get("/slots");

    console.log("API RESPONSE:", res.data); // 👈 IMPORTANT

    const slotsData = Array.isArray(res.data)
      ? res.data
      : res.data.slots || res.data.data || [];

    setSlots(slotsData);

    const crowdData = {};

    for (const slot of slotsData) {
      const c = await api.get(`/bookings/crowd/${slot._id}`);
      crowdData[slot._id] = c.data.level;
    }

    setCrowd(crowdData);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  const book = async (slotId) => {
    try {
      await api.post("/bookings", {
        userName: "Gaurav",
        slotId,
        date: new Date().toISOString().split("T")[0],
      });
      setBooked((prev) => ({
        ...prev,
        [slotId]: true,
      }));

      setMessage("Slot Booked Successfully!");

      setTimeout(() => setMessage(""), 3000);

      fetchSlots();

    } catch (err) {
      alert(err.response?.data?.msg || "Booking Failed");
    }
  };

  const getColor = (level) => {
    if (level === "Low") return "text-green-400";
    if (level === "Medium") return "text-yellow-400";
    if (level === "High") return "text-red-500";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-serif shadow-lg shadow-yellow-300/30 text-yellow-200 mb-15">
        Gym Slot Dashboard
      </h1>
      {message && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500 text-green-300 rounded">
          {message}
        </div>
      )}

      {loading && (
        <p className="text-gray-400">Loading slots...</p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(slots) && slots.map((s) => (
          <div
            key={s._id}
            className="p-5 bg-white/5 border border-yellow-500/20 rounded-2xl hover:scale-105 transition">
            <h3 className="text-xl font-serif text-white">
              Time: {s.time} </h3>
            <p className={`mt-2 font-serif ${getColor(crowd[s._id])}`}>
              Crowd: {crowd[s._id] || "Loading"} </p>

            {booked[s._id] && (
              <p className="text-green-400 font-semibold mt-2">
                You booked this slot </p>
            )}

            <button
              onClick={() => book(s._id)}
              disabled={booked[s._id]}
              className={`mt-4 w-full py-2 font-serif font-bold rounded-lg transition
                ${booked[s._id]
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-yellow-200 text-black hover:bg-yellow-300"
                }`}
            >
              {booked[s._id] ? "Booked" : "Book Slot"}
            </button>

          </div>
        ))}

      </div>
      
      <div className="mt-10 text-center text-gray-500">
        Live Crowd updates based on real-time bookings 
      </div>

    </div>
  );
};

export default Slot;