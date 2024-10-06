import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL="https://jsonplaceholder.typicode.com/users";
const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    lat: "",
    lng: "",
    company: "",
    catchPhrase: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch data from API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleAddUser = () => {
    if (!formData.name || !formData.email || !formData.phone) return;

    const newUser = {
      id: data.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode,
        geo: {
          lat: formData.lat,
          lng: formData.lng,
        },
      },
      company: {
        name: formData.company,
        catchPhrase: formData.catchPhrase,
      },
    };

    setData([...data, newUser]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      lat: "",
      lng: "",
      company: "",
      catchPhrase: "",
    });
  };

  // Edit user
  const handleEditUser = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      street: user.address.street,
      suite: user.address.suite,
      city: user.address.city,
      zipcode: user.address.zipcode,
      lat: user.address.geo.lat,
      lng: user.address.geo.lng,
      company: user.company.name,
      catchPhrase: user.company.catchPhrase,
    });
    setEditingUser(user);
  };

  // Save edited user
  const handleSaveUser = () => {
    setData(
      data.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              ...formData,
              address: {
                street: formData.street,
                suite: formData.suite,
                city: formData.city,
                zipcode: formData.zipcode,
                geo: { lat: formData.lat, lng: formData.lng },
              },
              company: { name: formData.company, catchPhrase: formData.catchPhrase },
            }
          : user
      )
    );
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      lat: "",
      lng: "",
      company: "",
      catchPhrase: "",
    });
  };

  // Delete user
  const handleDeleteUser = (id) => {
    setData(data.filter((user) => user.id !== id));
  };

  return (
    <div className="container-fluid">
  <h2 className="text-center my-4">User Management</h2>

  <div className="form-group row">
    <div className="col-md-4 mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="form-control" />
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="email" className="form-label">Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="form-control" />
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="phone" className="form-label">Phone</label>
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="form-control" />
    </div>

    <div className="col-md-4 mb-3">
      <label htmlFor="street" className="form-label">Street</label>
      <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Street" className="form-control" />
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="suite" className="form-label">Suite</label>
      <input type="text" name="suite" value={formData.suite} onChange={handleChange} placeholder="Suite" className="form-control" />
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="city" className="form-label">City</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="form-control" />
    </div>

    <div className="col-md-4 mb-3">
      <label htmlFor="zipcode" className="form-label">Zipcode</label>
      <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} placeholder="Zipcode" className="form-control" />
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="lat" className="form-label">Latitude</label>
      <input type="text" name="lat" value={formData.lat} onChange={handleChange} placeholder="Latitude" className="form-control" />
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="lng" className="form-label">Longitude</label>
      <input type="text" name="lng" value={formData.lng} onChange={handleChange} placeholder="Longitude" className="form-control" />
    </div>

    <div className="col-md-6 mb-3">
      <label htmlFor="company" className="form-label">Company Name</label>
      <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" className="form-control" />
    </div>
    <div className="col-md-6 mb-3">
      <label htmlFor="catchPhrase" className="form-label">Company Catchphrase</label>
      <input type="text" name="catchPhrase" value={formData.catchPhrase} onChange={handleChange} placeholder="Catchphrase" className="form-control" />
    </div>

    <div className="col-12">
      {editingUser ? (
        <button onClick={handleSaveUser} className="btn btn-success">Save User</button>
      ) : (
        <button onClick={handleAddUser} className="btn btn-primary">Add User</button>
      )}
    </div>
  </div>

  <table className="table table-bordered table-striped table-hover">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Street</th>
        <th>Suite</th>
        <th>City</th>
        <th>Zipcode</th>
        <th>Lat</th>
        <th>Lng</th>
        <th>Company</th>
        <th>Catchphrase</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.address.street}</td>
          <td>{user.address.suite}</td>
          <td>{user.address.city}</td>
          <td>{user.address.zipcode}</td>
          <td>{user.address.geo.lat}</td>
          <td>{user.address.geo.lng}</td>
          <td>{user.company.name}</td>
          <td>{user.company.catchPhrase}</td>
          <td>
            <button onClick={() => handleEditUser(user)} className="btn btn-warning btn-sm">Edit</button>
            <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
};

export default App;
