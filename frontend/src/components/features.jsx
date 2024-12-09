const Features = () => {
  const features = [
    {
      title: 'Guest List',
      description: 'Manage your guest RSVPs easily.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5m8-10a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Countdown',
      description: 'Track the days until your wedding.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c.828 0 1.5-.672 1.5-1.5S12.828 5 12 5s-1.5.672-1.5 1.5S11.172 8 12 8z"
          />
        </svg>
      ),
    },
    {
      title: 'To-Do List',
      description: 'Organize all your wedding tasks.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    {
      title: 'Personalized Dashboard',
      description: 'Customize your planning experience.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4h16v16H4z"
          />
        </svg>
      ),
    },
    {
      title: 'Budget Tracker',
      description: 'Keep your wedding on budget.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-purple-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7h18M9 14h6m-3-3v6"
          />
        </svg>
      ),
    },
    {
      title: 'Virtual Venue Tours',
      description: 'Explore venues from your home.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7h18M9 14h6m-3-3v6"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-[#FAF9F5] py-16 px-6">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-16">
        Wedding Planner Features
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white hover:shadow-xl transition-shadow duration-300 rounded-3xl p-8 text-center"
          >
            <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 p-4 rounded-full w-20 h-20 mx-auto mb-6">
              {feature.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              {feature.title}
            </h2>
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
