/* global x, y */

const THICKNESS=60;
const TOPWIDTH=100;
const INDENT=10;
const GAP=20;
var RATIO=0.3;
N=8;


function layer(n,i)
{
    let x=i*INDENT;
    let y=(n-i-1)*THICKNESS;
    let width=2*(n-i-1)*INDENT+TOPWIDTH;
    let height=THICKNESS;
    let ele=document.createElement("div");
    ele.className="layer";
    ele.style.left=x+'px';
    ele.style.top=y+'px';
    ele.style.width=width+'px';
    ele.style.height=(height-GAP)+'px';
    ele.id="layer"+i;
    ele.innerHTML=disk(width,height,i);
    ele.style.backgroundColor='transparent';
    document.body.appendChild(ele);
}

function tower(n)
{
    for(let i=0;i<n;i++)
        layer(n,i);
    
    for(let i=0;i<n;i++)
    {
        let disk=document.getElementById('layer'+i);
        Drag.init(disk);
    }
}

function move(i,x,y)
{
    let ele=document.getElementById("layer"+i);
    ele.style.left=x+'px';
    ele.style.top=y+'px';
}

function disk(w,h,i)
{
    let h1=w*RATIO;
    //let color=colors[i];
    let color='rgb('+Math.floor(Math.random()*256)+","
                            +Math.floor(Math.random()*256)+","
                            +Math.floor(Math.random()*256)+")";
    let s='<div style="margin-top: '+h1+'px;width:'+w+'px;height:'+h+'px;background-color:'+color+'"></div>'
        +'<div style="margin:-'+h1/2+'px 0px -'+(h1+h)+'px 0px;width:'+w+'px;height:'+h1+'px;background-color:'+color+';border-radius:'+(w/2)+'px/'+h1/2+'px"></div>'
        +'<div style="width:'+(w-2)+'px;height:'+h1+'px;background-image: radial-gradient(#101010,#305020,15%,yellow,'+color+');border-radius: '+(w/2-1)+'px/'+h1/2+'px;border:1px red solid;"></div>';
       return s;
}


//moveDisk(2);
//setTimeout('moveDisk(4)',2000);

var alldiv=document.querySelectorAll('div');
for(let j=0;j<alldiv.length;j++)
    alldiv[j].classList.add('cls1');

var My={
    println:function(x){document.writeln(x+'<br>');},
    $:function(x){return document.getElementById(x);}
};
let instructions=[];
function move(n,source,destin,temp)
{
    if(n===1)
        instructions.push([source,destin]);
    else
    {
        move(n-1,source,temp,destin);
        instructions.push([source,destin]);
        move(n-1,temp,destin,source);
    }
}
move(N,0,1,2);
for(let p of instructions)
My.println(p[0]+"-->"+p[1]);

let stack=[];
stack[0]=[];for(let i=0;i<N;i++)stack[0].push(i);
stack[1]=[];
stack[2]=[];
//move(1,2)means:disk poped from 1,read out its (x0,y0)
//read out(x1,y1)from top of pier 2
//push the disk to the pier 2
function movedisk(k) //k-th instruction
{
    let p=instructions[k];
    let s=p[0];
    let d=p[1];
    let topid=stack[s].pop();
    let disk=My.$('layer'+topid);
    let x0=disk.style.left;
    let y0=disk.style.top;
	
    let x1=((screen.width-TOPWIDTH)/2.5*d)+'px';
    let y1=(N*THICKNESS)+'px';
    let q=stack[d];
    if (q.length>0)
    {
        let topid1=q[q.length-1];
        let disk1=My.$('layer'+topid1);
        x1=disk1.style.left;
        y1=disk1.style.top;
        y1=(parseInt(y1.substring(0,y1.length-2))-THICKNESS)+'px';
	let w1=parseInt(disk1.style.width.replace(/px/,''));
	let w=parseInt(disk.style.width.replace(/px/,''));
	let diff=(w1-w)/2;
	x1=(parseInt(x1.replace(/px/,''))+diff)+'px';
    }
    
    q.push(topid);
    
let kftext="@keyframes diskmoveK{0%{left:X;top:Y}\n30%{left:X;top:0px}\n70%{left:U;top:0px}\n100%{left:U;top:V}}";
    My.$('dynamic').innerHTML =kftext.replace(/K/,k).replace(/X/,x0).replace(/Y/,y0).replace(/U/,x1).replace(/V/,y1);
    disk.style.animation="diskmove"+ k +" 1s 1";
    disk.style.left=x1;
    disk.style.top=y1;
}
tower(N);

function startgame(){movedisk(0);
for(let i=1;i<instructions.length;i++)
setTimeout('movedisk('+i+')',i*1010);}

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
/* global atEndDrag */

var Drag = 
{
    parseIntpx : function (str)
    {
        return parseInt(str.replace(/px/,''));
    },
    
	obj : null,
    
	init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
	{
        if (o===null) return;
		

		o.hmode			= bSwapHorzRef ? false : true ;
		o.vmode			= bSwapVertRef ? false : true ;

		o.root = oRoot && oRoot !== null ? oRoot : o ;

		if (o.hmode  && isNaN(Drag.parseIntpx(o.root.style.left  ))) o.root.style.left   = "0px";
		if (o.vmode  && isNaN(Drag.parseIntpx(o.root.style.top   ))) o.root.style.top    = "0px";
		if (!o.hmode && isNaN(Drag.parseIntpx(o.root.style.right ))) o.root.style.right  = "0px";
		if (!o.vmode && isNaN(Drag.parseIntpx(o.root.style.bottom))) o.root.style.bottom = "0px";

		o.minX	= typeof minX !== 'undefined' ? minX : null;
		o.minY	= typeof minY !== 'undefined' ? minY : null;
		o.maxX	= typeof maxX !== 'undefined' ? maxX : null;
		o.maxY	= typeof maxY !== 'undefined' ? maxY : null;

		o.xMapper = fXMapper ? fXMapper : null;
		o.yMapper = fYMapper ? fYMapper : null;

        o.onmousedown	= Drag.start;
		o.root.onDragStart	= new Function();
		o.root.onDragEnd	= new Function();
		o.root.onDrag		= new Function();
	},

	start : function(e)
	{
        var o = Drag.obj = this;
		e = Drag.fixE(e);
		var y = Drag.parseIntpx(o.vmode ? o.root.style.top  : o.root.style.bottom);
		var x = Drag.parseIntpx(o.hmode ? o.root.style.left : o.root.style.right );
		o.root.onDragStart(x, y);

		o.lastMouseX	= e.clientX;
		o.lastMouseY	= e.clientY;

		if (o.hmode) {
			if (o.minX !==null)	o.minMouseX	= e.clientX - x + o.minX;
			if (o.maxX !== null)	o.maxMouseX	= o.minMouseX + o.maxX - o.minX;
		} else {
			if (o.minX !== null) o.maxMouseX = -o.minX + e.clientX + x;
			if (o.maxX !== null) o.minMouseX = -o.maxX + e.clientX + x;
		}

		if (o.vmode) {
			if (o.minY !== null)	o.minMouseY	= e.clientY - y + o.minY;
			if (o.maxY !== null)	o.maxMouseY	= o.minMouseY + o.maxY - o.minY;
		} else {
			if (o.minY !== null) o.maxMouseY = -o.minY + e.clientY + y;
			if (o.maxY !== null) o.minMouseY = -o.maxY + e.clientY + y;
		}

		document.onmousemove	= Drag.drag;
		document.onmouseup		= Drag.end;

		return false;
	},

	drag : function(e)
	{
		e = Drag.fixE(e);
		var o = Drag.obj;
        if (o === null) return;
		var ey	= e.clientY;
		var ex	= e.clientX;
		var y = Drag.parseIntpx(o.vmode ? o.root.style.top  : o.root.style.bottom);
		var x = Drag.parseIntpx(o.hmode ? o.root.style.left : o.root.style.right );
		var nx, ny;

		if (o.minX !== null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
		if (o.maxX !== null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
		if (o.minY !== null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
		if (o.maxY !== null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

		nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
		ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

		if (o.xMapper)		nx = o.xMapper(y);
		else if (o.yMapper)	ny = o.yMapper(x);

		Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
		Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
		Drag.obj.lastMouseX	= ex;
		Drag.obj.lastMouseY	= ey;

		Drag.obj.root.onDrag(nx, ny);
		return false;
	},

	end : function()
	{
        if (Drag.obj === null || Drag.obj.root === null)   return;     
		document.onmousemove = null;
		document.onmouseup   = null;
		Drag.obj.root.onDragEnd(	Drag.parseIntpx(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]), 
									Drag.parseIntpx(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
		var ex = Drag.obj.lastMouseX;
		var ey = Drag.obj.lastMouseY;
      Drag.obj = null;
      if (typeof atEndDrag ==='function')atEndDrag(ex,ey);
	
   },

	fixE : function(e)
	{
		if (typeof e === 'undefined') e = window.event;
		if (typeof e.layerX === 'undefined') e.layerX = e.offsetX;
		if (typeof e.layerY === 'undefined') e.layerY = e.offsetY;
		return e;
	}
};

