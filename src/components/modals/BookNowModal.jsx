import React, { useState, useMemo, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  MapPin,
  Mountain,
  Package,
  IndianRupee,
  Users,
  ChevronDown,
  Check,
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

const BookNowModal = ({ isOpen, onClose, trekData }) => {
  if (!isOpen) return null;

  // Determine booking type from trekData with fallback
  const bookingType =
    typeof trekData?.bookingType === "object"
      ? trekData.bookingType.name
      : trekData?.bookingType || "Trek";

  // Extract trek-specific data
  const baseFee = trekData?.feeDetails?.baseFee?.amount || 0;
  const totalFee = trekData?.feeDetails?.totalFee || baseFee;
  const gstPercent = trekData?.feeDetails?.gstPercent?.value || 0;
  const insuranceAmount = trekData?.feeDetails?.insurance?.amount || 0;
  const discountPercent = trekData?.feeDetails?.discount?.value || 0;

  // Extract info from trekInfo if top-level fields are empty (Double check in modal)
  const infoMap = {};
  trekData?.trekInfo?.forEach((item) => {
    infoMap[item.title?.toUpperCase()] = item.values || [];
  });

  const trekPickupPoints =
    (trekData?.pickup?.length ? trekData.pickup : infoMap["PICKUP"]) || [];
  const trekDropPoints =
    (trekData?.dropoff?.length ? trekData.dropoff : infoMap["DROPOFF"]) || [];
  const trekSuitableFor =
    (trekData?.suitableFor?.length
      ? trekData.suitableFor
      : infoMap["SUITABLE FOR"]) || [];
  const trekAccommodation =
    (trekData?.accommodation?.length
      ? trekData.accommodation
      : infoMap["ACCOMMODATION"]) || [];
  const trekTitle = trekData?.title || "";

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const startDate = trekData?.startDate || "";
  console.log(startDate);

  useEffect(() => {
    if (trekData?.startDate) {
      setFormData((prev) => ({
        ...prev,
        departureDate: formatDate(trekData.startDate),
      }));
    }
  }, [trekData]);

  // Available Add-ons for this trek
  const availableAddons = useMemo(() => {
    console.log("Checking addons:", trekData?.addons);
    if (
      trekData?.addons &&
      Array.isArray(trekData.addons) &&
      trekData.addons.length > 0
    ) {
      return trekData.addons.map((addon) => ({
        id: addon.id || addon._id,
        name: addon.name,
        price: addon.price,
        description: addon.description,
      }));
    }
    return [];
  }, [trekData]);

  useEffect(() => {
    if (availableAddons.length > 0) {
      setFormData((prev) => ({
        ...prev,
        addons: availableAddons, // auto select all
      }));
    }
  }, [availableAddons]);

  // Fallback to default logic if no addons in trekData
  //   const addons = [];
  //   if (bookingType === "Trek + Camping") {
  //     addons.push({ name: "Couple Tent", price: 500 });
  //   }
  //   if (bookingType === "Trip") {
  //     addons.push({ name: "Private Room", price: 1500 });
  //   }
  //   addons.push({ name: "Meals Package", price: 800 });
  //   addons.push({ name: "Photography Package", price: 1200 });
  //   return addons;
  // }, [bookingType, trekData]);

  // Build default addons (all selected by default since totalFee includes them)
  const defaultAddons = useMemo(() => {
    return availableAddons.map((a) => ({ name: a.name, price: a.price }));
  }, [availableAddons]);

  const [formData, setFormData] = useState({
    name: "",
    whatsappNumber: "",
    email: "",
    emergencyContactName: "",
    emergencyContact: "",
    departureDate: "",
    numberOfPeople: 1,
    pickupPoint: "",
    dropPoint: "",
    accommodation: "",
    suitableFor: "",
    needCoupleTent: false,
    needPrivateRoom: false,
    addons: [],
    additionalMembers: [],
  });

  const [errors, setErrors] = useState({});

  // --- Price Calculation ---
  const priceBreakdown = useMemo(() => {
    const numPeople = Number(formData.numberOfPeople) || 1;

    const baseTotal = totalFee * numPeople;

    // Total price of ALL available add-ons
    const allAddonsTotal = availableAddons.reduce(
      (sum, a) => sum + (a.price || 0) * numPeople,
      0,
    );

    // Price of currently selected add-ons
    const selectedAddonsTotal = formData.addons.reduce(
      (sum, a) => sum + (a.price || 0) * numPeople,
      0,
    );

    // Amount to subtract from the "full package" if items are deselected
    const deductions = allAddonsTotal - selectedAddonsTotal;

    const packageSubtotal = baseTotal;
    const subtotal = baseTotal + selectedAddonsTotal;

    const discountAmount =
      discountPercent > 0 ? Math.round((baseTotal * discountPercent) / 100) : 0;

    const grandTotal = subtotal - discountAmount;

    return {
      numPeople,
      baseTotal,
      allAddonsTotal,
      selectedAddonsTotal,
      deductions,
      packageSubtotal,
      subtotal,
      discountAmount,
      grandTotal,
    };
  }, [
    formData.numberOfPeople,
    formData.addons,
    availableAddons,
    totalFee,
    discountPercent,
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "numberOfPeople" && parseInt(value) <= 1) {
      setFormData((prev) => ({ ...prev, additionalMembers: [] }));
    }
  };

  // const handleAddonToggle = (addon) => {
  //   setFormData((prev) => {
  //     const exists = prev.addons.find((a) => a.name === addon.name);
  //     if (exists) {
  //       return {
  //         ...prev,
  //         addons: prev.addons.filter((a) => a.name !== addon.name),
  //       };
  //     } else {
  //       return {
  //         ...prev,
  //         addons: [...prev.addons, { name: addon.name, price: addon.price }],
  //       };
  //     }
  //   });
  // };

  const handleAddonToggle = (addon) => {
    setFormData((prev) => {
      const exists = prev.addons.some((a) => a.id === addon._id);

      if (exists) {
        return {
          ...prev,
          addons: prev.addons.filter((a) => a.id !== addon._id),
        };
      } else {
        return {
          ...prev,
          addons: [...prev.addons, addon], // ✅ keep full object
        };
      }
    });
  };

  const handleAddMember = () => {
    setFormData((prev) => ({
      ...prev,
      additionalMembers: [
        ...prev.additionalMembers,
        {
          fullName: "",
          whatsappNumber: "",
          contactNumber: "",
          email: "",
          pickupPoint: "",
          dropPoint: "",
          dob: "",
          gender: "",
          medicalHistory: "",
          bloodGroup: "",
        },
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
    const updatedMembers = [...formData.additionalMembers];
    updatedMembers[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      additionalMembers: updatedMembers,
    }));
  };

  const totalAmount = useMemo(() => {
    const people = Number(formData.numberOfPeople) || 1;

    // Base trek price (adjust key if needed)
    const basePrice = trekData?.price || 0;

    let total = basePrice * people;

    const addonsTotal = formData.addons.reduce((sum, addon) => {
      return sum + addon.price * people; // 🔥 multiply here
    }, 0);

    return total + addonsTotal;
  }, [formData.numberOfPeople, formData.addons, trekData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.whatsappNumber.trim())
      newErrors.whatsappNumber = "WhatsApp number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.pickupPoint)
      newErrors.pickupPoint = "Pickup point is required";

    if (!formData.dropPoint) newErrors.dropPoint = "Drop point is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    // if (!formData.alternativeContact.trim())
    //   newErrors.alternativeContact = "Alternative contact is required";
    if (!formData.emergencyContact.trim())
      newErrors.emergencyContact = "Emergency contact is required";
    if (!formData.departureDate)
      newErrors.departureDate = "Departure date is required";
    if (formData.numberOfPeople < 1)
      newErrors.numberOfPeople = "Must be at least 1 person";

    if (formData.numberOfPeople > 1) {
      const requiredMembers = formData.numberOfPeople - 1;
      if (formData.additionalMembers.length < requiredMembers) {
        newErrors.additionalMembers = `Please add ${requiredMembers} additional member(s)`;
      } else {
        formData.additionalMembers.forEach((member, index) => {
          if (!member.fullName?.trim()) {
            newErrors[`member_${index}_fullName`] = "Member name is required";
          }
          if (!member.whatsappNumber?.trim()) {
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
      const formattedAdditionalMembers = formData.additionalMembers.map(
        (member) => ({
          fullName: member.fullName || "",
          whatsappNumber: member.whatsappNumber,
          contactNumber: member.contactNumber || member.whatsappNumber,
          email: member.email,
          pickupPoint: member.pickupPoint ? [member.pickupPoint] : [],
          dropPoint: member.dropPoint ? [member.dropPoint] : [],
          dob: member.dob,
          gender: member.gender,
          medicalHistory: member.medicalHistory,
          bloodGroup: member.bloodGroup,
        }),
      );

      const bookingData = {
        trekId: trekData?._id,
        name: formData.name,
        whatsappNumber: formData.whatsappNumber,
        email: formData.email,
        dob: formData.dob,
        gender: formData.gender,
        pickupPoint: formData.pickupPoint ? [formData.pickupPoint] : [],
        dropPoint: formData.dropPoint ? [formData.dropPoint] : [],
        bloodGroup: formData.bloodGroup,
        medicalHistory: formData.medicalHistory,
        alternativeContact: formData.alternativeContact,
        emergencyContactName: formData.emergencyContactName,
        emergencyContact: formData.emergencyContact,
        departureDate: formData.departureDate,
        numberOfPeople: Number(formData.numberOfPeople),
        accommodation: formData.accommodation,
        suitableFor: formData.suitableFor,
        needCoupleTent: formData.needCoupleTent,
        needPrivateRoom: formData.needPrivateRoom || false,
        addons: formData.addons || [],
        additionalMembers: formattedAdditionalMembers,
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/bookings`,
        bookingData,
      );
      alert("Booking submitted successfully");
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genders = ["Male", "Female", "Other"];
  const showAdditionalMembers = formData.numberOfPeople > 1;
  const requiredAdditionalMembers = formData.numberOfPeople - 1;

  // Shared input className
  const inputCls = (hasError) =>
    `w-full px-4 py-3 rounded-xl border text-gray-800 text-sm ${
      hasError ? "border-red-400 bg-red-50/50" : "border-gray-200"
    } focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 shadow-sm hover:shadow-md transition-all bg-gray-50/80 focus:bg-white`;

  const selectCls = (hasError) =>
    `${inputCls(hasError)} appearance-none cursor-pointer`;

  const labelCls =
    "text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block";

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col animate-fadeIn z-[10000]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-all z-20"
          >
            <X size={22} />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto custom-scrollbar flex-1">
            {/* Trek Info Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-8 rounded-t-3xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest">
                    Booking For
                  </p>
                  <h2 className="text-xl font-bold text-white leading-tight">
                    {trekTitle}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold text-white">
                  {bookingType}
                </span>
                {totalFee > 0 && (
                  <span className="inline-flex items-center gap-1.5 bg-emerald-400/20 backdrop-blur-sm border border-emerald-300/30 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-200">
                    <IndianRupee className="w-3 h-3" />
                    {totalFee.toLocaleString()} / person
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="inline-flex items-center gap-1.5 bg-yellow-400/20 backdrop-blur-sm border border-yellow-300/30 px-3 py-1.5 rounded-full text-xs font-bold text-yellow-200">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* ══════ SECTION: Personal Details ══════ */}
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Personal Details
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className={labelCls}>
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={inputCls(errors.name)}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className={labelCls}>
                        WhatsApp Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        placeholder="Enter your WhatsApp number"
                        className={inputCls(errors.whatsappNumber)}
                      />
                      {errors.whatsappNumber && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.whatsappNumber}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className={labelCls}>
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className={inputCls(errors.email)}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* DOB */}
                    <div>
                      <label className={labelCls}>
                        Date of Birth <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={inputCls(errors.dob)}
                      />
                      {errors.dob && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.dob}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className={labelCls}>
                        Gender <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={selectCls(errors.gender)}
                      >
                        <option value="">Select Gender</option>
                        {genders.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.gender}
                        </p>
                      )}
                    </div>

                    {/* Blood Group */}
                    <div>
                      <label className={labelCls}>
                        Blood Group <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className={selectCls(errors.bloodGroup)}
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                      {errors.bloodGroup && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.bloodGroup}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ══════ SECTION: Pickup, Drop & Accommodation ══════ */}
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Logistics & Preferences
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Pickup */}
                    <div className="space-y-4">
                      <label className={labelCls}>
                        Pickup Point <span className="text-red-400">*</span>
                      </label>
                      <div className="grid gap-2">
                        {trekPickupPoints.length > 0 ? (
                          trekPickupPoints.map((point, i) => (
                            <label
                              key={i}
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.pickupPoint === point ? "border-blue-500 bg-blue-50" : "border-gray-100 bg-gray-50/30 hover:bg-gray-50"}`}
                            >
                              <input
                                type="radio"
                                name="pickupPoint"
                                value={point}
                                checked={formData.pickupPoint === point}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">
                                {point}
                              </span>
                            </label>
                          ))
                        ) : (
                          <input
                            type="text"
                            name="pickupPoint"
                            value={formData.pickupPoint}
                            onChange={handleChange}
                            placeholder="Enter pickup location"
                            className={inputCls(errors.pickupPoint)}
                          />
                        )}
                      </div>
                      {errors.pickupPoint && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.pickupPoint}
                        </p>
                      )}
                    </div>

                    {/* Drop */}
                    <div className="space-y-4">
                      <label className={labelCls}>
                        Drop Point <span className="text-red-400">*</span>
                      </label>
                      <div className="grid gap-2">
                        {trekDropPoints.length > 0 ? (
                          trekDropPoints.map((point, i) => (
                            <label
                              key={i}
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.dropPoint === point ? "border-emerald-500 bg-emerald-50" : "border-gray-100 bg-gray-50/30 hover:bg-gray-50"}`}
                            >
                              <input
                                type="radio"
                                name="dropPoint"
                                value={point}
                                checked={formData.dropPoint === point}
                                onChange={handleChange}
                                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                              />
                              <span className="text-sm text-gray-700">
                                {point}
                              </span>
                            </label>
                          ))
                        ) : (
                          <input
                            type="text"
                            name="dropPoint"
                            value={formData.dropPoint}
                            onChange={handleChange}
                            placeholder="Enter drop location"
                            className={inputCls(errors.dropPoint)}
                          />
                        )}
                      </div>
                      {errors.dropPoint && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.dropPoint}
                        </p>
                      )}
                    </div>

                    {/* Accommodation */}
                    {/* {trekAccommodation.length > 0 && (
                      <div className="space-y-4">
                        <label className={labelCls}>Stay Preference <span className="text-red-400">*</span></label>
                        <div className="grid gap-2">
                          {trekAccommodation.map((stay, i) => (
                            <label key={i} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.accommodation === stay ? "border-indigo-500 bg-indigo-50" : "border-gray-100 bg-gray-50/30 hover:bg-gray-50"}`}>
                              <input type="radio" name="accommodation" value={stay} checked={formData.accommodation === stay} onChange={handleChange} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                              <span className="text-sm text-gray-700">{stay}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )} */}

                    {/* Suitable For */}
                    {/* {trekSuitableFor.length > 0 && (
                      <div className="space-y-4">
                        <label className={labelCls}>Expedition Level <span className="text-red-400">*</span></label>
                        <div className="grid gap-2">
                          {trekSuitableFor.map((level, i) => (
                            <label key={i} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.suitableFor === level ? "border-amber-500 bg-amber-50" : "border-gray-100 bg-gray-50/30 hover:bg-gray-50"}`}>
                              <input type="radio" name="suitableFor" value={level} checked={formData.suitableFor === level} onChange={handleChange} className="w-4 h-4 text-amber-600 focus:ring-amber-500" />
                              <span className="text-sm text-gray-700">{level}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>

                {/* ══════ SECTION: Medical Info ══════ */}
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-rose-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Medical Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className={labelCls}>Medical History</label>
                      <textarea
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        placeholder="Any allergies, conditions, or medications..."
                        rows="3"
                        className={inputCls(false)}
                      />
                    </div>
                  </div>
                </div>

                {/* ══════ SECTION: Emergency Contacts ══════ */}
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Emergency Contacts
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Emergency Contact Name</label>
                      <input
                        type="text"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        placeholder="Contact person name"
                        className={inputCls(false)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>
                        Emergency Contact Number{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        placeholder="Emergency contact number"
                        className={inputCls(errors.emergencyContact)}
                      />
                      {errors.emergencyContact && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.emergencyContact}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelCls}>
                        Alternative Contact Number (Optional)
                        {/* <span className="text-red-400">*</span> */}
                      </label>
                      <input
                        type="tel"
                        name="alternativeContact"
                        value={formData.alternativeContact}
                        onChange={handleChange}
                        placeholder="Alternative contact number"
                        className={inputCls(errors.alternativeContact)}
                      />
                      {/* {errors.alternativeContact && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.alternativeContact}
                        </p>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* ══════ SECTION: Booking Details ══════ */}
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Booking Details
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>
                        Departure Date <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        min={startDate}
                        className={inputCls(errors.departureDate)}
                      />
                      {errors.departureDate && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.departureDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelCls}>
                        Number of People <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="number"
                        name="numberOfPeople"
                        value={formData.numberOfPeople}
                        onChange={handleChange}
                        min="1"
                        max={trekData?.groupSize?.split("-")[1] || "20"}
                        className={inputCls(errors.numberOfPeople)}
                      />
                      {errors.numberOfPeople && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors.numberOfPeople}
                        </p>
                      )}
                    </div>

                    {/* Accommodation Checkboxes */}
                    {bookingType === "Trek + Camping" && (
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                          <input
                            type="checkbox"
                            name="needCoupleTent"
                            checked={formData.needCoupleTent}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Need Couple Tent
                          </span>
                        </label>
                      </div>
                    )}

                    {bookingType === "Trip" && (
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                          <input
                            type="checkbox"
                            name="needPrivateRoom"
                            checked={formData.needPrivateRoom}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Need Couple/Private Room Accommodation
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* ══════ SECTION: Add-ons ══════ */}
                {availableAddons.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2.5 mb-5">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Package className="w-4 h-4 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Add-ons
                      </h3>
                      <span className="text-xs text-gray-400 font-medium ml-auto">
                        Select to enhance your experience
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableAddons.map((addon, i) => {
                        const isSelected = formData.addons.some(
                          (a) => a.id === addon.id,
                        );
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            onClick={() => handleAddonToggle(addon)}
                            className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left group
                              ${
                                isSelected
                                  ? "border-purple-400 bg-purple-50 shadow-md shadow-purple-100"
                                  : "border-gray-200 bg-white hover:border-purple-200 hover:shadow-sm"
                              }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                              ${isSelected ? "bg-purple-500" : "bg-gray-100 group-hover:bg-purple-100"}`}
                            >
                              {isSelected ? (
                                <Check className="w-4 h-4 text-white" />
                              ) : (
                                <Plus className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-semibold ${isSelected ? "text-purple-700" : "text-gray-700"}`}
                              >
                                {addon.name}
                              </p>
                            </div>
                            <span
                              className={`text-sm font-bold whitespace-nowrap ${isSelected ? "text-purple-600" : "text-gray-500"}`}
                            >
                              + ₹{addon.price} × {formData.numberOfPeople} = ₹
                              {(
                                addon.price * (formData.numberOfPeople || 1)
                              ).toLocaleString()}
                            </span>
                            <p className="text-xs text-gray-400">
                              {addon.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ══════ SECTION: Additional Members ══════ */}
                {showAdditionalMembers && (
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                          <Users className="w-4 h-4 text-teal-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">
                          Additional Members
                          <span className="text-sm font-normal text-gray-400 ml-2">
                            ({formData.additionalMembers.length}/
                            {requiredAdditionalMembers})
                          </span>
                        </h3>
                      </div>
                      {formData.additionalMembers.length <
                        requiredAdditionalMembers && (
                        <button
                          type="button"
                          onClick={handleAddMember}
                          className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-xl hover:bg-teal-100 transition-all text-sm font-semibold"
                        >
                          <Plus size={16} />
                          Add Member
                        </button>
                      )}
                    </div>

                    {errors.additionalMembers && (
                      <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-xl">
                        {errors.additionalMembers}
                      </p>
                    )}

                    <div className="space-y-4">
                      {formData.additionalMembers.map((member, index) => (
                        <div
                          key={index}
                          className="p-5 bg-gray-50/80 rounded-2xl border border-gray-200 relative"
                        >
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(index)}
                            className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>

                          <h4 className="text-sm font-bold text-gray-600 mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold">
                              {index + 2}
                            </span>
                            Member {index + 2}
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className={labelCls}>
                                Full Name{" "}
                                <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                value={member.fullName || ""}
                                placeholder="Full Name"
                                onChange={(e) =>
                                  handleMemberChange(
                                    index,
                                    "fullName",
                                    e.target.value,
                                  )
                                }
                                className={inputCls(
                                  errors[`member_${index}_fullName`],
                                )}
                              />
                              {errors[`member_${index}_fullName`] && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors[`member_${index}_fullName`]}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className={labelCls}>
                                WhatsApp Number{" "}
                                <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="tel"
                                value={member.whatsappNumber || ""}
                                placeholder="+91 98765 43210"
                                onChange={(e) =>
                                  handleMemberChange(
                                    index,
                                    "whatsappNumber",
                                    e.target.value,
                                  )
                                }
                                className={inputCls(
                                  errors[`member_${index}_whatsapp`],
                                )}
                              />
                              {errors[`member_${index}_whatsapp`] && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors[`member_${index}_whatsapp`]}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className={labelCls}>Contact Number</label>
                              <input
                                type="tel"
                                value={member.contactNumber || ""}
                                placeholder="Contact Number"
                                onChange={(e) =>
                                  handleMemberChange(
                                    index,
                                    "contactNumber",
                                    e.target.value,
                                  )
                                }
                                className={inputCls(false)}
                              />
                            </div>

                            <div>
                              <label className={labelCls}>Email</label>
                              <input
                                type="email"
                                value={member.email || ""}
                                placeholder="Email Address"
                                onChange={(e) =>
                                  handleMemberChange(
                                    index,
                                    "email",
                                    e.target.value,
                                  )
                                }
                                className={inputCls(false)}
                              />
                            </div>

                            {/* Member Pickup */}
                            <div>
                              <label className={labelCls}>Pickup Point</label>
                              {trekPickupPoints.length > 0 ? (
                                <select
                                  value={member.pickupPoint || ""}
                                  onChange={(e) =>
                                    handleMemberChange(
                                      index,
                                      "pickupPoint",
                                      e.target.value,
                                    )
                                  }
                                  className={selectCls(false)}
                                >
                                  <option value="">Select Pickup</option>
                                  {trekPickupPoints.map((p, pi) => (
                                    <option key={pi} value={p}>
                                      {p}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  value={member.pickupPoint || ""}
                                  placeholder="Pickup Point"
                                  onChange={(e) =>
                                    handleMemberChange(
                                      index,
                                      "pickupPoint",
                                      e.target.value,
                                    )
                                  }
                                  className={inputCls(false)}
                                />
                              )}
                            </div>

                            {/* Member Drop */}
                            <div>
                              <label className={labelCls}>Drop Point</label>
                              {trekDropPoints.length > 0 ? (
                                <select
                                  value={member.dropPoint || ""}
                                  onChange={(e) =>
                                    handleMemberChange(
                                      index,
                                      "dropPoint",
                                      e.target.value,
                                    )
                                  }
                                  className={selectCls(false)}
                                >
                                  <option value="">Select Drop</option>
                                  {trekDropPoints.map((p, pi) => (
                                    <option key={pi} value={p}>
                                      {p}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  value={member.dropPoint || ""}
                                  placeholder="Drop Point"
                                  onChange={(e) =>
                                    handleMemberChange(
                                      index,
                                      "dropPoint",
                                      e.target.value,
                                    )
                                  }
                                  className={inputCls(false)}
                                />
                              )}
                            </div>

                            <div>
                              <label className={labelCls}>Date of Birth</label>
                              <input
                                type="date"
                                value={member.dob || ""}
                                onChange={(e) =>
                                  handleMemberChange(
                                    index,
                                    "dob",
                                    e.target.value,
                                  )
                                }
                                className={inputCls(false)}
                              />
                            </div>

                            <div>
                              <label className={labelCls}>Gender</label>
                              <select
                                value={member.gender || ""}
                                onChange={(e) =>
                                  handleMemberChange(
                                    index,
                                    "gender",
                                    e.target.value,
                                  )
                                }
                                className={selectCls(false)}
                              >
                                <option value="">Select Gender</option>
                                {genders.map((g) => (
                                  <option key={g} value={g}>
                                    {g}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className={labelCls}>
                                Medical History
                              </label>
                              <input
                                type="text"
                                value={member.medicalHistory || ""}
                                placeholder="Medical History (if any)"
                                onChange={(e) =>
                                  handleMemberChange(
                                    index,
                                    "medicalHistory",
                                    e.target.value,
                                  )
                                }
                                className={inputCls(false)}
                              />
                            </div>

                            <div>
                              <label className={labelCls}>Blood Group</label>
                              <select
                                value={member.bloodGroup || ""}
                                onChange={(e) =>
                                  handleMemberChange(
                                    index,
                                    "bloodGroup",
                                    e.target.value,
                                  )
                                }
                                className={selectCls(false)}
                              >
                                <option value="">Select Blood Group</option>
                                {bloodGroups.map((g) => (
                                  <option key={g} value={g}>
                                    {g}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ══════ PRICE BREAKDOWN ══════ */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <IndianRupee className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Price Summary
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Base Trek Price</span>
                      <span className="font-semibold text-gray-800">
                        ₹{priceBreakdown.baseTotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        Full Package Add-ons
                      </span>
                      <span className="font-semibold text-gray-800">
                        + ₹{priceBreakdown.allAddonsTotal.toLocaleString()}
                      </span>
                    </div>

                    {priceBreakdown.deductions > 0 && (
                      <div className="flex justify-between items-center text-sm p-2 bg-red-50 rounded-lg border border-red-100 italic">
                        <span className="text-red-600 flex items-center gap-2">
                          <Trash2 size={12} />
                          Deductions (Unselected Items)
                        </span>
                        <span className="font-bold text-red-600">
                          - ₹{priceBreakdown.deductions.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                        <span>Subtotal</span>
                        <span>₹{priceBreakdown.subtotal.toLocaleString()}</span>
                      </div>
                    </div>

                    {priceBreakdown.discountAmount > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-emerald-600 font-medium">
                          Coupon Discount ({discountPercent}%)
                        </span>
                        <span className="font-semibold text-emerald-600">
                          - ₹{priceBreakdown.discountAmount.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300">
                      <div>
                        <span className="text-base font-bold text-gray-900 block leading-tight">
                          Total Amount
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          Inclusive of all selected taxes
                        </span>
                      </div>
                      <span className="text-2xl font-black text-blue-700">
                        ₹{priceBreakdown.grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform transition-all duration-300 active:scale-[0.98] text-base"
                >
                  Confirm Booking — ₹
                  {priceBreakdown.grandTotal.toLocaleString()}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #6366f1);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb, #4f46e5);
          background-clip: padding-box;
        }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #3b82f6 transparent; }
      `}</style>
    </div>
  );
};

export default BookNowModal;
