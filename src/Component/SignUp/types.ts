import { z } from "zod";

export interface FormValueType {
  values: {
    name: string;
    address: string;
    email: string;
    number: string;
    user_name: string;
    password: string;
    plan: string;
    yearly: boolean;
    addOn: string[];
  };
}

const emailValidationSchema = z
  .string()
  .email("Invalid email address")
  .min(10, "Minimum 10 characters")
  .max(100, "Maximum 100 characters")
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address format");


const form1Schema = z.object({
  name_title: z.enum([ "Mr.","Ms.", "Mrs."]).default("Mr."), 
  firstname: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 20 characters")
    .regex(/^[\sa-zA-Z.]+$/, "Name can only contain alphabetic characters, spaces, and '.'"),
  lastname: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 20 characters")
    .regex(/^[\sa-zA-Z.]+$/, "Name can only contain alphabetic characters, spaces, and '.'"),
    mobile_no: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must contain exactly 10 digits")
    .min(10, "Should contain minimum 10 digits")
    .max(10, "Should not exceed 10 digits"),
  al_mobile_no: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must contain exactly 10 digits")
    .min(10, "Should contain minimum 10 digits")
    .max(10, "Should not exceed 10 digits"),
    email_id: emailValidationSchema,
}).refine(data => data.mobile_no !== data.al_mobile_no, {
  message: "Mobile number and alternate mobile number should not be the same",
  path: ["al_mobile_no"],
});

const form2Schema = z.object({
  company_name: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 20 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain alphabetic characters and spaces"),
    type_of_company: z
    .string()
    .min(1, "Please select a company type")
    .refine((value) => value !== "Select company type", {
      message: "Please select a valid company type",
      path: ["type_of_company"],
    }),
  address: z
    .string()
    .min(10, 'Minimum 10 characters')
    .max(100, 'Maximum 100 characters'),
  city: z
    .string()
    .nonempty("Please select a city"),
  state: z
    .string()
    .nonempty("Please select a state"),
  country: z
    .string()
    .nonempty("Please select a country"),
  pincode: z
    .string()
    .min(6, "Pincode must be exactly 6 digits")
    .max(6, "Pincode must be exactly 6 digits")
    .regex(/^\d{6}$/, "Pincode must contain exactly 6 digits"),
});

const form3Schema = z.object({
  account_no: z
    .string()
    .regex(/^\d+$/, "Account number must contain only digits")
    .min(10, "Should contain minimum 10 digits")
    .max(18, "Should not exceed 18 digits"),
    beneficiary_name: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 20 characters")
    .regex(/^[\sa-zA-Z.]+$/, "Name can only contain alphabetic characters, spaces, and '.'"),
    ifc_code: z
    .string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format")
    .min(11, "IFSC code must be 11 characters long")
    .max(11, "IFSC code must be 11 characters long"),
  filelist: z.array(z.instanceof(File))
    .refine(files => files.length > 0, 'Please upload your check')
    .refine(files => files.every(file => ['image/png', 'image/jpeg', 'image/tiff'].includes(file.type)), 'Only PNG, JPEG, and TIFF files are allowed')
    .refine(files => files.every(file => file.size <= 101 * 1024), 'File size should not exceed 100KB')
    .default([]),
});

const form4Schema = z.object({
  pan_no: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
    .length(10, "PAN number must be 10 characters long"),
    panimage: z
    .array(z.instanceof(File))
    .refine(files => files.length > 0, 'Please upload your PAN')
    .refine(files => files.every(file => ['image/png', 'image/jpeg', 'image/tiff'].includes(file.type)), 'Only PNG, JPEG, and TIFF files are allowed')
    .refine(files => files.every(file => file.size <= 101 * 1024), 'File size should not exceed 100KB')
    .default([]),
    gst_no: z
    .string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, "Invalid GST Number format")
    .length(15, "GST Number must be 15 characters long"),
  gstimage: z
    .array(z.instanceof(File))
    .refine(files => files.length > 0, 'Please upload your GST')
    .refine(files => files.every(file => ['image/png', 'image/jpeg', 'image/tiff'].includes(file.type)), 'Only PNG, JPEG, and TIFF files are allowed')
    .refine(files => files.every(file => file.size <= 101 * 1024), 'File size should not exceed 100KB')
    .default([]),
  rcimage: z
    .array(z.instanceof(File))
    .refine(files => files.length > 0, 'Please upload your RC')
    .refine(files => files.every(file => ['image/png', 'image/jpeg', 'image/tiff'].includes(file.type)), 'Only PNG, JPEG, and TIFF files are allowed')
    .refine(files => files.every(file => file.size <= 101 * 1024), 'File size should not exceed 100KB')
    .default([]),
    logoimage: z
    .array(z.instanceof(File))
    .refine(files => files.length > 0, 'Please upload your Logo')
    .refine(files => files.every(file => ['image/png', 'image/jpeg', 'image/tiff'].includes(file.type)), 'Only PNG, JPEG, and TIFF files are allowed')
    .refine(files => files.every(file => file.size <= 101 * 1024), 'File size should not exceed 100KB')
    .default([]),
});

export const formValidationSchema = z.object({
  form1Schema,
  form2Schema,
  form3Schema,
  form4Schema,
});
