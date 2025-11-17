import { IBusiness } from "../models/Business";
import { IAssessment } from "../models/Assessment";

export function generateAMLCTFProgram(business: any) {
  const currentDate = new Date().toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return {
    title: "Anti-Money Laundering and Counter-Terrorism Financing Program",
    companyName: business.companyName,
    abn: business.abn,
    generatedDate: currentDate,
    sections: [
      {
        heading: "1. INTRODUCTION",
        content: `This AML/CTF Program has been developed by ${business.companyName} (ABN: ${business.abn}) in accordance with the requirements of the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (AML/CTF Act) and the associated rules and regulations.

This program sets out the policies, procedures, and controls that ${business.companyName} has implemented to identify, mitigate, and manage the risk of money laundering and terrorism financing.`,
      },
      {
        heading: "2. BUSINESS DETAILS",
        content: `Company Name: ${business.companyName}
ABN: ${business.abn}
Industry: ${business.industry}
Business Address: ${business.address}
Contact Person: ${business.contactPerson}
Contact Email: ${business.contactEmail}
Contact Phone: ${business.contactPhone}
Number of Employees: ${business.numberOfEmployees}
Annual Revenue: ${business.annualRevenue}`,
      },
      {
        heading: "3. AML/CTF COMPLIANCE OFFICER",
        content: `The AML/CTF Compliance Officer for ${business.companyName} is:

Name: ${business.contactPerson}
Email: ${business.contactEmail}
Phone: ${business.contactPhone}

The Compliance Officer is responsible for:
- Ensuring compliance with the AML/CTF Act and Rules
- Implementing and maintaining this AML/CTF Program
- Conducting risk assessments
- Providing training to staff
- Reporting suspicious matters to AUSTRAC`,
      },
      {
        heading: "4. CUSTOMER DUE DILIGENCE (CDD)",
        content: `${business.companyName} conducts appropriate customer due diligence procedures including:

4.1 Customer Identification
- Collecting and verifying customer identification documents
- Maintaining records of customer identity verification
- Conducting enhanced due diligence for high-risk customers

4.2 Beneficial Ownership
- Identifying and verifying beneficial owners of corporate entities
- Maintaining records of beneficial ownership information

4.3 Ongoing Monitoring
- Regular review of customer transactions
- Monitoring for unusual or suspicious activity
- Updating customer information periodically`,
      },
      {
        heading: "5. SUSPICIOUS MATTER REPORTING",
        content: `${business.companyName} has established procedures for:

5.1 Identifying Suspicious Matters
- Training staff to recognize suspicious activities
- Maintaining awareness of money laundering and terrorism financing typologies
- Escalation procedures for suspicious matters

5.2 Reporting to AUSTRAC
- Submitting Suspicious Matter Reports (SMRs) within required timeframes
- Maintaining confidentiality of SMR submissions
- Documenting the basis for SMR submissions`,
      },
      {
        heading: "6. RECORD KEEPING",
        content: `${business.companyName} maintains records in accordance with AML/CTF requirements:

- Customer identification records: 7 years after relationship ends
- Transaction records: 7 years after transaction
- AML/CTF Program documents: 7 years after superseded
- All records stored securely with appropriate access controls`,
      },
      {
        heading: "7. EMPLOYEE TRAINING",
        content: `${business.companyName} provides AML/CTF training to all relevant employees:

- Initial training upon commencement
- Annual refresher training
- Training on updates to AML/CTF requirements
- Documentation of training completion`,
      },
      {
        heading: "8. PROGRAM REVIEW",
        content: `This AML/CTF Program is reviewed:

- At least annually
- When significant changes occur to the business
- When changes to AML/CTF legislation or regulations occur
- Following identification of compliance deficiencies`,
      },
      {
        heading: "9. APPROVAL AND ADOPTION",
        content: `This AML/CTF Program has been approved and adopted by ${business.companyName}.

Date: ${currentDate}
Approved by: ${business.contactPerson}
Position: ${business.contactPerson}`,
      },
    ],
  };
}

export function generateRiskAssessmentReport(
  business: any,
  assessment: any
) {
  const currentDate = new Date().toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "#22c55e";
      case "Medium":
        return "#f59e0b";
      case "High":
        return "#ef4444";
      case "Very High":
        return "#991b1b";
      default:
        return "#6b7280";
    }
  };

  const getRiskRecommendations = (level: string) => {
    switch (level) {
      case "Low":
        return [
          "Maintain standard customer due diligence procedures",
          "Continue regular staff training",
          "Monitor for any changes in risk profile",
          "Conduct annual risk assessment reviews",
        ];
      case "Medium":
        return [
          "Implement enhanced customer due diligence for higher-risk customers",
          "Increase frequency of transaction monitoring",
          "Provide additional AML/CTF training to staff",
          "Review and update policies quarterly",
          "Consider implementing automated monitoring systems",
        ];
      case "High":
        return [
          "Implement comprehensive enhanced due diligence procedures",
          "Conduct regular transaction monitoring and reviews",
          "Establish dedicated compliance resources",
          "Implement automated transaction monitoring systems",
          "Conduct monthly risk assessment reviews",
          "Engage external AML/CTF consultants for guidance",
        ];
      case "Very High":
        return [
          "Implement stringent enhanced due diligence for all customers",
          "Establish dedicated AML/CTF compliance team",
          "Implement real-time transaction monitoring",
          "Conduct weekly compliance reviews",
          "Engage ongoing external AML/CTF consulting services",
          "Consider senior management oversight committee",
          "Implement comprehensive audit and testing program",
        ];
      default:
        return [];
    }
  };

  return {
    title: "AML/CTF Risk Assessment Report",
    companyName: business.companyName,
    abn: business.abn,
    generatedDate: currentDate,
    assessmentDate: new Date(assessment.completedAt).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    totalScore: assessment.totalScore,
    riskLevel: assessment.riskLevel,
    riskColor: getRiskColor(assessment.riskLevel),
    sections: [
      {
        heading: "1. EXECUTIVE SUMMARY",
        content: `This risk assessment has been conducted for ${business.companyName} (ABN: ${business.abn}) to evaluate the money laundering and terrorism financing risks associated with the business operations.

Assessment Date: ${new Date(assessment.completedAt).toLocaleDateString("en-AU")}
Risk Score: ${assessment.totalScore} out of 100
Risk Level: ${assessment.riskLevel}

This assessment is based on various risk factors including the nature of business, customer base, transaction patterns, and compliance controls.`,
      },
      {
        heading: "2. BUSINESS PROFILE",
        content: `Company Name: ${business.companyName}
ABN: ${business.abn}
Industry: ${business.industry}
Business Address: ${business.address}
Number of Employees: ${business.numberOfEmployees}
Annual Revenue: ${business.annualRevenue}`,
      },
      {
        heading: "3. RISK ASSESSMENT QUESTIONNAIRE RESULTS",
        content: assessment.answers
          .map(
            (answer: any, index: number) =>
              `Q${index + 1}: ${answer.question}
Answer: ${answer.answer}
Risk Score: ${answer.score}`
          )
          .join("\n\n"),
      },
      {
        heading: "4. RISK ANALYSIS",
        content: `Overall Risk Score: ${assessment.totalScore} out of 100
Risk Level: ${assessment.riskLevel}

Risk Level Classification:
- Low Risk: 0-20 points
- Medium Risk: 21-40 points
- High Risk: 41-60 points
- Very High Risk: 61-100 points

${business.companyName} has been assessed as ${assessment.riskLevel} risk based on the responses provided in the risk assessment questionnaire. This classification takes into account various factors including business type, transaction characteristics, customer profile, and existing compliance controls.`,
      },
      {
        heading: "5. RISK MITIGATION RECOMMENDATIONS",
        content: `Based on the ${assessment.riskLevel} risk classification, the following recommendations are made:

${getRiskRecommendations(assessment.riskLevel)
  .map((rec, index) => `${index + 1}. ${rec}`)
  .join("\n")}`,
      },
      {
        heading: "6. NEXT STEPS",
        content: `${business.companyName} should:

1. Review this risk assessment with senior management
2. Implement the recommended risk mitigation measures
3. Update the AML/CTF Program to reflect identified risks
4. Provide training to staff on risk-specific procedures
5. Schedule the next risk assessment review

Next Review Date: ${new Date(
          new Date(assessment.completedAt).setFullYear(
            new Date(assessment.completedAt).getFullYear() + 1
          )
        ).toLocaleDateString("en-AU")}`,
      },
      {
        heading: "7. CERTIFICATION",
        content: `This risk assessment has been completed and reviewed by:

Name: ${business.contactPerson}
Position: AML/CTF Compliance Officer
Date: ${currentDate}

This assessment represents the current risk profile of ${business.companyName} and should be reviewed and updated annually or when significant changes occur.`,
      },
    ],
  };
}
