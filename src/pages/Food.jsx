import { useEffect, useState } from "react";
import Images from "../Images";
import Card from "../components/Card";
import NoPostsFound from "../components/NoPostsFound";
import Spinner from "../components/Loader";

const Food = ({posts, loading, setLoading}) => {

    const [foodPosts, setFoodPosts] = useState([]);

    useEffect(() => {
    setLoading(true);
    const filteredPosts = posts.filter((post) => 
       post.tag === "food"
    )
    setFoodPosts(filteredPosts);
    setLoading(false);
    },[])

    if(loading) {
        return <Spinner />
      }
    

    return (
        <div className="w-[100vw] pb-5 pt-0 px-3 flex flex-col justify-center items-center">
            <div className="cover w-full lg:h-[60vh] h-[40vh]">
                <img src={Images.food} alt="cover" width={400} height={200}
                className="w-full h-full object-cover" />
                
                    <h2 className="absolute top-[20%] left-[50%] translate-x-[-50%] text-xl text-white font-extrabold tracking-widest">#Food</h2>
                
                </div>
                <div className="w-full flex justify-center items-center lg:py-5 py-2 bg-gray-100">
                    <p className=" w-[80%] text-sm text-gray-500 tracking-wide">
                    In the world of natural ingredients, honey has held a special place for centuries. Not only is it a delicious and versatile sweetener, but it also boasts an array of health benefits. One such benefit lies in its potential to enhance our immune system. <br />
                    As a natural treasure brimming with antioxidants and antibacterial properties, honey serves as a vital ingredient to nourish and fortify the human body, fostering wellness and supporting a robust immune system. 
                    </p>
                </div>
                {foodPosts && <div className="container w-full flex flex-wrap justify-start gap-2 items-center lg:pt-12 pt-8 lg:px-5 px-3">
                    {foodPosts.map(post => (
                       <Card post={post} key={post.id} />
                    ))}
                </div>}
                {(foodPosts.length === 0) && 
                <NoPostsFound/>}
        </div>
    );
}
 
export default Food;