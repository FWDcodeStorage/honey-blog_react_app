import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { storage, db, auth } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  doc,
  getDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const initialState = {
  title: "",
  post: "",
  tag: "",
  img: "",
  currentUser: { id: "", name: "" },
};

const AddBlog = () => {
  const options = ["food", "health", "cosmetics", "more"];
  const [data, setData] = useState(initialState);
  const { title, post, tag, img } = data;
  const [file, setFile] = useState();
  const [progress, setProgress] = useState();
  const [selected, setSelected] = useState(options[3]);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSelected = (option) => {
    setSelected(option);
  };

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, "posts", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  useEffect(() => {
    const handleUpload = async () => {
      console.log("start upload");

      if (file === "") {
        console.log("Error!");
      }

      const imageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //takes a snapshot of the proccess
          console.log(snapshot);
        },
        (err) => {
          //catch the error
          console.log(err);
        },
        () => {
          //gets the function from storage references the image storage in firebase by the children
          //gets the download url then sets the image from firebase as the value for the imgURL key
          getDownloadURL(uploadTask.snapshot.ref).then((firebaseUrl) => {
            setData((prevObject) => ({ ...prevObject, img: firebaseUrl }));
          });
        }
      );
    };
    file && handleUpload();
  }, [file]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSumit = async (e) => {
    e.preventDefault();

    // const user = auth.currentUser;
    // setData(prevObject => ({...prevObject, author:{id: user.uid, name: user.displayName}}))
    // // setCurrentUser({id: user.id, name: user.displayName})

    const postData = {
      ...data,
      timestamp: serverTimestamp(),
    };

    if (!id) {
      await addDoc(collection(db, "posts"), {
        ...postData,
        timestamp: serverTimestamp(),
        currentUser: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
        },
      });
      alert("Successfully added");
      navigate("/");
      window.location.reload();
    } else {
      await updateDoc(doc(db, "posts", id), {
        ...postData,
        timestamp: serverTimestamp()
      });
      alert("Successfully updated");
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className='w-full  overflow-y-scroll flex flex-col container justify-center items-center my-3 lg:px-3 px-2 py-10 '>
      <h1 className='text-[#fa9201] text-center font-bold text-xs md:text-lg lg:text-2xl mb-2 md:mb-4'>
        {id ? "Update Post" : "Add Post"}
      </h1>

      <form
        className='lg:w-[60%] w-full h-fit mt-10 lg:px-8 px-4 lg:py-12 py-14 border-2 border-orange-400 rounded-lg shadow-lg shadow-gray-400'
        onSubmit={handleSumit}
      >
        <div className='mb-1 md:mb-3'>
          <input
            required
            type='text'
            name='title'
            placeholder='title'
            autoFocus
            value={title}
            onChange={handleChange}
            className='w-full border-2 border-[#fa9201] rounded-md px-2 py-1  text-sm md:text-lg text-gray-500 focus:outline-0'
          />
        </div>
        <div className='mb-1 md:mb-3'>
          <label className='px-2 py-1 text-sm md:text-lg text-gray-400'>
            Post:
          </label>
          <br />
          <textarea
            required
            name='post'
            value={post}
            onChange={handleChange}
            cols='10'
            rows='5'
            className='w-full border-2 border-[#fa9201] rounded-md px-2 py-1  text-sm md:text-lg text-gray-500 focus:outline-0'
          ></textarea>
        </div>
        <div className='mb-1 md:mb-3'>
          <label className='px-2 py-1 text-sm md:text-lg text-gray-400'>
            Choose tags:
          </label>{" "}
          <br />
          <div className='flex items-center gap-2 px-2 py-1 text-sm md:text-lg text-gray-400'>
            {options.map((option) => (
              <div
                aria-required
                value={tag}
                className={`${
                  selected === option
                    ? "bg-orange-400 text-white"
                    : "bg-transparent"
                } px-2 py-1 rounded-md cursor-pointer`}
                key={Math.random()}
                onClick={() => {
                  setData({ ...data, tag: option });
                  handleSelected(option);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        <div className='mb-1 md:mb-3 flex flex-col items-center'>
          <input
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
            className='w-full h-12 border-2 border-[#fa9201] rounded-md pr-2 mb-1 text-sm md:text-lg text-gray-500 focus:outline-0'
          />
        </div>
        <button
          type='submit'
          disabled={progress !== null && progress < 100}
          className='w-full h-12 mb-2 border-2 border-[#fa9201] bg-[#fa9201] text-white rounded-md pr-2 font-semibold text-sm md:text-lg focus:outline-0 active:bg-transparent active:text-[#fa9201] hover:cursor-pointer'
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
