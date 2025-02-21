import React, {FC, useEffect, useState} from "react";
import {TitleScreen} from "./TitleScreen";
import {Stage} from "../Stage";
import {ErrorProvider} from "./ErrorProvider";
import {Manager} from "./Manager";

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
        <ErrorProvider>
            {onMenu ? (
                <TitleScreen stage={stage} setOnMenu={handleSetOnMenu}/>
            ) : (
                <div style={{display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh'}}>
                    <div style={{width: '70vw', height: '100vh'}}>Testing.</div>
                    <div style={{width: '30vw', height: '100vh'}}>
                        <Manager stage={stage}/>
                    </div>
                </div>
            )}
        </ErrorProvider>
    );
}