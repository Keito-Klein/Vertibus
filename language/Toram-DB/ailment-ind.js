exports.ailment = () => {
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

- ${global.botName} -
`
}