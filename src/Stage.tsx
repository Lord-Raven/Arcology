import {ReactElement} from "react";
import {StageBase, StageResponse, InitialData, Message, Character, User} from "@chub-ai/stages-ts";
import {LoadResponse} from "@chub-ai/stages-ts/dist/types/load";
import {createTheme, ThemeProvider} from "@mui/material";
import {Root} from "./display/Root";
import {Person} from "./Person";
import {District} from "./District";
import {Scene} from "./display/Scene";
import {Stat} from "./enums/Stat";
import {Die} from "./Die";

type MessageStateType = any;

type ConfigType = any;

type InitStateType = any;

type ChatStateType = {
    gameInProgress: boolean,
    holoAide: Person,
    districts: District[],
    scenes: Scene[],
    day: number,
    statScores: {[stat in Stat]: number},
    dicePool: Die[],
    time: number,
}

export class Stage extends StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType> {

    // Saved variables:
    saveState: ChatStateType;
    // Not saved:
    character: Character;
    player: User;
    readonly theme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#00000088',
                        '&:hover': {
                            backgroundColor: '#000000CC',
                        },
                    },
                },
            },
        },
        palette: {
            primary: {
                main: '#ffffeeff'
            },
            secondary: {
                main: '#111111ff'
            }
        }
    });


    constructor(data: InitialData<InitStateType, ChatStateType, MessageStateType, ConfigType>) {

        super(data);
        const {
            characters,        // @type: { [key: string]: Character }
            users,                 // @type: { [key: string]: User}
            chatState            // @type: null | ChatStateType
        } = data;
        this.saveState = {
            gameInProgress: false,
            holoAide: new Person('','','',''),
            districts: [],
            scenes: [],
            day: 1,
            statScores: {Might: 0, Chill: 0, Wits: 0, Guts: 0},
            dicePool: [new Die(6), new Die(3), new Die(1)],
            time: 0,
        };

        this.character = characters[Object.keys(characters)[0]];
        this.player = users[Object.keys(users)[0]];

        this.readChatState(chatState);
        console.log(this.saveState);
    }

    async load(): Promise<Partial<LoadResponse<InitStateType, ChatStateType, MessageStateType>>> {

        return {
            success: true,
            error: null,
            initState: null,
            chatState: this.writeChatState(),
        };
    }

    async setState(messageState: MessageStateType): Promise<void> { }

    readChatState(chatState: ChatStateType|null) {
        if (chatState) {
            console.log('before');
            console.log(this.saveState);
            console.log(chatState);
            this.saveState = {...this.saveState, ...chatState};
            console.log('after');
            console.log(this.saveState);
        }
    }

    writeChatState(): ChatStateType {
        return this.saveState;
    }

    async updateChatState() {
        console.log('updateChatState');
        console.log(this.saveState);
        await this.messenger.updateChatState(this.writeChatState());
    }

    async beforePrompt(userMessage: Message): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>> {
        return {
            stageDirections: null,
            messageState: null,
            modifiedMessage: null,
            systemMessage: null,
            error: null,
            chatState: this.writeChatState(),
        };
    }

    async afterResponse(botMessage: Message): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>> {
        return {
            stageDirections: null,
            messageState: null,
            modifiedMessage: null,
            error: null,
            systemMessage: null,
            chatState: this.writeChatState(),
        };
    }


    render(): ReactElement {
        return <div style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'grid',
                    alignItems: 'stretch',
                    color: '#FFFFFF'
                }}>
                    <ThemeProvider theme={this.theme}>
                        <Root stage={() => {return this}}/>
                    </ThemeProvider>
                </div>;
    }

}
