import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

const BookNowModal = ({ isOpen, onClose, trekData }) => {
  if (!isOpen) return null;

  // Determine booking type from trekData with fallback
  const bookingType = trekData?.bookingType; // Default to "Trek" if not provided

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

  if (!validateForm()) return;

  try {
    const bookingData = {
      trekId: trekData?._id,
      slots: trekData?.slotId, // make sure this exists
      name: formData.name,
      whatsappNumber: formData.whatsappNumber,
      email: formData.email,
      pickupPoint: formData.pickupPoint,
      dob: formData.dob,
      gender: formData.gender,
      medicalHistory: formData.medicalHistory,
      bloodGroup: formData.bloodGroup,
      alternativeContact: formData.alternativeContact,
      emergencyContact: formData.emergencyContact,
      departureDate: formData.departureDate,
      bookingType: bookingType,
      needPrivateRoom: formData.needCouplePrivateRoom || false,
      numberOfPeople: formData.numberOfPeople,
      additionalMembers: formData.additionalMembers,
    };

    const response = await axios.post(
      `${API_BASE_URL}/api/bookings`,
      bookingData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("Booking submitted successfully!");
    onClose();

  } catch (error) {
    console.error("Booking Error:", error);

    const message =
      error.response?.data?.message || "Something went wrong";

    alert(message);
  }
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     return;
  //   }

  //   // Prepare data for API
  //   const bookingData = {
  //     ...formData,
  //     bookingType,
  //     trekId: trekData?._id,
  //   };

  //   console.log("Booking Data:", bookingData);

  //   // Close modal on success
  //   alert("Booking submitted successfully!");
  //   onClose();
  // };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genders = ["Male", "Female", "Other"];

  // Calculate if we need to show additional member fields
  const showAdditionalMembers = formData.numberOfPeople > 1;
  const requiredAdditionalMembers = formData.numberOfPeople - 1;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Center container with padding */}
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col animate-fadeIn  z-[10000]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-all z-20"
          >
            <X size={24} />
          </button>

 <div className="overflow-y-auto custom-scrollbar p-6 md:p-10 flex-1">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-2 text-center">
              Book Your Adventure
            </h2>
            <p className="text-center text-gray-500 mb-3">
              Fill in your details below to secure your spot
            </p>

            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-gray-600">
                  Booking Type:
                </span>
                <span className="text-sm font-bold text-blue-700">
                  {bookingType}
                </span>
              </div>
            </div>
          </div>
         

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Details Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200">
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
                    placeholder="Enter your full name"
                    className={`w-full px-5 py-3 rounded-xl border text-black ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
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
                    placeholder="Enter your WhatsApp number"
                    className={`w-full px-5 py-3 rounded-xl border text-black ${
                      errors.whatsappNumber
                        ? "border-red-500"
                        : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
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
                    placeholder="Enter your email address"
                    className={`w-full px-5 py-3 rounded-xl border text-black ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
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
                    placeholder="Enter your pickup location"
                    className={`w-full px-5 py-3 rounded-xl border  text-black ${
                      errors.pickupPoint ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
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
                    className={`w-full px-5 py-3 rounded-xl border text-black ${
                      errors.dob ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
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
                    className={`w-full px-5 py-3 rounded-xl border text-black ${
                      errors.gender ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white appearance-none`}
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
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200">
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
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white"
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
                    className={`w-full px-5 py-3 rounded-xl border  text-black ${
                      errors.bloodGroup ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white appearance-none`}
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
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200">
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
                    placeholder="Enter an alternative contact number"
                    className={`w-full px-5 py-3 rounded-xl border text-black ${
                      errors.alternativeContact
                        ? "border-red-500"
                        : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
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
                    placeholder="Enter an emergency contact number"
                    className={`w-full px-5 py-3 rounded-xl border ${
                      errors.emergencyContact
                        ? "border-red-500"
                        : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm hover:shadow-md text-black transition-all bg-gray-50 focus:bg-white`}
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
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm text-black hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
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
                    } focus:outline-none focus:ring-2 text-black focus:ring-blue-500/50 shadow-sm hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
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
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm text-black hover:shadow-md transition-all bg-gray-50 focus:bg-white`}
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
                        className="w-5 h-5 text-blue-800 border-gray-300 rounded focus:ring-blue-500"
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
                        className="w-5 h-5 text-blue-800 border-gray-300 rounded focus:ring-blue-500"
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
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-800">
                    Additional Members ({formData.additionalMembers.length}/
                    {requiredAdditionalMembers})
                  </h3>
                  {formData.additionalMembers.length <
                    requiredAdditionalMembers && (
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
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
                            className={`w-full px-5 py-3 rounded-xl border text-black ${
                              errors[`member_${index}_name`]
                                ? "border-red-500"
                                : "border-gray-200"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm hover:shadow-md transition-all bg-white`}
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
                            } focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-black shadow-sm hover:shadow-md transition-all bg-white`}
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
              className="w-full bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transform transition-all duration-300 active:scale-[0.98]"
            >
              Confirm Booking
            </button>
          </form>
        </div>
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
