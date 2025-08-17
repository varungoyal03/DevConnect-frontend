import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get( BASE_URL+ "/payment/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(  BASE_URL+
      "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );
    console.log(order)

    const { amount, keyId, currency, notes, orderId } = order.data.savedPayment;

    const options = {
      key: order.data.keyId,
      amount,
      currency,
      name: "CodersConnect",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  return isUserPremium ? (
    <div className="text-center text-xl font-semibold text-emerald-400 mt-10 p-6 bg-gray-900 rounded-lg max-w-md mx-auto shadow-lg">
      🎉 You are already a premium user
    </div>
  ) : (
    <div className="  p-6 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-white mb-10">
        Upgrade Your Experience
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card bg-gray-800 shadow-xl rounded-xl p-6 flex flex-col items-center border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-[1.02]">
          <div className="badge bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs mb-4">
            POPULAR CHOICE
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Silver Membership</h1>
          <div className="text-4xl font-bold text-white mb-6">$9.99</div>
          <ul className="text-gray-300 mb-6 space-y-3">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Chat with other people
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              100 connection requests/day
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Blue Tick verification
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              3 months access
            </li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Get Silver
          </button>
        </div>

        <div className="card bg-gray-800 shadow-xl rounded-xl p-6 flex flex-col items-center border border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:scale-[1.02]">
          <div className="badge bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs mb-4">
            BEST VALUE
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Gold Membership</h1>
          <div className="text-4xl font-bold text-white mb-6">$15.99</div>
          <ul className="text-gray-300 mb-6 space-y-3">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Chat with other people
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Unlimited connection requests
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Blue Tick verification
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              6 months access
            </li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Get Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;