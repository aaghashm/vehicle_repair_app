// src/components/Statistics.js
import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import './Statistics.css'; // Import the CSS file for styling

const API_URL_USERS = 'http://127.0.0.1:8080/api/users';
const API_URL_VEHICLES = 'http://127.0.0.1:8080/api/vehicles';
const API_URL_SHOPS = 'http://127.0.0.1:8080/api/shops';
const API_URL_ADMINS = 'http://127.0.0.1:8080/api/admins';

function Statistics() {
    const [userCount, setUserCount] = useState(0);
    const [vehicleCount, setVehicleCount] = useState(0);
    const [shopCount, setShopCount] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [cities, setCities] = useState([]);
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [users, vehicles, shops, admins] = await Promise.all([
                    fetch(API_URL_USERS).then(res => res.json()),
                    fetch(API_URL_VEHICLES).then(res => res.json()),
                    fetch(API_URL_SHOPS).then(res => res.json()),
                    fetch(API_URL_ADMINS).then(res => res.json())
                ]);
                setUserCount(users.length);
                setVehicleCount(vehicles.length);
                setShopCount(shops.length);
                setAdminCount(admins.length);
                setUsers(users);
                setAdmins(admins);

                // Extract vehicle types and cities
                const vehicleTypeCounts = {};
                vehicles.forEach(v => {
                    vehicleTypeCounts[v.vehicleType] = (vehicleTypeCounts[v.vehicleType] || 0) + 1;
                });
                setVehicleTypes(Object.entries(vehicleTypeCounts).map(([type, count]) => ({ type, count })));

                const cityCounts = {};
                shops.forEach(shop => {
                    cityCounts[shop.city] = (cityCounts[shop.city] || 0) + 1;
                });
                setCities(Object.entries(cityCounts).map(([city, count]) => ({ city, count })));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCounts();
    }, []);

    const dataVehicleTypes = {
        labels: vehicleTypes.map(vt => vt.type),
        datasets: [
            {
                label: 'Vehicle Types',
                data: vehicleTypes.map(vt => vt.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const dataUsersVsAdmins = {
        labels: ['Users', 'Admins'],
        datasets: [
            {
                label: 'Count',
                data: [userCount, adminCount],
                backgroundColor: ['#FF6384', '#36A2EB'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const dataShopsByCity = {
        labels: cities.map(c => c.city),
        datasets: [
            {
                label: 'Shops by City',
                data: cities.map(c => c.count),
                backgroundColor: '#FFCE56',
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="statistics-container">
            <h2>Dashboard</h2>
            <div className="stats-summary">
                <div className="stat-item">Users: {userCount}</div>
                <div className="stat-item">Vehicles: {vehicleCount}</div>
                <div className="stat-item">Shops: {shopCount}</div>
                <div className="stat-item">Admins: {adminCount}</div>
            </div>
            <div className="charts-container">
                <div className="chart-section chart-section--half">
                    <h3>Users vs Admins</h3>
                    <div className="chart">
                        <Chart type="bar" data={dataUsersVsAdmins} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>
                <div className="chart-section chart-section--half">
                    <h3>Vehicle Types</h3>
                    <div className="chart">
                        <Chart type="pie" data={dataVehicleTypes} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>
                <div className="chart-section">
                    <h3>Shops by City</h3>
                    <div className="chart">
                        <Chart type="bar" data={dataShopsByCity} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
