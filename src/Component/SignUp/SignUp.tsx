import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import Form2 from "../forms/Form2";
import NextButton from "./components/NextButton";
import StepNav from "./components/StepNav";
import Form1 from "../forms/Form1";
import Form3 from "../forms/Form3";
import Form4 from "../forms/Form4";
import BackButton from "./components/BackButton";
import SuccessPage from "../forms/SuccessPage";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { formValidationSchema } from "./types";
import "./SignUp.css";
import axios from 'axios';
import { Notyf } from "notyf";

const notyf = new Notyf({
  duration: 4000,
  position: { x: "right", y: "top" },
  ripple: true,
  dismissible: true,
});
type FormValues = typeof initialValues;
const initialValues = {
  name_title:"Mr.",
  name:"",
  firstname: "",
  lastname: "",
  email_id: "",
  mobile_no: "",
  al_mobile_no: "",
  company_name: "",
  type_of_company: "",
  address: "",
  city: "",
  state: "",
  country: "",
  id_state: "",
  id_city: "",
  id_country: "",
  pincode: "",
  account_no: "",
  beneficiary_name: "",
  ifc_code: "",
  filelist: [] as File[],
  pan_no: "",
  panimage: [] as File[],
  gst_no: "",
  gstimage: [] as File[],
  rcimage: [] as File[],
  logoimage: [] as File[],
};

function SignUp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [success, setSuccess] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);
  const [panimage, setPanimage] = useState<File[]>([]);
  const [gstimage, setGstimage] = useState<File[]>([]);
  const [rcimage, setRcimage] = useState<File[]>([]);
  const [logoimage, setLogoimage] = useState<File[]>([]);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const next = () => {
    if (currentIndex === 3) return;
    const updatedSteps = [...completedSteps];
    updatedSteps[currentIndex] = true;
    setCompletedSteps(updatedSteps);
    setCurrentIndex(currentIndex + 1);
    
  };

  const back = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  const setValidationSchema = () => {
    switch (currentIndex) {
      case 0:
        return toFormikValidationSchema(formValidationSchema.shape.form1Schema);
      case 1:
        return toFormikValidationSchema(formValidationSchema.shape.form2Schema);
      case 2:
        return toFormikValidationSchema(formValidationSchema.shape.form3Schema);
      case 3:
        return toFormikValidationSchema(formValidationSchema.shape.form4Schema);
      default:
        return {};
    }
  };

  const handleSubmit = async (  values: FormValues, actions: FormikHelpers<typeof initialValues>) => {
    try {
      const temp = { ...values };

    temp.name = `${temp.firstname} ${temp.lastname}`;
    temp.state = temp.id_state;
    temp.city = temp.id_city;
    temp.country = temp.id_country;

    const { gstimage, logoimage, panimage, rcimage, id_state, id_city, id_country, firstname,
      lastname, filelist, ...filteredValues } = temp;

      try {
        const key = sessionStorage.getItem('authkey');
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/agent/registration`,filteredValues,{
          headers: {
            Authorization: `Bearer ${key}`
          }
        });
        if (response.status === 200 && response.data.status) {
          setSuccess(true); 
        } else if(response.status === 200 && response.data.status === false){
          const errorMessage = response?.data?.message;
          notyf.error(errorMessage);
        }
      } catch (error) {
        
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || 'An error occurred';
          notyf.error(errorMessage);
        } else {
          notyf.error('An unexpected error occurred');
        }
      }
      
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center p-0 py-lg-3">
        <div className="d-flex justify-content-between desktopShadow flex-column flex-lg-row bg-light pb-3 p-md-4 rounded-3">
          <StepNav
            currentIndex={currentIndex}
            completedSteps={completedSteps}
          />
          <div className="col-12 col-lg-8 flex-2 mobileShadow h-100 p-2 p-md-3 p-lg-4 bg-light rounded-4 z-3">
            <div className="max-lg-bg-white w-100 h-100 rounded-2xl">
              {success ? (
                <SuccessPage />
              ) : (
                <Formik
                  initialValues={initialValues}
                  validationSchema={setValidationSchema()}
                  validateOnChange={true}
                  validateOnBlur={true}
                  
                  onSubmit={(values, actions) => {
                    if (currentIndex === 3) {
                      handleSubmit(values, actions); 
                    } else {
                      next();
                      actions.setTouched({});
                    }
                  }}
                >
                  {({ validateForm, setFieldTouched, values }) => (
                    <Form className="d-flex flex-column h-100 w-100 justify-content-between font-mono pl-10 pt-10 pr-12 max-lg-p-4">
                      {currentIndex === 0 && <Form1 />}
                      {currentIndex === 1 && <Form2 />}
                      {currentIndex === 2 && (
                        <Form3 fileList={fileList} setFileList={setFileList} />
                      )}
                      {currentIndex === 3 && (
                        <Form4
                          panimage={panimage}
                          setPanimage={setPanimage}
                          gstimage={gstimage}
                          setGstimage={setGstimage}
                          rcimage={rcimage}
                          setRcimage={setRcimage}
                          logoimage={logoimage}
                          setLogoimage={setLogoimage}
                        />
                      )}
                      <div className="w-100 d-flex flex-row justify-content-between pt-3">
                        <BackButton index={currentIndex} back={back} />
                        <NextButton
                          index={currentIndex}
                          onClick={() => {
                            validateForm().then(() => {
                              Object.keys(values).forEach((key) =>
                                setFieldTouched(key, true)
                              );
                            });
                          }}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
