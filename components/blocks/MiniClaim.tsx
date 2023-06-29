// a simple claim component
export default function MiniClaim() {
  return (
    <div className="relative mt-5 overflow-hidden">
      <video autoPlay loop muted className="absolute w-full h-full object-cover z-0">
        <source src="https://storage.googleapis.com/shibuya-white-rabbit/landing-bg-animation-v2.mp4" type="video/mp4"/>
      </video>

      <div className="p-5 flex flex-col items-center bg-white bg-opacity-10 relative z-10">
        <h2 className="text-xl font-bold text-yellow-400 bg-black opacity-80 ">House Of Lee</h2>
        <p className="text-yellow-400 bg-black opacity-80">by bruceleeofficial.eth</p>
        <img className="w-64 h-64 object-cover rounded-md" src="https://lnzk6yf5gfnz6347oro5gillfzq4ahq4d4s4inclyctqmjvi4ubq.arweave.net/W3KvYL0xW59vn3Rd0yFrLmHAHhwfJcQ0S8CnBiao5QM" alt="claim" />
        <div className="flex flex-row mt-5">
          <h1 className="text-yellow-400 bg-black opacity-80">Price: 0.5 ETH</h1>
          <p className="pl-5 text-yellow-400 bg-black opacity-80">ends 06/30/23 10pm</p>
        </div>
        <button className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-gray-700 focus:outline-none focus:ring-yellow-400">claim</button>
      </div>
    </div>
  )
}
