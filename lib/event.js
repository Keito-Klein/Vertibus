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
				}, {
                     name: "Kudapan Tahun ini dijamin Aman!",
                     req: "BAB 4: Raja Agung Darkan",
                     npc: "Lefina",
                     lv: "190",
                     mats: "-Jamur Herbal Cina 10x (Shroonymon : Plato Makaron)\n-Susu Domba Pohon 10x (Ovinymon : Plato Makaron)\n-Dedaun Pahit 10x (Arbonymon : Plato Makaron)",
                     boss: "Pelulu Raksasa",
                     element: "Normal",
                     exp: "- Polos(190): 360.000\n- Kakao(220): 530.000\n- Choco(250): 680.000\n- kopi(280): 770.000",
                     reward: "Teh Herbal Premium"
                 }]
			}	
		} else {
			resu = {
				quest: [{
					name: "Maaf, Event tersebut saat ini sedang tidak berlangsung!\nevent berlangsung: Bulan 3"
				}]
			}
		}
		return resu
		break

	case 'white day':
		resu = ''
		if(time >= '02' && time <= '04') {
			resu = {
				quest : [{
					name: "Insiden di White Day?!",
					req: "BAB 1: Naga dan Kristal Hitam",
					npc: "Lefina",
					lv: "Lv 40",
					mats: "No",
					boss: "Candela",
					element: "lv40: Air, lv70: Angin, lv100: Cahaya, lv130: Air, lv160: Api",
					exp: "- Melon(40): 1.800\n- Lemon(70): 19.000\n- Mint(100): 49.000\n- Soda(130): 78.000\n- Cola(160): 190.000",
					reward: "Permen Super Ultra"
				}, {
					name: "Biskuit di El Scaro",
					req: "BAB 4: Raja Agung Darkan",
					npc: "Filecia",
					lv: "100",
					mats: "No",
					boss: "Biskuit Buatan Tangan",
					element: "Api",
					exp: "- Polos(100): 40.000\n- Kakao(130): 72.000\n- Choco(160): 155.000\n- Kopi(190): 300.000",
					reward: "Biskuit Felicia"
				}, {
					name: "Manisan Harus Cantik dan Hebat",
					req: "BAB 4: Raja Agung Darkan",
					npc: "Filecia",
					lv: "130",
					mats:"No",
					boss: "Mercy",
					element: "Air",
					exp: "- Polos(130): 72.000\n- Stoberi(160): 170.000\n- Pisang(190): 330.000\n- Dark(210): 400.000",
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

	case "hanami": 
		resu = {
			quest : [{
					name: "BAB 1 : Harapan Pohon Sakura.",
					req: "-",
					quest: "( *EASY* )Basmi Boss Colon, Gespent, & Anjing Hutan\n( *NORMAL* )Basmi Minotaur, Naga beringas Decel, Flare Volg\n( *HARD* )Basmi Forestia, Ganglef, Bos roga",
					boss: "Viscum ",
					element: "Gelap",
					exp: "- Easy : 1000, Normal : 7800, Hard : 3500",
					reward: "Permata Sakura 1, 10, 100"
	}, {
					name: "BAB 2 : Di Hutan Yozakura.",
					req: "Selesaikan Hanami BAB 1",
					quest: "( *EASY* )Basmi Viscum, Marchitar, Super Night Mushroom (lv. 60)\n( *NORMAL* )Basmi Viscum, Marchitar, Super Night Mushroom (lv. 80)\n( *HARD* )Basmi Viscum, Marchitar, Super Night Mushroom (lv. 100)",
					boss: "Cerabes",
					element: "Gelap",
					exp: "- Easy : 16.000, Normal : 52.000, Hard : 125.000",
					reward: "Permata Yozakura 1, 10, 100"
	}, {
					name: "BAB 3 : Tepi Perairan yang Mekar.",
					req: "Selesaikan Hanami BAB 2",
					quest:"Cari petunjuk dari Cersier, Tenert, sherry (Pilih npc yang bertuliskan menang)",
					boss: "Deniala",
					element: "Gelap",
					exp: "-",
					reward: "Kristal Bunga Sakura 1, 2, 3\nKristal Bunga Sakura 2, 3, 5\nKristal Bunga Sakura 3, 4\nKristal Bunga Sakura 4, 40, 300"
	}, {
					name: "BAB 4 : Gelutan Bayangan di Benteng Sakura",
					req: "Selesaikan Hanami BAB 3",
					quest:"Cari Kunci & Barang-barang, jangan sampai ketahuan penjaga",
					boss: "Mimesia",
					element: "Gelap",
					exp: "-",
					reward: "Piroksen Sakura 1, 10, 100"
	}, {
					name: "BAB 5 : Kejar-Kejaran di Dunia Sakura Malam",
					req: "Selesaikan Hanami BAB 4",
					quest:"Cari Monster yang kabur di Benteng Sakura Senja,  Kejar Cerabes, Hancurkan Semua Kristal\nKumpulkan Bahan:\nCairan Ungu Berpendar 20x(Zaman : Kuil Dewa Berkah)\nDarah Ular 5x (Ular Kolam : Reservoir Copia)\nAir Jernih 1x (Finpen : Mata Air Kelahiran)",
					boss: "Amalgam",
					element: "Gelap",
					exp: "-",
					reward: "Batu Merah Sakura Senja 1, 10, 100"
	}, {
					name: "BAB 6 : Sakura Malam dan Pedang Menari",
					req: "Selesaikan Hanami BAB 5",
					quest:"Selesaikan mini game pertahanan di air terjun pemabuk",
					boss: "Sakura Merah Jelita",
					element: "Gelap",
					exp: "-",
					reward: "Cawan Pemabuk 1, 10, 100"
	}, {
					name: "BAB 7 : Misi Penyelamatan Pohon Celesa",
					req: "Selesaikan Hanami BAB 6",
					quest:"Basmi Crysmort",
					boss: "Crysmort",
					element: "Gelap",
					exp: "-",
					reward: "Arak Sakura Mutu 1, 10, 100"
	}, {
					name: "BAB 8: Pesta Sakura dengan Binatang Buas",
					req: "Selesaikan Hanami BAB 8",
					quest: "Capai Puncak Gunung Sakuraten",
					boss: "Baavgai",
					element: "Bumi",
					exp: "",
					reward: "Emblem Prajurit Sakura 1, 10, 100"
	}, {
					name: "BAB 9: Sosok di BalikBunga Sakura Mekar",
					req: "Selesaikan Hanamji BAB 8",
					quest: "Kumpulkan Bahan:\n-Humus Gunung 10x\n-Daun Peri Sakura 10x\n-Getah Pohon Sakura 10x",
					boss: "Breeta",
					element: "Gelap",
					exp: "",
					reward: "\n*Diff 220:*\nurutan sebar bubuk benar 1 atau 2:\n-Batu Mentari Semi 1x\n-Bunga Raya Peri 1x\n urutan sebar bubuk benar 3:\n-Batu Mentari Semi 1x\n-Bunga Raya Peri 3x\n*Diff 240:*\nurutan sebar bubuk benar 1 atau 2:\n-Batu Mentari Semi 10x\n-Bunga Raya Peri 1x\n urutan sebar bubuk benar 3:\n-Batu Mentari Semi 10x\n-Bunga Raya Peri 3x\n*Diff 260:*\nurutan sebar bubuk benar 1 atau 2:\n-Batu Mentari Semi 100x\n-Bunga Raya Peri 1x\n urutan sebar bubuk benar 3:\n-Batu Mentari Semi 100x\n-Bunga Raya Peri 3x\n"
	}]
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

case "summer": 
case "sumer":
		resu = {
			quest : [{
					name: "BAB 1 : Berpacu di Dasar Laut.",
					req: "-",
					quest: "Basmi Adaro.",
					boss: "Adaro",
					element: "Air",
					exp: "-",
					reward: "Karang Dasar Laut 1"
	}, {
					name: "BAB 2 : Timbunan Manik Di Laut.",
					req: "Selesaikan BAB 1 : Berpacu di Dasar Laut.",
					quest: "Basmi Yuveria.",
					boss: "Yuveria",
					element: "Air",
					exp: "-",
					reward: "Batu Kristal Dasar Laut 10 & 3"
	}, {
					name: "BAB 3 : Makhluk Di Pantai Malam.",
					req: "Selesaikan BAB 2 : Timbunan Manik Di Laut.",
					quest:"Kumpulkan Bahan berikut:\n- Kerang Raksasa 30x (Paguro : Ngarai Dasar Laut)\n- Sungut Merah Muda Persik 30x (Amiya : Ngarai Dasar Laut)\n- Kristal Laut 10x (Seaclin : Reruntuhan Dasar Laut)",
					boss: "Falburrows",
					element: "Gelap",
					exp: "-",
					reward: "Memori musim panas 10 & 5"
	}]
		}
return resu
		break


	default:

	}
	
}

exports.event = event