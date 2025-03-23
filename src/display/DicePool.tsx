import {Stage} from "../Stage";
import React, {FC} from "react";
import {motion} from "framer-motion"

// Mapping dice values to their respective Unicode characters
const diceUnicode = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];

interface DicePoolProps {
    stage: () => Stage;
}

export const DicePool: FC<DicePoolProps> = ({ stage }) => {

    return (
        <motion.div
            style={{
                display: 'flex',
                overflowX: 'auto',
                padding: '10px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#00000088',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {stage().saveState.dicePool.map((die, index) => (
                <motion.div
                    key={index}
                    style={{
                        fontSize: '5vw',
                        margin: '0 5px',
                    }}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    {diceUnicode[die.value - 1]}
                </motion.div>
            ))}
        </motion.div>
    );
}