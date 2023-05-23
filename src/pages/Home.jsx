import Card from "../components/Card";

const Home = ({ posts, deletePost, isAuth, search }) => {

  return (
   <div className="home flex flex-col w-full h-full justify-center items-center lg:pt-10 pt-8 pb-5 px-2">
    <h1 className="text-[#fa9201] tracking-widest lg:text-2xl text-xl 
    "> Nature's Golden Nectar: Unveiling the Health Wonders of Honey </h1>
    <p className="lg:text-lg text-sm tracking-wide text-orange-300">Make your day sweeter</p>
    <div className='card-container flex flex-row flex-wrap w-full h-full justify-start items-center gap-2 lg:pt-12 pt-8 lg:px-5 px-3'>
      {posts.filter((post) => {
        return search.toLowerCase() === '' ? post : post.title.toLowerCase().includes(search)
      }).map((post) => (
        <Card post={post} deletePost={deletePost} isAuth={isAuth} key={post.id} />
      ))}
    </div>
    </div>
  );
};

export default Home;
