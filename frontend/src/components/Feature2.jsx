import budget from '../images/budget1.png';
import countdown from '../images/countdown1.png';
import dashboard from '../images/dashboard1.png';
import guestlist from '../images/guest1.png';
import todolist from '../images/todolist1.png';
import venue from '../images/vanue1.png';


const Features2 = () => {
    const features = [
        {
            // title: 'Guest List',
            // description: 'Manage your guest RSVPs easily.',
            icon: (
                <img
                    src={guestlist}
                    alt="Guest List Icon"
                    className="h-64 w-64 mx-auto"
                />
            ),
        },
        {
            // title: 'Guest List',
            // description: 'Manage your guest RSVPs easily.',
            icon: (
                <img
                    src={venue}
                    alt="Guest List Icon"
                    className="h-64 w-64 mx-auto"
                />
            ),
        },
        {
            // title: 'Guest List',
            // description: 'Manage your guest RSVPs easily.',
            icon: (
                <img
                    src={todolist}
                    alt="Guest List Icon"
                    className="h-64 w-64 mx-auto"
                />
            ),
        },
        {
            // title: 'Guest List',
            // description: 'Manage your guest RSVPs easily.',
            icon: (
                <img
                    src={budget}
                    alt="Guest List Icon"
                    className="h-64 w-64 mx-auto"
                />
            ),
        },
        {
            // title: 'Guest List',
            // description: 'Manage your guest RSVPs easily.',
            icon: (
                <img
                    src={dashboard}
                    alt="Guest List Icon"
                    className="h-64 w-64 mx-auto"
                />
            ),
        },
        {
            // title: 'Guest List',
            // description: 'Manage your guest RSVPs easily.',
            icon: (
                <img
                    src={countdown}
                    alt="Guest List Icon"
                    className="h-64 w-64 mx-auto"
                />
            ),
        },
    ];

    return (
        <div className="bg-[#FAF9F5] py-10 px-6">
          <h1 className="text-2xl lg:text-4xl text-BgFont font-bold text-left mb-10" style={{ color: '#624e40' }}>
                Our Features
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        // className="bg-[#e8dfcf] hover:shadow-xl transition-shadow duration-300 rounded-3xl p-1 text-center"
                         >
                        <div >
                            {feature.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-BgFont mb-4">
                            {feature.title}
                        </h2>
                        <p className="text-BgFont">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features2;
