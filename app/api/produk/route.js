import dbConnect from "@/lib/dbConnect";
import Produk from "@/models/product";

export async function GET() {
  try {
    console.log("1. Mencoba menghubungkan ke database...");
    await dbConnect();
    console.log("2. Koneksi database berhasil. Mencoba mencari produk...");

    const produk = await Produk.find({});
    console.log("3. Data produk berhasil diambil.");

    return Response.json({ success: true, data: produk });
  } catch (error) {
    console.error("!! ERROR DI API HANDLER /api/produk:", error);
    // Ini akan menghentikan hang dan memberikan status error 500
    return Response.json({ success: false, error: "Kesalahan server saat mengambil data" }, { status: 500 });
  }
}