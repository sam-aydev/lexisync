import { useState } from "react";
import { Copy, Mail } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTwitter, FaThreads } from "react-icons/fa6";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ContentBlockProps {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
  contentToCopy: string;
}

function ContentBlock({
  label,
  icon: Icon,
  children,
  contentToCopy,
}: ContentBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contentToCopy);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 sm:mb-4 border-b border-ink/10 pb-2.5 sm:pb-3">
        <div className="flex items-center gap-1.5 sm:gap-2 text-ink">
          <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          <h3 className="font-bold text-xs sm:text-sm">{label}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 bg-paper rounded-lg hover:bg-ink/5 transition-colors text-[10px] sm:text-xs font-bold text-ink-soft hover:text-ink border border-ink/5 active:scale-95"
        >
          <Copy size={12} className="sm:w-3.5 sm:h-3.5" />
          {copied ? "Copied" : "Copy All"}
        </button>
      </div>

      <div className="flex-1 bg-paper/50 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-ink/5 shadow-inner">
        {children}
      </div>
    </div>
  );
}

export default function ExportWorkflows({ content }: { content: any }) {
  if (!content) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-1 sm:p-4">
      {/* Twitter (X) Outputs */}
      {content.twitter?.map((item: string | string[], index: number) => (
        <motion.div
          key={`tw-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-[1.25rem] sm:rounded-3xl p-4 sm:p-5 border border-ink/10 shadow-sm"
        >
          <ContentBlock
            label={`X (Twitter) Post ${index + 1}`}
            icon={FaTwitter}
            contentToCopy={Array.isArray(item) ? item.join("\n\n") : item}
          >
            <div className="space-y-2 sm:space-y-3">
              {Array.isArray(item) ? (
                item.map((tweet: string, tIndex: number) => (
                  <div
                    key={tIndex}
                    className="p-2.5 sm:p-3 bg-white border border-ink/5 rounded-lg sm:rounded-xl text-sm whitespace-pre-wrap break-words"
                  >
                    {tweet}
                  </div>
                ))
              ) : (
                <div className="text-sm whitespace-pre-wrap leading-relaxed text-ink/90 break-words">
                  {item}
                </div>
              )}
            </div>
          </ContentBlock>
        </motion.div>
      ))}

      {/* Threads Outputs */}
      {content.threads?.map((item: string | string[], index: number) => (
        <motion.div
          key={`th-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-[1.25rem] sm:rounded-3xl p-4 sm:p-5 border border-ink/10 shadow-sm"
        >
          <ContentBlock
            label={`Threads Post ${index + 1}`}
            icon={FaThreads}
            contentToCopy={Array.isArray(item) ? item.join("\n\n") : item}
          >
            <div className="space-y-2 sm:space-y-3">
              {Array.isArray(item) ? (
                item.map((post: string, tIndex: number) => (
                  <div
                    key={tIndex}
                    className="p-2.5 sm:p-3 bg-white border border-ink/5 rounded-lg sm:rounded-xl text-sm whitespace-pre-wrap break-words"
                  >
                    {post}
                  </div>
                ))
              ) : (
                <div className="text-sm whitespace-pre-wrap leading-relaxed text-ink/90 break-words">
                  {item}
                </div>
              )}
            </div>
          </ContentBlock>
        </motion.div>
      ))}

      {/* LinkedIn Outputs */}
      {content.linkedin?.map((post: string, index: number) => (
        <motion.div
          key={`li-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-[1.25rem] sm:rounded-3xl p-4 sm:p-5 border border-ink/10 shadow-sm lg:col-span-2"
        >
          <ContentBlock
            label={`LinkedIn Post ${index + 1}`}
            icon={FaLinkedin}
            contentToCopy={post}
          >
            <div className="text-sm whitespace-pre-wrap leading-relaxed text-ink/90 break-words">
              {post}
            </div>
          </ContentBlock>
        </motion.div>
      ))}

      {/* Instagram Outputs */}
      {content.instagram?.map((caption: string, index: number) => (
        <motion.div
          key={`ig-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-[1.25rem] sm:rounded-3xl p-4 sm:p-5 border border-ink/10 shadow-sm"
        >
          <ContentBlock
            label={`Instagram Caption ${index + 1}`}
            icon={FaInstagram}
            contentToCopy={caption}
          >
            <div className="text-sm whitespace-pre-wrap leading-relaxed text-ink/90 break-words">
              {caption}
            </div>
          </ContentBlock>
        </motion.div>
      ))}

      {/* Newsletter Outputs */}
      {content.newsletter?.map(
        (email: { subject: string; html: string }, index: number) => (
          <motion.div
            key={`nl-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[1.25rem] sm:rounded-3xl p-4 sm:p-5 border border-ink/10 shadow-sm lg:col-span-2"
          >
            <ContentBlock
              label={`Newsletter Draft ${index + 1}`}
              icon={Mail}
              contentToCopy={`Subject: ${email.subject}\n\n${email.html.replace(/<[^>]*>?/gm, "")}`}
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white border border-ink/10 p-2.5 sm:p-3 rounded-lg sm:rounded-xl">
                  <span className="text-[10px] sm:text-xs font-bold text-ink-soft uppercase tracking-widest block mb-1">
                    Subject Line
                  </span>
                  <span className="font-bold text-sm sm:text-base text-ink break-words">
                    {email.subject}
                  </span>
                </div>
                <div
                  className="prose prose-sm max-w-none text-ink/90 prose-p:leading-relaxed prose-a:text-signal break-words"
                  dangerouslySetInnerHTML={{ __html: email.html }}
                />
              </div>
            </ContentBlock>
          </motion.div>
        ),
      )}
    </div>
  );
}
