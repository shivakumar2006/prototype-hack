import React from "react";
import { motion } from "framer-motion";
import {
    CloudRain,
    ThermometerSun,
    Droplets,
    AlertTriangle,
    BarChart3,
    Sparkles
} from "lucide-react";

export default function AdvisoryDashboard() {
    // Dummy data (Replace later with API data)
    const data = {
        location: "Ghaziabad",
        crop: "Wheat",
        temperature: 34,
        humidity: 78,
        rainChance: 65,
        riskLevel: "Medium",
        advisory:
            "Moderate rainfall expected. Maintain proper field drainage and monitor crop for fungal infection."
    };

    const riskColor =
        data.riskLevel === "High"
            ? "from-red-500 to-red-600"
            : data.riskLevel === "Medium"
                ? "from-yellow-500 to-orange-500"
                : "from-green-500 to-emerald-600";

    const cardAnimation = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-100 via-white to-green-100 p-6">
            {/* Background Glow */}
            <div className="absolute w-[600px] h-[600px] bg-green-300/20 blur-3xl rounded-full -top-40 -left-40" />
            <div className="absolute w-[500px] h-[500px] bg-emerald-400/20 blur-3xl rounded-full -bottom-40 -right-40" />

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
                        {data.location} • {data.crop}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
                    {/* Temperature */}
                    <motion.div {...cardAnimation} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-7">
                        <div className="flex items-center justify-between mb-4">
                            <ThermometerSun className="text-orange-500" />
                            <span className="text-sm text-gray-400">Temperature</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {data.temperature}°C
                        </h2>
                    </motion.div>

                    {/* Humidity */}
                    <motion.div {...cardAnimation} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-7">
                        <div className="flex items-center justify-between mb-4">
                            <Droplets className="text-blue-500" />
                            <span className="text-sm text-gray-400">Humidity</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {data.humidity}%
                        </h2>
                    </motion.div>

                    {/* Rain */}
                    <motion.div {...cardAnimation} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-7">
                        <div className="flex items-center justify-between mb-4">
                            <CloudRain className="text-indigo-500" />
                            <span className="text-sm text-gray-400">Rain Chance</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {data.rainChance}%
                        </h2>
                    </motion.div>

                    {/* Risk */}
                    <motion.div {...cardAnimation} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-7">
                        <div className="flex items-center justify-between mb-4">
                            <AlertTriangle className="text-red-500" />
                            <span className="text-sm text-gray-400">Risk Level</span>
                        </div>
                        <div className={`text-white text-center py-3 rounded-2xl font-semibold bg-gradient-to-r ${riskColor}`}>
                            {data.riskLevel}
                        </div>
                    </motion.div>
                </div>

                {/* Advisory + Chart Section */}
                <div className="grid lg:grid-cols-2 gap-7 mt-10">
                    {/* Advisory Card */}
                    <motion.div {...cardAnimation} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-5">
                            Smart Advisory
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {data.advisory}
                        </p>
                    </motion.div>

                    {/* Chart Placeholder */}
                    <motion.div {...cardAnimation} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8">
                        <div className="flex items-center gap-2 mb-5">
                            <BarChart3 className="text-green-600" />
                            <h3 className="text-xl font-semibold text-gray-800">
                                5 Day Forecast Trend
                            </h3>
                        </div>

                        <div className="h-56 bg-green-50 rounded-2xl flex items-center justify-center text-gray-400">
                            Chart will be shown here
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
