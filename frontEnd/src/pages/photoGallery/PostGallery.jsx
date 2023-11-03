// const { currentUser } = useSelector((state) => state.user);
// const [formData, setFormData] = useState({
//   imageUrls: [],
//   name: "",
//   description: "",
// });
// const [error, setError] = useState(false);
// const [loading, setLoading] = useState(false);
// const handleRemoveImage = (index) => {
//   setFormData({
//     ...formData,
//     imageUrls: formData.imageUrls.filter((_, i) => i !== index),
//   });
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     if (formData.imageUrls.length < 1)
//       return setError("You must upload at least one image");
//     if (+formData.regularPrice < +formData.discountPrice)
//       return setError("Discount price must be lower than regular price");
//     setLoading(true);
//     setError(false);
//     const res = await fetch("/api/listing/create", {
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
