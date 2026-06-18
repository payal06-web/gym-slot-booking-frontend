import { useEffect, useState } from "react";
import api from "../api";

const Crowd = () => {
  const [slots, setSlots] = useState([]);
  const [crowd, setCrowd] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCrowd();
  }, []);

  const fetchCrowd = async () => {
    try {
      setLoading(true);

      const res = await api.get("/slots");
      setSlots(res.data);

      const crowdData = {};

      for (const slot of res.data) {
        const c = await api.get(`/bookings/crowd/${slot._id}`);
        crowdData[slot._id] = c.data;
      }

      setCrowd(crowdData);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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

      <h1 className="text-3xl font-serif text-yellow-400 mb-2">
         Live Gym Crowd
      </h1>
      <p className="text-gray-400 mb-10">
        Check crowd before going to gym
      </p>
      {loading && (
        <p className="text-gray-400">Loading crowd data...</p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slots.map((slot) => (
          <div
            key={slot._id}
            className="p-5 bg-white/5 shadow-lg shadow-yellow-300/20 rounded-2xl hover:scale-105 transition">
            <h3 className="text-xl font-serif">
              Time: {slot.time}
            </h3>
            <p className={`mt-3 text-lg font-serif ${getColor(crowd[slot._id]?.level)}`}>
              Crowd: {crowd[slot._id]?.level || "Loading"} </p>
            <p className="text-gray-400 mt-1">
              Total Bookings: {crowd[slot._id]?.total || 0} </p>
            <p className="text-gray-500 mt-1 text-sm">
              Capacity: {slot.maxCapacity} </p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
              <div
                className="h-2 rounded-full bg-yellow-400"
                style={{
                  width: `${Math.min(
                    ((crowd[slot._id]?.total || 0) / slot.maxCapacity) * 100,
                    100
                  )}%`,
                }}
              />
            </div>

          </div>
        ))}
      </div>
      <div className="text-center text-gray-500 mt-10">
        Live crowd updates help you avoid rush hours 
      </div>
    </div>
  );
};

export default Crowd;