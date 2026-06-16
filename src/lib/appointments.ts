import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

type AppointmentData = {
  name: string;
  phone: string;
  date: string;
  time: string;
  email: string;
  comment?: string;
  psychologistId: string;
  psychologistName: string;
};

export type Appointment = AppointmentData & {
  id: string;
  createdAt: string;
};

export async function addAppointment(userId: string, data: AppointmentData) {
  const ref = collection(db, "users", userId, "appointments");
  await addDoc(ref, {
    ...data,
    createdAt: new Date().toISOString(),
  });
}

export async function getAppointments(userId: string): Promise<Appointment[]> {
  const ref = collection(db, "users", userId, "appointments");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Appointment, "id">),
  }));
}
