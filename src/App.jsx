import "./app.css";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import NewPost from "./components/newPost";
function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      //we set the image in useState after img get loaded.
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width,
          height: img.height,
        });
      };
    };
    file && getImage();
  }, [file]);
  return (
    <div>
      <Navbar />
      {image ? (
        <NewPost image={image} />
      ) : (
        <div className="newPostCard">
          <div className="addPost">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="bot"
              className="avatar"
            />
            <div className="postForm">
              <div className="uploadText">Upload an Image.</div>
              <span>Click on Image icon to select file.</span>

              <label htmlFor="file">
                <div className="addImg">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP7p4eUa57qd5kJFtF-LC_VKvVfRabY3aQ7Q&usqp=CAU"
                    alt=""
                  />
                </div>
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                id="file"
                style={{ display: "none" }}
                type="file"
              />
              <button>Upload</button>
            </div>
          </div>
        </div>
      )}
      ;
    </div>
  );
}

export default App;
