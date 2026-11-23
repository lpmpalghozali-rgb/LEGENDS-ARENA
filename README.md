# LEGENDS ARENA

**LEGENDS ARENA — Eternal Rift** adalah prototipe game MOBA 3D berbasis browser. Frontend statis memakai Three.js; fitur party online menggunakan Socket.IO dan komunikasi suara/video antarpemain memakai WebRTC.

## Status proyek

Versi saat ini memiliki **online party MVP**: room privat maksimal lima pemain, kode undangan, sinkronisasi posisi/rotasi avatar, dan signaling WebRTC untuk voice/video. Pertarungan, HP, skill, minion, turret, dan hasil pertandingan masih disimulasikan secara lokal di setiap browser; ini belum merupakan MOBA 5v5 dengan simulasi combat authoritative.

## Fitur prototype

- Arena 3D bertema fantasi dengan kamera follow dan overview.
- Hero pemain Kael dengan HUD, level, HP, mana, XP, gold, dan KDA.
- Kontrol keyboard dan mouse untuk pergerakan serta pertarungan.
- Skill, basic attack, efek visual, projectile, dan audio sintetis dengan pengaturan volume tersimpan.
- Minimap, lane, turret, minion, objective, shop, dan layar hasil pertandingan.
- Layout responsif untuk browser desktop dan perangkat mobile (kontrol dapat berbeda sesuai perangkat).
- Online party: buat/gabung room dengan kode, daftar pemain, dan sinkronisasi posisi avatar.
- Voice chat dan video chat WebRTC dengan izin mikrofon/kamera dari browser.

## Menjalankan game

### Cara cepat

Buka \`index.html\` di browser modern. Jika browser membatasi resource lokal, jalankan server HTTP lokal:

\`\`\`bash
python -m http.server 8000
\`\`\`

Lalu buka <http://localhost:8000>.

### Dengan Node.js

\`\`\`bash
npm install
npm run dev
\`\`\`

Buka alamat lokal yang ditampilkan Vite di terminal.

## Struktur proyek

\`\`\`text
LEGENDS-ARENA/
├── index.html          # Game prototype (HTML, CSS, dan JavaScript)
├── package.json        # Script development lokal
├── README.md           # Dokumentasi proyek
├── .gitignore          # File/folder yang tidak perlu di-commit
└── docs/
    └── PROJECT-STATUS.md
\`\`\`

## Teknologi

- HTML5, CSS3, JavaScript
- Three.js r128 (CDN)
- Tailwind CSS (CDN)
- Tone.js (CDN)
- Font Awesome (CDN)
- Google Fonts

Koneksi internet diperlukan ketika pertama kali memuat library dan font dari CDN.

## Batasan dan pekerjaan lanjutan

- Server room saat ini menyinkronkan kehadiran pemain dan posisi avatar, bukan state combat.
- Serangan, damage, HP, skill, minion, turret, boss, dan kemenangan belum disinkronkan secara authoritative.
- Room disimpan di memori server dan akan hilang saat server restart.
- Voice/video menggunakan koneksi peer-to-peer WebRTC; kualitas koneksi bergantung pada jaringan/NAT. Untuk jaringan yang ketat, produksi memerlukan TURN server.
- Belum ada akun, matchmaking otomatis, persistence, reconnect penuh, anti-cheat, atau leaderboard online.

Tahap berikutnya adalah memindahkan seluruh simulasi pertandingan ke server authoritative, menambahkan reconnect, TURN, autentikasi, dan pengujian beban.

Dokumentasi status saat ini tersedia di [docs/PROJECT-STATUS.md](docs/PROJECT-STATUS.md).

## Lisensi

Belum ada lisensi open-source yang ditetapkan. Jangan menganggap kode atau aset pihak ketiga yang dimuat melalui CDN sebagai milik proyek ini; masing-masing tetap tunduk pada lisensinya.
