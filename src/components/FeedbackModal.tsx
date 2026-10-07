import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface FeedbackModalProps {
  type: 'feedback' | 'lost_found';
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  type,
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    serviceNo: '147',
    busStopCode: '01012',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  const isLostFound = type === 'lost_found';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-[#702082] text-white p-4 flex items-center justify-between">
          <h3 className="font-bold text-base text-white">
            {isLostFound ? 'Lost & Found Reporting' : 'Customer Feedback'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base">
              Submission Received!
            </h4>
            <p className="text-xs text-slate-600">
              {isLostFound
                ? 'Your lost item inquiry ticket #LFD-8942 has been filed with our depot teams.'
                : 'Thank you for your valuable feedback. Our team will review your report shortly.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs text-slate-700">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Your Full Name *
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Tan Wei Ming"
                className="w-full border border-slate-300 rounded-md p-2 text-xs focus:ring-2 focus:ring-[#702082]/30 focus:border-[#702082]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full border border-slate-300 rounded-md p-2 text-xs focus:ring-2 focus:ring-[#702082]/30 focus:border-[#702082]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="+65 9123 4567"
                  className="w-full border border-slate-300 rounded-md p-2 text-xs focus:ring-2 focus:ring-[#702082]/30 focus:border-[#702082]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Bus Service No.
                </label>
                <input
                  type="text"
                  value={formData.serviceNo}
                  onChange={(e) => setFormData({ ...formData, serviceNo: e.target.value })}
                  placeholder="e.g. 147"
                  className="w-full border border-slate-300 rounded-md p-2 text-xs focus:ring-2 focus:ring-[#702082]/30 focus:border-[#702082]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Bus Stop / Location
                </label>
                <input
                  type="text"
                  value={formData.busStopCode}
                  onChange={(e) => setFormData({ ...formData, busStopCode: e.target.value })}
                  placeholder="e.g. 01012 Hotel Grand Pacific"
                  className="w-full border border-slate-300 rounded-md p-2 text-xs focus:ring-2 focus:ring-[#702082]/30 focus:border-[#702082]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {isLostFound ? 'Item Description & Details *' : 'Your Feedback / Comment *'}
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={
                  isLostFound
                    ? 'Please specify item color, brand, location left on bus, etc.'
                    : 'Share your travel experience or suggestion...'
                }
                className="w-full border border-slate-300 rounded-md p-2 text-xs focus:ring-2 focus:ring-[#702082]/30 focus:border-[#702082]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 font-medium text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#702082] hover:bg-[#5b156a] text-white rounded-md font-semibold text-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
