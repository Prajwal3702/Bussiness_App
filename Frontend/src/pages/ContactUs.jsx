import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next";
import config from "../../src/config";
import LOGO from "../assets/Logo.png";

export default function ContactUs() {
  const { t } = useTranslation();
  
  // Add loading state for page loading animation
  const [loading, setLoading] = useState(true);

  // Effect to simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds loading time
    
    return () => clearTimeout(timer);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    customInquiry: "",
    message: "",
  });

  // UI states
  const [showCustomInquiry, setShowCustomInquiry] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle the special case for inquiry type dropdown
    if (name === "inquiryType") {
      setShowCustomInquiry(value === "Other");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing again
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = t("contactUs.form.nameError");
    }

    // Email validation with regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      errors.email = t("contactUs.form.emailError");
    } else if (!emailRegex.test(formData.email)) {
      errors.email = t("contactUs.form.emailError");
    }

    // Inquiry type validation
    if (!formData.inquiryType) {
      errors.inquiryType = t("contactUs.form.inquiryTypeError");
    }

    // Custom inquiry validation (only if "Other" is selected)
    if (formData.inquiryType === "Other" && !formData.customInquiry.trim()) {
      errors.customInquiry = t("contactUs.form.customInquiryError");
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = t("contactUs.form.messageError");
    } else if (formData.message.trim().length < 10) {
      errors.message = t("contactUs.form.messageError");
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Prepare email content
    const inquirySubject =
      formData.inquiryType === "Other"
        ? formData.customInquiry
        : formData.inquiryType;

    const emailContent = {
      name: formData.name,
      email: formData.email,
      subject: `New Inquiry: ${inquirySubject}`,
      text: `
Name: ${formData.name}
Email: ${formData.email}
Inquiry Type: ${inquirySubject}

Message:
${formData.message}
      `,
    };

    try {
      // Fix the API URL handling
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.post(`${apiUrl}/sendemail`, emailContent);

      setSubmitStatus({
        success: true,
        message: t("contactUs.form.success"),
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        inquiryType: "",
        customInquiry: "",
        message: "",
      });
      setShowCustomInquiry(false);
    } catch (error) {
      console.error("Error sending email:", error);

      // More detailed error logging
      if (error.response) {
        console.error("Server response data:", error.response.data);
        console.error("Server response status:", error.response.status);
        console.error("Server response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
        console.error("Request config:", error.config);
      } else {
        console.error("Error setting up request:", error.message);
      }

      const errorMsg = error.response?.data?.message || 
                       (error.request ? "Network error - no response received" : 
                       "Error sending email. Please try again later.");
      
      setSubmitStatus({
        success: false,
        message: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Page Loading Animation */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-white flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <img 
                src={LOGO} 
                alt={t("pageLoader.alt")}
                className="h-32 md:h-40 object-contain mb-4" 
              />
              <motion.div 
                className="w-64 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden"
              >
                <motion.div 
                  className="h-full blue-gradient"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen overflow-hidden"> 
        <section className="relative h-[85vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/doxrnqdwn/image/upload/w_auto,dpr_auto,q_auto,f_auto/v1745489257/Business_App/u5buv6ubp4wielytxjms.jpg"
              className="w-full h-150 object-cover"
              alt={t("contactUs.title")}
            />
            <div className="absolute inset-0" />
          </div>

          <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-bold text-white mb-6"
              >
                {t("contactUs.title")}
              </motion.h1>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-blue-900 to-transparent" />
        </section>
        
        {/* Rest of the page content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-20 rounded-lg shadow-card border border-spice-border">
            <h2 className="text-2xl font-bold mb-4 text-spice-primary">
              {t("contactUs.form.title")}
            </h2>

            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-md mb-6 ${
                  submitStatus.success
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-spice-text mb-1"
                >
                  {t("contactUs.form.nameLabel")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-white border ${
                    formErrors.name ? "border-red-500" : "border-spice-border"
                  } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spice-accent text-spice-text`}
                  placeholder={t("contactUs.form.namePlaceholder")}
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-spice-text mb-1"
                >
                  {t("contactUs.form.emailLabel")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white border ${
                    formErrors.email ? "border-red-500" : "border-spice-border"
                  } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spice-accent text-spice-text`}
                  placeholder={t("contactUs.form.emailPlaceholder")}
                />
                {formErrors.email && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="inquiryType"
                  className="block text-sm font-medium text-spice-text mb-1"
                >
                  {t("contactUs.form.inquiryTypeLabel")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className={`w-full bg-white border ${
                    formErrors.inquiryType
                      ? "border-red-500"
                      : "border-spice-border"
                  } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spice-accent text-spice-text`}
                >
                  <option value="">
                    {t("contactUs.form.inquiryTypePlaceholder")}
                  </option>
                  <option value="Goods Import/Export">
                    {t("contactUs.form.inquiryTypes.importExport")}
                  </option>
                  <option value="Spices">
                    {t("contactUs.form.inquiryTypes.spices")}
                  </option>
                  <option value="Pulses">
                    {t("contactUs.form.inquiryTypes.pulses")}
                  </option>
                  <option value="Sugar & Jaggery">
                    {t("contactUs.form.inquiryTypes.sugarJaggery")}
                  </option>
                  <option value="Rice & Grains">
                    {t("contactUs.form.inquiryTypes.riceGrains")}
                  </option>
                  <option value="Pricing Information">
                    {t("contactUs.form.inquiryTypes.pricing")}
                  </option>
                  <option value="Shipping & Logistics">
                    {t("contactUs.form.inquiryTypes.shipping")}
                  </option>

                  {/* New logistics services options with translation keys */}
                  <option value="Freight Forwarding">
                    {t("contactUs.form.inquiryTypes.freightForwarding")}
                  </option>
                  <option value="Custom Clearance">
                    {t("contactUs.form.inquiryTypes.customClearance")}
                  </option>
                  <option value="Export Import Consultation">
                    {t("contactUs.form.inquiryTypes.exportImportConsultation")}
                  </option>
                  <option value="International Parcel">
                    {t("contactUs.form.inquiryTypes.internationalParcel")}
                  </option>
                  <option value="Sea Export/Import (FCL/LCL)">
                    {t("contactUs.form.inquiryTypes.seaExportImport")}
                  </option>
                  <option value="Air Export/Import">
                    {t("contactUs.form.inquiryTypes.airExportImport")}
                  </option>

                  <option value="Other">
                    {t("contactUs.form.inquiryTypes.other")}
                  </option>
                </select>
                {formErrors.inquiryType && (
                  <p className="text-sm text-red-500 mt-1">
                    {formErrors.inquiryType}
                  </p>
                )}
              </div>

              {showCustomInquiry && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label
                    htmlFor="customInquiry"
                    className="block text-sm font-medium text-spice-text mb-1"
                  >
                    {t("contactUs.form.customInquiryLabel")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="customInquiry"
                    name="customInquiry"
                    value={formData.customInquiry}
                    onChange={handleChange}
                    className={`w-full bg-white border ${
                      formErrors.customInquiry
                        ? "border-red-500"
                        : "border-spice-border"
                    } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spice-accent text-spice-text`}
                    placeholder={t("contactUs.form.customInquiryPlaceholder")}
                  />
                  {formErrors.customInquiry && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.customInquiry}
                    </p>
                  )}
                </motion.div>
              )}

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-spice-text mb-1"
                >
                  {t("contactUs.form.messageLabel")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-white border ${
                    formErrors.message ? "border-red-500" : "border-spice-border"
                  } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spice-accent text-spice-text`}
                  placeholder={t("contactUs.form.messagePlaceholder")}
                />
                {formErrors.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 blue-gradient rounded-md text-white font-medium hover:-translate-y-1 transition-all duration-200 shadow-blue-glow disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting
                  ? t("contactUs.form.sending")
                  : t("contactUs.form.sendButton")}
              </button>
            </form>
          </div>

          <div className="bg-white p-20 rounded-lg shadow-card border border-spice-border">
            <h2 className="text-2xl font-bold mb-4 text-spice-primary">
              {t("contactUs.info.title")}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium contact-us-heading mb-2">
                  {t("contactUs.info.locationTitle")}
                </h3>
                <p className="text-spice-text">
                  {t("contactUs.info.address.line1")}, <br />
                  {t("contactUs.info.address.line2")}, <br />
                  {t("contactUs.info.address.line3")}, <br />
                  {t("contactUs.info.address.line4")}
                </p>
              </div>

              <div>
  <h3 className="text-lg font-medium contact-us-heading mb-2">
    {t("contactUs.info.emailTitle")}
  </h3>
  <div className="flex flex-col gap-2">
    <a
      href={`mailto:${t("contactUs.info.emailAddress1")}`}
      className="text-spice-primary hover:text-spice-secondary transition-colors"
    >
      {t("contactUs.info.emailAddress1")}
    </a>
    <a
      href={`mailto:${t("contactUs.info.emailAddress2")}`}
      className="text-spice-primary hover:text-spice-secondary transition-colors"
    >
      {t("contactUs.info.emailAddress2")}
    </a>
  </div>
</div>


              <div>
                <h3 className="text-lg font-medium contact-us-heading mb-2">
                  {t("contactUs.info.phoneTitle")}
                </h3>
                <a
                  href={`tel:${t("contactUs.info.phoneNumber")}`}
                  className="text-spice-primary hover:text-spice-secondary transition-colors"
                >
                  {t("contactUs.info.phoneNumber")}
                </a>
              </div>

              <div>
                <h3 className="text-lg font-medium contact-us-heading mb-2">
                  {t("contactUs.info.hoursTitle")}
                </h3>
                <p className="text-spice-text">
                  {t("contactUs.info.hours.weekdays")}
                  <br />
                  {t("contactUs.info.hours.saturday")}
                  <br />
                  {t("contactUs.info.hours.sunday")}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium contact-us-heading mb-3">
                  {t("contactUs.info.socialTitle")}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-spice-primary hover:text-spice-secondary transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-spice-primary hover:text-spice-secondary transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-spice-primary hover:text-spice-secondary transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-spice-primary hover:text-spice-secondary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}