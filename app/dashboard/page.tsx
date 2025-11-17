"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { PDFExport } from "@/components/forms/pdf-export";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingDoc, setGeneratingDoc] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      const [businessRes, assessmentRes, documentRes] = await Promise.all([
        fetch("/api/business"),
        fetch("/api/assessment"),
        fetch("/api/documents"),
      ]);

      const businessData = await businessRes.json();
      const assessmentData = await assessmentRes.json();
      const documentData = await documentRes.json();

      setBusinesses(businessData.businesses || []);
      setAssessments(assessmentData.assessments || []);
      setDocuments(documentData.documents || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateDocument = async (
    businessId: string,
    documentType: "AML_CTF_PROGRAM" | "RISK_ASSESSMENT",
    assessmentId?: string
  ) => {
    setGeneratingDoc(documentType);

    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessId,
          documentType,
          assessmentId,
        }),
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error("Error generating document:", error);
    } finally {
      setGeneratingDoc(null);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const latestBusiness = businesses[0];
  const latestAssessment = assessments[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {session?.user?.name}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Business Info</CardTitle>
              <CardDescription>
                {businesses.length > 0
                  ? "Update your business information"
                  : "Add your business information"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/business-info">
                <Button className="w-full">
                  {businesses.length > 0
                    ? "Update Business Info"
                    : "Add Business Info"}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>
                Complete AML/CTF risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {latestBusiness ? (
                <Link href={`/assessment?businessId=${latestBusiness._id}`}>
                  <Button className="w-full">Start Assessment</Button>
                </Link>
              ) : (
                <Button className="w-full" disabled>
                  Add Business First
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Generate Documents</CardTitle>
              <CardDescription>
                Create compliance documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              {latestBusiness ? (
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() =>
                      generateDocument(latestBusiness._id, "AML_CTF_PROGRAM")
                    }
                    disabled={generatingDoc === "AML_CTF_PROGRAM"}
                  >
                    {generatingDoc === "AML_CTF_PROGRAM"
                      ? "Generating..."
                      : "AML/CTF Program"}
                  </Button>
                  {latestAssessment && (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() =>
                        generateDocument(
                          latestBusiness._id,
                          "RISK_ASSESSMENT",
                          latestAssessment._id
                        )
                      }
                      disabled={generatingDoc === "RISK_ASSESSMENT"}
                    >
                      {generatingDoc === "RISK_ASSESSMENT"
                        ? "Generating..."
                        : "Risk Assessment"}
                    </Button>
                  )}
                </div>
              ) : (
                <Button className="w-full" disabled>
                  Add Business First
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Assessments */}
        {assessments.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessments.slice(0, 5).map((assessment) => (
                  <div
                    key={assessment._id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">
                        {assessment.businessId?.companyName || "Unknown Business"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Completed:{" "}
                        {new Date(assessment.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          assessment.riskLevel === "Low"
                            ? "text-green-600"
                            : assessment.riskLevel === "Medium"
                            ? "text-yellow-600"
                            : assessment.riskLevel === "High"
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}
                      >
                        {assessment.riskLevel}
                      </p>
                      <p className="text-sm text-gray-600">
                        Score: {assessment.totalScore}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generated Documents */}
        {documents.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((document) => (
                  <div
                    key={document._id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">
                        {document.documentType === "AML_CTF_PROGRAM"
                          ? "AML/CTF Program"
                          : "Risk Assessment Report"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {document.businessId?.companyName || "Unknown Business"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Generated:{" "}
                        {new Date(document.generatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <PDFExport
                      documentData={document.documentData}
                      fileName={`${
                        document.documentType === "AML_CTF_PROGRAM"
                          ? "AML-CTF-Program"
                          : "Risk-Assessment"
                      }-${document.businessId?.companyName?.replace(
                        /\s+/g,
                        "-"
                      )}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {businesses.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-4">
                Get Started with AML/CTF Compliance
              </h3>
              <p className="text-gray-600 mb-6">
                Add your business information to begin your compliance journey
              </p>
              <Link href="/business-info">
                <Button size="lg">Add Business Information</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
