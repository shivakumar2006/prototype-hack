import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloudSun, Wheat, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
    const [location, setLocation] = useState("");
    const [crop, setCrop] = useState("");
    const navigate = useNavigate();

    const crops = ["Wheat", "Rice", "Maize", "Sugarcane", "Potato"];

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/dashboard", {
            state: { location, crop },
        });
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-100 via-white to-green-100 flex items-center justify-center p-6">
            {/* Background Glow */}
            <div className="absolute w-[600px] h-[600px] bg-green-300/20 blur-3xl rounded-full -top-40 -left-40" />
            <div className="absolute w-[500px] h-[500px] bg-emerald-400/20 blur-3xl rounded-full -bottom-40 -right-40" />

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-xl"
            >
                <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-2xl rounded-3xl p-10">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ rotate: -10, scale: 0.8 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center mb-5"
                        >
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-5 rounded-3xl shadow-lg">
                                <CloudSun className="w-10 h-10 text-white" />
                            </div>
                        </motion.div>

                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
                            Krishi Smart Advisory
                        </h1>

                        <p className="text-gray-500 text-sm mt-3 flex items-center justify-center gap-2">
                            <Sparkles size={14} />
                            AI Powered Weather Based Crop Intelligence
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-7">
                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-green-600" />
                                Farm Location
                            </label>

                            <input
                                type="text"
                                placeholder="Enter city (e.g. Ghaziabad)"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-green-500 transition shadow-sm"
                                required
                            />
                        </div>

                        {/* Crop */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Wheat className="w-4 h-4 text-green-600" />
                                Select Crop
                            </label>

                            <select
                                value={crop}
                                onChange={(e) => setCrop(e.target.value)}
                                className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-green-500 transition shadow-sm"
                                required
                            >
                                <option value="">Choose Crop</option>
                                {crops.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="w-full h-14 rounded-2xl text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                            Generate Smart Advisory
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <div className="mt-10 text-center text-xs text-gray-400">
                        Powered by Real-time Weather Intelligence • Prototype v1
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
