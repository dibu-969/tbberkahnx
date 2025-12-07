import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AkunSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username wajib diisi."],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password wajib diisi."],
      minlength: [6, "Password minimal harus 6 karakter."],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// 🔐 PRE-SAVE: HASH PASSWORD
AkunSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.error("Kesalahan hashing password:", error);
    throw new Error("Gagal mengenkripsi password.");
  }
});

// ❗ WAJIB: DEFAULT EXPORT (Fix Error Vercel)
export default mongoose.models.Akun || mongoose.model("Akun", AkunSchema);
