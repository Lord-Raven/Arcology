import {Emotion} from "./enums/Emotion";

class Character {
    constructor(public name: string, public description: string, public personality: string, public imageUrl: {[emotion in Emotion]: string}) {}

}