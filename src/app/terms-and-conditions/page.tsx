import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing your use of nachitekneka.com and the intellectual property of Nachi Tekneka.",
};

const UPDATED = "04 August 2026";

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms & Conditions"
      title={
        <>
          Terms of <span className="text-brand-gradient">use</span>
        </>
      }
      updated={UPDATED}
    >
      <LegalSection number="01" title="Acceptance of these terms">
        <p>
          By accessing or using <strong>nachitekneka.com</strong> (the
          &ldquo;Website&rdquo;), you agree to these Terms &amp; Conditions. If you
          do not agree, please do not use the Website.
        </p>
      </LegalSection>

      <LegalSection number="02" title="About us">
        <p>
          The Website is operated by Nachi Tekneka, headquartered at 129A, Thotta
          Salai East, Power House Road, Perur Village, Coimbatore – 641 010, Tamil
          Nadu, India, together with its affiliates Nachi Tekneka USA LLC (USA) and
          Indmex Technology S.A DE C.V. (Mexico) — an ISO 9001:2015 certified
          solution provider to spinning mills.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Intellectual property">
        <p>
          <strong>
            All content on this Website — including our products, product designs,
            product photographs and images, processes, engineered solutions,
            technical documentation, text, graphics, logos and layout — is the
            exclusive property of Nachi Tekneka
          </strong>{" "}
          and is protected by copyright, trademark and other intellectual property
          laws.
        </p>
        <ul>
          <li>
            <strong>Nachi Tekneka™</strong> and <strong>Nachi SpinLyfeX™</strong>{" "}
            are trademarks of Nachi Tekneka.
          </li>
          <li>
            No part of this Website — including product images and descriptions of
            our processes and solutions — may be copied, reproduced, downloaded,
            republished, distributed or used for any commercial purpose without our
            prior written consent.
          </li>
          <li>
            Limited viewing and printing for your own internal, non-commercial
            evaluation of our products and services is permitted.
          </li>
        </ul>
        <p>
          References to third-party machine makes and models (for example machine
          model numbers used to indicate part compatibility) are for identification
          purposes only; those names and marks remain the property of their
          respective owners, and no affiliation or endorsement is implied.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Use of the Website">
        <p>You agree not to:</p>
        <ul>
          <li>
            Use automated tools to scrape, harvest or bulk-download Website content,
            including the product catalog and images.
          </li>
          <li>
            Interfere with the Website&rsquo;s operation or attempt to gain
            unauthorised access to any systems.
          </li>
          <li>
            Submit false, misleading or unlawful content through our forms.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="05" title="Product information">
        <p>
          Product details, specifications, images and compatibility references on
          the Website are provided for general information and identification. They
          do not constitute a binding offer. Specifications may change as we improve
          our products. Exact dimensions, pricing and availability for your machine
          are confirmed at quotation — please{" "}
          <Link href="/contact">contact our team</Link>.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Quotations and orders">
        <p>
          Enquiries submitted through the Website are requests for information or
          quotation only. Any resulting sale is governed by the quotation and sales
          terms agreed between you and Nachi Tekneka at the time of order.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Disclaimer and limitation of liability">
        <p>
          The Website is provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis. While we take care to keep information accurate
          and current, we make no warranties as to its completeness or fitness for a
          particular purpose. To the maximum extent permitted by law, Nachi Tekneka
          shall not be liable for any indirect or consequential loss arising from
          your use of, or inability to use, the Website or its content.
        </p>
      </LegalSection>

      <LegalSection number="08" title="Third-party links and services">
        <p>
          The Website may link to third-party services (such as WhatsApp). We are
          not responsible for the content or practices of those services.
        </p>
      </LegalSection>

      <LegalSection number="09" title="Privacy">
        <p>
          Your use of the Website is also governed by our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>, which explains how we
          handle the information you share with us.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Governing law and jurisdiction">
        <p>
          These terms are governed by the laws of India. Any dispute arising from
          the use of this Website shall be subject to the exclusive jurisdiction of
          the courts of Coimbatore, Tamil Nadu, India.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Changes to these terms">
        <p>
          We may revise these terms at any time. The &ldquo;Last updated&rdquo; date
          above shows the current version. Continued use of the Website after
          changes constitutes acceptance of the revised terms.
        </p>
      </LegalSection>

      <LegalSection number="12" title="Contact">
        <p>
          Questions about these terms? Reach us at{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a> or{" "}
          <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
