/* Fusion Hub Services - demo content.
   Everything here is synthetic. Edit this file to change the data shown
   in the app; index.html and app.js do not need to be touched. */

const BRAND = {
  "platform": "Fusion",
  "product": "Hub Services",
  "tagline": "LIFE SCIENCE HUB · SPECIALTY DRUG PA AUTOMATION",
  "hub": "ArvelisConnect",
  "manufacturer": "Arvelis Therapeutics",
  "crm": "Northstar Hub Case Manager",
  "model": "GPT-4O"
};

const CASES = [
  {
    "id": "HUB-2041",
    "scenario": "HAPPY",
    "received": "Aug 24, 9:12 AM",
    "receivedIso": "2026-08-24",
    "runtime": "6.7 s",
    "baseline": "~22 min",
    "flags": 0,
    "patient": {
      "name": "Marcus Ellison",
      "first": "Marcus",
      "age": "54M",
      "dob": "1971-06-18",
      "sex": "Male",
      "pid": "PT-4471002",
      "phone": "(312) 555-0148",
      "address": "1184 Ashgrove Lane, Evanston, IL 60201"
    },
    "payer": {
      "name": "Anvara Health Plan",
      "short": "Anvara",
      "plan": "Anvara Health Plan · Anvara Choice PPO",
      "memberId": "AVH884210277",
      "group": "GRP-77120",
      "effective": "2026-01-01",
      "benefit": "Pharmacy · Specialty tier 4"
    },
    "therapy": {
      "brand": "Velunexa",
      "generic": "velunekimab",
      "label": "Velunexa (velunekimab) 150 mg/mL",
      "cls": "Interleukin-23p19 inhibitor",
      "strength": "150 mg/mL single-dose prefilled syringe",
      "jcode": "J3592",
      "ndc": "58291-0150-01",
      "dose": "150 mg",
      "route": "Subcutaneous",
      "frequency": "Weeks 0 and 4, then every 12 weeks",
      "quantity": "1 syringe per fill",
      "daysSupply": "84",
      "siteOfCare": "Self-administered · specialty pharmacy",
      "duration": "12 months",
      "requestType": "Initial · Standard",
      "startDate": "2026-09-08"
    },
    "dx": {
      "code": "L40.0",
      "text": "Psoriasis vulgaris",
      "full": "L40.0 · Psoriasis vulgaris (moderate-to-severe plaque)",
      "severity": "BSA 18% · PASI 16.4"
    },
    "prescriber": {
      "name": "Dana Whitfield, MD",
      "npi": "1730458822",
      "specialty": "Dermatology",
      "practice": "Lakeside Dermatology & Immunology",
      "phone": "(847) 555-0142",
      "fax": "(847) 555-0143",
      "tin": "36-4471902"
    },
    "policy": {
      "id": "AHP-SPX-118",
      "title": "Interleukin-23 Inhibitors for Plaque Psoriasis",
      "effective": "2026-01-01",
      "rev": "rev 2026-01"
    },
    "form": {
      "name": "Specialty Drug Prior Authorization Request",
      "id": "AHP-PA-4412",
      "rev": "rev 2026-01",
      "fields": 31,
      "completed": 31
    },
    "documents": [
      {
        "file": "enrollment.pdf",
        "label": "Prescriber Enrollment / Start Form",
        "cite": "Enrollment",
        "kind": "PDF",
        "size": "4.7 KB"
      },
      {
        "file": "smn.pdf",
        "label": "Statement of Medical Necessity",
        "cite": "Medical Necessity",
        "kind": "PDF",
        "size": "4.1 KB"
      },
      {
        "file": "chart_note.pdf",
        "label": "Dermatology Progress Note",
        "cite": "Chart Note",
        "kind": "PDF",
        "size": "3.7 KB"
      },
      {
        "file": "lab_report.pdf",
        "label": "Laboratory & TB Screening Report",
        "cite": "Lab Report",
        "kind": "PDF",
        "size": "3.1 KB"
      }
    ],
    "criteria": [
      "The patient has a confirmed diagnosis of moderate-to-severe plaque psoriasis with body surface area involvement of at least 10 percent or a PASI score of at least 12, documented by the treating clinician.",
      "The patient is 18 years of age or older.",
      "The patient has completed a trial of at least twelve (12) weeks of one conventional systemic agent (methotrexate, cyclosporine, or acitretin) or a documented course of phototherapy, without clinically meaningful improvement, unless every available agent is contraindicated or not tolerated.",
      "Tuberculosis screening has been completed within the twelve (12) months preceding initiation and the result is negative, or a positive result has been evaluated and treated.",
      "The drug is prescribed by, or in documented consultation with, a dermatologist or rheumatologist."
    ],
    "exceptions": "The conservative systemic therapy requirement is waived where the patient has documented hepatic impairment, is pregnant or planning pregnancy, has a history of malignancy within five years, or where all conventional systemic agents are contraindicated. The prescriber must state the contraindication in the medical record.",
    "docRequirements": "Submitted requests must include the signed prescriber enrollment or start form, a statement of medical necessity, a clinical note documenting disease severity and body surface area, documentation of the conventional systemic therapy course and its outcome, and tuberculosis screening results dated within twelve months.",
    "notRequired": "Topical corticosteroids, topical vitamin D analogues, and office-based narrowband UVB phototherapy do not require prior authorization under this plan.",
    "questions": [
      {
        "q": "What specialty drug is being requested?",
        "a": "Velunexa (velunekimab) 150 mg/mL",
        "src": "Enrollment",
        "page": "p1",
        "conf": "high",
        "why": "The enrollment form explicitly states the requested product as Velunexa (velunekimab) 150 mg/mL prefilled syringe."
      },
      {
        "q": "What is the primary diagnosis for the request?",
        "a": "L40.0 Psoriasis vulgaris",
        "src": "Medical Necessity",
        "page": "p1",
        "conf": "high",
        "why": "The statement of medical necessity lists the primary diagnosis as L40.0, psoriasis vulgaris."
      },
      {
        "q": "What is the documented disease severity?",
        "a": "BSA 18%, PASI 16.4",
        "src": "Chart Note",
        "page": "p1",
        "conf": "high",
        "why": "The dermatology note records body surface area involvement of 18 percent and a PASI score of 16.4."
      },
      {
        "q": "How long has the patient been treated for this condition?",
        "a": "26 months",
        "src": "Chart Note",
        "page": "p1",
        "conf": "high",
        "why": "The note states the patient has been under dermatologic care for plaque psoriasis for 26 months."
      },
      {
        "q": "Has a conventional systemic agent been tried?",
        "a": "Yes",
        "src": "Medical Necessity",
        "page": "p1",
        "conf": "high",
        "why": "The statement of medical necessity confirms a completed trial of conventional systemic therapy."
      },
      {
        "q": "What prior therapy was attempted, and for how long?",
        "a": "Methotrexate 20 mg weekly for 16 weeks",
        "src": "Medical Necessity",
        "page": "p1",
        "conf": "high",
        "why": "The statement of medical necessity details methotrexate 20 mg weekly sustained over 16 weeks."
      },
      {
        "q": "Did the patient respond to prior therapy?",
        "a": "No",
        "src": "Chart Note",
        "page": "p1",
        "conf": "high",
        "why": "The note records no clinically meaningful improvement on methotrexate, with PASI unchanged."
      },
      {
        "q": "Has tuberculosis screening been completed?",
        "a": "Yes — negative, 2026-07-18",
        "src": "Lab Report",
        "page": "p1",
        "conf": "high",
        "why": "The laboratory report shows a negative QuantiFERON-TB Gold Plus result collected 2026-07-18."
      },
      {
        "q": "Is all required supporting documentation available?",
        "a": "Yes",
        "src": "Policy",
        "page": "p1",
        "conf": "high",
        "why": "Document repository check: every document the policy requires is on file."
      }
    ],
    "paRequirement": "The policy explicitly states that prior authorization is required for interleukin-23 inhibitors billed under J3592, including Velunexa, for all commercial plan members.",
    "assessment": {
      "verdict": "RECOMMEND APPROVAL",
      "title": "All criteria met for Velunexa approval",
      "body": "The documentation supports every medical necessity criterion. The patient has moderate-to-severe plaque psoriasis at 18 percent body surface area with a PASI of 16.4, as recorded in the Dermatology Progress Note. Methotrexate 20 mg weekly was sustained for 16 weeks without clinically meaningful improvement, as documented in the Statement of Medical Necessity and corroborated by the chart note. Tuberculosis screening returned negative on 2026-07-18, and the prescriber is a board-certified dermatologist."
    },
    "packet": [
      {
        "label": "Enrollment: Prescriber Enrollment / Start Form",
        "criteria": "criteria 5",
        "why": "Documents the requested product, prescriber attestation, and patient consent."
      },
      {
        "label": "Medical Necessity: Statement of Medical Necessity",
        "criteria": "criteria 1, 3",
        "why": "Documents diagnosis, severity, and the conventional systemic therapy course."
      },
      {
        "label": "Chart Note: Dermatology Progress Note",
        "criteria": "criteria 1, 2",
        "why": "Documents body surface area, PASI, age, and response to prior therapy."
      },
      {
        "label": "Lab Report: Laboratory & TB Screening Report",
        "criteria": "criteria 4",
        "why": "Documents negative tuberculosis screening within twelve months."
      }
    ],
    "stages": [
      [
        "Document Intake & Extraction",
        "3.6 s",
        "1404 tok",
        "cache",
        "Velunexa 150 mg SC was requested"
      ],
      [
        "Patient Context from CRM",
        "0 ms",
        "",
        "local",
        "10 FHIR resources from the CRM"
      ],
      [
        "Policy Context from Policy PDF",
        "4.4 s",
        "1676 tok",
        "cache",
        "5 medical necessity criteria extracted"
      ],
      [
        "PA Required?",
        "1.2 s",
        "1325 tok",
        "cache",
        "Prior authorization required"
      ],
      [
        "Gather Required Documents",
        "2.8 s",
        "737 tok",
        "cache",
        "4 documents selected"
      ],
      [
        "Complete Payer Questionnaire",
        "5.9 s",
        "3899 tok",
        "cache",
        "9 answered"
      ],
      [
        "Complete Payer-Specific Form",
        "0 ms",
        "",
        "local",
        "31 form fields completed"
      ],
      [
        "Prepare Submission Package",
        "1.9 s",
        "3589 tok",
        "cache",
        "All criteria met for Velunexa approval"
      ]
    ],
    "submission": {
      "headline": "Submitted to Anvara Health Plan",
      "tracking": "AHP-20260826-2041",
      "status": "Submitted / Pending payer review",
      "reviewer": "A. Reyes, RN",
      "channel": "Payer portal · electronic PA"
    },
    "primaryAction": "Approve & submit",
    "labs": [
      [
        "QuantiFERON-TB Gold Plus",
        "Negative",
        "Negative",
        "2026-07-18"
      ],
      [
        "Hepatitis B surface antigen",
        "Non-reactive",
        "Non-reactive",
        "2026-07-18"
      ],
      [
        "Hepatitis C antibody",
        "Non-reactive",
        "Non-reactive",
        "2026-07-18"
      ],
      [
        "ALT",
        "26 U/L",
        "7 - 55 U/L",
        "2026-07-18"
      ],
      [
        "AST",
        "23 U/L",
        "8 - 48 U/L",
        "2026-07-18"
      ],
      [
        "Creatinine",
        "0.94 mg/dL",
        "0.74 - 1.35 mg/dL",
        "2026-07-18"
      ],
      [
        "WBC",
        "6.8 K/uL",
        "4.5 - 11.0 K/uL",
        "2026-07-18"
      ]
    ],
    "policyDoc": {
      "file": "policy.pdf",
      "label": "AHP-SPX-118",
      "sub": "payer medical policy",
      "kind": "POL",
      "size": "4.3 KB"
    },
    "formDocs": {
      "blank": {
        "file": "form_blank.pdf",
        "size": "4.5 KB"
      },
      "completed": {
        "file": "form_completed.pdf",
        "size": "5.4 KB"
      },
      "packet": {
        "file": "packet.pdf",
        "size": "21.1 KB"
      }
    },
    "repository": [
      {
        "file": "enrollment.pdf",
        "label": "Prescriber Enrollment / Start Form",
        "cite": "Enrollment",
        "kind": "PDF",
        "size": "4.7 KB"
      },
      {
        "file": "smn.pdf",
        "label": "Statement of Medical Necessity",
        "cite": "Medical Necessity",
        "kind": "PDF",
        "size": "4.1 KB"
      },
      {
        "file": "chart_note.pdf",
        "label": "Dermatology Progress Note",
        "cite": "Chart Note",
        "kind": "PDF",
        "size": "3.7 KB"
      },
      {
        "file": "lab_report.pdf",
        "label": "Laboratory & TB Screening Report",
        "cite": "Lab Report",
        "kind": "PDF",
        "size": "3.1 KB"
      }
    ]
  },
  {
    "id": "HUB-2042",
    "scenario": "STP",
    "received": "Aug 25, 8:40 AM",
    "receivedIso": "2026-08-25",
    "runtime": "4.1 s",
    "baseline": "~14 min",
    "flags": 0,
    "patient": {
      "name": "Priya Raman",
      "first": "Priya",
      "age": "41F",
      "dob": "1984-11-03",
      "sex": "Female",
      "pid": "PT-4471118",
      "phone": "(206) 555-0177",
      "address": "45 Fernwood Court, Bellevue, WA 98004"
    },
    "payer": {
      "name": "Cascadia Mutual",
      "short": "Cascadia",
      "plan": "Cascadia Mutual · Cascadia Select HMO",
      "memberId": "CSM551903442",
      "group": "GRP-40188",
      "effective": "2026-01-01",
      "benefit": "Medical · buy-and-bill"
    },
    "therapy": {
      "brand": "Ferexa",
      "generic": "ferric carbolate",
      "label": "Ferexa (ferric carbolate) 750 mg/15 mL",
      "cls": "Intravenous iron replacement",
      "strength": "750 mg/15 mL single-dose vial",
      "jcode": "J1439",
      "ndc": "58291-0750-02",
      "dose": "750 mg",
      "route": "Intravenous infusion",
      "frequency": "Two doses separated by at least 7 days",
      "quantity": "2 vials total",
      "daysSupply": "14",
      "siteOfCare": "In-network hospital-affiliated infusion suite",
      "duration": "Single course",
      "requestType": "Initial · Standard",
      "startDate": "2026-09-02"
    },
    "dx": {
      "code": "D50.9",
      "text": "Iron deficiency anemia, unspecified",
      "full": "D50.9 · Iron deficiency anemia, unspecified",
      "severity": "Hgb 9.1 g/dL · ferritin 8 ng/mL"
    },
    "prescriber": {
      "name": "Sofia Marchetti, MD",
      "npi": "1487720933",
      "specialty": "Hematology",
      "practice": "Cascade Hematology Associates",
      "phone": "(206) 555-0119",
      "fax": "(206) 555-0120",
      "tin": "91-2233104"
    },
    "policy": {
      "id": "CSM-SPX-062",
      "title": "Intravenous Iron Replacement Products",
      "effective": "2026-01-01",
      "rev": "rev 2026-01"
    },
    "form": {
      "name": "Therapy Start Notification",
      "id": "CSM-NOT-1180",
      "rev": "rev 2026-01",
      "fields": 18,
      "completed": 18
    },
    "documents": [
      {
        "file": "enrollment.pdf",
        "label": "Prescriber Enrollment / Start Form",
        "cite": "Enrollment",
        "kind": "PDF",
        "size": "4.6 KB"
      },
      {
        "file": "lab_report.pdf",
        "label": "Laboratory Report — CBC & Iron Studies",
        "cite": "Lab Report",
        "kind": "PDF",
        "size": "3.3 KB"
      }
    ],
    "criteria": [
      "Intravenous iron replacement products listed on the plan's open-access medical benefit schedule do not require prior authorization when the cumulative elemental iron dose requested is 1,500 mg or less within any rolling twelve-month period.",
      "Administration must occur at an in-network infusion site of care. Requests for administration in an out-of-network setting require prior authorization regardless of dose.",
      "The plan requires a therapy start notification, filed by the prescriber or an authorized hub agent, within five business days of the first administration."
    ],
    "exceptions": "Requests exceeding the 1,500 mg rolling twelve-month threshold, or requests for administration at a site of care outside the plan network, fall outside open access and are reviewed under the plan's standard specialty drug prior authorization process.",
    "docRequirements": "A therapy start notification must be accompanied by the signed prescriber enrollment or start form and a laboratory report documenting the iron deficiency, dated within ninety days of the request.",
    "notRequired": "Oral iron preparations and intravenous iron dosed at or below the open access threshold at an in-network site do not require prior authorization under this plan.",
    "questions": [
      {
        "q": "What specialty drug is being requested?",
        "a": "Ferexa (ferric carbolate) 750 mg/15 mL",
        "src": "Enrollment",
        "page": "p1",
        "conf": "high",
        "why": "The enrollment form explicitly states the requested product as Ferexa (ferric carbolate) 750 mg/15 mL."
      },
      {
        "q": "What is the total elemental iron dose requested?",
        "a": "1,500 mg across two doses",
        "src": "Enrollment",
        "page": "p1",
        "conf": "high",
        "why": "The enrollment form requests two 750 mg doses, totalling 1,500 mg, which is at the open access threshold."
      },
      {
        "q": "What is the requested site of care?",
        "a": "In-network hospital-affiliated infusion suite",
        "src": "Enrollment",
        "page": "p1",
        "conf": "high",
        "why": "The enrollment form names Cascade Infusion Center, which is in the plan network."
      },
      {
        "q": "Is the iron deficiency documented by laboratory results?",
        "a": "Yes — Hgb 9.1 g/dL, ferritin 8 ng/mL",
        "src": "Lab Report",
        "page": "p1",
        "conf": "high",
        "why": "The laboratory report documents haemoglobin of 9.1 g/dL and ferritin of 8 ng/mL, collected 2026-08-19."
      },
      {
        "q": "Does this request require prior authorization?",
        "a": "No",
        "src": "Policy",
        "page": "p1",
        "conf": "high",
        "why": "The dose is at or below the open access threshold and the site of care is in network, so no authorization is required."
      }
    ],
    "paRequirement": "The policy places intravenous iron on the plan's open-access medical benefit schedule at or below 1,500 mg per rolling twelve months at an in-network site. This request is at the threshold and in network, so prior authorization does not apply and only a therapy start notification is due.",
    "assessment": {
      "verdict": "STRAIGHT-THROUGH",
      "title": "No prior authorization required — notification only",
      "body": "The requested course totals 1,500 mg of elemental iron across two doses, at the open access threshold in CSM-SPX-062, and administration is scheduled at Cascade Infusion Center, which is in the plan network. The questionnaire and payer PA form stages were skipped because the policy does not require them. A therapy start notification has been prepared for filing within the five business day window."
    },
    "packet": [
      {
        "label": "Enrollment: Prescriber Enrollment / Start Form",
        "criteria": "criteria 1, 2",
        "why": "Documents the requested dose, the site of care, and prescriber attestation."
      },
      {
        "label": "Lab Report: Laboratory Report — CBC & Iron Studies",
        "criteria": "criteria 3",
        "why": "Documents the iron deficiency supporting the therapy start notification."
      }
    ],
    "stages": [
      [
        "Document Intake & Extraction",
        "2.1 s",
        "812 tok",
        "cache",
        "Ferexa 750 mg IV was requested"
      ],
      [
        "Patient Context from CRM",
        "0 ms",
        "",
        "local",
        "8 FHIR resources from the CRM"
      ],
      [
        "Policy Context from Policy PDF",
        "1.4 s",
        "1188 tok",
        "cache",
        "3 coverage rules extracted"
      ],
      [
        "PA Required?",
        "1.1 s",
        "968 tok",
        "cache",
        "Prior authorization not required"
      ],
      [
        "Gather Required Documents",
        "0.7 s",
        "402 tok",
        "cache",
        "2 documents selected"
      ],
      [
        "Complete Payer Questionnaire",
        "",
        "",
        "skipped",
        "Not required under CSM-SPX-062"
      ],
      [
        "Complete Payer-Specific Form",
        "",
        "",
        "skipped",
        "Not required under CSM-SPX-062"
      ],
      [
        "Prepare Notification Package",
        "1.2 s",
        "1104 tok",
        "cache",
        "Therapy start notification ready"
      ]
    ],
    "submission": {
      "headline": "Notification filed with Cascadia Mutual",
      "tracking": "CSM-20260826-2042",
      "status": "Accepted / No authorization required",
      "reviewer": "A. Reyes, RN",
      "channel": "Payer portal · electronic notification"
    },
    "primaryAction": "File notification",
    "labs": [
      [
        "Haemoglobin",
        "9.1 g/dL",
        "12.0 - 15.5 g/dL",
        "2026-08-19"
      ],
      [
        "Haematocrit",
        "28.4 %",
        "34.9 - 44.5 %",
        "2026-08-19"
      ],
      [
        "Mean corpuscular volume",
        "72 fL",
        "80 - 100 fL",
        "2026-08-19"
      ],
      [
        "Ferritin",
        "8 ng/mL",
        "13 - 150 ng/mL",
        "2026-08-19"
      ],
      [
        "Transferrin saturation",
        "9 %",
        "15 - 45 %",
        "2026-08-19"
      ],
      [
        "Total iron binding capacity",
        "466 mcg/dL",
        "250 - 450 mcg/dL",
        "2026-08-19"
      ],
      [
        "Serum iron",
        "31 mcg/dL",
        "50 - 170 mcg/dL",
        "2026-08-19"
      ]
    ],
    "policyDoc": {
      "file": "policy.pdf",
      "label": "CSM-SPX-062",
      "sub": "payer medical policy",
      "kind": "POL",
      "size": "3.9 KB"
    },
    "formDocs": {
      "blank": {
        "file": "form_blank.pdf",
        "size": "3.6 KB"
      },
      "completed": {
        "file": "form_completed.pdf",
        "size": "4.4 KB"
      },
      "packet": {
        "file": "packet.pdf",
        "size": "13.5 KB"
      }
    },
    "repository": [
      {
        "file": "enrollment.pdf",
        "label": "Prescriber Enrollment / Start Form",
        "cite": "Enrollment",
        "kind": "PDF",
        "size": "4.6 KB"
      },
      {
        "file": "lab_report.pdf",
        "label": "Laboratory Report — CBC & Iron Studies",
        "cite": "Lab Report",
        "kind": "PDF",
        "size": "3.3 KB"
      },
      {
        "file": "chart_note.pdf",
        "label": "Hematology Progress Note",
        "cite": "Chart Note",
        "kind": "PDF",
        "crmOnly": true,
        "size": "3.6 KB"
      }
    ]
  },
  {
    "id": "HUB-2043",
    "scenario": "UPDATE",
    "received": "Aug 25, 1:55 PM",
    "receivedIso": "2026-08-25",
    "runtime": "7.4 s",
    "baseline": "~26 min",
    "flags": 1,
    "patient": {
      "name": "Daniel Okafor",
      "first": "Daniel",
      "age": "63M",
      "dob": "1962-04-27",
      "sex": "Male",
      "pid": "PT-4470885",
      "phone": "(614) 555-0163",
      "address": "907 Millbrook Road, Dublin, OH 43017"
    },
    "payer": {
      "name": "Anvara Health Plan",
      "short": "Anvara",
      "plan": "Anvara Health Plan · Anvara Choice PPO",
      "memberId": "AVH884215090",
      "group": "GRP-77120",
      "effective": "2026-01-01",
      "benefit": "Medical · specialty infusion"
    },
    "therapy": {
      "brand": "Zymvora",
      "generic": "alglucerase beta",
      "label": "Zymvora (alglucerase beta) 400 units",
      "cls": "Enzyme replacement therapy",
      "strength": "400 units per single-dose vial",
      "jcode": "J1786",
      "ndc": "58291-0400-04",
      "dose": "60 units/kg (5,100 units)",
      "route": "Intravenous infusion",
      "frequency": "Every 2 weeks",
      "quantity": "13 vials per fill",
      "daysSupply": "28",
      "siteOfCare": "Home infusion · in-network provider",
      "duration": "12 months",
      "requestType": "Continuation · Standard",
      "startDate": "2026-09-15"
    },
    "dx": {
      "code": "E75.22",
      "text": "Gaucher disease",
      "full": "E75.22 · Gaucher disease, type 1",
      "severity": "On therapy 38 months · stable"
    },
    "prescriber": {
      "name": "Nathan Cole, MD",
      "npi": "1902337415",
      "specialty": "Medical Genetics",
      "practice": "Riverbend Genetics & Metabolism",
      "phone": "(614) 555-0104",
      "fax": "(614) 555-0105",
      "tin": "31-5590417"
    },
    "policy": {
      "id": "AHP-SPX-204",
      "title": "Enzyme Replacement Therapy for Gaucher Disease Type 1",
      "effective": "2026-01-01",
      "rev": "rev 2026-01"
    },
    "form": {
      "name": "Specialty Drug Prior Authorization Request — Continuation",
      "id": "AHP-PA-4418",
      "rev": "rev 2026-01",
      "fields": 34,
      "completed": 33
    },
    "documents": [
      {
        "file": "enrollment.pdf",
        "label": "Prescriber Enrollment / Renewal Form",
        "cite": "Enrollment",
        "kind": "PDF",
        "size": "4.7 KB"
      },
      {
        "file": "smn.pdf",
        "label": "Statement of Medical Necessity",
        "cite": "Medical Necessity",
        "kind": "PDF",
        "size": "3.9 KB"
      },
      {
        "file": "chart_note.pdf",
        "label": "Metabolic Clinic Progress Note",
        "cite": "Chart Note",
        "kind": "PDF",
        "size": "3.5 KB"
      },
      {
        "file": "lab_report.pdf",
        "label": "Laboratory Report — CBC & Biomarkers",
        "cite": "Lab Report",
        "kind": "PDF",
        "size": "3.3 KB"
      }
    ],
    "criteria": [
      "The patient has an established diagnosis of Gaucher disease type 1 confirmed by deficient acid beta-glucosidase enzyme activity or by biallelic pathogenic GBA1 variants.",
      "The patient has been receiving enzyme replacement therapy under a previously approved authorization and the request is for continuation at the same or a reduced dose.",
      "Haematologic response is documented within the six (6) months preceding the request, showing haemoglobin and platelet count stable or improved relative to pre-treatment values.",
      "Organ volume response is documented by abdominal imaging performed within the six (6) months preceding the request, showing spleen and liver volumes stable or reduced relative to the prior assessment.",
      "The requested dose does not exceed 60 units per kilogram administered every two weeks."
    ],
    "exceptions": "Where imaging within six months is not clinically feasible, the plan will accept a prescriber attestation that the patient remains clinically stable together with a plasma glucosylsphingosine or chitotriosidase result within three months. The attestation must state the reason imaging was deferred.",
    "docRequirements": "Continuation requests must include the signed renewal form, a statement of medical necessity, a clinical note from the treating specialist within six months, laboratory results within six months, and abdominal imaging within six months or a documented attestation under the exception above.",
    "notRequired": "Substrate reduction therapy dispensed under the pharmacy benefit is reviewed under policy AHP-SPX-206 and is not covered by this policy.",
    "questions": [
      {
        "q": "What specialty drug is being requested?",
        "a": "Zymvora (alglucerase beta) 400 units",
        "src": "Enrollment",
        "page": "p1",
        "conf": "high",
        "why": "The renewal form explicitly states the requested product as Zymvora (alglucerase beta) 400 units per vial."
      },
      {
        "q": "What is the primary diagnosis for the request?",
        "a": "E75.22 Gaucher disease, type 1",
        "src": "Medical Necessity",
        "page": "p1",
        "conf": "high",
        "why": "The statement of medical necessity lists the primary diagnosis as E75.22, Gaucher disease type 1."
      },
      {
        "q": "Is the diagnosis confirmed by enzyme assay or genetic testing?",
        "a": "Yes — biallelic GBA1 variants",
        "src": "Medical Necessity",
        "page": "p1",
        "conf": "high",
        "why": "The statement of medical necessity documents biallelic pathogenic GBA1 variants confirmed on a 2022 panel."
      },
      {
        "q": "Is this a continuation of previously authorised therapy?",
        "a": "Yes — 38 months on therapy",
        "src": "Chart Note",
        "page": "p1",
        "conf": "high",
        "why": "The clinic note records 38 months of continuous enzyme replacement therapy under prior authorization AHP-20250214-1188."
      },
      {
        "q": "Is haematologic response documented within six months?",
        "a": "Yes — Hgb 13.4 g/dL, platelets 168 K/uL",
        "src": "Lab Report",
        "page": "p1",
        "conf": "high",
        "why": "The laboratory report dated 2026-06-11 documents haemoglobin and platelet values improved over pre-treatment baseline."
      },
      {
        "q": "Is organ volume response documented by imaging within six months?",
        "a": "Not documented",
        "src": null,
        "page": "",
        "conf": "low",
        "why": "No abdominal imaging report is present in the submitted packet. The clinic note references an MRI dated 2025-11-20, which is nine months old and outside the six month window. No exception attestation is on file."
      },
      {
        "q": "What is the requested dose and frequency?",
        "a": "60 units/kg every 2 weeks",
        "src": "Enrollment",
        "page": "p1",
        "conf": "high",
        "why": "The renewal form requests 60 units per kilogram every two weeks, which is at the policy ceiling."
      },
      {
        "q": "Is the requested dose within the policy limit?",
        "a": "Yes",
        "src": "Policy",
        "page": "p1",
        "conf": "high",
        "why": "The policy permits up to 60 units per kilogram every two weeks; the request is at, not above, that limit."
      },
      {
        "q": "Is all required supporting documentation available?",
        "a": "No — imaging within six months missing",
        "src": "Policy",
        "page": "p1",
        "conf": "low",
        "why": "Document repository check: abdominal imaging within six months, or an exception attestation in its place, is required and is not on file."
      }
    ],
    "paRequirement": "The policy requires prior authorization for enzyme replacement therapy billed under J1786, including continuation requests, for all commercial plan members.",
    "assessment": {
      "verdict": "MORE INFORMATION NEEDED",
      "title": "One criterion cannot be confirmed",
      "body": "Four of five criteria are met. The diagnosis is confirmed by biallelic GBA1 variants, the patient has 38 months of continuous therapy under a prior authorization, haematologic response is documented on 2026-06-11, and the requested dose sits at the policy ceiling rather than above it. Criterion 4 cannot be confirmed: the only abdominal imaging referenced is an MRI dated 2025-11-20, which falls outside the six month window, and no prescriber attestation invoking the imaging exception is on file. Submitting now risks a denial that would restart the review clock."
    },
    "packet": [
      {
        "label": "Enrollment: Prescriber Enrollment / Renewal Form",
        "criteria": "criteria 2, 5",
        "why": "Documents the continuation request, dose, and prescriber attestation."
      },
      {
        "label": "Medical Necessity: Statement of Medical Necessity",
        "criteria": "criteria 1",
        "why": "Documents the confirmed diagnosis and genetic testing result."
      },
      {
        "label": "Chart Note: Metabolic Clinic Progress Note",
        "criteria": "criteria 2",
        "why": "Documents duration of therapy and current clinical status."
      },
      {
        "label": "Lab Report: Laboratory Report — CBC & Biomarkers",
        "criteria": "criteria 3",
        "why": "Documents haematologic response within the six month window."
      },
      {
        "label": "Missing: Abdominal imaging within six months",
        "criteria": "criteria 4",
        "why": "Required to document organ volume response. Not present in the submitted packet.",
        "missing": true
      }
    ],
    "stages": [
      [
        "Document Intake & Extraction",
        "4.1 s",
        "1622 tok",
        "cache",
        "Zymvora 400 units IV was requested"
      ],
      [
        "Patient Context from CRM",
        "0 ms",
        "",
        "local",
        "12 FHIR resources from the CRM"
      ],
      [
        "Policy Context from Policy PDF",
        "4.8 s",
        "1904 tok",
        "cache",
        "5 medical necessity criteria extracted"
      ],
      [
        "PA Required?",
        "1.3 s",
        "1341 tok",
        "cache",
        "Prior authorization required"
      ],
      [
        "Gather Required Documents",
        "3.1 s",
        "846 tok",
        "cache",
        "4 of 5 required documents on file"
      ],
      [
        "Complete Payer Questionnaire",
        "6.4 s",
        "4218 tok",
        "cache",
        "8 answered, 1 unanswered"
      ],
      [
        "Complete Payer-Specific Form",
        "0 ms",
        "",
        "local",
        "33 of 34 form fields completed"
      ],
      [
        "Prepare Submission Package",
        "2.2 s",
        "3744 tok",
        "cache",
        "1 criterion cannot be confirmed"
      ]
    ],
    "submission": {
      "headline": "Information request sent to Riverbend Genetics & Metabolism",
      "tracking": "AHP-20260826-2043",
      "status": "On hold / Pending prescriber response",
      "reviewer": "A. Reyes, RN",
      "channel": "Secure fax · (614) 555-0105"
    },
    "primaryAction": "Request information",
    "labs": [
      [
        "Haemoglobin",
        "13.4 g/dL",
        "13.5 - 17.5 g/dL",
        "2026-06-11"
      ],
      [
        "Platelet count",
        "168 K/uL",
        "150 - 400 K/uL",
        "2026-06-11"
      ],
      [
        "Chitotriosidase",
        "1,840 nmol/mL/h",
        "< 150 nmol/mL/h",
        "2026-06-11"
      ],
      [
        "Glucosylsphingosine",
        "88 ng/mL",
        "< 15 ng/mL",
        "2026-06-11"
      ],
      [
        "Ferritin",
        "312 ng/mL",
        "24 - 336 ng/mL",
        "2026-06-11"
      ],
      [
        "ALT",
        "31 U/L",
        "7 - 55 U/L",
        "2026-06-11"
      ],
      [
        "Angiotensin-converting enzyme",
        "62 U/L",
        "8 - 52 U/L",
        "2026-06-11"
      ]
    ],
    "policyDoc": {
      "file": "policy.pdf",
      "label": "AHP-SPX-204",
      "sub": "payer medical policy",
      "kind": "POL",
      "size": "4.2 KB"
    },
    "formDocs": {
      "blank": {
        "file": "form_blank.pdf",
        "size": "4.6 KB"
      },
      "completed": {
        "file": "form_completed.pdf",
        "size": "5.6 KB"
      },
      "packet": {
        "file": "packet.pdf",
        "size": "21.0 KB"
      }
    },
    "repository": [
      {
        "file": "enrollment.pdf",
        "label": "Prescriber Enrollment / Renewal Form",
        "cite": "Enrollment",
        "kind": "PDF",
        "size": "4.7 KB"
      },
      {
        "file": "smn.pdf",
        "label": "Statement of Medical Necessity",
        "cite": "Medical Necessity",
        "kind": "PDF",
        "size": "3.9 KB"
      },
      {
        "file": "chart_note.pdf",
        "label": "Metabolic Clinic Progress Note",
        "cite": "Chart Note",
        "kind": "PDF",
        "size": "3.5 KB"
      },
      {
        "file": "lab_report.pdf",
        "label": "Laboratory Report — CBC & Biomarkers",
        "cite": "Lab Report",
        "kind": "PDF",
        "size": "3.3 KB"
      }
    ]
  },
  {
    "id": "HUB-2044",
    "scenario": "REJECT",
    "received": "Aug 26, 7:20 AM",
    "receivedIso": "2026-08-26",
    "runtime": "5.8 s",
    "baseline": "~19 min",
    "flags": 2,
    "patient": {
      "name": "Alice Chen",
      "first": "Alice",
      "age": "37F",
      "dob": "1988-09-14",
      "sex": "Female",
      "pid": "PT-4471290",
      "phone": "(503) 555-0191",
      "address": "23 Cedar Hollow Way, Portland, OR 97209"
    },
    "payer": {
      "name": "Northgate Benefit Trust",
      "short": "Northgate",
      "plan": "Northgate Benefit Trust · Northgate Open Access EPO",
      "memberId": "NGB771204831",
      "group": "GRP-63007",
      "effective": "2026-01-01",
      "benefit": "Pharmacy · Specialty tier 4"
    },
    "therapy": {
      "brand": "Neuvexa",
      "generic": "obeltamab",
      "label": "Neuvexa (obeltamab) 140 mg/mL",
      "cls": "Calcitonin gene-related peptide antagonist",
      "strength": "140 mg/mL single-dose autoinjector",
      "jcode": "J3031",
      "ndc": "58291-0140-01",
      "dose": "140 mg",
      "route": "Subcutaneous",
      "frequency": "Every 4 weeks",
      "quantity": "1 autoinjector per fill",
      "daysSupply": "28",
      "siteOfCare": "Self-administered · specialty pharmacy",
      "duration": "12 months",
      "requestType": "Initial · Standard",
      "startDate": "2026-09-10"
    },
    "dx": {
      "code": "G43.709",
      "text": "Chronic migraine without aura, intractable",
      "full": "G43.709 · Chronic migraine without aura, intractable",
      "severity": "17 headache days per month"
    },
    "prescriber": {
      "name": "Elena Vasquez, MD",
      "npi": "1558904712",
      "specialty": "Neurology",
      "practice": "Harborview Neurology Group",
      "phone": "(503) 555-0136",
      "fax": "(503) 555-0137",
      "tin": "93-4418825"
    },
    "policy": {
      "id": "NGB-SPX-091",
      "title": "CGRP Antagonists for Migraine Prophylaxis",
      "effective": "2026-01-01",
      "rev": "rev 2026-01"
    },
    "form": {
      "name": "Specialty Drug Prior Authorization Request",
      "id": "NGB-PA-3307",
      "rev": "rev 2026-01",
      "fields": 27,
      "completed": 27
    },
    "documents": [
      {
        "file": "enrollment.pdf",
        "label": "Prescriber Enrollment / Start Form",
        "cite": "Enrollment",
        "kind": "PDF",
        "size": "4.7 KB"
      },
      {
        "file": "chart_note.pdf",
        "label": "Neurology Progress Note",
        "cite": "Chart Note",
        "kind": "PDF",
        "size": "3.9 KB"
      }
    ],
    "criteria": [
      "The patient has a diagnosis of chronic migraine, defined as fifteen (15) or more headache days per month for at least three months, documented in a headache diary or clinical note.",
      "The patient is 18 years of age or older.",
      "The patient has completed a trial of at least two (2) migraine preventive agents from separate pharmacologic classes, each sustained for a minimum of eight (8) weeks at a therapeutic dose, without adequate response or with documented intolerance.",
      "The drug is prescribed by, or in documented consultation with, a neurologist or headache specialist.",
      "The patient is not concurrently receiving another calcitonin gene-related peptide antagonist."
    ],
    "exceptions": "The two-agent step therapy requirement is reduced to one agent where the patient has a documented contraindication to all remaining classes, is pregnant or planning pregnancy, or has a documented history of an adverse drug reaction requiring hospitalisation. Discontinuation for cost, convenience, or patient preference does not satisfy the step therapy requirement.",
    "docRequirements": "Submitted requests must include the signed prescriber enrollment or start form and a clinical note documenting headache frequency, each preventive agent tried with its dose and duration, and the reason each was discontinued.",
    "notRequired": "Acute migraine abortive therapies, including triptans and non-steroidal anti-inflammatory drugs, do not require prior authorization under this plan.",
    "questions": [
      {
        "q": "What specialty drug is being requested?",
        "a": "Neuvexa (obeltamab) 140 mg/mL",
        "src": "Enrollment",
        "page": "p1",
        "conf": "high",
        "why": "The enrollment form explicitly states the requested product as Neuvexa (obeltamab) 140 mg/mL autoinjector."
      },
      {
        "q": "What is the primary diagnosis for the request?",
        "a": "G43.709 Chronic migraine without aura",
        "src": "Chart Note",
        "page": "p1",
        "conf": "high",
        "why": "The neurology note lists the primary diagnosis as G43.709, chronic migraine without aura, intractable."
      },
      {
        "q": "How many headache days per month are documented?",
        "a": "17 days per month",
        "src": "Chart Note",
        "page": "p1",
        "conf": "high",
        "why": "The neurology note records a four month headache diary averaging 17 headache days per month."
      },
      {
        "q": "How many preventive agents have been tried?",
        "a": "One — topiramate only",
        "src": "Chart Note",
        "page": "p1",
        "conf": "high",
        "why": "The neurology note documents a single preventive agent, topiramate. No second agent from another class is recorded."
      },
      {
        "q": "What preventive therapy was attempted, and for how long?",
        "a": "Topiramate 50 mg daily for 5 weeks",
        "src": "Chart Note",
        "page": "p1",
        "conf": "high",
        "why": "The note documents topiramate 50 mg daily sustained for five weeks, short of the eight week minimum."
      },
      {
        "q": "Why was prior preventive therapy discontinued?",
        "a": "Discontinued for out-of-pocket cost",
        "src": "Chart Note",
        "page": "p1",
        "conf": "high",
        "why": "The note states the patient stopped topiramate because of out-of-pocket cost, which the policy excludes from step therapy credit."
      },
      {
        "q": "Is a step therapy exception documented?",
        "a": "No",
        "src": "Chart Note",
        "page": "p1",
        "conf": "high",
        "why": "No contraindication, pregnancy status, or prior adverse reaction is documented that would reduce the two-agent requirement."
      },
      {
        "q": "Is the prescriber a neurologist or headache specialist?",
        "a": "Yes — Neurology",
        "src": "Enrollment",
        "page": "p1",
        "conf": "high",
        "why": "The enrollment form lists the prescriber specialty as Neurology."
      },
      {
        "q": "Are step therapy criteria met?",
        "a": "No",
        "src": "Policy",
        "page": "p1",
        "conf": "high",
        "why": "The policy requires two agents from separate classes, each sustained at least eight weeks. One agent was tried for five weeks and stopped for cost."
      }
    ],
    "paRequirement": "The policy requires prior authorization for all calcitonin gene-related peptide antagonists, including Neuvexa, and applies a two-agent step therapy requirement before approval.",
    "assessment": {
      "verdict": "RECOMMEND DENIAL",
      "title": "Step therapy criteria not met",
      "body": "Criteria 1, 2, 4 and 5 are met: the headache diary supports chronic migraine at 17 days per month, the patient is 37, the prescriber is a neurologist, and no other CGRP antagonist is on file. Criterion 3 is not met on two counts. Only one preventive agent, topiramate, is documented, against a requirement of two from separate classes, and it was sustained for five weeks against a requirement of eight. The note states topiramate was stopped for out-of-pocket cost, which NGB-SPX-091 explicitly excludes from step therapy credit. Submitting as-is would produce a denial on the record. Returning the case to the prescriber for a second agent trial, or for documentation of a step therapy exception, preserves the approval path."
    },
    "packet": [
      {
        "label": "Enrollment: Prescriber Enrollment / Start Form",
        "criteria": "criteria 4",
        "why": "Documents the requested product, prescriber specialty, and patient consent."
      },
      {
        "label": "Chart Note: Neurology Progress Note",
        "criteria": "criteria 1, 2",
        "why": "Documents headache frequency, age, and the single preventive agent trial."
      },
      {
        "label": "Missing: Second preventive agent trial of at least 8 weeks",
        "criteria": "criteria 3",
        "why": "Required to satisfy step therapy. Only topiramate, for five weeks, is documented.",
        "missing": true
      },
      {
        "label": "Missing: Step therapy exception documentation",
        "criteria": "criteria 3",
        "why": "Would reduce the requirement to one agent. No contraindication or adverse reaction is on file.",
        "missing": true
      }
    ],
    "stages": [
      [
        "Document Intake & Extraction",
        "2.4 s",
        "894 tok",
        "cache",
        "Neuvexa 140 mg SC was requested"
      ],
      [
        "Patient Context from CRM",
        "0 ms",
        "",
        "local",
        "9 FHIR resources from the CRM"
      ],
      [
        "Policy Context from Policy PDF",
        "4.1 s",
        "1588 tok",
        "cache",
        "5 medical necessity criteria extracted"
      ],
      [
        "PA Required?",
        "1.2 s",
        "1276 tok",
        "cache",
        "Prior authorization required"
      ],
      [
        "Gather Required Documents",
        "1.9 s",
        "612 tok",
        "cache",
        "2 of 3 required documents on file"
      ],
      [
        "Complete Payer Questionnaire",
        "5.2 s",
        "3406 tok",
        "cache",
        "9 answered"
      ],
      [
        "Complete Payer-Specific Form",
        "0 ms",
        "",
        "local",
        "27 form fields completed"
      ],
      [
        "Prepare Submission Package",
        "2.0 s",
        "3288 tok",
        "cache",
        "Step therapy criteria not met"
      ]
    ],
    "submission": {
      "headline": "Returned to Harborview Neurology Group",
      "tracking": "NGB-20260826-2044",
      "status": "Not submitted / Returned for step therapy documentation",
      "reviewer": "A. Reyes, RN",
      "channel": "Secure fax · (503) 555-0137"
    },
    "primaryAction": "Return to prescriber",
    "labs": [
      [
        "Haemoglobin",
        "13.2 g/dL",
        "12.0 - 15.5 g/dL",
        "2026-08-04"
      ],
      [
        "Platelet count",
        "264 K/uL",
        "150 - 400 K/uL",
        "2026-08-04"
      ],
      [
        "Creatinine",
        "0.81 mg/dL",
        "0.59 - 1.04 mg/dL",
        "2026-08-04"
      ],
      [
        "ALT",
        "19 U/L",
        "7 - 35 U/L",
        "2026-08-04"
      ],
      [
        "Thyroid stimulating hormone",
        "2.1 mIU/L",
        "0.4 - 4.0 mIU/L",
        "2026-08-04"
      ],
      [
        "Pregnancy test, serum",
        "Negative",
        "Negative",
        "2026-08-04"
      ]
    ],
    "policyDoc": {
      "file": "policy.pdf",
      "label": "NGB-SPX-091",
      "sub": "payer medical policy",
      "kind": "POL",
      "size": "4.2 KB"
    },
    "formDocs": {
      "blank": {
        "file": "form_blank.pdf",
        "size": "4.5 KB"
      },
      "completed": {
        "file": "form_completed.pdf",
        "size": "5.5 KB"
      },
      "packet": {
        "file": "packet.pdf",
        "size": "15.6 KB"
      }
    },
    "repository": [
      {
        "file": "enrollment.pdf",
        "label": "Prescriber Enrollment / Start Form",
        "cite": "Enrollment",
        "kind": "PDF",
        "size": "4.7 KB"
      },
      {
        "file": "chart_note.pdf",
        "label": "Neurology Progress Note",
        "cite": "Chart Note",
        "kind": "PDF",
        "size": "3.9 KB"
      },
      {
        "file": "lab_report.pdf",
        "label": "Laboratory Report — Baseline Panel",
        "cite": "Lab Report",
        "kind": "PDF",
        "crmOnly": true,
        "size": "3.1 KB"
      }
    ]
  }
];
