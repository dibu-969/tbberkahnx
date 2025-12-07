// app/login/page.js

'use client'; 

import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './login.module.css'; 

export default function LoginPage() {
  const router = useRouter(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message || 'Login berhasil!'); 

        if (data.user) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
        }

        setTimeout(() => {
          router.push('/daftar'); 
        }, 1500);
      } else {
        setIsSuccess(false);
        setMessage('Login Gagal: ' + (data.message || 'Terjadi kesalahan tidak dikenal.'));
      }
    } catch (error) {
      console.error('Error:', error);
      setIsSuccess(false);
      setMessage('Koneksi ke server gagal. Periksa server atau jaringan Anda.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Halaman Login</h1>

        {message && (
          <p className={isSuccess ? styles.successMessage : styles.errorMessage}>
            {message}
          </p>
        )}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="Masukkan Username"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Masukkan Password"
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>Login</button>
        </form>

        <p className={styles.separator}>atau</p>

        {/* REVISI 1: Hapus elemen <a> pembungkus, terapkan className langsung pada Link */}
        <Link href="/register" className={styles.registerButton}>
            Daftar Akun Baru
        </Link>

        {/* REVISI 2: Hapus elemen <a> pembungkus, terapkan className langsung pada Link */}
        <Link href="/" className={styles.backButton}>
            Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}