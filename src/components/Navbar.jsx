import { Link } from "react-router-dom";
import { useState } from 'react';
//images & icons
import Images from '../Images';
import { FaSearch } from "react-icons/fa"

const Navbar = ({ isAuth, signInWithGoogle, logOut, search, setSearch }) => {

    const [open, setOpen] = useState(false);

    return (
        <div 
        className="flex flex-row justify-between items-center w-full lg:h-14 md:h-12 h-10 sm:h-8 xl:px-2 xl:py-2 px-1 py-1 shadow-gray-100 shadow-xl sticky z-50">
            <div className="basis-1/4 h-full flex justify-center items-center">
                <Link to="/" className="h-full w-full flex justify-center items-center">
                    <img src={Images.logo} alt="logo"
                    className="h-full w-full object-contain cursor-pointer" />
                </Link>
            </div>
            <div className="basis-1/4 w-full h-full flex justify-center items-center">
               {!isAuth && <button className="h-full w-fit px-2 py-0 text-center border-2 border-[#fa9201] rounded-xl bg-[#fa9201] text-white font-semibold xl:text-lg lg:text-base md:text-sm sm:text-xs text-xs hover:bg-transparent hover:text-[#fa9201] hover:font-semibold cursor-pointer"
                onClick={signInWithGoogle}>Sign in</button>}
               {isAuth && <button className="h-full w-fit px-1 py-0 border-2 border-transparent rounded-xl text-center text-[#fa9201] font-semibold lg:text-base md:text-sm  text-xs hover:bg-[#fa9201] hover:text-white hover:font-semibold cursor-pointer"
                onClick={logOut}>Log out</button>}
            </div>
            <div className="basis-1/4 flex justify-center items-center w-full h-full">
                <input type="text"
                onChange={(e) => setSearch(e.target.value)}
                className="w-[100%] p-1 lg:px-2 bg-transparent border-solid border-2 border-[#fa9201] rounded-lg align-middle focus:outline-0 placeholder:font-light text-center"/>
                <FaSearch className="w-[15%] xl:text-3xl lg:text-2xl md:text-2xl sm:text-sm text-sm text-[#fa9201] cursor-pointer"/>
            </div>
            <div className=" w-12 h-full lg:w-12 border-2 border-[#fa9201] flex flex-col justify-around items-center p-1 rounded-lg cursor-pointer" onClick={()=> setOpen(!open)}>
                <div className="h-1 w-[70%] bg-[#fa9201] rounded-lg"></div>
                <div className="h-1 w-[70%] bg-[#fa9201] rounded-lg"></div>
                <div className="h-1 w-[70%] bg-[#fa9201] rounded-lg"></div>
            </div>
            <div className={`${open ? "flex" : "hidden"} menu flex flex-col justify-between items-center absolute top-14 right-0 lg:w-1/4 xl:w-1/4 md:w-1/4 w-full mx-2 bg-white shadow-black-100 shadow-xl lg:py-12 md:py-7 py-5 text-base text-[#fa9201] font-normal`}>
                    
                    <div onClick={()=> setOpen(false)} className="w-full h-full px-6 py-2 active:italic hover:italic hover:font-light"><Link to="/health" className="text-[#fa9201] lg:text-xl text-lg hover:text-[#fa9201] cursor-pointer">{'\u25CF'} Health</Link></div>
                    <div onClick={()=> setOpen(false)} className="w-full h-full px-6 py-2 active:italic hover:italic hover:font-light"><Link to="/food" className="text-[#fa9201] lg:text-xl text-lg hover:text-[#fa9201] cursor-pointer">{'\u25CF'} Food</Link></div>
                    <div onClick={()=> setOpen(false)} className="w-full h-full px-6 py-2 active:italic hover:italic hover:font-light"><Link to="/cosmetics" className="text-[#fa9201] lg:text-xl text-lg hover:text-[#fa9201] cursor-pointer">{'\u25CF'} Cosmetics</Link></div>
                    <div onClick={()=> setOpen(false)} className="w-full h-full px-6 py-2 active:italic hover:italic hover:font-light"><Link to="/more" className="text-[#fa9201] lg:text-xl text-lg hover:text-[#fa9201] cursor-pointer">{'\u25CF'} Learn more</Link></div>
                   {isAuth && <div className="w-full h-full bg-[#fa9201]  px-6 py-1 active:italic hover:italic hover:font-light"><Link to="/add" className="lg:text-xl text-lg text-white font-light hover:text-white cursor-pointer">{'\u25CF'} + Add Blog</Link></div>}
                    
            </div>
        </div>
    );
}

export default Navbar;