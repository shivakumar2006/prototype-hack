import React from "react";
import { motion } from "framer-motion";
import {
    CloudRain,
    ThermometerSun,
    Droplets,
    AlertTriangle,
    BarChart3,
    Sparkles,
} from "lucide-react";

import { useLocation } from "react-router-dom";
import { useGetCurrentWeatherQuery, useGetForecastQuery } from "../redux/api/weatherApi";

// Recharts
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
} from "recharts";

export default function AdvisoryDashboard() {
    const routerLocation = useLocation();

    const city = routerLocation.state?.location || "Ghaziabad";
    const crop = routerLocation.state?.crop || "Wheat";

    // Weather API Calls
    const { data, isLoading, error } = useGetCurrentWeatherQuery(city);
    const { data: forecastData } = useGetForecastQuery(city);

    if (isLoading) {
        return (
            <h1 className="text-center mt-20 text-xl">
                Loading Weather Data...
            </h1>
        );
    }

    if (error) {
        return (
            <h1 className="text-center mt-20 text-xl text-red-500">
                Error fetching weather
            </h1>
        );
    }

    // Map Current Weather
    const weatherData = {
        location: city,
        crop: crop,
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        cloud: data.clouds.all || 0,
    };

    // Forecast → Temperature Chart Data
    const tempChartData = forecastData
        ? forecastData.list.slice(0, 5).map((item) => ({
            time: new Date(item.dt_txt).toLocaleString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            temp: Math.round(item.main.temp),
        }))
        : [];


    // Forecast → Humidity + Cloud Bar Chart
    const humidityCloudChartData = forecastData
        ? forecastData.list.slice(0, 5).map((item) => ({
            time: new Date(item.dt_txt).toLocaleString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            humidity: item.main.humidity,
            cloud: item.clouds.all,
        }))
        : [];

    // risk score 
    let riskScore = 0;

    // temperature impact
    if (weatherData.temperature > 38) riskScore += 35;
    else if (weatherData.temperature > 32) riskScore += 20;

    // humidity impact
    if (weatherData.humidity > 85) riskScore += 30;
    if (weatherData.humidity > 70) riskScore += 15;

    //cloud impact 
    if (weatherData.cloud > 80) riskScore += 35;
    if (weatherData.cloud > 60) riskScore += 20;

    // Risk Logic
    let riskLevel = "Low";

    if (riskScore >= 70) riskLevel = "High";
    else if (riskScore >= 40) riskLevel = "Medium";

    if (weatherData.temperature > 38 || weatherData.cloud > 70) {
        riskLevel = "High";
    } else if (weatherData.temperature > 32 || weatherData.cloud > 50) {
        riskLevel = "Medium";
    }

    let advisory = "";
    let prediction = "";

    // HIGH RISK
    if (riskLevel === "High") {

        if (crop === "Rice") {
            advisory = "High moisture and cloud cover detected. Monitor for fungal diseases and ensure field drainage.";
            prediction = "High chance of crop disease in next 24 hours.";
        }

        else if (crop === "Wheat") {
            advisory = "High temperature stress possible. Increase irrigation and monitor leaf dryness.";
            prediction = "Yield stress risk in next 24 hours.";
        }

        else if (crop === "Maize") {
            advisory = "High weather instability detected. Protect young plants from excess moisture.";
            prediction = "Growth instability possible tomorrow.";
        }

        else {
            advisory = "Severe weather risk detected. Monitor crop conditions closely.";
            prediction = "Weather may impact crop health in next 24 hours.";
        }
    }

    // MEDIUM RISK
    else if (riskLevel === "Medium") {

        if (crop === "Rice") {
            advisory = "Moderate humidity detected. Maintain proper water level and monitor pests.";
            prediction = "Moderate fungal risk tomorrow.";
        }

        else if (crop === "Wheat") {
            advisory = "Moderate temperature rise expected. Maintain irrigation schedule.";
            prediction = "Mild crop stress possible tomorrow.";
        }

        else {
            advisory = "Moderate weather changes expected. Monitor crop condition.";
            prediction = "Minor weather impact expected.";
        }
    }

    // LOW RISK
    else {
        advisory = "Weather conditions are stable. Continue normal farming practices.";
        prediction = "Stable crop conditions expected tomorrow.";
    }

    const riskColor =
        riskLevel === "High"
            ? "from-red-500 to-red-600"
            : riskLevel === "Medium"
                ? "from-yellow-500 to-orange-500"
                : "from-green-500 to-emerald-600";

    const cardAnimation = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-100 via-white to-green-100 p-6">
            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
                        Krishi Smart Advisory
                    </h1>

                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                        <Sparkles size={16} />
                        {weatherData.location} • {weatherData.crop}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
                    <motion.div {...cardAnimation} className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-7">
                        <div className="flex items-center justify-between mb-4">
                            <ThermometerSun className="text-orange-500" />
                            <span className="text-sm text-gray-400">Temperature</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {weatherData.temperature}°C
                        </h2>
                    </motion.div>

                    <motion.div {...cardAnimation} className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-7">
                        <div className="flex items-center justify-between mb-4">
                            <Droplets className="text-blue-500" />
                            <span className="text-sm text-gray-400">Humidity</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {weatherData.humidity}%
                        </h2>
                    </motion.div>

                    <motion.div {...cardAnimation} className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-7">
                        <div className="flex items-center justify-between mb-4">
                            <CloudRain className="text-indigo-500" />
                            <span className="text-sm text-gray-400">Cloud %</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {weatherData.cloud}%
                        </h2>
                    </motion.div>

                    <motion.div {...cardAnimation} className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-7">
                        <div className="flex items-center justify-between mb-4">
                            <AlertTriangle className="text-red-500" />
                            <span className="text-sm text-gray-400">Risk Level</span>
                        </div>
                        <div className={`text-white text-center py-3 rounded-2xl font-semibold bg-gradient-to-r ${riskColor}`}>
                            {riskLevel}
                        </div>
                    </motion.div>
                </div>

                {/* Charts Section */}
                <div className="grid lg:grid-cols-2 gap-7 mt-10">

                    {/* Temperature Line Chart */}
                    <motion.div {...cardAnimation} className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8">
                        <div className="flex items-center gap-2 mb-5">
                            <BarChart3 className="text-green-600" />
                            <h3 className="text-xl font-semibold text-gray-800">
                                Temperature Forecast Trend
                            </h3>
                        </div>

                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={tempChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="temp" stroke="#16a34a" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Humidity + Cloud Bar Chart */}
                    <motion.div {...cardAnimation} className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8">
                        <div className="flex items-center gap-2 mb-5">
                            <BarChart3 className="text-blue-600" />
                            <h3 className="text-xl font-semibold text-gray-800">
                                Humidity & Cloud Forecast
                            </h3>
                        </div>

                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={humidityCloudChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="humidity" fill="#3b82f6" />
                                    <Bar dataKey="cloud" fill="#6366f1" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

                {/* Advisory */}
                <div className="mt-10">
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-5">
                            Smart Advisory
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {advisory}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
