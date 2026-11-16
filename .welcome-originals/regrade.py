import os
import shutil
import sys

import numpy as np
from PIL import Image

BACKUP = ".welcome-originals/pre-regrade/"
TARGET_V = 0.78
TARGET_S = 0.29


def skin_mask(hsv):
    h, s, v = hsv[..., 0] * 360, hsv[..., 1], hsv[..., 2]
    return (h > 5) & (h < 38) & (s > 0.15) & (s < 0.55) & (v > 0.4)


def regrade(path):
    os.makedirs(BACKUP, exist_ok=True)
    keep = BACKUP + os.path.basename(path)
    if not os.path.exists(keep):
        shutil.copy(path, keep)
    im = Image.open(keep).convert("RGB")
    hsv = np.asarray(im.convert("HSV")).astype(float) / 255
    sk = skin_mask(hsv)
    v0, s0 = hsv[..., 2][sk].mean(), hsv[..., 1][sk].mean()

    rgb = np.asarray(im).astype(float) / 255
    g = np.clip(np.log(TARGET_V) / np.log(v0), 0.72, 1.0)
    lifted = rgb ** g
    hi = np.clip((rgb.max(-1, keepdims=True) - 0.85) / 0.15, 0, 1)
    rgb = lifted * (1 - hi) + rgb * hi

    warm = (rgb[..., 0] - rgb[..., 2])[sk].mean()
    if warm > 0.12:
        k = min((warm - 0.12) * 0.35, 0.03)
        rgb[..., 0] *= 1 - k
        rgb[..., 2] *= 1 + k
    rgb = np.clip(rgb, 0, 1)

    out = Image.fromarray((rgb * 255).astype(np.uint8))
    hsv = np.asarray(out.convert("HSV")).astype(float)
    h = hsv[..., 0] / 255 * 360
    warm_hue = np.clip(1 - np.abs(h - 22) / 22, 0, 1)
    f = np.clip(TARGET_S / max(s0, 1e-3), 0.82, 1.0)
    hsv[..., 1] *= 1 - (1 - f) * warm_hue
    out = Image.fromarray(np.clip(hsv, 0, 255).astype(np.uint8), "HSV").convert("RGB")
    out.save(path, quality=92)
    after = np.asarray(out.convert("HSV")).astype(float) / 255
    sk2 = skin_mask(after)
    print(f"{path}: skinV {v0:.2f}->{after[..., 2][sk2].mean():.2f} skinS {s0:.2f}->{after[..., 1][sk2].mean():.2f} gamma {g:.2f}")


for p in sys.argv[1:]:
    regrade(p)
