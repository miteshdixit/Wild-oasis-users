"use server"

import { revalidatePath } from "next/cache";
import {auth, signIn} from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";


export async function updateGuest(formData){
  // console.log(formData);
  const session = await auth();
  if(!session) throw new Error("you must be logged in ");

  const nationalID = formData.get("nationalID");
  const [nationality , countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID");
  }

  const updateData = {nationality ,countryFlag , nationalID};

  const {data , error} = await supabase
  .from("guests")
  .update(updateData)
  .eq("id",session.user.guestId)

  if(error) throw new Error("guest could not be uploaded");

  revalidatePath("/account/profile")
}

// DElele booking
export async function deleteBooking(bookingId){
const session = await auth();
if(!session) throw new Error("you must be logged in");

const guestBookings = await getBookings(session.user.guestId);
const guestBookingIds = guestBookings.map((booking) => booking.id);

if(!guestBookingIds.includes(bookingId))
  throw new Error("you are not allowed to delete this Booking");
  
  const {error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
      console.error(error);
      throw new Error('Booking could not be deleted');
    }
    revalidatePath("/account/reservations")

}

export async function updateBooking(formData) {
  const session = await auth();
  const bookingId = Number(formData.get("bookingId"));
if(!session) throw new Error("you must be logged in");

const guestBookings = await getBookings(session.user.guestId);
const guestBookingIds = guestBookings.map((booking) => booking.id);

if(!guestBookingIds.includes(bookingId))
  throw new Error("you are not allowed to delete this Booking");

const updateData = {
  numGuests: Number (formData.get("numGuests")),
  observations: formData.get("observations").slice(0,1000),
};

  const { data, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', bookingId)
      .select()
      .single();
  
    if (error) {
      console.error(error);
      throw new Error('Booking could not be updated');
    }
    revalidatePath(`/account/reservations/edit/${bookingId}`)

    redirect("/account/reservations")
  }

  export async function createBooking(bookingData, formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");
  
    const newBooking = {
      ...bookingData,
      guestId: session.user.guestId,
      numGuests: Number(formData.get("numGuests")),
      observations: formData.get("observations").slice(0, 1000),
      extrasPrice: 0,
      totalPrice: bookingData.cabinPrice,
      isPaid: false,
      hasBreakfast: false,
      status: "unconfirmed",
    };
  
    const { error } = await supabase.from("bookings").insert([newBooking]);
  
    if (error) throw new Error("Booking could not be created");
  
    revalidatePath(`/cabins/${bookingData.cabinId}`);
  
    redirect("/cabins/thankyou");
  }


export async function signinAction(){
  await signIn("google", {
    redirectTo: "/account"
  });
}


export async function signOutAction(){
  await signOut({redirectTo:"/"})
}