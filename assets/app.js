/* Fusion Hub Services - Specialty Drug PA Automation (demo)
   Vanilla JS, hash routing, no build step, runs from file:// */

'use strict';

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
const byId = (id) => CASES.find((c) => c.id === id);
const docPath = (cid, file) => `documents/${cid}/${file}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ----------------------------------------------------------- run state
   Persisted for the session so navigating away and back keeps the result. */
const RUN = {};
CASES.forEach((c) => { RUN[c.id] = { state: 'new', note: '' }; });

const STATUS_LABEL = {
  new: ['NEW', ''],
  running: ['WORKING', 'review'],
  worked: ['AWAITING REVIEW', 'review'],
  submitted: ['SUBMITTED', 'done'],
  hold: ['ON HOLD', 'hold'],
  returned: ['RETURNED', 'returned'],
};

/* Final status after the primary action, per scenario. */
const FINAL_STATE = { HAPPY: 'submitted', STP: 'submitted', UPDATE: 'hold', REJECT: 'returned' };

const TONE = { HAPPY: '', STP: '', UPDATE: 'warn', REJECT: 'bad' };

/* Per-scenario wording for the payer form block. */
function formTitles(c) {
  if (c.scenario === 'STP') {
    return { form: 'Therapy start notification', qs: 'Coverage review questions',
             qsHint: 'Answered from the submitted documentation. Each answer is cited.' };
  }
  return { form: 'Payer form', qs: 'Clinical review questions',
           qsHint: 'Answered from the submitted documentation. Each answer is cited.' };
}

/* ----------------------------------------------------------- chrome */
function appbar() {
  return `
  <header class="appbar">
    <a class="brand" href="#/portal">
      <span class="mark">F</span>
      <b>${esc(BRAND.platform)}</b>
      <span>${esc(BRAND.product)}</span>
    </a>
    <div class="spacer"></div>
    <button class="btn" id="reset-demo">&#8635; Reset demo</button>
    <a class="btn" href="#/crm">Open CRM &#8599;</a>
    <span class="chip-live"><i class="dot"></i>Live &middot; ${esc(BRAND.model)} &middot; Cached</span>
  </header>`;
}

/* ----------------------------------------------------------- work queue */
function viewQueue() {
  const notStarted = CASES.filter((c) => RUN[c.id].state === 'new').length;

  const rows = CASES.map((c) => {
    const st = RUN[c.id].state;
    const [label, cls] = STATUS_LABEL[st];
    return `
    <a class="trow" href="#/case/${c.id}">
      <div>
        <div class="idline">
          <b>${esc(c.id)}</b>
          <span class="tag ${c.scenario.toLowerCase()}">${esc(c.scenario)}</span>
        </div>
        <div class="cell-sub">${esc(c.payer.name)}</div>
      </div>
      <div>
        <div class="cell-strong">${esc(c.patient.name)}</div>
        <div class="cell-sub">${esc(c.patient.pid)} &middot; ${esc(c.patient.age)}</div>
      </div>
      <div>
        <div class="cell-strong">${esc(c.therapy.label)}</div>
        <div class="cell-sub">${esc(c.therapy.jcode)} &middot; ${esc(c.dx.code)} ${esc(c.dx.text)}</div>
      </div>
      <div class="cell-sub" style="margin:0">${esc(c.received)}</div>
      <div class="cell-sub" style="margin:0">${c.documents.length}</div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="status ${cls}">${esc(label)}</span>
        <span class="open">open &rarr;</span>
      </div>
    </a>`;
  }).join('');

  return `
  ${appbar()}
  <main class="wrap">
    <div class="queue-head">
      <div class="lede">
        <div class="eyebrow">${esc(BRAND.tagline)} &middot; Work queue</div>
        <h1>Incoming Requests</h1>
        <p class="lede" style="margin-top:12px">
          Enrollment referrals received from prescriber offices through ${esc(BRAND.hub)},
          awaiting benefits investigation and prior authorization workup against payer
          specialty drug policy.
        </p>
      </div>
      <div class="stats">
        <div class="stat"><b>${CASES.length}</b><span>In queue</span></div>
        <div class="stat"><b class="on">${notStarted}</b><span>Not started</span></div>
      </div>
    </div>

    <div class="table">
      <div class="thead">
        <div>Case</div><div>Patient</div><div>Requested therapy</div>
        <div>Received</div><div>Docs</div><div>Status</div>
      </div>
      ${rows}
    </div>

    <div class="zipbar">
      <span>Every source document, payer policy, and payer form in this environment is a real
        downloadable PDF.</span>
      <a class="btn" href="documents/all-sample-documents.zip" download>&#8681; Download all (ZIP)</a>
    </div>

    <p class="footnote">All patients, prescribers, payers, policies, and products in this
      environment are synthetic and created for demonstration.</p>
  </main>`;
}

/* ----------------------------------------------------------- case: sidebar */
function pipelineHTML(c, upto) {
  return c.stages.map((s, i) => {
    const [name, secs, toks, mode, result] = s;
    const skipped = mode === 'skipped';
    let cls = 'stage';
    let mark = String(i + 1);
    if (upto === null) { cls += ''; }
    else if (i < upto) { cls += skipped ? ' skip' : ' done'; mark = skipped ? '&ndash;' : '&#10003;'; }
    else if (i === upto) { cls += ' working'; mark = ''; }

    const meta = [];
    if (secs) meta.push(`<em>${esc(secs)}</em>`);
    if (toks) meta.push(`<em>&middot; ${esc(toks)}</em>`);
    if (mode) meta.push(`<span class="pill ${mode}">${esc(mode)}</span>`);

    const showDetail = upto !== null && i <= upto;
    return `
    <div class="stage ${cls}" data-stage="${i}">
      <div class="icon">${mark}</div>
      <div>
        <div class="name">${esc(name)}</div>
        ${showDetail && meta.length ? `<div class="meta">${meta.join('')}</div>` : ''}
        ${showDetail ? `<div class="result">${esc(i === upto ? 'working' : result)}</div>` : ''}
      </div>
    </div>`;
  }).join('');
}

function docRow(cid, d, kind) {
  const p = docPath(cid, d.file);
  return `
  <div class="doc">
    <span class="ftype ${kind || ''}">${esc(d.kind)}</span>
    <div>
      <div class="label">${esc(d.label)}</div>
      <div class="size">${esc(d.sub ? d.sub : d.size)}</div>
    </div>
    <div class="acts">
      <a href="${p}" target="_blank" rel="noopener">view</a>
      <a href="${p}" download>download</a>
    </div>
  </div>`;
}

function sidebarHTML(c, upto) {
  const t = formTitles(c);
  const started = upto !== null;
  return `
  <aside>
    <section class="panel">
      <div class="panel-head">
        <div class="eyebrow">Agent pipeline</div>
        <h3>Workflow stages</h3>
      </div>
      ${started ? `<div style="padding:6px 0 10px">${pipelineHTML(c, upto)}</div>`
                : `<div class="panel-body"><p>Eight stages will run against this referral:
                     intake, patient context, policy, the authorization determination,
                     document assembly, the payer questionnaire, form completion, and packet
                     preparation.</p></div>`}
    </section>

    <section class="panel">
      <div class="panel-head">
        <div class="eyebrow">Source documents</div>
        <h3>Attached to this case</h3>
      </div>
      <div>
        ${c.documents.map((d) => docRow(c.id, d)).join('')}
        ${docRow(c.id, c.policyDoc, 'pol')}
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div class="eyebrow">${esc(t.form)}</div>
        <h3>Form to be completed</h3>
      </div>
      <div class="formcard">
        <div class="fname">
          <span class="ftype form" style="width:34px;height:26px">FORM</span>
          <div>
            <div class="label">${esc(c.form.name)}</div>
            <div class="sub">${esc(c.payer.name)} &middot; ${esc(c.form.id)}<br>
              ${esc(c.policy.id)} &middot; ${esc(c.form.rev)}</div>
          </div>
        </div>
        <div class="count"><b>${c.form.fields}</b><span>Fields</span></div>
        <div class="frow">
          <a class="btn" href="${docPath(c.id, c.formDocs.blank.file)}" target="_blank" rel="noopener">View blank form</a>
          <a class="btn" href="${docPath(c.id, c.formDocs.blank.file)}" download>&#8681;</a>
        </div>
        ${started ? `
        <div class="frow">
          <a class="btn" href="${docPath(c.id, c.formDocs.completed.file)}" target="_blank" rel="noopener">Completed form</a>
          <a class="btn" href="${docPath(c.id, c.formDocs.completed.file)}" download>&#8681;</a>
        </div>
        <div class="frow">
          <a class="btn" href="${docPath(c.id, c.formDocs.packet.file)}" download
             style="flex:1;text-align:center">&#8681; Submission packet (${esc(c.formDocs.packet.size)})</a>
        </div>` : ''}
      </div>
    </section>
  </aside>`;
}

/* ----------------------------------------------------------- case: blocks */
/* filled=true renders the value straight into the box (static view);
   filled=false leaves it empty and stashes the value for the typing animation. */
function field(label, value, src, filled) {
  return `
  <div class="f">
    <label>${esc(label)}</label>
    <div class="box">${filled ? esc(value) : ''}</div>
    ${src ? `<div class="src">${src}</div>` : ''}
    ${filled ? '' : `<template>${esc(value)}</template>`}
  </div>`;
}

function blockSummary(c) {
  const p = c.patient, pr = c.prescriber, t = c.therapy;
  return `
  <section class="card reveal" id="b-summary">
    <div class="card-head">
      <div class="eyebrow">1 &middot; Request summary</div>
      <h2>Patient, prescriber, and therapy</h2>
    </div>
    <div class="card-body">
      <div class="sgrid">
        <div><div class="k">Patient</div><div class="v">${esc(p.name)}</div></div>
        <div><div class="k">Patient ID / DOB</div><div class="v mono">${esc(p.pid)} &middot; ${esc(p.dob)}</div></div>
        <div><div class="k">Plan</div><div class="v">${esc(c.payer.plan)}<br><span class="mono muted">${esc(c.payer.memberId)}</span></div></div>
        <div><div class="k">Prescriber</div><div class="v">${esc(pr.name)}<br><span class="mono muted">NPI ${esc(pr.npi)} &middot; ${esc(pr.specialty)}</span></div></div>
        <div><div class="k">Therapy</div><div class="v">${esc(t.label)}<br><span class="mono muted">${esc(t.jcode)} &middot; ${esc(t.dose)} ${esc(t.route.toLowerCase())}</span></div></div>
        <div><div class="k">Diagnosis</div><div class="v">${esc(c.dx.full)}<br><span class="mono muted">${esc(c.dx.severity)}</span></div></div>
      </div>
    </div>
  </section>`;
}

function blockPa(c) {
  return `
  <section class="card reveal" id="b-pa">
    <div class="card-head">
      <div class="eyebrow">2 &middot; PA requirement</div>
      <h2>${c.scenario === 'STP' ? 'Why authorization does not apply' : 'Why authorization is required'}</h2>
    </div>
    <div class="card-body">
      <p style="margin:0;font-size:13px;line-height:1.7;color:var(--ink-2)">${esc(c.paRequirement)}</p>
      <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;align-items:center">
        <span class="cite">${esc(c.policy.id)}</span>
        <span class="muted" style="font-size:12px">${esc(c.policy.title)}</span>
        <a class="cite" href="${docPath(c.id, 'policy.pdf')}" target="_blank" rel="noopener">Policy p1</a>
      </div>
    </div>
  </section>`;
}

function blockForm(c, filled) {
  const t = formTitles(c);
  const p = c.patient, pr = c.prescriber, th = c.therapy, pay = c.payer;
  return `
  <section class="card reveal" id="b-form">
    <div class="card-head">
      <div class="eyebrow">3 &middot; ${esc(t.form)}</div>
      <h2>${esc(c.form.name)}
        <span class="hint">&mdash; ${esc(pay.name)} &middot; ${esc(c.form.id)} &middot; ${esc(c.form.rev)}</span></h2>
    </div>
    <div class="card-body">

      <div class="section" id="sec-a">
        <div class="subhead"><span class="badge">A</span>
          <span class="t">Patient &amp; coverage</span>
          <span class="d">&mdash; Retrieved from the hub case management system.</span></div>
        <div class="fgrid">
          ${field('Patient name', p.name, 'CRM &middot; FHIR Patient', filled)}
          ${field('Date of birth', p.dob, 'CRM &middot; FHIR Patient', filled)}
          ${field('Sex', p.sex, 'CRM &middot; FHIR Patient', filled)}
          ${field('Patient ID', p.pid, 'CRM &middot; FHIR Patient', filled)}
          ${field('Plan', pay.plan, 'CRM &middot; FHIR Coverage', filled)}
          ${field('Member ID', pay.memberId, 'CRM &middot; FHIR Coverage', filled)}
          ${field('Group number', pay.group, 'CRM &middot; FHIR Coverage', filled)}
          ${field('Coverage effective', pay.effective, 'CRM &middot; FHIR Coverage', filled)}
          ${field('Benefit', pay.benefit, 'CRM &middot; FHIR Coverage', filled)}
        </div>
      </div>

      <div class="section" id="sec-b">
        <div class="subhead"><span class="badge">B</span>
          <span class="t">Prescriber</span>
          <span class="d">&mdash; Extracted from the signed enrollment form.</span></div>
        <div class="fgrid">
          ${field('Prescriber', pr.name, 'Enrollment', filled)}
          ${field('NPI', pr.npi, 'Enrollment', filled)}
          ${field('Specialty', pr.specialty, 'Enrollment', filled)}
          ${field('Practice', pr.practice, 'Enrollment', filled)}
          ${field('Phone', pr.phone, 'Enrollment', filled)}
          ${field('Fax', pr.fax, 'Enrollment', filled)}
        </div>
      </div>

      <div class="section" id="sec-c">
        <div class="subhead"><span class="badge">C</span>
          <span class="t">Requested therapy</span>
          <span class="d">&mdash; Extracted from the prescription section.</span></div>
        <div class="fgrid">
          ${field('Requested product', th.label, 'Enrollment', filled)}
          ${field('J-code', th.jcode, 'Enrollment', filled)}
          ${field('NDC', th.ndc, 'Enrollment', filled)}
          ${field('Dose', th.dose, 'Enrollment', filled)}
          ${field('Route', th.route, 'Enrollment', filled)}
          ${field('Frequency', th.frequency, 'Enrollment', filled)}
          ${field('Quantity', th.quantity, 'Enrollment', filled)}
          ${field('Days supply', th.daysSupply, 'Enrollment', filled)}
          ${field('Request type', th.requestType, 'Enrollment', filled)}
          ${field('Site of care', th.siteOfCare, 'Enrollment', filled)}
          ${field('Requested start', th.startDate, 'Enrollment', filled)}
          ${field('Duration requested', th.duration, 'Enrollment', filled)}
        </div>
      </div>

      <div class="section" id="sec-d">
        <div class="subhead"><span class="badge">D</span>
          <span class="t">${esc(t.qs)}</span>
          <span class="d">&mdash; ${esc(t.qsHint)}</span></div>
        <div id="qlist">${c.questions.map((q, i) => qHTML(c, q, i, filled)).join('')}</div>
      </div>

    </div>
  </section>`;
}

function qHTML(c, q, i, filled) {
  const conf = q.conf === 'low' ? 'low' : 'high';
  const cite = q.src
    ? `<a class="cite" href="${docPath(c.id, srcFile(c, q.src))}" target="_blank" rel="noopener">${esc(q.src)} <s>${esc(q.page)}</s></a>`
    : `<span class="cite none">Not on file</span>`;
  return `
  <div class="q" data-q="${i}">
    <div class="qtop">
      <span class="num">${i + 1}.</span>
      <span class="qt">${esc(q.q)}</span>
      <span class="conf ${conf}"><i class="dot"></i>${conf === 'low' ? 'Low confidence' : 'High confidence'}</span>
    </div>
    <div class="ans">
      ${filled
        ? (q.src ? `<b>${esc(q.a)}</b>` : `<span class="miss">${esc(q.a)}</span>`)
        : `<span class="pending">not answered</span>`}
      ${cite}
      ${filled ? '<span class="edit">edit</span>' : ''}
    </div>
    <div class="why">${esc(q.why)}</div>
    ${filled ? '' : `<template>${esc(q.a)}</template>`}
  </div>`;
}

/* Map a citation label back to the file that backs it. */
function srcFile(c, label) {
  if (label === 'Policy') return 'policy.pdf';
  const hit = c.documents.find((d) => d.cite === label);
  return hit ? hit.file : 'policy.pdf';
}

function blockPacket(c) {
  const anyMissing = c.packet.some((p) => p.missing);
  return `
  <section class="card reveal" id="b-packet">
    <div class="card-head" style="display:flex;align-items:center;gap:14px">
      <div style="flex:1">
        <div class="eyebrow">4 &middot; Supporting documents</div>
        <h2>Document packet</h2>
      </div>
      <span class="badge-complete ${anyMissing ? 'warn' : ''}">${anyMissing ? 'Incomplete' : 'Complete'}</span>
    </div>
    <div class="card-body">
      ${c.packet.map((p) => `
        <div class="pk ${p.missing ? 'missing' : ''}">
          <span class="l">${esc(p.label)}</span>
          <span class="c">${esc(p.criteria)}</span>
          <span class="w">${esc(p.why)}</span>
        </div>`).join('')}
      <div style="margin-top:14px">
        <a class="btn" href="${docPath(c.id, c.formDocs.packet.file)}" download>
          &#8681; Download assembled packet (${esc(c.formDocs.packet.size)})</a>
      </div>
    </div>
  </section>`;
}

function blockEvidence(c) {
  const cited = c.questions.filter((q) => q.src).length;
  return `
  <section class="card reveal" id="b-evidence">
    <div class="card-head" style="display:flex;align-items:center;gap:14px">
      <div style="flex:1">
        <div class="eyebrow">5 &middot; Evidence</div>
        <h2>Where every answer came from</h2>
      </div>
      <span class="eyebrow">${cited} cited</span>
    </div>
    <div class="card-body">
      ${c.questions.map((q, i) => `
        <div class="ev">
          <span class="n">q${i + 1}</span>
          <span class="q">${esc(q.q)}</span>
          <span class="a ${q.src ? '' : 'miss'}">${esc(q.a)}</span>
          ${q.src
            ? `<a class="cite" href="${docPath(c.id, srcFile(c, q.src))}" target="_blank" rel="noopener">${esc(q.src)} <s>${esc(q.page)}</s></a>`
            : `<span class="cite none">Not on file</span>`}
        </div>`).join('')}
    </div>
  </section>`;
}

function blockAssessment(c) {
  const tone = TONE[c.scenario];
  const a = c.assessment;
  return `
  <section class="card assess ${tone} reveal" id="b-assess">
    <div class="card-body">
      <div>
        <span class="eyebrow">Agent assessment</span>
        <span class="verdict">${esc(a.verdict)}</span>
      </div>
      <h2>${esc(a.title)}</h2>
      <p>${esc(a.body)}</p>
    </div>
  </section>`;
}

function blockSubmitted(c) {
  const s = c.submission;
  const st = RUN[c.id].state;
  const note = RUN[c.id].note;

  let tone = TONE[c.scenario];
  let headline = s.headline;
  let status = s.status;
  let eyebrow = (c.scenario === 'HAPPY' || c.scenario === 'STP') ? 'Submission ready' : 'Action taken';

  // The reviewer rejected a case the agent did not recommend rejecting.
  if (st === 'returned' && c.scenario !== 'REJECT') {
    tone = 'bad';
    headline = `Returned to ${c.prescriber.practice}`;
    status = 'Not submitted / Rejected by reviewer';
    eyebrow = 'Action taken';
  }

  return `
  <section class="card subcard ${tone} reveal">
    <div class="card-body">
      <div class="top">
        <span class="tick">${tone === 'bad' ? '&#10005;' : '&#10003;'}</span>
        <div>
          <div class="eyebrow">${esc(eyebrow)}</div>
          <h2>${esc(headline)}</h2>
        </div>
      </div>
      <div class="sgrid" style="margin-top:20px">
        <div><div class="k">Tracking number</div><div class="v mono" style="color:var(--accent)">${esc(s.tracking)}</div></div>
        <div><div class="k">Status</div><div class="v">${esc(status)}</div></div>
        <div><div class="k">Reviewed by</div><div class="v">${esc(s.reviewer)}</div></div>
        <div><div class="k">Channel</div><div class="v">${esc(s.channel)}</div></div>
        <div><div class="k">Packet</div><div class="v"><a href="${docPath(c.id, c.formDocs.packet.file)}" download style="color:var(--accent)">Download (${esc(c.formDocs.packet.size)})</a></div></div>
        <div><div class="k">Completed form</div><div class="v"><a href="${docPath(c.id, c.formDocs.completed.file)}" download style="color:var(--accent)">Download (${esc(c.formDocs.completed.size)})</a></div></div>
      </div>
      ${note ? `<div class="note-line"><em>Note</em>${esc(note)}</div>` : ''}
      <div class="divider"></div>
      <div class="metrics">
        <div class="m"><b class="on">${esc(c.runtime)}</b><span>Agent runtime</span></div>
        <div class="m"><b>${esc(c.baseline)}</b><span>Manual baseline</span></div>
        <div class="m"><b>${esc(c.baseline)}</b><span>Staff time avoided</span></div>
        <div class="m"><b>${c.flags}</b><span>Flags at review</span></div>
        <div style="margin-left:auto"><button class="btn" id="reset-case">Reset case</button></div>
      </div>
      <p class="footnote" style="margin-top:12px">Manual baseline is an illustrative figure for
        demonstration, not measured data.</p>
    </div>
  </section>`;
}

function actionBar(c) {
  const tone = TONE[c.scenario];
  return `
  <div class="actionbar" id="actionbar">
    <input id="rev-note" placeholder="Reviewer note (optional)" value="${esc(RUN[c.id].note)}">
    <button class="btn-ghost" id="act-reject">Reject</button>
    <button class="btn-primary ${tone}" id="act-primary">${esc(c.primaryAction)}</button>
  </div>`;
}

/* ----------------------------------------------------------- case view */
function viewCase(c) {
  const r = RUN[c.id];
  const [label, cls] = STATUS_LABEL[r.state];
  const done = r.state !== 'new' && r.state !== 'running';
  const finished = ['submitted', 'hold', 'returned'].includes(r.state);

  const head = `
  <div class="case-head">
    <div class="grow">
      <a class="back" href="#/portal">&larr; Work queue</a>
      <div class="title-row">
        <h1>${esc(c.id)}</h1>
        <span class="tag ${c.scenario.toLowerCase()}">${esc(c.scenario)}</span>
        <span class="status ${cls}">${esc(label)}</span>
        ${done ? `<span class="status">Demo mode &middot; cached</span>` : ''}
      </div>
      <div class="case-sub">
        ${esc(c.patient.name)} &middot; ${esc(c.patient.age)} &middot;
        <span class="mono">${esc(c.patient.pid)}</span> &mdash;
        <b>${esc(c.therapy.label)}</b>
        <span class="mono">(${esc(c.therapy.jcode)})</span> &middot; ${esc(c.payer.name)}
      </div>
    </div>
    <div class="head-actions">
      ${done ? `<div class="runtime"><b>${esc(c.runtime)}</b><span>Agent runtime</span></div>
                <button class="btn" id="reset-case-top">Reset case</button>`
             : `<button class="btn-primary" id="run-agent" ${r.state === 'running' ? 'disabled' : ''}>Run agent</button>`}
    </div>
  </div>
  <div class="divider"></div>`;

  const ready = `
  <section class="card">
    <div class="ready">
      <div class="bolt">&#9889;</div>
      <h2>Ready to work this request</h2>
      <p>The agent will read the ${c.documents.length} attached documents, pull
        ${esc(c.patient.first)}'s record from the hub case management system, apply
        ${esc(c.payer.name)} policy
        <a href="${docPath(c.id, 'policy.pdf')}" target="_blank" rel="noopener">${esc(c.policy.id)}</a>,
        and complete all ${c.form.fields} fields of
        <a href="${docPath(c.id, c.formDocs.blank.file)}" target="_blank" rel="noopener">form ${esc(c.form.id)}</a>
        &mdash; citing a source for every clinical answer.</p>
      <button class="btn-primary" id="run-agent-2">Run agent</button>
      <div class="base">Manual baseline for this task: ${esc(c.baseline)} (illustrative)</div>
    </div>
  </section>`;

  let main;
  if (r.state === 'new') main = ready;
  else if (finished) main = blockSubmitted(c) + blockAssessment(c) + blockSummary(c)
    + blockPa(c) + blockForm(c, true) + blockPacket(c) + blockEvidence(c);
  else if (r.state === 'worked') main = blockAssessment(c) + blockSummary(c) + blockPa(c)
    + blockForm(c, true) + blockPacket(c) + blockEvidence(c) + actionBar(c);
  else main = `<div id="stream"></div>`;

  return `
  ${appbar()}
  <main class="wrap">
    ${head}
    <div class="layout">
      ${sidebarHTML(c, r.state === 'new' ? null : c.stages.length)}
      <div id="mainpane">${main}</div>
    </div>
  </main>`;
}

/* ----------------------------------------------------------- the run */
async function typeInto(box, text, speed = 9) {
  box.textContent = '';
  const caret = document.createElement('span');
  caret.className = 'caret';
  box.appendChild(caret);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || text.length > 60) {
    box.textContent = text;
    return;
  }
  for (let i = 0; i < text.length; i++) {
    caret.insertAdjacentText('beforebegin', text[i]);
    if (i % 2 === 0) await sleep(speed);
  }
  caret.remove();
  box.textContent = text;
}

async function fillSection(root, sel, stagger = 55) {
  const sec = $(sel, root);
  if (!sec) return;
  const fields = [...sec.querySelectorAll('.f')];
  for (const f of fields) {
    f.classList.add('typing');
    const tpl = f.querySelector('template');
    const val = tpl ? tpl.innerHTML.replace(/&amp;/g, '&').replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>').replace(/&quot;/g, '"') : '';
    await typeInto(f.querySelector('.box'), val);
    f.classList.remove('typing');
    await sleep(stagger);
  }
}

async function answerQuestions(root, c) {
  const items = [...root.querySelectorAll('#qlist .q')];
  for (let i = 0; i < items.length; i++) {
    const el = items[i];
    const q = c.questions[i];
    const tpl = el.querySelector('template');
    const val = tpl ? tpl.textContent : q.a;
    const pending = el.querySelector('.pending');
    if (pending) {
      const b = document.createElement(q.src ? 'b' : 'span');
      if (!q.src) b.className = 'miss';
      b.textContent = val;
      pending.replaceWith(b);
    }
    el.classList.add('reveal');
    await sleep(190);
  }
}

async function runAgent(c) {
  const r = RUN[c.id];
  if (r.state !== 'new') return;
  r.state = 'running';

  const stageWrap = $('aside .panel:first-child');
  const pane = $('#mainpane');
  pane.innerHTML = `<div id="stream"></div>`;
  const stream = $('#stream');
  const runBtn = $('#run-agent');
  if (runBtn) { runBtn.disabled = true; runBtn.textContent = 'Working\u2026'; }

  const paint = (upto) => {
    stageWrap.innerHTML = `
      <div class="panel-head">
        <div class="eyebrow">Agent pipeline</div>
        <h3>Workflow stages</h3>
      </div>
      <div style="padding:6px 0 10px">${pipelineHTML(c, upto)}</div>`;
  };

  // Build every block up front, in the order they settle into, then reveal in place.
  // This keeps the layout stable while the run streams.
  stream.innerHTML = blockAssessment(c) + blockSummary(c) + blockPa(c)
    + blockForm(c, false) + blockPacket(c) + blockEvidence(c) + actionBar(c);
  [...stream.children].forEach((el) => { el.hidden = true; el.classList.remove('reveal'); });

  const show = (id) => {
    const el = $(id, stream);
    if (el) { el.hidden = false; el.classList.add('reveal'); }
  };

  bindCaseEvents(c);   // wire the action bar now; it is revealed at the last stage

  const isStp = c.scenario === 'STP';

  for (let i = 0; i < c.stages.length; i++) {
    const [, secs, , mode] = c.stages[i];
    paint(i);
    const wait = mode === 'skipped' ? 260
      : Math.min(1500, Math.max(420, (parseFloat(secs) || 1) * 260));
    await sleep(wait);

    // reveal the block(s) tied to this stage
    if (i === 0) show('#b-summary');
    if (i === 1) { show('#b-form'); await fillSection(stream, '#sec-a'); }
    if (i === 2) show('#b-pa');
    if (i === 3 && isStp) await answerQuestions(stream, c);
    if (i === 4) show('#b-packet');
    if (i === 5 && !isStp) await answerQuestions(stream, c);
    if ((!isStp && i === 6) || (isStp && i === 7)) {
      await fillSection(stream, '#sec-b', 40);
      await fillSection(stream, '#sec-c', 40);
    }
    if (i === c.stages.length - 1) {
      show('#b-assess');
      show('#b-evidence');
      show('#actionbar');
    }
    paint(i + 1);
  }

  r.state = 'worked';
  render();
  const bar = $('#actionbar');
  if (bar) bar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ----------------------------------------------------------- CRM */
const CRM_TABS = ['Snapshot', 'Coverage', 'Therapy', 'Notes', 'Labs', 'Documents'];
let crmSel = CASES[0].id;
let crmTab = 'Documents';

function crmContent(c) {
  if (crmTab === 'Documents') {
    return `
    <div class="sec">Document repository</div>
    ${c.repository.map((d) => `
      <div class="rowdoc">
        <span class="ft">${esc(d.kind)}</span>
        <div><b>${esc(d.label)}</b><div class="fn">${esc(d.file)} &middot; ${esc(d.size)}</div></div>
        <a class="btn-open" href="${docPath(c.id, d.file)}" target="_blank" rel="noopener">Open</a>
        <a class="btn-open" href="${docPath(c.id, d.file)}" download>Download</a>
      </div>`).join('')}
    <div class="rowdoc">
      <span class="ft">POL</span>
      <div><b>${esc(c.policy.id)} &mdash; ${esc(c.policy.title)}</b>
        <div class="fn">policy.pdf &middot; ${esc(c.policyDoc.size)}</div></div>
      <a class="btn-open" href="${docPath(c.id, 'policy.pdf')}" target="_blank" rel="noopener">Open</a>
      <a class="btn-open" href="${docPath(c.id, 'policy.pdf')}" download>Download</a>
    </div>`;
  }
  if (crmTab === 'Snapshot') {
    return `
    <div class="sec">Patient snapshot</div>
    <div class="kv">
      ${[['Name', c.patient.name], ['Date of birth', c.patient.dob], ['Sex', c.patient.sex],
         ['Patient ID', c.patient.pid], ['Phone', c.patient.phone], ['Hub case', c.id],
         ['Address', c.patient.address], ['Primary diagnosis', c.dx.full],
         ['Severity', c.dx.severity]]
        .map(([k, v]) => `<div><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div></div>`).join('')}
    </div>`;
  }
  if (crmTab === 'Coverage') {
    return `
    <div class="sec">Coverage on file</div>
    <div class="kv">
      ${[['Payer', c.payer.name], ['Plan', c.payer.plan], ['Member ID', c.payer.memberId],
         ['Group number', c.payer.group], ['Effective', c.payer.effective],
         ['Benefit', c.payer.benefit], ['Policy applied', `${c.policy.id} — ${c.policy.title}`],
         ['PA form', `${c.form.id} · ${c.form.fields} fields`], ['Secondary', 'None reported']]
        .map(([k, v]) => `<div><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div></div>`).join('')}
    </div>`;
  }
  if (crmTab === 'Therapy') {
    const t = c.therapy;
    return `
    <div class="sec">Requested therapy</div>
    <div class="kv">
      ${[['Product', t.label], ['Class', t.cls], ['J-code', t.jcode], ['NDC', t.ndc],
         ['Strength', t.strength], ['Dose', t.dose], ['Route', t.route],
         ['Frequency', t.frequency], ['Quantity', t.quantity], ['Days supply', t.daysSupply],
         ['Site of care', t.siteOfCare], ['Requested start', t.startDate],
         ['Duration', t.duration], ['Request type', t.requestType],
         ['Prescriber', `${c.prescriber.name} · NPI ${c.prescriber.npi}`]]
        .map(([k, v]) => `<div><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div></div>`).join('')}
    </div>`;
  }
  if (crmTab === 'Labs') {
    return `
    <div class="sec">Observations</div>
    <table class="ltab">
      <thead><tr><th>Test</th><th>Result</th><th>Reference range</th><th>Collected</th></tr></thead>
      <tbody>${c.labs.map((r) => `<tr>${r.map((x) => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>`;
  }
  // Notes
  const noteDoc = c.repository.find((d) => d.file === 'chart_note.pdf');
  return `
  <div class="sec">Clinical notes</div>
  <div class="note-body">
    <h4>Latest note</h4>
    <p>${noteDoc ? esc(noteDoc.label) : 'Progress note'} &middot; ${esc(c.prescriber.name)} &middot;
       ${esc(c.prescriber.practice)} &middot; ${esc(c.receivedIso)}</p>
    <h4>Assessment on file</h4>
    <p>${esc(c.dx.full)}. ${esc(c.dx.severity)}.</p>
    <h4>Attached</h4>
    <p>${c.repository.map((d) => esc(d.label)).join(' &middot; ')}</p>
    ${noteDoc ? `<a class="btn-open" href="${docPath(c.id, noteDoc.file)}" target="_blank" rel="noopener">Open full note</a>` : ''}
  </div>`;
}

function viewCrm() {
  const c = byId(crmSel);
  return `
  <div class="crm">
    <div class="crmbar">
      <span class="mark">N</span><b>${esc(BRAND.crm)}</b>
      <div class="nav">
        ${['Case Review', 'Enrollments', 'Notes', 'Benefits', 'Schedule']
          .map((n, i) => `<a class="${i === 0 ? 'on' : ''}" href="#/crm">${esc(n)}</a>`).join('')}
      </div>
      <span class="right">Hub &middot; ${esc(BRAND.hub)} &middot; Demo</span>
      <a class="btn-open" href="#/portal" style="margin-left:14px">Back to portal</a>
    </div>
    <div class="shell">
      <div class="lookup">
        <div class="hd">Patient lookup</div>
        ${CASES.map((x) => `
          <div class="pt ${x.id === crmSel ? 'on' : ''}" data-crm="${x.id}">
            <b>${esc(x.patient.name.split(' ').reverse().join(', '))}</b>
            <div class="m">${esc(x.patient.pid)} &middot; ${esc(x.patient.age)}</div>
            <div class="d">${esc(x.dx.text)}</div>
          </div>`).join('')}
      </div>
      <div class="main">
        <div class="phead">
          <div class="row">
            <div>
              <h2>${esc(c.patient.name)}</h2>
              <div class="m">${esc(c.patient.pid)} &middot; DOB ${esc(c.patient.dob)} &middot;
                ${esc(c.patient.sex.toUpperCase())}</div>
            </div>
            <div class="facts">
              <div class="fact"><span>Coverage</span><b>${esc(c.payer.short)}</b></div>
              <div class="fact"><span>Member ID</span><b>${esc(c.payer.memberId)}</b></div>
              <div class="fact"><span>Status</span><b class="ok">Active</b></div>
            </div>
          </div>
          <div class="tabs">
            ${CRM_TABS.map((t) => `<button class="${t === crmTab ? 'on' : ''}" data-tab="${t}">${esc(t)}</button>`).join('')}
          </div>
        </div>
        <div class="content">${crmContent(c)}</div>
        <div class="crmfoot">
          <span>FHIR R4 &middot; Patient / Coverage / Condition / MedicationRequest / Observation / DocumentReference</span>
          <span>Chart loaded &middot; ${esc(c.id)}</span>
        </div>
      </div>
    </div>
  </div>`;
}

/* ----------------------------------------------------------- events */
function bindCaseEvents(c) {
  const run = () => runAgent(c);
  ['#run-agent', '#run-agent-2'].forEach((s) => { const el = $(s); if (el) el.onclick = run; });

  const noteEl = $('#rev-note');
  if (noteEl) noteEl.oninput = (e) => { RUN[c.id].note = e.target.value; };

  const prim = $('#act-primary');
  if (prim) prim.onclick = () => {
    RUN[c.id].state = FINAL_STATE[c.scenario];
    render();
  };
  const rej = $('#act-reject');
  if (rej) rej.onclick = () => {
    RUN[c.id].state = 'returned';
    render();
  };
  ['#reset-case', '#reset-case-top'].forEach((s) => {
    const el = $(s);
    if (el) el.onclick = () => { RUN[c.id] = { state: 'new', note: '' }; render(); };
  });
}

function bindGlobal() {
  const rd = $('#reset-demo');
  if (rd) rd.onclick = () => {
    CASES.forEach((c) => { RUN[c.id] = { state: 'new', note: '' }; });
    location.hash = '#/portal';
    render();
  };
}

function bindCrmEvents() {
  document.querySelectorAll('[data-crm]').forEach((el) => {
    el.onclick = () => { crmSel = el.dataset.crm; render(); };
  });
  document.querySelectorAll('[data-tab]').forEach((el) => {
    el.onclick = () => { crmTab = el.dataset.tab; render(); };
  });
}

/* ----------------------------------------------------------- router */
function render() {
  const hash = location.hash || '#/portal';
  const app = $('#app');

  if (hash.startsWith('#/crm')) {
    document.body.style.background = '#f4f6f8';
    app.innerHTML = viewCrm();
    bindCrmEvents();
    return;
  }
  document.body.style.background = 'var(--bg)';

  const m = hash.match(/^#\/case\/([\w-]+)/);
  if (m && byId(m[1])) {
    const c = byId(m[1]);
    app.innerHTML = viewCase(c);
    bindGlobal();
    bindCaseEvents(c);
    return;
  }

  app.innerHTML = viewQueue();
  bindGlobal();
}

window.addEventListener('hashchange', () => { window.scrollTo(0, 0); render(); });
render();
