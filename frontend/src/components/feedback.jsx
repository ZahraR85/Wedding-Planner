import React, { useEffect, useState } from "react";

function FeedbackCards() {
    const [feedbackCards, setFeedbackCards] = useState([]);

    useEffect(() => {
        async function fetchFeedback() {
            try {
                const response = await fetch('http://localhost:3001/userInfoes/feedback'); // Backend endpoint
                const data = await response.json();
                setFeedbackCards(data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        }

        fetchFeedback();
    }, []);

    return (
        <div>
          <h1 className="text-2xl lg:text-4xl text-BgFont font-bold text-left mb-5 pl-6" style={{ color: '#624e40' }}>
                Feedbacks
            </h1>

            <div className="feedback-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

                {feedbackCards.map((card, index) => (
                    <div
                        key={index}
                        className="feedback-card rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                        style={{ backgroundColor: '#d5c0b5' }} // Background color
                    >
                        <h3
                            className="text-xl text-BgFont font-semibold mb-2"
                        >
                            {card.brideName} & {card.groomName}
                        </h3>
                        <p className="text-sm mb-4 text-BgFont">
                            {new Date(card.weddingDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-BgFont">
                            {card.feedback}
                        </p>
                    </div>
                ))}
            </div>
        </div>


    );
}

export default FeedbackCards;
