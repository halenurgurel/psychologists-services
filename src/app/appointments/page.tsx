"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { getAppointments, Appointment } from "@/lib/appointments";
import Spinner from "@/components/ui/Spinner";

export default function AppointmentsPage() {
  const user = useAuthStore((state) => state.user);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getAppointments(user.uid).then((data) => {
      setAppointments(data);
      setLoading(false);
    });
  }, [user]);

  if (!user) return <p className="p-10">Please log in to see your appointments.</p>;
  if (loading) return <Spinner fullPage />;

  return (
    <div className="flex flex-col gap-4 p-10">
      <h1 className="text-3xl font-bold">My Appointments</h1>
      {appointments.length === 0 ? (
        <p className="text-foreground/50">No appointments yet.</p>
      ) : (
        appointments.map((a) => (
          <div key={a.id} className="bg-surface flex flex-col gap-2 rounded-2xl p-6">
            <p className="text-lg font-bold">{a.psychologistName}</p>
            <p className="text-foreground/50 text-sm">
              {a.date} at {a.time}
            </p>
            <p className="text-sm">Name: {a.name}</p>
            <p className="text-sm">Phone: {a.phone}</p>
            <p className="text-sm">Email: {a.email}</p>
            {a.comment && <p className="text-sm">Comment: {a.comment}</p>}
          </div>
        ))
      )}
    </div>
  );
}
