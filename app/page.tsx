import Link from 'next/link'; // Jika ingin menggunakan navigasi Next.js

export default function HomePage() {
  return (
    <main>
      <h1>Halaman Utama</h1>

      {/* Kontainer untuk kedua tombol */}
      <div style={{ display: 'flex', gap: '10px' }}>
        
        {/* Tombol yang sudah ada: Pergi ke Halaman Admin */}
        <Link href="/daftar">
          <button style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Pergi ke Halaman Admin
          </button>
        </Link>
        
        {/* Tombol baru: Akun */}
        <Link href="/akun"> {/* Ganti '/akun' dengan path yang sesuai */}
          <button style={{
            backgroundColor: '#0070f3', // Warna biru, misalnya
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Akun
          </button>
        </Link>
        
      </div>
      
    </main>
  );
}