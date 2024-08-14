import React, { useState } from 'react';

function LocalServiceShop() {
    const [location, setLocation] = useState('');
    const [nearbyShops, setNearbyShops] = useState([]);
    const [error, setError] = useState('');

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const findShops = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/shops");
            if (response.ok) {
                const shops = await response.json();
                const filteredShops = shops.filter(shop => shop.city.toLowerCase().includes(location.toLowerCase()));
                setNearbyShops(filteredShops);
            } else {
                setError('Error fetching shops');
            }
        } catch (error) {
            setError('Error fetching shops');
        }
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
            <button onClick={findShops}>Find Shops</button>
            {error && <p>{error}</p>}
            {nearbyShops.length > 0 ? (
                <div>
                    <h3>Nearby Shops</h3>
                    <ul>
                        {nearbyShops.map(shop => (
                            <li key={shop.shopID}>
                                <h4>{shop.name}</h4>
                                <p>{shop.address}, {shop.city}</p>
                                <p>Pincode: {shop.pincode}</p>
                                <p>Phone: {shop.phone}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No shops found for the entered location.</p>
            )}
        </div>
    );
}

export default LocalServiceShop;