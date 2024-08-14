    import React, { useEffect, useState } from 'react';
import './BookingPage.css';

    function BookingPage() {
    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({
    vehicleType: '',
    brand: '',
    problemDescription: '',
    city: '',
    });

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
    if (user) {
        fetchBookings();
    }
    }, [user]);

    const fetchBookings = async () => {
    const response = await fetch(`http://localhost:8080/api/bookings/user?email=${user.email}`);
    const data = await response.json();
    setBookings(data);
    };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
        alert('Please log in to book a service.');
        return;
    }
    const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newBooking, user: { email: user.email } }),
    });
    if (response.ok) {
        fetchBookings();
        setNewBooking({ vehicleType: '', brand: '', problemDescription: '', city: '' });
    }
    };

    return (
    <div className="booking-container">
        <h2>Book a Service</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
        <input
            type="text"
            name="vehicleType"
            value={newBooking.vehicleType}
            onChange={handleChange}
            placeholder="Vehicle Type"
            required
        />
        <input
            type="text"
            name="brand"
            value={newBooking.brand}
            onChange={handleChange}
            placeholder="Brand"
            required
        />
        <textarea
            name="problemDescription"
            value={newBooking.problemDescription}
            onChange={handleChange}
            placeholder="Describe the problem"
            required
        />
        <input
            type="text"
            name="city"
            value={newBooking.city}
            onChange={handleChange}
            placeholder="City"
            required
        />
        <button type="submit">Book Service</button>
        </form>

        <h2>Your Bookings</h2>
        <div className="booking-list">
        {!user ? (
            <p>Please log in to view your bookings.</p>
        ) : bookings.length === 0 ? (
            <p>No bookings found</p>
        ) : (
            bookings.map((booking) => (
            <div key={booking.bookingID} className="booking-item">
                <p><strong>Vehicle:</strong> {booking.vehicleType} ({booking.brand})</p>
                <p><strong>Problem:</strong> {booking.problemDescription}</p>
                <p><strong>City:</strong> {booking.city}</p>
                <p><strong>Status:</strong> {booking.isCompleted ? 'Completed' : 'Pending'}</p>
            </div>
            ))
        )}
        </div>
    </div>
    );
    }

    export default BookingPage;
