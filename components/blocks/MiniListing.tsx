// a simple listing component
export default function MiniListing() {
  return (
    <div className="mt-5 bg-white p-5 shadow-sm rounded-lg flex flex-col items-center">
      <h2 className="text-xl font-bold text-black-700">69 Frames</h2>
      <p className="text-gray-500">by psull.eth</p>
      <img className="w-full h-64 object-cover" src="https://assets.manifold.xyz/image/upload/v1670518376/bd1fd4ccb9f741b9f083461fa84013483a7f51edf9657e642c6623e7d28b9cfe.gif" alt="listing" />
      <div className="flex flex-row mt-5">
        <h1 className="text-lg font-bold text-gray-700">Price: 0.5 ETH</h1>
        <p className="pl-5 text-gray-500">ends 06/30/23 10pm</p>

      </div>
      <button className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Bid</button>
    </div>
  )
}