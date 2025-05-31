// src/components/Stepper.tsx

type StepperProps = {
    currentStep: number; // 1, 2, or 3
  };
  
  const STEPS = ["Basic Info", "Address", "Review"];
  
  export default function Stepper({ currentStep }: StepperProps) {
    return (
      <div className="flex justify-center mb-6 space-x-4">
        {STEPS.map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          return (
            <div key={stepNum} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  isActive
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {stepNum}
              </div>
              <span
                className={`mt-1 text-xs ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  