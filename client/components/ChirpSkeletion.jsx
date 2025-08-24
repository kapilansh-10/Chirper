// In client/components/ChirpSkeleton.jsx

const ChirpSkeleton = () => {
  return (
    <div className="flex space-x-2 justify-center items-center h-screen">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
    </div>
  );
};

export default ChirpSkeleton;