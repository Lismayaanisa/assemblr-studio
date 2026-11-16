from PIL import Image, ImageDraw, ImageFilter
import numpy as np, sys
sys.path.insert(0,".welcome-originals/screen")
from persp import warp
flat=Image.open(".welcome-originals/screen/flat.png").convert("RGB")
FW,FH=flat.size
JOBS={
 "student":dict(quad=[(430,265),(906,266),(887,597),(421,552)],
                finger=[(780,385),(915,385),(915,530),(800,530)]),
 "parent":dict(quad=[(470,243),(899,241),(902,524),(470,523)],
               finger=[(770,390),(905,390),(905,530),(770,530)],
               exclude=[[(786,512),(822,483),(842,494),(806,523)]]),
}
def hsv(a):
    mx=a.max(-1); mn=a.min(-1); c=mx-mn
    s=np.where(mx>0,c/np.maximum(mx,1e-6),0); r,g,b=a[...,0],a[...,1],a[...,2]; cc=np.maximum(c,1e-6)
    h=np.where(mx==r,((g-b)/cc)%6,np.where(mx==g,(b-r)/cc+2,(r-g)/cc+4))*60
    return h,s,mx
for k,j in JOBS.items():
    base=Image.open(f".welcome-originals/screen/{k}-code-before.jpg").convert("RGB")
    W,H=base.size
    scr=warp(flat,[(0,0),(FW,0),(FW,FH),(0,FH)],(W,H),j["quad"])
    scr=scr.filter(ImageFilter.GaussianBlur(0.5))
    qm=Image.new("L",(W*4,H*4),0); ImageDraw.Draw(qm).polygon([(x*4,y*4) for x,y in j["quad"]],fill=255); qm=qm.resize((W,H),Image.LANCZOS)
    a=np.asarray(base).astype(float)/255
    h,s,v=hsv(a)
    skin=((h>5)&(h<38)&(s>0.15)&(s<0.5)&(v>0.66)).astype(np.uint8)*255
    fm=Image.new("L",(W,H),0); fd=ImageDraw.Draw(fm); fd.polygon(j["finger"],fill=255)
    for ex in j.get("exclude",[]): fd.polygon(ex,fill=0)
    skin=Image.fromarray(np.minimum(skin,np.asarray(fm)))
    skin=skin.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1))
    mask=np.asarray(qm).astype(float)*(1-np.asarray(skin).astype(float)/255)
    mask=Image.fromarray(mask.astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    out=Image.composite(scr,base,mask)
    out.save(f"assets/welcome-{k}-code.jpg",quality=93,optimize=True)
    skin.save(f"/tmp/skin_{k}.png")
    print(k,"done")
