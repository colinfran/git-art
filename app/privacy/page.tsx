import Link from "next/link"
import React, { FC } from "react"

const Page: FC = async () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto grow px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">1. Information We Collect</h2>
          <p>
            At GitArt, we prioritize your privacy. We collect minimal information to provide the
            best experience and improve our service. The types of information we collect are as
            follows:
          </p>

          <h3 className="mt-4 text-xl font-semibold">1.1 Website Data</h3>
          <p>
            We collect website usage data to enhance the performance and functionality of our
            website. This includes metrics such as page views, session duration, and user
            interaction to analyze and improve the user experience. This data is collected
            automatically and does not identify individual users.
          </p>

          <h3 className="mt-4 text-xl font-semibold">1.2 User Information</h3>
          <p>When users create an account, we collect the following personal information:</p>
          <ul className="list-disc pl-6">
            <li>Username</li>
            <li>Email address</li>
            <li>GitHub user ID</li>
            <li>GitHub profile image</li>
            <li>Full name</li>
            <li>Account creation date</li>
          </ul>
          <p>
            This information is necessary for account management, communication, and providing
            personalized services. We will not collect any sensitive personal data beyond what is
            listed above.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-6">
            <li>To provide and maintain our service</li>
            <li>To improve website performance and user experience</li>
            <li>To send account-related communications and updates</li>
            <li>To personalize the user experience based on GitHub information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">3. Data Security</h2>
          <p>
            We take reasonable measures to protect your personal information from unauthorized
            access, use, or disclosure. However, no method of transmission over the internet or
            electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">4. Your Rights</h2>
          <p>
            You have the right to access, update, or delete the information we have collected about
            you. If you wish to exercise any of these rights, please contact us using the
            information provided below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">5. Changes to This Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time to reflect changes in our practices
            or for other operational, legal, or regulatory reasons. Any changes to this policy will
            be posted on this page with an updated revision date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">6. Contact Us</h2>
          <p>
            If you have any questions or concerns about this privacy policy or how we handle your
            information, please contact us at:
          </p>
          <p>
            Email:{" "}
            <a className="text-blue-300 hover:text-blue-100" href="mailto:hello@colinfran.com?subject=GitArt+Support">
              hello@colinfran.com
            </a>
          </p>
        </section>
      </main>

      <footer className="p-4 text-black">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} GitArt. All rights reserved.</p>
          <Link className="text-gray-600 hover:text-gray-500" href="/">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Page
