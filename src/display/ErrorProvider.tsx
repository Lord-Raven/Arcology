import React, {createContext, FC, useContext, useState} from "react";
import {motion, Variants} from "framer-motion";
import {Icon, Typography} from "@mui/material";
import {Cancel} from "@mui/icons-material";

interface ErrorContextType {
    displayError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
};

interface ErrorProviderProps {}

export const ErrorProvider: FC<React.PropsWithChildren<ErrorProviderProps>> = ({ children }) => {
    const [message, setMessage] = useState<string>('');

    const displayError = (message: string) => {
        setMessage(message);
        setTimeout(() => {setMessage('')}, 5000);
    }

    const variants: Variants = {
        active: {y: 0, opacity: 1},
        inactive: {y: -100, opacity: 0}
    };

    return (
        <ErrorContext.Provider value={{ displayError }}>
            {children}
            <motion.div
                animate={message ? 'active' : 'inactive'}
                variants={variants}
                transition={{duration: 0.2}}
                style={{
                    position: 'fixed',
                    top: '0',
                    left: '25%',
                    width: '50%',
                    backgroundColor: '#000000BB',
                    zIndex: 99,
                }}
            >
                <Typography>
                    <Icon style={{outline: 1, float: 'left'}} color={'warning'}>
                        <Cancel/>
                    </Icon>
                    {message}
                </Typography>
            </motion.div>
        </ErrorContext.Provider>
    );
};
