const NotFound = () => {
    return (
        <div className='flex flex-col justify-center items-center w-full h-[80vh] py-8 bg-orange-100 text-gray-600'>
          <h1 className="text-gray-600 text-4xl font-extrabold tracking-widest mb-2">404</h1>
          <p className="text-gray-600 tracking-wider text-lg">
            Page Not Found
          </p>
          <p className="text-gray-400">Sign in</p>
        </div>
      );
}
 
export default NotFound;