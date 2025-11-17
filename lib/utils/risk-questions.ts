export interface Question {
  id: string;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

export const riskQuestions: Question[] = [
  {
    id: "q1",
    question: "What is the primary nature of your business?",
    options: [
      { text: "Professional services (accounting, legal, consulting)", score: 2 },
      { text: "Retail/E-commerce", score: 3 },
      { text: "Financial services", score: 5 },
      { text: "Money remittance/Currency exchange", score: 8 },
      { text: "Gambling/Gaming", score: 8 },
      { text: "Real estate", score: 6 },
      { text: "Other", score: 3 },
    ],
  },
  {
    id: "q2",
    question: "What is your average transaction value?",
    options: [
      { text: "Under $1,000", score: 1 },
      { text: "$1,000 - $10,000", score: 3 },
      { text: "$10,000 - $50,000", score: 5 },
      { text: "$50,000 - $100,000", score: 7 },
      { text: "Over $100,000", score: 9 },
    ],
  },
  {
    id: "q3",
    question: "Do you deal with cash transactions?",
    options: [
      { text: "No cash transactions", score: 1 },
      { text: "Occasional cash (less than 10% of transactions)", score: 3 },
      { text: "Regular cash (10-50% of transactions)", score: 6 },
      { text: "Primarily cash (over 50% of transactions)", score: 9 },
    ],
  },
  {
    id: "q4",
    question: "What percentage of your customers are international?",
    options: [
      { text: "None - Domestic only", score: 1 },
      { text: "Less than 10%", score: 2 },
      { text: "10-25%", score: 4 },
      { text: "25-50%", score: 6 },
      { text: "More than 50%", score: 8 },
    ],
  },
  {
    id: "q5",
    question: "Do you conduct business with high-risk countries?",
    options: [
      { text: "No", score: 1 },
      { text: "Rarely (less than 5% of business)", score: 4 },
      { text: "Sometimes (5-20% of business)", score: 7 },
      { text: "Frequently (over 20% of business)", score: 10 },
    ],
  },
  {
    id: "q6",
    question: "Do you have politically exposed persons (PEPs) as customers?",
    options: [
      { text: "No", score: 1 },
      { text: "Yes, but with enhanced due diligence", score: 5 },
      { text: "Yes, without specific enhanced measures", score: 9 },
    ],
  },
  {
    id: "q7",
    question: "What is your customer onboarding process?",
    options: [
      { text: "Comprehensive KYC with document verification", score: 1 },
      { text: "Basic KYC with some verification", score: 3 },
      { text: "Minimal verification", score: 7 },
      { text: "No formal KYC process", score: 10 },
    ],
  },
  {
    id: "q8",
    question: "How do you monitor ongoing customer transactions?",
    options: [
      { text: "Automated monitoring system in place", score: 1 },
      { text: "Regular manual reviews", score: 3 },
      { text: "Periodic reviews only", score: 6 },
      { text: "No ongoing monitoring", score: 10 },
    ],
  },
  {
    id: "q9",
    question: "Have you provided AML/CTF training to your staff?",
    options: [
      { text: "Yes, regular annual training", score: 1 },
      { text: "Yes, one-time training", score: 3 },
      { text: "Informal training only", score: 6 },
      { text: "No training provided", score: 9 },
    ],
  },
  {
    id: "q10",
    question: "Do you have procedures for reporting suspicious activities?",
    options: [
      { text: "Yes, formal documented procedures", score: 1 },
      { text: "Yes, but informal", score: 4 },
      { text: "No specific procedures", score: 8 },
    ],
  },
];

export function calculateRiskLevel(totalScore: number): "Low" | "Medium" | "High" | "Very High" {
  if (totalScore <= 20) return "Low";
  if (totalScore <= 40) return "Medium";
  if (totalScore <= 60) return "High";
  return "Very High";
}

export const maxScore = riskQuestions.reduce(
  (acc, q) => acc + Math.max(...q.options.map((o) => o.score)),
  0
);
