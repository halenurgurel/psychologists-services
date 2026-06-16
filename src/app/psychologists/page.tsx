import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Psychologists } from "@/types/psychologists";
import PsychologistList from "@/components/sections/PsychologistList";

export default async function PsychologistsPage() {
  const snapshot = await getDocs(collection(db, "psychologists"));
  const psychologists = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Psychologists, "id">),
  }));
  return (
    <div className="p-5">
      <PsychologistList psychologists={psychologists} />
    </div>
  );
}
