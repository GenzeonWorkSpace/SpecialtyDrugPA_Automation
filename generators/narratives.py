"""Per-case body text for the clinical source documents. All content is synthetic."""

N = {
    # ------------------------------------------------------------- HUB-2041
    "HUB-2041": {
        "enroll_notes": "Patient has completed the ArvelisConnect enrollment and consent forms. Please initiate benefits investigation and prior authorization. Patient prefers shipment to home address. Nurse injection training requested for first dose.",
        "smn": {
            "diagnosis": "Marcus Ellison is a 54-year-old man with a 26 month history of moderate-to-severe plaque psoriasis, diagnosed in June 2024 and managed continuously in this practice since that time. Involvement is widespread across the trunk, extensor surfaces of both arms, and both shins.",
            "severity": "At today's visit body surface area involvement measures 18 percent and the PASI score is 16.4. The patient reports persistent pruritus interfering with sleep on most nights and has withdrawn from swimming, which he previously did three times a week. The Dermatology Life Quality Index is 17.",
            "prior": "The patient completed a trial of methotrexate 20 mg orally once weekly with folic acid supplementation, initiated 2025-11-04 and continued through 2026-02-24, a total of 16 weeks at a therapeutic dose. Adherence was verified through pharmacy refill history. PASI at week 16 was 15.9 against a pre-treatment PASI of 16.8, representing no clinically meaningful improvement. Methotrexate was discontinued for lack of efficacy, not for intolerance or cost.",
            "prior_topical": "Prior to systemic therapy the patient used clobetasol propionate 0.05 percent ointment and calcipotriene 0.005 percent for a combined nine months, and completed 24 sessions of narrowband UVB phototherapy between March and June 2025 with partial and non-durable response.",
            "rationale": "Velunexa is requested as the next line of therapy. Interleukin-23p19 inhibition is appropriate for a patient with widespread plaque disease refractory to conventional systemic therapy and phototherapy, and the every-twelve-week maintenance interval suits a patient whose adherence to weekly dosing has been a barrier. Tuberculosis and hepatitis screening are complete and negative, and there is no history of malignancy, active infection, or inflammatory bowel disease.",
            "attestation": "I certify that the information above is accurate, that I have personally examined this patient, and that Velunexa is medically necessary for the treatment of this condition.",
        },
        "note": {
            "heading": "DERMATOLOGY PROGRESS NOTE",
            "visit": "Follow-up visit \u00b7 Established patient",
            "subjective": "The patient returns for follow-up of moderate-to-severe plaque psoriasis, first diagnosed 26 months ago. He reports plaques on the trunk, both extensor forearms, and both shins that have not improved since the last visit. Pruritus wakes him most nights and he rates it 7 out of 10. He completed 16 weeks of methotrexate 20 mg weekly ending 2026-02-24 with no meaningful change and stopped it on my instruction for lack of efficacy. He denies fever, joint pain, morning stiffness, and gastrointestinal symptoms. He has not travelled outside the United States in the past two years.",
            "objective": "Well-appearing man in no distress. Skin examination shows well-demarcated erythematous plaques with adherent silvery scale over the trunk, bilateral extensor forearms, and bilateral shins. Body surface area involvement measures 18 percent by palm method. PASI is 16.4 (erythema 3, induration 3, desquamation 3 averaged across regions). No nail pitting or onycholysis. No joint swelling or tenderness. No lymphadenopathy.",
            "assessment": "Moderate-to-severe plaque psoriasis, L40.0, refractory to conventional systemic therapy and to narrowband UVB phototherapy. Body surface area 18 percent, PASI 16.4, DLQI 17. No clinically meaningful improvement on a completed 16 week methotrexate trial at a therapeutic dose. No contraindication to biologic therapy identified. Tuberculosis and hepatitis screening negative on 2026-07-18.",
            "plan": "Initiate Velunexa (velunekimab) 150 mg subcutaneously at weeks 0 and 4, then every 12 weeks. Enroll through ArvelisConnect for benefits investigation and prior authorization. Nurse injection training at first dose. Continue topical clobetasol as needed for breakthrough plaques. Recheck PASI and body surface area in 12 weeks. Repeat tuberculosis screening annually.",
        },
        "lab_note": "Screening panel drawn prior to initiation of biologic therapy. QuantiFERON-TB Gold Plus negative. Hepatitis B surface antigen and hepatitis C antibody non-reactive. Hepatic and renal function within reference range.",
    },

    # ------------------------------------------------------------- HUB-2042
    "HUB-2042": {
        "enroll_notes": "Patient enrolled for intravenous iron replacement. Two 750 mg doses requested, separated by at least seven days, at Cascade Infusion Center, which is in the plan network. Please confirm coverage and file the therapy start notification. Oral iron previously not tolerated.",
        "smn": None,
        "note": {
            "heading": "HEMATOLOGY PROGRESS NOTE",
            "visit": "New patient consultation",
            "subjective": "The patient is referred for evaluation of anaemia found on routine screening. She reports six months of progressive fatigue, exertional dyspnoea climbing two flights of stairs, and cold intolerance. She describes heavy menstrual bleeding for the past two years, lasting seven days with clot passage. She has no melena, haematochezia, or haematemesis. She tried ferrous sulfate 325 mg twice daily for eleven weeks beginning 2026-05-04 and stopped it because of persistent nausea and constipation despite dose reduction and food timing changes. Haemoglobin did not improve on oral therapy.",
            "objective": "Pale conjunctivae. No scleral icterus. Cardiovascular examination shows a soft systolic flow murmur at the left sternal border, no gallop. Lungs clear. Abdomen soft, non-tender, no organomegaly. No lymphadenopathy. Koilonychia of both thumbnails. Weight 61 kg.",
            "assessment": "Iron deficiency anaemia, D50.9, haemoglobin 9.1 g/dL with ferritin 8 ng/mL and transferrin saturation 9 percent, most consistent with chronic menstrual blood loss. Oral iron failed on tolerability grounds after an adequate eleven week trial. Total iron deficit calculated at approximately 1,450 mg by the Ganzoni method at a target haemoglobin of 14 g/dL. Intravenous replacement is indicated.",
            "plan": "Ferexa (ferric carbolate) 750 mg intravenously, two doses separated by at least seven days, at Cascade Infusion Center. Enrolled through ArvelisConnect for benefits verification. Repeat CBC and iron studies four weeks after the second dose. Referred to gynaecology for management of menorrhagia. Advised to stop oral iron.",
        },
        "lab_note": "Complete blood count and iron studies collected during evaluation for fatigue and exertional dyspnoea. Findings are consistent with iron deficiency anaemia. Oral ferrous sulfate 325 mg was tried for eleven weeks with persistent gastrointestinal intolerance and no improvement in haemoglobin.",
    },

    # ------------------------------------------------------------- HUB-2043
    "HUB-2043": {
        "enroll_notes": "Continuation request. Patient has been on Zymvora for 38 months under prior authorization AHP-20250214-1188, which expires 2026-09-14. Same dose requested, no change. Home infusion to continue with the current in-network provider. Please renew before the current authorization lapses.",
        "smn": {
            "diagnosis": "Daniel Okafor is a 63-year-old man with Gaucher disease type 1, confirmed in 2022 by a metabolic gene panel demonstrating biallelic pathogenic GBA1 variants (N370S / L444P) and by deficient acid beta-glucosidase activity on leukocyte assay at 1.4 nmol/mg/h against a reference range of 5.0 to 20.0.",
            "severity": "At diagnosis the patient had haemoglobin 9.8 g/dL, platelet count 74 K/uL, splenic volume 8.4 multiples of normal, and hepatic volume 1.9 multiples of normal, with bone pain in both femora. He has received enzyme replacement therapy continuously for 38 months.",
            "prior": "The patient has been maintained on Zymvora 60 units per kilogram every two weeks since 2023-07-12 under successive prior authorizations, most recently AHP-20250214-1188. Adherence has been complete, with no missed infusions in the past twelve months and no infusion reactions.",
            "prior_topical": "Substrate reduction therapy was considered in 2023 and deferred because of a documented interaction with the patient's antiarrhythmic regimen.",
            "rationale": "Continuation at the current dose is requested. Haematologic parameters have normalised on therapy and the patient remains clinically stable. Abdominal MRI performed 2025-11-20 showed splenic volume reduced to 3.1 multiples of normal and hepatic volume to 1.2 multiples of normal. A repeat MRI has been ordered and is scheduled for 2026-09-22; the report is not yet available.",
            "attestation": "I certify that the information above is accurate, that I have personally examined this patient, and that continued Zymvora therapy is medically necessary for the treatment of this condition.",
        },
        "note": {
            "heading": "METABOLIC CLINIC PROGRESS NOTE",
            "visit": "Six month follow-up \u00b7 Established patient",
            "subjective": "The patient returns for routine six month follow-up of Gaucher disease type 1 on enzyme replacement therapy, now in month 38. He reports no bone pain, no bleeding, and no abdominal fullness. Energy is good and he continues to work full time. He has not missed an infusion in the past twelve months and reports no infusion reactions. He asks about extending the interval between infusions.",
            "objective": "Well-appearing man. Abdomen soft, non-tender. Spleen palpable 2 cm below the left costal margin, reduced from 7 cm at diagnosis. Liver edge not palpable. No ecchymoses or petechiae. No bony tenderness over either femur. Weight 85 kg, stable.",
            "assessment": "Gaucher disease type 1, E75.22, stable on Zymvora 60 units per kilogram every two weeks. Haematologic response sustained: haemoglobin 13.4 g/dL and platelet count 168 K/uL on 2026-06-11, against pre-treatment values of 9.8 g/dL and 74 K/uL. Chitotriosidase remains elevated at 1,840 nmol/mL/h but has fallen from 14,200 at diagnosis. Last abdominal MRI was 2025-11-20, nine months ago, showing splenic volume 3.1 and hepatic volume 1.2 multiples of normal. Repeat imaging is overdue.",
            "plan": "Continue Zymvora 60 units per kilogram every two weeks; no dose change. Renewal submitted through ArvelisConnect ahead of the 2026-09-14 authorization expiry. Abdominal MRI ordered, scheduled 2026-09-22. Repeat CBC and biomarkers at that visit. Do not extend the infusion interval until imaging is reviewed. Return in six months or sooner if symptoms change.",
        },
        "lab_note": "Routine six month monitoring for Gaucher disease type 1 on enzyme replacement therapy. Haemoglobin and platelet count are stable and substantially improved over pre-treatment baseline. Chitotriosidase and glucosylsphingosine remain above reference range but continue to trend down.",
    },

    # ------------------------------------------------------------- HUB-2044
    "HUB-2044": {
        "enroll_notes": "New start requested for chronic migraine prophylaxis. Patient has failed topiramate. Please run benefits investigation and submit prior authorization. Patient is highly motivated to begin therapy before the autumn school term.",
        "smn": None,
        "note": {
            "heading": "NEUROLOGY PROGRESS NOTE",
            "visit": "Follow-up visit \u00b7 Established patient",
            "subjective": "The patient returns for follow-up of chronic migraine. She has maintained a headache diary for four months, averaging 17 headache days per month, of which 9 to 11 are migrainous with photophobia, phonophobia, and nausea. Attacks last 6 to 20 hours. She uses sumatriptan 100 mg for acute treatment on approximately 8 days per month with partial relief. She was started on topiramate 25 mg daily on 2026-05-12, titrated to 50 mg daily on 2026-05-26, and stopped it on 2026-06-16 after five weeks. She stopped because her out-of-pocket cost rose after a formulary change, not because of side effects; she reports she tolerated it without paraesthesia or cognitive complaints. She has not tried a beta blocker, a tricyclic, an antihypertensive, or onabotulinumtoxinA. She is not pregnant and is using contraception. There is no history of an adverse drug reaction requiring hospitalisation.",
            "objective": "Alert and oriented. Cranial nerves II through XII intact. Motor 5 out of 5 throughout. Sensation intact. Reflexes 2 plus and symmetric. Gait normal. Fundoscopic examination normal with sharp disc margins. No cervical or occipital tenderness. Blood pressure 118 over 74.",
            "assessment": "Chronic migraine without aura, intractable, G43.709, at 17 headache days per month by diary over four months. One preventive agent trialled: topiramate, 50 mg daily, five weeks, discontinued for out-of-pocket cost rather than intolerance or lack of efficacy. No beta blocker, tricyclic, or other preventive class has been attempted. No contraindication to remaining preventive classes is present. No pregnancy, no prior hospitalising adverse drug reaction. Not currently on any CGRP antagonist. Acute medication use is 8 days per month, below the medication overuse threshold.",
            "plan": "Requested Neuvexa (obeltamab) 140 mg subcutaneously every four weeks and enrolled the patient through ArvelisConnect. I recognise the plan may require a second preventive trial. If prior authorization is not approved, initiate propranolol LA 80 mg daily and titrate to 160 mg over four weeks, continue the headache diary, and reassess at eight weeks for resubmission. Continue sumatriptan for acute attacks and monitor acute medication days. Return in eight weeks.",
        },
        "lab_note": "Baseline laboratory panel prior to initiation of preventive therapy. All values within reference range. Serum pregnancy test negative.",
    },
}
