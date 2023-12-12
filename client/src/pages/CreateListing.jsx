import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true);
        setImageUploadError(false); 
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
        //   jab uploading complete hua so set uploading false
          setImageUploadError(false);
          setUploading(false)
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  //   DELETE IMAGE FUNCTION

  //filter method ka use kiye hai . jo image ko delete kiye hai , uska index ko compare karenge current element (url) ke index (i) se , so jo index equal nahi hoga i se usko imageurls mai rakhenge and jo match hogaya usko filter out kar denge.
  //(url ke jagah hum _(underscore)  bhi rakh skte hai , because url ko use hi ni karre)

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url, i) => i !== index),
    });
  };

  return (
    <main className="max-w-4xl mx-auto p-3">
      <h1 className="font-semibold text-3xl text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 ">
        {/* input and checkbox section div */}
        <div className="flex flex-col gap-4 flex-1 ">
          {/* INPUT AREA */}
          <input
            type="text"
            id="name"
            maxLength={62}
            minLength={10}
            required
            placeholder="Name"
            className="p-3 border rounded-lg focus:outline-none"
          />
          <textarea
            type="text"
            id="description"
            required
            placeholder="Description"
            className="p-3 border rounded-lg focus:outline-none"
          />
          <input
            type="text"
            id="address"
            maxLength={62}
            minLength={10}
            required
            placeholder="Address"
            className="p-3 border rounded-lg focus:outline-none "
          />

          {/* checkboxes 01 */}

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="border-black w-5" />
              <span>Furnish</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="border-black w-5" />
              <span>Offer</span>
            </div>
          </div>

          {/* checkboxes 02 */}
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 rounded-lg border-solid  border border-gray-400"
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 rounded-lg border border-gray-400"
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 rounded-lg border border-gray-400"
              />
              <div className="flex flex-col text-center">
                <p>Regular Price</p>
                <span>(₹/month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 rounded-lg border border-gray-400"
              />
              <div className="flex flex-col text-center">
                <p>Discounted Price</p>
                <span>(₹/month)</span>
              </div>
            </div>
          </div>
        </div>

        {/* image and button section div */}
        <div className="flex flex-col flex-1 gap-4">
          <p>
            Images :
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover(max 6)
            </span>
          </p>
          {/* choose file and upload button seprate div */}
          <div className="flex gap-4">
            <input
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              className="p-3 border border-gray-300 rounded-lg w-full"
              type="file"
              accept="image/*"
              multiple
            />
            <button
              type="button"
               disabled ={uploading}
              onClick={handleImageSubmit}
              className="bg-green-50 p-3 text-green-700 border border-green-700  rounded-lg uppercase hover:shadow-lg  disabled:opacity-80"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {/* CREATE LISTING BUTTON */}
          <button className="bg-slate-700 p-3 rounded-lg text-white font-semibold uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing    
          </button>
          <p className="text-red-700 text-sm text-center">
            {/* agar imageUploadError true hua so imageUploadError throw karega. */}
            {imageUploadError && imageUploadError}
          </p>
          {
            //agar error nahi h and images upload hogyi to usse client ko show karna hai.
            formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border border-gray-300 rounded-lg"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="rounded-lg w-40 h-30 object-cover"
                  />
                  <button
                    onClick={()=>handleRemoveImage(index)}
                    className="text-red-700 p-3 rounded-lg uppercase font-semibold hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))
          }
        </div>
      </form>
    </main>
  );
}
