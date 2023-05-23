import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import Modal from "./Modal";
import Images from "../Images";

const Card = ({ post, deletePost, isAuth }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({});

  const navigate = useNavigate();

  const openModal = (post) => {
    setOpen(true);
    setDetails(post);
  };

  return (
    <div className='cart lg:w-[30%] md:w-[45%] flex flex-col w-full h-[50vh] justify-center items-center lg:px-2 lg:py-1 px-1 py-1 shadow-lg shadow-gray-400 hover:shadow-orange-300'>
      <div className='img w-full h-1/2 flex justify-center items-center overflow-hidden'>
       {post.img ?
        <img src={post.img} alt={post.title} className='object-cover' /> 
        : <img src={Images.logo} alt={post.title} className='object-cover' />
       } 
      </div>
      <div className='title w-full py-1 mt-2'>
        <h2 className='text-[#fa9201] lg:text-xl text-l font-medium mb-1'>
          {post.title}
        </h2>
        <button
          onClick={() => navigate(`/${post.tag}`)}
          className='bg-[#fa9201] px-2 p-y-2 text-white lg:text-lg text-base rounded-md mt-2 cursor-pointer'
        >
          #{post.tag}
        </button>
      </div>
      <div className='btn w-full py-1 mt-2'>
        <button
          onClick={() => openModal(post)}
          className='lg:text:lg text-base underline text-[#fa9201] tracking-wider cursor-pointer'
        >
          Read more
        </button>
      </div>
      {isAuth && post.currentUser && post.currentUser.id === auth.currentUser.uid && (
        <div className='btn w-full py-2 flex justify-center items-center gap-1'>
          <div className="text-sm text-white flex justify-center items-center overflow-hidden">
            <button className=" py-2 px-6 bg-orange-400 relative group cursor-pointer"
            onClick={()=> navigate(`/update/${post.id}`)}>
              <span className="absolute top-0 left-0 bg-orange-700 w-0 h-full group-hover:w-full transition-all ease-out duration-300"></span>
            <span className="relative cursor-pointer">Update</span>
            </button>
          </div>
          <div className="text-sm text-white flex justify-center items-center overflow-hidden">
            <button className=" py-2 px-6 bg-orange-700 relative group cursor-pointer"
            onClick={()=> {deletePost(post.id)}}>
              <span className="absolute top-0 left-0 bg-orange-400 w-0 h-full group-hover:w-full transition-all ease-out duration-300"></span>
            <span className="relative cursor-pointer">Delete</span>
            </button>
          </div>
        </div>
      )}

      {open && <Modal open={open} setOpen={setOpen} {...details} />}
    </div>
  );
};

export default Card;
