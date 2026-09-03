"""Build every sample PDF for the Fusion Hub Services demo site."""
import os, json, shutil
from pypdf import PdfWriter, PdfReader
from pdfkit_hub import Doc
from case_data import CASES, BRAND
from narratives import N

OUT = "/home/claude/build/documents"
DISC = ("This document is synthetic and was produced for software demonstration purposes. "
        "It does not describe a real patient, prescriber, payer, or product.")


# --------------------------------------------------------------- helpers
def hdr(d, org, right, sub=None):
    """Small letterhead row."""
    c = d.c
    c.setFont("Helvetica-Bold", 8.6)
    c.drawString(54, d.y - 8, org.upper())
    c.setFont("Helvetica", 6.8)
    c.setFillColorRGB(0.42, 0.42, 0.45)
    c.drawRightString(558, d.y - 8, right)
    c.setFillColorRGB(0.08, 0.08, 0.09)
    d.y -= 14
    if sub:
        c.setFont("Helvetica", 6.8)
        c.setFillColorRGB(0.42, 0.42, 0.45)
        c.drawString(54, d.y - 7, sub)
        c.setFillColorRGB(0.08, 0.08, 0.09)
        d.y -= 12
    d.rule(12)


# --------------------------------------------------------------- 1. enrollment
def enrollment(case, path):
    p, pr, pay, t, dx = case["patient"], case["prescriber"], case["payer"], case["therapy"], case["dx"]
    renewal = "Renewal" in case["documents"][0]["label"]
    d = Doc(path, footer_left=f"{BRAND['hub']} | {BRAND['manufacturer']} | {case['id']}")
    hdr(d, BRAND["hub"], f"Received {case['received']}",
        f"{BRAND['manufacturer']} patient support program \u00b7 Hub case {case['id']}")
    d.title("PRESCRIBER ENROLLMENT / " + ("RENEWAL FORM" if renewal else "START FORM"), size=12)
    d.subtitle(f"{t['label']} \u00b7 {t['cls']}")

    d.bar("Section 1 - Patient information")
    d.field_grid([
        [("Patient name", p["name"], 2), ("Date of birth", p["dob"], 1), ("Sex", p["sex"], 1)],
        [("Hub patient ID", p["pid"], 1), ("Phone", p["phone"], 1), ("Consent on file", "Yes \u00b7 " + case["receivedIso"], 1)],
        [("Home address", p["address"], 1)],
    ])

    d.bar("Section 2 - Insurance")
    d.field_grid([
        [("Payer", pay["name"], 2), ("Plan", pay["plan"].split("\u00b7")[-1].strip(), 2)],
        [("Member ID", pay["memberId"], 1), ("Group number", pay["group"], 1), ("Coverage effective", pay["effective"], 1)],
        [("Benefit", pay["benefit"], 1), ("Secondary coverage", "None reported", 1)],
    ])

    d.bar("Section 3 - Prescriber")
    d.field_grid([
        [("Prescriber", pr["name"], 2), ("NPI", pr["npi"], 1), ("Tax ID", pr["tin"], 1)],
        [("Specialty", pr["specialty"], 1), ("Practice", pr["practice"], 2)],
        [("Phone", pr["phone"], 1), ("Fax", pr["fax"], 1)],
    ])

    d.bar("Section 4 - Prescription")
    d.field_grid([
        [("Product", t["label"], 3), ("J-code", t["jcode"], 1)],
        [("NDC", t["ndc"], 1), ("Strength", t["strength"], 2)],
        [("Dose", t["dose"], 1), ("Route", t["route"], 1), ("Frequency", t["frequency"], 2)],
        [("Quantity", t["quantity"], 1), ("Days supply", t["daysSupply"], 1), ("Duration requested", t["duration"], 1)],
        [("Site of care", t["siteOfCare"], 2), ("Requested start", t["startDate"], 1)],
        [("Diagnosis", dx["full"], 3), ("Request type", t["requestType"], 1)],
    ])

    d.bar("Section 5 - Prescriber notes")
    d.para(N[case["id"]]["enroll_notes"])

    d.bar("Section 6 - Prescriber signature")
    d.field_grid([
        [("Signature", pr["name"].split(",")[0], 2), ("Title", "MD", 1), ("Date signed", case["receivedIso"], 1)],
    ])
    d.note(DISC)
    d.save()


# --------------------------------------------------------------- 2. medical necessity
def smn(case, path):
    body = N[case["id"]]["smn"]
    if not body:
        return False
    p, pr, pay, t, dx = case["patient"], case["prescriber"], case["payer"], case["therapy"], case["dx"]
    d = Doc(path, footer_left=f"{pr['practice']} | Statement of Medical Necessity | {case['id']}")
    hdr(d, pr["practice"], f"Signed {case['receivedIso']}",
        f"{pr['name']} \u00b7 NPI {pr['npi']} \u00b7 {pr['specialty']} \u00b7 {pr['phone']}")
    d.title("STATEMENT OF MEDICAL NECESSITY", size=12)
    d.subtitle(f"{t['label']} \u00b7 Submitted to {pay['name']}")

    d.kv_lines([
        ("Patient", f"{p['name']} \u00b7 DOB {p['dob']} \u00b7 {p['sex']}"),
        ("Member ID", f"{pay['memberId']} \u00b7 {pay['plan']}"),
        ("Requested product", f"{t['label']} \u00b7 J-code {t['jcode']}"),
        ("Regimen", f"{t['dose']} {t['route'].lower()}, {t['frequency'].lower()}"),
        ("Diagnosis", dx["full"]),
    ])

    d.bar("Diagnosis and history")
    d.para(body["diagnosis"])
    d.bar("Disease severity")
    d.para(body["severity"])
    d.bar("Prior therapy")
    d.para(body["prior"])
    d.para(body["prior_topical"])
    d.bar("Clinical rationale for the requested product")
    d.para(body["rationale"])
    d.bar("Prescriber attestation")
    d.para(body["attestation"])
    d.field_grid([
        [("Prescriber signature", pr["name"].split(",")[0], 2), ("Title", "MD", 1), ("Date", case["receivedIso"], 1)],
    ])
    d.note(DISC)
    d.save()
    return True


# --------------------------------------------------------------- 3. chart note
def chart_note(case, path):
    body = N[case["id"]]["note"]
    if not body:
        return False
    p, pr, dx = case["patient"], case["prescriber"], case["dx"]
    d = Doc(path, footer_left=f"{pr['practice']} | {body['heading'].title()} | {case['id']}")
    hdr(d, pr["practice"], f"Encounter {case['receivedIso']}",
        f"{pr['name']} \u00b7 NPI {pr['npi']} \u00b7 {pr['specialty']}")
    d.title(body["heading"], size=12)
    d.subtitle(body["visit"])

    d.kv_lines([
        ("Patient", f"{p['name']} \u00b7 {p['age']} \u00b7 DOB {p['dob']}"),
        ("Patient ID", p["pid"]),
        ("Primary diagnosis", dx["full"]),
    ])
    for label, key in [("Subjective", "subjective"), ("Objective", "objective"),
                       ("Assessment", "assessment"), ("Plan", "plan")]:
        d.bar(label)
        d.para(body[key])
    d.field_grid([
        [("Electronically signed by", pr["name"], 2), ("Date / time", f"{case['receivedIso']} 14:02", 1)],
    ])
    d.note(DISC)
    d.save()
    return True


# --------------------------------------------------------------- 4. lab report
def lab_report(case, path):
    p, pr = case["patient"], case["prescriber"]
    d = Doc(path, footer_left=f"Meridian Reference Laboratory | Report | {case['id']}")
    hdr(d, "Meridian Reference Laboratory", "CLIA 14D0000000",
        "820 Winslow Parkway, Suite 300 \u00b7 Laboratory director: H. Nakamura, MD, PhD")
    matches = [x["label"] for x in case["documents"] if x["file"] == "lab_report.pdf"]
    title = matches[0] if matches else "Laboratory Report \u2014 Baseline Panel"
    d.title(title.upper(), size=12)
    d.subtitle(f"Ordered by {pr['name']} \u00b7 {pr['practice']}")

    d.kv_lines([
        ("Patient", f"{p['name']} \u00b7 DOB {p['dob']} \u00b7 {p['sex']}"),
        ("Patient ID", p["pid"]),
        ("Collected", case["labs"][0][3]),
        ("Reported", case["labs"][0][3]),
    ])
    d.bar("Results")
    d.table(["Test", "Result", "Reference range", "Collected"],
            case["labs"], [3.4, 1.6, 2.2, 1.4])
    d.bar("Interpretation")
    d.para(N[case["id"]]["lab_note"])
    d.note(DISC)
    d.save()


# --------------------------------------------------------------- 5. payer policy
def policy(case, path):
    pol, pay, t = case["policy"], case["payer"], case["therapy"]
    d = Doc(path, footer_left=f"{pay['name']} | Policy {pol['id']} | {pol['rev']}")
    d.title(f"MEDICAL POLICY {pol['id']}", size=13.5)
    d.subtitle(f"{pay['name']}  |  {pol['title']}  |  Effective {pol['effective']}")

    d.bar("Scope")
    d.para(f"This policy establishes the medical necessity criteria applied by {pay['name']} to requests "
           f"for {pol['title'].lower()} for commercial plan members. It applies to requests submitted "
           f"directly by a prescriber and to requests submitted by an authorised manufacturer hub agent "
           f"on the prescriber's behalf.")

    d.bar("Drugs requiring prior authorization")
    d.para(f"Prior authorization is required for products billed under the following codes: {t['jcode']}. "
           f"{t['jcode']} corresponds to {t['generic']}, marketed as {t['brand']}, "
           f"{t['strength'].lower()}.")

    d.bar("Drugs not requiring prior authorization")
    d.para(case["notRequired"])

    d.bar("Medical necessity criteria")
    d.para(f"{t['brand']} is considered medically necessary when all of the following criteria are met:")
    d.numlist(case["criteria"])

    d.bar("Exceptions")
    d.para(case["exceptions"])

    d.bar("Documentation requirements")
    d.para(case["docRequirements"])

    d.bar("Review timeframes")
    d.para("Standard requests are adjudicated within five (5) business days of receipt of a complete "
           "submission. Expedited requests are adjudicated within seventy-two (72) hours. An incomplete "
           "submission is returned with a written statement of the missing element and the review clock "
           "restarts on receipt of the complete packet.")

    d.bar("Coding")
    d.table(["Code", "Type", "Description"],
            [[t["jcode"], "HCPCS", f"{t['generic'].title()}, per billing unit"],
             [t["ndc"], "NDC", f"{t['brand']} {t['strength']}"],
             [case["dx"]["code"], "ICD-10-CM", case["dx"]["text"]]],
            [1.4, 1.0, 4.0])
    d.note(DISC)
    d.save()


# --------------------------------------------------------------- 6/7. payer form
def payer_form(case, path, filled):
    f, pay, p, pr, t, dx = case["form"], case["payer"], case["patient"], case["prescriber"], case["therapy"], case["dx"]
    tag = "completed" if filled else "blank"
    d = Doc(path, footer_left=f"{pay['name']} | Form {f['id']} | {tag}")
    d.title(f["name"].upper(), size=12)
    d.subtitle(f"{pay['name']}  |  Form {f['id']}  |  {f['rev']}  |  Policy {case['policy']['id']}")

    def v(x):
        return x if filled else None

    d.bar("Section A - Patient and coverage")
    d.field_grid([
        [("Patient name", v(p["name"]), 2), ("Date of birth", v(p["dob"]), 1), ("Sex", v(p["sex"]), 1)],
        [("Member ID", v(pay["memberId"]), 1), ("Group number", v(pay["group"]), 1),
         ("Coverage effective", v(pay["effective"]), 1)],
        [("Plan", v(pay["plan"]), 2), ("Benefit", v(pay["benefit"]), 2)],
    ])

    d.bar("Section B - Prescriber")
    d.field_grid([
        [("Prescriber", v(pr["name"]), 2), ("NPI", v(pr["npi"]), 1)],
        [("Specialty", v(pr["specialty"]), 1), ("Practice", v(pr["practice"]), 2)],
        [("Phone", v(pr["phone"]), 1), ("Fax", v(pr["fax"]), 1), ("Tax ID", v(pr["tin"]), 1)],
    ])

    d.bar("Section C - Requested therapy")
    d.field_grid([
        [("Requested product", v(t["label"]), 3), ("J-code", v(t["jcode"]), 1)],
        [("NDC", v(t["ndc"]), 1), ("Dose", v(t["dose"]), 1), ("Route", v(t["route"]), 1)],
        [("Frequency", v(t["frequency"]), 2), ("Quantity", v(t["quantity"]), 1), ("Days supply", v(t["daysSupply"]), 1)],
        [("Diagnosis", v(dx["full"]), 2), ("ICD-10", v(dx["code"]), 1), ("Request type", v(t["requestType"]), 1)],
        [("Site of care", v(t["siteOfCare"]), 2), ("Requested start", v(t["startDate"]), 1),
         ("Duration requested", v(t["duration"]), 1)],
    ])

    d.bar("Section D - Clinical review questions")
    d.para("Answer every question from the submitted documentation. For each answer, identify the "
           "document and page it is supported by.", size=7.2, gap_after=6)
    rows = []
    for i, q in enumerate(case["questions"], 1):
        if filled:
            src = f"{q['src']} {q['page']}" if q["src"] else "Not on file"
            rows.append([str(i), q["q"], q["a"], src])
        else:
            rows.append([str(i), q["q"], "", ""])
    d.table(["#", "Question", "Answer", "Supporting document / page"],
            rows, [0.4, 3.2, 2.6, 1.8])

    d.bar("Section E - Attestation")
    d.para("I certify that the information provided is accurate and that the requested therapy is "
           "medically necessary.", size=7.2, gap_after=6)
    sub = case["submission"]
    d.field_grid([
        [("Submitter name", v(sub["reviewer"]), 2), ("Title", v("Hub clinical reviewer"), 1),
         ("Date", v("2026-08-26"), 1)],
        [("Signature", v(sub["reviewer"]), 2), ("Hub case", v(case["id"]), 1),
         ("Tracking", v(sub["tracking"]) if filled else None, 1)],
    ])
    if filled and case["flags"]:
        d.bar("Reviewer flags")
        d.para(f"{case['flags']} item(s) require attention before this form is considered complete. "
               f"{case['assessment']['title']}.")
    d.note("This form is provided for demonstration purposes and is not the form of any real health plan.")
    d.save()


# --------------------------------------------------------------- 8. packet
def packet(case, folder):
    order = ["form_completed.pdf"] + [x["file"] for x in case["documents"]] + ["policy.pdf"]
    w = PdfWriter()
    for name in order:
        fp = os.path.join(folder, name)
        if os.path.exists(fp):
            for pg in PdfReader(fp).pages:
                w.add_page(pg)
    out = os.path.join(folder, "packet.pdf")
    with open(out, "wb") as fh:
        w.write(fh)


# --------------------------------------------------------------- run
def kb(path):
    return f"{os.path.getsize(path) / 1024:.1f} KB"


def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    manifest = {}
    for case in CASES:
        folder = os.path.join(OUT, case["id"])
        os.makedirs(folder, exist_ok=True)
        enrollment(case, os.path.join(folder, "enrollment.pdf"))
        smn(case, os.path.join(folder, "smn.pdf"))
        chart_note(case, os.path.join(folder, "chart_note.pdf"))
        lab_report(case, os.path.join(folder, "lab_report.pdf"))
        policy(case, os.path.join(folder, "policy.pdf"))
        payer_form(case, os.path.join(folder, "form_blank.pdf"), False)
        payer_form(case, os.path.join(folder, "form_completed.pdf"), True)
        packet(case, folder)

        sizes = {}
        for fn in sorted(os.listdir(folder)):
            sizes[fn] = kb(os.path.join(folder, fn))
        manifest[case["id"]] = sizes
        print(case["id"], sizes)

    with open("/home/claude/sizes.json", "w") as fh:
        json.dump(manifest, fh, indent=1)


if __name__ == "__main__":
    main()
