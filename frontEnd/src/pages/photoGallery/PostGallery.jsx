// import {useSelector} from "react-redux"

// const { currentUser } = useSelector((state) => state.auth);
// const [formData, setFormData] = useState({
//   imageUrls: [],
//   name: "",
//   description: "",
//   private: false,
// });

// const postHandleControll = async (e) => {
//   e.preventDefault();
//   try {

//     const res = await fetch("http://localhost:3000/api/gallery/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ...formData,
//         userRef: currentUser._id,
//       }),
//     });
//     const data = await res.json();
//     setLoading(false);
//     if (data.success === false) {
//       setError(data.message);
//     }
//   } catch (error) {
//     setError(error.message);
//     setLoading(false);
//   }
// };
