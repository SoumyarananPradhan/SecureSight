'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Optional if using your own Button component

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [activeIncident, setActiveIncident] = useState(null);

  useEffect(() => {
    fetch("/api/incidents?resolved=false")
      .then((res) => res.json())
      .then((data) => {
        setIncidents(data);
        setActiveIncident(data[0] || null);
      });
  }, []);

  const handleResolve = async (id) => {
    setIncidents((prev) => prev.filter((inc) => inc.id !== id));
    await fetch(`/api/incidents/${id}/resolve`, { method: "PATCH" });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left: Incident Player */}
      <div className="w-2/3 p-6">
        <div className="rounded-lg overflow-hidden shadow bg-black mb-4">
          {activeIncident ? (
            <video
              controls
              src={activeIncident.videoUrl}
              className="w-full h-[400px] object-cover"
            ></video>
          ) : (
            <div className="w-full h-[400px] bg-gray-800" />
          )}
        </div>

        {/* Mini thumbnails */}
        <div className="flex gap-4">
          {[0, 1].map((i) => (
            <div key={i} className="w-1/2 h-[100px] bg-gray-300 rounded overflow-hidden">
              <Image
                src={`/images/thumb${(i % 5) + 1}.jpg`}
                width={150}
                height={100}
                alt="camera-thumb"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Incident List */}
      <div className="w-1/3 p-4 space-y-4">
        <h2 className="text-xl font-semibold">Active Incidents</h2>
        {incidents.map((incident) => (
          <div key={incident.id} className="bg-white p-3 rounded shadow flex gap-4 items-start">
            <Image
              src={incident.thumbnailUrl}
              alt="incident-thumb"
              width={80}
              height={60}
              className="rounded w-20 h-14 object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">{incident.type.replace("_", " ")}</p>
              <p className="text-xs text-gray-500">
                {incident.camera?.location} <br />
                {new Date(incident.tsStart).toLocaleTimeString()} -{" "}
                {new Date(incident.tsEnd).toLocaleTimeString()}
              </p>
              <Button onClick={() => handleResolve(incident.id)} className="mt-2 text-sm">
                Resolve
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
