
import Header from "./_components/Header";



import "@/app/_styles/globals.css";
import { ReservationProvider } from "./_components/ReserveDateContext";

// import {Josefin_Sans} from "next/font/google"
// const josefin = Josefin_Sans({
//   subsets:['latin'],
//   display: "swap"
// })

export const metadata = {
  title: {
    template:'%s / The Wild-Oasis',
    default:"Welcome / The Wild-Oasis "
  },
  description:"Luxurious Hotel in the located in between nature."
};

// console.log(josefin);

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={`bg-primary-950 text-primary-100 flex min-h-screen relative flex-col `}>
       <Header/>
       <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">
          <ReservationProvider>
          {children}
          </ReservationProvider>
          </main>
        
       </div>
        </body>
    </html>
  )
}
