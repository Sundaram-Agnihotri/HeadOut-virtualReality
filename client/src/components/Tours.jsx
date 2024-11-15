import React, { useEffect, useState } from "react";
import Tour from "./Tour";

export default function Tours() {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`/media/all`);
      const data = await res.json();
      setTours(data);
    })();
  }, []);
  console.log(tours);
  return (
    <div className="container mx-[90px]">
      <h1 className="my-10 text-3xl">
        <b>Explore Our Virtual Tours</b>
      </h1>
      <div className="grid grid-cols-3 gap-3">
        {tours.map((tour) => (
          <Tour
            key={tour._id}
            id={tour._id}
            title={tour.title}
            thumbnail={tour.thumbnail}
            location={tour.location}
          />
        ))}
      </div>
    </div>
  );
}