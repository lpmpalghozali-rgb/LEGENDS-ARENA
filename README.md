# LEGENDS ARENA

**LEGENDS ARENA — Eternal Rift** adalah prototipe game MOBA 3D berbasis browser. Proyek ini saat ini dikemas sebagai aplikasi HTML mandiri yang memakai Three.js untuk rendering 3D dan beberapa library melalui CDN.

## Status proyek

Versi yang diunggah adalah **prototype playable lokal / single-player simulation**, bukan server multiplayer 5v5 online. Fitur seperti akun, matchmaking, server authoritative, sinkronisasi real-time antarpemain, penyimpanan progres, dan leaderboard online belum diimplementasikan.

## Fitur prototype

- Arena 3D bertema fantasi dengan kamera follow dan overview.
- Hero pemain Kael dengan HUD, level, HP, mana, XP, gold, dan KDA.
- Kontrol keyboard dan mouse untuk pergerakan serta pertarungan.
- Skill, basic attack, efek visual, projectile, dan audio sintetis.
- Minimap, lane, turret, minion, objective, shop, dan layar hasil pertandingan.
- Layout responsif untuk browser desktop dan perangkat mobile (kontrol dapat berbeda sesuai perangkat).

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

## Catatan pengembangan berikutnya

Untuk mengembangkan game menjadi MOBA online sesungguhnya, arsitektur lanjutan perlu mencakup:
1. Client modular berbasis TypeScript (misalnya Three.js + Vite).
2. Server game authoritative (misalnya Node.js + Colyseus).
3. Validasi aksi, simulasi pertandingan, dan sinkronisasi state di server.
4. Sistem akun dan penyimpanan progres dengan backend aman.
5. Matchmaking, reconnect, anti-cheat, telemetry, dan pengujian beban.

Dokumentasi status saat ini tersedia di [docs/PROJECT-STATUS.md](docs/PROJECT-STATUS.md).

## Lisensi

Belum ada lisensi open-source yang ditetapkan. Jangan menganggap kode atau aset pihak ketiga yang dimuat melalui CDN sebagai milik proyek ini; masing-masing tetap tunduk pada lisensinya.
