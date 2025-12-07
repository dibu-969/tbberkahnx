"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ProdukPage.module.css";

export default function ProdukPage() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await fetch("/api/produk", { cache: "no-store" });
        const json = await res.json();
        setProduk(json.data || []);
      } catch (err) {
        console.error("Gagal memuat produk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, []);

  // KLIK PRODUK → Pindah ke /daftar/[id]
  const handleItemClick = (id) => {
    router.push(`/daftar/${id}`);
  };

  if (loading) return <p className={styles.loading}>Memuat data produk...</p>;

  return (
    <div className={styles.container}>
      <h1>Daftar Produk</h1>

      {produk.length === 0 ? (
        <p>Tidak ada produk.</p>
      ) : (
        <ul className={styles.list}>
          {produk.map((item) => (
            <li
              key={item._id}
              className={styles.item}
              onClick={() => handleItemClick(item._id)}
              style={{ cursor: "pointer" }}
            >
              <b>{item.nama}</b> — Rp {item.Harga}
              {item.image_url && (
                <div>
                  <img
                    src={item.image_url}
                    alt={item.nama}
                    className={styles.image}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
