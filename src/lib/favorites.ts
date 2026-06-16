import { db } from "./firebase";
import { doc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";

export async function addFavorite(userId: string, psychologistId: string) {
  const ref = doc(db, "users", userId, "favorites", psychologistId);
  await setDoc(ref, { id: psychologistId });
}

export async function removeFavorite(userId: string, psychologistId: string) {
  const ref = doc(db, "users", userId, "favorites", psychologistId);
  await deleteDoc(ref);
}

export async function getFavorites(userId: string): Promise<string[]> {
  const ref = collection(db, "users", userId, "favorites");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => doc.id);
}
