import numpy as np
from PIL import Image
def coeffs(dst, src):
    # PIL maps output(dst) -> input(src)
    A=[];B=[]
    for (x,y),(u,v) in zip(dst,src):
        A.append([x,y,1,0,0,0,-u*x,-u*y]); B.append(u)
        A.append([0,0,0,x,y,1,-v*x,-v*y]); B.append(v)
    return np.linalg.solve(np.array(A,float),np.array(B,float)).tolist()
def warp(im, src_quad, size, dst_quad):
    return im.transform(size, Image.PERSPECTIVE, coeffs(dst_quad, src_quad), Image.BICUBIC)
