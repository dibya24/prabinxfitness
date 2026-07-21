"use client";

import { useEffect, useState, useCallback } from "react";
import NextImage from "next/image";
import { 
  Save, Plus, Trash2, Upload, Video, CheckCircle, AlertCircle, RefreshCw, Pencil, X,
  Dumbbell, Apple, MonitorSmartphone, Trophy, Flame, Zap, Users, Target, Activity, Heart, Award, ShieldCheck, Layers
} from "lucide-react";
import { Stat, ServiceCard, Testimonial, GalleryItem } from "@prisma/client";

const SERVICE_ICONS = [
  { label: "Dumbbell (Fitness / Gym)", value: "Dumbbell" },
  { label: "Laptop / Mobile (Remote Coaching)", value: "MonitorSmartphone" },
  { label: "Apple (Nutrition & Diet)", value: "Apple" },
  { label: "Trophy (Achievements)", value: "Trophy" },
  { label: "Flame (HIIT / Fat Loss)", value: "Flame" },
  { label: "Zap (Power & Speed)", value: "Zap" },
  { label: "Users (Group & Partner Training)", value: "Users" },
  { label: "Target (Goal Setting)", value: "Target" },
  { label: "Activity (Cardio & Conditioning)", value: "Activity" },
  { label: "Heart (Health & Wellness)", value: "Heart" },
  { label: "Award (Certification)", value: "Award" },
  { label: "Shield Check (Safety & Form)", value: "ShieldCheck" },
  { label: "Layers (Custom Programming)", value: "Layers" },
  { label: "Video Clip", value: "Video" },
];

const GALLERY_CATEGORIES = [
  "COACHING",
  "STRENGTH",
  "CONDITIONING",
  "CLIENT STORY",
  "TRANSFORMATION",
  "WORKOUT",
];

export default function AdminPage() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Content States
  const [seo, setSeo] = useState({ title: "", description: "", keywords: "" });
  const [hero, setHero] = useState({ title: "", subtitle: "", description: "", image: "" });
  const [about, setAbout] = useState({
    backgroundTitle: "", title: "", highlightText: "", titleEnd: "", mainHeading: "", paragraph: ""
  });
  const [stats, setStats] = useState<Stat[]>([]);
  const [serviceSection, setServiceSection] = useState({
    backgroundTitle: "", title: "", highlightText: "", titleEnd: "", description: ""
  });
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [testimonialSection, setTestimonialSection] = useState({
    backgroundTitle: "", title: "", highlightText: "", titleEnd: "", description: ""
  });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  // Temp State for Adding Items
  const [newStat, setNewStat] = useState({ title: "", subtitle: "", dark: false });
  const [newService, setNewService] = useState({ title: "", description: "", icon: "Dumbbell", tags: "" });
  const [newTestimonial, setNewTestimonial] = useState({ name: "", location: "", text: "" });
  const [newGalleryItem, setNewGalleryItem] = useState({
    type: "image", src: "", poster: "", title: "", category: "COACHING", customCategory: "", size: "md"
  });

  // Edit Modal States
  const [editingService, setEditingService] = useState<ServiceCard | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);

  const showFeedback = useCallback((type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  }, []);

  // Fetch all CMS content
  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      if (res.ok) {
        setSeo(data.seo);
        setHero(data.hero);
        setAbout(data.about);
        setStats(data.stats);
        setServiceSection(data.serviceSection);
        setServices(data.services);
        setTestimonialSection(data.testimonialSection);
        setTestimonials(data.testimonials);
        setGalleryItems(data.galleryItems);
      } else {
        showFeedback("error", data.error || "Failed to load content data");
      }
    } catch (err) {
      console.error(err);
      showFeedback("error", "Error contacting the CMS API");
    } finally {
      setLoading(false);
    }
  }, [showFeedback]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchContent();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchContent]);

  // Generic Save Handler
  const handleSave = async (section: string, payload: unknown, customMessage?: string) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data: payload }),
      });
      const data = await res.json();
      if (res.ok) {
        showFeedback("success", customMessage || `${section.toUpperCase()} content saved successfully!`);
        fetchContent();
        return true;
      } else {
        showFeedback("error", data.error || `Failed to save ${section}`);
        return false;
      }
    } catch (err) {
      console.error(err);
      showFeedback("error", "Network error while saving changes");
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    showFeedback("success", "Uploading file to server...");
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        callback(data.url);
        showFeedback("success", "File uploaded successfully!");
      } else {
        showFeedback("error", data.error || "File upload failed");
      }
    } catch (err) {
      console.error(err);
      showFeedback("error", "Error uploading file to server");
    }
  };

  // Service Actions
  const handleAddService = async () => {
    if (!newService.title.trim() || !newService.description.trim()) {
      showFeedback("error", "Please provide a title and description for the service.");
      return;
    }
    const updatedCards = [
      ...services,
      {
        id: Date.now(),
        title: newService.title.trim(),
        description: newService.description.trim(),
        icon: newService.icon,
        tags: newService.tags.trim() || "Coaching",
      } as ServiceCard,
    ];
    const success = await handleSave("services", { sectionInfo: serviceSection, cards: updatedCards }, "Service added successfully!");
    if (success) {
      setNewService({ title: "", description: "", icon: "Dumbbell", tags: "" });
    }
  };

  const handleUpdateService = async () => {
    if (!editingService || !editingService.title.trim() || !editingService.description.trim()) {
      showFeedback("error", "Title and description are required.");
      return;
    }
    const updatedCards = services.map((s) => (s.id === editingService.id ? editingService : s));
    const success = await handleSave("services", { sectionInfo: serviceSection, cards: updatedCards }, "Service updated successfully!");
    if (success) {
      setEditingService(null);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const updatedCards = services.filter((s) => s.id !== id);
    await handleSave("services", { sectionInfo: serviceSection, cards: updatedCards }, "Service deleted successfully!");
  };

  // Testimonial Actions
  const handleAddTestimonial = async () => {
    if (!newTestimonial.name.trim() || !newTestimonial.text.trim()) {
      showFeedback("error", "Please enter the client name and testimonial review text.");
      return;
    }
    const updatedReviews = [
      ...testimonials,
      {
        id: Date.now(),
        name: newTestimonial.name.trim(),
        location: newTestimonial.location.trim() || "Dubai, UAE",
        text: newTestimonial.text.trim(),
      } as Testimonial,
    ];
    const success = await handleSave("testimonials", { testInfo: testimonialSection, reviews: updatedReviews }, "Testimonial added successfully!");
    if (success) {
      setNewTestimonial({ name: "", location: "", text: "" });
    }
  };

  const handleUpdateTestimonial = async () => {
    if (!editingTestimonial || !editingTestimonial.name.trim() || !editingTestimonial.text.trim()) {
      showFeedback("error", "Client name and review body are required.");
      return;
    }
    const updatedReviews = testimonials.map((t) => (t.id === editingTestimonial.id ? editingTestimonial : t));
    const success = await handleSave("testimonials", { testInfo: testimonialSection, reviews: updatedReviews }, "Testimonial updated successfully!");
    if (success) {
      setEditingTestimonial(null);
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial review?")) return;
    const updatedReviews = testimonials.filter((t) => t.id !== id);
    await handleSave("testimonials", { testInfo: testimonialSection, reviews: updatedReviews }, "Testimonial deleted successfully!");
  };

  // Gallery Actions
  const handleAddGalleryItem = async () => {
    if (!newGalleryItem.src.trim() || !newGalleryItem.title.trim()) {
      showFeedback("error", "Please provide a media source file URL and title label.");
      return;
    }
    const categoryName = newGalleryItem.category === "CUSTOM" && newGalleryItem.customCategory.trim() 
      ? newGalleryItem.customCategory.trim().toUpperCase() 
      : newGalleryItem.category;

    const updatedGallery = [
      ...galleryItems,
      {
        id: Date.now(),
        type: newGalleryItem.type,
        src: newGalleryItem.src.trim(),
        poster: newGalleryItem.poster.trim() || null,
        title: newGalleryItem.title.trim(),
        category: categoryName,
        size: newGalleryItem.size,
      } as GalleryItem,
    ];
    const success = await handleSave("gallery", updatedGallery, "Gallery media added successfully!");
    if (success) {
      setNewGalleryItem({
        type: "image", src: "", poster: "", title: "", category: "COACHING", customCategory: "", size: "md"
      });
    }
  };

  const handleUpdateGalleryItem = async () => {
    if (!editingGalleryItem || !editingGalleryItem.src.trim() || !editingGalleryItem.title.trim()) {
      showFeedback("error", "Source media URL and title are required.");
      return;
    }
    const updatedGallery = galleryItems.map((g) => (g.id === editingGalleryItem.id ? editingGalleryItem : g));
    const success = await handleSave("gallery", updatedGallery, "Gallery item updated successfully!");
    if (success) {
      setEditingGalleryItem(null);
    }
  };

  const handleDeleteGalleryItem = async (id: number) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    const updatedGallery = galleryItems.filter((g) => g.id !== id);
    await handleSave("gallery", updatedGallery, "Gallery item deleted successfully!");
  };

  // Tabs Definition
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "hero", label: "Hero" },
    { id: "about", label: "About & Stats" },
    { id: "services", label: "Services" },
    { id: "testimonials", label: "Testimonials" },
    { id: "gallery", label: "Gallery" },
    { id: "seo", label: "SEO Settings" },
  ];

  if (loading && !saving) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-[#E8A428] mx-auto" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Loading Content Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
      {/* Feedback Banner */}
      {message && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg border text-sm font-medium transition-all ${
          message.type === "success" 
            ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {message.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Header section */}
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[3px] text-red-600">Command Center</p>
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 uppercase mt-1">Admin Dashboard</h2>
      </div>

      {/* Navigation tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex flex-wrap gap-8 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview View */}
      {activeTab === "overview" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div 
            onClick={() => setActiveTab("hero")}
            className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-red-600 mb-1">Manage</p>
            <h3 className="text-xl font-extrabold text-slate-900 uppercase">Hero Section</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Update the main headline, subtitle, description, and hero banner image of Prabin.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab("about")}
            className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-red-600 mb-1">Manage</p>
            <h3 className="text-xl font-extrabold text-slate-900 uppercase">About & Stats</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Modify the story heading, biography description, and gym instructor certification stats.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab("services")}
            className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-red-600 mb-1">Manage</p>
            <h3 className="text-xl font-extrabold text-slate-900 uppercase">Services ({services.length})</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Add, edit, or remove personal training and remote coaching packages, titles, features, and icons.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab("testimonials")}
            className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-red-600 mb-1">Manage</p>
            <h3 className="text-xl font-extrabold text-slate-900 uppercase">Testimonials ({testimonials.length})</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Add, edit, or remove client feedback reviews, transformations, and location stories.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab("gallery")}
            className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-red-600 mb-1">Manage</p>
            <h3 className="text-xl font-extrabold text-slate-900 uppercase">Gallery ({galleryItems.length})</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Add, edit, or remove workout videos and transformation photos displayed in the slider.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab("seo")}
            className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-red-600 mb-1">Manage</p>
            <h3 className="text-xl font-extrabold text-slate-900 uppercase">SEO Settings</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Optimize search indexability. Edit metadata title, page descriptions, and keywords.
            </p>
          </div>
        </div>
      )}

      {/* ================= HERO EDITOR ================= */}
      {activeTab === "hero" && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 uppercase mb-6 pb-2 border-b border-slate-100">Edit Hero Banner</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Heading Title</label>
              <textarea
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                placeholder="e.g. Strength forged in Mountains. refined in the desert."
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Trainer Image</label>
                <div className="flex flex-col gap-3">
                  {hero.image && (
                    <div className="relative h-40 w-40 overflow-hidden rounded-lg border border-slate-200 bg-slate-900 flex items-center justify-center">
                      <NextImage src={hero.image} alt="Trainer Preview" width={160} height={160} unoptimized className="h-full w-full object-contain" />
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                      <Upload size={14} />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (url) => setHero({ ...hero, image: url }))}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={hero.image}
                      onChange={(e) => setHero({ ...hero, image: e.target.value })}
                      placeholder="Or enter image URL"
                      className="flex-grow rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-slate-600 focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Subtitle Location/Tag</label>
                <input
                  type="text"
                  value={hero.subtitle}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  placeholder="UK-Certified Personal Trainer | Dubai, UAE"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Short Introduction Paragraph</label>
              <textarea
                value={hero.description}
                onChange={(e) => setHero({ ...hero, description: e.target.value })}
                rows={4}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                placeholder="I'm Prabin, a UK-certified Personal Trainer helping people build..."
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => handleSave("hero", hero)}
                disabled={saving}
                className="flex items-center gap-2 cursor-pointer rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                <Save size={14} />
                <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ABOUT EDITOR ================= */}
      {activeTab === "about" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 uppercase mb-6 pb-2 border-b border-slate-100">Edit Story Page Texts</h3>
            
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Background Title (Watermark)</label>
                  <input
                    type="text"
                    value={about.backgroundTitle}
                    onChange={(e) => setAbout({ ...about, backgroundTitle: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Main Heading Line 1</label>
                  <input
                    type="text"
                    value={about.title}
                    onChange={(e) => setAbout({ ...about, title: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Highlight Accent Text</label>
                  <input
                    type="text"
                    value={about.highlightText}
                    onChange={(e) => setAbout({ ...about, highlightText: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Main Heading Line 1 End</label>
                  <input
                    type="text"
                    value={about.titleEnd}
                    onChange={(e) => setAbout({ ...about, titleEnd: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Story Bold Subtitle</label>
                <textarea
                  value={about.mainHeading}
                  onChange={(e) => setAbout({ ...about, mainHeading: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Story Paragraph Body</label>
                <textarea
                  value={about.paragraph}
                  onChange={(e) => setAbout({ ...about, paragraph: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => handleSave("about", about)}
                  disabled={saving}
                  className="flex items-center gap-2 cursor-pointer rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition disabled:opacity-50"
                >
                  <Save size={14} />
                  <span>Save Page Texts</span>
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 uppercase mb-6 pb-2 border-b border-slate-100">Manage Certification & Stats</h3>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mb-6">
              {stats.map((s, index) => (
                <div key={index} className="relative rounded-lg border border-gray-200 bg-slate-50 p-4">
                  <button 
                    onClick={() => {
                      const updated = stats.filter((_, idx) => idx !== index);
                      setStats(updated);
                    }}
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                  <p className="text-lg font-bold text-slate-900">{s.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.subtitle}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${s.dark ? "bg-slate-900" : "bg-yellow-500"}`}></span>
                    <span className="text-[10px] uppercase font-bold text-slate-600">{s.dark ? "Dark Theme" : "Light Theme"}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-dashed border-gray-300 p-4 bg-slate-50/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Add Statistic / Badge</h4>
              <div className="grid gap-4 sm:grid-cols-3 items-end">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Stat Title (e.g. 50+)</label>
                  <input
                    type="text"
                    value={newStat.title}
                    onChange={(e) => setNewStat({ ...newStat, title: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
                    placeholder="e.g. 100+"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Subtitle (e.g. Clients)</label>
                  <input
                    type="text"
                    value={newStat.subtitle}
                    onChange={(e) => setNewStat({ ...newStat, subtitle: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
                    placeholder="e.g. Active Clients"
                  />
                </div>
                <div className="flex items-center gap-4 py-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newStat.dark}
                      onChange={(e) => setNewStat({ ...newStat, dark: e.target.checked })}
                      className="rounded text-red-600"
                    />
                    <span>Dark Colored Card</span>
                  </label>
                  
                  <button
                    onClick={() => {
                      if (!newStat.title || !newStat.subtitle) return;
                      setStats([...stats, { ...newStat, id: Date.now() }]);
                      setNewStat({ title: "", subtitle: "", dark: false });
                    }}
                    className="flex items-center gap-1.5 cursor-pointer rounded-md bg-slate-900 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800 transition ml-auto"
                  >
                    <Plus size={12} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end mt-6">
              <button
                onClick={() => handleSave("stats", stats)}
                disabled={saving}
                className="flex items-center gap-2 cursor-pointer rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                <Save size={14} />
                <span>Save Stats List</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SERVICES EDITOR ================= */}
      {activeTab === "services" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 uppercase mb-6 pb-2 border-b border-slate-100">Edit Services Section Header</h3>
            
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Background Title (Watermark)</label>
                  <input
                    type="text"
                    value={serviceSection.backgroundTitle}
                    onChange={(e) => setServiceSection({ ...serviceSection, backgroundTitle: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Main Heading Line 1</label>
                  <input
                    type="text"
                    value={serviceSection.title}
                    onChange={(e) => setServiceSection({ ...serviceSection, title: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Highlight Accent Text</label>
                  <input
                    type="text"
                    value={serviceSection.highlightText}
                    onChange={(e) => setServiceSection({ ...serviceSection, highlightText: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Main Heading Line 1 End</label>
                  <input
                    type="text"
                    value={serviceSection.titleEnd}
                    onChange={(e) => setServiceSection({ ...serviceSection, titleEnd: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Services Subtext description</label>
                <textarea
                  value={serviceSection.description}
                  onChange={(e) => setServiceSection({ ...serviceSection, description: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => handleSave("services", { sectionInfo: serviceSection, cards: services }, "Services Section header updated!")}
                  disabled={saving}
                  className="flex items-center gap-2 cursor-pointer rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition disabled:opacity-50"
                >
                  <Save size={14} />
                  <span>Save Section Header</span>
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 uppercase">Manage Service Offerings ({services.length})</h3>
            </div>

            {/* List of services with Edit & Delete */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-8">
              {services.map((c) => (
                <div key={c.id} className="relative rounded-xl border border-gray-200 bg-slate-50 p-5 flex flex-col justify-between shadow-sm hover:shadow transition">
                  <div>
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button 
                        onClick={() => setEditingService(c)}
                        title="Edit Service"
                        className="rounded p-1.5 text-slate-500 hover:bg-white hover:text-blue-600 border border-transparent hover:border-slate-200 transition cursor-pointer"
                      >
                        <Pencil size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteService(c.id)}
                        title="Delete Service"
                        className="rounded p-1.5 text-slate-500 hover:bg-white hover:text-red-600 border border-transparent hover:border-slate-200 transition cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="bg-red-50 border border-red-100 rounded-lg p-2 text-red-600 w-10 h-10 flex items-center justify-center font-bold text-xs uppercase mb-3">
                      {c.icon.slice(0, 3)}
                    </div>
                    <p className="text-base font-bold text-slate-900 uppercase pr-14">{c.title}</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{c.description}</p>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-1 border-t border-slate-200 pt-3">
                    {c.tags.split(",").map((tag: string, tid: number) => (
                      <span key={tid} className="bg-slate-200/80 rounded px-2 py-0.5 text-[10px] uppercase font-bold text-slate-700">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Add service form */}
            <div className="rounded-xl border border-dashed border-gray-300 p-6 bg-slate-50/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-1.5">
                <Plus size={14} className="text-red-600" />
                <span>Add New Service Offering</span>
              </h4>
              
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Service Title</label>
                    <input
                      type="text"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none"
                      placeholder="e.g. 1-on-1 Personal Training"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Icon</label>
                    <select
                      value={newService.icon}
                      onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
                    >
                      {SERVICE_ICONS.map((ic) => (
                        <option key={ic.value} value={ic.value}>{ic.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Service Features & Description</label>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none"
                    placeholder="Describe what is included in this training program..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tags (Comma-separated)</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newService.tags}
                      onChange={(e) => setNewService({ ...newService, tags: e.target.value })}
                      className="flex-grow rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none"
                      placeholder="e.g. Strength, HIIT, Nutrition"
                    />
                    
                    <button
                      onClick={handleAddService}
                      disabled={saving}
                      className="flex items-center gap-1.5 cursor-pointer rounded-lg bg-slate-900 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800 transition disabled:opacity-50 shrink-0"
                    >
                      <Plus size={14} />
                      <span>{saving ? "Saving..." : "Add & Save Service"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TESTIMONIALS EDITOR ================= */}
      {activeTab === "testimonials" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 uppercase mb-6 pb-2 border-b border-slate-100">Edit Testimonials Section Header</h3>
            
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Background Title (Watermark)</label>
                  <input
                    type="text"
                    value={testimonialSection.backgroundTitle}
                    onChange={(e) => setTestimonialSection({ ...testimonialSection, backgroundTitle: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Main Heading Line 1</label>
                  <input
                    type="text"
                    value={testimonialSection.title}
                    onChange={(e) => setTestimonialSection({ ...testimonialSection, title: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Highlight Accent Text</label>
                  <input
                    type="text"
                    value={testimonialSection.highlightText}
                    onChange={(e) => setTestimonialSection({ ...testimonialSection, highlightText: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Main Heading Line 1 End</label>
                  <input
                    type="text"
                    value={testimonialSection.titleEnd}
                    onChange={(e) => setTestimonialSection({ ...testimonialSection, titleEnd: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Testimonials Subtext description</label>
                <textarea
                  value={testimonialSection.description}
                  onChange={(e) => setTestimonialSection({ ...testimonialSection, description: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => handleSave("testimonials", { testInfo: testimonialSection, reviews: testimonials }, "Testimonials Section header updated!")}
                  disabled={saving}
                  className="flex items-center gap-2 cursor-pointer rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition disabled:opacity-50"
                >
                  <Save size={14} />
                  <span>Save Section Header</span>
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 uppercase mb-6 pb-2 border-b border-slate-100">Manage Client Reviews ({testimonials.length})</h3>

            {/* List with Edit & Delete */}
            <div className="space-y-4 mb-8">
              {testimonials.map((r) => (
                <div key={r.id} className="relative rounded-xl border border-gray-200 bg-slate-50 p-5 shadow-sm hover:shadow transition">
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <button 
                      onClick={() => setEditingTestimonial(r)}
                      title="Edit Review"
                      className="rounded p-1.5 text-slate-500 hover:bg-white hover:text-blue-600 border border-transparent hover:border-slate-200 transition cursor-pointer"
                    >
                      <Pencil size={15} />
                    </button>
                    <button 
                      onClick={() => handleDeleteTestimonial(r.id)}
                      title="Delete Review"
                      className="rounded p-1.5 text-slate-500 hover:bg-white hover:text-red-600 border border-transparent hover:border-slate-200 transition cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  
                  <p className="text-sm italic text-slate-700 pr-16">&quot;{r.text}&quot;</p>
                  <div className="mt-3 flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-900 uppercase">{r.name}</p>
                    <span className="text-[11px] font-medium text-slate-400">— {r.location}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add testimonial form */}
            <div className="rounded-xl border border-dashed border-gray-300 p-6 bg-slate-50/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-1.5">
                <Plus size={14} className="text-red-600" />
                <span>Create New Testimonial Card</span>
              </h4>
              
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Client Name</label>
                    <input
                      type="text"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none"
                      placeholder="e.g. Subash Acharya"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Client Location / Country</label>
                    <input
                      type="text"
                      value={newTestimonial.location}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none"
                      placeholder="e.g. Dubai, UAE"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Review Body Text</label>
                  <textarea
                    value={newTestimonial.text}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none mb-3"
                    placeholder="Enter what the client said about their transformation..."
                  />
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddTestimonial}
                      disabled={saving}
                      className="flex items-center gap-1.5 cursor-pointer rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800 transition disabled:opacity-50"
                    >
                      <Plus size={14} />
                      <span>{saving ? "Saving..." : "Add & Save Testimonial"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= GALLERY EDITOR ================= */}
      {activeTab === "gallery" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 uppercase mb-6 pb-2 border-b border-slate-100">Manage Transformation Gallery ({galleryItems.length})</h3>

            {/* List with Edit & Delete */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-8">
              {galleryItems.map((g) => (
                <div key={g.id} className="relative rounded-xl border border-gray-200 bg-slate-50 p-4 flex flex-col justify-between shadow-sm hover:shadow transition">
                  <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
                    <button 
                      onClick={() => setEditingGalleryItem(g)}
                      title="Edit Media"
                      className="text-slate-600 bg-white border border-slate-200 hover:text-blue-600 rounded p-1.5 shadow-sm cursor-pointer"
                    >
                      <Pencil size={13} />
                    </button>
                    <button 
                      onClick={() => handleDeleteGalleryItem(g.id)}
                      title="Delete Media"
                      className="text-slate-600 bg-white border border-slate-200 hover:text-red-600 rounded p-1.5 shadow-sm cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="relative h-40 w-full overflow-hidden rounded-lg bg-black flex items-center justify-center">
                    {g.type === "video" ? (
                      <div className="text-center text-slate-300 flex flex-col items-center">
                        <Video size={36} className="text-[#E8A428] mb-1.5" />
                        <span className="text-[10px] font-bold tracking-wider uppercase">VIDEO CLIP</span>
                        <span className="text-[9px] text-slate-400 max-w-[180px] truncate px-2 mt-1">{g.src}</span>
                      </div>
                    ) : (
                      <NextImage src={g.src} alt={g.title} width={200} height={160} unoptimized className="h-full w-full object-cover" />
                    )}
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-bold text-slate-900 truncate uppercase pr-12">{g.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="bg-red-50 rounded px-2 py-0.5 text-[9px] uppercase font-bold text-red-600 border border-red-100">
                        {g.category}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-slate-500">
                        Size: {g.size}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add gallery item form */}
            <div className="rounded-xl border border-dashed border-gray-300 p-6 bg-slate-50/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-1.5">
                <Plus size={14} className="text-red-600" />
                <span>Add New Media to Gallery</span>
              </h4>
              
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Media Type</label>
                  <select
                    value={newGalleryItem.type}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, type: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="image">Image (Photo)</option>
                    <option value="video">Video (MP4/MOV)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Category Tag</label>
                  <select
                    value={newGalleryItem.category}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
                  >
                    {GALLERY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="CUSTOM">+ Custom Category...</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tile Layout Size</label>
                  <select
                    value={newGalleryItem.size}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, size: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="md">Medium (Standard Tile)</option>
                    <option value="lg">Large (Wide Tile)</option>
                  </select>
                </div>
              </div>

              {newGalleryItem.category === "CUSTOM" && (
                <div className="mt-3">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Custom Category Name</label>
                  <input
                    type="text"
                    value={newGalleryItem.customCategory}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, customCategory: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none"
                    placeholder="e.g. DIET PLAN, RECOVERY, COMPETITION"
                  />
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Media Title / Description Label</label>
                  <input
                    type="text"
                    value={newGalleryItem.title}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none"
                    placeholder="e.g. Deadlift Heavy Set / 6 Month Transformation"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Media File Upload</label>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-1.5 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shrink-0">
                      <Upload size={13} />
                      <span>Choose File</span>
                      <input
                        type="file"
                        accept={newGalleryItem.type === "video" ? "video/*" : "image/*"}
                        onChange={(e) => handleImageUpload(e, (url) => setNewGalleryItem({ ...newGalleryItem, src: url }))}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={newGalleryItem.src}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, src: e.target.value })}
                      placeholder="Or enter file URL"
                      className="flex-grow rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {newGalleryItem.type === "video" && (
                <div className="mt-4">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Video Thumbnail Poster (Optional Image)</label>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-1.5 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shrink-0">
                      <Upload size={13} />
                      <span>Upload Poster</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (url) => setNewGalleryItem({ ...newGalleryItem, poster: url }))}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={newGalleryItem.poster}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, poster: e.target.value })}
                      placeholder="Poster Image URL"
                      className="flex-grow rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-slate-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAddGalleryItem}
                  disabled={saving}
                  className="flex items-center gap-1.5 cursor-pointer rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800 transition disabled:opacity-50"
                >
                  <Plus size={14} />
                  <span>{saving ? "Saving..." : "Add & Save Gallery Item"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SEO EDITOR ================= */}
      {activeTab === "seo" && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 uppercase mb-6 pb-2 border-b border-slate-100">Edit Search Engine Optimization (SEO)</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Meta Page Title</label>
              <input
                type="text"
                value={seo.title}
                onChange={(e) => setSeo({ ...seo, title: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                placeholder="PrabinXFitness | UK Certified Personal Trainer in Dubai"
              />
              <p className="text-[10px] text-slate-400 mt-1">Recommended length: 50-60 characters. Shows up in browser tabs and search results.</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Meta Description</label>
              <textarea
                value={seo.description}
                onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                placeholder="UK-certified Level 2 Gym Instructor and Level 3 Personal Trainer helping clients..."
              />
              <p className="text-[10px] text-slate-400 mt-1">Recommended length: 150-160 characters. Summarizes page content in Google search listings.</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Keywords (Comma-separated)</label>
              <textarea
                value={seo.keywords}
                onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none"
                placeholder="Personal Trainer Dubai, Weight Loss Coach Dubai, Gym Transformation"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => handleSave("seo", seo)}
                disabled={saving}
                className="flex items-center gap-2 cursor-pointer rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                <Save size={14} />
                <span>Save SEO Tags</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL: SERVICE ================= */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold uppercase text-slate-900">Edit Service Package</h3>
              <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Service Title</label>
              <input
                type="text"
                value={editingService.title}
                onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Icon</label>
              <select
                value={editingService.icon}
                onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800"
              >
                {SERVICE_ICONS.map((ic) => (
                  <option key={ic.value} value={ic.value}>{ic.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Description</label>
              <textarea
                value={editingService.description}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tags (Comma-separated)</label>
              <input
                type="text"
                value={editingService.tags}
                onChange={(e) => setEditingService({ ...editingService, tags: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                onClick={() => setEditingService(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateService}
                disabled={saving}
                className="rounded-lg bg-red-600 px-5 py-2 text-xs font-bold uppercase text-white hover:bg-red-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL: TESTIMONIAL ================= */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold uppercase text-slate-900">Edit Client Testimonial</h3>
              <button onClick={() => setEditingTestimonial(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Client Name</label>
                <input
                  type="text"
                  value={editingTestimonial.name}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Location</label>
                <input
                  type="text"
                  value={editingTestimonial.location}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Review Body Text</label>
              <textarea
                value={editingTestimonial.text}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                onClick={() => setEditingTestimonial(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTestimonial}
                disabled={saving}
                className="rounded-lg bg-red-600 px-5 py-2 text-xs font-bold uppercase text-white hover:bg-red-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL: GALLERY ================= */}
      {editingGalleryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold uppercase text-slate-900">Edit Gallery Item</h3>
              <button onClick={() => setEditingGalleryItem(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Media Type</label>
                <select
                  value={editingGalleryItem.type}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, type: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Category</label>
                <input
                  type="text"
                  value={editingGalleryItem.category}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, category: e.target.value.toUpperCase() })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800 uppercase"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tile Size</label>
                <select
                  value={editingGalleryItem.size}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, size: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800"
                >
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Media Title</label>
              <input
                type="text"
                value={editingGalleryItem.title}
                onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Media Source URL</label>
              <div className="flex gap-2">
                <label className="flex items-center gap-1.5 cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shrink-0">
                  <Upload size={13} />
                  <span>Replace</span>
                  <input
                    type="file"
                    accept={editingGalleryItem.type === "video" ? "video/*" : "image/*"}
                    onChange={(e) => handleImageUpload(e, (url) => setEditingGalleryItem({ ...editingGalleryItem, src: url }))}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  value={editingGalleryItem.src}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, src: e.target.value })}
                  className="flex-grow rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800"
                />
              </div>
            </div>

            {editingGalleryItem.type === "video" && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Video Poster Image URL</label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shrink-0">
                    <Upload size={13} />
                    <span>Upload Poster</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, (url) => setEditingGalleryItem({ ...editingGalleryItem, poster: url }))}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    value={editingGalleryItem.poster || ""}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, poster: e.target.value })}
                    className="flex-grow rounded-lg border border-gray-300 px-3 py-2 text-xs text-slate-800"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                onClick={() => setEditingGalleryItem(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateGalleryItem}
                disabled={saving}
                className="rounded-lg bg-red-600 px-5 py-2 text-xs font-bold uppercase text-white hover:bg-red-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
