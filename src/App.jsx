//style
import "./App.css";
//pages
import Home from "./pages/Home";
import Health from "./pages/Health";
import Food from "./pages/Food";
import Cosmetics from "./pages/Cosmetics";
import More from "./pages/More";
import AddBlog from "./pages/AddBlog";
import NotFound from "./pages/NotFound";
//components
import Navbar from "./components/Navbar";
import Spinner from "./components/Loader";
//router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//
import { useState, useEffect } from "react";
//
import { db, auth, googleProvider } from "./config/firebase";
import {
  collection,
  onSnapshot,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getPosts();
    console.log(posts);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const signInWithGoogle = async () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      window.location.pathname = "/";
    });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    const docSnapshot = await getDoc(postDoc);
    if (docSnapshot.exists()) {
      window.confirm("Are you sure you want to delete this post?");
      if (window.confirm("Are you sure you want to delete this post?")) {
        await deleteDoc(postDoc);
        window.location.reload();
        window.alert("Successfully deleted");
      }
    }
  };


  return (
    <Router>
      <div className='app flex flex-col justify-center items-center w-full h-fit overflow-y-scroll overflow-x-hidden'>
        <Navbar
          isAuth={isAuth}
          signInWithGoogle={signInWithGoogle}
          logOut={logOut}
          search={search}
          setSearch={setSearch}
        />
        <Routes>
          <Route
            path='/'
            element={
              <Home posts={posts} deletePost={deletePost} isAuth={isAuth} search={search} />
            }
          />
          <Route
            path='/health'
            element={
              <Health posts={posts} loading={loading} setLoading={setLoading} />
            }
          />
          <Route
            path='/food'
            element={
              <Food posts={posts} loading={loading} setLoading={setLoading} />
            }
          />
          <Route
            path='/cosmetics'
            element={
              <Cosmetics
                posts={posts}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path='/more'
            element={
              <More
                posts={posts}
                setPosts={setPosts}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
          {isAuth && (
            <Route
              path='/add'
              element={
                <AddBlog
                  posts={posts}
                  setPosts={setPosts}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
          )}
          {isAuth && (
            <Route
              path='/update/:id'
              element={
                <AddBlog
                  posts={posts}
                  setPosts={setPosts}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
          )}
          {!isAuth && <Route path='/*' element={<NotFound />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
