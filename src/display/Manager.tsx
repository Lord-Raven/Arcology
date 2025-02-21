import {Stage} from "../Stage";
import React, {FC} from "react";
import {Box} from "@mui/material";
import hiveImageUrl from "../assets/hive.png";
import {Scene} from "./Scene";
import {motion} from "framer-motion"


interface SceneImageProps {
    scene: Scene,
    clipPath: string
    left: number;
    top: number;
}

const RATIO = 1.75;

const SceneImage = ({scene, clipPath, left, top}: SceneImageProps) => (
    <motion.div
        key={scene.name}
        style={{
            position: 'relative',
            left: `${left}%`,
            top: `${top}%`,
            width: `${20 * RATIO}vh`,
            height: `3vh`,
        }}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.5}}
    >
        <img src={scene.imageUrl} alt={scene.name} style={{width: '100%', height: '100%', transform: 'translate(-50%, 0%)'}} />
    </motion.div>
);

interface ManagerProps {
    stage: () => Stage;
}

export const Manager: FC<ManagerProps> = ({ stage }) => {


    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${hiveImageUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            {stage().saveState.scenes.map((scene) => (
                <SceneImage
                    scene={scene}
                    top={6}
                    left={50}
                    clipPath="polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                />
            ))}
        </div>
    );
}