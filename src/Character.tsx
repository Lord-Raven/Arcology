import {Emotion} from "./enums/Emotion";

export class Character {
    constructor(public name: string, public description: string, public personality: string, public imageUrl: {[emotion in Emotion]: string}) {}

}