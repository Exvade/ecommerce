import banner from '../assets/banner/banner.jpg';
export default function Banner() {
  return (
    <div className='w-full bg-center bg-cover rounded-md'>
      <img src={banner} alt="" className='mx-auto rounded-md' />
    </div>
  )
}