document.addEventListener('DOMContentLoaded',()=>{

/* ========== THEME TOGGLE ========== */

const themeToggle=document.getElementById('themeToggle');
const themeIcon=themeToggle?themeToggle.querySelector('i'):null;
function setTheme(isLight){
    if(isLight){
        document.documentElement.classList.add('light');
        if(themeIcon){themeIcon.className='fas fa-sun'}
        localStorage.setItem('theme','light');
    }else{
        document.documentElement.classList.remove('light');
        if(themeIcon){themeIcon.className='fas fa-moon'}
        localStorage.setItem('theme','dark');
    }
}
if(themeToggle){
    themeToggle.addEventListener('click',()=>{
        setTheme(!document.documentElement.classList.contains('light'));
    });
}

/* ========== BACK TO TOP ========== */
const backToTop=document.getElementById('backToTop');
if(backToTop){
    window.addEventListener('scroll',()=>{
        if(window.scrollY>500)backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
    });
    backToTop.addEventListener('click',()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    });
}

/* ========== COPY TO CLIPBOARD ========== */
const copyToast=document.getElementById('copyToast');
function showToast(msg){
    if(!copyToast)return;
    copyToast.textContent=msg;
    copyToast.classList.add('show');
    setTimeout(()=>copyToast.classList.remove('show'),2000);
}
document.querySelectorAll('.copy-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
        const text=btn.dataset.copy;
        if(text){
            navigator.clipboard.writeText(text).then(()=>showToast('Copied to clipboard!')).catch(()=>showToast('Failed to copy'));
        }
    });
});

/* ========== TYPEWRITER ========== */
const typewriterEl=document.getElementById('typewriter');
if(typewriterEl){
    const roles=['Data Analytics Enthusiast','ML Developer','Python Developer','SQL Expert','B.Tech CSCE Student'];
    let roleIdx=0,charIdx=0,isDeleting=false;
    function type(){
        const current=roles[roleIdx];
        if(isDeleting){
            typewriterEl.textContent=current.substring(0,charIdx-1);
            charIdx--;
        }else{
            typewriterEl.textContent=current.substring(0,charIdx+1);
            charIdx++;
        }
        let speed=isDeleting?50:100;
        if(!isDeleting&&charIdx===current.length){
            speed=2000;
            isDeleting=true;
        }else if(isDeleting&&charIdx===0){
            isDeleting=false;
            roleIdx=(roleIdx+1)%roles.length;
            speed=500;
        }
        setTimeout(type,speed);
    }
    type();
}

/* ========== PROJECT FILTER ========== */
const filterBtns=document.querySelectorAll('.filter-btn');
const projectItems=document.querySelectorAll('.project-reveal');
filterBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        filterBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const filter=btn.dataset.filter;
        projectItems.forEach(item=>{
            const tags=item.dataset.tags||'';
            if(filter==='all'||tags.includes(filter)){
                item.classList.remove('hidden');
                setTimeout(()=>item.style.opacity='1',10);
            }else{
                item.style.opacity='0';
                setTimeout(()=>item.classList.add('hidden'),300);
            }
        });
    });
});

/* ========== PARTICLES ========== */
const canvas=document.getElementById('particleCanvas');
if(canvas){
    const ctx=canvas.getContext('2d');
    let W,H;
    const particles=[];
    const COUNT=60,DIST=120;
    function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
    resize();
    window.addEventListener('resize',resize);
    let mx=null,my=null;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
    class P{
        constructor(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.4;this.vy=(Math.random()-.5)*.4;this.s=Math.random()*2+1}
        update(){
            this.x+=this.vx;this.y+=this.vy;
            if(this.x<0||this.x>W)this.vx*=-1;
            if(this.y<0||this.y>H)this.vy*=-1;
            if(mx!==null){
                const dx=mx-this.x,dy=my-this.y,d=Math.sqrt(dx*dx+dy*dy);
                if(d<150){this.x-=dx*.008;this.y-=dy*.008}
            }
        }
        draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.s,0,Math.PI*2);ctx.fillStyle='rgba(99,102,241,0.35)';ctx.fill()}
    }
    for(let i=0;i<COUNT;i++)particles.push(new P());
    function anim(){
        ctx.clearRect(0,0,W,H);
        for(let p of particles){p.update();p.draw()}
        for(let i=0;i<particles.length;i++){
            for(let j=i+1;j<particles.length;j++){
                const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy);
                if(d<DIST){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(99,102,241,${0.12*(1-d/DIST)})`;ctx.lineWidth=.8;ctx.stroke()}
            }
        }
        requestAnimationFrame(anim);
    }
    anim();
}

/* ========== NAVBAR SCROLL ========== */
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
    if(window.scrollY>50)navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

/* ========== MOBILE MENU ========== */
const navToggle=document.getElementById('navToggle');
const navMenu=document.getElementById('navMenu');
if(navToggle&&navMenu){
    navToggle.addEventListener('click',()=>{
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    navMenu.querySelectorAll('a').forEach(link=>{
        link.addEventListener('click',()=>{
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ========== SCROLL REVEAL ========== */
const revealObs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('active')});
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

/* ========== COUNTERS ========== */
function animateCounter(el){
    if(el.dataset.animated)return;
    el.dataset.animated='true';
    const target=parseInt(el.dataset.count,10),suffix=el.dataset.suffix||'',numEl=el.querySelector('.stat-num'),dur=2000,start=performance.now();
    function tick(now){
        const p=Math.min((now-start)/dur,1),eased=1-Math.pow(1-p,3);
        numEl.textContent=Math.floor(eased*target)+suffix;
        if(p<1)requestAnimationFrame(tick);else numEl.textContent=target+suffix;
    }
    requestAnimationFrame(tick);
}
document.querySelectorAll('.stat-item').forEach(el=>{
    const obs=new IntersectionObserver((entries)=>{
        entries.forEach(e=>{if(e.isIntersecting){animateCounter(e.target);obs.unobserve(e.target)}});
    },{threshold:0.5});
    obs.observe(el);
});

/* ========== CONTACT FORM ========== */
const contactForm=document.getElementById('contactForm');
const formMessage=document.getElementById('formMessage');
if(contactForm){
    contactForm.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const data={name:document.getElementById('name').value.trim(),email:document.getElementById('email').value.trim(),message:document.getElementById('message').value.trim()};
        if(!data.name||!data.email||!data.message){showFormMsg('All fields are required.','error');return}
        try{
            const res=await fetch('/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
            const result=await res.json();
            if(result.success){showFormMsg(result.message,'success');contactForm.reset()}
            else showFormMsg(result.error||'Something went wrong.','error');
        }catch{showFormMsg('Failed to send. Please try again.','error')}
    });
}
function showFormMsg(msg,type){
    if(!formMessage)return;
    formMessage.textContent=msg;
    formMessage.className='form-message '+type;
    setTimeout(()=>{formMessage.className='form-message'},5000);
}

/* ========== SMOOTH SCROLL ========== */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
        e.preventDefault();
        const t=document.querySelector(this.getAttribute('href'));
        if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
    });
});

});
