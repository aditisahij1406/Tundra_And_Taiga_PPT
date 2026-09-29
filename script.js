const data={
caribou:{title:"CARIBOU",habitat:"ARCTIC TUNDRA",img:"https://upload.wikimedia.org/wikipedia/commons/f/fd/Caribou.jpg",desc:"Caribou are traditionally herded by northern communities. Herds are moved between seasonal grazing areas depending on weather and food. They can survive in extremely cold environments and find food beneath snow.",uses:"USES: Meat • Hides • Transport",diet:"Lichens, mosses, and plants",hab:"Arctic Tundra",life:"15–20 years",fun:"Both male and female caribou grow antlers and are the only deer species to do so."},
horse:{title:"YAKUTIAN HORSE",habitat:"SAKHA REPUBLIC (YAKUTIA) · TAIGA",img:"https://upload.wikimedia.org/wikipedia/commons/7/75/A_Yakutian_horse_%289762345674%29.jpg",desc:"These horses are raised in herds by communities in northern Siberia. They can graze over large areas and withstand severe winters. They provide food, transport and economic support for communities living in remote northern regions.",uses:"USES: Riding • Transport • Agriculture",diet:"Grass, hay, and plants",hab:"Sakha Republic (Yakutia) Taiga",life:"15–20 years",fun:"Yakutian horses can survive winters with temperatures below −50°C!"},
cattle:{title:"YAKUTIAN CATTLE",habitat:"SAKHA REPUBLIC (YAKUTIA) · TAIGA",img:"https://upload.wikimedia.org/wikipedia/commons/d/d7/Yakutian_Cattle_01_-_Head-on.jpeg",desc:"Cattle are raised for dairy and meat. Northern herders manage their animals around seasonal grazing and harsh winter conditions. They provide food and income for northern communities and are often combined with other livestock such as horses and reindeer.",uses:"USES: Riding • Transport • Agriculture",diet:"Grass, herbs, and hay",hab:"Sakha Republic (Yakutia) Taiga",life:"15–20 years",fun:"Yakutian cattle have a thick, furry coat and a layer of fat that allows them to survive in the Siberian wilderness."},
muskox:{title:"MUSK OX",habitat:"ARCTIC TUNDRA",img:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Muskox.jpg",desc:"Musk oxen are managed and raised on a small scale in some northern regions, but they are not as widely domesticated as reindeer or cattle. They can provide valuable food and fibre while being exceptionally well adapted to the Arctic environment.",uses:"USES: Wool • Meat • Hides",diet:"Lichens, grasses and shrubs",hab:"Arctic Tundra",life:"12–20 years",fun:"Their soft underwool, qiviut, is famous for being extremely warm and fine."},
sleddog:{title:"NORTHERN SLED DOG",habitat:"ARCTIC AND SUBARCTIC REGIONS",img:"https://upload.wikimedia.org/wikipedia/commons/5/5e/Denali_Sled_Dog.jpg",desc:"Northern communities traditionally breed and train working dogs to help people travel and transport supplies across snowy landscapes. Before modern vehicles, sled dogs provided an important means of transportation across snow and ice.",uses:"USES: Sled pulling • Carrying loads • Travel",diet:"Meat, fish and other animals",hab:"Arctic and subarctic regions",life:"10–15 years",fun:"Sled dogs work as a coordinated team, with individual dogs having different roles!"}
};

window.addEventListener("load",()=>setTimeout(()=>document.getElementById("loader").classList.add("done"),850));

const progress=document.getElementById("progress"),topbar=document.getElementById("topbar"),nav=document.querySelector(".nav");
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(scrollY/max*100)+"%";
  topbar.classList.toggle("scrolled",scrollY>60);
  nav.classList.toggle("visible",scrollY>innerHeight*.65);
  document.documentElement.style.setProperty("--parallax",(scrollY*.12)+"px");
},{passive:true});

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>io.observe(e));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true});

document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("pointermove",e=>{
    const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.12,y=(e.clientY-r.top-r.height/2)*.12;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener("pointerleave",()=>el.style.transform="");
});

const modal=document.getElementById("modal");
const openModal=id=>{
  const d=data[id]; if(!d)return;
  modal.querySelector("#modalImg").src=d.img;
  modal.querySelector("#modalImg").alt=d.title;
  modal.querySelector("#modalTitle").textContent=d.title;
  modal.querySelector("#modalHabitat").textContent=d.habitat;
  modal.querySelector("#modalDesc").textContent=d.desc;
  modal.querySelector("#modalUses").textContent=d.uses;
  modal.querySelector("#modalFun").innerHTML="<b>FUN FACT:</b> "+d.fun;
  modal.querySelector("#modalStats").innerHTML=`<div><b>DIET</b><span>${d.diet}</span></div><div><b>HABITAT</b><span>${d.hab}</span></div><div><b>LIFESPAN</b><span>${d.life}</span></div>`;
  modal.classList.add("open");document.body.style.overflow="hidden";
};
const closeModal=()=>{modal.classList.remove("open");document.body.style.overflow=""};
document.querySelectorAll(".animal-card").forEach(c=>c.addEventListener("click",()=>openModal(c.dataset.animal)));
document.querySelector(".close").addEventListener("click",closeModal);
document.querySelector(".modal-backdrop").addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
