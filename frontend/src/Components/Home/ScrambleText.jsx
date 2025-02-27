import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const ScrambleText = () => {
    const targetText = "STAND TOGETHER";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const colors = ["text-red-500", "text-blue-500", "text-green-500", "text-yellow-500", "text-purple-500", "text-pink-500", "text-orange-500"];
    const [displayText, setDisplayText] = useState(
        Array(targetText.length).fill({ char: " ", color: "" })
    );
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const scrambleInterval = setInterval(() => {
            setDisplayText((prev) =>
                prev.map((item, i) =>
                    i < index
                        ? item
                        : { char: letters[Math.floor(Math.random() * letters.length)], color: item.color || colors[Math.floor(Math.random() * colors.length)] }
                )
            );
        }, 100);

        if (index === targetText.length) {
            setTimeout(() => {
                setIndex(0);
            }, 2000);
        } else {
            setTimeout(() => setIndex((prev) => prev + 1), 200);
        }

        return () => clearInterval(scrambleInterval);
    }, [index]);

    return (
        <div className="text-center font-mono text-2xl font-bold">
            {displayText.map((item, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    className={`mx-1 ${item.color}`}
                >
                    {i < index ? targetText[i] : item.char}
                </motion.span>
            ))}
        </div>
    );
};

export default ScrambleText;