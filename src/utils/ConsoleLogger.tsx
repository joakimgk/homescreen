import React, { useState, useEffect } from 'react';

const ConsoleLogger = () => {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const originalConsoleError = console.error;
        console.error = function (...args) {
            setLogs((prevLogs) => [...prevLogs, args.join(' ')]);
            originalConsoleError.apply(console, args);
        };

        return () => {
            console.error = originalConsoleError; // Cleanup on unmount
        };
    }, []);

    return (
        <div style={{ position: 'absolute', bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', maxHeight: '50vh', overflowY: 'scroll', width: '100%' }}>
            <h3>Console Logs:</h3>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>{log}</li>
                ))}
            </ul>
        </div>
    );
};

export default ConsoleLogger;