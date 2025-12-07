// app/register/page.js

// Directive 'use client' sudah benar
'use client'; 

import Link from 'next/link';
// Import useRouter sudah benar untuk App Router
import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react';
import styles from './register.module.css'; 

export default function RegisterPage() {
  const router = useRouter(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Asumsi pesan ini akan terlihat sukses (Anda perlu class styles.successMessage di CSS)
        setMessage(`Pendaftaran Berhasil! Username: ${data.user.username}. Mengarahkan ke halaman Login...`);
        
        setTimeout(() => {
          router.push('/akun');
        }, 1500); 

      } else {
        // Asumsi pesan ini akan terlihat error (Anda perlu class styles.errorMessage di CSS)
        setMessage('Pendaftaran Gagal: ' + (data.message || 'Terjadi kesalahan.'));
      }
    } catch (error) {
      console.error('Error saat koneksi:', error);
      setMessage('Koneksi ke server gagal.');
    }
  };

  return (
    <div className={styles.container}> 
      <div className={styles.card}>
        <h1 className={styles.title}>Halaman Pendaftaran</h1>
        
        <form onSubmit={handleRegister} className={styles.form}>
          
          <div className={styles.inputGroup}>
            <label htmlFor="regUsername" className={styles.label}>Username</label>
            <input
              id="regUsername"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="Pilih Username"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="regPassword" className={styles.label}>Password</label>
            <input
              id="regPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Buat Password"
              required
            />
          </div>
          
          {/* Anda mungkin perlu menggunakan styles.successMessage atau styles.errorMessage untuk pesan */}
          {message && <p className={styles.message}>{message}</p>}

          <button type="submit" className={styles.loginButton}>
            Daftar
          </button>
        </form>

        <p className={styles.separator}>atau</p>

        {/* REVISI 1: Hapus elemen <a>, terapkan className langsung pada Link */}
        <Link href="/login" className={styles.registerButton}>
          Sudah Punya Akun? Login
        </Link>
        
        {/* REVISI 2: Hapus elemen <a>, terapkan className langsung pada Link */}
        <Link href="/" className={styles.backButton}>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}