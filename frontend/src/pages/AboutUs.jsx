import Staff from "../components/Staff";
const AboutUs = () => {
  return (
    <div className="">
    <div className="max-w-7xl mx-auto px-4 py-8 ">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-xl lg:text-4xl font-bold text-BgFont">About Us</h1>
        <p className="text-lg lg:text-2xl text-BgFont mt-2">
          Your Dream Wedding Starts Here.
        </p>
      </section>

      {/* History Section */}
      <section className="mb-12 bg-customBg p-5 rounded-lg">
        <h2 className="text-lg lg:text-3xl font-bold text-BgFont ">Our Story:</h2>
        <p className="text-sm lg:text-lg text-BgFont mt-4">
          We are a passionate wedding planning team that believes in turning your dream wedding into a reality. Our journey started in 2020 when "Shabnam" envisioned a wedding service that combines creativity, personal touch, and meticulous attention to detail.
          After planning our own weddings, we understood the challenges and stress that often accompany this exciting yet overwhelming experience.

At "I said Yes", we provide comprehensive wedding planning services to help brides and grooms enjoy their journey to the big day. Our team specializes in offering curated services for venues, catering, photography, and much more. Whether you're looking for the perfect wedding venue, the best catering options, or expert recommendations for every detail, we’ve got you covered!

We believe that wedding planning should be a joyful experience, not a stressful one. That's why we’ve designed our services to make everything seamless, from budgeting to guest lists, so you can focus on what truly matters — celebrating your love.
        </p>
        <p className="text-sm lg:text-lg text-BgFont mt-4">
          Since then, we've planned over [2000] of beautiful weddings, each unique and memorable, creating lifelong memories for couples.
        </p>
      </section>
      {/* Mission & Values Section */}
      <section className="bg-[#e8dfcf] p-8 rounded-lg mb-12">
        <h2 className="text-lg lg:text-3xl font-bold text-BgFont">Our Mission:</h2>
        <p className="text-sm lg:text-lg text-BgFont mt-4">
          Our mission is to create unforgettable weddings that reflect each couple's unique love story. We believe every detail matters, from the perfect venue to the smallest decorative accents. Our team works tirelessly to ensure your wedding day is flawless.
          Join our growing community of couples who have turned their wedding visions into reality with our help. Let us be part of your special day!
        
        </p>
      </section>
      {/* Team Section */}
      <section className="mb-12">
        <Staff />
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-customBg1 p-8 rounded-lg mb-12">
        <h2 className="text-lg lg:text-3xl font-bold text-BgFont">Why Choose Us</h2>
        <ul className="mt-4 text-sm lg:text-lg text-BgFont">
          <li>✔ Personalized wedding planning to match your style and vision</li>
          <li>✔ Expert coordination to ensure everything goes smoothly</li>
          <li>✔ A wide network of trusted vendors to make your wedding perfect</li>
          <li>✔ Stress-free planning process from start to finish</li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="mb-12">
        <h2 className="text-lg lg:text-3xl font-bold text-BgFont">What Our Clients Say</h2>
        <div className="mt-6">
          <blockquote className="text-sm lg:text-lg text-BgFont">
            "The team at "I SAID YES" made our wedding day truly magical. From the very first meeting, they understood exactly what we wanted and delivered beyond our expectations. We couldn't have asked for a better experience!"
          </blockquote>
          <p className="text-sm lg:text-lg text-BgFont mt-2">- Veronika</p>
        </div>
      </section>
    </div>
    </div>
  );
};

export default AboutUs;
