import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Upload, AlertCircle, Shield, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useReports } from '../context/ReportContext';

export const ReportIssue = () => {
  const navigate = useNavigate();
  const { addReport } = useReports();

  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("Waste Overflow");
  const [description, setDescription] = useState("");
  const [locationText, setLocationText] = useState("Sector 14, Central District, New Delhi");
  const [lat, setLat] = useState("28.6139");
  const [lng, setLng] = useState("77.2090");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(true);

  // Sample default images for demo selection if user doesn't pick a local file
  const sampleImages = [
    { label: "Road Damage", url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop" },
    { label: "Waste Overflow", url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=800&auto=format&fit=crop" },
    { label: "Water Leakage", url: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?q=80&w=800&auto=format&fit=crop" },
    { label: "Broken Streetlight", url: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=800&auto=format&fit=crop" }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude.toFixed(4));
          setLng(pos.coords.longitude.toFixed(4));
          setLocationText(`GPS Pin (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`);
        },
        (err) => {
          alert("Location access denied or unavailable. Using default coordinates.");
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagePreview && !sampleImages[0].url) {
      alert("Please upload or select an issue photo.");
      return;
    }

    setIsSubmitting(true);

    try {
      const reportObj = {
        category,
        title: `${category} Issue Reported`,
        description: description || `Citizen reported ${category.toLowerCase()} requiring municipal inspection.`,
        image: imagePreview || sampleImages[0].url,
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        address: locationText,
        zone: "Zone 02 — Central District"
      };

      const created = await addReport(reportObj);
      setTimeout(() => {
        setIsSubmitting(false);
        navigate(`/ai-result`, { state: { report: created } });
      }, 1000);
    } catch (err) {
      setIsSubmitting(false);
      alert("Error submitting report.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4 pb-16">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-100">Report a Civic Issue</h1>
        <p className="text-xs text-slate-400">
          Upload photo & location to trigger AI classification and prioritize municipal repair.
        </p>
      </div>

      {/* 5-Step Wizard Indicator */}
      <div className="glass-panel p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
        <div className={`flex items-center gap-1 ${step >= 1 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
          <span className="hidden sm:inline">Evidence</span>
        </div>
        <span className="text-slate-700">→</span>
        <div className={`flex items-center gap-1 ${step >= 2 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
          <span className="hidden sm:inline">Location</span>
        </div>
        <span className="text-slate-700">→</span>
        <div className={`flex items-center gap-1 ${step >= 3 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
          <span className="hidden sm:inline">Details</span>
        </div>
        <span className="text-slate-700">→</span>
        <div className={`flex items-center gap-1 ${step >= 4 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">4</span>
          <span className="hidden sm:inline">AI Triage</span>
        </div>
        <span className="text-slate-700">→</span>
        <div className={`flex items-center gap-1 ${step >= 5 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">5</span>
          <span className="hidden sm:inline">Verification</span>
        </div>
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="glass-card p-6 rounded-xl space-y-6 border border-slate-800">
        
        {/* Step 1: Image Upload */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            1. Evidence Image Capture
          </label>

          <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl p-6 text-center transition-colors bg-slate-900/50 relative">
            {imagePreview ? (
              <div className="relative inline-block">
                <img src={imagePreview} alt="Preview" className="max-h-56 rounded-lg border border-slate-700 object-cover" />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute -top-2 -right-2 bg-rose-500 text-slate-950 rounded-full p-1 font-bold text-xs shadow-lg"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center mx-auto border border-slate-700">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <label htmlFor="file-upload" className="cursor-pointer text-xs font-bold text-cyan-400 hover:underline">
                    Upload a file
                  </label>
                  <span className="text-xs text-slate-400"> or drag and drop</span>
                  <p className="text-[11px] text-slate-500 mt-1">PNG, JPG up to 10MB</p>
                </div>
                <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
            )}
          </div>

          {/* Quick Demo Image Selection */}
          {!imagePreview && (
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] text-slate-400 block">Or select a sample issue photo for demo:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sampleImages.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImagePreview(sample.url)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-left transition-all"
                  >
                    <img src={sample.url} alt={sample.label} className="w-full h-14 object-cover rounded mb-1" />
                    <span className="text-[10px] font-semibold text-slate-300 block truncate">{sample.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Location Selection */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            2. Geolocation Pin & Address
          </label>

          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                placeholder="Enter street name, ward, or landmark"
                className="flex-1 bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
                required
              />
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-cyan-400 font-semibold rounded-lg shrink-0 flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                Use GPS
              </button>
            </div>
            <div className="flex gap-4 text-[11px] font-mono text-slate-400 px-1">
              <span>Lat: {lat}</span>
              <span>Lng: {lng}</span>
              <span className="text-cyan-400">Zone 02 Central</span>
            </div>
          </div>
        </div>

        {/* Step 3: Category & Description */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
            3. Category & Description
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Optional Pre-Category:</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
              >
                <option value="Road Damage">Road Damage / Pothole</option>
                <option value="Waste Overflow">Waste / Trash Overflow</option>
                <option value="Water Leakage">Water Pipe Leakage</option>
                <option value="Broken Streetlight">Broken Streetlight</option>
                <option value="Fallen Tree / Obstruction">Fallen Tree / Obstruction</option>
              </select>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-1">Additional Observations:</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe urgency, safety risks, or recurrence..."
                rows="2"
                className="w-full bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Privacy Notice Card */}
        <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-300/90 flex items-start gap-2">
          <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong>Privacy Notice:</strong> Avoid capturing facial features, vehicle license plates, or private personal data in your submission photos.
          </p>
        </div>

        {/* Submit CTA */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">Step 4 & 5 auto-execute upon submit</span>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Executing AI Triage...
              </>
            ) : (
              <>
                Submit & Process AI
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
