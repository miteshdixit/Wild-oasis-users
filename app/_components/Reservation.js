
import DateSelector from './DateSelector'
import ReservationForm from './ReservationForm'
import { getBookedDatesByCabinId,  getSettings } from '../_lib/data-service'
import { auth } from '../_lib/auth'
import LoginMessage from './LoginMessage';

 async function  Reservation({cabin }) {
   const session = await auth();
  //  const user = session.user
  const [ settings , bookedDates] = await Promise.all([
     getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ])
  return (
    <div className="grid grid-cols-2 border border-primary-800  min-h-[400px] ">

      <DateSelector 
      settings={settings}
      bookedDates={bookedDates}
      cabin={cabin}
      />

      {!session?.user ? <LoginMessage/> : <ReservationForm cabin={cabin} user={session.user}/>}
     
      </div>
  )
}

export default Reservation