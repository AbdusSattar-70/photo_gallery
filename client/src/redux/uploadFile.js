import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../pages/AuthControll/firebase';
import { uploadSuccess, updateProgress, uploadFailure } from './gallerySlice';

export const uploadFiles = (files) => async (dispatch) => {
  try {
    const storage = getStorage(app);

    dispatch(updateProgress(0));

    const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

    const promises = [];

    if (files.some((file) => !types.includes(file.type))) {
      dispatch(uploadFailure('Only accept (png, jpeg, webp, jpg'));
      return;
    }

    if (files.length > 10) {
      dispatch(uploadFailure('Please upload between 1 and 10 images per gallery.'));
      return;
    }

    for (const file of files) {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      const promise = new Promise((resolve, reject) => {
        uploadTask.on('state_changed', (snapshot) => {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          dispatch(updateProgress(percentage));
        }, (err) => {
          dispatch(uploadFailure(err));
          reject(err);
        }, async () => {
          const downloadURL = await getDownloadURL(storageRef);
          resolve(downloadURL);
        });
      });

      promises.push(promise);
    }

    Promise.all(promises)
      .then((downloadURLs) => {
        dispatch(uploadSuccess(downloadURLs));
      })
      .catch((err) => {
        dispatch(uploadFailure(err.message || 'An error occurred while uploading the images.'));
      });
  } catch (err) {
    dispatch(uploadFailure(err.message || 'An error occurred while uploading the images.'));
  }
};
