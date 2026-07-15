import { manropeFont } from "@/lib/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Quillo",
  description: "Learn how Quillo collects, uses, and protects your personal information.",
};

const sections = [
  {
    id: "overview",
    title: "1. Overview",
    content: (
      <p>
        This Privacy Policy explains how Quillo (&quot;we&quot;, &quot;us&quot;, or
        &quot;our&quot;) collects, uses, stores, and protects your personal
        information when you use our blogging platform. By using our
        services, you agree to the practices described in this policy.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: (
      <>
        <p>We collect the following types of information:</p>
        <ul>
          <li>Account information such as your name, email address, and profile photo.</li>
          <li>Authentication data when you sign in through Google or other providers.</li>
          <li>Content you create, including blog posts, comments, and drafts.</li>
          <li>Usage data such as pages visited, time spent, and interaction patterns.</li>
          <li>Technical data including IP address, browser type, and device information.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Provide, operate, and maintain our platform.</li>
          <li>Personalize your experience and show relevant content.</li>
          <li>Communicate with you about updates, security alerts, and support.</li>
          <li>Monitor and analyze usage to improve our services.</li>
          <li>Detect, prevent, and address technical issues or abuse.</li>
        </ul>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "4. Legal Basis for Processing",
    content: (
      <p>
        We process your personal information based on your consent, the
        necessity to perform our services under our Terms &amp; Services,
        compliance with legal obligations, and our legitimate interest in
        maintaining a safe and functional platform.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies &amp; Tracking Technologies",
    content: (
      <>
        <p>
          We use cookies and similar tracking technologies to keep you
          signed in, remember your preferences, and understand how you use
          our platform.
        </p>
        <p>
          You can control or disable cookies through your browser settings,
          though some features of the platform may not function properly
          without them.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "6. How We Share Your Information",
    content: (
      <>
        <p>We do not sell your personal information. We may share data with:</p>
        <ul>
          <li>Service providers who help us operate our platform, such as hosting and authentication services.</li>
          <li>Other users, limited to information you choose to make public, such as your name and published posts.</li>
          <li>Law enforcement or regulators when required by law or to protect our legal rights.</li>
          <li>A successor entity in the event of a merger, acquisition, or sale of assets.</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party",
    title: "7. Third-Party Services",
    content: (
      <>
        <p>
          Our platform integrates with third-party services such as
          authentication providers and analytics tools. These services have
          their own privacy policies, and we encourage you to review them.
        </p>
        <p>
          We are not responsible for the privacy practices of third-party
          services linked from or integrated into our platform.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "8. Data Retention",
    content: (
      <p>
        We retain your personal information for as long as your account
        remains active or as needed to provide our services. If you delete
        your account, we will remove or anonymize your personal information
        within a reasonable time, except where retention is required for
        legal or security purposes.
      </p>
    ),
  },
  {
    id: "data-security",
    title: "9. Data Security",
    content: (
      <>
        <p>
          We implement reasonable technical and organizational measures to
          protect your personal information from unauthorized access, loss,
          misuse, or alteration.
        </p>
        <p>
          However, no method of transmission or storage is completely
          secure, and we cannot guarantee absolute security of your data.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "10. Your Rights",
    content: (
      <>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>Request deletion of your personal information.</li>
          <li>Object to or restrict certain processing activities.</li>
          <li>Withdraw consent where processing is based on consent.</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the
          details provided at the end of this policy.
        </p>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    title: "11. Children's Privacy",
    content: (
      <p>
        Our platform is not intended for children under the age of 13. We do
        not knowingly collect personal information from children. If we
        become aware that we have collected data from a child without
        parental consent, we will take steps to delete that information.
      </p>
    ),
  },
  {
    id: "international-transfers",
    title: "12. International Data Transfers",
    content: (
      <p>
        Your information may be transferred to and processed in countries
        other than your own. We take appropriate measures to ensure your
        data remains protected in accordance with this Privacy Policy,
        regardless of where it is processed.
      </p>
    ),
  },
  {
    id: "changes",
    title: "13. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect
        changes in our practices, technology, legal requirements, or other
        factors. Continued use of the platform after changes become
        effective constitutes acceptance of the updated policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "14. Contact Us",
    content: (
      <p>
        If you have any questions or concerns about this Privacy Policy or
        how we handle your personal information, please reach out to us
        through our support channels.
      </p>
    ),
  },
];

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-linear-to-b from-[#778DA9]/15 via-[#E0E1DD]/25 to-white pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold text-[#415A77] tracking-wide uppercase mb-3">
            Legal
          </span>
          <h1
            className={`${manropeFont.className} text-4xl md:text-5xl font-bold text-[#0D1B2A] tracking-tight mb-3`}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-[#1B263B]/50">Last Updated: July 2026</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        {/* Sticky table of contents — desktop only */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-xs font-semibold text-[#778DA9] tracking-wide uppercase mb-4">
              On this page
            </p>
            <nav className="flex flex-col gap-2.5 max-h-[70vh] overflow-y-auto pr-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-[13px] text-[#1B263B]/55 hover:text-[#0D1B2A] transition-colors duration-200 leading-snug"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          {/* Intro */}
          <p className="text-[15px] text-[#1B263B]/70 leading-relaxed mb-12 pb-8 border-b border-[#778DA9]/15">
            Your privacy matters to us. This policy describes what
            information Quillo collects, how we use it, and the choices you
            have regarding your personal data.
          </p>

          <div className="flex flex-col gap-12">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2
                  className={`${manropeFont.className} text-xl md:text-2xl font-bold text-[#0D1B2A] mb-4`}
                >
                  {s.title}
                </h2>
                <div className="text-[15px] text-[#1B263B]/70 leading-relaxed space-y-3 [&_ul]:list-none [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:mt-2 [&_li]:relative [&_li]:pl-5 [&_li]:before:content-['·'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-[#415A77] [&_li]:before:font-bold">
                  {s.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;