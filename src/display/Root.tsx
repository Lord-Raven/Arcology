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
                <>
                    <div style={{width: '70%', height: '100vh'}}></div>
                    <div style={{width: '30%', height: '100vh'}}>
                        <Manager stage={stage}/>
                    </div>
                </>
            )}
        </ErrorProvider>
    );
}