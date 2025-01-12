import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const privacyPolicy: Array<{ title: string; content: string[] }> = [
  {
    title: "Acceptance of Terms",
    content: [
      "By using this website, you agree to comply with and be bound by all of our Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.",
    ],
  },
  {
    title: "Privacy Policy",
    content: [
      "We are committed to protecting the privacy of your personal data in accordance with our Privacy Policy. By using this site, you consent to the collection, use, and disclosure of your personal data in accordance with this policy.",
    ],
  },
  {
    title: "Copyright and Intellectual Property",
    content: [
      "All copyrights and intellectual property rights to the content and materials on this site are owned by Store or its partners. Unauthorized use of these materials is prohibited and may constitute a violation of copyright laws.",
    ],
  },
  {
    title: "Delivery and Returns",
    content: [
      "Details regarding delivery options, associated costs, and return policies are specified in the dedicated sections of our site. Please review this information before placing your order.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "Store shall not be liable for any loss or damage incurred as a result of the use or inability to use this website.",
    ],
  },
  {
    title: "Policy Updates",
    content: [
      "We reserve the right to update or change this Privacy Policy at any time. Any changes will be effective immediately upon posting on our website. We encourage you to review this Privacy Policy periodically for any updates or changes.",
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <div className="px-5 md:px-20 lg:px-56 py-16 md:py-20 dark:text-white">
        <Breadcrumbs />
        <div className="uppercase text-3xl md:4xl lg:text-5xl font-bold mb-14">
          Terms and Conditions
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-semibold">
            Welcome to Store, an online fashion retailer specializing in
            contemporary fashion and accessories. Please read these Terms and
            Conditions carefully before using our website.
          </p>
          <div className="flex flex-col gap-6">
            {privacyPolicy.map((item, index) => (
              <div key={index}>
                <p className="font-bold mb-2">{item.title}:</p>
                <ul className="list-disc list-outside ps-5">
                  {item.content.map((content, index) => (
                    <li key={index} className="font-semibold">
                      {content}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="font-semibold">
            By using this website, you agree to abide by and be subject to these
            Terms and Conditions. For further questions or clarifications,
            please contact us through our contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
