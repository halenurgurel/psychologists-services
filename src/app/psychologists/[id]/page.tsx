import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Psychologists } from "@/types/psychologists";
import PsychologistDetail from "@/components/ui/PsychologistDetail";
import BackButton from "@/components/ui/BackButton";

export default async function PsychologistDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const docRef = doc(db, "psychologists", id);
  const snapshot = await getDoc(docRef);
  const psychologist = { id: snapshot.id, ...(snapshot.data() as Omit<Psychologists, "id">) };

  return (
    <div className="flex flex-col items-start gap-3 p-5">
      <BackButton />
      <PsychologistDetail psychologists={psychologist} />
    </div>
  );
}
