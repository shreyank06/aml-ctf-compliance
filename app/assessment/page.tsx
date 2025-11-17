"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { riskQuestions } from "@/lib/utils/risk-questions";

function AssessmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessId = searchParams.get("businessId");
  const { data: session, status } = useSession();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: string; question: string; answer: string; score: number }[]
  >([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!businessId) {
      router.push("/dashboard");
    }
  }, [businessId, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleNext = () => {
    if (!selectedOption) {
      setError("Please select an option");
      return;
    }

    const question = riskQuestions[currentQuestion];
    const option = question.options.find((o) => o.text === selectedOption);

    if (!option) return;

    setAnswers([
      ...answers,
      {
        questionId: question.id,
        question: question.question,
        answer: option.text,
        score: option.score,
      },
    ]);

    setSelectedOption("");
    setError("");

    if (currentQuestion < riskQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit([
        ...answers,
        {
          questionId: question.id,
          question: question.question,
          answer: option.text,
          score: option.score,
        },
      ]);
    }
  };

  const handleSubmit = async (finalAnswers: typeof answers) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessId,
          answers: finalAnswers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push(`/dashboard?assessmentComplete=true`);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const question = riskQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / riskQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Question {currentQuestion + 1} of {riskQuestions.length}
              </p>
            </div>
            <CardTitle className="text-2xl">Risk Assessment</CardTitle>
            <CardDescription>
              Please answer the following questions to assess your AML/CTF risk profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{question.question}</h3>

              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedOption === option.text
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option.text}
                      checked={selectedOption === option.text}
                      onChange={(e) => {
                        setSelectedOption(e.target.value);
                        setError("");
                      }}
                      className="mr-3"
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                {currentQuestion > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setCurrentQuestion(currentQuestion - 1);
                      setAnswers(answers.slice(0, -1));
                      setSelectedOption("");
                      setError("");
                    }}
                    disabled={loading}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading
                    ? "Submitting..."
                    : currentQuestion === riskQuestions.length - 1
                    ? "Submit Assessment"
                    : "Next"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AssessmentContent />
    </Suspense>
  );
}
