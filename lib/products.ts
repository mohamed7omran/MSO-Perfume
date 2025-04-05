import { db, storage } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import type { Product } from "@/types/product";
import crypto from "crypto";

const COLLECTION_NAME = "products";

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const productsQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy("name")
    );
    const querySnapshot = await getDocs(productsQuery);

    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      } as Product);
    });

    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Product;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
}

// Add a new product
export async function addProduct(
  product: Omit<Product, "id">,
  imageUrl: string
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...product,
      image: imageUrl,
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

// Update an existing product
export async function updateProduct(
  id: string,
  product: Partial<Omit<Product, "id">>,
  imageUrl: string | null
): Promise<void> {
  try {
    const updateData = { ...product };
    if (imageUrl) {
      if (product.image) {
        product.image = imageUrl;
      } else {
        product.image = imageUrl;
      }
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Delete a product
function extractPublicIdFromUrl(url: string): string {
  const regex = /\/([^/]+)\/image\/upload\/([^/]+)\/([^/]+)\.(jpg|webp|png)/;
  const match = url.match(regex);

  if (match) {
    return match[3];
  } else {
    console.error("Unable to extract public_id from URL:", url);
    throw new Error("Unable to extract public_id from URL");
  }
}
function generateSignature(publicId: string): string {
  const apiSecret = "4W4-SDUOJyL1kIMpQ2aTid7wJp8";
  const timestamp = Math.floor(Date.now() / 1000);
  const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto
    .createHash("sha1")
    .update(signatureString)
    .digest("hex");
  return signature;
}

export async function deleteProduct(
  id: string,
  imageUrl: string
): Promise<void> {
  try {
    if (imageUrl) {
      const publicId = extractPublicIdFromUrl(imageUrl);
      const signature = generateSignature(publicId); // توليد الـ signature
      const timestamp = Math.floor(Date.now() / 1000); // الوقت الحالي بالثواني

      // إرسال طلب حذف الصورة من Cloudinary عبر API
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dihsp2kez/image/destroy`,
        {
          method: "POST",
          body: new URLSearchParams({
            public_id: publicId,
            api_key: "478565577587379",
            api_secret: "4W4-SDUOJyL1kIMpQ2aTid7wJp8",
            signature: signature,
            timestamp: timestamp.toString(),
          }),
        }
      );

      const data = await response.json();
      if (data.result === "ok") {
        console.log("Image deleted from Cloudinary");
      } else {
        console.error("Error deleting image from Cloudinary:", data);
      }
    }

    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
