const NoPostsFound = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full py-8 bg-orange-100 text-gray-600'>
      <h1>Sorry!</h1>
      <p>
        There are no posts yet. <br />
        You can{" "}
        <a className='text-blue-300 hover:text-orange- cursor-pointer' href='/add'>
          add
        </a>{" "}
        your own !
      </p>
    </div>
  );
};

export default NoPostsFound;
