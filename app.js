(() => {
  const SUPABASE_URL = "https://vfypmgioczkmmhmcsntn.supabase.co";
  const SUPABASE_KEY = "sb_publishable_YffaAX_E77Sw7AoOxlwpMw_Up2289Vo"; // publishable key: safe for browsers
  const client = window.supabase?.createClient(SUPABASE_URL, SUPABASE_KEY);
  const $ = id => document.getElementById(id);
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const ICONS = {"guava": "<circle cx=\"32\" cy=\"37\" r=\"20\" fill=\"#f4a0b3\"/><circle cx=\"32\" cy=\"37\" r=\"12\" fill=\"#fde7ec\"/><circle cx=\"28\" cy=\"34\" r=\"1.7\" fill=\"#e8647f\"/><circle cx=\"36\" cy=\"34\" r=\"1.7\" fill=\"#e8647f\"/><circle cx=\"32\" cy=\"41\" r=\"1.7\" fill=\"#e8647f\"/><path d=\"M32 17c2-7 9-9 13-8-1 6-6 9-13 8z\" fill=\"#4f8a3c\"/>", "grape": "<path d=\"M32 6v12\" stroke=\"#4f8a3c\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M33 12c4-5 10-5 13-3-2 5-8 6-13 3z\" fill=\"#4f8a3c\"/><g fill=\"#7d55bd\"><circle cx=\"21\" cy=\"26\" r=\"7\"/><circle cx=\"32\" cy=\"26\" r=\"7\"/><circle cx=\"43\" cy=\"26\" r=\"7\"/><circle cx=\"26\" cy=\"38\" r=\"7\"/><circle cx=\"38\" cy=\"38\" r=\"7\"/><circle cx=\"32\" cy=\"50\" r=\"7\"/></g><g fill=\"#a98ae0\"><circle cx=\"19\" cy=\"24\" r=\"2\"/><circle cx=\"30\" cy=\"24\" r=\"2\"/><circle cx=\"41\" cy=\"24\" r=\"2\"/><circle cx=\"24\" cy=\"36\" r=\"2\"/><circle cx=\"36\" cy=\"36\" r=\"2\"/><circle cx=\"30\" cy=\"48\" r=\"2\"/></g>", "carrot": "<polygon points=\"10,54 40,24 50,34\" fill=\"#f08a24\"/><path d=\"M18 46l5-5M26 38l6-6\" stroke=\"#c96a10\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M42 22c1-8 8-12 12-12-1 7-5 11-12 12zM47 28c6-2 10-5 11-9-6 0-10 3-11 9z\" fill=\"#4f8a3c\"/><ellipse cx=\"20\" cy=\"20\" rx=\"13\" ry=\"10\" fill=\"#f6df5a\"/><ellipse cx=\"20\" cy=\"20\" rx=\"9\" ry=\"6.5\" fill=\"#fbf0a0\"/>", "coconut": "<circle cx=\"32\" cy=\"32\" r=\"23\" fill=\"#7a4e2d\"/><circle cx=\"32\" cy=\"32\" r=\"17\" fill=\"#fffdf2\"/><circle cx=\"32\" cy=\"32\" r=\"10\" fill=\"#e4f0dc\"/><ellipse cx=\"27\" cy=\"27\" rx=\"4\" ry=\"2.4\" fill=\"#fff\" opacity=\".8\" transform=\"rotate(-30 27 27)\"/>"};
  const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.3.3-.1.6.2.3.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.3.1.5.1.6-.1l.9-1.100c.2-.3.4-.2.6-.1l1.900.9c.3.1.5.2.5.3.1.2.1.7-.1 1.300z"/></svg>';

  /* ----- navigation ----- */
  const nav = $("navLinks"), btn = $("menuBtn");
  if (nav && btn) {
    btn.addEventListener("click", () => { const o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
    document.addEventListener("keydown", e => { if (e.key === "Escape") nav.classList.remove("open"); });
  }
  document.querySelectorAll(".year").forEach(e => e.textContent = new Date().getFullYear());

  /* ----- products ----- */
  const fallback = [
    {name:"COCO FIZZ Guava Juice",description:"A deliciously refreshing guava experience with the distinctive taste and fruity aroma of ripe guavas.",size:"200 ml",category:"Fruit juice",display_order:1},
    {name:"COCO FIZZ Grape Juice",description:"The rich, fruity taste of grapes in a refreshing drink with a sweet-tangy flavour.",size:"200 ml",category:"Fruit juice",display_order:2},
    {name:"COCO FIZZ Carrot & Lemon Juice",description:"The earthy sweetness of carrot meets the refreshing citrus zing of lemon.",size:"200 ml",category:"Fruit drink",display_order:3},
    {name:"COCO FIZZ Coconut Water",description:"Light and delicate, with the refreshing taste of coconut water.",size:"200 ml",category:"Coconut water",display_order:4}
  ];
  const flavour = n => { n = (n || "").toLowerCase(); return n.includes("guava") ? "guava" : n.includes("grape") ? "grape" : n.includes("carrot") ? "carrot" : "coconut"; };
  function renderProducts(list) {
    const grid = $("productGrid"); if (!grid) return;
    const rows = (list || []).filter(p => p.is_active !== false).sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    grid.innerHTML = rows.map(p => { const f = flavour(p.name);
      const pic = p.image_url ? `<img src="${esc(p.image_url)}" alt="${esc(p.name)} pack" loading="lazy">` : `<svg viewBox="0 0 64 64" role="img" aria-label="${f} illustration">${ICONS[f]}</svg>`;
      return `<article class="product-card"><div class="product-photo f-${f}">${pic}<span class="chip">${esc(p.size || "200 ml")}</span></div><div class="product-body"><h3>${esc(p.name)}</h3><p>${esc(p.description || "")}</p><small>${esc(p.category || "COCO FIZZ")}</small></div></article>`; }).join("");
  }
  async function products() {
    if (!$("productGrid")) return;
    renderProducts(fallback);
    if (!client) return;
    const { data, error } = await client.from("products").select("*").eq("is_active", true).order("display_order", { ascending: true });
    if (!error && data && data.length) renderProducts(data);
  }

  /* ----- contact settings + WhatsApp button ----- */
  const I = {
    tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8.100 9.900a16 16 0 0 0 6 6l1.300-1.200a2 2 0 0 1 2.100-.4c.9.3 1.800.6 2.800.7a2 2 0 0 1 1.700 2z"/></svg>'
  };
  async function settings() {
    if (!client) return;
    const { data, error } = await client.from("business_settings").select("*").eq("id", 1).maybeSingle();
    if (error || !data) return;
    const digits = v => String(v || "").replace(/[^\d]/g, "");
    const put = (id, val, href) => { const e = $(id); if (!e || !val) return; e.innerHTML = href ? `<a href="${esc(href)}">${esc(val)}</a>` : esc(val); };
    put("businessPhone", data.business_phone, "tel:" + String(data.business_phone || "").replace(/[^\d+]/g, ""));
    put("businessEmail", data.business_email, "mailto:" + data.business_email);
    put("officeAddress", data.office_address);
    put("factoryAddress", data.factory_address);
    put("factoryPhone", data.factory_phone, "tel:" + String(data.factory_phone || "").replace(/[^\d+]/g, ""));
    const wa = digits(data.whatsapp_number), waUrl = wa ? "https://wa.me/" + wa : "";
    put("whatsappNumber", data.whatsapp_number, waUrl);
    const maps = $("mapsLink"); if (maps && data.google_maps_url) { maps.href = data.google_maps_url; maps.classList.remove("hidden"); const n = $("mapsNote"); if (n) n.classList.add("hidden"); }
    const soc = $("socialLinks"); if (soc) soc.innerHTML = [["instagram_url","Instagram"],["facebook_url","Facebook"]].filter(s => data[s[0]]).map(s => `<a href="${esc(data[s[0]])}" target="_blank" rel="noopener">${s[1]}</a>`).join("");
    const q = $("quickActions");
    if (q) q.innerHTML = [data.business_phone ? `<a class="btn btn-dark" href="tel:${esc(String(data.business_phone).replace(/[^\d+]/g, ""))}">Call us</a>` : "", waUrl ? `<a class="btn" href="${esc(waUrl)}" target="_blank" rel="noopener">WhatsApp</a>` : "", data.business_email ? `<a class="btn btn-line" href="mailto:${esc(data.business_email)}">Email us</a>` : ""].join("");
    if (waUrl) { const a = document.createElement("a"); a.className = "whatsapp"; a.href = waUrl; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", "Chat on WhatsApp"); a.innerHTML = WA_ICON; document.body.appendChild(a); }
  }
  products(); settings();
})();
