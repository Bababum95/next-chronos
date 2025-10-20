import type { Metadata } from 'next';

import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - Chronos',
  description: 'Privacy Policy for Chronos - How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

            <p className="text-sm text-muted-foreground mb-8">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4 text-muted-foreground">
                Chronos ("we," "our," or "us") is committed to protecting your privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when
                you use our developer activity tracking service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-medium mb-3">2.1 Personal Information</h3>
              <p className="mb-4 text-muted-foreground">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Create an account</li>
                <li>Use our VS Code extension</li>
                <li>Contact us for support</li>
                <li>Subscribe to our newsletter</li>
              </ul>
              <p className="mb-4 text-muted-foreground">This information may include:</p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Name and email address</li>
                <li>Profile information</li>
                <li>API keys and authentication tokens</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">2.2 Usage Data</h3>
              <p className="mb-4 text-muted-foreground">
                We automatically collect certain information when you use our Service:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Coding activity and time tracking data</li>
                <li>File and project information (anonymized)</li>
                <li>Device and browser information</li>
                <li>IP address and location data</li>
                <li>Usage patterns and preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="mb-4 text-muted-foreground">
                We use the collected information for various purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Provide and maintain our Service</li>
                <li>Generate coding statistics and visualizations</li>
                <li>Improve and personalize your experience</li>
                <li>Communicate with you about updates and features</li>
                <li>Provide customer support</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
              <p className="mb-4 text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personal information to third
                parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With service providers who assist in our operations</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p className="mb-4 text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your
                personal information against unauthorized access, alteration, disclosure, or
                destruction. However, no method of transmission over the internet or electronic
                storage is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
              <p className="mb-4 text-muted-foreground">
                We retain your personal information for as long as necessary to fulfill the purposes
                outlined in this Privacy Policy, unless a longer retention period is required or
                permitted by law. When you delete your account, we will delete your personal
                information within a reasonable timeframe.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
              <p className="mb-4 text-muted-foreground">
                Depending on your location, you may have certain rights regarding your personal
                information:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>
              <p className="mb-4 text-muted-foreground">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="mb-4 text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your experience on our
                Service. You can control cookie settings through your browser preferences, but
                disabling cookies may affect the functionality of our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Third-Party Services</h2>
              <p className="mb-4 text-muted-foreground">
                Our Service may contain links to third-party websites or services. We are not
                responsible for the privacy practices of these third parties. We encourage you to
                read their privacy policies before providing any personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
              <p className="mb-4 text-muted-foreground">
                Our Service is not intended for children under 13 years of age. We do not knowingly
                collect personal information from children under 13. If you are a parent or guardian
                and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. International Data Transfers</h2>
              <p className="mb-4 text-muted-foreground">
                Your information may be transferred to and processed in countries other than your
                own. We ensure that such transfers comply with applicable data protection laws and
                implement appropriate safeguards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
              <p className="mb-4 text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the "Last
                updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
              <p className="mb-4 text-muted-foreground">
                If you have any questions about this Privacy Policy or our privacy practices, please
                contact us through our support channels.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
