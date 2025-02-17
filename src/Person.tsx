import {Emotion} from "./enums/Emotion";

export class Person {

    name: string;
    role: string;
    descriptors: string;
    personality: string;
    imageUrls: {[emotion in Emotion]: string};

    constructor(name: string, role: string, descriptors: string, personality: string) {
        this.name = name;
        this.role = role;
        this.descriptors = descriptors;
        this.personality = personality;
        this.imageUrls = Object.values(Emotion).reduce((acc, emotion) => {
            acc[emotion as Emotion] = '';
            return acc;
        }, {} as {[emotion in Emotion]: string});
    }

}