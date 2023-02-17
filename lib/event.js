const moment = require("moment-timezone");
let date = moment().tz('Asia/Jakarta').format('DD/MM/YYYY')

const event = (name) => {
let time = date.split('/')[1]
 let resu = ""
	switch(name) {
	case "valentine":
		resu = ''
		if(time >= '01' && time <= '04') {
			resu = {
				quest : [{
					name: "Bencana Valentine?!",
					req: "BAB 1: Naga dan Kristal Hitam",
					npc: "Lefina",
					lv: "Lv 30",
					mats: "No",
					boss: "Chocolate Ooze",
					element: "Air",
					exp: "- Putih(30): 1.200\n- Susu(60): 13.000\n- Manis(90): 32.000\n- Pahit(120): 52.000\n- Dark(150): 127.000",
					reward: "Cokelat Lefina"
				}, {
					name: "Bawaan di Hari Valentine",
					req: "BAB 4: Raja Agung Darkan",
					npc: "Filecia",
					lv: "90",
					mats: "No",
					boss: "Eidenliebe",
					element: "Gelap",
					exp: "- Susu(90): 40.000\n- Manis(120): 62.000\n- Pahit(150): 145.000\n- Dark(180): 240.000",
					reward: "Cokelat Felicia"
				}, {
					name: "Pembuatan Manisan Istimewa",
					req: "BAB 4: Raja Agung Darkan",
					npc: "Lefina",
					lv: "120",
					mats:"- Cokelat Susu Kerang 5x 2 (Shell Kraken : Neraka Manis)\n- Daun Manis 5x 2 (Shell Mask : Neraka Manis)\n- Buah Kuno 5x 2 (Gramp : Neraka Manis)",
					boss: "Jeandoux",
					exp: "- Susu(120): 72.000\n- Manis(150): 165.000\n- Pahit(180): 290.000\n- Dark(210): 400.000",
					reward: "Cokelat Neo Lefina"
				}, {
					name: "Waspada Cokelat Buatan Tangan!",
					req: "BAB 4: Raja Agung Darkan",
					npc: "Lefina",
					lv: "140",
					mats: "- Likeur Aneh 10x (Potum Likeur : Tebing Krim)\n- Bunga Krim 10x (Kijimu  : Tebing Krim)\n- Kacang Macapicoa 10x (Pico : Tebing Krim)",
					boss: "Garnache",
					element: "Api",
					exp: "- Susu(140): 135.000\n- Manis(170): 251.000\n- Pahit(200): 400.000\n- Dark(230): 560.000",
					reward: "Donat Ganache"
				}, {
					name: "Mengantar Barang Manis Yang Berbahaya",
					req: "BAB 4: Raja Agung Darkan",
					npc: "Lefina",
					lv: "160",
					mats: "No",
					boss: "Mieli",
					element: "Angin",
					exp: "- Susu(160): 213.000\n- Manis(190): 360.000\n- Pahit(220): 530.000\n- Dark(250): 700.000",
					reward: "Cokelat Madu"
				}, {
					name: "Kudapan Manis dan Pedagang Tak Jujur",
					req: "BAB 4: Raja Agung Darkan",
					npc: "Lefina",
					lv: "180",
					mats:"-Bubuk Kokoa 10x (Young Pore : Waduk Cokelat)\n- Pasta Kakao 10x (Ular Kolam : Waduk Cokelat)\n- Gula Berkualitas 10x (Kucing Chocogan : Waduk Cokelat)",
					boss: "Goblin Makelar",
					element: "Gelap",
					exp: "- Polos(180): 320.000\n- Kakao(210): 490.000\n- Choco(240): 660.000",
					reward: "Cokelat Neo Lefina II"
				}]
			}	
		} else {
			resu = {
				quest: [{
					name: "Maaf, Event tersebut saat ini sedang tidak berlangsung!"
				}]
			}
		}
		return resu
		break

	case 'natal':
	case 'christmas':
		return `Bahan & reward Quest event Natal 2022
*Toram Online*

*Chapter 1 :*

Q1
~ Daging ayam *5x* (beak : kuil runtuh)
~ Kacang *3x* (pomum : dataran rakau)
~ Kacang asam *2x* (pomum : P. Garam reug)
~ Nektar *1x* ( kijimu : reruntuhan athema)
★ pembuat kue : frente (sofya)
*Reward : Stocking santa*

Q2 
~ Daun pomum *10x* (pomum : dataran rakau)
~ Daun colon *10x*(colon : tanah pembangunan)
★ pembuat karangan bunga : Lefina (sofya)
*Reward : Stocking santa*

Q3
~ Hematit *1x* (piedra : dataran rakau)
~ Bulu empuk *3x* (rafy : dataran rakau)
~ Bulu lembut *5x* (wooly : P. Garam reug)
*Reward : Stocking santa*

Q4
~ Bintang natal *3x* (???)
*Reward : Stocking santa*

*Chapter 2 :*

Q1
~ Remah kayu *5x* (shell mask : tanah pembangunan)
~ Korek api kecil *5x* (calron : lahan bakar wilteka)
*Reward : Boneka salju*

Q2
Diff (30-50)
~ Bulu api *3x* (flame butterfly : lereng merapi A3)
~ Sayap kupu-kupu biru *2x* (Farfalla : padang darkanon)
~ Bintang natal *5x* (???)
*Reward : Boneka salju*

Q3
Lawan izanio
*Reward : Boneka salju*

*Chapter 3 :*

Q1
Pembasmian 3 boss
*Reward : Boneka salju*

*Chapter 4 :*

Q1 
~ Cairan mudah terbakar *10x* (red jelly : lereng merapi A1)
*Reward : Kukis salju*

Q2
Diff Lv. 70
~ Air bening *10x* (voda roar : gua lutaros)
*Reward : Kukis salju*

Q3
Diff 60 - 80
~ Perisai rusak *5x* (bidak : benteng solfini)
~ pelat besi kukuh *10x* (greg : padang kelana)
*Reward : Kukis salju*

*Chapter 5 :*

Q1
~ Salju suci *5x* (manusia salju : istana noeliel)
*Reward : Berlian noel*

*Chapter 6 :*

Q1
~ Lilin suci merah *10x* (santaby : rumah joulu:depot)
~ Lilin suci biru *10x* (santaby : rumah joulu:gudang hadiah)
*Reward : Stocking santa & Bunga glasial*

*Chapter 7 :*

Q1
~ Batu sakral *10x* (santaby : paviliun tomte:pintu masuk)
*Reward : Salju kristal*

*Chapter 8 :*

Q1
~ Emblem kuyu *10x* (all mobs : istana noeliel Lt. B1)
*Reward : Kristal salju suci*
`
break

	default:

	}
	
}

exports.event = event