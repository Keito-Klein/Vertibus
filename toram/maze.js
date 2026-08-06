const maze = (type, lang) => {
    const date = new Date().toLocaleDateString(global.timeZone, { weekday: 'long' });
    const query = type.toLowerCase()
    if(lang === "eng") {
        if (query == "drop") {
            switch(date) {
    
    case "Saturday" :
    case "Sabtu":
    return `
    Drop Guild Maze Saturday(Chocolatte chest)
    NB : High Gemstone
    
    *1. Colored Shard*
    *2. Gemstone :*
    - Beryl
    - Ruby
    - Topaz
    - Aquamarine
    - Onyx
    - Red Agate
    - Lapiz Lazuli
    - Sapphire
    - Tormarine
    - Emerald
    - Amethyst
    - Garnet
    - Rose Quartz
    - Zircon
    - Peridot
    - Citrine
    *3. Anti Degradation*
    (F1-600) Anti Degradation
    (F601-900) Anti Degradation Super
    (F901-1000) Anti Degradation Hyper
    *4. Reffinement Powder*
    (F1-600) Reffinement Powder
    (F601-900) Reffinement Powder Super
    (F901-1000) Reffinement Powder Hyper
    *5. Magic Hammer*
    (F1-600) Magic Hammer
    (F601-900) Magic Hammer Super
    (F901-1000) Magic Hammer Hyper
    *6. Tattered Catalog* (Rare)
    *7. Maze Gem* (Rare)
    *8. Skill Book* ((F601-1000) Rare)
    - Book of Darkness
    - Book of Dancer
    - Book of Magic Warrior
    - Book of Minstrel
    - Book of Unarmed
    - Book of Ninja
    `
    
    case 'Sunday' :
    case "Minggu":
    return `
    Drop Guild Maze Sunday(Light Green)
    NB : Gigh Ores Drops
    
    *1. Light Shard*
    *2. Gemstone :*
    - MoonStone
    - Sunstone
    - Pearl
    - Obsidian
    - Diamond
    *3. Ores :*
    - High-Purity Iron
    - High-Purity Damascus
    - High-Purity Mithril
    - High-Purity Orichalcum
    *4. Tattered Catalog* (Rare)
    *5. Maze Gem* (Rare)
    *6. Skill Books* ((F601-1000) Rare)
    - Book of Darkness
    - Book of Dancer
    - Book of Magic Warrior
    - Book of Minstrel
    - Book of Unarmed
    - Book of Ninja
    *7. Gender Switch Stone* (Super RARE)
    `
    
    case 'Monday' :
    case "Senin":
    return `
    Drop Guild Maze Monday(Purple)
    
    *1. Light Shard*
    *2. Colored Shard
    *3. Gemstone :*
    - Beryl
    - Ruby
    - Topaz
    - Aquamarine
    - Onyx
    - Red Agate
    - MoonStone
    *4. Anti Degradation*
    (F1-600) Anti Degradation
    (F601-900) Anti Degradation Super
    (F901-1000) Anti Degradation Hyper
    *5. Reffinement Powder*
    (F1-600) Reffinement Powder
    (F601-900) Reffinement Powder Super
    (F901-1000) Reffinement Powder Hyper
    *6. Magic Hammer*
    (F1-600) Magic Hammer
    (F601-900) Magic Hammer Super
    (F901-1000) Magic Hammer Hyper
    *7. Ores :*
    - High-Purity Iron
    - High-Purity Damascus
    - High-Purity Mithril
    - High-Purity Orichalcum
    *8. Tattered Catalog* (Rare)
    *9. Maze Gem* (Rare)
    *10. Hair Catalog* (Rare)
    `
    
    case 'Tuesday' :
    case "Selasa":
    return `
    Drop Guild Maze Tuesday(Red)
    
    *1. Light Shard*
    *2. Colored Shard
    *3. Gemstone :*
    - Beryl
    - Ruby
    - Topaz
    - Lapiz Lazuli
    - Sapphire
    - Tormarine
    - SunStone
    *4. Anti Degradation*
    (F1-600) Anti Degradation
    (F601-900) Anti Degradation Super
    (F901-1000) Anti Degradation Hyper
    *5. Reffinement Powder*
    (F1-600) Reffinement Powder
    (F601-900) Reffinement Powder Super
    (F901-1000) Reffinement Powder Hyper
    *6. Magic Hammer*
    (F1-600) Magic Hammer
    (F601-900) Magic Hammer Super
    (F901-1000) Magic Hammer Hyper
    *7. Ores :*
    - High-Purity Iron
    - High-Purity Damascus
    - High-Purity Mithril
    - High-Purity Orichalcum
    *8. Tattered Catalog* (Rare)
    *9. Maze Gem* (Rare)
    *10. Hair Catalog* (Rare)
    `

    case 'Wednesday' :
    case "Rabu":
        return `
    Drop Guild Maze Wednesday(Blue)
    
    *1. Light Shard*
    *2. Colored Shard
    *3. Gemstone :*
    - Lapiz Lazuli
    - Sapphire
    - Tormarine
    - Emerald
    - Amethyst
    - Garnet
    - Pearl
    *4. Anti Degradation*
    (F1-600) Anti Degradation
    (F601-900) Anti Degradation Super
    (F901-1000) Anti Degradation Hyper
    *5. Reffinement Powder*
    (F1-600) Reffinement Powder
    (F601-900) Reffinement Powder Super
    (F901-1000) Reffinement Powder Hyper
    *6. Magic Hammer*
    (F1-600) Magic Hammer
    (F601-900) Magic Hammer Super
    (F901-1000) Magic Hammer Hyper
    *7. Ores :*
    - High-Purity Iron
    - High-Purity Damascus
    - High-Purity Mithril
    - High-Purity Orichalcum
    *8. Tattered Catalog* (Rare)
    *9. Face Catalog* (Rare)
    *10. Hair Catalog* (Rare)
    `
    
    case 'Thursday' :
    case "Kamis":
        return `
    Drop Guild Maze Thursday(Green)
    
    *1. Light Shard*
    *2. Colored Shard
    *3. Gemstone :*
    - Emerald
    - Amethyst
    - Garnet
    - Rose Quartz
    - Zircon
    - Peridot
    - Obsidian
    *4. Anti Degradation*
    (F1-600) Anti Degradation
    (F601-900) Anti Degradation Super
    (F901-1000) Anti Degradation Hyper
    *5. Reffinement Powder*
    (F1-600) Reffinement Powder
    (F601-900) Reffinement Powder Super
    (F901-1000) Reffinement Powder Hyper
    *6. Magic Hammer*
    (F1-600) Magic Hammer
    (F601-900) Magic Hammer Super
    (F901-1000) Magic Hammer Hyper
    *7. Ores :*
    - High-Purity Iron
    - High-Purity Damascus
    - High-Purity Mithril
    - High-Purity Orichalcum
    *8. Tattered Catalog* (Rare)
    *9. Face Catalog* (Rare)
    *10. Hair Catalog* (Rare)
    `
    
    case 'Friday' :
    case "Jumat":
        return `
    Drop Guild Maze Friday(Light Purple)
    
    *1. Light Shard*
    *2. Colored Shard
    *3. Gemstone :*
    - Aquamarine
    - Onyx
    - Rose Quartz
    - Zircon
    - Peridot
    - Diamond
    - Citrine
    *4. Anti Degradation*
    (F1-600) Anti Degradation
    (F601-900) Anti Degradation Super
    (F901-1000) Anti Degradation Hyper
    *5. Reffinement Powder*
    (F1-600) Reffinement Powder
    (F601-900) Reffinement Powder Super
    (F901-1000) Reffinement Powder Hyper
    *6. Magic Hammer*
    (F1-600) Magic Hammer
    (F601-900) Magic Hammer Super
    (F901-1000) Magic Hammer Hyper
    *7. Ores :*
    - High-Purity Iron
    - High-Purity Damascus
    - High-Purity Mithril
    - High-Purity Orichalcum
    *8. Tattered Catalog* (Rare)
    *9. Eye Catalog* (Rare)
    *10. Hair Catalog* (Rare)
    `
    
            }
        } else if (query == "guide") {
    return `
    Guild Maze is a dungeon-like place from which you have to find a way out. There are also monsters that will block your way while looking for chests of tangs located randomly somewhere. there is also a hidden trap as for the details about the trap:
    *1. explosion Trap*
    - damage : 40% of HP
    - effect : -
    *2. Rockfall Trap*
    - damage : 20% of HP
    - effect : Reduce MaxHP by 10
    *3. Needle Trap*
    - damage : 20% of HP
    - effect : Reduce MaxHP by 10
    *4. Jump Trap*
    - damage : -
    - effect : Attract Enemies
    The monsters in the Maze would weaken as the month's date changed. Monsters will be very strong at the beginning of the month and will be very weak at the end of the month. There is also no need to kill all mobs in the maze.
    You can ignore the chest and head to floor 600 to get a special item in the chest. Chests will also be boosted on the 3rd week of the month. The chest will change color based on the day (type "/maze drop" for details).
    You can play with party members (NPC/Mercenaries not included) and don't worry if one of the party members dies/knocks. they can still open the chest & show the way to the next floor.
    
    that's all the Guild Maze guide that I can explain. Good luck.
    - ${global.botName} -
    `
    
        } else if (query == "build") {
            return `
    To play Guild Maze, it is recommended to use a level 1 char with the Bowgun job(Those who have T5 skill) or use Bow. Fill in the status is Full DEX/(DEX/AGI) to add aspd
    
     Build Skill :
    Crosfire lvl 10
    Twin Storm(for bowgun) lvl 10
    mp charge lvl 1 (optional. u can use ampr)
    Shukuchi lvl 1
    for equipment it is recommended to use eq which has MaxHP & MaxMP
    `
        } else {
            return console.log("enter the query !\cexample : /maze guide\n/maze build\n/maze drop")
        }
    } else {
        if (query == "drop") {
		console.log(date)
			switch(date) {

	case "Saturday" :
    case "Sabtu" :
	return `
	Drop Guild Maze hari Sabtu(Peti Cokelat)
	NB : Drop Gemstone Tinggi
	
	*1. Kaca Mosaik*
	*2. Gemstone :*
	- Beril
	- Ruby
	- Topaz
	- Aquamarine
	- Onyx
	- Akik Merah
	- Lapiz Lazuli
	- Sapphire
	- Tourmaline
	- Emerald
	- Amethyst
	- Garnet
	- Rose Quartz
	- Zircon
	- Peridot
	- Citrine
	*3. Anti-Degradasi*
	(F1-600) Anti-Degradasi
	(F601-900) Anti-Degradasi Super
	(F901-1000) Anti-Degradasi Hiper
	*4. Bubuk Tempa*
	(F1-600) Bubuk Tempa
	(F601-900) Bubuk Tempa Super
	(F901-1000) Bubuk Tempa Hiper
	*5. Palu Ajaib*
	(F1-600) Palu Ajaib
	(F601-900) Palu Ajaib Super
	(F901-1000) Palu Ajaib Hiper
	*6. Katalog Sobek* (Rare)
	*7. Permata Labirin* (Rare)
	*8. Buku Skill* ((F601-1000) Rare)
	- Buku Kegelapan
	- Buku Penari
	- Buku Ksatria Sihir
	- Buku Minstrel
	- Buku Tangan Kosong
	- Buku Ninja
	`
	
	case 'Sunday' :
    case "Minggu" :
	return `
	Drop Guild Maze hari Minggu(Hijau Muda)
	NB : Drop Bijih Tinggi
	
	*1. Kachaya*
	*2. Gemstone :*
	- MoonStone
	- Sunstone
	- Mutiara 
	- Kaca Vulkanik
	- Berlian
	*3. Bijih :*
	- Besi Murni
	- Damaskus Murni
	- Mithril Murni
	- Orichalcum Murni
	*4. Katalog Sobek* (Rare)
	*5. Permata Labirin* (Rare)
	*6. Buku Skill* ((F601-1000) Rare)
	- Buku Kegelapan
	- Buku Penari
	- Buku Ksatria Sihir
	- Buku Minstrel
	- Buku Tangan Kosong
	- Buku Ninja
	*7. Batu Ganti Jenis Kelamin* (Super RARE)
	`
	
	case 'Monday' :
    case "Senin" :
	return `
	Drop Guild Maze hari Senin(Ungu)
	
	*1. Kachaya*
	*2. Kaca Mosaik
	*3. Gemstone :*
	- Beryl
	- Ruby
	- Topaz
	- Aquamarine
	- Onyx
	- Akik Merah
	- MoonStone
	*4. Anti-Degradasi*
	(F1-600) Anti-Degradasi
	(F601-900) Anti-Degradasi Super
	(F901-1000) Anti-Degradasi Hiper
	*5. Bubuk Tempa*
	(F1-600) Bubuk Tempa
	(F601-900) Bubuk Tempa Super
	(F901-1000) Bubuk Tempa Hiper
	*6. Palu Ajaib*
	(F1-600) Palu Ajaib
	(F601-900) Palu Ajaib Super
	(F901-1000) Pali Ajaib Hiper
	*7. Bijih :*
	- Besi Murni
	- Damaskus Murni
	- Mithril Murni
	- Orichalcum Murni
	*8. Katalog Sobek* (Rare)
	*9. Permata Labirin* (Rare)
	*10. Katalog Rambut* (Rare)
	`
	
	case 'Tuesday' :
    case "Selasa" :
	return `
	Drop Guild Maze hari Selasa(Merah)
	
	*1. Kachaya*
	*2. Kaca Mosaik
	*3. Gemstone :*
	- Beryl
	- Ruby
	- Topaz
	- Lapiz Lazuli
	- Sapphire
	- Tourmaline
	- SunStone
	*4. Anti-Degradasi*
	(F1-600) Anti-Degradasi
	(F601-900) Anti-Degradasi Super
	(F901-1000) Anti-Degradasi Hiper
	*5. Bubuk Tempa*
	(F1-600) Bubuk Tempa
	(F601-900) Bubuk Tempa Super
	(F901-1000) Bubuk Tempa Hiper
	*6. Palu Ajaib*
	(F1-600) Palu Ajaib
	(F601-900) Palu Ajaib Super
	(F901-1000) Pali Ajaib Hiper
	*7. Bijih :*
	- Besi Murni
	- Damaskus Murni
	- Mithril Murni
	- Orichalcum Murni
	*8. Katalog Sobek* (Rare)
	*9. Permata Labirin* (Rare)
	*10. Katalog Rambut* (Rare)
	`

	
	case 'Wednesday' :
    case "Rabu" :
		return `
	Drop Guild Maze hari Rabu(Biru)
	
	*1. Kachaya*
	*2. Kaca Mosaik
	*3. Gemstone :*
	- Lapiz Lazuli
	- Sapphire
	- Tourmaline
	- Emerald
	- Amethyst
	- Garnet
	- Mutiara
	*4. Anti-Degradasi*
	(F1-600) Anti-Degradasi
	(F601-900) Anti-Degradasi Super
	(F901-1000) Anti-Degradasi Hiper
	*5. Bubuk Tempa*
	(F1-600) Bubuk Tempa
	(F601-900) Bubuk Tempa Super
	(F901-1000) Bubuk Tempa Hiper
	*6. Palu Ajaib*
	(F1-600) Palu Ajaib
	(F601-900) Palu Ajaib Super
	(F901-1000) Pali Ajaib Hiper
	*7. Bijih :*
	- Besi Murni
	- Damaskus Murni
	- Mithril Murni
	- Orichalcum Murni
	*8. Katalog Sobek* (Rare)
	*9. Katalog Wajah* (Rare)
	*10. Katalog Rambut* (Rare)
	`
	
	case 'Thursday' :
    case "Kamis" :
		return `
	Drop Guild Maze hari Kamis(Hijau)
	
	*1. Kachaya*
	*2. Kaca Mosaik
	*3. Gemstone :*
	- Emerald
	- Amethyst
	- Garnet
	- Rose Quartz
	- Zircon
	- Peridot
	- Kaca Vulkanik
	*4. Anti-Degradasi*
	(F1-600) Anti-Degradasi
	(F601-900) Anti-Degradasi Super
	(F901-1000) Anti-Degradasi Hiper
	*5. Bubuk Tempa*
	(F1-600) Bubuk Tempa
	(F601-900) Bubuk Tempa Super
	(F901-1000) Bubuk Tempa Hiper
	*6. Palu Ajaib*
	(F1-600) Palu Ajaib
	(F601-900) Palu Ajaib Super
	(F901-1000) Pali Ajaib Hiper
	*7. Bijih :*
	- Besi Murni
	- Damaskus Murni
	- Mithril Murni
	- Orichalcum Murni
	*8. Katalog Sobek* (Rare)
	*9. Katalog Wajah* (Rare)
	*10. Katalog Rambut* (Rare)
	`
	
	case 'Friday' :
    case "Jumat":
		return `
	Drop Guild Maze hari Jum'at(Ungu Muda)
	
	*1. Kachaya*
	*2. Kaca Mosaik
	*3. Gemstone :*
	- Aquamarine
	- Onyx
	- Rose Quartz
	- Zircon
	- Peridot
	- Berlian
	- Citrine
	*4. Anti-Degradasi*
	(F1-600) Anti-Degradasi
	(F601-900) Anti-Degradasi Super
	(F901-1000) Anti-Degradasi Hiper
	*5. Bubuk Tempa*
	(F1-600) Bubuk Tempa
	(F601-900) Bubuk Tempa Super
	(F901-1000) Bubuk Tempa Hiper
	*6. Palu Ajaib*
	(F1-600) Palu Ajaib
	(F601-900) Palu Ajaib Super
	(F901-1000) Pali Ajaib Hiper
	*7. Bijih :*
	- Besi Murni
	- Damaskus Murni
	- Mithril Murni
	- Orichalcum Murni
	*8. Katalog Sobek* (Rare)
	*9. Katalog Mata* (Rare)
	*10. Katalog Rambut* (Rare)
	`

			}
		} else if (query == "guide") {
	return `
	Guild Maze/Labirin serikat adalah sebuah tempat seperti dungeon dimana kamu harus mencari jalan untuk keluar. Disana juga terdapat monster yang akan menghalangi jalanmu sambil mencari peti tang terletak secara acak di suatu tempat. disana juga terdapat jebakan yang di sembunyikan adapun detail tentang jebakan tersebut :
	*1. Jebakan Bom*
	- damage : 40% HP
	- efek : -
	*2. Reruntuhan Batu*
	- damage : 20% HP
	- efek : Mengurangi 10 MaxHP
	*3. Jebakan Jarum*
	- damage : 20% HP
	- efek : Mengurangi 10 MaxHP
	*4. Jebakan Loncat*
	- damage : -
	- efek : Menarik perhatian musuh
	Monster di dalam labirin akan melemah seiring bergantinya tanggal dalam sebulan. Monster akan sangat kuat di awal bulan dan akan sangat lemah di akhir bulan. Kamu dapat mengabaikan Monster di labirin/tidak harus membunuh semuanya.
	Kamu dapat mengabaikan peti dan menuju lantai 600 untuk mendapatkan item spesial di dalam peti. Peti juga akan di boost di Minggu ke 3 dalam 1 bulan. Peti akan berganti warna sesuai hari (ketik "/maze drop" untuk selengkapnya).
	Kamu dapat bermain dengan anggota party(NPC/Bodyguard tidak termasuk) dan jangan khawatir jika salah satu anggota party mati/knock. mereka tetap bisa membuka peti & menunjukan jalan ke lantai berikutnya.
	
	itu saja guide Guild Maze yang bisa saya jelaskan. Semoga Beruntung.
	- Vertibus -
	`
	
		} else if (query == "build") {
			return `
	Untuk memainkan Guild Maze di rekomendasikan menggunakan char level 1 dengan job Bowgun(untuk yang sudah T5 skill) atau job Bow. Status yang di isi adalah Full DEX/(DEX/AGI) untuk menambah aspd
	
	 build skillnya :
	Crosfire/Tembakan silang lvl 10
	twin storm/badai kembar(untuk bowgun) lvl 10
	mp charge lvl 1 (optional. bisa menggunakan ampr)
	Shukuchi lvl 1
	untuk equipment di sarankan menggunakan eq yang ada MaxHP & MaxMP nya
	`
		} else {
			return console.log("masukan query !\contoh : /maze guide\n/maze build\n/maze drop")
		}
    }
}

export default maze;