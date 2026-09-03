"""Small drawing DSL over reportlab canvas for the Fusion Hub Services sample documents."""
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth

W, H = letter
ML = 54.0          # left margin
MR = 54.0          # right margin
MT = 56.0          # top margin
MB = 54.0          # bottom margin
CW = W - ML - MR   # content width

INK = (0.08, 0.08, 0.09)
MUTED = (0.42, 0.42, 0.45)
RULE = (0.72, 0.72, 0.74)
BARBG = (0.906, 0.914, 0.925)
BOXRULE = (0.65, 0.65, 0.68)


def wrap(text, font, size, width):
    """Greedy wrap that also honours explicit newlines."""
    out = []
    for hard in str(text).split("\n"):
        words, line = hard.split(), ""
        if not words:
            out.append("")
            continue
        for w in words:
            trial = w if not line else line + " " + w
            if stringWidth(trial, font, size) <= width:
                line = trial
            else:
                if line:
                    out.append(line)
                line = w
        out.append(line)
    return out


class Doc:
    def __init__(self, path, footer_left="", footer_right_pattern="Page {page}"):
        self.c = canvas.Canvas(path, pagesize=letter)
        self.c.setTitle(footer_left or "Document")
        self.y = H - MT
        self.page = 1
        self.footer_left = footer_left
        self.footer_right_pattern = footer_right_pattern
        self._footer()

    # ---------- infrastructure ----------
    def _footer(self):
        c = self.c
        c.setFillColorRGB(*MUTED)
        c.setFont("Helvetica", 6.5)
        c.drawString(ML, MB - 20, self.footer_left)
        c.drawRightString(W - MR, MB - 20,
                          self.footer_right_pattern.format(page=self.page))
        c.setFillColorRGB(*INK)

    def need(self, h):
        if self.y - h < MB:
            self.new_page()

    def new_page(self):
        self.c.showPage()
        self.page += 1
        self.y = H - MT
        self._footer()

    def gap(self, h=8):
        self.y -= h

    def save(self):
        self.c.save()

    # ---------- blocks ----------
    def title(self, text, size=13.5, align="center"):
        self.need(size + 12)
        self.c.setFont("Helvetica-Bold", size)
        self.c.setFillColorRGB(*INK)
        if align == "center":
            self.c.drawCentredString(W / 2, self.y - size, text)
        else:
            self.c.drawString(ML, self.y - size, text)
        self.y -= size + 6

    def subtitle(self, text, size=7.6, align="center"):
        self.need(size + 10)
        self.c.setFont("Helvetica", size)
        self.c.setFillColorRGB(*MUTED)
        if align == "center":
            self.c.drawCentredString(W / 2, self.y - size, text)
        else:
            self.c.drawString(ML, self.y - size, text)
        self.c.setFillColorRGB(*INK)
        self.y -= size + 10

    def bar(self, text, size=8.2):
        h = size + 8
        self.need(h + 8)
        c = self.c
        c.setFillColorRGB(*BARBG)
        c.setStrokeColorRGB(*RULE)
        c.setLineWidth(0.5)
        c.rect(ML, self.y - h, CW, h, stroke=1, fill=1)
        c.setFillColorRGB(*INK)
        c.setFont("Helvetica-Bold", size)
        c.drawString(ML + 5, self.y - h + 5.4, text.upper())
        self.y -= h + 6

    def para(self, text, size=7.9, leading=10.2, indent=0, bold_prefix=None,
             color=INK, gap_after=7):
        c = self.c
        x = ML + indent
        avail = CW - indent
        first_off = 0
        if bold_prefix:
            c.setFont("Helvetica-Bold", size)
            first_off = stringWidth(bold_prefix + " ", "Helvetica-Bold", size)
        lines = []
        # wrap accounting for the bold prefix on line 1
        raw = wrap(text, "Helvetica", size, avail - first_off)
        if raw:
            lines.append(raw[0])
            rest = " ".join(raw[1:])
            if rest:
                lines.extend(wrap(rest, "Helvetica", size, avail))
        for i, ln in enumerate(lines):
            self.need(leading)
            if i == 0 and bold_prefix:
                c.setFont("Helvetica-Bold", size)
                c.setFillColorRGB(*color)
                c.drawString(x, self.y - size, bold_prefix)
                c.setFont("Helvetica", size)
                c.drawString(x + first_off, self.y - size, ln)
            else:
                c.setFont("Helvetica", size)
                c.setFillColorRGB(*color)
                c.drawString(x, self.y - size, ln)
            self.y -= leading
        c.setFillColorRGB(*INK)
        self.y -= gap_after

    def numlist(self, items, size=7.9, leading=10.2, indent=16):
        for i, it in enumerate(items, 1):
            self.para(it, size=size, leading=leading, indent=indent,
                      bold_prefix=f"{i}.", gap_after=5)

    def bullets(self, items, size=7.9, leading=10.2, indent=16):
        for it in items:
            self.para(it, size=size, leading=leading, indent=indent,
                      bold_prefix="-", gap_after=4)

    def kv_lines(self, rows, size=7.9, leading=11.5, label_w=132):
        """Simple label / value lines, no boxes."""
        c = self.c
        for label, value in rows:
            vlines = wrap(value, "Helvetica", size, CW - label_w)
            self.need(leading * len(vlines))
            c.setFont("Helvetica-Bold", size)
            c.setFillColorRGB(*INK)
            c.drawString(ML, self.y - size, label)
            c.setFont("Helvetica", size)
            for j, vl in enumerate(vlines):
                c.drawString(ML + label_w, self.y - size - j * leading, vl)
            self.y -= leading * len(vlines)
        self.y -= 6

    def field_grid(self, rows, label_size=5.6, value_size=8.0, row_h=27):
        """Boxed form fields. rows = list of list of (LABEL, value_or_None, weight)."""
        c = self.c
        for row in rows:
            self.need(row_h + 2)
            total = sum(r[2] for r in row)
            x = ML
            for (label, value, weight) in row:
                w = CW * weight / total
                c.setStrokeColorRGB(*BOXRULE)
                c.setLineWidth(0.5)
                c.rect(x, self.y - row_h, w, row_h, stroke=1, fill=0)
                c.setFont("Helvetica", label_size)
                c.setFillColorRGB(*MUTED)
                c.drawString(x + 4, self.y - 8.5, label.upper())
                if value:
                    c.setFont("Helvetica-Bold", value_size)
                    c.setFillColorRGB(*INK)
                    vl = wrap(value, "Helvetica-Bold", value_size, w - 8)
                    c.drawString(x + 4, self.y - row_h + 7, vl[0])
                    if len(vl) > 1:
                        c.setFont("Helvetica-Bold", value_size - 1.4)
                        c.drawString(x + 4 + stringWidth(vl[0] + " ", "Helvetica-Bold", value_size),
                                     self.y - row_h + 7, "")
                x += w
            self.y -= row_h
        self.y -= 8

    def table(self, header, rows, weights, size=7.2, head_size=6.4,
              pad=4, min_row_h=16):
        """Bordered table with wrapped cells."""
        c = self.c
        total = sum(weights)
        widths = [CW * w / total for w in weights]

        def draw_head():
            hh = head_size + 8
            self.need(hh + min_row_h)
            c.setFillColorRGB(*BARBG)
            c.setStrokeColorRGB(*RULE)
            c.setLineWidth(0.5)
            c.rect(ML, self.y - hh, CW, hh, stroke=1, fill=1)
            x = ML
            c.setFillColorRGB(*INK)
            c.setFont("Helvetica-Bold", head_size)
            for i, htxt in enumerate(header):
                c.drawString(x + pad, self.y - hh + 5.2, htxt.upper())
                if i:
                    c.setStrokeColorRGB(*RULE)
                    c.line(x, self.y - hh, x, self.y)
                x += widths[i]
            self.y -= hh

        draw_head()
        for row in rows:
            cells = [wrap(str(cell), "Helvetica", size, widths[i] - 2 * pad)
                     for i, cell in enumerate(row)]
            rh = max(min_row_h, max(len(cl) for cl in cells) * (size + 2.6) + 2 * pad - 3)
            if self.y - rh < MB:
                self.new_page()
                draw_head()
            c.setStrokeColorRGB(*BOXRULE)
            c.setLineWidth(0.5)
            c.rect(ML, self.y - rh, CW, rh, stroke=1, fill=0)
            x = ML
            for i, cl in enumerate(cells):
                if i:
                    c.line(x, self.y - rh, x, self.y)
                c.setFont("Helvetica", size)
                c.setFillColorRGB(*INK)
                for j, ln in enumerate(cl):
                    c.drawString(x + pad, self.y - pad - size - j * (size + 2.6), ln)
                x += widths[i]
            self.y -= rh
        self.y -= 8

    def note(self, text, size=6.8):
        self.para(text, size=size, leading=8.8, color=MUTED, gap_after=4)

    def rule(self, gap=6):
        self.need(gap + 2)
        self.c.setStrokeColorRGB(*RULE)
        self.c.setLineWidth(0.5)
        self.c.line(ML, self.y, W - MR, self.y)
        self.y -= gap
