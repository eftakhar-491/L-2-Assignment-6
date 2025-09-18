import { useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

interface PickedupRideProps {
  onPickup: () => void;
  ride: any;
}

const PickedupRide = ({ onPickup, ride }: PickedupRideProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [picked, setPicked] = useState(false);

  const handleDragEnd = () => {
    if (!trackRef.current) return;

    const trackWidth = trackRef.current.offsetWidth;
    const knobWidth = 56; // knob size
    const threshold = trackWidth - knobWidth - 10; // end point

    if (x.get() >= threshold) {
      setPicked(true);
      onPickup();
    } else {
      // 🔥 Smooth reset animation
      animate(x, 0, { type: "spring", stiffness: 300 });
    }
  };

  return (
    <div
      ref={trackRef}
      className="relative w-full max-w-sm h-10 bg-gray-900 rounded-full flex items-center px-2 overflow-hidden select-none"
    >
      {/* Text */}
      {!picked && (
        <span className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
          {!ride.isRideOTPVerified ? "Slide to Pickup" : "Ride Picked Up!"}
        </span>
      )}

      {/* Knob */}
      {!ride.isRideOTPVerified && (
        <motion.div
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0}
          dragMomentum={false}
          style={{ x }}
          onDragEnd={handleDragEnd}
          className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer z-10"
        >
          <span className="text-xl">➡️</span>
        </motion.div>
      )}
    </div>
  );
};

export default PickedupRide;
