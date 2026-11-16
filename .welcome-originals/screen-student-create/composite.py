import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

A = "/Users/Lismayy/.cursor/projects/Users-Lismayy-Iteration-login-regist-setup-moment/assets/"
HERE = ".welcome-originals/screen-student-create/"
BASE = A + "student-create-v2.jpg"
PLANETS = A + "planets-row.jpg"
PHONE = [(670, 382), (978, 394), (968, 566), (653, 545)]
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

COPY = {
    "en": (["Sun", "Earth", "Jupiter", "Saturn"], "View in AR"),
    "id": (["Matahari", "Bumi", "Jupiter", "Saturnus"], "Lihat di AR"),
}
CENTERS = [152, 382, 604, 850]


def phone_ui(planets, names, cta):
    W, H = 1300, 720
    im = planets.resize((W, round(planets.height * W / planets.width)), Image.LANCZOS)
    im = im.crop((0, (im.height - H) // 2 - 20, W, (im.height - H) // 2 - 20 + H))
    d = ImageDraw.Draw(im)
    f = ImageFont.truetype(BOLD, 40)
    for cx, name in zip(CENTERS, names):
        x = cx * W / 1024
        tw = d.textlength(name, font=f)
        d.text((x - tw / 2, 470), name, font=f, fill="white")
    f = ImageFont.truetype(BOLD, 42)
    tw = d.textlength(cta, font=f)
    d.rounded_rectangle([W / 2 - tw / 2 - 44, 572, W / 2 + tw / 2 + 44, 652], 40, fill="white")
    d.text((W / 2 - tw / 2, 590), cta, font=f, fill=(30, 36, 60))
    m = Image.new("L", im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, W - 1, H - 1], 70, fill=255)
    out = Image.new("RGB", im.size, (14, 14, 16))
    out.paste(im, (0, 0), m)
    return out


def coeffs(dst, src):
    A_, B = [], []
    for (x, y), (u, v) in zip(dst, src):
        A_ += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]
        B += [u, v]
    return np.linalg.solve(np.array(A_, float), np.array(B, float)).tolist()


def main():
    base = Image.open(BASE).convert("RGB")
    planets = Image.open(PLANETS).convert("RGB")
    k = 4
    quad = Image.new("L", (base.width * k, base.height * k), 0)
    ImageDraw.Draw(quad).polygon([(x * k, y * k) for x, y in PHONE], fill=255)
    quad = quad.resize(base.size, Image.LANCZOS)
    hsv = np.asarray(base.convert("HSV")).astype(float) / 255
    fingers = (hsv[..., 2] > 0.3) & (hsv[..., 1] > 0.12)
    fingers = Image.fromarray((fingers * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1))
    keep = np.asarray(quad).astype(float) * (1 - np.asarray(fingers).astype(float) / 255)
    keep = Image.fromarray(keep.astype(np.uint8))
    for lang, (names, cta) in COPY.items():
        ui = phone_ui(planets, names, cta)
        w, h = ui.size
        layer = ui.transform(base.size, Image.PERSPECTIVE, coeffs(PHONE, [(0, 0), (w, 0), (w, h), (0, h)]), Image.BICUBIC)
        Image.composite(layer, base, keep).save(HERE + f"out-{lang}.jpg", quality=92)


main()
