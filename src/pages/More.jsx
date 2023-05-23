import { useEffect, useState } from "react";
import Images from "../Images";
import Card from "../components/Card";
import NoPostsFound from "../components/NoPostsFound";
import Spinner from "../components/Loader";

const More = ({posts, loading, setLoading}) => {

    const [more, setMore] = useState([]);

    useEffect(() => {
    setLoading(true)
    const filteredPosts = posts.filter((post) => 
       post.tag === "more"
    )
    setMore(filteredPosts);
    setLoading(false)
    },[])

    if(loading) {
        return <Spinner />
      }
    

    return (
        <div className="w-[100vw] pb-5 pt-0 px-3 flex flex-col justify-center items-center">
            <div className="cover w-full lg:h-[60vh] h-[40vh]">
                <img src={Images.more} alt="cover" width={400} height={200}
                className="w-full h-full object-cover" />
                
                    <h2 className="absolute top-[20%] left-[50%] translate-x-[-50%] text-xl text-white font-extrabold tracking-widest">#Other</h2>
                
                </div>
                <div className="w-full  flex justify-center items-center lg:py-5 py-2 bg-gray-100">
                    <p className="w-[80%] text-sm text-gray-500 tracking-wide">
                    Honey and bees hold a significant place in our world, transcending their roles as sweeteners and pollinators. Their influence extends to environmental conservation, sustainable agriculture, human health, and educational value. By acknowledging and supporting the multifaceted benefits of honey and bees, we can foster a harmonious relationship with nature, ensuring a thriving planet for generations to come. <br />
                    Honey and bees are more than just sources of sweetness and pollinators; they have a profound impact on our planet, nature, and human existence. In this section, explore the broader benefits of honey, bees, and their influence beyond the realm of food production.
                    </p>
                </div>
                {more && <div className="container w-full flex flex-wrap justify-start gap-2 items-center lg:pt-12 pt-8 lg:px-5 px-3">
                    {more.map(post => (
                       <Card post={post} key={post.id} />
                    ))}
                </div>}
                {(more.length === 0) && 
                <NoPostsFound/>}
        </div>
    );
}
 
export default More;