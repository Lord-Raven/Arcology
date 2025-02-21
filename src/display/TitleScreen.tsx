import React, {FC, useState} from "react";
import {Box, Button, LinearProgress, Typography} from "@mui/material";
import {ArrowForward, Replay, Cancel, Check} from "@mui/icons-material";
import {Stage} from "../Stage";
import {generateInitialContent} from "../Generation";
import {useError} from "./ErrorProvider";
import hiveImageUrl from "../assets/hive.png";

interface TitleScreenProps {
    stage: () => Stage;
    setOnMenu: (onMenu: boolean) => void;
}

export const TitleScreen: FC<TitleScreenProps> = ({ stage, setOnMenu }) => {
    const [generating, setGenerating] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [progressLabel, setProgressLabel] = useState<string>('');
    const {displayError} = useError();
    const buttonProps = {outline: 1, typography: 'h5', m: 1};

    const updateProgress = (progress: number, label: string) => {setProgress(progress);setProgressLabel(label)};
    const handleGenerateClick = () => {
        setConfirm(false);
        setGenerating(true);
        generateInitialContent(stage(), updateProgress).then(() => {
                setGenerating(false);
                setOnMenu(false);
        }).catch((err) => {
                displayError(err.message);
                setGenerating(false);
                setOnMenu(true);
                console.log(err);
        });
    };

    return (
        <div style={{
            backgroundImage: `url(${hiveImageUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
        }}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2vh', height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center', zIndex: '10'}}>
                {generating ? (
                    <>
                        <Box sx={{backgroundColor: '#00000088', width: '80%', color: 'primary', variety: 'h5'}} color={'primary'}>
                            <Typography>
                                {progress}% - {progressLabel}
                            </Typography>
                            <LinearProgress sx={{outline: 'primary'}} variant="determinate" color="success" value={progress}/>
                        </Box>
                    </>
                ) : (
                    <>
                        <Button sx={{...buttonProps}} color={'primary'}
                                startIcon={stage().saveState.gameInProgress ? <Replay/> : <ArrowForward/>}
                                onClick={() => setConfirm(true)}>
                            Start New Game
                        </Button>
                        {confirm && (
                            <div>
                                {stage().saveState.gameInProgress ?
                                    <Typography sx={{backgroundColor: '#00000088', color: 'primary', variety: 'h5'}}>This will delete all progress and start over!</Typography> :
                                    <Typography sx={{backgroundColor: '#00000088', color: 'primary', variety: 'h5'}}>Warning! This could burn a _lot_ of tokens and may not be safe if you rely on a jailbreak.</Typography>}
                                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '1vw'}}>
                                    <Button sx={{...buttonProps}}
                                            startIcon={<Check/>}
                                            onClick={() => handleGenerateClick()}>
                                        Okay!
                                    </Button>
                                    <Button sx={{...buttonProps}}
                                            startIcon={<Cancel/>}
                                            onClick={() => setConfirm(false)}>
                                        No Way!
                                    </Button>
                                </div>
                            </div>
                        )}
                        {stage().saveState.gameInProgress && (
                            <Button sx={{...buttonProps}} color={'primary'}
                                    startIcon={<ArrowForward/>}
                                    onClick={() => setOnMenu(false)}>
                                Continue
                            </Button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}