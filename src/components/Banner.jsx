import banner from '../assets/banner/banner.png';
export default function Banner() {
  return (
    <div className='flex w-full bg-center bg-cover rounded-md'>
      <img src={banner} alt="" className='w-full max-w-screen-xl mx-auto rounded-md' />
    </div>
  )
}