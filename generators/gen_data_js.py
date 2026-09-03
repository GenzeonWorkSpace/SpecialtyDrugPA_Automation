"""Export case data + real PDF file sizes to assets/data.js."""
import json, os
from case_data import CASES, BRAND

BUILD = "/home/claude/build"
sizes = json.load(open("/home/claude/sizes.json"))

EXTRA_DOCS = {
    # documents present in the CRM repository but not attached to the hub case
    "HUB-2042": [{"file": "chart_note.pdf", "label": "Hematology Progress Note",
                  "cite": "Chart Note", "kind": "PDF", "crmOnly": True}],
    "HUB-2044": [{"file": "lab_report.pdf", "label": "Laboratory Report \u2014 Baseline Panel",
                  "cite": "Lab Report", "kind": "PDF", "crmOnly": True}],
}

out = []
for c in CASES:
    c = json.loads(json.dumps(c))          # deep copy
    cid = c["id"]
    for doc in c["documents"]:
        doc["size"] = sizes[cid].get(doc["file"], "")
    c["policyDoc"] = {"file": "policy.pdf", "label": c["policy"]["id"],
                      "sub": "payer medical policy", "kind": "POL",
                      "size": sizes[cid]["policy.pdf"]}
    c["formDocs"] = {
        "blank": {"file": "form_blank.pdf", "size": sizes[cid]["form_blank.pdf"]},
        "completed": {"file": "form_completed.pdf", "size": sizes[cid]["form_completed.pdf"]},
        "packet": {"file": "packet.pdf", "size": sizes[cid]["packet.pdf"]},
    }
    # CRM repository = attached docs (minus policy) + any CRM-only extras
    repo = [{k: v for k, v in d.items() if k != "size"} | {"size": d["size"]}
            for d in c["documents"]]
    for extra in EXTRA_DOCS.get(cid, []):
        e = dict(extra)
        e["size"] = sizes[cid].get(e["file"], "")
        repo.append(e)
    c["repository"] = repo
    out.append(c)

os.makedirs(os.path.join(BUILD, "assets"), exist_ok=True)
with open(os.path.join(BUILD, "assets", "data.js"), "w") as fh:
    fh.write("/* Fusion Hub Services - demo content.\n"
             "   Everything here is synthetic. Edit this file to change the data shown\n"
             "   in the app; index.html and app.js do not need to be touched. */\n\n")
    fh.write("const BRAND = " + json.dumps(BRAND, indent=2, ensure_ascii=False) + ";\n\n")
    fh.write("const CASES = " + json.dumps(out, indent=2, ensure_ascii=False) + ";\n")
print("wrote data.js", os.path.getsize(os.path.join(BUILD, "assets", "data.js")), "bytes")
