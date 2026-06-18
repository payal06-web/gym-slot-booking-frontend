import { useEffect, useState } from "react";
import api from "../api";

const Admin = () => {
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [crowd, setCrowd] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  
  // Get Slots + Crowd (Fixed)
  const fetchData = async () => {
    try {
      const res = await api.get("/slots");
      setSlots(res.data);

      const crowdData = {};

      for (const slot of res.data) {
        try {
          const c = await api.get(`/bookings/crowd/${slot._id}`);
          crowdData[slot._id] = c.data;
        } catch (err) {
          crowdData[slot._id] = {
            total: 0,
            level: "Low",
          };
        }
      }

      setCrowd(crowdData);

    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  const createSlot = async () => {
    try {
      await api.post("/slots", {
        time,
        maxCapacity: Number(maxCapacity),
      });

      setTime("");
      setMaxCapacity("");
      fetchData();

    } catch (err) {
      alert(err.response?.data?.msg || "Error creating slot");
    }
  };

  const deleteSlot = async (id) => {
    try {
      await api.delete(`/slots/${id}`);
      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const updateCapacity = async (id, newCap) => {
    try {
      await api.put(`/slots/${id}`, {
        maxCapacity: Number(newCap),
      });

      fetchData();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-serif shadow-lg shadow-yellow-400/30 text-yellow-400 mb-20 mt-10">
         Admin Dashboard
      </h1>
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Time (e.g. 6-7 AM)" 
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2  border rounded w-full" />
        <input
          placeholder="Capacity"
          type="number"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(e.target.value)}
          className="p-2 border rounded w-full" />

        <button
          onClick={createSlot}
          className="bg-yellow-200 text-black px-4 rounded font-serif font-semibold"
        > Add Slot</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-20">
        {slots.map((s) => (
          <div
            key={s._id}
            className="p-4 bg-white/5 rounded shadow-lg shadow-yellow-300/30">
            <h2 className="font-serif text-lg">{s.time}</h2>
            <p className="mt-2">
              Crowd:{" "}
              <span className="text-green-400 font-semibold">
                {crowd[s._id]?.level || "Loading"}
              </span>
            </p>
            <p> Bookings: {crowd[s._id]?.total || 0} </p>

            <input
              type="number"
              defaultValue={s.maxCapacity}
              onBlur={(e) =>
                updateCapacity(s._id, e.target.value)
              }
              className="mt-2 p-2 bg-black border w-full rounded"/>

            <button
              onClick={() => deleteSlot(s._id)}
              className="mt-3 bg-red-500 px-3 py-1 rounded w-full"> Delete Slot </button>
              </div>
        ))}

      </div>

    </div>
  );
};

export default Admin;