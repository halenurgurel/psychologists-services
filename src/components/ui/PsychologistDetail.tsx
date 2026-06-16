import PsychologistCard from "./PsychologistCard";
import { Psychologists } from "@/types/psychologists";

export default function PsychologistDetail({ psychologists }: { psychologists: Psychologists }) {
  return (
    <div>
      <PsychologistCard p={psychologists} showReadMore={false} showDetail={true} />
    </div>
  );
}
