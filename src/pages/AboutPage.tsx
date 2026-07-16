import { useEffect, useState } from "react";
import { aboutAPI } from "../services/api";

type AboutData = {
  title?: string;
  tagline?: string;
};

export default function AboutPage() {

  const [about, setAbout] = useState<AboutData>({});

  useEffect(() => {
    fetchAbout();
  }, []);


  const fetchAbout = async () => {
    try {
      const res = await aboutAPI.get();
      setAbout(res.data || {});
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">

        <h1 className="font-playfair text-5xl text-center mb-6">
          {about.title || "About Roop Rang"}
        </h1>

        <p className="text-center text-lg text-[#5a4044]">
          {about.tagline || "Luxury Cosmetics, Timeless Beauty – Since Surat"}
        </p>


        {/* Map Section */}
        <div className="pt-10">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.2!2d72.83!3d21.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSurat!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="320"
            style={{ border: 0, borderRadius: "20px" }}
            loading="lazy"
          />
        </div>

      </div>
    </div>
  );
}