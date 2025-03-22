const WatchHistory = ({ watchHistory }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Watch History</h2>
      {watchHistory.length > 0 ? (
        <ul>
          {watchHistory.map((item, index) => (
            <li key={index} className="border-b py-2">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No watch history available.</p>
      )}
    </div>
  );
};

export default WatchHistory;
