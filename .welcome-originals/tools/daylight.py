"""Daylight grade for welcome photos: bright, neutral-white, shadowless, crisp.
Reads the untouched sources in .welcome-originals and writes into assets/."""
import os, sys
import numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, ".welcome-originals")
DST = os.path.join(ROOT, "assets")
FILES = [f for f in sorted(os.listdir(SRC)) if f.startswith("welcome-") and f.endswith(".jpg")]

# Shadow-lifting tone curve (sRGB luminance in -> out). Shadows and mids open up like
# diffuse outdoor light; highlights stay close to identity so text and whites keep detail.
CURVE_X = [0.00, 0.06, 0.15, 0.30, 0.50, 0.70, 0.85, 0.95, 1.00]
CURVE_Y = [0.04, 0.19, 0.34, 0.53, 0.70, 0.83, 0.91, 0.965, 0.99]
WARM_CUT = 0.40


def lum(a):
    return 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]


def neutral_white_balance(a):
    """Gains that make near-neutral surfaces (walls, shirts, paper) pure white, a hair cool."""
    y = lum(a)
    mx, mn = a.max(-1), a.min(-1)
    s = (mx - mn) / np.maximum(mx, 1e-6)
    m = (s < 0.20) & (y > 0.45) & (y < 0.97)
    if m.sum() < 2000:
        m = (y > 0.35) & (y < 0.97)
    mean = a[m].mean(0)
    g = mean.mean() / mean * np.array([0.99, 1.0, 1.015])
    return a * np.clip(g, 0.85, 1.18)


def fit(rgb, knee=0.92):
    m = rgb.max(-1)
    mm = np.where(m > knee, knee + (1 - knee) * (1 - np.exp(-(m - knee) / (1 - knee))), m)
    return rgb * np.where(m > 0, mm / np.maximum(m, 1e-6), 1)[..., None]


def grade(img):
    a = np.asarray(img.convert("RGB")).astype(np.float64) / 255.0
    a = neutral_white_balance(a)

    y = lum(a)
    ny = np.interp(y, CURVE_X, CURVE_Y)
    r = np.where(y > 1e-3, ny / np.maximum(y, 1e-3), 1)
    # Big lifts are mostly additive (fill light) so dark blues/greens don't turn neon
    w = np.where(r > 1, 1 / np.maximum(r, 1), 1.0)[..., None]
    out = fit(w * (a * r[..., None]) + (1 - w) * (a + (ny - y)[..., None]))

    # Pull brown/orange cast out; partial so skin stays natural
    u8 = (np.clip(out, 0, 1) * 255).astype(np.uint8)
    hue = np.asarray(Image.fromarray(u8).convert("HSV"))[..., 0].astype(np.float64) * 360 / 255
    warm = np.exp(-((hue - 30) / 18) ** 2)
    yy = lum(out)[..., None]
    scale = ((1 - WARM_CUT * warm) * (1 + 0.10 * (1 - warm)))[..., None]
    out = fit(np.maximum(yy + (out - yy) * scale, 0))

    res = Image.fromarray((np.clip(out, 0, 1) * 255).round().astype(np.uint8))
    return res.filter(ImageFilter.UnsharpMask(radius=1.0, percent=70, threshold=2))


if __name__ == "__main__":
    only = sys.argv[1:]
    for f in FILES:
        if only and f not in only:
            continue
        res = grade(Image.open(os.path.join(SRC, f)))
        res.save(os.path.join(DST, f), quality=92, optimize=True)
        a = np.asarray(res).astype(float)
        y = lum(a)
        neutral = a[(a.max(-1) - a.min(-1) < 25) & (y > 120)]
        rb = neutral[:, 0].mean() - neutral[:, 2].mean() if len(neutral) else 0
        print(f"{f:34s} Y={y.mean():6.1f} p5={np.percentile(y,5):5.1f} p95={np.percentile(y,95):5.1f} neutralR-B={rb:+.1f}")
