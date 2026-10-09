import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Upload, Shield, CheckCircle2, ArrowRight, Loader2, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CitizenReportIssue = () => {
  const navigate = useNavigate();
  const { addReport } = useData();

  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("Road Damage");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("Connaught Place Radial Rd 3, New Delhi");
  const [lat, setLat] = useState("28.6139");
  const [lng, setLng] = useState("77.2090");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const sampleImages = [
    { label: "Pothole", url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop" },
    { label: "Garbage Overflow", url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=800&auto=format&fit=crop" },
    { label: "Water Leakage", url: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?q=80&w=800&auto=format&fit=crop" },
    { label: "Broken Streetlight", url: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=800&auto=format&fit=crop" }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRunAICheck = () => {
    if (!imagePreview && !sampleImages[0].url) {
      alert("Please upload or select an issue photo first.");
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiResult({
        predictedCategory: category,
        confidence: 0.94,
        severity: "High",
        priorityScore: 86,
        recommendedAction: "Schedule road inspection and asphalt patching squad."
      });
      setStep(4);
    }, 1200);
  };

  const handleSubmitFinal = (e) => {
    e.preventDefault();
    const created = addReport({
      category,
      title: `${category} Reported`,
      description: description || `Citizen reported ${category.toLowerCase()} requiring repair inspection.`,
      image: imagePreview || sampleImages[0].url,
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      address,
      zone: "Zone 02 — Central Business District"
    });

    alert("Report logged! Added to UrbanShield AI priority triage queue.");
    navigate('/citizen/my-reports');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-2 pb-16 px-2 sm:px-0">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900">Report a Civic Issue</h1>
        <p className="text-xs text-slate-500">
          Capture photo evidence & location pin for automated AI vision triage.
        </p>
      </div>

      {/* Workflow Progress Bar */}
      <div className="rail-card p-3 rounded-xl flex items-center justify-between text-xs font-mono bg-white border border-slate-200">
        <div className={`flex items-center gap-1 ${step >= 1 ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
          <span className="hidden sm:inline">Image</span>
        </div>
        <span className="text-slate-300">→</span>
        <div className={`flex items-center gap-1 ${step >= 2 ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
          <span className="hidden sm:inline">Location</span>
        </div>
        <span className="text-slate-300">→</span>
        <div className={`flex items-center gap-1 ${step >= 3 ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
          <span className="hidden sm:inline">Details</span>
        </div>
        <span className="text-slate-300">→</span>
        <div className={`flex items-center gap-1 ${aiResult ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">4</span>
          <span className="hidden sm:inline">AI Analysis</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="rail-card p-5 sm:p-7 rounded-3xl space-y-6 bg-white border border-slate-200/90 shadow-lg">
        
        {/* INTERMEDIATE AI CIVIC ANALYSIS REVIEW SCREEN */}
        {aiResult ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  AI CIVIC ANALYSIS
                </h3>
              </div>
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                ⚠️ AI prediction — review before submission
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* Uploaded Evidence Image */}
              <div className="md:col-span-5 flex flex-col space-y-1.5">
                <span className="text-xs font-bold text-slate-700">Uploaded Evidence Photo:</span>
                <img 
                  src={imagePreview || sampleImages[0].url} 
                  alt="Detected Issue" 
                  className="w-full h-44 object-cover rounded-2xl border border-slate-200 shadow-xs flex-1" 
                />
              </div>

              {/* AI Inference Metrics Box */}
              <div className="md:col-span-7 space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Detected Issue</span>
                  <span className="text-base font-extrabold text-slate-900">{aiResult.predictedCategory}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-semibold block">AI Confidence</span>
                    <span className="text-sm font-extrabold text-emerald-700 font-mono">94%</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-semibold block">Estimated Severity</span>
                    <span className="text-sm font-extrabold text-rose-600 font-mono uppercase">HIGH (86/100)</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Suggested Municipal Action</span>
                  <p className="text-xs font-semibold text-slate-700 leading-snug">
                    {aiResult.recommendedAction}
                  </p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setAiResult(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Edit Details</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitFinal}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Official Report</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* FORM STEPS 1 to 3 */
          <div className="space-y-6">
            
            {/* Step 1: Image Upload */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-600" />
                Step 1: Capture or Upload Evidence Photo
              </label>

              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center transition-colors bg-slate-50 relative">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img src={imagePreview} alt="Preview" className="max-h-52 rounded-xl border border-slate-200 object-cover" />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full p-1 font-bold text-xs shadow-md cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <label htmlFor="file-up" className="cursor-pointer text-xs font-bold text-emerald-700 hover:underline">
                        Upload photo
                      </label>
                      <span className="text-xs text-slate-500"> or drag and drop</span>
                    </div>
                    <input id="file-up" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </div>
                )}
              </div>

              {/* DEMO PRESETS WITH EXPLICIT DISCLAIMER */}
              {!imagePreview && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-700 flex items-center gap-1">
                      ⚡ DEMO MODE — Try with a sample civic issue:
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {sampleImages.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImagePreview(s.url)}
                        className="p-1.5 rounded-xl border border-slate-200 hover:border-emerald-600 text-left bg-slate-50/80 hover:bg-emerald-50/50 transition-all cursor-pointer group"
                      >
                        <img src={s.url} alt={s.label} className="w-full h-14 object-cover rounded-lg mb-1 group-hover:scale-102 transition-transform" />
                        <span className="text-[11px] font-bold text-slate-800 block truncate">{s.label}</span>
                      </button>
                    ))}
                  </div>

                  <p className="text-[10px] text-slate-500 italic">
                    * Sample images are for demonstration only.
                  </p>
                </div>
              )}
            </div>

            {/* Step 2: Location */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Step 2: Location Pin
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address or ward"
                className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Step 3: Details (Responsive Stack on Mobile <768px) */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Step 3: Issue Category & Notes
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Issue Type</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Road Damage">Road Damage / Pothole</option>
                    <option value="Garbage Overflow">Garbage Overflow</option>
                    <option value="Water Leakage">Water Pipe Leakage</option>
                    <option value="Broken Streetlight">Broken Streetlight</option>
                    <option value="Fallen Tree / Obstruction">Fallen Tree / Obstruction</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe danger or size..."
                    rows="3"
                    className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Note */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Privacy Note:</strong> Please avoid including faces, vehicle number plates, or other personal information in your photos.
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={handleRunAICheck}
                disabled={isAnalyzing}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing civic issue...</span>
                  </>
                ) : (
                  <>
                    <span>Run AI Check & Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
