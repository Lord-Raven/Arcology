import React, {FC, useEffect, useState} from "react";
import {TitleScreen} from "./TitleScreen";
import {Stage} from "../Stage";
import {ErrorProvider} from "./ErrorProvider";

interface RootProps {
    stage: () => Stage;
}

export const Root: FC<RootProps> = ({ stage }) => {
    const [onMenu, setOnMenu] = useState<boolean>(true);

    const handleSetOnMenu = (onMenu: boolean) => {
        setOnMenu(onMenu);
    };

    useEffect(() => {}, [onMenu]);

    return (
        <div style={{
            width: '100vw',
            height: '100vh'
        }}>
                    {onMenu ? (
                        <TitleScreen stage={stage} setOnMenu={handleSetOnMenu}/>
                    ) : (
                        <></>
                    )}
        </div>
    );
}