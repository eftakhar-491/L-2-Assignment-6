import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Driver Found" },
  { id: 2, name: "Driver En Route" },
  { id: 3, name: "Ride Started" },
];

export function RideProgress({ currentStep = 4 }) {
  return (
    <div className="flex w-full items-center justify-between space-x-2">
      {steps.map((step) => (
        <div
          key={step.id}
          className="w-1/3 flex flex-1 flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center rounded-full  w-full">
            {/* The bar that fills up */}
            {currentStep !== step.id && (
              <motion.div
                className={cn("w-full rounded-full", {
                  "border-2 border-green-500": currentStep > step.id,
                })}
                //   initial={{ scale: 0 }}
                //   animate={{ scale: currentStep >= step.id ? 1 : 0 }}
                transition={{ duration: 0.5, type: "spring" }}
              />
            )}
            {/* Loading animation for the active step */}
            {currentStep === step.id && (
              <motion.div
                className="w-full rounded-full border-2 border-green-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            )}
          </div>
        </div>
      ))}
      {/* <p className="mt-2 text-sm text-gray-500">dsf</p> */}
    </div>
  );
}
