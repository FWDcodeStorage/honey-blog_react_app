const Modal = ({ setOpen, id, title, post, tag, img }) => {
  const formattedPost = post.replace(/\n/g, "<br>");

  return (
    <div className='modal flex flex-col justify-between items-start z-50 md:w-[50vw] w-full px-2 py-1 bg-orange-100 opacity-90 shadow-lg shadow-gray-400'>

      <div className='img w-full h-52 flex justify-center items-center overflow-hidden'>
        <img src={img} alt={title} className='w-full h-full object-cover' />
      </div>
      <div className='title w-full py-1'>
        <h2 className='text-[#fa9201] lg:text-xl text-lg font-medium mb-1'>{title}</h2>
      </div>
      <div className='post'>
        <p className="lg:text-lg text-base text-gray-600 h-[60vh] overflow-y-scroll" 
         dangerouslySetInnerHTML={{ __html: formattedPost }} />
      </div>
      <div className="flex w-full py-1">
      <button className="bg-[#fa9201] px-2 p-y-2 text-white lg:text-base text-sm rounded-md">#{tag}</button>
      </div>
      <button
      onClick={() => setOpen(false)}
         className="absolute top-[2%] right-[2%] z-50 px-2 text-center text-gray-600 text-lg font-bold border-2 border-gray-600 rounded-full hover:border-[#fa9201] hover:text-[#fa9201]">
            X
            </button>
    </div>
  );
};

export default Modal;
