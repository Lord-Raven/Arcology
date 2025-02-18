import React, {FC, useState} from "react";
import {Box, Button, LinearProgress, Typography} from "@mui/material";
import {ArrowForward, Replay, Cancel, Check} from "@mui/icons-material";
import {Stage} from "../Stage";
import {generateInitialContent} from "../Generation";
import {useError} from "./ErrorProvider";

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
        <div style={{background: `radial-gradient(ellipse at center, #00000055 50%, #000000BB 90%)`, height: '100vh', width: '100vw'}}>
            <div style={{display: 'flex', flexDirection: 'column', bottom: '2vh', gap: '2vh', height: '100vh', width: '100vw', alignItems: 'center'}}>
                {generating ? (
                    <>
                        <Box sx={{backgroundColor: '#00000088', width: '80%'}} color={'primary'}>
                            <Typography>
                                {progress}% - {progressLabel}
                            </Typography>
                            <LinearProgress sx={{outline: 'primary'}} variant="determinate" color="success" value={progress}/>
                        </Box>
                    </>
                ) : (
                    <>
                        <Button style={{outline: 1, backgroundColor: '#00000088'}} color={'primary'}
                                startIcon={stage().saveState.gameInProgress ? <Replay/> : <ArrowForward/>}
                                onClick={() => setConfirm(true)}>
                            <Typography variant="h5" color='primary'>Start New Game</Typography>
                        </Button>
                        {confirm && (
                            <div>
                                {stage().saveState.gameInProgress ?
                                    <Typography variant="h5" color='primary'>This will delete all progress and start over!</Typography> :
                                    <Typography variant="h5" color='primary'>Warning! This could burn a _lot_ of tokens and may not be safe if you rely on a jailbreak.</Typography>}
                                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '1vw'}}>
                                    <Button style={{outline: 1, backgroundColor: '#00000088'}} color={'primary'}
                                            startIcon={<Check/>}
                                            onClick={() => handleGenerateClick()}>
                                        <Typography variant="h5" color='primary'>Okay!</Typography>
                                    </Button>
                                    <Button style={{outline: 1, backgroundColor: '#00000088'}} color={'primary'}
                                            startIcon={<Cancel/>}
                                            onClick={() => setConfirm(false)}>
                                        <Typography variant="h5" color='primary'>No Way!</Typography>
                                    </Button>
                                </div>
                            </div>
                        )}
                        {stage().saveState.gameInProgress && (
                            <Button style={{outline: 1, backgroundColor: '#00000088'}} color={'primary'}
                                    startIcon={<ArrowForward/>}
                                    onClick={() => setOnMenu(false)}>
                                <Typography variant="h5" color='primary'>Continue</Typography>
                            </Button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}