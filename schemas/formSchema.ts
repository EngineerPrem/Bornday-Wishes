import {z} from "zod";


const checkEmailExists = async (email:string)=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      const existingEmails = ["premrajesh2005@gmail.com", "user@example.comn"];
      resolve(existingEmails.includes(email));
    },1000);
    });
  };


export const formschema = z.object({

    name: z.string().min(6, "Name must be atleast 6 characters long"),


    email: z
    .string()
    .email("Inavlid email address")
    .refine(async (email)=>!(await checkEmailExists(email)),{
          message: "Email is already Registered",
        }),

    password: z.string().min(8,"Password must be atleast 8 Characters")
    .refine(
        (val) => /[A-Z]/.test(val) && 
                 /[a-z]/.test(val) && 
                 /[0-9]/.test(val) && 
                 /[^A-Za-z0-9]/.test(val), 
        {
          message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@, #, $, etc.)"
        }
      ),
    confirmPassword: z.string(),


    dob: z.string().refine((date) => {
        const dob = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const isBirthdayPassed =
          today.getMonth() > dob.getMonth() ||
          (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
      
        return age > 18 || (age === 18 && isBirthdayPassed);
      }, {
        message: "You must be at least 18 years old",
      }),



    gender: z.enum(["male", "female", "third gender"], {
        required_error: "Select a gender",
      }),

    phone: z.string().min(10, "Phone number must be at least 10 digits"),


    phoneNumbers: z
  .array(z.string().min(10, "Phone number must be at least 10 digits"))
  .default([]), 



    district: z.enum(["none","madurai","karur","trichy"],{required_error:"please Select a district",})
    .refine((val)=> val!=="none", { message:"Please Select a Valid District"}),
    terms: z.literal(true,{errorMap:()=>({message:"You must accept the terms"}) }),

})
    .refine((data)=> data.password ==data.confirmPassword,{
         message:"Passwords do not match",
         path: ["confirmPassword"],
})
