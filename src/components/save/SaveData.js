import React, { useState, useEffect } from 'react';
import Data_services from '../../services/Data_services';
import { Link } from 'react-router-dom';
import './save.css';
import { storage } from '../../Firebase';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { Audio } from 'react-loader-spinner';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
const SaveData = () => {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(
    'https://www.clipartmax.com/png/full/158-1586627_camera-image-material-icon-camera-png-image-icon.png'
  );
  const [data, setData] = useState({
    grocery_name: '',
    responsible: '',
    mobile: '',
    phone: '',
    address: '',
    description: '',
    coordinates: '',
    size: '',
    error: false,
    msg: '',
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((p) => {
      setData({ lat: p.coords.latitude, lon: p.coords.longitude });
    });
  }, []);
  const latitude = data.lat;
  const longitude = data.lon;
  const coordinate = latitude + ', ' + longitude;
  //setData({ coordinates: coordinate });
  const {
    grocery_name,
    responsible,
    mobile,
    phone,
    address,
    description,
    coordinates,
    size,
    msg,
  } = data;
  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setData({ ...data, [name]: value });
  };
  const previewImage = (e) => {
    const [files] = e.target.files;

    setImg(URL.createObjectURL(files));
  };

  const uploadImage = async (file) => {
    if (!file) return;

    const storageRef = ref(storage, `groceries/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        let prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            console.log(url);
            insertData(url);
          })
          .then(() => {
            setOpen(false);
          });
      }
    );
  };

  const insertData = async (url) => {
    try {
      const addNewData = {
        grocery_name: data.grocery_name,
        responsible: data.responsible,
        mobile: data.mobile,
        phone: data.phone,
        address: data.address,
        description: data.description,
        coordinates: data.coordinates,
        size: data.size,
        link: url,
      };
      console.log(addNewData);
      const savedDataToCheck = await Data_services.addData(addNewData);

      if (savedDataToCheck) {
        setData({ error: false, msg: 'Data has been added successfully' });

        setData({
          grocery_name: '',
          responsible: '',
          mobile: '',
          phone: '',
          address: '',
          description: '',
          coordinates: '',
          size: '',
          error: false,
          msg: '',
        });
        setProgress(0);

        setImg(
          'https://www.clipartmax.com/png/full/158-1586627_camera-image-material-icon-camera-png-image-icon.png'
        );
      }
    } catch (err) {
      console.log(err);
      setData({ error: true, msg: err.message });
    }
  };
  const postData = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadImage(file);
  };

  return (
    <>
      <div className="navigation">
        <Link to="/Data-List">
          <span className="navigation-link">View Stores List</span>
        </Link>
      </div>
      <form onSubmit={postData}>
        <div className="file-container">
          <label>
            <input
              type="file"
              accept="image/*; capture=camera"
              onChange={previewImage}
              name="files"
              id="files"
              className="fileSelection"
            />
            <img src={img} alt="" style={{ width: '200px', height: '160px' }} />
          </label>
        </div>

        <div className="container-main">
          <div>
            <p>Grocery Name</p>
            <input
              autoComplete="off"
              placeholder="Enter Grocery Name"
              className="textBox"
              type="text"
              name="grocery_name"
              required
              value={data.grocery_name}
              onChange={getUserData}
            />
          </div>
          <div>
            <p>Responsible Person </p>
            <input
              placeholder="Enter Responsible Person Name"
              type="text"
              autoComplete="off"
              className="textBox"
              name="responsible"
              required
              value={data.responsible}
              onChange={getUserData}
            />
          </div>
          <div>
            <p>Mobile</p>
            <input
              placeholder="Enter Mobile Number"
              type="number"
              autoComplete="off"
              className="textBox"
              name="mobile"
              required
              value={data.mobile}
              onChange={getUserData}
            />
          </div>
          <div>
            <p>Phone</p>
            <input
              placeholder="Enter Phone Number"
              className="textBox"
              autoComplete="off"
              type="number"
              name="phone"
              required
              value={data.phone}
              onChange={getUserData}
            />
          </div>
          <div>
            <p>Address</p>
            <input
              placeholder="Enter District and address"
              className="textBox"
              type="text"
              autoComplete="off"
              name="address"
              required
              value={data.address}
              onChange={getUserData}
            />
          </div>
          <div>
            <p>Description</p>
            <textarea
              placeholder="Enter Description about Grocery Store"
              style={{
                width: '90%',
                height: '80px',
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
              name="description"
              required
              autoComplete="off"
              value={data.description}
              onChange={getUserData}
            />
          </div>
          <div>
            <div>
              <p>Size</p>
              <select onChange={getUserData} name="size" className="textBox">
                <option disabled>Select Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            <p>Coordinates</p>
            <input
              className="textBox"
              type="text"
              autoComplete="off"
              name="coordinates"
              value={data.coordinates}
              onChange={getUserData}
            />
          </div>
          <div>
            <p></p>
            <button
              type="submit"
              className="save-button"
              onClick={() => {
                if (
                  grocery_name === '' ||
                  responsible === '' ||
                  mobile === '' ||
                  phone === '' ||
                  phone === '' ||
                  address === '' ||
                  description === '' ||
                  coordinates === '' ||
                  size === ''
                ) {
                  setOpen(false);
                } else {
                  setOpen(true);
                }
              }}
            >
              Save
            </button>
          </div>
          <div>
            <p>{msg}</p>
          </div>
        </div>

        {/*container main closesed*/}
      </form>
      <Dialog open={open} onClose={open}>
        <DialogTitle id="alert-dialog-title">{progress}%</DialogTitle>
        <Audio
          height="120"
          width="120"
          color="darkslateblue"
          ariaLabel="loading"
        />
      </Dialog>
    </>
  );
};

export default SaveData;
