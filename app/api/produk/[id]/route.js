import connectDB from "@/lib/dbConnect";
import Produk from "@/models/product";

export async function GET(request, context) {
  const { id } = await context.params;   // ✅ HARUS pakai await

  await connectDB();

  const produk = await Produk.findById(id);

  if (!produk) {
    return Response.json({ message: "Produk tidak ditemukan" }, { status: 404 });
  }

  return Response.json(produk);
}
