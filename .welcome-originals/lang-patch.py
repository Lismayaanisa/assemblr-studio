"""Builds English variants of welcome photos whose baked-in text is Indonesian.

The Indonesian photo stays as-is (used for uiLang "id"); the English copy is written to the
original filename and the Indonesian one is saved as *-id.jpg.
"""
import os
import shutil

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from scipy.ndimage import gaussian_filter

FONTS = {
    "bold": ("/System/Library/Fonts/Avenir Next.ttc", 0),
    "demi": ("/System/Library/Fonts/Avenir Next.ttc", 2),
    "medium": ("/System/Library/Fonts/Avenir Next.ttc", 5),
    "regular": ("/System/Library/Fonts/Avenir Next.ttc", 7),
    "heavy": ("/System/Library/Fonts/Avenir Next.ttc", 8),
    "hand": ("/System/Library/Fonts/Noteworthy.ttc", 0),
}


def font(kind, size):
    path, index = FONTS[kind]
    return ImageFont.truetype(path, size, index=index)


def fill(im, box, ring=10, tol=24):
    """Inpaints a rectangle from surrounding background, ignoring nearby ink so it can't smear in."""
    x0, y0, x1, y1 = box
    X0, Y0 = max(x0 - ring, 0), max(y0 - ring, 0)
    X1, Y1 = min(x1 + ring, im.width), min(y1 + ring, im.height)
    a = np.asarray(im.crop((X0, Y0, X1, Y1))).astype(float)
    hole = np.zeros(a.shape[:2], bool)
    hole[y0 - Y0:y1 - Y0, x0 - X0:x1 - X0] = True
    lum = a.mean(-1)
    known = ~hole & (np.abs(lum - np.median(lum[~hole])) < tol)
    out = a.copy()
    est = np.zeros_like(a)
    for sigma in (max(x1 - x0, y1 - y0) / 3, (y1 - y0) / 2, ring / 2):
        k = gaussian_filter(known.astype(float), sigma)
        num = np.stack([gaussian_filter(a[..., c] * known, sigma) for c in range(3)], -1)
        sharper = num / np.maximum(k[..., None], 1e-6)
        est = np.where((k > 0.02)[..., None], sharper, est)
    out[hole] = est[hole]
    rng = np.random.default_rng(0)
    out[hole] += rng.normal(0, 1.0, out[hole].shape)
    im.paste(Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)), (X0, Y0))


def text(im, xy, s, kind, size, color, angle=0.0, maxw=None, blur=0.35, track=0):
    f = font(kind, size)
    while maxw and ImageDraw.Draw(im).textlength(s, font=f) > maxw and size > 6:
        size -= 1
        f = font(kind, size)
    w = int(ImageDraw.Draw(im).textlength(s, font=f)) + 20
    h = size * 2
    layer = Image.new("L", (w, h), 0)
    ImageDraw.Draw(layer).text((10, size // 2), s, font=f, fill=255)
    if blur:
        layer = layer.filter(ImageFilter.GaussianBlur(blur))
    if angle:
        layer = layer.rotate(angle, resample=Image.BICUBIC, expand=True)
    x, y = xy
    ink = Image.new("RGB", layer.size, color)
    im.paste(ink, (int(x - 10), int(y - size // 2)), layer)


def build(name, patches):
    src = f"assets/welcome-{name}.jpg"
    keep = f".welcome-originals/pre-lang/welcome-{name}.jpg"
    os.makedirs(os.path.dirname(keep), exist_ok=True)
    if not os.path.exists(keep):
        shutil.copy(src, keep)
    shutil.copy(keep, f"assets/welcome-{name}-id.jpg")
    im = Image.open(keep).convert("RGB")
    for boxes, texts in patches:
        for b in boxes:
            fill(im, b[:4], *b[4:])
        for t in texts:
            text(im, *t[:5], **(t[5] if len(t) > 5 else {}))
    im.save(src, quality=92)


NAVY = (22, 34, 68)
BODY = (48, 54, 66)
WHITE = (250, 250, 252)
DARK = (28, 32, 42)
MARKER = (112, 118, 140)

build("teacher-slides", [
    ([(738, 196, 1146, 266)], [((745, 200), "Heart Anatomy", "bold", 58, NAVY, {"maxw": 400})]),
    ([(738, 274, 1116, 314), (738, 314, 1107, 354)], [
        ((745, 283), "The heart is the core of circulation.", "medium", 21, BODY),
        ((745, 317), "It pumps blood throughout the body.", "medium", 21, BODY),
    ]),
])

build("teacher-present", [
    ([(499, 104, 657, 126, 3)], [((501, 103), "Eco-Friendly House", "demi", 16, DARK, {"maxw": 155})]),
    ([(799, 132, 875, 149, 3)], [((801, 130), "Energy saving", "demi", 14, WHITE, {"maxw": 80})]),
    ([(606, 173, 677, 187, 2)], [((608, 170), "Green space", "demi", 13, WHITE, {"maxw": 70})]),
    ([(791, 306, 900, 325, 3)], [((793, 304), "Recycled materials", "demi", 14, WHITE, {"maxw": 100})]),
])

build("teacher-class", [
    ([(339, 314, 412, 329, 3)], [((341, 313), "Class 8A - Science", "demi", 11, WHITE, {"maxw": 90, "angle": 1})]),
])

build("lecturer-class", [
    ([(367, 371, 429, 388, 3)], [((369, 370), "Basic Physics", "demi", 14, WHITE, {"maxw": 66, "angle": 4})]),
])

build("lecturer-ar", [
    ([(828, 491, 898, 514, 4)], [((832, 492), "Solar System", "demi", 14, WHITE, {"maxw": 80, "angle": -2})]),
    ([(1088, 90, 1200, 124), (1092, 126, 1198, 154), (1092, 156, 1192, 184),
      (1092, 186, 1172, 214), (1092, 216, 1174, 244), (1100, 260, 1252, 292),
      (1112, 294, 1206, 324), (1146, 324, 1208, 350)], [
        ((1093, 88), "Ecosystem", "hand", 24, MARKER, {"angle": 3, "blur": 0.5}),
        ((1097, 124), "- Components", "hand", 20, MARKER, {"angle": 3, "blur": 0.5, "maxw": 100}),
        ((1097, 154), "- Interactions", "hand", 20, MARKER, {"angle": 3, "blur": 0.5, "maxw": 96}),
        ((1097, 184), "- Energy", "hand", 20, MARKER, {"angle": 3, "blur": 0.5}),
        ((1097, 214), "- Matter", "hand", 20, MARKER, {"angle": 3, "blur": 0.5}),
        ((1104, 258), "Climate Change", "hand", 22, MARKER, {"angle": 2, "blur": 0.5, "maxw": 146}),
        ((1116, 292), "- Causes", "hand", 20, MARKER, {"angle": 2, "blur": 0.5}),
        ((1150, 322), "Impact", "hand", 20, MARKER, {"angle": 2, "blur": 0.5}),
    ]),
    ([(94, 608, 354, 658, 6)], [
        ((108, 610), "STRUCTURE AND FUNCTION", "heavy", 19, (44, 50, 82), {"angle": 3.3, "maxw": 228, "blur": 0.5}),
        ((116, 629), "OF LIVING THINGS", "heavy", 19, (44, 50, 82), {"angle": 3.3, "maxw": 222, "blur": 0.5}),
    ]),
])
