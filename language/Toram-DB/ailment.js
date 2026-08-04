const ailment = (lang) => {
  if (lang === "eng") {
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
`;
  } else {
    return `
*1. Bergidik* ❗
*to Enemy*
Membuat musuh tidak dapat menggunakan skill selama 1 detik, memiliki jeda waktu (cooldown) 3 detik dengan durasi kesempatan break (break-chance) 2 detik. Jeda waktu (cooldown) bervariasi tergantung musuh, skill,dan kesulitan boss.
*to Player*
Membuat anda tidak dapat menggunakan skill dan rentan terhadap serangan musuh selama 1 detik, serta membatalkan combo yang sedang berjalan.

*2. Jatuh* ☄
*to Enemy*
Membuat musuh tidak dapat menggunakan skill selama 3 detik, memiliki jeda waktu (cooldown) 15 detik dengan durasi kesempatan break (break-chance) 4 detik. Jeda waktu (cooldown) bervariasi tergantung musuh, skill,dan kesulitan boss.
*to Player*
Membuat anda tidak dapat menggunakan skill dan rentan terhadap serangan musuh selama 3 detik, serta membatalkan combo yang sedang berjalan.

*3. Pingsan* 💫
*to Enemy*
Membuat musuh tidak dapat bergerak,lumpuh, menggunakan skill. selama 5 detik, memiliki jeda waktu (cooldown) 25 detik dengan durasi kesempatan break (break-chance) 6 detik. Menggunakan ini sebelum status bergidik (flinch) dan jatuh (tumble) akan memperpanjang durasi kesempatan break. Jeda waktu (cooldown) bervariasi tergantung musuh, skill,dan kesulitan boss.
*to Player*
Membuat anda tidak dapat bergerak,lumpuh, menggunakan skill dan rentan terhadap serangan musuh selama 5 detik, serta membatalkan combo yang sedang berjalan.

*4. Terpelanting* ⏸
*to Enemy*
Membuat musuh terpelanting kebelakang. Berbeda serangan (attkacks) beda juga jarak terpelantingnya. Jeda waktu (cooldown) tergantung pada jarak terpelanting.
(Dibutuhkan informasi lebih lanjut)
*to Player*
Jarak terpelanting tergantung pada jenis musuh dan skill yang digunakan.
(Dibutuhkan informasi lebih lanjut)

*5. Keracunan* ☠
*to Enemy*
Menghasilkan luka (damage) fraksional setiap interval waktu tertentu tergantung pada HP target dan INT dan DEX pemain.
(Dibutuhkan informasi lebih lanjut)
Memiliki durasi 10 detik.
*to Player*
Menyerap atau mengurangi 5% HP ketika menggunakan skill aktif maupun support skill, durasi 10 detik. Luka ini tidak membunuh Player.

*6. Lumpuh* ⚡
*to Enemy*
Menunda serangan musuh selama 2 detik (1 detik untuk boss). Memiliki durasi 10 detik. Dapat digunakan kembali setelah durasinya berakhir.
*to Player*
Mengurangi 50% ASPD (Attack Speed/Kecepatan Serangan), durasi 10 detik.

*7. Buta* 👁
*to Enemy*
Mengurangi hit target sebesar 60% (20% untuk boss). Memiliki durasi 10 detik. Dapat digunakan kembali setelah durasinya berakhir.
*to Player*
Jika pemain mendapatkan status tersebut, tergantung jarak antara pemain dengan musuh. Jika pemain 8m atau lebih mereka mendapatkan pinalti hit 40% (hit * 0,600000023841858), jika 7m kurang akan mendapatkan pinalti hit 20% (hit * 0,800000011920929). Mengurangi hit atau akurasi pemain, durasi 10 detik.

*8. Terbakar* 🔥
*to Enemy*
Menghasilkan luka (damage) fraksional setiap interval waktu tertentu tergantung pada HP target. Memiliki durasi 10 detik. Dapat digunakan kembali setelah durasinya berakhir.
*to Player*
Menyerap atau mengurangi 15% HP saat ini setiap 3 detik, durasi 10 detik.
Debuff Terbakar (Ignite) yang ada pada Skill Kairiki Ranshin pada Skill Samurai lv4 (Pengujian lebih lanjut diperlukan). Bisa disembuhkan dengan vaccine dan recorvery tapi tidak dapat disembuhkan dengan 100% resistensi status buruk (ailment resistance).
Terbakar (Ignite) pada peta Graben Membara. Status Buruk (Ailments) yang tidak dapat disembuhkan dengan Skill Recorvery dan Vaccine. Tapi masih bisa dicegah dengan menggunkan karakter 100% resistensi status buruk. Luka ini tidak membunuh Player.

*9. Beku* ❄
*to Enemy*
Meningkatkan penundaan serangan (attack) hingga 100% (50% untuk boss). Memiliki durasi 10 detik. Dapat digunakan kembali setelah durasinya berakhir.
*to Player*
Mengurangi 50% kecepatan gerak (moontion speed) dan Ayunan Dewa (Godspeed Wield) dari Skill Tombak lv4. Memiliki durasi 10 detik.

*10. Pecah Zirah* 🛡
*to Enemy*
Mengurangi M/DEF target sebesar 50%, total M/DEF dihitung dari bagian pertama Armor Break kemudian Penetrasi Sihir/Fisik (M/P Pierce) diterapkan. Memiliki durasi 5 detik. Dapat digunakan kembali setelah durasinya berakhir.
*to Player*
Mengurangi 50% kekebalan fisik dan sihir, durasi 5 detik.
Tidak dapat guard dan guard recharge terhenti.

*11. Lambat* 🕸
*to Enemy*
Mengurangi kecepatan gerakan target sebesar 50% (25% untuk boss). Memiliki durasi 10 detik. Dapat digunakan kembali setelah durasinya berakhir.
*to Player*
Menurunkan 50% kecepatan berjalan (movement speed), durasi 10 detik.
Tidak dapat evasion dan evasion recharge terhenti.

*12. Berhenti* ⛔
*to Enemy*
Mengikat musuh pada posisinya berdiri selama 10 detik, memiliki jeda waktu (cooldown) 50 detik. Kurang efektif melawan bos karena hanya mengurangi kecepatan gerakan boss hingga 50% (tidak mengikat boss), lebih efektif untuk normal monster dan mini boss. Pola serangan (attack) seperti lari secara linear dan rapalan dapat digunakan saat mendapatkan debuff berhenti.
*to Player*
Tidak dapat berpindah tempat atau berjalan, atau mengikat pemain pada posisi berdiri saat ini, durasi 10 detik Masih bisa menggunakan skil gerak (motion) dan rapalan seperti slash dapat digunakan saat mendapatkan debuff berhenti.
Tidak dapat evasion dan evasion recharge terhenti.

*13. Takut* 👻
*to Enemy*
30% peluang membatalkan serangan target (10% untuk boss). Memiliki durasi 10 detik. Dapat digunakan kembali setelah durasinya berakhir.
*to Player*
30% Peluang gagal dalam menggunakan skill atau serangan, durasi 10 detik.

*14. Pening* 😵
*to Enemy*
Mencegah penghindaran dan pertahanan (evasion dan guard rate), (50% untuk boss). Memiliki durasi 10 detik. Dapat digunakan kembali setelah durasinya berakhir.
*to Player*
Mengurangi 50% evasion dan guard rate, durasi 10 detik.

*15. Lesu* 💪
*to Enemy*
Mengurangi luka (damage) yang diberikan sebesar 30% (damage * 0,699999988079071). Memiliki durasi 10 detik. Dapat digunakan kembali setelah durasinya berakhir.
*to Player*
Mengurangi 30% luka (damage) kepada musuh, durasi 10 detik.

*16. Lemah* 📉
*to Enemy*
Mengurangi MDEF target sebesar 25%.
*to Player*
Menambah konsumsi MP Skill sebesar +100MP, durasi 5 detik.

*17. Bisu* 😐
Tidak dapat menggunakan skill sihir, durasi 5 detik.

*18. Berdarah* 🩸
Tidak dapat menggunakan skill fisik, durasi 5 detik.

*19. Lelah* 🥵
*to Enemy/Player*
Mengurangi stabilitas 50%, pada serangan durasi terakhir akan mengalami graze.
Kelelahan (Fatigue) pada peta Plastida, Pos Depan Plastida. dapat disembuhkan dengan vaccine dan skill recorvery.

*20. Silau* ☀
*to Enemy*
Jika musuh berada pada pengaruh ini, mendapatkan peluang tidak terjadinya graze 50%. Memiliki durasi 10 detik. Jeda waktu (cooldown) selama 50 detik.

*21. Ledakan Mana* 💥
*to Player*
Setelah durasi berakhir, konsumsi semua mp menjadi 0 dan memberikan damage sama dengan konsumsi mp x10.

*22. Tidur* 💤
*to Enemy*
Melumpuhkan untuk waktu yang lama, bangun saat menerima serangan, Bos memulihkan 3% dari HP maksimal saat bangun.
*to Player*
Melumpuhkan untuk waktu yang lama, bangun saat menerima serangan, mengaktifkan regenerasi alami.

*23. Sakit* 💊
*to Player*
Menurunkan resistensi status buruk sebesar -50% (masih dapat terkena bahkan jika Anda memiliki resistensi status buruk 100%).


*24. Terkutuk* 🎭
*to Player*
Menurunkan CRT damage pemain sebesar -50%.

*25. Item Disable* 🚫
*to Player*
Tidak dapat menggunakan item.

*26. Lari* ⏩
*to Player*
Mengkonsumsi HP saat MP tidak mencukupi untuk melakukan skill, juga menerapkan tenacity (Gigih) ke semua skill dalam kombo (tidak mengganti tag yang ada).

*27. Terhisap* 🌪
*to Enemy*
Menarik ke pusat serangan, 50% peluang tarik untuk Bos.
*to Player*
Menarik ke pusat serangan, saat terkena menonaktifkan evasion dan Guard selama 1 detik

*28. Kaku* ⬛
*to Player*
Menghindar Mutlak +100%, & menghapus aggro saat ini sebesar 99%

*29. Inversion* 🔁
*to Player*
Mengganti HP% dan MP% Anda saat ini

- *${global.botName}* -
`;
  }
};

export default ailment;
