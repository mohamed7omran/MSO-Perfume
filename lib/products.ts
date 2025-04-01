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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import type { Product } from "@/types/product";

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
  imageFile: File | null
): Promise<string> {
  try {
    // let imageUrl = product.image;

    // Upload image if provided
    // if (imageFile) {
    //   const storageRef = ref(
    //     storage,
    //     `products/${Date.now()}_${imageFile.name}`
    //   );
    //   await uploadBytes(storageRef, imageFile);
    //   imageUrl = await getDownloadURL(storageRef);
    // }

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...product,
      // image: imageUrl,
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
  imageFile: File | null
): Promise<void> {
  try {
    const updateData = { ...product };

    // Upload new image if provided
    if (imageFile) {
      // Delete old image if it's a Firebase Storage URL
      if (product.image && product.image.includes("firebasestorage")) {
        try {
          const oldImageRef = ref(storage, product.image);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.error("Error deleting old image:", error);
          // Continue even if old image deletion fails
        }
      }

      const storageRef = ref(
        storage,
        `products/${Date.now()}_${imageFile.name}`
      );
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);
      updateData.image = imageUrl;
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
export async function deleteProduct(
  id: string,
  imageUrl: string
): Promise<void> {
  try {
    // Delete image from storage if it's a Firebase Storage URL
    if (imageUrl && imageUrl.includes("firebasestorage")) {
      try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (error) {
        console.error("Error deleting image:", error);
        // Continue even if image deletion fails
      }
    }

    // Delete document from Firestore
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
