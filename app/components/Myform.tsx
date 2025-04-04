"use client"; // Ensure this is a client component in Next.js 13+

import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  dob : BigInteger;
};

export default function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 bg-gray-100 rounded-lg shadow-md">
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", { 
            required: "Email is required",  
          })}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="dob"
          {...register("dob", { 
            required: "Date of Birth is required", 
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } 
          })}
          className="w-full p-2 border rounded"
        />
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
      </div>

      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
}
