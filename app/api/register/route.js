// app/api/register/route.js

import { NextResponse } from 'next/server';
// Pastikan Path Alias '@/lib/dbConnect' dan '@/models/akun' sudah dikonfigurasi 
// atau ganti dengan path relatif yang benar (misalnya: '../../lib/dbConnect')
import dbConnect from '@/lib/dbConnect';
import User from '@/models/akun'; 

/**
 * Handler untuk permintaan POST (Pendaftaran/Register)
 * @param {Request} req Objek permintaan Next.js
 */
export async function POST(req) {
    try {
        // 1. Ambil data dari body permintaan menggunakan req.json()
        const { username, password } = await req.json();
        
        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: 'Username dan Password wajib diisi.' },
                { status: 400 } // Bad Request
            );
        }

        // 2. Panggil koneksi Mongoose
        await dbConnect();

        // 3. Cek apakah user sudah ada
        const userExists = await User.findOne({ username });
        if (userExists) {
            return NextResponse.json(
                { success: false, message: 'Username sudah digunakan.' },
                { status: 409 } // Conflict
            );
        }

        // 4. Buat User Baru (Middleware di User.js akan otomatis melakukan hashing)
        const newUser = await User.create({ username, password });
        
        // Hapus password dari objek yang akan dikirim kembali (meskipun sudah di-hash, ini adalah praktik baik)
        const userObj = newUser.toObject();
        delete userObj.password;

        // 5. Registrasi Sukses
        return NextResponse.json(
            { 
                success: true, 
                message: 'Registrasi Berhasil!',
                user: { username: userObj.username, id: userObj._id.toString() }
            },
            { status: 201 } // Created
        );

    } catch (error) {
        console.error("Kesalahan Server di /api/register:", error);
        
        // Tangani error validasi Mongoose (jika ada) atau error server internal lainnya
        return NextResponse.json(
            { success: false, message: 'Kesalahan Server Internal saat registrasi.' },
            { status: 500 } // Internal Server Error
        );
    }
}

// Opsional: Secara eksplisit menolak method selain POST
export function GET() {
  return NextResponse.json({ success: false, message: 'Method Not Allowed' }, { status: 405 });
}