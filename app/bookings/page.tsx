import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";

const BookingsPage = async () => {

    const session = await getServerSession(authOptions);

    if (!session?.user) {
       return redirect("/");
    }

    const bookings = await db.booking.findMany({
        where: {
            userId: (session.user as any).id,
        },
    });

    return ( 
        <>
            <Header />

            <div className="px-5 py-6">
                <h1 className="text-xl font-bold">Agendamentos</h1>

                <h2>Confirmados</h2>

                {bookings.map((booking) => (
                    <BookingItem key={booking.id} />
                ))}
            </div>
        </>
     );
}
 
export default BookingsPage;