import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../AuthControll/firebase";

const useFirebaseStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState([]);

  const uploadFile = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const downloadURL = await getDownloadURL(storageRef);
      setUrls((prevUrls) => [...prevUrls, downloadURL]);
    });
  };

  return { progress, urls, error, uploadFile };
};

export default useFirebaseStorage;
