import { useEffect, useState } from "react";

export default function Notification() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setShowNotification(true);

    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" bg-gray-100 p-10">
      <h1 className="text-3xl font-bold">Home Page</h1>

      <div
        className={`
          fixed top-5 right-5
     transition-all duration-500 ease-in-out
          ${
            showNotification
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }
        `}
      >
        <div className="w-96 bg-white border-l-4 border-green-500 shadow-2xl rounded-xl p-4 flex items-start gap-3">
          <div className="text-green-500 text-2xl">✅</div>

          <div className="flex-1">
            <h2 className="font-semibold text-lg text-gray-800">Success!</h2>

            <p className="text-gray-600 text-sm mt-1">
              Your notification box is now animated beautifully.
            </p>
          </div>

          <button
            onClick={() => setShowNotification(false)}
            className="text-gray-400 hover:text-black text-lg"
          >
            ✖
          </button>
        </div>
      </div>
    </div>
  );
}
