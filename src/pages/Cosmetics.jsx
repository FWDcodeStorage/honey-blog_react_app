import { useEffect, useState } from "react";
import Images from "../Images";
import Card from "../components/Card";
import NoPostsFound from "../components/NoPostsFound";
import Spinner from "../components/Loader";
const Cosmetics = ({posts, loading, setLoading}) => {

    const [cosmetics, setCosmetics] = useState([]);

    useEffect(() => {
    setLoading(true);
    const filteredPosts = posts.filter((post) => 
       post.tag === "cosmetics"
    )
    setCosmetics(filteredPosts);
    setLoading(false)
    },[])

    if(loading) {
        return <Spinner />
      }
    

    return (
        <div className="w-[100vw] pb-5 pt-0 px-3 flex flex-col justify-center items-center">
            <div className="cover w-full lg:h-[60vh] h-[40vh]">
                <img src={Images.cosmetics} alt="cover" width={400} height={200}
                className="w-full h-full object-cover" />
                
                    <h2 className="absolute top-[20%] left-[50%] translate-x-[-50%] text-xl text-white font-extrabold tracking-widest">#Cosmetics</h2>
                
                </div>
                <div className="w-full  flex justify-center items-center lg:py-5 py-2 bg-gray-100">
                    <p className="w-[80%] text-sm text-gray-500 tracking-wide">
                    Incorporating honey into your cosmetic routine can unlock a world of beauty benefits. From its moisturizing and nourishing properties to its antimicrobial and healing effects, honey is a versatile ingredient that can transform your skin and hair care routine. Whether you choose honey-based masks, moisturizers, or hair products, you can indulge in the natural wonders of honey and enjoy a radiant, healthy complexion and lustrous locks. So, harness the power of honey in your cosmetics and let its sweet magic enhance your beauty regimen. <br />
                    Explore the captivating world of honey cosmetics and how this golden elixir can work wonders for your skin and hair. Get ready to indulge in the beauty benefits of honey!                    </p>
                </div>
                {cosmetics && <div className="container w-full flex flex-wrap justify-start gap-2 items-center lg:pt-12 pt-8 lg:px-5 px-3">
                    {cosmetics.map(post => (
                       <Card post={post} key={post.id}/>
                    ))}
                </div>}
                {(cosmetics.length === 0) && 
                <NoPostsFound/>}
        </div>
    );
}
 
export default Cosmetics;