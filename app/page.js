"use client";
import { useState, useEffect } from "react";
import {
  Globe, Loader2, Pencil, Plus, X, Download, User, Instagram, Youtube, Twitter,
} from "lucide-react";

// ----------- THEME COLORS & FONTS ------------
const COLORS = {
  background: "#f4f4fb",
  white: "#ffffff",
  heading: "#30234d",
  highlight: "#a475f9",
  cta: "#7640ec",
  border: "#d6d7de",
  subtext: "#9c9ca3",
  inputBg: "#ebecf2",
};
const FONT = {
  h1: "font-bold text-[32px] leading-[40px] font-inter",
  h2: "font-semibold text-[24px] leading-[32px] font-inter",
  h3: "font-semibold text-[20px] leading-[28px] font-inter",
  bodyLarge: "font-medium text-[16px] leading-[24px] font-inter",
  body: "font-normal text-[14px] leading-[22px] font-inter",
  small: "font-normal text-[12px] leading-[18px] font-inter",
  button: "font-semibold text-[14px] leading-[20px] font-inter",
  badge: "font-medium text-[12px] leading-[16px] font-inter uppercase tracking-wide",
};

// ----------- ICONS & UTILITIES ------------
const platformsPool = ["Instagram", "YouTube", "TikTok", "Twitter"];
const platformOptions = ["Instagram", "YouTube", "TikTok", "X"];
const tagsPool = ["Brand Awareness", "Product Launch", "Drive Sales", "Engagement", "Product Review"];
const countries = [
  "United States", "India", "United Kingdom", "Canada", "Australia", "Germany", "France", "Brazil",
  "Japan", "Singapore", "UAE", "Italy", "Spain", "Netherlands", "South Africa", "Other"
];

function getPlatformIcon(name) {
  switch (name) {
    case "Instagram": return <Instagram className="inline" size={18} />;
    case "YouTube": return <Youtube className="inline" size={18} />;
    case "Twitter":
    case "X": return <Twitter className="inline" size={18} />;
    case "TikTok":
      return (
        <svg viewBox="0 0 20 20" fill="currentColor" className="inline w-4 h-4">
          <path d="M17.5 5.6a3.54 3.54 0 0 1-2.13-.68V13a4.82 4.82 0 1 1-4.85-4.81c.19 0 .39.01.58.03V10.6c-.18-.03-.38-.06-.58-.06A3.2 3.2 0 1 0 13 13V2.5h2.01a.49.49 0 0 1 .49.49v2.61Z" />
        </svg>
      );
    default: return <User className="inline" size={18} />;
  }
}

// ------------- TOAST ---------------
function Toast({ show, text }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#7640ec] text-white rounded-xl font-semibold z-50 shadow-lg">
      {text}
    </div>
  );
}

// ------------- MODALS ---------------
function ExportListModal({ open, onClose, influencerCount = 0, fileSize = "0 MB", onExport }) {
  const [email, setEmail] = useState("");
  const [format, setFormat] = useState("CSV");
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-8 shadow-xl relative border border-[#d6d7de]">
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-[#a475f9] hover:text-[#7640ec]"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className={`${FONT.h2} mb-5 text-[#30234d]`}>Export Influencer List</h2>
        <form className="space-y-6" onSubmit={e => { e.preventDefault(); onExport && onExport(email, format); }}>
          <div>
            <label className={`${FONT.body} block mb-2 text-[#30234d]`}>Send to Email</label>
            <input
              type="email"
              className="border border-[#d6d7de] rounded-lg px-4 py-3 w-full focus:outline-none focus:border-[#a475f9]"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={`${FONT.body} block mb-2 text-[#30234d]`}>Download Format</label>
            <select
              className="border border-[#d6d7de] rounded-lg px-4 py-3 w-full focus:outline-none focus:border-[#a475f9]"
              value={format}
              onChange={e => setFormat(e.target.value)}
            >
              <option value="CSV">CSV (.csv)</option>
              <option value="XLSX">Excel (.xlsx)</option>
              <option value="PDF">PDF (.pdf)</option>
            </select>
          </div>
          <div className="bg-[#f4f4fb] border border-[#d6d7de] rounded-lg px-4 py-3 text-sm mb-2">
            <div className="flex gap-2 mb-1">
              <span className="text-[#7640ec] font-semibold">•</span>
              Your export file will be emailed to you and available for direct download.
            </div>
            <div className="flex gap-8 mt-2">
              <div>
                <div className="text-[#9c9ca3]">Influencers in list:</div>
                <div className="font-semibold text-[#30234d]">{influencerCount}</div>
              </div>
              <div>
                <div className="text-[#9c9ca3]">Estimated file size:</div>
                <div className="font-semibold text-[#30234d]">{fileSize}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <button
              type="button"
              className="rounded-lg border border-[#d6d7de] px-6 py-2 font-medium text-[#30234d] hover:bg-[#f4f4fb]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#7640ec] px-6 py-2 font-medium text-white hover:bg-[#a475f9] flex items-center gap-2"
            >
              <Download size={16} /> Export
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CreateListModal({ open, onClose, influencerCount = 0, fileSize = "0 MB", onSave }) {
  const [listName, setListName] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-8 shadow-xl relative border border-[#d6d7de]">
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-[#a475f9] hover:text-[#7640ec]"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className={`${FONT.h2} mb-5 text-[#30234d]`}>Save Your Influencer List</h2>
        <form className="space-y-6" onSubmit={e => { e.preventDefault(); onSave(listName); }}>
          <div>
            <label className={`${FONT.body} block mb-2 text-[#30234d]`}>List Name</label>
            <input
              type="text"
              className="border border-[#d6d7de] rounded-lg px-4 py-3 w-full focus:outline-none focus:border-[#a475f9]"
              placeholder="e.g. Q3 Awareness Push"
              value={listName}
              onChange={e => setListName(e.target.value)}
              required
            />
          </div>
          <div className="bg-[#f4f4fb] border border-[#d6d7de] rounded-lg px-4 py-3 text-sm mb-2">
            <div className="flex gap-2 mb-1">
              <span className="text-[#7640ec] font-semibold">•</span>
              Your list will be saved.
            </div>
            <div className="flex gap-8 mt-2">
              <div>
                <div className="text-[#9c9ca3]">Influencers in your list:</div>
                <div className="font-semibold text-[#30234d]">{influencerCount}</div>
              </div>
              <div>
                <div className="text-[#9c9ca3]">Estimated file size:</div>
                <div className="font-semibold text-[#30234d]">{fileSize}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <button
              type="button"
              className="rounded-lg border border-[#d6d7de] px-6 py-2 font-medium text-[#30234d] hover:bg-[#f4f4fb]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#7640ec] px-6 py-2 font-medium text-white hover:bg-[#a475f9] flex items-center gap-2"
            >
              Save List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SuccessModal({ open, onClose, onViewList, action = "created" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-8 shadow-xl relative border border-[#d6d7de] flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full mb-5 bg-[#f4f4fb]">
          <span className="text-[48px] text-[#7640ec]">✅</span>
        </div>
        <h2 className={`${FONT.h2} mb-4 text-[#30234d]`}>
          List Successfully {action === "created" ? "Created!" : "Exported!"}
        </h2>
        <p className={`${FONT.bodyLarge} text-center mb-7 text-[#30234d]`}>
          Your influencer list has been {action === "created" ? "saved" : "exported"}.<br />
          You can now view the saved list.
        </p>
        <button
          className="rounded-lg bg-[#7640ec] px-8 py-3 font-medium text-white hover:bg-[#a475f9] w-full max-w-xs"
          onClick={onViewList}
        >
          View List
        </button>
        <button
          className="mt-3 rounded-lg border border-[#d6d7de] px-8 py-3 font-medium text-[#30234d] hover:bg-[#f4f4fb] w-full max-w-xs"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ------------- SAVED LIST SCREEN ---------------
function SavedListScreen({ influencers, listName, onCreateNewList }) {
  const totalFollowers = influencers.reduce((sum, i) => sum + parseFloat(i.followers.replace("K", "")), 0);
  const avgEngagement =
    influencers.reduce((sum, i) => sum + parseFloat(i.engagement), 0) / (influencers.length || 1);
  const allTags = [...new Set(influencers.flatMap(i => i.tags || []))];

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white rounded-2xl border border-[#d6d7de] p-8 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className={`${FONT.h2}`} style={{ color: COLORS.heading }}>
            Saved List: {listName || "My Influencer List"}
          </h1>
          <div className="flex gap-3">
            <button className="rounded-lg border border-[#d6d7de] px-4 py-2 text-[#30234d] hover:bg-[#f4f4fb] text-sm">Copy Link</button>
            <button className="rounded-lg bg-[#7640ec] px-4 py-2 font-medium text-white hover:bg-[#a475f9] text-sm flex gap-1 items-center">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter">
            <thead>
              <tr className="text-[#9c9ca3] text-sm border-b">
                <th className="py-2">Influencer</th>
                <th className="py-2">Platform</th>
                <th className="py-2">Followers</th>
                <th className="py-2">Engagement</th>
                <th className="py-2">Why This Match</th>
                <th className="py-2">Tags</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {influencers.map(inf => (
                <tr key={inf.id} className="border-b last:border-0">
                  <td className="py-3 flex gap-2 items-center">
                    <span className="rounded-full w-10 h-10 bg-[#f4f4fb] flex items-center justify-center font-bold text-[#a475f9] text-lg">{inf.name[0]}</span>
                    <div>
                      <div className="font-semibold text-[#30234d]">{inf.username}</div>
                      <div className="text-xs text-[#9c9ca3]">{inf.name}</div>
                    </div>
                  </td>
                  <td>
                    {inf.platforms.map((p, i) => (
                      <span key={i} className="mr-2 inline-flex items-center gap-1">{getPlatformIcon(p)} {p === "Twitter" ? "X" : p}</span>
                    ))}
                  </td>
                  <td>{inf.followers}</td>
                  <td>{inf.engagement}</td>
                  <td>{inf.whyFit}</td>
                  <td>
                    {(inf.tags || []).map((tag, i) => (
                      <span key={i} className="bg-[#ebecf2] px-2 py-1 rounded text-xs font-medium text-[#30234d] mr-1">{tag}</span>
                    ))}
                  </td>
                  <td>
                    <button className="p-1 text-[#a475f9] hover:text-[#7640ec]"><Pencil size={16} /></button>
                    <button className="p-1 text-[#a475f9] hover:text-red-400"><X size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-7 justify-between items-center text-[#30234d] mt-5 bg-[#f4f4fb] rounded-lg px-4 py-3">
          <div>Total Followers: <b>{totalFollowers.toFixed(1)}K</b></div>
          <div>Avg. Engagement: <b>{avgEngagement.toFixed(1)}%</b></div>
          <div>Campaign Goal: <span className="bg-black text-white rounded px-2 py-1 text-xs">{allTags[0] || "UGC"}</span></div>
          <div className="text-[#9c9ca3] text-xs">{influencers.length} influencers saved • Last updated Jan 15, 2025</div>
        </div>
        <div className="mt-10 flex justify-end">
          <button
            className="rounded-lg bg-[#7640ec] px-6 py-3 font-medium text-white hover:bg-[#a475f9] text-lg"
            onClick={onCreateNewList}
          >
            Create New List
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------- MAIN COMPONENT ---------------
export default function BrandMatchFlow() {
  // Step management
  const [step, setStep] = useState(1);

  // Brand input & profile data
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [brandSummary, setBrandSummary] = useState("");
  const [brandTone, setBrandTone] = useState("");
  const [coreValues, setCoreValues] = useState("");
  const [region, setRegion] = useState("United States");
  const [audience, setAudience] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [campaignObjective, setCampaignObjective] = useState("Brand Awareness");
  const [editingProfile, setEditingProfile] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");

  // Influencer & list state
  const [influencers, setInfluencers] = useState([]);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Relevance");
  const [shortlisted, setShortlisted] = useState([]);
  const [compareList, setCompareList] = useState([]);

  // Modal & toast states
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [toast, setToast] = useState({ show: false, text: "" });
  const [lastSavedList, setLastSavedList] = useState("Gen Z Launch Picks");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successType, setSuccessType] = useState("created");
  const [showSavedList, setShowSavedList] = useState(false);

  // Loading & error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------- Keyword handlers ----------
  function handleAddKeyword() {
    const k = newKeyword.trim();
    if (k && !keywords.includes(k)) {
      setKeywords([...keywords, k]);
      setNewKeyword("");
    }
  }
  function handleRemoveKeyword(index) {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  }

  // ---------- Platform checkbox toggle ----------
  function handlePlatformChange(option) {
    setPlatforms(prev =>
      prev.includes(option)
        ? prev.filter(p => p !== option)
        : [...prev, option]
    );
  }

  // ---------- Handle brand analysis submit ----------
  const handleLandingSubmit = async (e) => {
    e.preventDefault();

    setError("");
    if (!/^www\.[a-zA-Z0-9-]+\.[a-z]{2,}$/.test(website.trim())) {
      setToast({ show: true, text: "Enter a valid website (e.g. www.yourbrand.com)" });
      setTimeout(() => setToast({ show: false }), 2000);
      return;
    }

    setLoading(true);
    setStep(2); // loading screen

    try {
      const res = await fetch('/api/brand-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website, description }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();

      setBrandSummary(data.summary || "");
      setKeywords(data.core_keywords || []);
      setBrandTone(data.brand_tone || "");
      setCoreValues(data.core_values || "");
      setAudience(data.target_audience || "");
      setRegion(data.target_region || "United States");
      setPlatforms(data.media_platform || []);

      setStep(3); // Show brand profile
    } catch (err) {
      setError("Failed to analyze brand. Please try again.");
      setToast({ show: true, text: "Failed to analyze brand. Please try again." });
      setTimeout(() => setToast({ show: false }), 3000);
      setStep(1); // back to form
    } finally {
      setLoading(false);
    }
  };

  // ---------- Fetch influencer matches ----------
  const handleFindInfluencers = async () => {
    setError("");
    if (!brandSummary) {
      setToast({ show: true, text: "Brand summary missing, please complete brand profile first." });
      setTimeout(() => setToast({ show: false }), 2000);
      return;
    }

    setLoading(true);
    setStep(4); // Influencer list loading

    try {
      const res = await fetch('/api/influencer-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandSummary,
          keywords,
          brandTone,
          coreValues,
          audience,
          region,
          platforms,
          campaignObjective,
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch influencers');

      const data = await res.json();

      setInfluencers(data.influencers || []);
      setShortlisted([]); // reset shortlist on new fetch
    } catch (err) {
      setError("Failed to fetch influencers. Please try again.");
      setToast({ show: true, text: "Failed to fetch influencers. Please try again." });
      setTimeout(() => setToast({ show: false }), 3000);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Filter & Sort influencers ----------
  let filteredInfluencers = influencers.slice(0, 100);
  if (search) filteredInfluencers = filteredInfluencers.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  if (sort === "Followers") filteredInfluencers = filteredInfluencers.slice().sort((a, b) => parseInt(b.followers.replace(/\D/g, "")) - parseInt(a.followers.replace(/\D/g, "")));
  if (sort === "Engagement") filteredInfluencers = filteredInfluencers.slice().sort((a, b) => parseFloat(b.engagement) - parseFloat(a.engagement));
  if (sort === "Brand Fit Score") filteredInfluencers = filteredInfluencers.slice().sort((a, b) => b.fit - a.fit);

  // ---------- Show saved list ----------
  function goToSavedList() {
    setShowSuccess(false);
    setShowSavedList(true);
    setStep(99);
  }

  // ---------- Export & Create list handlers ----------
  function handleListExport(email, format) {
    // Add your export logic here (e.g., call API to generate export file)
    setShowExportModal(false);
    setSuccessType("exported");
    setShowSuccess(true);
  }
  function handleListCreate(name) {
    // Add your save list logic here (e.g., call API to save list)
    setShowCreateListModal(false);
    setLastSavedList(name || "Gen Z Launch Picks");
    setSuccessType("created");
    setShowSuccess(true);
  }

  return (
    <div style={{ background: COLORS.background, fontFamily: "Inter, sans-serif" }} className="min-h-screen px-4 py-4">
      <header className="flex justify-between items-center max-w-6xl mx-auto py-4 mb-4">
        <span style={{ color: COLORS.heading }} className="text-[24px] font-bold tracking-tight">SARAL</span>
      </header>
      <Toast show={toast.show} text={toast.text} />

      {/* STEP 1: LANDING */}
      {step === 1 && (
        <form onSubmit={handleLandingSubmit} className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="text-center mb-10">
            <h1 className={`${FONT.h1} mb-7`} style={{ color: COLORS.heading }}>
              Find Your Perfect <span style={{ color: COLORS.highlight }}>Influencers.</span><br />
              Instantly. <br />
              <span style={{ color: COLORS.highlight }}>Powered by AI.</span>
            </h1>
            <p className={`${FONT.bodyLarge} mb-7`} style={{ color: COLORS.subtext }}>
              Just paste your brand's website URL, and our AI will recommend top-tier influencers tailored to your
              niche, products, and story. Save time, boost ROI.
            </p>
          </div>
          <div className="w-full max-w-lg space-y-6">
            <div className="space-y-2">
              <label className={`${FONT.body} text-[#30234d] font-medium`}>Brand's Website</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: COLORS.subtext }} />
                <input
                  id="website"
                  type="text"
                  placeholder="www.yourbrand.com"
                  className="pl-12 h-14 rounded-2xl border border-[#d6d7de] text-base bg-[#ebecf2] placeholder-[#9c9ca3] focus:ring-2 focus:ring-[#a475f9] w-full"
                  style={{ fontFamily: "Inter", fontSize: 16 }}
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className={`${FONT.body} text-[#30234d] font-medium`}>Brand Description (Optional)</label>
              <textarea
                id="description"
                placeholder="Enter brand description for enhanced results"
                className="rounded-2xl border border-[#d6d7de] text-base bg-[#ebecf2] min-h-[80px] placeholder-[#9c9ca3] focus:ring-2 focus:ring-[#a475f9] w-full p-3"
                style={{ fontFamily: "Inter", fontSize: 16, resize: "vertical" }}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <button
              className={`w-full h-14 rounded-2xl ${FONT.button}`}
              style={{ background: COLORS.cta, color: "#fff" }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Find Influencers Now"}
            </button>
            <div className="text-center space-y-1 mt-2">
              <p className={`${FONT.small} text-[#9c9ca3]`}>🔒 Secure & Private Analysis</p>
              <p className={`${FONT.small} text-[#d6d7de]`}>
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </form>
      )}

      {/* STEP 2: AI ANALYSIS */}
      {step === 2 && (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <Loader2 className="h-14 w-14 animate-spin mb-7" style={{ color: COLORS.highlight }} />
          <div className="text-center mb-8">
            <h2 className={`${FONT.h2} mb-2`} style={{ color: COLORS.heading }}>
              AI Analysis in Progress
            </h2>
            <p className={`${FONT.bodyLarge} mb-3`} style={{ color: COLORS.subtext }}>
              Analyzing your brand's unique DNA…
            </p>
            <div
              className="relative w-full max-w-md h-2 mb-2"
              style={{
                background: COLORS.border,
                borderRadius: 9999,
                margin: "0 auto",
              }}
            >
              <div
                className="absolute top-0 left-0 h-2 animate-pulse"
                style={{
                  width: "98%",
                  background: COLORS.highlight,
                  borderRadius: 9999,
                }}
              ></div>
            </div>
            <div className="bg-white rounded-xl border px-10 py-6 mt-6 w-full max-w-xl text-center"
              style={{ borderColor: COLORS.border }}>
              <div className={`${FONT.h3} mb-3`} style={{ color: COLORS.heading }}>
                What We're Analyzing
              </div>
              <div
                className="flex flex-wrap justify-center gap-x-8 gap-y-2"
                style={{ color: COLORS.subtext, fontSize: 16 }}
              >
                <span className="flex items-center gap-2">✔️ Brand Voice & Tone</span>
                <span className="flex items-center gap-2">✔️ Target Audience</span>
                <span className="flex items-center gap-2">✔️ Product Categories</span>
                <span className="flex items-center gap-2">✔️ Niche Keywords</span>
                <span className="flex items-center gap-2">⏳ Influencer Matching</span>
                <span className="flex items-center gap-2">⏳ Quality Scoring</span>
              </div>
            </div>
          </div>
        </div>
      )}

              {/* ---------- STEP 3: BRAND PROFILE ---------- */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white rounded-2xl border border-[#D6D7DE] p-8 mb-8 shadow">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="font-bold text-lg" style={{ color: "#30234d", fontFamily: "Inter" }}>
                    {website.replace(/^https?:\/\//, '').replace(/\/$/, '') || "Your Brand"}
                  </div>
                  <div className="text-[#9c9ca3] text-sm" style={{ fontFamily: "Inter" }}>
                    {website || "www.yourbrand.com"}
                  </div>
                </div>
                {!editingProfile ? (
                  <button
                    className="rounded-lg px-3 py-1 border font-semibold border-[#7640ec] text-[#7640ec] text-sm hover:bg-[#f4f4fb] transition"
                    style={{ fontFamily: "Inter" }}
                    onClick={() => setEditingProfile(true)}
                  >Edit Details</button>
                ) : (
                  <button
                    className="rounded-lg px-3 py-1 bg-[#7640ec] text-white text-sm font-semibold transition"
                    style={{ fontFamily: "Inter" }}
                    onClick={() => setEditingProfile(false)}
                  >Save</button>
                )}
              </div>
        
              {/* Brand Summary */}
              <div className="mb-4">
                <label className="text-sm mb-1 block" style={{ color: "#9c9ca3", fontFamily: "Inter" }}>
                  Brand Summary
                </label>
                {editingProfile ? (
                  <textarea
                    value={brandSummary}
                    onChange={e => setBrandSummary(e.target.value)}
                    className="rounded-lg border border-[#d6d7de] min-h-[60px] text-base mb-1 bg-[#ebecf2] w-full px-3 py-2 focus:ring-2 focus:ring-[#a475f9]"
                    placeholder="Describe your brand here..."
                    style={{ fontFamily: "Inter" }}
                  />
                ) : (
                  <p className="text-[#30234d]">{brandSummary || "No summary available."}</p>
                )}
              </div>
        
              {/* Keywords */}
              <div className="mb-4">
                <label className="text-sm mb-1 block" style={{ color: "#9c9ca3", fontFamily: "Inter" }}>
                  Core Keywords & Themes
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {keywords.length === 0 && <p className="text-[#9c9ca3]">No keywords added.</p>}
                  {keywords.map((k, i) => (
                    <span
                      key={i}
                      className="bg-[#a475f9] text-white font-medium px-3 py-1 rounded-full uppercase tracking-wide text-xs"
                      style={{ fontFamily: "Inter" }}
                    >
                      {k}
                      {editingProfile && (
                        <X size={14} className="ml-1 cursor-pointer" onClick={() => handleRemoveKeyword(i)} />
                      )}
                    </span>
                  ))}
                  {editingProfile && (
                    <div className="flex items-center gap-1">
                      <input
                        placeholder="Add"
                        value={newKeyword}
                        onChange={e => setNewKeyword(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleAddKeyword()}
                        className="w-24 h-7 text-sm border border-[#d6d7de] rounded-md px-2"
                        style={{ fontFamily: "Inter" }}
                      />
                      <button
                        className="px-2 py-1 text-[#7640ec] hover:text-[#a475f9]"
                        type="button"
                        onClick={handleAddKeyword}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
        
              {/* Other Brand Details: Tone, Values, Audience, Region, Platforms, Campaign Objective */}
              <div className="grid grid-cols-2 gap-6 mb-4">
                {/* Brand Tone */}
                <div>
                  <label className="text-sm text-[#9c9ca3] block mb-1" style={{ fontFamily: "Inter" }}>
                    Brand Tone
                  </label>
                  {editingProfile ? (
                    <input
                      value={brandTone}
                      onChange={e => setBrandTone(e.target.value)}
                      className="rounded-lg border border-[#d6d7de] bg-[#ebecf2] mb-1 px-3 py-2 w-full"
                      style={{ fontFamily: "Inter" }}
                    />
                  ) : (
                    <p className="text-[#30234d]">{brandTone || "Not specified"}</p>
                  )}
                </div>
        
                {/* Core Values */}
                <div>
                  <label className="text-sm text-[#9c9ca3] block mb-1" style={{ fontFamily: "Inter" }}>
                    Core Values
                  </label>
                  {editingProfile ? (
                    <input
                      value={coreValues}
                      onChange={e => setCoreValues(e.target.value)}
                      className="rounded-lg border border-[#d6d7de] bg-[#ebecf2] mb-1 px-3 py-2 w-full"
                      style={{ fontFamily: "Inter" }}
                    />
                  ) : (
                    <p className="text-[#30234d]">{coreValues || "Not specified"}</p>
                  )}
                </div>
        
                {/* Target Audience */}
                <div>
                  <label className="text-sm text-[#9c9ca3] block mb-1" style={{ fontFamily: "Inter" }}>
                    Target Audience
                  </label>
                  {editingProfile ? (
                    <input
                      value={audience}
                      onChange={e => setAudience(e.target.value)}
                      className="rounded-lg border border-[#d6d7de] bg-[#ebecf2] mb-1 px-3 py-2 w-full"
                      style={{ fontFamily: "Inter" }}
                    />
                  ) : (
                    <p className="text-[#30234d]">{audience || "Not specified"}</p>
                  )}
                </div>
        
                {/* Target Region */}
                <div>
                  <label className="text-sm text-[#9c9ca3] block mb-1" style={{ fontFamily: "Inter" }}>
                    Target Region
                  </label>
                  {editingProfile ? (
                    <select
                      className="rounded-lg border border-[#d6d7de] bg-[#ebecf2] mb-1 px-3 py-2 w-full"
                      style={{ fontFamily: "Inter" }}
                      value={region}
                      onChange={e => setRegion(e.target.value)}
                    >
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-[#30234d]">{region || "Not specified"}</p>
                  )}
                </div>
        
                {/* Media Platforms */}
                <div>
                  <label className="text-sm text-[#9c9ca3] block mb-1" style={{ fontFamily: "Inter" }}>
                    Media Platforms
                  </label>
                  {editingProfile ? (
                    <div className="flex flex-wrap gap-3">
                      {platformOptions.map(option => (
                        <label key={option} className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={platforms.includes(option)}
                            onChange={() => handlePlatformChange(option)}
                            className="accent-[#a475f9] mr-1"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#30234d]">{platforms.length > 0 ? platforms.join(", ") : "Not specified"}</p>
                  )}
                </div>
        
                {/* Campaign Objective */}
                <div>
                  <label className="text-sm text-[#9c9ca3] block mb-1" style={{ fontFamily: "Inter" }}>
                    Campaign Objective
                  </label>
                  {editingProfile ? (
                    <select
                      value={campaignObjective}
                      onChange={e => setCampaignObjective(e.target.value)}
                      className="rounded-lg border border-[#d6d7de] bg-[#ebecf2] mb-1 px-3 py-2 w-full"
                      style={{ fontFamily: "Inter" }}
                    >
                      <option value="Brand Awareness">Brand Awareness</option>
                      <option value="Product Launch">Product Launch</option>
                      <option value="Drive Sales">Drive Sales</option>
                    </select>
                  ) : (
                    <p className="text-[#30234d]">{campaignObjective}</p>
                  )}
                </div>
              </div>
        
            {/* Find Influencers Button */}
            <button
              className="w-full max-w-xs h-12 rounded-xl mt-5 bg-[#7640ec] text-white text-lg font-semibold transition block mx-auto"
              style={{ fontFamily: "Inter" }}
              onClick={handleFindInfluencers}
              disabled={loading}
            >
              {loading ? "Finding Influencers..." : "Find My Influencers"}
            </button>
          </div>
        )}
        
        {/* ---------- STEP 4: INFLUENCER LIST ---------- */}
        {step === 4 && (
          <>
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <Loader2 className="h-14 w-14 animate-spin mb-7" style={{ color: COLORS.highlight }} />
                <div className="text-[#30234d] font-semibold">Loading influencers...</div>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto">
                {/* Brand profile summary at top */}
                <div className="bg-white rounded-2xl border px-8 py-6 mb-7" style={{ borderColor: COLORS.border }}>
                  <div className={`${FONT.h2} mb-1`} style={{ color: COLORS.heading }}>Your Brand Profile</div>
                  <div className="mb-2 text-[#30234d] font-medium">{brandSummary || "No brand summary available."}</div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {keywords.length === 0 ? (
                      <p className="text-[#9c9ca3]">No keywords available.</p>
                    ) : (
                      keywords.map((k, i) => (
                        <span key={i} className="bg-[#a475f9] text-white font-medium px-3 py-1 rounded-full uppercase tracking-wide text-xs">{k}</span>
                      ))
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs mb-2">
                    <div><span className="font-semibold" style={{ color: COLORS.heading }}>Tone:</span> {brandTone || "-"}</div>
                    <div><span className="font-semibold" style={{ color: COLORS.heading }}>Values:</span> {coreValues || "-"}</div>
                    <div><span className="font-semibold" style={{ color: COLORS.heading }}>Audience:</span> {audience || "-"}</div>
                    <div><span className="font-semibold" style={{ color: COLORS.heading }}>Region:</span> {region || "-"}</div>
                    <div><span className="font-semibold" style={{ color: COLORS.heading }}>Objective:</span> {campaignObjective || "-"}</div>
                    <div><span className="font-semibold" style={{ color: COLORS.heading }}>Platforms:</span> {platforms.length > 0 ? platforms.join(", ") : "-"}</div>
                  </div>
                </div>
        
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Search by name"
                      className="rounded-xl border px-4 py-2 text-base w-[180px] bg-[#ebecf2] font-inter border-[#d6d7de]"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      style={{ fontFamily: "Inter" }}
                    />
                    <select
                      className="rounded-xl border px-4 py-2 text-base w-[180px] bg-[#ebecf2] font-inter border-[#d6d7de]"
                      value={sort}
                      onChange={e => setSort(e.target.value)}
                    >
                      <option value="Relevance">Relevance</option>
                      <option value="Followers">Followers</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Brand Fit Score">Brand Fit Score</option>
                    </select>
                  </div>
                </div>
        
                {/* Influencer Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pb-36">
                  {filteredInfluencers.length === 0 && (
                    <div className="text-center col-span-full text-[#9c9ca3]">No influencers found.</div>
                  )}
                  {filteredInfluencers.map((inf) => (
                    <div
                      key={inf.id}
                      className="bg-white rounded-2xl border border-[#d6d7de] px-7 py-6 flex flex-col relative"
                    >
                      <input
                        type="checkbox"
                        className="absolute top-6 right-6"
                        checked={shortlisted.includes(inf.id)}
                        onChange={e => {
                          setShortlisted(
                            e.target.checked
                              ? [...shortlisted, inf.id]
                              : shortlisted.filter(id => id !== inf.id)
                          )
                        }}
                      />
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 bg-[#f4f4fb] text-[#a475f9]">
                        {inf.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="mb-2">
                        <div className={`${FONT.h3} text-[#30234d]`}>{inf.name}</div>
                        <div className={`${FONT.small} text-[#9c9ca3] flex flex-wrap items-center gap-x-2 gap-y-1`}>
                          {inf.platforms.map((h, i) => (
                            <span key={i} className="flex items-center gap-1">
                              {getPlatformIcon(h)} {h === "Twitter" ? "X" : h}
                            </span>
                          ))}
                          <span className="ml-1">{inf.username}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 mb-2 text-sm">
                        <span><span className="font-semibold">Followers:</span> {inf.followers}</span>
                        <span><span className="font-semibold">Engagement:</span> {inf.engagement}</span>
                      </div>
                      <div className="font-bold mb-2 text-left" style={{ color: COLORS.highlight, fontSize: 18 }}>
                        Brand Fit Score <span className="font-extrabold">{inf.fit}%</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {inf.tags && inf.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={`${FONT.badge} bg-[#a475f9] text-white font-medium px-3 py-1 rounded-full`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className={`${FONT.body} text-[#30234d] mb-4`}>{inf.desc}</div>
                      <button
                        className="w-full py-2 rounded-lg border font-semibold border-[#7640ec] text-[#7640ec] mt-auto hover:bg-[#f4f4fb] transition"
                        style={{ fontFamily: "Inter" }}
                        onClick={() => { setSelectedInfluencer(inf); setStep(5); }}
                      >
                        View Details →
                      </button>
                    </div>
                  ))}
                </div>
        
                {/* Sticky CTA Buttons */}
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#d6d7de] z-30 py-4 flex gap-4 justify-center"
                  style={{ boxShadow: '0 -2px 12px 0 #eee' }}>
                  <button
                    className={`font-semibold rounded-xl px-6 py-3 ${shortlisted.length < 2 ? "bg-[#d6d7de] text-[#9c9ca3]" : "bg-[#7640ec] text-white"}`}
                    disabled={shortlisted.length < 2}
                    style={{ fontFamily: "Inter" }}
                    onClick={() => { setCompareList(shortlisted); setStep(7); }}
                  >Compare Selected</button>
                  <button
                    className={`font-semibold rounded-xl px-6 py-3 ${shortlisted.length === 0 ? "bg-[#d6d7de] text-[#9c9ca3]" : "bg-[#7640ec] text-white"}`}
                    disabled={shortlisted.length === 0}
                    style={{ fontFamily: "Inter" }}
                    onClick={() => setStep(6)}
                  >Shortlist Selected</button>
                  <button
                    className="font-semibold rounded-xl px-6 py-3 bg-white border border-[#7640ec] text-[#7640ec] hover:bg-[#f4f4fb]"
                    style={{ fontFamily: "Inter" }}
                    onClick={() => setShowExportModal(true)}
                  >Export List</button>
                  <button
                    className="font-semibold rounded-xl px-6 py-3 bg-white border border-[#7640ec] text-[#7640ec] hover:bg-[#f4f4fb]"
                    style={{ fontFamily: "Inter" }}
                    onClick={() => setShowCreateListModal(true)}
                  >Create List</button>
                </div>
              </div>
            )}
          </>
        )}
        
        {/* ---------- STEP 5: INFLUENCER DETAILS ---------- */}
        {step === 5 && selectedInfluencer && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border mt-10 p-10 shadow" style={{ borderColor: COLORS.border }}>
            <button
              className="mb-6 flex items-center gap-2 font-semibold text-[#7640ec] hover:underline"
              style={{ fontFamily: "Inter" }}
              onClick={() => setStep(4)}
            >← Back to Search</button>
            <div className="flex items-center gap-7 mb-7">
              <div className="rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold"
                style={{ background: COLORS.background, color: COLORS.highlight }}>
                {selectedInfluencer.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="font-bold text-xl text-[#30234d]">{selectedInfluencer.name}</div>
                <div className="flex gap-3 text-[#9c9ca3] items-center mt-1">
                  {selectedInfluencer.platforms.map((p, i) => (
                    <span key={i} className="flex items-center gap-1">{getPlatformIcon(p)} {p === "Twitter" ? "X" : p}</span>
                  ))}
                  <span>{selectedInfluencer.username}</span>
                </div>
              </div>
            </div>
        
            {/* Stats */}
            <div className="flex gap-7 mb-7">
              <div>
                <div className="text-[#a475f9] text-sm font-semibold">Followers</div>
                <div className="text-[#30234d] font-bold text-xl">{selectedInfluencer.followers}</div>
              </div>
              <div>
                <div className="text-[#a475f9] text-sm font-semibold">Engagement</div>
                <div className="text-[#30234d] font-bold text-xl">{selectedInfluencer.engagement}</div>
              </div>
              <div>
                <div className="text-[#a475f9] text-sm font-semibold">Brand Fit Score</div>
                <div className="text-[#30234d] font-bold text-xl">{selectedInfluencer.fit}%</div>
              </div>
            </div>
        
            {/* Details */}
            <div className="mb-5">
              <div className="font-semibold mb-1 text-[#7640ec]">Why this influencer?</div>
              <div className="text-[#30234d]">{selectedInfluencer.whyFit}</div>
            </div>
        
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <div className="font-medium mb-1 text-[#9c9ca3]">Key Content Themes</div>
                <div className="flex flex-wrap gap-2">
                  {selectedInfluencer.contentThemes && selectedInfluencer.contentThemes.map((t, i) => (
                    <span key={i} className="bg-[#f4f4fb] text-[#7640ec] font-medium px-3 py-1 rounded-full text-xs">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-medium mb-1 text-[#9c9ca3]">Audience Demographics</div>
                <div className="text-[#30234d]">{selectedInfluencer.audienceDemo || "Not specified"}</div>
              </div>
            </div>
        
            <div className="mb-6">
              <div className="font-medium mb-1 text-[#9c9ca3]">AI-Suggested Initial Outreach Angle</div>
              <div className="bg-[#f4f4fb] rounded-xl border px-4 py-3 text-[#30234d]">{selectedInfluencer.outreachAngle || "Not available"}</div>
            </div>
        
            <div className="flex justify-end mt-7">
              <button
                className={`rounded-xl px-7 py-3 text-lg font-semibold transition-all ${
                  shortlisted.includes(selectedInfluencer.id)
                    ? "bg-[#d6d7de] text-[#9c9ca3] cursor-not-allowed"
                    : "bg-[#7640ec] text-white hover:bg-[#a475f9]"
                }`}
                style={{ fontFamily: "Inter" }}
                onClick={() => {
                  if (!shortlisted.includes(selectedInfluencer.id)) {
                    setShortlisted([...shortlisted, selectedInfluencer.id]);
                    setToast({ show: true, text: "Added to shortlist!" });
                    setTimeout(() => setToast({ show: false }), 2000);
                  }
                }}
                disabled={shortlisted.includes(selectedInfluencer.id)}
              >
                {shortlisted.includes(selectedInfluencer.id) ? "Shortlisted" : "Add to Shortlist"}
              </button>
            </div>
          </div>
        )}
        
        {/* ---------- STEP 6: SHORTLIST ---------- */}
        {step === 6 && (
          <div className="max-w-7xl mx-auto pt-4">
            <h1 className={`${FONT.h2} mb-2`} style={{ color: COLORS.heading }}>Your Shortlist</h1>
            <p className="mb-6" style={{ color: COLORS.subtext }}>Review and manage your selected influencers</p>
            <div className="flex gap-3 mb-7">
              <button
                className={`bg-[#7640ec] text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2`}
                style={{ fontFamily: "Inter" }}
                onClick={() => { setCompareList(shortlisted); setStep(7); }}
                disabled={shortlisted.length < 2}
              >
                <span className="scale-110">⚖️</span> Compare Selected
              </button>
              <button
                className="border border-[#d6d7de] rounded-xl px-6 py-3 text-[#30234d] font-semibold flex items-center gap-2"
                style={{ fontFamily: "Inter" }}
                onClick={() => setShowCreateListModal(true)}
              >
                Create List
              </button>
              <button
                className="border border-[#d6d7de] rounded-xl px-6 py-3 text-[#30234d] font-semibold flex items-center gap-2"
                style={{ fontFamily: "Inter" }}
                onClick={() => setShowExportModal(true)}
              >
                <Download size={18} /> Export List
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {influencers.filter(inf => shortlisted.includes(inf.id)).map((inf) => (
                <div key={inf.id} className="bg-white rounded-2xl border border-[#d6d7de] px-7 py-6 flex flex-col relative">
                  <button
                    className="absolute top-6 right-6"
                    onClick={() => setShortlisted(shortlisted.filter(id => id !== inf.id))}
                  ><X size={18} /></button>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 bg-[#f4f4fb] text-[#a475f9]">
                    {inf.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="mb-2">
                    <div className={`${FONT.h3} text-[#30234d]`}>{inf.name}</div>
                    <div className={`${FONT.small} text-[#9c9ca3] flex flex-wrap items-center gap-x-2 gap-y-1`}>
                      {inf.platforms.map((p, i) => (
                        <span key={i} className="flex items-center gap-1">{getPlatformIcon(p)} {p === "Twitter" ? "X" : p}</span>
                      ))}
                      <span className="ml-1">{inf.username}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 mb-2 text-sm">
                    <span><span className="font-semibold">Followers:</span> {inf.followers}</span>
                    <span><span className="font-semibold">Engagement:</span> {inf.engagement}</span>
                  </div>
                  <div className="mb-4 text-xs">
                    <span className="font-semibold">Category:</span> {inf.category || "N/A"} <br />
                    <span className="font-semibold">Location:</span> {inf.location || "N/A"}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button
                      className="bg-[#30234d] text-white px-5 py-2 rounded-lg font-semibold"
                      onClick={() => { setSelectedInfluencer(inf); setStep(5); }}
                    >View Profile</button>
                    <button className="border border-[#d6d7de] px-5 py-2 rounded-lg font-medium">Contact</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-sm text-[#9c9ca3] mt-8">Last updated: {new Date().toLocaleDateString()}</div>
            <button
              className={`flex items-center gap-2 mt-5 ${FONT.button} text-[#7640ec] hover:underline`}
              onClick={() => setStep(4)}
              style={{ fontFamily: "Inter" }}
            >← Back to Search</button>
          </div>
        )}
        
        {/* ---------- STEP 7: COMPARE ---------- */}
        {step === 7 && (
          <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-30 overflow-y-auto">
            <div className="bg-white rounded-xl w-full max-w-5xl p-7 shadow-xl relative border border-[#d6d7de]">
              <button onClick={() => setStep(6)} className="absolute top-6 left-6 text-[#a475f9] hover:text-[#7640ec] font-semibold">
                ← Back to Shortlist
              </button>
              <h2 className={`${FONT.h2} mb-6 text-[#30234d] text-center`}>Compare Influencers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {influencers.filter(inf => compareList.includes(inf.id)).map((inf) => (
                  <div key={inf.id} className="rounded-lg border border-[#d6d7de] px-6 py-4">
                    <div className="flex items-center mb-2 gap-2">
                      <div className="w-10 h-10 bg-[#f4f4fb] text-[#7640ec] rounded-full flex items-center justify-center font-bold">
                        {inf.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-base text-[#30234d]">{inf.name}</div>
                        <div className="text-xs text-[#a475f9]">{inf.username}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs mb-2">
                      {inf.platforms.map((p, i) => (
                        <span key={i}>{getPlatformIcon(p)}</span>
                      ))}
                    </div>
                    <div className="border-t my-2 border-[#ebecf2]"></div>
                    <div className="text-xs mb-1"><span className="font-semibold">Followers</span>: {inf.followers}</div>
                    <div className="text-xs mb-1"><span className="font-semibold">Engagement Rate</span>: {inf.engagement}</div>
                    <div className="text-xs mb-1"><span className="font-semibold">Brand Fit Score</span>: <span className="font-semibold text-[#a475f9]">{inf.fit}%</span></div>
                    <div className="mt-2 text-xs"><span className="font-semibold">Why they're a fit</span>:<br />{inf.whyFit}</div>
                    <div className="mt-2 text-xs"><span className="font-semibold">Best for:</span> {inf.tags && inf.tags.join(", ")}</div>
                  </div>
                ))}
              </div>
        
              {/* Key Differences */}
              <div className="mb-5 bg-[#f4f4fb] border border-[#d6d7de] rounded-lg px-5 py-4 text-sm">
                <div className="mb-1 font-semibold text-[#7640ec]">Key Differences</div>
                <div className="flex flex-col md:flex-row gap-4 text-[#30234d]">
                  <div>
                    Highest Engagement: <span className="font-semibold text-[#a475f9]">
                      {(() => {
                        const top = influencers.filter(i => compareList.includes(i.id))
                          .reduce((prev, curr) => (parseFloat(curr.engagement) > parseFloat(prev.engagement) ? curr : prev), influencers[0]);
                        return `${top.name} – ${top.engagement}`;
                      })()}
                    </span>
                  </div>
                  <div>
                    Largest Reach: <span className="font-semibold text-[#a475f9]">
                      {(() => {
                        const top = influencers.filter(i => compareList.includes(i.id))
                          .reduce((prev, curr) =>
                            (parseInt(curr.followers.replace(/\D/g, "")) > parseInt(prev.followers.replace(/\D/g, "")) ? curr : prev), influencers[0]);
                        return `${top.name} – ${top.followers}`;
                      })()}
                    </span>
                  </div>
                </div>
              </div>
        
              {/* Sticky bottom bar for action buttons */}
              <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#d6d7de] z-40 py-4 flex justify-end pr-12 gap-4"
                style={{ boxShadow: '0 -2px 12px 0 #eee' }}>
                <button
                  onClick={() => setStep(6)}
                  className={`px-5 py-2 rounded-md border border-[#d6d7de] text-[#30234d] ${FONT.button} hover:bg-[#f4f4fb]`}
                  style={{ fontFamily: "Inter" }}
                >Back to Shortlist</button>
                <button
                  className="px-5 py-2 rounded-md bg-[#7640ec] text-white font-semibold hover:bg-[#a475f9]"
                  style={{ fontFamily: "Inter" }}
                  onClick={() => {
                    // Add all to shortlist if not present
                    const newToAdd = compareList.filter(id => !shortlisted.includes(id));
                    if (newToAdd.length) setShortlisted([...shortlisted, ...newToAdd]);
                    setStep(6);
                  }}
                >Add All to Shortlist</button>
              </div>
            </div>
        )}
        
        {/* ---------- EXPORT LIST MODAL ---------- */}
        <ExportListModal
          open={showExportModal}
          onClose={() => setShowExportModal(false)}
          influencerCount={shortlisted.length > 0 ? shortlisted.length : influencers.length}
          fileSize={`${((shortlisted.length > 0 ? shortlisted.length : influencers.length) * 0.021).toFixed(2)} MB`}
          onExport={async (email, format) => {
            try {
              setLoading(true);
              const res = await fetch('/api/export-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, format, influencerIds: shortlisted }),
              });
              if (!res.ok) throw new Error('Export failed');
              setToast({ show: true, text: "Export started! Check your email soon." });
              setShowExportModal(false);
              setSuccessType("exported");
              setShowSuccess(true);
            } catch {
              setToast({ show: true, text: "Failed to start export. Try again." });
            } finally {
              setLoading(false);
              setTimeout(() => setToast({ show: false }), 3000);
            }
          }}
        />
        
        {/* ---------- CREATE LIST MODAL ---------- */}
        <CreateListModal
          open={showCreateListModal}
          onClose={() => setShowCreateListModal(false)}
          influencerCount={shortlisted.length > 0 ? shortlisted.length : influencers.length}
          fileSize={`${((shortlisted.length > 0 ? shortlisted.length : influencers.length) * 0.021).toFixed(2)} MB`}
          onSave={async (name) => {
            try {
              setLoading(true);
              const res = await fetch('/api/save-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, influencerIds: shortlisted }),
              });
              if (!res.ok) throw new Error('Save failed');
              setLastSavedList(name || "Gen Z Launch Picks");
              setShowCreateListModal(false);
              setSuccessType("created");
              setShowSuccess(true);
              setToast({ show: true, text: "List saved successfully!" });
            } catch {
              setToast({ show: true, text: "Failed to save list. Try again." });
            } finally {
              setLoading(false);
              setTimeout(() => setToast({ show: false }), 3000);
            }
          }}
        />
        
        {/* ---------- SUCCESS MODAL ---------- */}
        <SuccessModal
          open={showSuccess}
          onClose={() => setShowSuccess(false)}
          onViewList={() => {
            setShowSuccess(false);
            setShowSavedList(true);
            setStep(99);
          }}
          action={successType}
        />
        
        {/* ---------- SAVED LIST SCREEN ---------- */}
        {showSavedList && (
          <SavedListScreen
            influencers={influencers.filter(inf => shortlisted.includes(inf.id))}
            listName={lastSavedList}
            onCreateNewList={() => { setShowSavedList(false); setShortlisted([]); setStep(1); }}
          />
        )}
