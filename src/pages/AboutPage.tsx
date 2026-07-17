import { useEffect, useState } from "react";
import { aboutAPI } from "../services/api";

type AboutData = {
  title?: string;
  tagline?: string;
  story?: string;
  mission?: string;
  vision?: string;
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
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
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-playfair text-5xl text-roop-dark">
          {about.title || "About Roop Rang"}
        </h1>

        <p className="mt-5 text-lg text-[#6B5B5B] max-w-3xl mx-auto">
          {about.tagline}
        </p>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-10">

        {/* Story */}
        <section>
          <h2 className="text-3xl font-playfair text-roop-gold mb-4">
            Our Story
          </h2>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: about.story || "",
            }}
          />
        </section>

        {/* Mission */}
        <section>
          <h2 className="text-3xl font-playfair text-roop-gold mb-4">
            Mission
          </h2>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: about.mission || "",
            }}
          />
        </section>

        {/* Vision */}
        <section>
          <h2 className="text-3xl font-playfair text-roop-gold mb-4">
            Vision
          </h2>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: about.vision || "",
            }}
          />
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-3xl font-playfair text-roop-gold mb-6">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>
              <h3 className="font-semibold mb-2">Store Address</h3>
              <p className="whitespace-pre-line text-gray-600">
                {about.address}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <strong>Phone:</strong> {about.phone}
              </div>

              <div>
                <strong>Email:</strong> {about.email}
              </div>

              <div>
                <strong>WhatsApp:</strong> {about.whatsapp}
              </div>
            </div>

          </div>
        </section>

        {/* Map */}
        <section>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.2!2d72.83!3d21.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSurat!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: "20px" }}
            loading="lazy"
          />
        </section>

      </div>
    </div>
  </div>
);
}