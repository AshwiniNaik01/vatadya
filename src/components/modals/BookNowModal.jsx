// import React from "react";
// import { X } from "lucide-react";

// const BookNowModal = ({ isOpen, onClose }) => {
//     if (!isOpen) return null;

//     const treks = ["Kedarkantha", "Har Ki Dun", "Valley of Flowers", "Triund"];

//     return (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//             {/* Overlay click to close */}
//             <div className="absolute inset-0" onClick={onClose}></div>

//             <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-4xl w-full relative z-10 animate-fadeIn">
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-all"
//                 >
//                     <X size={24} />
//                 </button>

//                 <h2 className="text-3xl font-bold text-emerald-800 mb-2 text-center">
//                     Book Your Adventure
//                 </h2>
//                 <p className="text-center text-gray-500 mb-8">Fill in your details below to secure your spot</p>

//                 <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-1">
//                         <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
//                         <input
//                             type="text"
//                             placeholder="John Doe"
//                             className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white"
//                         />
//                     </div>

//                     <div className="space-y-1">
//                         <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
//                         <input
//                             type="email"
//                             placeholder="john@example.com"
//                             className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white"
//                         />
//                     </div>

//                     <div className="space-y-1">
//                         <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
//                         <input
//                             type="tel"
//                             placeholder="+91 98765 43210"
//                             className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white"
//                         />
//                     </div>

//                     <div className="space-y-1">
//                         <label className="text-sm font-semibold text-gray-700 ml-1">Select Trek</label>
//                         <select className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white appearance-none">
//                             <option value="" disabled selected>
//                                 Choose your destination
//                             </option>
//                             {treks.map((trek, i) => (
//                                 <option key={i} value={trek}>{trek}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="space-y-1">
//                         <label className="text-sm font-semibold text-gray-700 ml-1">Date</label>
//                         <input
//                             type="date"
//                             className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white"
//                         />
//                     </div>

//                     <div className="space-y-1">
//                         <label className="text-sm font-semibold text-gray-700 ml-1">Participants</label>
//                         <input
//                             type="number"
//                             min="1"
//                             placeholder="1"
//                             className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="md:col-span-2 w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-emerald-500/30 transform transition-all duration-300 active:scale-[0.98] mt-2"
//                     >
//                         Confirm Booking
//                     </button>
//                 </form>
//             </div>

//             <style>{`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.95); }
//             to { opacity: 1; transform: scale(1); }
//           }
//           .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
//         `}</style>
//         </div>
//     );
// };

// export default BookNowModal;

import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const BookNowModal = ({ isOpen, onClose, trekData }) => {
  if (!isOpen) return null;

  // Determine booking type from trekData
  const bookingType = trekData?.bookingType || "Trek"; // "Trek", "Trek + Camping", "Trip"

  const [formData, setFormData] = useState({
    name: "",
    whatsappNumber: "",
    email: "",
    pickupPoint: "",
    dob: "",
    gender: "",
    medicalHistory: "",
    bloodGroup: "",
    alternativeContact: "",
    emergencyContact: "",
    trekName: trekData?.title || "",
    departureDate: "",
    numberOfPeople: 1,
    // Conditional fields
    needCoupleTent: false,
    needCouplePrivateRoom: false,
    // Additional members
    additionalMembers: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Reset additional members if number of people changes to 1
    if (name === "numberOfPeople" && parseInt(value) <= 1) {
      setFormData((prev) => ({ ...prev, additionalMembers: [] }));
    }
  };

  const handleAddMember = () => {
    setFormData((prev) => ({
      ...prev,
      additionalMembers: [
        ...prev.additionalMembers,
        { name: "", whatsappNumber: "" },
      ],
    }));
  };

  const handleRemoveMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      additionalMembers: prev.additionalMembers.filter((_, i) => i !== index),
    }));
  };

  const handleMemberChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      additionalMembers: prev.additionalMembers.map((member, i) =>
        i === index ? { ...member, [field]: value } : member,
      ),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.whatsappNumber.trim())
      newErrors.whatsappNumber = "WhatsApp number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.pickupPoint.trim())
      newErrors.pickupPoint = "Pickup point is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.alternativeContact.trim())
      newErrors.alternativeContact = "Alternative contact is required";
    if (!formData.emergencyContact.trim())
      newErrors.emergencyContact = "Emergency contact is required";
    if (!formData.trekName.trim()) newErrors.trekName = "Trek name is required";
    if (!formData.departureDate)
      newErrors.departureDate = "Departure date is required";
    if (formData.numberOfPeople < 1)
      newErrors.numberOfPeople = "Must be at least 1 person";

    // Validate additional members
    if (formData.numberOfPeople > 1) {
      const requiredMembers = formData.numberOfPeople - 1;
      if (formData.additionalMembers.length < requiredMembers) {
        newErrors.additionalMembers = `Please add ${requiredMembers} additional member(s)`;
      } else {
        formData.additionalMembers.forEach((member, index) => {
          if (!member.name.trim()) {
            newErrors[`member_${index}_name`] = "Member name is required";
          }
          if (!member.whatsappNumber.trim()) {
            newErrors[`member_${index}_whatsapp`] =
              "Member WhatsApp is required";
          }
        });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare data for API
    const bookingData = {
      ...formData,
      bookingType,
      trekId: trekData?._id,
    };

    console.log("Booking Data:", bookingData);
    // TODO: Call your booking API here
    // await submitBooking(bookingData);

    // Close modal on success
    alert("Booking submitted successfully!");
    onClose();
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genders = ["Male", "Female", "Other"];

  // Calculate if we need to show additional member fields
  const showAdditionalMembers = formData.numberOfPeople > 1;
  const requiredAdditionalMembers = formData.numberOfPeople - 1;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm overflow-y-auto custom-scrollbar">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Center container with padding */}
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-5xl w-full relative z-10 animate-fadeIn">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-all"
          >
            <X size={24} />
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2 text-center">
              Book Your Adventure
            </h2>
            <p className="text-center text-gray-500 mb-2">
              {trekData?.title ||
                "Fill in your details below to secure your spot"}
            </p>
            <p className="text-center text-sm font-semibold text-emerald-600">
              Booking Type: {bookingType}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Details Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-emerald-200">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs ml-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.whatsappNumber
                        ? "border-red-500"
                        : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
                  />
                  {errors.whatsappNumber && (
                    <p className="text-red-500 text-xs ml-1">
                      {errors.whatsappNumber}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs ml-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Pickup Point <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pickupPoint"
                    value={formData.pickupPoint}
                    onChange={handleChange}
                    placeholder="Pune Railway Station"
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.pickupPoint ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
                  />
                  {errors.pickupPoint && (
                    <p className="text-red-500 text-xs ml-1">
                      {errors.pickupPoint}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.dob ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs ml-1">{errors.dob}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.gender ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white appearance-none`}
                  >
                    <option value="">Select Gender</option>
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs ml-1">{errors.gender}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-emerald-200">
                Medical Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Any Medical History
                  </label>
                  <textarea
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    placeholder="Any allergies, conditions, or medications..."
                    rows="3"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.bloodGroup ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white appearance-none`}
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                  {errors.bloodGroup && (
                    <p className="text-red-500 text-xs ml-1">
                      {errors.bloodGroup}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contacts Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-emerald-200">
                Emergency Contacts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Alternative Contact Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="alternativeContact"
                    value={formData.alternativeContact}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.alternativeContact
                        ? "border-red-500"
                        : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
                  />
                  {errors.alternativeContact && (
                    <p className="text-red-500 text-xs ml-1">
                      {errors.alternativeContact}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Emergency Contact Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.emergencyContact
                        ? "border-red-500"
                        : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
                  />
                  {errors.emergencyContact && (
                    <p className="text-red-500 text-xs ml-1">
                      {errors.emergencyContact}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Details Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-emerald-200">
                Booking Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Trek Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="trekName"
                    value={formData.trekName}
                    onChange={handleChange}
                    placeholder="Enter trek name"
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.trekName ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
                  />
                  {errors.trekName && (
                    <p className="text-red-500 text-xs ml-1">
                      {errors.trekName}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Departure Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.departureDate
                        ? "border-red-500"
                        : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
                  />
                  {errors.departureDate && (
                    <p className="text-red-500 text-xs ml-1">
                      {errors.departureDate}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Number of People <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleChange}
                    min="1"
                    max={trekData?.groupSize?.split("-")[1] || "20"}
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.numberOfPeople
                        ? "border-red-500"
                        : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
                  />
                  {errors.numberOfPeople && (
                    <p className="text-red-500 text-xs ml-1">
                      {errors.numberOfPeople}
                    </p>
                  )}
                </div>

                {/* Conditional Field for Trek + Camping */}
                {bookingType === "Trek + Camping" && (
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      Accommodation
                    </label>
                    <div className="flex items-center h-full px-5 py-3">
                      <input
                        type="checkbox"
                        name="needCoupleTent"
                        checked={formData.needCoupleTent}
                        onChange={handleChange}
                        className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <label className="ml-3 text-gray-700">
                        Need Couple Tent
                      </label>
                    </div>
                  </div>
                )}

                {/* Conditional Field for Trip */}
                {bookingType === "Trip" && (
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      Accommodation
                    </label>
                    <div className="flex items-center h-full px-5 py-3">
                      <input
                        type="checkbox"
                        name="needCouplePrivateRoom"
                        checked={formData.needCouplePrivateRoom}
                        onChange={handleChange}
                        className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <label className="ml-3 text-gray-700">
                        Need Couple/Private Room Accommodation
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Members Section */}
            {showAdditionalMembers && (
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-emerald-200">
                  <h3 className="text-xl font-bold text-gray-800">
                    Additional Members ({formData.additionalMembers.length}/
                    {requiredAdditionalMembers})
                  </h3>
                  {formData.additionalMembers.length <
                    requiredAdditionalMembers && (
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-all"
                    >
                      <Plus size={18} />
                      Add Member
                    </button>
                  )}
                </div>

                {errors.additionalMembers && (
                  <p className="text-red-500 text-sm mb-4">
                    {errors.additionalMembers}
                  </p>
                )}

                <div className="space-y-4">
                  {formData.additionalMembers.map((member, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(index)}
                        className="absolute top-4 right-4 text-red-500 hover:bg-red-100 p-2 rounded-full transition-all"
                      >
                        <Trash2 size={18} />
                      </button>

                      <h4 className="text-md font-semibold text-gray-700 mb-4">
                        Member {index + 2}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-gray-700 ml-1">
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) =>
                              handleMemberChange(index, "name", e.target.value)
                            }
                            placeholder="Member Name"
                            className={`w-full px-5 py-3 rounded-xl border ${
                              errors[`member_${index}_name`]
                                ? "border-red-500"
                                : "border-gray-200"
                            } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-white`}
                          />
                          {errors[`member_${index}_name`] && (
                            <p className="text-red-500 text-xs ml-1">
                              {errors[`member_${index}_name`]}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-gray-700 ml-1">
                            WhatsApp Number{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            value={member.whatsappNumber}
                            onChange={(e) =>
                              handleMemberChange(
                                index,
                                "whatsappNumber",
                                e.target.value,
                              )
                            }
                            placeholder="+91 98765 43210"
                            className={`w-full px-5 py-3 rounded-xl border ${
                              errors[`member_${index}_whatsapp`]
                                ? "border-red-500"
                                : "border-gray-200"
                            } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm hover:shadow-md transition-all bg-white`}
                          />
                          {errors[`member_${index}_whatsapp`] && (
                            <p className="text-red-500 text-xs ml-1">
                              {errors[`member_${index}_whatsapp`]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-emerald-500/30 transform transition-all duration-300 active:scale-[0.98]"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>

      <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
          
          /* Custom Scrollbar */
          .custom-scrollbar::-webkit-scrollbar {
            width: 10px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #059669, #047857);
            border-radius: 10px;
            border: 2px solid rgba(0, 0, 0, 0.1);
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #047857, #065f46);
          }
          
          /* Firefox */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #059669 rgba(0, 0, 0, 0.1);
          }
        `}</style>
    </div>
  );
};

export default BookNowModal;
