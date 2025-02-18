import {ReactElement} from "react";
import {StageBase, StageResponse, InitialData, Message, Character, User} from "@chub-ai/stages-ts";
import {LoadResponse} from "@chub-ai/stages-ts/dist/types/load";
import {createTheme} from "@mui/system";
import {Root} from "./display/Root";
import {Person} from "./Person";
import {District} from "./District";

type MessageStateType = any;

type ConfigType = any;

type InitStateType = any;

type ChatStateType = {
    gameInProgress: boolean,
    holoAide: Person,
    districts: District[]
}

export class Stage extends StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType> {


    // Saved variables:
    saveState: ChatStateType;
    // Not saved:
    character: Character;
    player: User;
    /*readonly theme = createTheme({
        palette: {
            primary: {
                main: '#ffffeeff'
            },
            secondary: {
                main: '#111111ff'
            }
        }
    });*/


    constructor(data: InitialData<InitStateType, ChatStateType, MessageStateType, ConfigType>) {

        super(data);
        const {
            characters,         // @type:  { [key: string]: Character }
            users,                  // @type:  { [key: string]: User}
            config,                                 //  @type:  ConfigType
            messageState,                           //  @type:  MessageStateType
            environment,                     // @type: Environment (which is a string)
            initState,                             // @type: null | InitStateType
            chatState                              // @type: null | ChatStateType
        } = data;
        this.saveState = {
            gameInProgress: false,
            holoAide: new Person('','','',''),
            districts: [],
        };
        // Read saved variable values:
        //this.readChatState(chatState);

        this.character = characters[Object.keys(characters)[0]];
        this.player = users[Object.keys(users)[0]];

        this.readChatState(chatState);
    }

    async load(): Promise<Partial<LoadResponse<InitStateType, ChatStateType, MessageStateType>>> {

        return {
            success: true,
            error: null,
            initState: null,
            chatState: null,
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
            console.log(chatState);
        }
    }

    writeChatState(): ChatStateType {
        return this.saveState;
    }

    async updateChatState() {
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
                    alignItems: 'stretch'
                }}>
                    <Root stage={() => {return this}}/>
                </div>;
    }

}
