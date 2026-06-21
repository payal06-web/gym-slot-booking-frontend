import { useRef } from "react";

const AboutGym = () => {
  const videoRefs = useRef([]);

  const videos = [
    "/video1.mp4",
    "/video2.mp4",
  ];

  const images = [
    "/images/gym1.jpg",
    "/images/gym2.jpg",
    "/images/gym3.jpg",
    "/images/gym4.jpg",
    "/images/gym5.jpg",
    "/images/gym6.jpg",
  ];

  const handlePlay = (index) => {
    videoRefs.current[index]?.play().catch(() => {});
  };

  const handlePause = (index) => {
    videoRefs.current[index]?.pause();
  };

  return (
    <div className="bg-black py-12 sm:py-16 px-4 sm:px-6 md:px-10">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-yellow-100 text-center mb-12 sm:mb-16">
        Gym Highlights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl group"
          >
            <img
              src={img}
              alt="gym"
              loading="lazy"
              className="w-full h-48 sm:h-56 md:h-64 object-cover 
              group-hover:scale-110 transition duration-500"
            />
          </div>
        ))}
        {videos.map((video, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl group"
          >
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              src={video}
              muted
              loop
              playsInline
              preload="none"
              onMouseEnter={() => handlePlay(i)}
              onMouseLeave={() => handlePause(i)}
              className="w-full h-48 sm:h-56 md:h-64 object-cover 
              group-hover:scale-110 transition duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutGym;