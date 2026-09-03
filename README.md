# Specialty Drug PA Automation — Fusion Hub Services

A demonstration site for agentic prior authorization in a **life science hub** setting,
built to the same structure and visual language as the Prior Authorization reference build.
The provider-side imaging PA content has been replaced with **Life Science Hub &
Specialty Drug PA Automation** content.

All patients, prescribers, payers, policies, forms, and products are synthetic.

---

## Running it

No build step, no server, no dependencies.

```
open index.html
```

Double-clicking `index.html` works, because every document link is a relative path.
If you'd rather serve it:

```
python3 -m http.server 5173
# then visit http://localhost:5173
```

---

## Screens

| Route | Screen |
|---|---|
| `#/portal` | Work queue — four incoming enrollment referrals |
| `#/case/HUB-2041` | Case workspace — pipeline, documents, payer form, evidence |
| `#/crm` | Northstar Hub Case Manager — the clinical source system |

**Flow:** open a case → **Run agent** → the eight pipeline stages tick off while the
payer form fields type in and the clinical questions get answered and cited → review the
assessment → **primary action** (varies by case) → submission receipt with tracking
number and runtime metrics. **Reset case** or **Reset demo** returns to the start.

---

## The four cases

| Case | Scenario | Patient | Therapy | Payer | Outcome |
|---|---|---|---|---|---|
| HUB-2041 | HAPPY | Marcus Ellison, 54M | Velunexa (velunekimab) — IL-23 inhibitor, plaque psoriasis | Anvara Health Plan | All criteria met → **Approve & submit** |
| HUB-2042 | STP | Priya Raman, 41F | Ferexa (ferric carbolate) — IV iron, iron deficiency anaemia | Cascadia Mutual | No PA required → **File notification** (questionnaire and form stages skip) |
| HUB-2043 | UPDATE | Daniel Okafor, 63M | Zymvora (alglucerase beta) — ERT, Gaucher type 1 | Anvara Health Plan | Imaging is 9 months old, policy needs 6 → **Request information** (1 flag) |
| HUB-2044 | REJECT | Alice Chen, 37F | Neuvexa (obeltamab) — anti-CGRP, chronic migraine | Northgate Benefit Trust | Step therapy not met → **Return to prescriber** (2 flags) |

Each case carries its own payer, medical policy, PA form, field count, criteria set, and
citation trail, so the four are not variations on one script.

---

## Sample documents

**34 real PDFs**, all downloadable. Every `view` opens the PDF in a new tab and every
`download` saves it. Nothing is a placeholder.

```
documents/
  HUB-2041/
    enrollment.pdf        Prescriber enrollment / start form
    smn.pdf               Statement of medical necessity
    chart_note.pdf        Specialist progress note
    lab_report.pdf        Laboratory report
    policy.pdf            Payer medical policy (criteria the agent applies)
    form_blank.pdf        Payer PA form, empty
    form_completed.pdf    Payer PA form, filled with cited answers
    packet.pdf            Assembled submission packet (form + docs + policy)
  HUB-2042/ … HUB-2044/   same shape
  all-sample-documents.zip
```

Download points in the UI:

- **Source documents** panel — `view` / `download` per document, plus the payer policy
- **Payer form** panel — blank form, completed form, and the assembled packet
- **Document packet** section — assembled packet
- **Submission receipt** — completed form and packet
- **CRM → Documents tab** — Open / Download per document
- **Work queue** — "Download all (ZIP)"

The completed form for each case is filled with that case's actual answers and citations,
including the unresolved items on HUB-2043 and HUB-2044.

---

## Changing the data

All content lives in **`assets/data.js`**. Edit that one file and the whole app follows —
`index.html`, `app.js`, and `app.css` don't need to be touched.

The shape of a case:

```js
{
  id, scenario,            // scenario: HAPPY | STP | UPDATE | REJECT (drives tone + flow)
  received, runtime, baseline, flags,
  patient   { name, age, dob, sex, pid, phone, address },
  payer     { name, short, plan, memberId, group, effective, benefit },
  therapy   { brand, generic, label, cls, jcode, ndc, dose, route,
              frequency, quantity, daysSupply, siteOfCare, duration,
              requestType, startDate, strength },
  dx        { code, text, full, severity },
  prescriber{ name, npi, specialty, practice, phone, fax, tin },
  policy    { id, title, effective, rev },
  form      { name, id, rev, fields, completed },
  documents [ { file, label, cite, kind, size } ],
  criteria  [ ... ],                       // medical necessity criteria
  questions [ { q, a, src, page, conf, why } ],
  packet    [ { label, criteria, why, missing? } ],
  stages    [ [name, seconds, tokens, mode, result] ],   // mode: cache|local|skipped
  assessment{ verdict, title, body },
  submission{ headline, tracking, status, reviewer, channel },
  labs      [ [test, result, range, collected] ],
  primaryAction
}
```

Notes on the fields that drive behaviour:

- **`scenario`** picks the colour tone, the final state after the primary action, and
  whether the questionnaire/form stages are skipped (`STP`).
- **`questions[].src`** must match a `documents[].cite` value, or be `"Policy"`, or be
  `null`. `null` renders as "Not on file" in amber and marks the answer as missing.
- **`questions[].conf`** of `"low"` renders the amber Low-confidence pill.
- **`stages[].mode`** of `"skipped"` greys the stage and shows a dash instead of a tick.
- **`packet[].missing`** highlights a gap in the document packet.

To regenerate the PDFs after changing the data, the generator scripts used to build them
are `pdfkit_hub.py`, `case_data.py`, `narratives.py`, and `gen_docs.py`.

---

## Files

```
index.html            entry point
assets/app.css        theme and layout
assets/app.js         routing, views, agent run animation
assets/data.js        all content — edit this
documents/            34 sample PDFs + ZIP
```

Built with no framework and no external requests, so it runs offline and from `file://`.
Responsive down to mobile, keyboard focus visible, and `prefers-reduced-motion` respected.
