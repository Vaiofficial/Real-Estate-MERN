import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('')

  //text area jo bhi bhi likhenge usko message state variable mai update karne k liye responsible hai.
  const onChange = (e) =>{
    setMessage(e.target.value);
  };

//   api se data fetch karenge aur landlord state variable mai set karenga data ko

// userRef is used to fetch data from the api endpoint

//jab jab listing.userRef value change hoga tab tab useEffect trigger hoga.

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandLord();
  }, [listing.userRef]);


  return(
    <>
    {landlord && (
        <div className="flex flex-col gap-2">
            <p>
               Contact <span className="font-semibold">{landlord.username}</span><span> for</span><span className="font-semibold"> {listing.name.toLowerCase()}</span> 
            </p>

            <textarea className="w-full rounded-lg p-3 border" name="message" id="message" rows="2" placeholder="Write your Query here" value={message} onChange={onChange}> </textarea>

            {/* so buttton mai click karne se direct owner ko mail hoga */}
            <Link to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`} className='bg-slate-700 text-center text-white p-3 uppercase rounded-lg hover:opacity-95'>
            Send Message
            </Link>

        </div>
    )}
    </>
  )
}
