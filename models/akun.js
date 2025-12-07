import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AkunSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username wajib diisi.'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password wajib diisi.'],
        // Menambahkan validasi minimum panjang
        minlength: [6, 'Password minimal harus 6 karakter.'], 
    },
    // 💡 Field Role (Role-Based Access Control)
    role: { 
        type: String,
        // enum: Memastikan nilai hanya salah satu dari daftar ini
        enum: ['user', 'admin'], 
        default: 'user', 
    },
}, { timestamps: true });

// --- Mongoose PRE-SAVE MIDDLEWARE (Untuk Hashing Password) ---
// PERBAIKAN: Hapus argumen 'next' dan jangan panggil next() di dalam fungsi async.
// models/akun.js

// ... (Import mongoose dan bcryptjs)

AkunSchema.pre('save', async function() { // Hapus argumen 'next'
    if (!this.isModified('password')) {
        return; // Menggantikan next()
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // Hapus next() di sini
        
    } catch (error) {
        // Hapus next(error), gunakan throw atau console.error
        console.error("Kesalahan hashing password:", error);
        throw new Error('Gagal mengenkripsi password.');
    }
});

// ... (Bagian export model di bawah)