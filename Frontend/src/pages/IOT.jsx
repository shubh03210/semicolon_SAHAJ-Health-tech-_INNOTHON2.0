import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLocalStorage } from "react-use";
import { requestDevice, getDeviceInfo } from "web-bluetooth";

const DEVICE_NAME = "Sahaj Perceptron";
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const HEARTRATE_CHAR_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
const SPO2_CHAR_UUID = "92a6c5ed-7ef9-4ef3-b0c4-d6b5de0a8c20";
const IR_VALUE_CHAR_UUID = "78d27e4e-aa05-4d8c-9bc6-3c6c78c8a05f";

const SPO2_RANGES = {
  DANGER: { min: 0, max: 89, color: "#f87171" },    
  WARNING: { min: 90, max: 94, color: "#facc15" },  
  GOOD: { min: 95, max: 100, color: "#4ade80" }     
};

const HR_RANGES = {
  LOW: { min: 0, max: 59, color: "#f87171" },       // Red - too low
  LOW_NORMAL: { min: 60, max: 69, color: "#facc15" }, // Yellow - borderline low
  NORMAL: { min: 70, max: 90, color: "#4ade80" },   // Green - good
  HIGH_NORMAL: { min: 91, max: 100, color: "#facc15" }, // Yellow - borderline high
  HIGH: { min: 101, max: 200, color: "#f87171" }    // Red - too high
};

const Gauge = ({ value, label, unit, max = 100 }) => {
  const angle = (value / max) * 180 - 90;
  const rotate = useMotionValue(-90);
  const spring = useSpring(rotate, { stiffness: 80, damping: 14 });
  
  useEffect(() => {
    rotate.set(angle);
  }, [value, angle, rotate]);

  // Define the tick marks and their values
  const ticks = label === "SpO₂" 
    ? [80, 85, 90, 95, 100] // SpO₂ ticks
    : [0, 50, 100, 150, 200]; // Heart rate ticks
  
  const getColorByValue = (val, isSpO2 = false) => {
    if (isSpO2) {
      // SpO2 specific colors
      if (val < 90) return "#f87171"; // Red - danger
      if (val < 95) return "#facc15"; // Yellow - warning
      return "#4ade80"; // Green - good
    } else {
      // Heart rate colors
      if (val < 60 || val > 100) return "#f87171"; // Red - too low or too high
      if ((val >= 60 && val < 70) || (val > 90 && val <= 100)) return "#facc15"; // Yellow - borderline
      return "#4ade80"; // Green - good (70-90)
    }
  };

  // Calculate background gradient for the arc
  const getGradientColors = (isSpO2) => {
    if (isSpO2) {
      return [
        { offset: "0%", color: "#f87171" },
        { offset: "40%", color: "#facc15" },
        { offset: "70%", color: "#4ade80" }
      ];
    } else {
      return [
        { offset: "0%", color: "#f87171" },
        { offset: "30%", color: "#facc15" },  
        { offset: "45%", color: "#4ade80" },
        { offset: "55%", color: "#4ade80" },
        { offset: "70%", color: "#facc15" },
        { offset: "100%", color: "#f87171" }
      ];
    }
  };

  const gradientColors = getGradientColors(label === "SpO₂");
  const gaugeColor = getColorByValue(value, label === "SpO₂");
  const valuePercent = (value / max) * 100;
  
  return (
    <div className="relative w-72 h-40 mx-auto mt-10">
      {/* Background Arc with Gradient */}
      <svg viewBox="0 0 200 120" className="w-full h-full">
        <defs>
          <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            {gradientColors.map((gc, i) => (
              <stop key={i} offset={gc.offset} stopColor={gc.color} />
            ))}
          </linearGradient>
        </defs>

        {/* Background Arc with Gradient */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={`url(#gradient-${label})`}
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* Value Indicator Arc */}
        <path
          d={`M 20 100 A 80 80 0 0 1 ${20 + (160 * Math.min(valuePercent, 100) / 100)} 100`}
          fill="none"
          stroke={gaugeColor}
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Tick marks and labels */}
        {ticks.map((tick, i) => {
          // Calculate position of each tick on the arc
          const tickPercent = tick / max;
          const tickAngle = tickPercent * Math.PI;
          
          // Position for the text label (further out)
          const labelX = 100 - 105 * Math.cos(tickAngle);
          const labelY = 100 - 105 * Math.sin(tickAngle);
          
          return (
            <g key={i}>
              {/* Tick mark */}
              <line 
                x1={100 - 75 * Math.cos(tickAngle)} 
                y1={100 - 75 * Math.sin(tickAngle)}
                x2={100 - 85 * Math.cos(tickAngle)}
                y2={100 - 85 * Math.sin(tickAngle)}
                stroke="white" 
                strokeWidth="2"
              />
              
              {/* Tick value */}
              <text 
                x={labelX} 
                y={labelY} 
                fill="white" 
                fontSize="8"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {tick}
              </text>
            </g>
          );
        })}
        
        {/* Center point */}
        <circle cx="100" cy="100" r="4" fill="#333" stroke="white" strokeWidth="1" />
      </svg>

      {/* Needle */}
      <motion.div
        className="absolute top-[100px] left-1/2 w-[3px] h-[75px] bg-gradient-to-t from-white to-gray-400 -translate-x-[1.5px] rounded-t-full shadow-lg"
        style={{ 
          rotate: spring,
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.7))'
        }}
      >
        <div className="absolute -top-1 left-1/2 w-3 h-3 bg-white -translate-x-1/2 rounded-full shadow-lg" />
      </motion.div>
      
      {/* Digital Value Display */}
      <div className="absolute top-[65px] left-1/2 -translate-x-1/2 text-white font-bold text-4xl text-center">
        <span className="font-mono drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{value.toFixed(1)}</span>
      </div>

      {/* Label Display */}
      <div className="absolute -bottom-4 w-full text-center text-white font-bold text-lg">
        {label}: <span className="text-blue-400">{value}</span> {unit}
      </div>
      
      {/* Speedometer title */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-gray-300 text-sm font-medium">
        {label === "SpO₂" ? "Blood Oxygen" : "Pulse Rate"}
      </div>
    </div>
  );
};

export default function IoT() {
  const [started, setStarted] = useState(false);
  const [spo2, setSpo2] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [deviceInfo, setDeviceInfo] = useState(null);
  // Store device ID for reconnections
  const [, setLastConnectedDevice] = useLocalStorage("lastConnectedBleDevice", null);
  
  // BLE device refs
  const bleDeviceRef = useRef(null);
  const heartRateCharRef = useRef(null);
  const spo2CharRef = useRef(null);
  const irValueCharRef = useRef(null);
  
  // Handle heart rate characteristic value change
  const handleHeartRateChange = useCallback((event) => {
    try {
      const value = event.target.value;
      const decoder = new TextDecoder("utf-8");
      const heartRateValue = parseInt(decoder.decode(value));
      
      if (!isNaN(heartRateValue)) {
        setHeartRate(heartRateValue);
        
        // Log data point for debugging
        console.log(`Heart Rate: ${heartRateValue} bpm`);
      }
    } catch (error) {
      console.error("Error processing heart rate data:", error);
    }
  }, []);

  // Handle SpO2 characteristic value change
  const handleSpo2Change = useCallback((event) => {
    try {
      const value = event.target.value;
      const decoder = new TextDecoder("utf-8");
      const spo2Value = parseInt(decoder.decode(value));
      
      if (!isNaN(spo2Value)) {
        setSpo2(spo2Value);
        
        // Log data point for debugging
        console.log(`SpO2: ${spo2Value}%`);
      }
    } catch (error) {
      console.error("Error processing SpO2 data:", error);
    }
  }, []);
  
  // Reset connection
  const resetConnection = useCallback(() => {
    heartRateCharRef.current = null;
    spo2CharRef.current = null;
    irValueCharRef.current = null;
    bleDeviceRef.current = null;
    setIsConnected(false);
    setIsLoading(false);
  }, []);

  // Handle disconnection
  const handleDisconnection = useCallback(() => {
    setStatusMessage("Device disconnected");
    resetConnection();
  }, [resetConnection]);

  // Disconnect from the BLE device
  const disconnectFromBLE = useCallback(async () => {
    try {
      if (bleDeviceRef.current && bleDeviceRef.current.gatt.connected) {
        if (heartRateCharRef.current) {
          await heartRateCharRef.current.stopNotifications();
          heartRateCharRef.current.removeEventListener(
            "characteristicvaluechanged",
            handleHeartRateChange
          );
        }
        if (spo2CharRef.current) {
          await spo2CharRef.current.stopNotifications();
          spo2CharRef.current.removeEventListener(
            "characteristicvaluechanged",
            handleSpo2Change
          );
        }
        if (irValueCharRef.current) {
          await irValueCharRef.current.stopNotifications();
        }

        await bleDeviceRef.current.gatt.disconnect();
        setStatusMessage("Disconnected");
        setSpo2(0);
        setHeartRate(0);
      }
      resetConnection();
    } catch (error) {
      console.error("Error disconnecting:", error);
      resetConnection();
    }
  }, [handleHeartRateChange, handleSpo2Change, resetConnection]);

  // Clean up BLE connections when component unmounts
  useEffect(() => {
    return () => {
      if (isConnected) {
        disconnectFromBLE();
      }
    };
  }, [isConnected, disconnectFromBLE]);

  // Connect to the BLE device
  const connectToBLE = useCallback(async () => {
    setStarted(true);
    setIsLoading(true);
    setError("");
    
    if (!navigator.bluetooth) {
      setError("Web Bluetooth API is not supported by your browser!");
      setStatusMessage("Error: Web Bluetooth API not supported");
      setIsLoading(false);
      return;
    }

    try {
      setStatusMessage("Scanning for BLE devices...");

      // Try to use the web-bluetooth library for better error handling
      try {
        // Request the BLE device using the helper library
        const device = await requestDevice({
          filters: [{ name: DEVICE_NAME }],
          optionalServices: [SERVICE_UUID]
        });
        bleDeviceRef.current = device;
        
        // Store device ID for future connections
        if (device.id) {
          setLastConnectedDevice(device.id);
        }
        
        // Get device info
        const info = await getDeviceInfo(device);
        setDeviceInfo(info);
        
      } catch (libError) {
        console.warn("Web-bluetooth library error, falling back to native API", libError);
        
        // Fall back to native API if library fails
        bleDeviceRef.current = await navigator.bluetooth.requestDevice({
          filters: [{ name: DEVICE_NAME }],
          optionalServices: [SERVICE_UUID],
        });
      }

      setStatusMessage("Connecting to device...");
      const server = await bleDeviceRef.current.gatt.connect();

      // Get the service
      setStatusMessage("Getting service...");
      const service = await server.getPrimaryService(SERVICE_UUID);

      // Get the characteristics
      setStatusMessage("Getting characteristics...");
      heartRateCharRef.current = await service.getCharacteristic(
        HEARTRATE_CHAR_UUID
      );
      spo2CharRef.current = await service.getCharacteristic(SPO2_CHAR_UUID);
      irValueCharRef.current = await service.getCharacteristic(IR_VALUE_CHAR_UUID);

      // Listen for notifications
      await heartRateCharRef.current.startNotifications();
      await spo2CharRef.current.startNotifications();
      await irValueCharRef.current.startNotifications();

      // Add event listeners for characteristic value changes
      heartRateCharRef.current.addEventListener(
        "characteristicvaluechanged",
        handleHeartRateChange
      );
      spo2CharRef.current.addEventListener(
        "characteristicvaluechanged",
        handleSpo2Change
      );

      setStatusMessage("Connected! Receiving data...");
      setIsConnected(true);
      setIsLoading(false);

      // Handle disconnection
      bleDeviceRef.current.addEventListener("gattserverdisconnected", handleDisconnection);
    } catch (error) {
      console.error("Error connecting to BLE device:", error);
      setError(`${error.message}`);
      setStatusMessage(`Error: ${error.message}`);
      resetConnection();
      setIsLoading(false);
    }
  }, [handleHeartRateChange, handleSpo2Change, handleDisconnection, resetConnection, setLastConnectedDevice]);

  // Start monitoring - connect to BLE
  const startMonitoring = () => {
    connectToBLE();
  };
  
  // Get health status text based on vitals
  const getHealthStatus = () => {
    if (!isConnected || (spo2 === 0 && heartRate === 0)) {
      return { text: "Not monitoring", color: "text-gray-400" };
    }
    
    // Check SpO2
    if (spo2 < SPO2_RANGES.WARNING.min) {
      return { text: "Critical: Low oxygen!", color: "text-red-500 font-bold animate-pulse" };
    }
    
    // Check HR
    if (heartRate < HR_RANGES.LOW.max || heartRate > HR_RANGES.HIGH.min) {
      return { text: "Warning: Abnormal heart rate", color: "text-yellow-500" };
    }
    
    // All good
    return { text: "Vitals normal", color: "text-green-500" };
  };
  
  const healthStatus = getHealthStatus();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F18] to-[#1A1F2E] text-white flex flex-col items-center pt-20 gap-8 p-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-300 underline underline-offset-5 drop-shadow-[0_0_10px_rgba(100,150,255,0.3)]">Health Vitals Monitoring</h1>
      
      <div className="text-center max-w-xl mx-auto mb-4">
        <p className="text-gray-300">Connect to your Sahaj Perceptron device to monitor real-time health metrics</p>
      </div>

      {error && (
        <div className="w-full max-w-xl bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-red-200 text-sm">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
          <p className="mt-2 text-xs">Please ensure your device is powered on and within range.</p>
        </div>
      )}

      {statusMessage && !error && (
        <div className="text-lg font-medium mb-2 text-blue-400 flex items-center">
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {statusMessage}
        </div>
      )}

      {!started && (
        <motion.button
          onClick={startMonitoring}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-xl shadow-lg hover:from-blue-500 hover:to-blue-300 transition-all border border-blue-500/30 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Connect to Device
        </motion.button>
      )}

      {isConnected && (
        <motion.button
          onClick={disconnectFromBLE}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold rounded-xl shadow-lg hover:from-red-500 hover:to-red-300 transition-all border border-red-500/30 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
          </svg>
          Disconnect
        </motion.button>
      )}

      {started && (
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mt-8 w-full justify-center">
          <motion.div 
            className="bg-[#111827] p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-5"></div>
            <Gauge label="SpO₂" value={spo2} unit="%" />
          </motion.div>
          <motion.div 
            className="bg-[#111827] p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-5"></div>
            <Gauge label="Heart Rate" value={heartRate} unit="bpm" max={200} />
          </motion.div>
        </div>
      )}

      {started && isConnected && (
        <motion.div 
          className="mt-6 max-w-xl text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-400">Your Sahaj Perceptron device is now transmitting real-time data.</p>
          <p className="mt-2 flex items-center justify-center gap-2">
            <span className={`inline-block w-3 h-3 rounded-full ${isConnected ? "bg-green-400 animate-pulse" : "bg-red-500"}`}></span>
            <span className={healthStatus.color}>{healthStatus.text}</span>
          </p>
          
          {deviceInfo && (
            <div className="mt-4 p-3 bg-slate-800/50 rounded-lg text-xs text-left">
              <p className="font-semibold text-blue-300">Device Information:</p>
              <p>Name: {deviceInfo.name || DEVICE_NAME}</p>
              <p>ID: {deviceInfo.id ? deviceInfo.id.substring(0, 8) + '...' : 'Unknown'}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
