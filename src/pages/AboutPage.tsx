export default function AboutPage(){
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair text-5xl text-center mb-6">About Roop Rang</h1>
        <p className="text-center text-lg text-[#5a4044]">Luxury Cosmetics, Timeless Beauty – Since Surat</p>
        <div className="card-luxury p-8 md:p-12 mt-10 leading-relaxed text-[#463035] space-y-5">
          <h2 className="font-playfair text-2xl text-roop-dark">Our Story</h2>
          <p>Roop Rang was born in the heart of Surat, Gujarat, with a simple mission: bring authentic luxury cosmetics to every Indian beauty lover at honest prices. From our boutique at Apex Building, Dindoli, we curate premium lipsticks, foundations, kajal, skincare and more – tested for Indian skin tones.</p>
          <h3 className="font-playfair text-xl text-roop-gold">Mission</h3>
          <p>To democratize luxury beauty – 100% authentic, fairly priced, with personal WhatsApp consultation.</p>
          <h3 className="font-playfair text-xl text-roop-gold">Vision</h3>
          <p>Become Gujarat’s most loved luxury cosmetic boutique, online and offline, known for trust, curation and care.</p>
          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
            <div>
              <div className="font-semibold">Store Address</div>
              <div className="text-sm mt-1">Shop No 521, Apex Building,<br/>Madhuram Circle, Dindoli,<br/>Surat, Gujarat – 394210</div>
            </div>
            <div>
              <div className="font-semibold">Reach Us</div>
              <div className="text-sm mt-1">Phone: +91 7096241594<br/>Email: rangroop@gmail.com<br/>WhatsApp: +91 7096241594</div>
            </div>
          </div>
          <div className="pt-4">
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.2!2d72.83!3d21.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSurat!5e0!3m2!1sen!2sin!4v1" width="100%" height="320" style={{border:0, borderRadius:'20px'}} loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
