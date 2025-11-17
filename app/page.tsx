import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          AML/CTF Compliance Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Streamline your Anti-Money Laundering and Counter-Terrorism Financing compliance with automated risk assessments and document generation.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button size="lg" variant="default">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline">
              Sign Up
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
            <p className="text-gray-600">Automated questionnaires with intelligent scoring</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Document Generation</h3>
            <p className="text-gray-600">Generate AML/CTF compliance documents instantly</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Secure & Compliant</h3>
            <p className="text-gray-600">SSL security and data protection built-in</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
