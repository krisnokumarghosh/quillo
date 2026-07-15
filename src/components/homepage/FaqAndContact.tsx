"use client";

import { manropeFont } from "@/lib/fonts";
import { successToast } from "@/lib/toasts";
import { ChevronDown } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  TextArea,
  TextField,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "Is Quillo free to use?",
    answer:
      "Yes, Quillo is completely free for writers to publish and share their stories. No hidden fees, no paywalls.",
  },
  {
    question: "Can I edit a post after publishing?",
    answer:
      "Absolutely. You can edit, update, or unpublish any of your posts anytime from your dashboard.",
  },
  {
    question: "Do I need coding knowledge to write here?",
    answer:
      "Not at all. Quillo uses a simple Markdown editor — no coding skills required, just write and format naturally.",
  },
  {
    question: "How do readers discover my posts?",
    answer:
      "Posts are discoverable through categories, tags, and search. Popular posts also get featured on the homepage.",
  },
];

const FaqItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-[#778DA9]/20 py-5">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left gap-4"
      >
        <span
          className={`${manropeFont.className} text-base md:text-lg font-semibold text-[#0D1B2A]`}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#0D1B2A]/5"
        >
          <ChevronDown className="w-4 h-4 text-[#0D1B2A]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-sm text-[#1B263B]/70 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqAndContact = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    successToast("Thanks for youe message. we'll get back to you soon.");
  };

  return (
    <section
      id="contact"
      className="relative w-full  bg-white py-15 md:py-28 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-sm font-semibold text-[#415A77] tracking-wide uppercase mb-3">
            FAQ &amp; Contact
          </span>
          <h2
            className={`${manropeFont.className} text-2xl md:text-4xl font-bold text-[#0D1B2A] tracking-tight`}
          >
            Questions? We&apos;ve got answers.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* FAQ Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>

          {/* Contact Form Column (static UI only) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-[#0D1B2A] rounded-3xl p-8 md:p-10 "
          >
            <h3
              className={`${manropeFont.className} text-xl font-bold text-[#E0E1DD] mb-1`}
            >
              Still have questions?
            </h3>
            <p className="text-sm text-[#778DA9] mb-6">
              Drop us a message, we&apos;ll get back to you soon.
            </p>

            <div>
              <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <TextField isRequired>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#778DA9]/25 text-[#E0E1DD] placeholder:text-[#778DA9] text-sm outline-none focus:ring-[#415A77] transition-colors duration-200"
                  />
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>
                <TextField isRequired>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#778DA9]/25 text-[#E0E1DD] placeholder:text-[#778DA9] text-sm outline-none focus:ring-[#415A77] transition-colors duration-200"
                  />
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>
                <TextField isRequired>
                  <TextArea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#778DA9]/25 text-[#E0E1DD] placeholder:text-[#778DA9] text-sm outline-none focus:ring-[#415A77] transition-colors duration-200 resize-none"
                  />
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>
                <Button
                  type="submit"
                  className="bg-[#415A77] text-[#E0E1DD] hover:bg-[#415A77]/90 mt-2"
                >
                  Send Message
                </Button>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaqAndContact;
