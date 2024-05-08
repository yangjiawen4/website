class Cynlinder
{
    static RATIO=0.2;
    static THICKNESS=60;
    static TOPWIDTH=40;
    #trajactory=[];//在class内部若要在#前加"."，前缀只能是this
    width;
    height;
    x;
    y;
    id;
    type;
    constructor(w,h,x,y,i,t)
    {
        this.#trajactory=[[1,2],[1,3],[3,4],[4,5]];
        this.width=w;
        this.height=h;
        this.left=x;
        this.top=y;
        this.id=i;
        this.type=t;
    }
    makehtml()
    {
        let d=document.createElement('div');
        d.id=this.type + this.id;
        d.className='layer';
        d.style.cssText=`left:${this.left}px;
                         top:${this.top}px;
                         width:${this.width}px;
                         height:${this.height}px;`;//寻找this.left的值并传输到此处
        d.innerHTML=this.makecynlinder(this.x,this.y,this.id);
        document.body.appendChild(d);
    };
    slowmove(x1,y1,s)
    {
    }
    makecynlinder(w,h,i)
    {
    let h1=w*Cynlinder.RATIO;
    //let color=colors[i];
    let color='rgb('+Math.floor(Math.random()*256)+","
                            +Math.floor(Math.random()*256)+","
                            +Math.floor(Math.random()*256)+")";
    let s='<div style="margin-top: '+h1+'px;width:'+w+'px;height:'+h+'px;background-color:'+color+'"></div>'
        +'<div style="margin:-'+h1/2+'px 0px -'+(h1+h)+'px 0px;width:'+w+'px;height:'+h1+'px;background-color:'+color+';border-radius:'+(w/2)+'px/'+h1/2+'px"></div>'
        +'<div style="width:'+(w-2)+'px;height:'+h1+'px;background-image: radial-gradient(#101010,#305020,15%,yellow,'+color+');border-radius: '+(w/2-1)+'px/'+h1/2+'px;border:1px red solid;"></div>';
       return s;
    }
}


class Disk extends Cynlinder
{
    slowmove(xys,s)
    {
        
    }
    }

   
class Pillar extends Cynlinder
{
    makecynlinder(w,h,i)
    {
        let xx=super.makecynlinder();
        return xx.replace(/background.image:[^;]+/,'');
    }
    slowresize(newh,s,anchor)
    {
        
    }
}

class Game
{
    static INDENT=20;
    static DIAMETER=20;
    N;
    disks=[];
    piers=[];
    constructor(n)
    {
        this.N=n;
        for(let i=0;i<n;i++)
        {
            let x=i*(screen.width/2.5);
            let y=0;
            let w=2*(n-i-1)*Game.INDENT+Cynlinder.TOPWIDTH;
            let h=this.N*Cynlinder.THICKNESS;
            disks[i]=new Disk(w,h,x,y,i,'disk');
            
        }
        for(let i=0;i<6;i++)
        {
            let x=i*(screen.width/2.5);
            let y=0;
            let w=2*(n-i-1)*Game.INDENT+Cynlinder.TOPWIDTH;
            let h=this.N*Cynlinder.THICKNESS;
            piers[i] = new Pillar(w,h,x,y,i,'pillar');
        }
    }
}