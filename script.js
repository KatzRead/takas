/* ==========================
function pageAdmin(){
const db = loadDB();
qs('#form-title').textContent = t('addItem');
const form = qs('#item-form');
const f = {
id: qs('#f-id'), name: qs('#f-name'), marketName: qs('#f-marketName'), weapon: qs('#f-weapon'), exterior: qs('#f-exterior'),
float: qs('#f-float'), price: qs('#f-price'), currency: qs('#f-currency'), image: qs('#f-image'), rarity: qs('#f-rarity'), collection: qs('#f-collection'), statTrak: qs('#f-statTrak')
};


const grid = qs('#skin-grid'); grid.innerHTML='';
db.skins.forEach(s=>{
const card = el('div','card');
const thumb = el('div','thumb'); thumb.innerHTML = `<img src="${s.image}" alt="${s.marketName}">`;
const body = el('div','body');
const title = el('div'); title.style.fontWeight='600'; title.textContent = s.name;
const meta = el('div','meta'); meta.textContent = `${s.exterior} • Float ${s.float}`;
const price = el('div','price'); price.textContent = `${s.price} ${s.currency}`;


const row = el('div','actions');
const edit = el('button','btn'); edit.textContent = t('edit'); edit.onclick = ()=>{
qs('#form-title').textContent = `${t('edit')}: ${s.id}`;
f.id.value=s.id; f.name.value=s.name; f.marketName.value=s.marketName||''; f.weapon.value=s.weapon||''; f.exterior.value=s.exterior||''; f.float.value=s.float||0; f.price.value=s.price||0; f.currency.value=s.currency||'USD'; f.image.value=s.image||''; f.rarity.value=s.rarity||''; f.collection.value=s.collection||''; f.statTrak.checked=!!s.statTrak;
};
const del = el('button','btn'); del.textContent = t('remove'); del.onclick = ()=> removeSkin(s.id);
row.append(edit, del);


body.append(title, meta, price, row);
card.append(thumb, body);
grid.append(card);
});


form.addEventListener('submit', (e)=>{
e.preventDefault();
const skin = {
id: f.id.value.trim(), name: f.name.value.trim(), marketName: f.marketName.value.trim(), weapon: f.weapon.value.trim(), exterior: f.exterior.value.trim(),
float: parseFloat(f.float.value||0), price: parseFloat(f.price.value||0), currency: f.currency.value.trim()||'USD', image: f.image.value.trim(), rarity: f.rarity.value.trim(), collection: f.collection.value.trim(), statTrak: !!f.statTrak.checked
};
if(!skin.id || !skin.name){ alert('id & name required'); return; }
upsertSkin(skin);
form.reset(); qs('#form-title').textContent = t('addItem');
});


qs('#cancel-btn').onclick = ()=>{ form.reset(); qs('#form-title').textContent = t('addItem'); };


qs('#export').onclick = ()=>{
const blob = new Blob([JSON.stringify(loadDB(), null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='cs2-trade-db.json'; a.click(); URL.revokeObjectURL(url);
};


qs('#import').addEventListener('change', async (e)=>{
const file = e.target.files?.[0]; if(!file) return;
try{
const txt = await file.text(); const json = JSON.parse(txt); if(!json || typeof json!=='object') throw new Error('Invalid');
saveDB(json); redraw();
}catch(err){ alert('Invalid JSON file'); }
});
}


function pageContact(){ /* static text via i18n */ }


/* ==========================
Router
========================== */
const routers = { market: pageMarket, inventory: pageInventory, compare: pageCompare, admin: pageAdmin, contact: pageContact };


/* ==========================
Boot
========================== */
(function boot(){
setYear();
bindLangSelector();
applyI18n();
redraw();
})();