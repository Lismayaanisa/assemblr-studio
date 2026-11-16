import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = ".welcome-originals/screen-lecturer/"
BASE = HERE + "before.jpg"
REEF = "/Users/Lismayy/.cursor/projects/Users-Lismayy-Iteration-login-regist-setup-moment/assets/coral-reef-3d.jpg"
TABLET = [(576, 335), (818, 357), (786, 566), (517, 541)]
HAND_BOX = (730, 520, 830, 610)
LAPTOP = [(927, 367), (1159, 382), (1130, 589), (899, 546)]

FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
BLUE = (44, 76, 220)
INK = (24, 28, 40)
MUTED = (110, 116, 132)
LINE = (226, 229, 236)

COPY = {
    "en": dict(project="Project", title="Coral Reef AR", subject="Marine Biology", view="View in AR", share="Share",
               editor="Coral Reef AR", publish="Publish", props="Properties", tl="Title", sl="Subject",
               scenes="Scenes", objects="12 objects", saved="Saved"),
    "id": dict(project="Proyek", title="Terumbu Karang AR", subject="Biologi Laut", view="Lihat di AR", share="Bagikan",
               editor="Terumbu Karang AR", publish="Terbitkan", props="Properti", tl="Judul", sl="Mata pelajaran",
               scenes="Adegan", objects="12 objek", saved="Tersimpan"),
}


def font(size, bold=False):
    return ImageFont.truetype(BOLD if bold else FONT, size)


def cover(img, w, h):
    s = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    x, y = (img.width - w) // 2, (img.height - h) // 2
    return img.crop((x, y, x + w, y + h))


def rounded(canvas, img, xy, r):
    m = Image.new("L", img.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, img.width - 1, img.height - 1], r, fill=255)
    canvas.paste(img, xy, m)


def logo(d, x, y, s):
    d.ellipse([x, y, x + s, y + s], fill=BLUE)
    d.polygon([(x + s * .3, y + s * .72), (x + s * .5, y + s * .25), (x + s * .7, y + s * .72)], fill="white")


def tablet_ui(reef, c):
    W, H = 1200, 900
    im = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(im)
    d.line([(52, 52), (34, 70), (52, 88)], fill=INK, width=6)
    logo(d, 80, 44, 52)
    d.text((148, 52), c["project"], font=font(34, True), fill=INK)
    for i, x in enumerate((1080, 1130)):
        d.ellipse([x, 52, x + 34, 86], outline=MUTED, width=4)
    rounded(im, cover(reef, 1110, 480), (45, 120), 28)
    d.ellipse([540, 300, 660, 420], fill=(255, 255, 255))
    d.polygon([(585, 330), (585, 390), (635, 360)], fill=BLUE)
    d.text((45, 630), c["title"], font=font(66, True), fill=INK)
    logo(d, 48, 725, 36)
    d.text((98, 728), f"{c['subject']}  ·  3D  ·  AR", font=font(30), fill=MUTED)
    d.rounded_rectangle([45, 790, 345, 870], 22, fill=BLUE)
    tw = d.textlength(c["view"], font=font(32, True))
    d.text((195 - tw / 2, 812), c["view"], font=font(32, True), fill="white")
    d.rounded_rectangle([370, 790, 620, 870], 22, outline=LINE, width=4)
    tw = d.textlength(c["share"], font=font(32, True))
    d.text((495 - tw / 2, 812), c["share"], font=font(32, True), fill=INK)
    return im


def laptop_ui(reef, c):
    W, H = 1280, 800
    im = Image.new("RGB", (W, H), (246, 247, 250))
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, W, 76], fill="white")
    d.line([(0, 76), (W, 76)], fill=LINE, width=2)
    logo(d, 28, 18, 40)
    d.text((86, 24), c["editor"], font=font(28, True), fill=INK)
    d.text((86 + d.textlength(c["editor"], font=font(28, True)) + 24, 28), c["saved"], font=font(22), fill=MUTED)
    pw = d.textlength(c["publish"], font=font(24, True)) + 56
    d.rounded_rectangle([W - 28 - pw, 16, W - 28, 60], 14, fill=BLUE)
    d.text((W - 28 - pw + 28, 25), c["publish"], font=font(24, True), fill="white")
    rounded(im, cover(reef, 840, 600), (28, 104), 20)
    d.rounded_rectangle([300, 260, 590, 470], 10, outline="white", width=4)
    for x, y in ((300, 260), (590, 260), (300, 470), (590, 470)):
        d.rectangle([x - 9, y - 9, x + 9, y + 9], fill="white", outline=BLUE, width=3)
    d.text((40, 720), c["objects"], font=font(22), fill=MUTED)
    px = 896
    d.rounded_rectangle([px, 104, W - 28, 772], 20, fill="white", outline=LINE, width=2)
    d.text((px + 28, 130), c["props"], font=font(30, True), fill=INK)
    y = 196
    for label, value in ((c["tl"], c["title"]), (c["sl"], c["subject"])):
        d.text((px + 28, y), label, font=font(20), fill=MUTED)
        d.rounded_rectangle([px + 28, y + 30, W - 56, y + 82], 12, outline=LINE, width=2)
        d.text((px + 44, y + 44), value, font=font(22), fill=INK)
        y += 112
    d.text((px + 28, y), c["scenes"], font=font(20), fill=MUTED)
    tw = (W - 56 - px - 28 - 2 * 14) // 3
    for i in range(3):
        x = px + 28 + i * (tw + 14)
        rounded(im, cover(reef.crop((i * 300, 80, i * 300 + 420, 500)), tw, 84), (x, y + 32), 10)
    d.rounded_rectangle([px + 28, 680, W - 56, 744], 16, fill=BLUE)
    tw = d.textlength(c["publish"], font=font(26, True))
    d.text(((px + 28 + W - 56) / 2 - tw / 2, 697), c["publish"], font=font(26, True), fill="white")
    return im


def coeffs(dst, src):
    A, B = [], []
    for (x, y), (u, v) in zip(dst, src):
        A += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]
        B += [u, v]
    return np.linalg.solve(np.array(A, float), np.array(B, float)).tolist()


def warp(base, screen, quad):
    w, h = screen.size
    src = [(0, 0), (w, 0), (w, h), (0, h)]
    out = screen.transform(base.size, Image.PERSPECTIVE, coeffs(quad, src), Image.BICUBIC)
    k = 4
    m = Image.new("L", (base.width * k, base.height * k), 0)
    ImageDraw.Draw(m).polygon([(x * k, y * k) for x, y in quad], fill=255)
    m = m.resize(base.size, Image.LANCZOS)
    return out, m


def skin(base):
    hsv = np.asarray(base.convert("HSV")).astype(float) / 255
    h, s, v = hsv[..., 0] * 360, hsv[..., 1], hsv[..., 2]
    m = (h > 4) & (h < 40) & (s > 0.14) & (s < 0.6) & (v > 0.45)
    box = np.zeros_like(m)
    x0, y0, x1, y1 = HAND_BOX
    box[y0:y1, x0:x1] = True
    m &= box
    return Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1.2))


def main():
    base = Image.open(BASE).convert("RGB")
    reef = Image.open(REEF).convert("RGB")
    hands = skin(base)
    for lang, c in COPY.items():
        im = base.copy()
        for ui, quad in ((tablet_ui(reef, c), TABLET), (laptop_ui(reef, c), LAPTOP)):
            layer, m = warp(im, ui, quad)
            layer = Image.blend(layer, Image.new("RGB", layer.size, (238, 242, 248)), 0.06)
            keep = np.asarray(m).astype(float) * (1 - np.asarray(hands).astype(float) / 255)
            im = Image.composite(layer, im, Image.fromarray(keep.astype(np.uint8)))
        im.save(HERE + f"out-{lang}.jpg", quality=92)


main()
