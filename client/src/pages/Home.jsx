import banner from '../assets/banner.jpg'
import banner_mobile from '../assets/banner-mobile.jpg'

function Home() {
    return (
        <section>
            <div className='bg-slate-200 container mx-auto flex items-center justify-center my-4 px-4'>
                <div className={`w-full h-full min-h-48 bg-green-100 rounded ${!banner && "animate-pulse"}`}>

                    {/*  Desktop Banner */}
                    <img
                        src={banner}
                        alt="banner"
                        className='w-full h-full object-cover hidden lg:block'
                    />

                    {/* Mobile Banner */}
                    <img
                        src={banner_mobile}
                        alt="banner mobile"
                        className='w-full h-full object-cover block lg:hidden'
                    />

                </div>
            </div>
        </section>
    )
}

export default Home