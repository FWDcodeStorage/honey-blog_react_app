import { useEffect, useState } from "react";
import Images from "../Images";
import Card from "../components/Card";
import NoPostsFound from "../components/NoPostsFound";
import Spinner from "../components/Loader";

const Health = ({posts, loading, setLoading}) => {

    const [healthPosts, setHealthPosts] = useState([]);

    useEffect(() => {
    setLoading(true)
    const filteredPosts = posts.filter((post) => 
       post.tag === "health"
    )
    setHealthPosts(filteredPosts);
    setLoading(false)
    },[])

    if(loading) {
        return <Spinner />
      }
    

    return (
        <div className="w-[100vw] overflow-hidden pb-5 pt-0 px-3 flex flex-col justify-center items-center">
            <div className="cover w-full lg:h-[60vh] h-[40vh]">
                <img src={Images.health} alt="cover" width={400} height={300}
                className="w-full h-full object-cover" />
                
                    <h2 className="absolute top-[20%] left-[50%] translate-x-[-50%] text-xl text-white font-extrabold tracking-widest">#Health </h2>
                
                </div>
                <div className="w-full  flex justify-center items-center lg:py-5 py-2 bg-gray-100">
                    <p className="w-[80%] text-sm text-gray-500 tracking-wide">
                    Honey, with its impressive array of immune-boosting properties, is not only a delectable ingredient but also a valuable ally in promoting a strong and resilient immune system. Its antioxidant, antibacterial, and anti-inflammatory effects, coupled with its prebiotic benefits and nutritional value, make it an excellent choice for enhancing your immune response. So, whether you enjoy it in your tea, drizzle it on your breakfast, or use it as a natural sweetener in recipes, let honey be your sweet companion on the journey to a healthier immune system.
                    </p>
                </div>
                {healthPosts && <div className="container w-full flex flex-wrap justify-between items-center my-4">
                    {healthPosts.map(post => (
                       <Card post={post} key={post.id} />
                    ))}
                </div>}
                {(healthPosts.length === 0) && 
                <NoPostsFound/>}
        </div>
    );
}
 
export default Health;