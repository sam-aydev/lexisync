"use client";

import { useState } from "react";
import { Check, Copy, Mail, Heart, MessageCircle, Send } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";

interface ExportWorkflowsProps {
  content: {
    twitter: string[];
    threads: string[];
    linkedin: string;
    instagram: string;
    newsletter: {
      subject: string;
      html: string;
    };
  };
}

export default function ExportWorkflows({ content }: ExportWorkflowsProps) {
  const [copied, setCopied] = useState<
    "twitter" | "threads" | "linkedin" | "instagram" | "newsletter" | null
  >(null);

  const handleCopy = async (
    type: keyof ExportWorkflowsProps["content"],
    text: string,
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:mt-12 md:mt-7 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* 1. X / Twitter Native Thread */}
      <div className="bg-white border border-ink/10 rounded-2xl flex flex-col shadow-sm overflow-hidden h-80 xl:h-125">
        <div className="px-4 py-3 border-b border-ink/5 bg-paper/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FaTwitter size={16} className="text-ink" fill="currentColor" />
            <span className="text-sm font-bold text-ink">
              X Thread{" "}
              <span className="text-ink-soft font-medium">
                ({content?.twitter.length})
              </span>
            </span>
          </div>
          <button
            onClick={() => handleCopy("twitter", content?.twitter.join("\n\n"))}
            className="text-xs font-bold text-signal bg-signal/10 hover:bg-signal/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copied === "twitter" ? (
              <>
                <Check size={14} /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy All
              </>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-0 bg-white">
          {content?.twitter.map((tweet, i) => (
            <div key={i} className="relative flex gap-3 pb-6">
              {i !== content.twitter.length - 1 && (
                <div className="absolute top-10 bottom-0 left-[19px] w-[2px] bg-ink/10" />
              )}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-signal to-[#FF5B39] text-white flex items-center justify-center font-bold text-sm shrink-0 z-10">
                AS
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-1.5 leading-none mb-1">
                  <span className="font-bold text-ink text-[15px]">
                    Adetunji Samuel
                  </span>
                  <span className="text-ink-soft text-[14px]">@adetunji</span>
                </div>
                <p className="text-[15px] leading-snug text-ink whitespace-pre-wrap mt-1">
                  {tweet}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Threads (Meta) Native Format */}
      <div className="bg-white border border-ink/10 rounded-2xl flex flex-col shadow-sm overflow-hidden h-80 xl:h-125">
        <div className="px-4 py-3 border-b border-ink/5 bg-ink text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {/* Custom Threads Logo */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
              <path d="M15.5 10.5C16.8807 10.5 18 11.6193 18 13C18 14.3807 16.8807 15.5 15.5 15.5C14.1193 15.5 13 14.3807 13 13C13 11.6193 14.1193 10.5 15.5 10.5Z" />
              <path d="M13 15.5V13C13 11.6193 11.8807 10.5 10.5 10.5C9.11929 10.5 8 11.6193 8 13C8 14.3807 9.11929 15.5 10.5 15.5H13" />
            </svg>
            <span className="text-sm font-bold">
              Threads{" "}
              <span className="text-paper-dim/60 font-medium">
                ({content?.threads.length})
              </span>
            </span>
          </div>
          <button
            onClick={() => handleCopy("threads", content.threads.join("\n\n"))}
            className="text-xs font-bold text-ink bg-white hover:bg-paper px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copied === "threads" ? (
              <>
                <Check size={14} /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy All
              </>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-0 bg-white">
          {content?.threads.map((threadPost, i) => (
            <div key={i} className="relative flex gap-3 pb-6">
              {i !== content.threads.length - 1 && (
                <div className="absolute top-10 bottom-1 left-[19px] w-[2px] bg-ink/15 rounded-full" />
              )}
              {/* Threads uses a smaller, cleaner avatar loop */}
              <div className="flex flex-col items-center z-10 shrink-0">
                <div className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center font-bold text-sm">
                  AS
                </div>
              </div>

              <div className="flex-1 pb-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-ink text-[14px]">
                    adetunji
                  </span>
                  <span className="text-ink-faint text-[12px]">2h</span>
                </div>
                <p className="text-[14px] leading-relaxed text-ink whitespace-pre-wrap">
                  {threadPost}
                </p>
                <div className="flex gap-4 mt-3 text-ink-soft">
                  <Heart size={16} /> <MessageCircle size={16} />{" "}
                  <Send size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. LinkedIn Native Format */}
      <div className="bg-white border border-ink/10 rounded-2xl flex flex-col shadow-sm overflow-hidden h-80 xl:h-125">
        <div className="px-4 py-3 border-b border-ink/5 bg-[#0077b5]/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FaLinkedin
              size={16}
              className="text-[#0077b5]"
              fill="currentColor"
            />
            <span className="text-sm font-bold text-ink">LinkedIn Post</span>
          </div>
          <button
            onClick={() => handleCopy("linkedin", content.linkedin)}
            className="text-xs font-bold text-[#0077b5] bg-[#0077b5]/10 hover:bg-[#0077b5]/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copied === "linkedin" ? (
              <>
                <Check size={14} /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy Text
              </>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-signal to-[#FF5B39] text-white flex items-center justify-center font-bold text-lg shrink-0">
              AS
            </div>
            <div>
              <p className="font-bold text-[15px] text-ink leading-tight">
                Adetunji Samuel
              </p>
              <p className="text-[12px] text-ink-soft">
                Fullstack Developer | Building Fractal
              </p>
              <p className="text-[11px] text-ink-faint mt-0.5 flex items-center gap-1">
                Just now • 🌐
              </p>
            </div>
          </div>
          <p className="text-[14px] leading-relaxed text-ink whitespace-pre-wrap">
            {content?.linkedin}
          </p>
        </div>
      </div>

      {/* 4. Instagram Caption Format */}
      <div className="bg-white border border-ink/10 rounded-2xl flex flex-col shadow-sm overflow-hidden h-80 xl:h-125">
        {/* Instagram Gradient Header */}
        <div className="px-4 py-3 border-b border-ink/5 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FaInstagram size={16} />
            <span className="text-sm font-bold">IG Caption</span>
          </div>
          <button
            onClick={() => handleCopy("instagram", content.instagram)}
            className="text-xs font-bold text-ink bg-white hover:bg-paper px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            {copied === "instagram" ? (
              <>
                <Check size={14} /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy Text
              </>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white flex flex-col">
          {/* Mock Instagram Image Placeholder */}
          <div className="w-full aspect-square bg-paper-dim/40 border-b border-ink/5 flex items-center justify-center shrink-0">
            <div className="text-center text-ink-faint">
              <FaInstagram size={32} className="mx-auto mb-2 opacity-50" />
              <span className="text-xs font-medium">Post Visual</span>
            </div>
          </div>

          {/* IG Actions & Caption */}
          <div className="p-4">
            <div className="flex gap-4 mb-3 text-ink">
              <Heart size={20} /> <MessageCircle size={20} /> <Send size={20} />
            </div>
            <p className="text-[14px] leading-relaxed text-ink whitespace-pre-wrap">
              <span className="font-bold mr-2">adetunji</span>
              {content?.instagram}
            </p>
          </div>
        </div>
      </div>

      {/* 5. Newsletter HTML Format */}
      <div className="bg-white border border-ink/10 rounded-2xl flex flex-col shadow-sm overflow-hidden h-80 xl:h-125">
        <div className="px-4 py-3 border-b border-ink/5 bg-paper/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-ink" />
            <span className="text-sm font-bold text-ink">Newsletter</span>
          </div>
          <button
            onClick={() => handleCopy("newsletter", content?.newsletter.html)}
            className="text-xs font-bold text-signal bg-signal/10 hover:bg-signal/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copied === "newsletter" ? (
              <>
                <Check size={14} /> HTML Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy HTML
              </>
            )}
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="px-5 py-3 border-b border-ink/5 bg-paper-dim/10 shrink-0 text-sm">
            <div className="flex gap-4 mb-1">
              <span className="text-ink-faint w-10">To:</span>
              <span className="text-ink font-medium">Your Subscribers</span>
            </div>
            <div className="flex gap-4">
              <span className="text-ink-faint w-10">Subj:</span>
              <span className="text-ink font-bold">
                {content?.newsletter.subject}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <div
              className="prose prose-sm max-w-none text-[15px] leading-relaxed prose-p:text-ink prose-a:text-signal prose-headings:font-display prose-headings:text-ink"
              dangerouslySetInnerHTML={{ __html: content?.newsletter.html }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
