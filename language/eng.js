const moment = require('moment-timezone');
date = moment().tz('Asia/Tokyo').format('dddd')
//dayName = date.toLocaleDateString("in-ID", {weekday: 'long'})

exports.menu = (prefix) => {
return `
❏ *${global.botName} Toram DB* ❏


 *${prefix}info*
 *${prefix}donasi*

❏ *Toram Online DB*
 │•${prefix}maintenance
 │•${prefix}blacksmith
 │•${prefix}leveling
 │•${prefix}farming
 │•${prefix}ailment
 │•${prefix}address
 │•${prefix}acronym
 │•${prefix}event
 │•${prefix}panah
 │•${prefix}boss
 │•${prefix}maze
 │•${prefix}watk
 │•${prefix}cdmg
 │•${prefix}food
 │•${prefix}mobs
 │•${prefix}bag
 │•${prefix}cb
 ╰•${prefix}mq

 ❏ *Media Menu*
 │•${prefix}sticker
 │•${prefix}smeme
 │•${prefix}toimg
 │•${prefix}remini
 │•${prefix}nhentai
 │•${prefix}tovideo
 │•${prefix}fb
 │•${prefix}ig
 │•${prefix}tiktok
 │•${prefix}ytmp3
 │•${prefix}ytmp4
 ╰•${prefix}play
 
❏ *Other Menu*
 │•${prefix}owner
 │•${prefix}menu
 │•${prefix}wallpaper
 │•${prefix}pixiv
 │•${prefix}pinterest
 │•${prefix}language
 │•${prefix}changelog
 │•${prefix}status
 │•${prefix}ocr
 │•${prefix}anime
 │•${prefix}neko
 │•${prefix}loli
 │•${prefix}milf
 │•${prefix}hidetag
 │•${prefix}translate
 │•${prefix}promote
 │•${prefix}report
 ╰•${prefix}donasi
 
💰 *Bantu donasi di :*

💳 dana : 083831853737
💳 GoPay : 083831853737
💳 ShopeePay : 083831853737
`
}

exports.changelog = () => {
	return `
	Changelog ${global.botName}
===== *16 - 07 - 2023* =====
- *Add Changelog at list*
- *Add OCR at list*
- *Add Report at list*
- *Fix smeme limit usage*
- pre-add fbdl(no resp)

===== *17 - 07 - 2023* =====
- *Add Toimg at list*
- *Add ailment at list*
- fix typo

===== *19 - 07 - 2023* =====
- *Add Hidetag at list*
- *Add Translate at list*
- *Add Promote at list*
- Re-write toggle Raid on/off

===== *22 - 07 - 2023* =====
- *Add Food at list*
- typo on MQ mats at eps 89
  (indo-languange)

===== *24 - 07 - 2023* =====
- *Add Welcome at list*
- restore banned bots

===== *12 - 08 - 2023* =====
- _*Change bot Number*_
- *Add Summer quest*

===== *13 - 08 - 2023* =====
- *Add Address at list*

===== *11 - 11 - 2023* =====
- *Add neko at list*
- *Add loli at ist*

===== *05 - 02 - 2024* =====
- *Add fbdl at list*
- *Add ig at list*
- *Add tiktok at list*
- *Add ytmp4 at list*
- *Add ytmp3 at list*
- *Custom Menu*

===== *25 - 02 - 2024* =====
- *Fix tovideo (url status code 429: too many request)*
- *Fix packname & author animated sticker*
- *Extend animated sticker duration*

===== *26 - 02 - 2024* =====
- Update quest Valentine

===== *29 - 02 - 2024* =====
- *Add remini at list*

===== *10 - 03 - 2024* =====
- *Add anime at list*
- *Add milf at list*
- *Add pixiv at list*

===== *11 - 03 - 2024* =====
- *Add pinterest at list*

===== *25 - 03 - 2024* =====
- Upgrade Server Specifications

===== *25 - 03 - 2024* =====
- fix Animated sticker Converter

===== *08 - 04 - 2024* =====
- Add Update broadcaster

===== *21 - 05 - 2024* =====
- fix closed conection to whatsapp

===== *28 - 05 - 2024* =====
- Add !acronym at list

===== *01 - 06 - 2024* =====
- Add !owner at list
- Change resolution of sticker(auto)

===== *04 - 06 - 2024* =====
- fix food exp(*!food*)
- give options sticker resolution

===== *21 - 06 - 2024* =====
- Improve bot perfomance

===== *28 - 06 - 2024* =====
- Add !play at list

===== *07 - 07 - 2024* =====
- Add Switch database mode

===== *08 - 07 - 2024* =====
- Add Switch Sticker converter function

===== *11 - 07 - 2024* =====
- Fix instagram downloader

===== *16 - 07 - 2024* =====
- Fix play
- Fix ytmp3
- Fix ytmp4

===== *27 - 07 - 2024* =====
- Add nhentai downloader at list
- Add bug
- Fix leveling

===== *28 - 07 - 2024* =====
- Add Consigmentboard Calculator

===== *29 - 07 - 2024* =====
- Fix play
- Fix ytmp3
- Fix ytmp4
- Fix levling
- Fix cb calculator
`
}

exports.update = (pushname) => {
return `
*New Update V. 3.8.49b*
Hi ${pushname}.
We have updated the bot version. For *Users* the following improvements are available: 

- \`cb\`
> cb can still be used even if the query does not exist.(Fixed)

- \`Leveling\`
> Previously the leveling feature could not be used because the bot got an \`\`\`error code 403\`\`\` caused by website/data source security starting to become tighter. we have also reduced some unnecessary data.

- \`play\`
- \`ytmp3\`
- \`ytmp4\`
Previously the leveling feature could not be used because the bot got an error code 403 due to the security of the website/data source which was getting tighter. we have fixed it by changing the data source. However, some videos/music may experience errors.

for questions please pm the owner by typing:
*!owner*
`
}

exports.arrow = () => {
 return `
*WATER Element*
*Arrow :* Ice Arrow
*Mob :* (BlackSmith)
*Lokasi :* NPC BlackSmith
*Stat :*\nBase ATK 17(20%)\nCritical Rate +2

*Arrow :* Aquamirror Arrow
*Mob :* (Quest) Researcher's Spirit lv. 78
*Lokasi :* Garden of Beginning
*Stat :*\nBase ATK 37(20%)\nCSPD +100

*Arrow :* Serein Arrow
*Mob :* Floragonet
*Lokasi :* Fractum Sector
*Stat :*\nBase ATK 84(20%)\nAbsolute Accuracy +1%\nTumble Unavailable

*Arrow :* Ocean Arrow
*Mob :* (BlackSmith) Summer Event
*Lokasi :* NPC BlackSmith
*Stat :*\nBase ATK 110(10%)\nMaxMP +200\nAMPR +1\n_Wind Resistance -3%_

*FIRE Element*
*Arrow :* Fire Arrow
*Mob :* (BlackSmith)
*Lokasi :* NPC BlackSmith
*Stat :*\nBase ATK 5(20%)

*Arrow :* Flame Arrow
*Mob :* Sunion
*Lokasi :* Dark Mirror
*Stat :*\nBase ATK 34(20%)\nMaxMP +100

*Arrow :* Love Arrow
*Mob :* (BlackSmith) Valentine Event
*Lokasi :* NPC BlackSmith
*Stat :*\nBase ATK 71(20%)\nCSPD +100

*Arrow :* Demon Empress Arrow
*Mob :* Venena MetaCoenubia
*Lokasi :* Ruins of Urban Elban
*Stat :*\nBase ATK 120(10%)\nAccuracy +15%\n_Aggro -15%_

*Arrow :* Blazing Tail Arrow
*Mob :* Tailgon
*Lokasi :* Tunnel of Trials
*Stat :*\nBase ATK 152(20%)\nFire Resistance +10%\nReduce DMG (Bowling) +20%

*WIND Element*
*Arrow :* Tempest Arrow
*Mob :* (BlackSmith)
*Lokasi :* NPC BlackSmith
*Stat :*\nBase ATK 15(20%)\nCritical Damage +1%

*Arrow :* Tempest Arrow
*Mob :* Forestia
*Lokasi :* Land of Chaos
*Stat :*\nBase ATK 15(20%)\nAccuracy +10%\nCritical Damage +1%

*Arrow :* Apple Arrow
*Mob :* Coryn
*Lokasi :* Dikkit Sector
*Stat :*\nBase ATK 92(15%)\n_Aggro -10%_

*Arrow :* Queen Bee Arrow
*Mob :* Mieli ( _Valentine Event_)
*Lokasi :* Rakau Plains
*Stat :*\nBase ATK 150(20%)\nAdditional Melee 10%\nWater Resistance +5%\nTumble Unavailable

*EEARTH Element*
*Arrow :* Pointed Ore Arrow
*Mob :* Cavern Rat
*Lokasi :* Singolare Ruins: 1st Floor
*Stat :*\nBase ATK 43(20%)\nDeff +50\nPhysical Resistance +3%\n_Accuracy -1%_

*Arrow :* Cacao Arrow
*Mob :* (BlackSmith) Valentine Event
*Lokasi :* NPC BlackSmith
*Stat :*\nBase ATK 50(20%)\nCritical Rate +3\n_Aggro -6%_

*Arrow :* Spiny Leaf Arrow
*Mob :* Ghilly ( _Valentine Event_ )
*Lokasi :* Sable Plains
*Stat :*\nBase ATK 110(20%)\nMaxHP +10%\nFractional Barrier +10%\nAggro +10%

*Arrow :* Guardian Forest Arrow
*Mob :* Arbogazella
*Lokasi :* Guardian Forest : Lost Woods
*Stat :*\nBase ATK 163(20%)\nAccuracy +50%\n_Aggro -25%_\n_Damage to Fire -10%_\n_Damage to Light -20%_

*LIGHT Element*
*Arrow :* Flash Volt
*Mob :* (Quest) Unforgettable Taste
*Lokasi :* NPC Juan (El Scaro)
*Stat :*\nBase ATK 3(15%)\nAccuracy +10\n_Damage to Light -50%_\n( _With Bowgun_ )\nCritical Rate +10

*Arrow :* Candy Arrow
*Mob :* (BlackSmith) Valentine Event
*Lokasi :* NPC BlackSmith
*Stat :*\nBase ATK 56(20%)\nMdef +10%\nMagic Resistance +10%


*Arrow :* Holy Tree Arrow
*Mob :* Santabby ( _Christmass Event_ )
*Lokasi :* Paviliun Tomte : Entrance
*Stat :*\nBase ATK 100(20%)\nAMPR +1\nDark Resistance +10%

*DARK Element*
*Arrow :* Twilight Arrow
*Mob :* Twilight Dragon
*Lokasi :* Fort Solfini : Roof
*Stat :*\nBase ATK 40(20%)\nAilment Resistance +5%\n_MaxHP 10%_

*Arrow :* Spiky Arrow
*Mob :* Ivy
*Lokasi :* Dark Dragon Shrine
*Stat :*\nBase ATK 79(20%)\nMagic Resistance +5%\nReduce MDG (Floor) +5%

*Arrow :* Twilight Sakura Arrow
*Mob :* Amalgam ( _Hanami Event_ )
*Lokasi :* Twilight Sakura Castle : Top
*Stat :*\nBase ATK 100(20%)\nLight Resistance +5%

*Arrow :* Specter Arrow
*Mob :* Manomare ( _Halloween Event_ )
*Lokasi :* Phasma Forest
*Stat :*\nBase ATK 120(20%)\nAdditional Magic 50%\nInvicible Aid (1 Second)

*Normal*
*Arrow :* Dreamy Arrow
*Mob :* Dreamy Scarlet Sakura ( _Hanami Event_ )
*Lokasi :* Lush Fails : Upstream
*Stat :*\nBase ATK 136(20%)\nDamage to Neutral +5%\nNatural HP Regen +10%\n_Aggro -20%_

`
}

exports.ailment = () => {
		return `
*1. Flinch* ❗
*to Enemy*
Usually interrupts the enemy for 1 second, has a 3 seconds cooldown with 2 seconds break-chance duration. Cooldown varies from enemies,skills and boss difficulty.
*to Player*
Interrupts you and makes you vulnerable for 1 second, cancelling any prompted movement similar to combos.

*2. Tumble* ☄
*to Enemy*
Usually interrupts the enemy for 3 seconds, has a 15 seconds cooldown with 4 seconds break-chance duration.Cooldown varies from enemies,skills and boss difficulty.
*to Player*
Interrupts you and makes you vulnerable for 3 seconds, cancelling any prompted movement similar to combos.

*3. Stun* 💫
*to Enemy*
Immobilize the enemy for 5 seconds, has a 25 seconds cool down with 6 seconds break-chance duration. Using this before tumble and flinch prolongs the break chance duration however flinch and tumble is resisted.Cooldown varies from enemies,skills and boss difficulty.
*to Player*
Immobilizes you for 5 seconds.

*4. Knock Back* ⏸
*to Enemy*
Different attacks has different ranges of knock back. (further investigation needed). The cooldown depends on the range of knock back distance.
*to Player*
Range of knock back depends on the type of the enemy and the skill used.

*5. Poison* ☠
*to Enemy*
Dealt a fractional dmg per interval depending on the target's hp and the player's INT and DEX (further mining is needed). Has a duration of 10 seconds. Able to re-inflict as the duration ended.
*to Player*
Inflicts a 5% current hp fractional dmg everytime you use a skill or auto attack. Lasts for 10 seconds. this damage cannot kill player.

*6. Paralysis* ⚡
*to Enemy*
Delays the enemy's attacks for 2 seconds (1sec for bosses). Has a duration of 10 seconds. Able to re-inflict as the duration ended.
*to Player*
Halves your current aspd, lasts for 10 seconds.

*7. Blind* 👁
*to Enemy*
Reduces the target's accuracy by 60%(20% to bosses). Has a duration of 10 seconds. Able to re-inflict as the duration ended.
*to Player*
If the player is inflicted with it, depending on the range they are in they have a accuracy penalty. If the player is 8m or farther they suffer a 40% penalty (hit * 0.600000023841858), if they are 7m or closer they suffer a 20% penalty (hit * 0.800000011920929). Lasts for 10 seconds.

*8. Ignition* 🔥
*to Enemy*
Dealt a fractional dmg per interval depending on the target's hp (further mining is needed). Has a duration of 10 seconds. Able to re-inflict as the duration ended.
*to Player*
Inflicts a 15% current hp fractional dmg every 3 seconds. Lasts for 10 seconds. this damage cannot kill player.

*9. Freeze* ❄
*to Enemy*
Increases the delay between attacks by 100% (50% for bosses), lasts for 10 seconds. Able to re-inflict as the duration ended.
*to Player*
Reduces motion speed by 50% it's applied after the base motion speed and gspwield. Lasts for 10 seconds.

*10. Armor Break* 🛡
*to Enemy*
Reduces the target's m/def by 50%, the total def is calculated from the parts first then armor break then mag/phy pierce is applied. Lasts for 5 seconds. Able to re-inflict as the duration ended.
*to Player*
Reduces your by physical and magical resistance by -50%.Lasts for 5 seconds. Able to re-inflict as the duration ended.

*11. Slow* 🕸
*to Enemy*
Reduces target's movement speed by 50%(25% for bosses), lasts for 10 seconds. Able to re-inflict as the duration ended.
*to Player*
Reduces movement speed by -50%, lasts for 10 seconds. Able to re-inflict as the duration ended.

*12. Stop* ⛔
*to Enemy*
Binds the enemy to it's current position for 10 seconds, has a 50 seconds cooldown. Less effective against bosses as it only reduces bosses' movement speed by 50% (it does not bind the bosses) , more effective with mobs and mini bosses. Attacks patterns such as linear dash or charging attacks can bypass stop.
*to Player*
Binds the player to it's current position. Using motion skills like charging slash can bypass stop.

*13. Fear* 👻
*to Enemy*
Has a 30% to cancel the target's attack (10% for bosses), lasts for 10 seconds.Able to re-inflict as the duration ended.
*to Player*
Has a 30% chance to cancel any kind of attack.

*14. Dizzy* 😵
*to Enemy*
Disables the enemy's both evasion rate and guard rate (halves guard/Eva rate for bosses).Able to re-inflict as the duration ended.
*to Player*
Halves evasion and guard rates, lasts 10 seconds. Able to re-inflict as the duration ended.

*15. Lethargy* 💪
*to Enemy*
Reduces dmg dealt by 30% (dmg * 0.699999988079071), lasts for 10 seconds. Able to re-inflict as the duration ended.
*to Player*
Reduces dmg dealt by 30%.

*16. Weaken* 📉
*to Enemy*
Reduces Target's mdef by 25%.
*to Player*
Increases original mp cost for skills by +100mp, lasts for 5 seconds. Able to re-inflict as the duration ended.

*17. Silence* 😐
Unable to cast Magic skill.

*18. Bleed* 🩸
Unable to cast Physcal skill.

*19. Fatigue* 🥵
*to Enemy/Player*
Halves current stability, all stability reduction is applied first then fatigue, last is graze.

*20. Dazzle* ☀
*to Enemy*
If the enemy is under this effect it doubles player's weapon Graze treshold, lasts for 10 seconds. Has a cooldown of 50 seconds.

*21. Mana explosion* 💥
*to Player*
Upon end duration, consume all mp remain to 0 and deal damge equal to current MPx10.

*22. Sleep* 💤
*to Enemy*
Incapacitate for a long time, awake upon taking attack, field boss restore 3% of max HP when awake.
*to Player*
Incapacitate for a long time, awake upon taking attack, enable natural regeneration.

*23. Sick* 💊
*to Player*
Lower aliment resistance by -50% (can get hit by it even if u have 100% aliment resistance).

*24. Curse* 🎭
*to Player*
Lower players CRT damage% by -50%.

*25. Item Disable* 🚫
*to Player*
Cannot use item

*26. Overide* ⏩
*to Player*
Consume HP when insufficient MP to perform skill, also apply tenacity to all skill in combo (not replace exist tag).

*27. Suction* 🌪
*to Enemy*
Pull to the center of attack, 50% pull chance for bosses.
*to Player*
Pull to the center of attack, disable evaion and guard for 1s when being hit.

*28. Petrified* ⬛
*to Player*
Absolutely dodge +100%, & Remove current aggro by 99%.

*29. Inversion* 🔁
*to Player*
Switch your current HP% and current MP%

- ${global.botName} -
`
}

exports.mq = () => {
	return `
	*List MQ material*

*Chapter 1*
*eps 8 : Purification incense*
_Item :_ Vine (3pcs)
_Mobs :_ Pain Leaf
_Map :_ Isthmus of Kaus

_Item :_ Thick Beak (3pcs)
_Mobs :_ Beak
_Map :_ Ruined Temple

_Item :_ Fairy Feather (3pcs)
_Mobs :_ Roar
_Map :_ Ruined Temple A3

*Chapter 2*
*eps 13 : Trial in the Palace*
_Item :_ SwordsMan Stone Coin (20pcs)
_Mobs :_ Sword Marionette
_Map :_ New Moon Palace

*Chapter 3*
*eps 18 : The Invisible... Enemy?*
_Item :_ Sand Mole Meat (1pcs)
_Mobs :_ Sand Mole
_Map :_ Centerio Highlands

_Item :_ Beast Claw (3pcs)
_Mobs :_ Foxiger
_Map :_ Centerio Highlands

_Item :_ Frog skin (5pcs)
_Mobs :_ Sand Frosch
_Map :_ Centerio Highlands

*eps 21 : Fate of the Fortress*
_Item :_ Jagged Fang (10pcs)
_Mobs :_ Miwi
_Map :_ Icule Lake

_Item :_ Saham Crystal (5pcs)
_Mobs :_ Rotta Nemico
_Map :_ Saham Underground Cave

_Item :_ Spiritual Gemstone
_Mobs :_ Cassy
_Map :_ Accient Empress

*Chapter 8*
*eps 62 : The Ruins of the Gods*
_Item :_ Rokoko Grape (5pcs)
_Mobs :_ Kijimu
_Map :_ Rokoko Plain

*Chapter 9*
*eps 13 : Front Line Base Operation*
_Item :_ Labilans Wood (10pcs)
_Mobs :_ Toretta
_Map :_ Labilans Sector : A1


*Chapter 11*
*eps 89 : The Strolling Forest*
_Item :_ Broken Horn (20pcs)
_Mobs :_ Rhinoceros
_Map :_ Fugitive Lake Swamp : A3


*Chapter 12*
*eps 102 : Ark Maintenance*
_Item :_ Growing Ore (5pcs)
_Mobs :_ pertaceras
_Map :_ Kabla Jabali

_Item :_ Jabali Stone (5pcs)
_Mobs :_ Gemare
_Map :_ Kabla Jabali
	`
}

exports.maze = (query) => {
query = query.toLowerCase()
	if (query == "drop") {
		switch(date) {

case "Saturday" :
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

break

case 'Sunday' :
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
break

case 'Monday' :
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
	break

case 'Tuesday' :
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
break

case 'Wednesday' :
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
	break

case 'Thursday' :
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
	break

case 'Friday' :
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
	break
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
}

exports.bs = () => {
	const db = JSON.parse(fs.readFileSync("./db/guide-data/bs-eng.json"));
		return `
*List Leveling BlackSmith*

*0 - 5*
*Craft:* ${db.five.craft} 
*Bahan:*
${db.five.mats}
*Location:*
${db.five.location}
*Mob:* 
${db.five.mob}

*5 - 10*
*Craft:* ${db.ten.craft}
*Bahan:*
${db.ten.mats}
*Location:*
${db.ten.location}
*Mob:* 
${db.ten.mob}

*10 - 50*
*Craft:* ${db.fifty.craft}
*Bahan:*
${db.fifty.mats}
*Location:*
${db.fifty.location}
*Mob:* 
${db.fifty.mob}

*50 - 90*
*Craft:* ${db.ninety.craft}
*Bahan:*
${db.ninety.mats}
*Location:*
${db.ninety.location}
*Mob:* 
${db.ninety.mob}

*90 - 120*
*Craft:* ${db.one_hundred_twenty.craft}
*Bahan:*
${db.one_hundred_twenty.mats}
*Location:*
${db.one_hundred_twenty.location}
*Mob:* 
${db.one_hundred_twenty.mob}

*120 - 140*
*Craft:* ${db.one_hundred_fourty.craft}
*Bahan:*
${db.one_hundred_fourty.mats}
*Location:*
${db.one_hundred_fourty.location}
*Mob:* 
${db.one_hundred_fourty.mob}

*140 - 170*
*Craft:* ${db.one_hundred_seventy.craft}
*Bahan:*
${db.one_hundred_seventy.mats}
*Location:*
${db.one_hundred_seventy.location}
*Mob:* 
${db.one_hundred_seventy.mob}

*170 - 200*
*Craft:* ${db.two_hundred.craft}
*Bahan:*
${db.two_hundred.mats}
*Location:*
${db.two_hundred.location}
*Mob:* 
${db.two_hundred.mob}

*200 - 250*
*Craft:* ${db.two_hundred_fifty.craft}
*Bahan:*
${db.two_hundred_fifty.mats}
*Location:*
${db.two_hundred_fifty.location}
*Mob:* 
${db.two_hundred_fifty.mob}

*250 - 260*
*Craft:* ${db.two_hundred_sixty.craft}
*Bahan:*
${db.two_hundred_sixty.mats}
*Location:*
${db.two_hundred_sixty.location}
*Mob:* 
${db.two_hundred_sixty.mob}
`
}

exports.donate = () => {
  return `
💰 *Donate me on :*
💲 Saweria : https://saweria.co/mikako
💳 dana : 083831853737
💳 GoPay : 083831853737
💳 ShopeePay : 083831853737
`
}

exports.eror = (err) => {
	return `sorry, I got an error with ${err}`
}

exports.success = () => {
	return 'Success...'
}

exports.unreg = (text) => {
	return `${text} is not on the guild buff list!!`
}

exports.bump = (text) => {
	return `${text} is already on the guild buff list!!`
}

exports.nonApikey = () => {
	return "Apikey is wrong\n\nPlease change the apikey on file key.json\n\nyou can made your apikey on website: https://beta.openai.com/account/api-keys"
}

exports.format = (prefix, command) => {
	// if(command == "lv" || command == "lvl" || command == "lvling" || command == "leveling") {
	// 	return `How to use?\n${prefix + command} level|bonus exp`
	// }
	// if(command == "push" || command == "add" || command == "change") {
	// 	return `How to use?\n${prefix + command} ign|buffland`
	// }
	// if (command == "cn") {
	// 	return `How to use?\n${prefix}${command} old ign|new ign`
	// }
	switch(command) {
		case 'lv':
          case 'lvl':
          case 'lvling' : 
          case 'leveling':
          	return `How to use?\n${prefix + command} level|bonus exp`
          break;


  		case 'ai':
  		case 'openai': 
  		case "img": 
  		case "ai-img": 
  		case "image": 
  		case "images":
  		case 'mobs':
		case 'boss':
		case 'monster':
		case 'language':
		case 'bahasa':
		case 'promote':
    case 'promote':
    case 'watk':
    case 'cdmg':
    case 'report':
    case 'hidetag':
        case 'pixiv':
        case 'pinterest':
  			return `Please input query!!\nExample: ${prefix + command} your query here`
  		break;

		  case 'ytdl':
			case 'ytmp3':
			case 'ytmp4':
			case 'ig':
			case 'tiktok':
			case 'fb':
				case 'fbdl':
				return `Please input a link/url!`
			break

  		case 'farm':
  		case 'farming':
  			return `What you want to farming?\n\n/metal\n/wood\n/beast\n/medicine\n/cloth\n/other _(Comming Soon)_`
  		break;

  		case 'event':
  			return `which event would you like to see??\n- valentine\n- christmas\n hanami\n- summer`
  		break;

  		case 'reminder':
  		case 'raid':
  		case 'welcome':
  			return `No Change\nquery = on/off`
  		break

  		case 'y':
        case 'yy':
  		return '403 - Forbidden'
  		break
  			}
}

exports.onGroup = () => {
	return `Group Only!`
}

exports.onGuild = () => {
	return `Can't use in this group!`
}

exports.onAdmin = () => {
	return `Admin Only!`
}

exports.botAdmin = () => {
	return 'Jadikan Bot sebagai Admin!'
}

exports.owner = () => {
  return 'Only owner!'
}

exports.head = (command, text = '') => {
  switch(command) {
  	case 'farm':
  	case 'farming':
  		return `*The following is a list farming spot of ${text} quests that I known:*\n`
  	break;

  	case 'logam':
  	case 'metal':
  	case 'kayu':
  	case 'wood':
  	case 'fauna':
  	case 'beast':
  	case 'obat':
  	case 'medic':
  	case 'medicine':
  	case 'kain':
  	case 'cloth':
  		return `*The following is a list farming spot of ${command} quests that I known:*\n`
  	break;

  	

  default:

  }
}

exports.quest = (command, text = '') => {
	switch(command) {
	case 'valentine':
		return `The following is a list of ${command} quests that I known:\n\n`
	break;

	case 'summer':
	case 'sumer':
		return `The following is a list of ${command} quests that I known:\n\n`
	break;

	case 'event':
		return `The following is a list of ${text} quests that I known:\n\n`
	break;
default: 

	}
}

exports.buff = (text = "") => {
	if (!text) {
		return `
LIST CODE FOOD BUFF TORAM ONLINE

STR
Lv 10 : 4016699 
Lv 10 : 7070777 
Lv 10 : 7031997 
Lv 10 : 3010095
Lv 10 : 2180000 (hard to access)
Lv 10 : 2010085
Lv 9 : 3010003
Lv 9 : 4010417
Lv 9 : Elscaro-A-1
Lv 8 : 1011201
Lv 5 : 6070013

 DEX 
Lv 10 : 2020222 
Lv 10 : 7011001 
Lv 10 : 7200002
Lv 10 : 1010058 
Lv 10 : 5010031
Lv 10 : 6010003 
Lv 10 : 5010092 
Lv 10 : 1234567 
Lv 9 : 1020001
Lv 9 : 6140110
Lv 9 : 1234567
Lv 7 : 7246969 
Lv 7 : 1010106 

 INT
Lv 10 : 7010018
Lv 10 : 6010701
Lv 10 : 6061294 
Lv 10 : 1018989 
Lv 10 : 1032222 
Lv 9 : 2020707 
Lv 9 : 3012000 
Lv 8 : 1010036
Lv 8 : 4269420 
Lv 8 : Elscaro-Z-1234

 AGI
Lv 10 : 3192311 
Lv 10 : 7162029 
Lv 9 : 7190001 
Lv 9 : 5130123 
Lv 9 : 3260777
Lv 8 : 4010228
Lv 8 : 5419191
Lv 8 : 1010050
Lv 8 : 3181227
Lv 8 : 3192311
Lv 7 : 4240021

VIT 
Lv 8 : 2020909 
Lv 8 : 1010050
Lv 4 : 1012144 

 CRIT RATE 
Lv 10 : 7162029
Lv 10 : 7057050
Lv 10 : 7010086 
Lv 10 : 5010098
Lv 10 : 5112709
Lv 10 : 3010048
Lv 10 : 1012000
Lv 10 : 1010006
Lv 10 : 1010092
Lv 10 : 1010017
Lv 10 : 1010050
Lv 10 : 1100000
Lv 10 : 1011010
Lv 10 : 1069927 
Lv 10 : 1037777
Lv 10 : 1100000 
Lv 9 : 6040107
Lv 9 : 3061206
Lv 9 : 3246969
Lv 9 : 7190311
Lv 9 : 31608822 (gacha aja)
Lv 8 : 1010038

 ACCURACY
Lv 10 : 1010013
Lv 9 : 1010013
Lv 9 : 7010077 
Lv 8 : 3188000

 WEAPON ATK
Lv 10 : 7010023
Lv 10 : 7086969
Lv 10 : 1067777
Lv 10 : 1010099 
Lv 10 : 1011126
Lv 10 : 6010024 
Lv 10 : 6100000
Lv 10 : 2020404 
Lv 10 : 2010136 
Lv 10 : 2010007
Lv 10 : 3132109 
Lv 10 : 1010029 
Lv 9 : 3070028
Lv 9 : 7162029
Lv 9 : 2221806

 AMPR
Lv 10 : 4040404
Lv 10 : 3063101
Lv 10 : 3062111
Lv 10 : 1011010
Lv 10 : 3062728 
Lv 10 : 5252525
Lv 10 : 1010017 
Lv 10 : 5010103
Lv 10 : 1010092 
Lv 10 : 2010068
Lv 10 : 3062728
Lv 10 : 1010006 
Lv 10 : 5240001 
Lv 10 : 4206969
Lv 10 : 1010050 
Lv 10 : 5010031
Lv 10 : 1019696 
Lv 10 : 3226325 
Lv 10 : 5010103 
Lv 9 : 1010001
Lv 9 : 1030002
Lv 9 : 1234321 (hard to access)
Lv 9 : 1023040 
Lv 9 : 5240202
Lv 8 : 1010058
Lv 8 : 2011111

 MAX MP
Lv 10 : 1111999
Lv 10 : 4011793
Lv 10 : 1011212
Lv 10 : 1027777
Lv 10 : 3113105
Lv 10 : 3010037
Lv 10 : 3010069
Lv 10 : 3204544
Lv 10 : 1100008
Lv 10 : 1010013
Lv 10 : 5010044
Lv 10 : 2010079
Lv 10 : 5010080
Lv 10 : 2010091
Lv 10 : 1016646 
Lv 10 : 1010216 
Lv 10 : 1010142
Lv 10 : 3080021 
Lv 10 : 6010021 
Lv 10 : 6052000 
Lv 10 : 7010047 
Lv 10 : 6070013 
Lv 8 : 4046666 
Lv 9 : 1010004
Lv 8 : 1059999
Lv 6 : 1010017

 MAX HP
Lv 10 : 1234567
Lv 10 : 3191130 
Lv 10 : 1010084
Lv 10 : 1180755 
Lv 10 : 3010058
Lv 10 : 3010006
Lv 10 : 1010032 
Lv 10 : 3011143
Lv 10 : 1010084 
Lv 10 : 3066969
Lv 10 : 1010101 
Lv 10 : 1011945 
Lv 10 : 1222002 
Lv 9 : 7121252
Lv 9 : 3011143 
Lv 9 : 3015555
Lv 9 : sofya-A-420
Lv 7 : 1260303
Lv 5 : 1250555

 -AGGRO 
Lv 10 : 1010038 
Lv 10 : 1016646
Lv 10 : 1010002 
Lv 10 : 6010009 
Lv 10 : 3010018
Lv 10 : sofya-A-2
Lv 9 : 2020808 
Lv 9 : 7190001 

 +AGGRO 
Lv 10 : 1264321 
Lv 10 : 6262000 
Lv 10 : 1010207
Lv 10 : 3204544 
Lv 10 : 3158668
Lv 10 : 3053131
Lv 10 : 1016646
Lv 9 : 3066969
Lv 9 : 2020606 
Lv 9 : 2010136 
Lv 9 : 1190069 
Lv 9 : 1014230
Lv 9 : 1013000 
Lv 7 : 3030110 
Lv 7 : 1012000

 DROP RATE 
Lv 6 : 4196969

 P.RESIST
Lv 10 : 1020001
Lv 10 : 7010014
Lv 10 : 3010034 
Lv 9 : 6010701 
Lv 9 : 4200069
Lv 9 : 1100000 
Lv 9 : 3011999 
Lv 8 : 1018989 

 M.RESIST
Lv 10 : 1010004 
Lv 10 : 2020505 
Lv 10 : 5246969
Lv 10 : 7010016 
Lv 10 : 7030023 
Lv 9 : 4080087
Lv 9 : 7227777
Lv 9 : 7222227
Lv 7 : 4010417

 P.DEFF

 M.DEFF
Lv 2  : 4040404

 FRACTIONAL BARRIER
Lv 10 : 7010082
Lv 8 : 1222002 
Lv 8 : 6181999 

 DTE EARTH 
Lv 9 : 3210103
Lv 8 : 1016646 
Lv 8 : 4083005
Lv 8 : 4046666 
Lv 8 : 2020202 
Lv 8 : 1010002 
Lv 8 : 6010003
Lv 8 : 2022222 
Lv 7 : 3011143 
Lv 7 : 2099876
Lv 7 : 1016646
Lv 7 : 1010142
Lv 7 : 1011111
Lv 6 : 7121252
Lv 6 : 7010005 
Lv 6 : 6010024
Lv 6 : 5419191

 DTE DARK
Lv 9 : 1010006 
Lv 9 : 3210104
Lv 9 : 5010092  
Lv 8 : 7010023
Lv 8 : 1016646 
Lv 8 : 6010003 
Lv 7 : 3030324
Lv 7 : 1190072
Lv 7 : 1010006

 DTE FIRE
Lv 9 : 3210106
Lv 8 : 7011001
Lv 7 : 1012610 
Lv 7 : 1010799 
Lv 6 : 2010091
Lv 2 : 1010101

 DTE WIND
Lv 9 : 3210101
Lv 8 : 3062111
Lv 8 : 3030303
Lv 7 : 1010055
Lv 7 : 7190001 
Lv 7 : 4099876
Lv 4 : 3030303 

 DTE WATER 
Lv 9 : 7120030
Lv 9 : 3210100
Lv 8 : 7011001 
Lv 8 : 3030777 
Lv 8 : 3062111 
Lv 8 : 2260006 
Lv 8 : 1110111
Lv 7 : 3226325 
Lv 7 : 3010018
Lv 6 : 2173179
Lv 4 : 1110007 

 DTE LIGHT 
Lv 9 : 3210106
Lv 9 : 1020345
Lv 8 : 1020345 
Lv 8 : 4046666 
Lv 8 : Rugio-Z-6
Lv 6 : 4016699 
Lv 6 : 7031000

 DTE NATURAL 
Lv 9 : 3210102
Lv 9 : 2010071
Lv 9 : 1019696
Lv 9 : 1016969
Lv 8 : 3010095
Lv 7 : 3099876
Lv 7 : 1011902 
Lv 6 : 6061294 
Lv 6 : 4206969 
Lv 6 : 1019696

Note: kalu ada yang salah atau ingin menyumbangkan Codenya. Tolong diisi dikolom komentar, nanti saya tambahkan kedalam list ini`
	}
	if (text) {
		switch(text) {
		case 'str':
			return`STR
Lv 10 : 4016699 
Lv 10 : 7070777 
Lv 10 : 7031997 
Lv 10 : 3010095
Lv 10 : 2180000 (hard to access)
Lv 10 : 2010085
Lv 9 : 3010003
Lv 9 : 4010417
Lv 9 : Elscaro-A-1
Lv 8 : 1011201
Lv 5 : 6070013
`
break

case 'dex': 
	return`
	DEX 
Lv 10 : 2020222 
Lv 10 : 7011001 
Lv 10 : 7200002
Lv 10 : 1010058 
Lv 10 : 5010031
Lv 10 : 6010003 
Lv 10 : 5010092 
Lv 10 : 1234567 
Lv 9 : 1020001
Lv 9 : 6140110
Lv 9 : 1234567
Lv 7 : 7246969 
Lv 7 : 1010106 
`
break

case 'int':
	return`
	INT
Lv 10 : 7010018
Lv 10 : 6010701
Iv 10 : 6061294 
Lv 10 : 1018989 
Lv 10 : 1032222 
Lv 9 : 2020707 
Lv 9 : 3012000 
Lv 8 : 1010036
Lv 8 : 4269420 
Lv 8 : Elscaro-Z-1234`
break

case 'agi':
	return`
	AGI
Lv 10 : 3192311 
Lv 10 : 7162029 
Lv 9 : 7190001 
Lv 9 : 5130123 
Lv 9 : 3260777
Lv 8 : 4010228
Lv 8 : 5419191
Lv 8 : 1010050
Lv 8 : 3181227
Lv 8 : 3192311
Lv 7 : 4240021`
break

case 'vit':
	return`
	VIT 
Lv 8 : 2020909 
Lv 8 : 1010050
Lv 4 : 1012144 `
	break

case 'crit':
case 'cr':
	return`
	CRIT RATE 
Lv 10 : 7162029
Lv 10 : 7057050
Lv 10 : 7010086 
Lv 10 : 5010098
Lv 10 : 5112709
Lv 10 : 3010048
Lv 10 : 1012000
Lv 10 : 1010006
Lv 10 : 1010092
Lv 10 : 1010017
Lv 10 : 1010050
Lv 10 : 1100000
Lv 10 : 1011010
Lv 10 : 1069927 
Lv 10 : 1037777
Lv 10 : 1100000 
Lv 9 : 6040107
Lv 9 : 3061206
Lv 9 : 3246969
Lv 9 : 7190311
Lv 9 : 31608822 (gacha aja)
Lv 8 : 1010038`
break

case 'accuracy':
	return`
	ACCURACY
Lv 10 :  1010013
Lv 9 : 1010013
Lv 9 : 7010077 
Lv 8 : 3188000
`
break

case 'watk':
case 'w.atk':
	return`
	WEAPON ATK
Lv 10 : 7010023
Lv 10 : 7086969
Lv 10 : 1067777
Lv 10 : 1010099 
Lv 10 : 1011126
Lv 10 : 6010024 
Lv 10 : 6100000
Lv 10 : 2020404 
Lv 10 : 2010136 
Lv 10 : 2010007
Lv 10 : 3132109 
Lv 10 : 1010029 
Lv 9 : 3070028
Lv 9 : 7162029
Lv 9 : 2221806`
	break

case 'ampr':
	return`
	AMPR
Lv 10 : 4040404
Lv 10 : 3063101
Lv 10 : 3062111
Lv 10 : 1011010
Lv 10 : 3062728 
Lv 10 : 5252525
Lv 10 : 1010017 
Lv 10 : 5010103
Lv 10 : 1010092 
Lv 10 : 2010068
Lv 10 : 3062728
Lv 10 : 1010006 
Lv 10 : 5240001 
Lv 10 : 4206969
Lv 10 : 1010050 
Lv 10 : 5010031
Lv 10 : 1019696 
Lv 10 : 3226325 
Lv 10 : 5010103 
Lv 9 : 1010001
Lv 9 : 1030002
Lv 9 : 1234321 (hard to access)
Lv 9 : 1023040 
Lv 9 : 5240202
Lv 8 : 1010058
Lv 8 : 2011111`
break

case 'max mp':
case 'maxmp':
case 'Mp':
	return`
	MAX MP
Lv 10 : 1111999
Lv 10 : 4011793
Lv 10 : 1011212
Lv 10 : 1027777
Lv 10 : 3113105
Lv 10 : 3010037
Lv 10 : 3010069
Lv 10 : 3204544
Lv 10 : 1100008
Lv 10 : 1010013
Lv 10 : 5010044
Lv 10 : 2010079
Lv 10 : 5010080
Lv 10 : 2010091
Lv 10 : 1016646 
Lv 10 : 1010216 
Lv 10 : 1010142
Lv 10 : 3080021 
Lv 10 : 6010021 
Lv 10 : 6052000 
Lv 10 : 7010047 
Lv 10 : 6070013 
Lv 8 : 4046666 
Lv 9 : 1010004
Lv 8 : 1059999
Lv 6 : 1010017`
break

case 'max hp':
case 'maxhp':
case 'HP':
	return`
	MAX HP
Lv 10 : 1234567
Lv 10 : 3191130 
Lv 10 : 1010084
Lv 10 : 1180755 
Lv 10 : 3010058
Lv 10 : 3010006
Lv 10 : 1010032 
Lv 10 : 3011143
Lv 10 : 1010084 
Lv 10 : 3066969
Lv 10 : 1010101 
Lv 10 : 1011945 
Lv 10 : 1222002 
Lv 9 : 7121252
Lv 9 : 3011143 
Lv 9 : 3015555
Lv 9 : sofya-A-420
Lv 7 : 1260303
Lv 5 : 1250555
`
	break

case '-aggro':
	return`
	-AGGRO 
Lv 10 : 1010038 
Lv 10 : 1016646
Lv 10 : 1010002 
Lv 10 : 6010009 
Lv 10 : 3010018
Lv 10 : sofya-A-2
Lv 9 : 2020808 
Lv 9 : 7190001 
`
break

case 'aggro':
	return`
	+AGGRO 
Lv 10 : 1264321 
Lv 10 : 6262000 
Lv 10 : 1010207
Lv 10 : 3204544 
Lv 10 : 3158668
Lv 10 : 3053131
Lv 10 : 1016646
Lv 9 : 3066969
Lv 9 : 2020606 
Lv 9 : 2010136 
Lv 9 : 1190069 
Lv 9 : 1014230
Lv 9 : 1013000 
Lv 7 : 3030110 
Lv 7 : 1012000
`
break

case 'drop rate':
return`
 DROP RATE 
Lv 6 : 4196969`
break

case 'p.ress':
case 'p.resist':
	return`
	P.RESIST
Lv 10 : 1020001
Lv 10 : 7010014
Lv 10 : 3010034 
Lv 9 : 6010701 
Lv 9 : 4200069
Lv 9 : 1100000 
Lv 9 : 3011999 
Lv 8 : 1018989 `
break

case 'm.ress':
case 'm.resist':
	return`
	M.RESIST
Lv 10 : 1010004 
Lv 10 : 2020505 
Lv 10 : 5246969
Lv 10 : 7010016 
Lv 10 : 7030023 
Lv 9 : 4080087
Lv 9 : 7227777
Lv 9 : 7222227
Lv 7 : 4010417`
break

case 'frac':
case 'fracc':
case 'fractional barrier':
	return`
	FRACTIONAL BARRIER
Lv 10 : 7010082
Lv 8 : 1222002 
Lv 8 : 6181999 `
break

case 'dte earth':
case 'dte bumi':
	return`
	DTE EARTH 
Lv 9 : 3210103
Lv 8 : 1016646 
Lv 8 : 4083005
Lv 8 : 4046666 
Lv 8 : 2020202 
Lv 8 : 1010002 
Lv 8 : 6010003
Lv 8 : 2022222 
Lv 7 : 3011143 
Lv 7 : 2099876
Lv 7 : 1016646
Lv 7 : 1010142
Lv 7 : 1011111
Lv 6 : 7121252
Lv 6 : 7010005 
Lv 6 : 6010024
Lv 6 : 5419191`
break

case 'dte wind':
case 'dte angin':
	return`
	DTE WIND
Lv 9 : 3210101
Lv 8 : 3062111
Lv 8 : 3030303
Lv 7 : 1010055
Lv 7 : 7190001 
Lv 7 : 4099876
Lv 4 : 3030303 `

case 'dte fire':
	case 'dte api':
		return`
		DTE FIRE
Lv 9 : 3210106
Lv 8 : 7011001
Lv 7 : 1012610 
Lv 7 : 1010799 
Lv 6 : 2010091
Lv 2 : 1010101`
break

case 'dte water':
case 'dte air':
	return`
	DTE WATER 
Lv 9 : 7120030
Lv 9 : 3210100
Lv 8 : 7011001 
Lv 8 : 3030777 
Lv 8 : 3062111 
Lv 8 : 2260006 
Lv 8 : 1110111
Lv 7 : 3226325 
Lv 7 : 3010018
Lv 6 : 2173179
Lv 4 : 1110007`
break

case 'dte dark':
case 'dte gelap':
	return`
	DTE DARK
Lv 9 : 1010006 
Lv 9 : 3210104
Lv 9 : 5010092  
Lv 8 : 7010023
Lv 8 : 1016646 
Lv 8 : 6010003 
Lv 7 : 3030324
Lv 7 : 1190072
Lv 7 : 1010006`
break

case 'dte light':
case 'dte cahaya':
	return`
	DTE LIGHT 
Lv 9 : 3210106
Lv 9 : 1020345
Lv 8 : 1020345 
Lv 8 : 4046666 
Lv 8 : Rugio-Z-6
Lv 6 : 4016699 
Lv 6 : 7031000`
break

case 'dte netral':
	case 'dte natural':
	case 'dte normal':
		return`
		DTE NATURAL 
Lv 9 : 3210102
Lv 9 : 2010071
Lv 9 : 1019696
Lv 9 : 1016969
Lv 8 : 3010095
Lv 7 : 3099876
Lv 7 : 1011902 
Lv 6 : 6061294 
Lv 6 : 4206969 
Lv 6 : 1019696`
break
		}

	}
} 

exports.bag = () => {
	return`Comming Soon!`
}