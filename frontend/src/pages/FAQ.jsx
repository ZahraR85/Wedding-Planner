import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services do you offer as a wedding planner?",
      answer:
        "We offer a range of services, including full wedding planning, day-of coordination, venue selection, vendor management, budget planning, and customized wedding design.",
    },
    {
      question: "Can you help with destination weddings?",
      answer:
        "Yes, we specialize in planning destination weddings and can assist with everything from travel arrangements to coordinating with local vendors and venues.",
    },
    {
      question: "How much does it cost to hire a wedding planner?",
      answer:
        "Our pricing depends on the services you require and the complexity of your wedding. Contact us for a custom quote tailored to your needs.",
    },
    {
      question: "Do you work with specific vendors or can we choose our own?",
      answer:
        "We have a trusted network of vendors, but we’re happy to work with vendors of your choice to create your dream wedding.",
    },
    {
      question: "How far in advance should we book your services?",
      answer:
        "We recommend booking our services 8–12 months in advance to ensure availability and proper planning. However, we can accommodate shorter timelines when possible.",
    },
    {
      question: "Do you handle last-minute changes or emergencies?",
      answer:
        "Yes, we’re experienced in managing last-minute changes and emergencies to ensure your day goes smoothly no matter what.",
    },
    {
      question: "Can you help us stay within our budget?",
      answer:
        "Absolutely! We work closely with you to set a realistic budget and ensure all expenses align with it, helping you get the most value for your money.",
    },
    {
      question: "Do you offer event design and decor services?",
      answer:
        "Yes, we provide event design and decor services to create a cohesive and visually stunning wedding theme tailored to your preferences.",
    },
    {
      question: "Can you help plan pre-wedding events like engagement parties or bridal showers?",
      answer:
        "Yes, we can assist with planning pre-wedding events, including engagement parties, bridal showers, rehearsal dinners, and more.",
    },
    {
      question: "Do you handle legal paperwork for destination weddings?",
      answer:
        "We provide guidance on legal paperwork for destination weddings, helping you understand requirements and ensuring all documents are in order.",
    },
    {
      question: "Will you be present on the wedding day?",
      answer:
        "Yes, we will be present on the wedding day to manage logistics, coordinate with vendors, and ensure everything runs smoothly.",
    },
    {
      question: "Do you offer eco-friendly or sustainable wedding options?",
      answer:
        "Yes, we can help you plan an eco-friendly wedding by sourcing sustainable vendors, decor, and catering options.",
    },
    {
      question: "Can you help with cultural or religious wedding traditions?",
      answer:
        "Yes, we are experienced in organizing weddings that incorporate cultural or religious traditions and customs.",
    },
    {
      question: "What happens if a vendor cancels at the last minute?",
      answer:
        "We have contingency plans in place and will quickly find a replacement vendor to ensure your day is not affected.",
    },
    {
      question: "Do you provide payment plans for your services?",
      answer:
        "Yes, we offer flexible payment plans to make it easier for you to manage costs while planning your wedding.",
    },
    {
      question: "Can we customize your wedding packages?",
      answer:
        "Absolutely! Our packages are fully customizable to meet your unique needs and preferences.",
    },
    {
      question: "How do you handle communication during the planning process?",
      answer:
        "We provide regular updates and are available through email, phone, or virtual meetings to address any questions or concerns.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Our cancellation policy varies depending on the services booked. Please refer to your contract for detailed terms or contact us for clarification.",
    },
    {
      question: "Do you offer virtual wedding planning services?",
      answer:
        "Yes, we offer virtual planning services for couples who are unable to meet in person or are planning a destination wedding.",
    },
    {
      question: "How do I get started with booking your services?",
      answer:
        "Simply contact us through our website, email, or phone to schedule a consultation. We’ll discuss your vision and create a customized plan for your big day.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-customBg py-16 px-6">
      <div className="max-w-5xl mx-auto bg-customBg2 rounded-lg shadow-lg p-8">
        <h2 className="text-xl lg:text-3xl font-bold text-center mb-8 text-BgFont">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 ">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-BgFont font-medium bg-gray-100 hover:bg-gray-200 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-m lg:text-xl">{faq.question}</span>
                <span className="text-m lg:text-xl">
                  {activeIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 bg-white text-BgFont text-sm lg:text-lg">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
