const WA_NUMBER = "6282366214931"; // 082366214931 Bos
let cart = JSON.parse(localStorage.getItem('182kopi_cart')||'{}');

const products = [
{id:1,name:"Kopi Susu Aren 250ml",price:18000,old:20000,badge:"BEST SELLER",cat:"cup",img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",desc:"Gula aren asli, susu fresh, espresso 1 shot"},
{id:2,name:"Kopi Susu Aren 1L Family",price:60000,old:70000,badge:"HEMAT 15%",cat:"bottle",img:"https://images.unsplash.com/photo-1544787219-7f47cc556762?w=500",desc:"Untuk 4-5 gelas, tahan 2 hari kulkas"},
{id:3,name:"Gula Aren Cair 500ml",price:35000,badge:"B2B BEST",cat:"bottle",img:"https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=500",desc:"100% nira aren asli Sidoarjo, untuk cafe & rumah"},
{id:4,name:"Americano Aren",price:15000,cat:"cup",img:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",desc:"Hitam pekat + hint gula aren, tanpa susu"},
{id:5,name:"Paket Ngopi Berdua",price:50000,old:60000,badge:"PAKET",cat:"paket",img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500",desc:"2x 250ml + 2 Donat Kampung"},
{id:6,name:"Paket Kantor 10 Cup",price:160000,badge:"CORPORATE",cat:"paket",img:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=500",desc:"10 cup + box + free delivery Panam"},
{id:7,name:"Matcha Aren Latte",price:22000,cat:"non",img:"https://images.unsplash.com/photo-1515825838458-f2a94b20105a?w=500",desc:"Matcha Jepang + gula aren, non-kopi best seller"},
{id:8,name:"Teh Tarik Aren",price:18000,cat:"non",img:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500",desc:"Teh tarik creamy + aren legit"}
];

const locations = [
{name:"Gerobak Pusat - Panam",addr:"Jl. HR Soebrantas No 182, Panam",status:"BUKA - Ramai",jam:"16:00-23:00",omzet:"Rp 1.8jt/hari"},
{name:"Gerobak 2 - Simpang Arifin",addr:"Jl. Arifin Ahmad",status:"BUKA",jam:"16:00-22:00",omzet:"Rp 1.2jt/hari"},
{name:"Gerobak 3 - Sukakarya",addr:"Jl. Sukakarya",status:"TUTUP - Stok Habis",jam:"Besok 16:00",omzet:"-"},
{name:"Central Kitchen",addr:"Pekanbaru, Riau - Produksi Gula Aren",status:"PRODUKSI",jam:"08:00-17:00",omzet:"200L/hari"}
];

function toggleMenu(){document.getElementById('navMenu').classList.toggle('show')}
function renderProducts(filter='all'){
  const grid=document.getElementById('productGrid');
  let list=products; if(filter!='all') list=products.filter(p=>p.cat==filter);
  grid.innerHTML=list.map(p=>`
  <div class="pcard">
    ${p.badge?`<div class="badge">${p.badge}</div>`:''}
    <img src="${p.img}" alt="${p.name}">
    <div class="pcard-body">
      <b>${p.name}</b><br><small style="color:#777">${p.desc}</small>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
        <div><span class="price">Rp ${p.price.toLocaleString('id-ID')}</span>${p.old?`<span class="old">${p.old.toLocaleString('id-ID')}</span>`:''}</div>
        <div class="qty"><button onclick="addCart(${p.id},-1)">-</button><span id="q-${p.id}">${cart[p.id]||0}</span><button onclick="addCart(${p.id},1)">+</button></div>
      </div>
    </div>
  </div>`).join('');
}
function addCart(id,delta){
  cart[id]=(cart[id]||0)+delta; if(cart[id]<=0) delete cart[id];
  localStorage.setItem('182kopi_cart',JSON.stringify(cart));
  const el=document.getElementById(`q-${id}`); if(el) el.innerText=cart[id]||0;
  updateCart();
}
function updateCart(){
  const totalItems=Object.values(cart).reduce((a,b)=>a+b,0);
  document.getElementById('cartCount').innerText=totalItems;
  document.getElementById('modalCount').innerText=totalItems;
  const entries=Object.entries(cart);
  let sub=0; let html='';
  if(entries.length==0){html='<p style="padding:20px;text-align:center;color:#777">Keranjang kosong. Tambah kopi dulu Bos!</p>'}
  else{
    html=entries.map(([id,q])=>{
      const p=products.find(x=>x.id==id); sub+=p.price*q;
      return `<div style="display:flex;gap:12px;padding:14px 0;border-bottom:1px solid #eee"><img src="${p.img}" style="width:60px;height:60px;border-radius:12px;object-fit:cover"><div style="flex:1"><b>${p.name}</b><br><small>Rp ${p.price.toLocaleString('id-ID')} x ${q}</small></div><b>Rp ${(p.price*q).toLocaleString('id-ID')}</b></div>`
    }).join('');
  }
  document.getElementById('cartList').innerHTML=html;
  document.getElementById('subTotal').innerText='Rp '+sub.toLocaleString('id-ID');
  document.getElementById('totalPay').innerText='Rp '+(sub+5000).toLocaleString('id-ID');
}
function openCart(){document.getElementById('cartModal').style.display='block';updateCart()}
function closeCart(){document.getElementById('cartModal').style.display='none'}
function filterMenu(cat){
  document.querySelectorAll('.menu-filter button').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active'); renderProducts(cat);
}
function renderLocs(){
  document.getElementById('locList').innerHTML=locations.map((l,i)=>`
  <div class="loc-item ${i==0?'active':''}"><div><b>${l.name}</b><small>${l.addr} • ${l.jam}</small><br><small style="color:${l.status.includes('BUKA')?'#10b981':'#ef4444'}">${l.status} • ${l.omzet}</small></div><a href="https://wa.me/${WA_NUMBER}?text=Mau%20ke%20${l.name}" style="width:36px;height:36px;background:var(--green);color:white;display:grid;place-items:center;border-radius:10px;text-decoration:none"><i class="fa-solid fa-location-arrow"></i></a></div>
  `).join('');
}
function checkoutWA(){
  if(!Object.keys(cart).length){alert('Keranjang kosong Bos!');return;}
  const name=document.getElementById('custName').value||'Pelanggan'; const phone=document.getElementById('custPhone').value||'-'; const addr=document.getElementById('custAddr').value||'-'; const pay=document.getElementById('payMethod').value; const time=document.getElementById('deliveryTime').value;
  let sub=0; let detail=''; Object.entries(cart).forEach(([id,q])=>{const p=products.find(x=>x.id==id); sub+=p.price*q; detail+=`- ${p.name} x ${q} = Rp ${(p.price*q).toLocaleString('id-ID')}%0A`;});
  const total=sub+5000;
  const msg=`Halo *182KOPI CORPORATE*%0A%0ASaya mau pesan:%0A${detail}%0ASubtotal: Rp ${sub.toLocaleString('id-ID')}%0AOngkir: Rp 5.000%0A*Total: Rp ${total.toLocaleString('id-ID')}*%0A%0A*Data:*%0ANama: ${name}%0AWA: ${phone}%0AAlamat: ${addr}%0ABayar: ${pay}%0AWaktu: ${time}%0A%0AP-IRT: 2153274010234-29%0A`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`,'_blank');
  localStorage.removeItem('182kopi_cart'); cart={}; updateCart(); closeCart();
}
document.addEventListener('DOMContentLoaded',()=>{renderProducts();renderLocs();updateCart();});
