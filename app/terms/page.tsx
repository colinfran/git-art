import Link from "next/link"
import React, { FC } from "react"

const Page: FC = async () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto grow px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold">Terms and Conditions</h1>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            {`By accessing and using GitArt (the "App"), you agree to comply with and be bound by the
            following terms and conditions. If you do not agree with these terms, please do not use
            the App.`}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">2. Use of the App</h2>
          <p>
            {`GitArt grants you a limited, non-exclusive, non-transferable license to access and use
            the App for personal, non-commercial purposes only. You may not use the App for any
            other purpose without prior written consent.`}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">3. Disclaimers</h2>
          <p>
            {`The App and all content provided are delivered on an "as-is" basis. GitArt does not
            offer any warranties, either express or implied, including but not limited to the
            implied warranties of merchantability or fitness for a particular purpose.`}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">4. Limitation of Liability</h2>
          <p>
            {`In no event shall GitArt be held liable for any damages, including but not limited to
            loss of data, profits, or business interruption, arising from your use or inability to
            use the App, even if GitArt has been advised of the possibility of such damages.`}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">5. Changes to Content</h2>
          <p>
            {`GitArt may update, modify, or remove content from the App at any time without notice.
            While we strive for accuracy, GitArt does not guarantee that all information displayed
            is current or free from errors.`}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">6. Governing Law</h2>
          <p>
            {`These terms and conditions are governed by and construed in accordance with the laws of
            the State of California, USA. Any disputes related to these terms shall be resolved
            under the exclusive jurisdiction of the courts located in San Francisco, California.`}
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
