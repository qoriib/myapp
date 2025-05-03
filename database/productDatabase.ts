import * as SQLite from "expo-sqlite";

export interface IProduct {
  id?: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  image: string;
}

const db = SQLite.openDatabaseSync("product-database.db");

export const createProductTable = async () => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      shortDescription TEXT,
      longDescription TEXT,
      price TEXT,
      image TEXT
    );`
  );

  const existing = await getAllProducts();
  if (existing.length === 0) {
    await seedInitialProducts();
  }
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  const allRows: IProduct[] = await db.getAllAsync(
    "SELECT * FROM products ORDER BY id DESC"
  );
  return allRows;
};

export const getProductById = async (id: number): Promise<IProduct | null> => {
  const product: IProduct | null = await db.getFirstAsync(
    "SELECT * FROM products WHERE id = ?",
    [id]
  );
  return product;
};

export const insertProduct = async ({
  name,
  shortDescription,
  longDescription,
  price,
  image,
}: Omit<IProduct, "id">) => {
  await db.runAsync(
    `INSERT INTO products (name, shortDescription, longDescription, price, image)
     VALUES (?, ?, ?, ?, ?)`,
    [name, shortDescription, longDescription, price, image]
  );
};

const seedInitialProducts = async () => {
  const initial: Omit<IProduct, "id">[] = [
    {
      name: "NDF Honey",
      shortDescription: "Madu herbal untuk meningkatkan daya tahan tubuh.",
      longDescription:
        "NDF Honey adalah madu herbal murni yang digunakan untuk meningkatkan daya tahan tubuh dan menjaga kesehatan secara alami.",
      price: "Rp 120.000",
      image:
        "https://d2kchovjbwl1tk.cloudfront.net/vendor/29/product/IMG_20231212_080139_1702342943068_resized2048-jpg.webp",
    },
    {
      name: "Propolis EFI Kecil 10ml",
      shortDescription: "Propolis cair untuk menjaga kesehatan tubuh.",
      longDescription:
        "Propolis EFI adalah propolis cair yang memiliki banyak manfaat untuk kesehatan tubuh, seperti meningkatkan sistem kekebalan tubuh dan mengatasi infeksi.",
      price: "Rp 85.000",
      image:
        "https://d2kchovjbwl1tk.cloudfront.net/vendor/29/product/ibnr47vm_1699245639763_resized2048-png.webp",
    },
    {
      name: "Ummibeb Minyak Telon 100 ml",
      shortDescription: "Minyak telon untuk bayi dan anak-anak.",
      longDescription:
        "Ummibeb Minyak Telon digunakan untuk menghangatkan tubuh bayi dan anak-anak, mencegah perut kembung, serta meredakan flu dan batuk.",
      price: "Rp 45.000",
      image:
        "https://d2kchovjbwl1tk.cloudfront.net/vendor/29/product/FPK202408021_1722825566938_resized2048-jpg.webp",
    },
  ];

  for (const product of initial) {
    await insertProduct(product);
  }
};
