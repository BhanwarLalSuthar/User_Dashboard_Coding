// src/pages/dashboard/add.tsx

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Layout from "@/components/Layout";
import Stepper from "@/components/Stepper";
import { isNotEmpty, isValidEmail } from "@/utils/validate";
import { useRouter } from "next/router";

interface FormData {
  name: string;
  email: string;
  street: string;
  city: string;
  zipcode: string;
}

// Keys for localStorage
const STORAGE_KEY_DATA = "addUserFormData";
const STORAGE_KEY_STEP = "addUserFormStep";

export default function AddUserPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);

  // All form fields in one state object
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
  });

  // Holds validation errors for each field
  const [errors, setErrors] = useState<{ [field: string]: string }>({});

  // Load saved data and step from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY_DATA);
      const savedStep = localStorage.getItem(STORAGE_KEY_STEP);
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
      if (savedStep) {
        const parsedStep = parseInt(savedStep, 10);
        if ([1, 2, 3].includes(parsedStep)) {
          setStep(parsedStep);
        }
      }
    } catch {
      // ignore JSON parse errors or localStorage unavailability
    }
  }, []);

  // Save formData and step to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(formData));
      localStorage.setItem(STORAGE_KEY_STEP, step.toString());
    } catch {
      // ignore
    }
  }, [formData, step]);

  // Move to next step, but first validate current step’s fields
  const handleNext = () => {
    const newErrors: { [field: string]: string } = {};

    if (step === 1) {
      // Validate name & email
      if (!isNotEmpty(formData.name)) {
        newErrors.name = "Name is required.";
      }
      if (!isNotEmpty(formData.email)) {
        newErrors.email = "Email is required.";
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = "Email is not valid.";
      }
    } else if (step === 2) {
      // Validate street, city, zipcode
      if (!isNotEmpty(formData.street)) {
        newErrors.street = "Street is required.";
      }
      if (!isNotEmpty(formData.city)) {
        newErrors.city = "City is required.";
      }
      if (!isNotEmpty(formData.zipcode)) {
        newErrors.zipcode = "ZIP code is required.";
      }
    }

    // If there are any errors, show them and do not advance
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Otherwise clear errors and go to next step
    setErrors({});
    setStep((prev) => prev + 1);
  };

  // Go back one step (and clear any errors)
  const handleBack = () => {
    if (step > 1) {
      setErrors({});
      setStep((prev) => prev - 1);
    }
  };

  // Generic change handler for all inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Final submission (step 3 → submit)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("New User Data:", formData);
    alert("User data logged to console!");
    // Clear stored progress
    try {
      localStorage.removeItem(STORAGE_KEY_DATA);
      localStorage.removeItem(STORAGE_KEY_STEP);
    } catch {
      // ignore
    }
    router.push("/dashboard");
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      <Stepper currentStep={step} />

      <form onSubmit={handleSubmit}>
        {/* ---------------------- */}
        {/* STEP 1: Basic Info */}
        {/* ---------------------- */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block font-medium">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-medium">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
        )}

        {/* ---------------------- */}
        {/* STEP 2: Address Info */}
        {/* ---------------------- */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Street Field */}
            <div>
              <label htmlFor="street" className="block font-medium">
                Street<span className="text-red-500">*</span>
              </label>
              <input
                id="street"
                name="street"
                type="text"
                value={formData.street}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.street && (
                <p className="text-red-600 text-sm mt-1">{errors.street}</p>
              )}
            </div>

            {/* City Field */}
            <div>
              <label htmlFor="city" className="block font-medium">
                City<span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && (
                <p className="text-red-600 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            {/* ZIP Code Field */}
            <div>
              <label htmlFor="zipcode" className="block font-medium">
                ZIP Code<span className="text-red-500">*</span>
              </label>
              <input
                id="zipcode"
                name="zipcode"
                type="text"
                value={formData.zipcode}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.zipcode && (
                <p className="text-red-600 text-sm mt-1">{errors.zipcode}</p>
              )}
            </div>
          </div>
        )}

        {/* --------------------------- */}
        {/* STEP 3: Review & Confirm */}
        {/* --------------------------- */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-white">
              <strong>Name:</strong> {formData.name}
            </p>
            <p className="text-white">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="text-white">
              <strong>Street:</strong> {formData.street}
            </p>
            <p className="text-white">
              <strong>City:</strong> {formData.city}
            </p>
            <p className="text-white">
              <strong>ZIP Code:</strong> {formData.zipcode}
            </p>
            <p className="mt-2 text-sm text-white">
              Review the information above before confirming.
            </p>
          </div>
        )}

        {/* ---------------- */}
        {/* Navigation Buttons */}
        {/* ---------------- */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Back
          </button>

          {step < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Next
            </button>
          )}

          {step === 3 && (
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              onClick={handleSubmit}
            >
              Confirm &amp; Submit
            </button>
          )}
        </div>
      </form>

      {/* Back to Dashboard Link */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="text-blue-500 hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    </Layout>
  );
}
