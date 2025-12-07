// app/api/login/route.js

import dbConnect from '@/lib/dbConnect'; // Pastikan path ini benar
import User from '@/models/akun'; // Pastikan path ini benar (gunakan alias '@' jika sudah dikonfigurasi)
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

/**
 * Handler untuk permintaan POST (Login)
 * @param {Request} req Objek permintaan Next.js
 */
export async function POST(req) {
  try {
    // 1. Ambil data dari body permintaan
    const { username, password } = await req.json();
    console.log(`[API LOGIN] Mencoba login untuk: ${username}`);

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username dan Password wajib diisi.' },
        { status: 400 } // Bad Request
      );
    }

    // 2. Koneksi ke Database
    console.log('[API LOGIN] Memulai koneksi DB...');
    await dbConnect();
    console.log('[API LOGIN] Koneksi DB berhasil.');

    // 3. Cari User
    // Asumsi model User telah diatur untuk memilih password secara eksplisit.
    const user = await User.findOne({ username }).select('+password'); 
    
    if (!user) {
      console.log(`[API LOGIN] Gagal: Username ${username} tidak ditemukan.`);
      return NextResponse.json(
        { success: false, message: 'Username atau Password salah.' },
        { status: 401 } // Unauthorized
      );
    }

    // 4. Bandingkan Password
    console.log('[API LOGIN] Membandingkan password...');
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log('[API LOGIN] Gagal: Password tidak cocok.');
      return NextResponse.json(
        { success: false, message: 'Username atau Password salah.' },
        { status: 401 } // Unauthorized
      );
    }

    // 5. Sukses Login
    // Hapus password dari objek user sebelum dikirim
    const userObj = user.toObject({ getters: true });
    delete userObj.password;

    console.log(`[API LOGIN] Login sukses untuk: ${userObj.username}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Login berhasil!',
        user: {
          username: userObj.username,
          id: userObj._id.toString(),
        },
      },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error('--- KESALAHAN SERVER KRITIS (API LOGIN) ---');
    console.error('Error Detail:', error.message);
    console.error('Stack Trace:', error.stack);
    console.error('-------------------------------------------');

    // Penanganan Kesalahan Database
    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
      return NextResponse.json(
        { success: false, message: 'Layanan Database tidak tersedia.' },
        { status: 503 } // Service Unavailable
      );
    }

    return NextResponse.json(
      { success: false, message: 'Kesalahan Server Internal.' },
      { status: 500 } // Internal Server Error
    );
  }
}

// Opsional: Secara eksplisit menolak method lain
export function GET() {
  return NextResponse.json({ success: false, message: 'Method Not Allowed' }, { status: 405 });
}