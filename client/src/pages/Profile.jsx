import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className='max-w-lg m-auto p-3'>
      <h1 className='text-3xl font-bold text-center my-7 '>Profile</h1>

      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt='profile ' className='rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer'></img>
        <input type='text' id='username' placeholder='username' className='p-3 border rounded-lg focus:outline-none'></input>
        <input type='text' id='email' placeholder='email' className='p-3 border rounded-lg focus:outline-none'></input>
        <input type='text' id='password' placeholder='password' className='p-3 border rounded-lg focus:outline-none'></input>
        <button className='p-3 bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80'>Update Profile</button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer font-medium'>Delete Account</span>
        <span className='text-red-700 cursor-pointer font-medium'>Sign out</span>
      </div>
        
    </div>
  )
}
