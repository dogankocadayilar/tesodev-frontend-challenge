import { useEffect } from "react";

type ErrorCardProps = {
  message: string;
  duration: number;
  onClose: () => void;
};

function ErrorCard({ message, duration, onClose }: ErrorCardProps) {
  useEffect(() => {
    const destroy = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(destroy);
    };
  }, [onClose, duration]);

  return (
    <div className="bg-gray-300 flex items-center space-x-10 rounded-lg p-5">
      <div className="space-y-3">
        <h4 className="font-semibold text-lg">
          Error while adding link element
        </h4>
        <p>{message}</p>
      </div>
      <div className="rounded-full bg-pink-500 text-white px-3 py-1 font-semibold">
        Error
      </div>
    </div>
  );
}

export default ErrorCard;
