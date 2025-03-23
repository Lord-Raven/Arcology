export enum Stat {
    Might = 'Might',
    Chill = 'Chill',
    Wits = 'Wits',
    Guts = "Guts"
}


export const statDescriptions: {[stat in Stat]: string} = {
    Might: 'Strength, dominance, and endurance.',
    Chill: 'Grace, confidence, and charm.',
    Wits: 'Awareness, intelligence, and sharpness.',
    Guts: 'Luck, heart, and daring.'
}