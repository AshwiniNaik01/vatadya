import React, { useState } from "react";
import {
    Calendar, User, Users, MapPin, Activity, Heart,
    ChevronRight, ChevronLeft, CheckCircle, CreditCard, Tent, Plus, Minus,
    Mountain, Compass, Mail, Phone, Droplet, FileText, Home
} from "lucide-react";

const BookingWizard = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        trekId: "dummy_id", // In real app, this would be selected or passed
        trekName: "",
        bookingType: "Trek",
        departureDate: "20/10/2026",
        numberOfPeople: 1,
        name: "",
        email: "",
        whatsappNumber: "",
        gender: "",
        dob: "",
        pickupPoint: "",
        bloodGroup: "",
        medicalHistory: "None",
        emergencyContact: "",
        alternativeContact: "",
        needCoupleTent: false,
        needPrivateRoom: false,
        additionalMembers: [],
    });

    const treks = ["Kedarkantha", "Har Ki Dun", "Valley of Flowers", "Triund", "Brahmatal", "Hampta Pass"];
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };




    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const StepIndicator = () => (
        <div className="flex items-center justify-center mb-3">
            {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step === currentStep
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-110"
                            : step < currentStep
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-gray-100 text-gray-400"
                            }`}
                    >
                        {step < currentStep ? <CheckCircle size={20} /> : step}
                    </div>
                    {step < 5 && (
                        <div className={`w-12 md:w-20 h-1 mx-2 transition-all duration-300 ${step < currentStep ? "bg-emerald-500" : "bg-gray-200"
                            }`} />
                    )}
                </div>
            ))}
        </div>
    );

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="animate-in slide-in-from-right fade-in duration-300">
                        <h3 className="text-xl font-bold text-gray-800 mb-1 py-5 flex items-center gap-2">
                            <Calendar className="text-emerald-500" /> Trip Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Select Trek</label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-emerald-50 text-emerald-600">
                                        <Mountain size={18} />
                                    </div>
                                    <select
                                        name="trekName"
                                        value={formData.trekName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                        required
                                    >
                                        <option value="">Select a Trek</option>
                                        {treks.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Booking Type</label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-blue-50 text-blue-600">
                                        <Compass size={18} />
                                    </div>
                                    <select
                                        name="bookingType"
                                        value={formData.bookingType}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                    >
                                        {["Trek", "Trek + Camping", "Trip"].map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Departure Date</label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-orange-50 text-orange-600">
                                        <Calendar size={18} />
                                    </div>
                                    <input
                                        type="date"
                                        name="departureDate"
                                        value={formData.departureDate}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Number of People</label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-purple-50 text-purple-600">
                                        <Users size={18} />
                                    </div>
                                    <input
                                        type="number"
                                        min="1"
                                        name="numberOfPeople"
                                        value={formData.numberOfPeople}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Pick Up Point </label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-red-50 text-red-600">
                                        <MapPin size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="pickupPoint"
                                        placeholder="e.g., Dehradun ISBT"
                                        value={formData.pickupPoint}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="animate-in slide-in-from-right fade-in duration-300">
                        <h3 className="text-xl font-bold text-gray-800 mb-1 py-5 flex items-center gap-2">
                            <User className="text-emerald-500" /> Personal Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-indigo-50 text-indigo-600">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Email</label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-sky-50 text-sky-600">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">WhatsApp Number</label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-green-50 text-green-600">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        type="tel"
                                        name="whatsappNumber"
                                        placeholder="+91 9876543210"
                                        value={formData.whatsappNumber}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Gender</label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-pink-50 text-pink-600">
                                        <User size={18} />
                                    </div>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                    >
                                        <option value="">Select Gender</option>
                                        {["Male", "Female", "Other"].map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-amber-50 text-amber-600">
                                        <Calendar size={18} />
                                    </div>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="animate-in slide-in-from-right fade-in duration-300">
                        <h3 className="text-xl font-bold text-gray-800 mb-1 py-5 flex items-center gap-2">
                            <Activity className="text-emerald-500" /> Health & Contact
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="pickupPoint"
                                        placeholder="e.g., Dehradun ISBT"
                                        value={formData.pickupPoint}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition bg-gray-50/50"
                                    />
                                </div>
                            </div> */}



                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Blood Group</label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-rose-50 text-rose-600">
                                        <Droplet size={18} />
                                    </div>
                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                    >
                                        <option value="">Select Blood Group</option>
                                        {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                    </select>
                                </div>
                            </div>


                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Emergency Contact</label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-red-100 text-red-600">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        type="tel"
                                        name="emergencyContact"
                                        placeholder="Parent/Guardian Phone"
                                        value={formData.emergencyContact}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                    />
                                </div>
                            </div>

                            {/* <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Emergency Contact</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="tel"
                                        name="emergencyContact"
                                        placeholder="Parent/Guardian Phone"
                                        value={formData.emergencyContact}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition bg-gray-50/50"
                                    />
                                </div>
                            </div> */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Alternative Contact</label>
                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 border-r border-gray-200 bg-teal-50 text-teal-600">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        type="tel"
                                        name="alternativeContact"
                                        placeholder="Another Friend/Family"
                                        value={formData.alternativeContact}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Medical History (if any)</label>
                                <div className="flex w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                    <div className="px-3 py-3 pt-5 border-r border-gray-200 bg-cyan-50 text-cyan-600 flex items-start">
                                        <FileText size={18} />
                                    </div>
                                    <textarea
                                        name="medicalHistory"
                                        rows="2"
                                        placeholder="None"
                                        value={formData.medicalHistory}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none border-none bg-transparent resize-none"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="animate-in slide-in-from-right fade-in duration-300">
                        <h3 className="text-xl font-bold text-gray-800 mb-1 py-5 flex items-center gap-2">
                            <Tent className="text-emerald-500" /> Additional Services
                        </h3>

                        <div className="space-y-4 mb-8">
                            {/* Service 1: Couple Tent */}
                            <label className={`relative flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 ${formData.needCoupleTent ? "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-emerald-200 bg-white hover:bg-gray-50"}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${formData.needCoupleTent ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
                                        <Tent size={24} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-lg ${formData.needCoupleTent ? "text-emerald-900" : "text-gray-700"}`}>Couple Tent</h4>
                                        <p className="text-sm text-gray-500">Private tent for two people</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">₹1000</span>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.needCoupleTent ? "border-emerald-500 bg-emerald-500 text-white" : "border-gray-300"}`}>
                                        {formData.needCoupleTent && <CheckCircle size={14} />}
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    name="needCoupleTent"
                                    checked={formData.needCoupleTent}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                            </label>

                            {/* Service 2: Private Room */}
                            <label className={`relative flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 ${formData.needPrivateRoom ? "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-emerald-200 bg-white hover:bg-gray-50"}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${formData.needPrivateRoom ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
                                        <Home size={24} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-lg ${formData.needPrivateRoom ? "text-emerald-900" : "text-gray-700"}`}>Private Room</h4>
                                        <p className="text-sm text-gray-500">Comfortable room at Base Camp</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">₹2500</span>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.needPrivateRoom ? "border-emerald-500 bg-emerald-500 text-white" : "border-gray-300"}`}>
                                        {formData.needPrivateRoom && <CheckCircle size={14} />}
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    name="needPrivateRoom"
                                    checked={formData.needPrivateRoom}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Explicit Add Button section logic */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                    <Users size={18} /> Additional Members ({formData.numberOfPeople - 1})
                                </h4>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData(prev => ({
                                            ...prev,
                                            numberOfPeople: prev.numberOfPeople + 1,
                                            additionalMembers: [...prev.additionalMembers, { name: "", whatsappNumber: "" }]
                                        }));
                                    }}
                                    className="text-sm flex items-center gap-1 text-amber-700 font-semibold hover:text-amber-800 bg-amber-50 px-3 py-2 rounded-lg hover:bg-amber-100 transition"

                                >
                                    <Plus size={16} /> Add Member
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Ensure array matches numberOfPeople - 1 */}
                                {Array.from({ length: Math.max(0, formData.numberOfPeople - 1) }).map((_, index) => (
                                    <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative group animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="absolute top-2 right-2 text-xs font-bold text-gray-300 group-hover:text-emerald-500 transition">
                                            #{index + 1}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</label>
                                                <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                                    <div className="px-3 py-3 border-r border-gray-200 bg-indigo-50 text-indigo-600">
                                                        <User size={16} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Member Name"
                                                        value={formData.additionalMembers[index]?.name || ""}
                                                        onChange={(e) => {
                                                            const newMembers = [...formData.additionalMembers];
                                                            // Ensure array is populated up to this index
                                                            while (newMembers.length <= index) newMembers.push({ name: "", whatsappNumber: "" });
                                                            newMembers[index].name = e.target.value;
                                                            setFormData(prev => ({ ...prev, additionalMembers: newMembers }));
                                                        }}
                                                        className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="space-y-1 flex-1">
                                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">WhatsApp</label>
                                                    <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition bg-white">
                                                        <div className="px-3 py-3 border-r border-gray-200 bg-green-50 text-green-600">
                                                            <Phone size={16} />
                                                        </div>
                                                        <input
                                                            type="tel"
                                                            placeholder="WhatsApp Number"
                                                            value={formData.additionalMembers[index]?.whatsappNumber || ""}
                                                            onChange={(e) => {
                                                                const newMembers = [...formData.additionalMembers];
                                                                while (newMembers.length <= index) newMembers.push({ name: "", whatsappNumber: "" });
                                                                newMembers[index].whatsappNumber = e.target.value;
                                                                setFormData(prev => ({ ...prev, additionalMembers: newMembers }));
                                                            }}
                                                            className="w-full px-3 py-2 outline-none border-none bg-transparent"
                                                        />
                                                    </div>
                                                </div>
                                                {/* Small - Button to remove this member */}
                                                <button
                                                    type="button"
                                                    title="Remove this member"
                                                    onClick={() => {
                                                        setFormData(prev => {
                                                            const newMembers = [...prev.additionalMembers];
                                                            newMembers.splice(index, 1);
                                                            return {
                                                                ...prev,
                                                                numberOfPeople: Math.max(1, prev.numberOfPeople - 1),
                                                                additionalMembers: newMembers
                                                            };
                                                        });
                                                    }}
                                                    className="mt-5 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition shadow-sm"
                                                >
                                                    <Minus size={18} />
                                                </button>

                                                {/* Small + Button at the end of input to add next member */}
                                                {/* <button
                                                    type="button"
                                                    title="Add another member"
                                                    onClick={() => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            numberOfPeople: prev.numberOfPeople + 1,
                                                            additionalMembers: [...prev.additionalMembers, { name: "", whatsappNumber: "" }]
                                                        }));
                                                    }}
                                                    className="mt-5 p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition shadow-sm"
                                                >
                                                    <Plus size={18} />
                                                </button> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="animate-in slide-in-from-right fade-in duration-300">
                        <div className="text-center mb-8">

                            <h3 className="text-2xl py-2 font-bold text-gray-800">Review & Pay</h3>
                            <p className="text-gray-500">Please review your booking details before proceeding.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Left Col: Trip Summary */}
                            <div className="md:col-span-2 space-y-6">
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

                                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                                        <Mountain className="text-emerald-600" size={20} /> Trip Details
                                    </h4>

                                    <div className="space-y-4 relative z-10">
                                        <div className="flex flex-col sm:flex-row justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Trek Name</p>
                                                <p className="font-bold text-gray-800 text-lg">{formData.trekName || "Not Selected"}</p>
                                            </div>
                                            <div className="mt-3 sm:mt-0 text-left sm:text-right">
                                                <p className="text-sm text-gray-500 mb-1">Reference ID</p>
                                                <p className="font-mono text-gray-600">TRK-{Math.floor(Math.random() * 10000)}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
                                                <p className="text-xs text-blue-600 font-semibold mb-1 flex items-center gap-1"><Calendar size={12} /> Date</p>
                                                <p className="font-semibold text-gray-700 text-sm">
                                                    {formData.departureDate
                                                        ? (formData.departureDate)
                                                        : "27/10/2026"}
                                                </p>

                                            </div>
                                            <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100/50">
                                                <p className="text-xs text-purple-600 font-semibold mb-1 flex items-center gap-1"><Users size={12} /> Guests</p>
                                                <p className="font-semibold text-gray-700 text-sm">{formData.numberOfPeople} Person(s)</p>
                                            </div>
                                            <div className="p-3 bg-orange-50/50 rounded-lg border border-orange-100/50">
                                                <p className="text-xs text-orange-600 font-semibold mb-1 flex items-center gap-1"><Tent size={12} /> Type</p>
                                                <p className="font-semibold text-gray-700 text-sm">{formData.bookingType}</p>
                                            </div>
                                            <div className="p-3 bg-red-50/50 rounded-lg border border-red-100/50">
                                                <p className="text-xs text-red-600 font-semibold mb-1 flex items-center gap-1"><MapPin size={12} /> Pickup</p>
                                                <p className="font-semibold text-gray-700 text-sm truncate" title={formData.pickupPoint}>{formData.pickupPoint || "Base Camp"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Traveler Details Summary */}
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <User className="text-emerald-600" size={20} /> Primary Traveler
                                    </h4>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                                            {formData.name.charAt(0) || "U"}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{formData.name || "Guest User"}</p>
                                            <p className="text-sm text-gray-500">{formData.email}</p>
                                            <p className="text-sm text-gray-500">{formData.whatsappNumber}</p>
                                        </div>
                                    </div>

                                    {formData.additionalMembers.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-sm font-semibold text-gray-500 mb-2">Additional Members</p>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.additionalMembers.map((m, i) => (
                                                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                                                        {m.name || `Member ${i + 1}`}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Col: Price Summary & Trust */}
                            <div className="md:col-span-1 space-y-6">
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl shadow-emerald-500/5 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>

                                    <h4 className="text-lg font-bold text-gray-800 mb-4">Payment Details</h4>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Base Cost (x{formData.numberOfPeople})</span>
                                            <span>₹{(15000 * formData.numberOfPeople).toLocaleString()}</span> {/* Mock Rate */}
                                        </div>

                                        {formData.needCoupleTent && (
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>Couple Tent</span>
                                                <span>₹1,000</span>
                                            </div>
                                        )}
                                        {formData.needPrivateRoom && (
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>Private Room</span>
                                                <span>₹2,500</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>Taxes & Fees</span>
                                            <span>₹{((15000 * formData.numberOfPeople) * 0.05).toLocaleString()}</span>
                                        </div>

                                        <div className="border-t border-dashed border-gray-200 my-2 pt-2"></div>

                                        <div className="flex justify-between items-end">
                                            <span className="text-gray-800 font-bold">Total Payable</span>
                                            <div className="text-right">
                                                <span className="text-2xl font-extrabold text-emerald-600">
                                                    ₹{((15000 * formData.numberOfPeople * 1.05) + (formData.needCoupleTent ? 1000 : 0) + (formData.needPrivateRoom ? 2500 : 0)).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Coupon Placeholder */}
                                    {/* <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-6 flex gap-2">
                                        <Activity size={20} className="text-gray-400" />
                                        <input type="text" placeholder="Have a coupon code?" className="bg-transparent text-sm w-full outline-none" disabled />
                                        <button className="text-xs font-bold text-emerald-600 disabled:opacity-50">APPLY</button>
                                    </div> */}

                                    {/* Trust Signals */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                            <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                                            <span>Secure SSL Encrypted Payment</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                            <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                                            <span>Free Cancellation up to 7 days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-4 px-3 flex items-center justify-center">
            <div className="max-w-3xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-4 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <h1 className="text-2xl md:text-3xl font-extrabold relative z-10">Complete Your Booking</h1>
                    <p className="text-sm text-emerald-100 relative z-10">You're just a few steps away from an adventure!</p>
                </div>

                <div className="p-6">
                    <StepIndicator />

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="min-h-[320px]">
                            {renderStep()}
                        </div>

                        <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${currentStep === 1
                                    ? "opacity-50 cursor-not-allowed text-gray-400"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow"
                                    }`}
                            >
                                <ChevronLeft size={20} /> Back
                            </button>

                            {currentStep < 5 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5"
                                >
                                    Next Step <ChevronRight size={20} />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="group relative flex items-center justify-center gap-2 px-8 py-3 md:px-10 md:py-4 rounded-full
                                 bg-gradient-to-r from-emerald-600 to-teal-600
                                 text-white font-bold text-lg
                                 shadow-lg shadow-emerald-500/30
                                 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1
                                 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12 -translate-x-full"></div>
                                    <span>Confirm & Pay</span>
                                    <CreditCard className="group-hover:rotate-12 transition-transform" size={22} />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingWizard;
