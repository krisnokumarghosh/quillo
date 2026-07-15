import { manropeFont } from "@/lib/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Services | Quillo",
  description: "Read Quillo's Terms & Services before using our blogging platform.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By accessing or using this platform, you confirm that you have read,
        understood, and agreed to be bound by these Terms &amp; Services. If
        you do not agree with any part of these terms, please discontinue
        using our services immediately.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    content: (
      <>
        <p>To use our platform, you must:</p>
        <ul>
          <li>Be at least 13 years of age or meet the minimum legal age required in your country.</li>
          <li>Provide accurate and up-to-date account information.</li>
          <li>Maintain the security of your account credentials.</li>
          <li>Accept full responsibility for all activities performed through your account.</li>
        </ul>
      </>
    ),
  },
  {
    id: "accounts",
    title: "3. User Accounts",
    content: (
      <>
        <p>When creating an account, you agree to:</p>
        <ul>
          <li>Keep your login credentials confidential.</li>
          <li>Not share your account with others.</li>
          <li>Notify us immediately if you suspect unauthorized access.</li>
          <li>Provide truthful profile information.</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts involved in
          suspicious or abusive activities.
        </p>
      </>
    ),
  },
  {
    id: "content",
    title: "4. User-Generated Content",
    content: (
      <>
        <p>
          Our platform allows users to create, publish, edit, and share blog
          posts.
        </p>
        <p>By publishing content, you confirm that:</p>
        <ul>
          <li>You own the content or have the legal right to publish it.</li>
          <li>Your content does not violate copyright laws.</li>
          <li>Your content does not infringe on the rights of any individual or organization.</li>
          <li>Your content complies with all applicable laws.</li>
        </ul>
        <p>
          You retain ownership of your content, but by publishing it on our
          platform, you grant us permission to display, store, distribute,
          and promote your content within the website.
        </p>
      </>
    ),
  },
  {
    id: "guidelines",
    title: "5. Content Guidelines",
    content: (
      <>
        <p>Users must not publish content that includes:</p>
        <ul>
          <li>Hate speech or discrimination.</li>
          <li>Harassment or bullying.</li>
          <li>Pornographic or sexually explicit material.</li>
          <li>Violent or graphic content intended to harm others.</li>
          <li>Illegal activities or criminal instructions.</li>
          <li>False or misleading information intended to deceive readers.</li>
          <li>Malware, phishing links, or malicious software.</li>
          <li>Spam, excessive advertising, or repetitive promotional content.</li>
          <li>Content that violates another person&apos;s privacy.</li>
        </ul>
        <p>
          Violation of these guidelines may result in content removal or
          permanent account suspension.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "6. Intellectual Property",
    content: (
      <>
        <p>
          All website branding, design, logos, graphics, and platform
          functionality remain the property of the website owner unless
          otherwise stated.
        </p>
        <p>Users may not:</p>
        <ul>
          <li>Copy website design without permission.</li>
          <li>Reverse engineer platform functionality.</li>
          <li>Reproduce platform assets for commercial purposes.</li>
        </ul>
        <p>
          Individual blog posts remain the intellectual property of their
          respective authors.
        </p>
      </>
    ),
  },
  {
    id: "copyright",
    title: "7. Copyright Policy",
    content: (
      <>
        <p>
          If you believe that your copyrighted work has been published
          without authorization, you may contact us with sufficient
          evidence.
        </p>
        <p>After reviewing the report, we may:</p>
        <ul>
          <li>Remove the reported content.</li>
          <li>Suspend the responsible account.</li>
          <li>Take additional legal or administrative action when appropriate.</li>
        </ul>
      </>
    ),
  },
  {
    id: "moderation",
    title: "8. Moderation Rights",
    content: (
      <>
        <p>To maintain a safe community, administrators reserve the right to:</p>
        <ul>
          <li>Review published blogs.</li>
          <li>Remove inappropriate or harmful content.</li>
          <li>Reject reported content.</li>
          <li>Suspend or permanently ban user accounts.</li>
          <li>Restrict platform features when necessary.</li>
        </ul>
        <p>
          Administrative decisions are made to protect the community and
          improve user experience.
        </p>
      </>
    ),
  },
  {
    id: "reporting",
    title: "9. Reporting Content",
    content: (
      <>
        <p>
          Users are encouraged to report blogs that violate our community
          standards.
        </p>
        <p>
          False or abusive reporting intended to harass other users may
          result in restrictions on the reporting user&apos;s account.
        </p>
      </>
    ),
  },
  {
    id: "responsibilities",
    title: "10. User Responsibilities",
    content: (
      <>
        <p>While using the platform, you agree to:</p>
        <ul>
          <li>Respect other users.</li>
          <li>Avoid abusive language.</li>
          <li>Publish original and meaningful content.</li>
          <li>Avoid manipulating engagement metrics.</li>
          <li>Refrain from automated spam or bot activity.</li>
        </ul>
      </>
    ),
  },
  {
    id: "privacy",
    title: "11. Privacy",
    content: (
      <>
        <p>We respect your privacy.</p>
        <p>
          Your personal information is collected only for providing our
          services and improving your experience.
        </p>
        <p>We do not intentionally sell personal information to third parties.</p>
        <p>For more details, please review our Privacy Policy.</p>
      </>
    ),
  },
  {
    id: "availability",
    title: "12. Availability of Service",
    content: (
      <p>
        Although we strive to maintain uninterrupted service, we cannot
        guarantee that the platform will always be available. Maintenance,
        technical issues, updates, or unexpected outages may temporarily
        affect availability.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "13. Third-Party Services",
    content: (
      <>
        <p>Our platform may integrate third-party services such as:</p>
        <ul>
          <li>Authentication providers</li>
          <li>Analytics services</li>
          <li>Cloud storage</li>
          <li>External links</li>
        </ul>
        <p>
          We are not responsible for the policies or practices of these
          third-party services.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "14. Limitation of Liability",
    content: (
      <>
        <p>We are not responsible for:</p>
        <ul>
          <li>User-generated content.</li>
          <li>Loss of data caused by user actions.</li>
          <li>Temporary service interruptions.</li>
          <li>Damages resulting from misuse of the platform.</li>
          <li>External websites linked from user-generated content.</li>
        </ul>
        <p>Users access and use the platform at their own discretion.</p>
      </>
    ),
  },
  {
    id: "suspension",
    title: "15. Account Suspension & Termination",
    content: (
      <>
        <p>We reserve the right to suspend or permanently terminate accounts that:</p>
        <ul>
          <li>Repeatedly violate our policies.</li>
          <li>Publish prohibited content.</li>
          <li>Attempt unauthorized access.</li>
          <li>Engage in fraudulent activities.</li>
          <li>Harm the safety or integrity of the platform.</li>
        </ul>
        <p>
          Account termination may occur without prior notice in serious
          cases.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "16. Changes to These Terms",
    content: (
      <p>
        We may revise these Terms &amp; Services at any time to reflect
        improvements, legal requirements, or platform updates. Continued use
        of the platform after changes become effective constitutes
        acceptance of the updated Terms.
      </p>
    ),
  },
];

const TermsAndServicesPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-linear-to-b from-[#778DA9]/15 via-[#E0E1DD]/25 to-white pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold text-[#415A77] tracking-wide uppercase mb-3">
            Legal
          </span>
          <h1
            className={`${manropeFont.className} text-4xl md:text-5xl font-bold text-[#0D1B2A] tracking-tight mb-3`}
          >
            Terms &amp; Services
          </h1>
          <p className="text-sm text-[#1B263B]/50">Last Updated: July 2026</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
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

        <div className="min-w-0">
          <p className="text-[15px] text-[#1B263B]/70 leading-relaxed mb-12 pb-8 border-b border-[#778DA9]/15">
            Welcome to Quillo. By creating an account, publishing content, or
            using our services, you agree to these Terms &amp; Services.
            Please read them carefully before using the platform.
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

export default TermsAndServicesPage;