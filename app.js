
(() => {
  const SUPABASE_URL = "https://vfypmgioczkmmhmcsntn.supabase.co";
  const SUPABASE_KEY = "sb_publishable_YffaAX_E77Sw7AoOxlwpMw_Up2289Vo";
  const client = window.supabase?.createClient(SUPABASE_URL, SUPABASE_KEY);
  const $ = id => document.getElementById(id);
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const cleanPhone = v => String(v || "").replace(/[^\d+]/g, "");
  const fallback = [
    {name:"COCO FIZZ Guava Juice",description:"A deliciously refreshing guava experience with the distinctive taste and fruity aroma of ripe guavas.",size:"200 ml",category:"Fruit juice",display_order:1},
    {name:"COCO FIZZ Grape Juice",description:"Enjoy the rich, fruity taste of grapes in a refreshing drink with a delicious sweet-tangy flavour.",size:"200 ml",category:"Fruit juice",display_order:2},
    {name:"COCO FIZZ Carrot & Lemon Juice",description:"The earthy sweetness of carrot meets the refreshing citrus zing of lemon.",size:"200 ml",category:"Fruit drink",display_order:3},
    {name:"COCO FIZZ Coconut Water",description:"Light and delicate, with the refreshing taste of coconut water.",size:"200 ml",category:"Coconut water",display_order:4}
  ];
  function placeholder(name){const n=(name||"").toLowerCase(), cls=n.includes("guava")?"guava":n.includes("grape")?"grape":n.includes("carrot")?"carrot":"coconut", label=n.includes("guava")?"GUAVA":n.includes("grape")?"GRAPE":n.includes("carrot")?"CARROT & LEMON":"COCONUT WATER";return `<div class="product-placeholder ${cls}">${label}</div>`;}
  function render(list){const grid=$("productGrid");if(!grid)return;const rows=(list||[]).filter(p=>p.is_active!==false).sort((a,b)=>(a.display_order||0)-(b.display_order||0));grid.innerHTML=rows.map(p=>`<article class="product-card"><div class="product-photo">${p.image_url?`<img src="${esc(p.image_url)}" alt="${esc(p.name)} product pack" loading="lazy">`:placeholder(p.name)}</div><h3>${esc(p.name)}</h3><p>${esc(p.description||"")}</p><div class="product-meta"><span>${esc(p.size||"200 ml")}</span><span>${esc(p.category||"COCO FIZZ")}</span></div></article>`).join("");}
  async function products(){if(!$("productGrid"))return;if(!client){render(fallback);return;}const {data,error}=await client.from("products").select("*").eq("is_active",true).order("display_order",{ascending:true});if(error){render(fallback);return;}render(data&&data.length?data:fallback);}
  async function settings(){if(!client||!$("businessPhone"))return;const {data,error}=await client.from("business_settings").select("*").eq("id",1).maybeSingle();if(error||!data)return;const put=(id,val)=>{const e=$(id);if(e)e.textContent=val||"Contact details coming soon";};put("businessPhone",data.business_phone);put("businessEmail",data.business_email);put("officeAddress",data.office_address);put("factoryAddress",data.factory_address);put("factoryPhone",data.factory_phone);put("whatsappNumber",data.whatsapp_number);const maps=$("mapsLink");if(maps&&data.google_maps_url){maps.href=data.google_maps_url;maps.textContent="Open Google Maps ↗";}const socials=$("socialLinks");if(socials){socials.innerHTML=[data.instagram_url?`<a href="${esc(data.instagram_url)}" target="_blank" rel="noopener">Instagram ↗</a>`:"",data.facebook_url?`<a href="${esc(data.facebook_url)}" target="_blank" rel="noopener">Facebook ↗</a>`:""].join("");}const wa=cleanPhone(data.whatsapp_number);if(wa){const a=document.createElement("a");a.className="whatsapp";a.href=`https://wa.me/${wa.replace(/^\+/,"")}`;a.target="_blank";a.rel="noopener";a.textContent="◉";a.setAttribute("aria-label","Chat on WhatsApp");document.body.appendChild(a);}}
  products();settings();
})();
