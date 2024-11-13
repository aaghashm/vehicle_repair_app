import React, { useState, useEffect } from 'react';
import './LocalServiceShop.css'; // Importing custom styles

function LocalServiceShop() {
    const [location, setLocation] = useState('');
    const [shops, setShops] = useState([]);
    const [nearbyShops, setNearbyShops] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetching all shops initially
        const fetchShops = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/shops");
                if (response.ok) {
                    const data = await response.json();
                    setShops(data);
                    setNearbyShops(data); // Display all shops initially
                } else {
                    setError('Error fetching shops');
                }
            } catch (error) {
                setError('Error fetching shops');
            }
        };
        fetchShops();
    }, []);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const findShops = () => {
        // Filter shops based on location input
        const filteredShops = shops.filter(shop => 
            shop.city.toLowerCase().includes(location.toLowerCase())
        );
        setNearbyShops(filteredShops);
    };

    return (
        <div className="local-service-shop">
            <h2>Find a Local Service Shop</h2>
            <input
                type="text"
                placeholder="Enter your city"
                value={location}
                onChange={handleLocationChange}
                className="location-input"
            />
            <button onClick={findShops} className="find-shops-button">Find Shops</button>
            
            {error && <p className="error-message">{error}</p>}

            <div className="shop-list">
                <h3>Available Shops</h3>
                <table className="shop-table">
                    <thead>
                        <tr>
                            <th>#</th> {/* Serial number column */}
                            <th>Shop Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Pincode</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nearbyShops.length > 0 ? (
                            nearbyShops.map((shop, index) => (
                                <tr key={shop.shopID}>
                                    <td>{index + 1}</td> {/* Displaying serial number */}
                                    <td>{shop.name}</td>
                                    <td>{shop.address}</td>
                                    <td>{shop.city}</td>
                                    <td>{shop.pincode}</td>
                                    <td>{shop.phone}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No shops found for the entered location.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LocalServiceShop;
