/** Scale existing GPU glyph triangles after measuring/reflowing at the same factor. */
export function scaledText(R,text,x,y,style,tint,scale=1,options={}) {
    const start=R.uiData.length;
    R.text(String(text),x,y,style,tint,options);
    if(scale!==1)for(let i=start;i<R.uiData.length;i+=9){R.uiData[i]=x+(R.uiData[i]-x)*scale;R.uiData[i+1]=y+(R.uiData[i+1]-y)*scale;}
}
