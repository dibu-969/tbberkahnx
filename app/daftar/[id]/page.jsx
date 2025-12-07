export const dynamic = "force-dynamic";

import styles from './detail.module.css';

export default async function DetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/produk/${id}`, {
    cache: "no-store"
  });

  const data = await res.json();

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(data.harga || 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Detail Produk: {data.nama}
      </h1>

      <div className={styles.contentWrapper}>
        {data.image_url && (
          <div className={styles.imageContainer}>
            <img 
              src={data.image_url} 
              width={350} 
              alt={data.nama} 
              className={styles.productImage} 
            />
          </div>
        )}

        <div className={styles.priceBox}>
          <h2 className={styles.priceTitle}>Harga</h2>
          <p className={styles.priceValue}>{formattedPrice}</p>
        </div>
      </div>
    </div>
  );
}
