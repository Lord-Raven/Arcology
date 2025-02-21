import {Stage} from "../Stage";
import React, {FC} from "react";
import {Box} from "@mui/material";
import hiveImageUrl from "../assets/hive.png";


interface MaskedImageProps {
    src: string,
    clipPath: string
}

const MaskedImage = ({src, clipPath }: MaskedImageProps) => (
    <Box
        component='div'
        sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `${src}`,
            backgroundSize: 'cover',
            clipPath: clipPath,
        }}
    />
);

interface ManagerProps {
    stage: () => Stage;
}

export const Manager: FC<ManagerProps> = ({ stage }) => {


    return (
        <div style={{
            backgroundImage: `url(${hiveImageUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
        </div>
    );
}