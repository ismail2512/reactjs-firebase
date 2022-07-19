import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Data_services from '../../services/Data_services';
import Table from 'react-bootstrap/Table';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const DataList = ({ getListId }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getStores();
  }, []);

  const getStores = async () => {
    const data = await Data_services.getAllData();
    setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await Data_services.deleteData(id);
    getStores();
  };
  return (
    <>
      <div className="navigation">
        <Link to="/">
          <span className="navigation-link">Add Stores</span>
        </Link>
      </div>
      <div className="container-fluid" style={{ marginTop: '20px' }}>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Store Name</th>
              <th>Responsible Person</th>
              <th>Mobile</th>
              <th>Phone</th>
              <th>Size</th>
              <th>Address</th>
              <th>Descriptions</th>
              <th>Location</th>

              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {list.map((doc, index) => {
              const link = 'https://www.google.com/maps/search/?api=1&query=';
              const linkCoordinates = link + doc.coordinates;

              return (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={doc.link}
                      alt=""
                      style={{ width: '100px', height: '100px' }}
                    />
                  </td>
                  <td>{doc.grocery_name}</td>
                  <td>{doc.responsible}</td>
                  <td>{doc.mobile}</td>
                  <td>{doc.phone}</td>
                  <td>{doc.size}</td>
                  <td>{doc.address}</td>
                  <td>{doc.description}</td>

                  <td>
                    <a href={linkCoordinates}>
                      <LocationOnIcon fontSize="large" color="danger" />
                    </a>
                  </td>

                  <td>
                    <button
                      onClick={(e) => deleteHandler(doc.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default DataList;
