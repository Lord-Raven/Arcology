import {Stage} from "./Stage";
import {Person} from "./Person";
import {AspectRatio} from "@chub-ai/stages-ts";
import {Emotion} from "./enums/Emotion";
import {District, INITIAL_DISTRICTS} from "./District";

const ART_STYLE = 'Messy oil painting, elaborate high-concept art, bold colors and strokes, sci-fi meets lo-fi';

export async function generateInitialContent(stage: Stage, updateProgress: (progress: number, label: string) => void) {
    updateProgress(0, 'Initializing.');
    stage.saveState.districts = INITIAL_DISTRICTS.map(district => district.clone());

    updateProgress(5, 'Generating Holo-Aide from card.');
    const aidePersona = await generateText(stage, {
        prompt:
            new PromptBuilder()
                .addHeader('Setting', 'The Hive is a thriving post-apocalyptic cyberpunk arcology.')
                .addHeader('Example',
                    'NAME: Carolina Reaper\nDESCRIPTORS: Young woman, short, curvy, tomboyish look, spicy gothic appearance, short curly red hair, black duster, elaborate scythe, freckles, bright red eyes\n' +
                    'PERSONALITY: Carolina is a surprisingly bubbly gothic assistant. She\'s a spunky, tough, bad-ass who can kill with wit and looks.')
                .addHeader('Flavor Text', `${stage.character.description}\n${stage.character.personality}\n${stage.character.scenario}`)
                .addHeader('Current Instruction', 'This is a preparatory response for a roleplay; study the FLAVOR TEXT and use it as inspiration to creatively define the persona for ' +
                    'a Holo-Aide--a holographic assistant--that will play a role in an upcoming narrative playing out in SETTING. This definition should follow this specific format:\n ' +
                    'NAME: A name the persona goes by\n' +
                    'DESCRIPTORS: A brief list of primary physical features (gender, skintone, etc.) and other visual descriptors or booru-style tags that define the persona\'s appearance\n' +
                    'PERSONALITY: A description of the persona\'s personality: accent, mannerisms, tics, likes, dislikes, etc.')
                .build(),
        min_tokens: 100, max_tokens: 200
    });
    console.log(aidePersona);
    const aidePerson = buildPerson(aidePersona, 'Holo-Aide');
    console.log(aidePerson);
    if (aidePerson) {
        stage.saveState.holoAide = aidePerson;
    } else {
        throw Error('Failed to generate Holo-Aide persona.');
    }
    updateProgress(50, 'Generating Holo-Aide image.');
    const aideImage = await generateImage(stage, {
        prompt: `(${ART_STYLE}), full body portrait, plain empty background, neutral expression, (holographic), (${aidePerson.descriptors})`,
        negative_prompt: 'special effects, background, scenery',
        aspect_ratio: AspectRatio.WIDESCREEN_VERTICAL,
        remove_background: true
    });
    if (aideImage) {
        console.log(aideImage);
        aidePerson.imageUrls[Emotion.neutral] = aideImage;
    } else {
        throw Error('Failed to generate Holo-Aide neutral image.');
    }

    updateProgress(100, 'Completed.');
    stage.saveState.gameInProgress = true;
    await stage.updateChatState();
}


export async function generateText(stage: Stage, textGenRequest: any) {
    let result = null;
    for (let tries = 3; tries > 0; tries--) {
        result = await stage.generator.textGen(textGenRequest);
        if (result && result.result) {
            break;
        }
    }
    return result?.result ?? '';
}

export async function generateImage(stage: Stage, imageGenRequest: any) {
    let result = null;
    for (let tries = 3; tries > 0; tries--) {
        result = await stage.generator.makeImage(imageGenRequest);
        if (result && result.url) {
            break;
        }
    }
    return result?.url ?? '';
}

export async function regenerateImage(stage: Stage, imageGenRequest: any) {
    let result = null;
    for (let tries = 3; tries > 0; tries--) {
        result = await stage.generator.imageToImage(imageGenRequest);
        if (result && result.url) {
            break;
        }
    }
    return result?.url ?? '';
}

function buildPerson(input: string, role: string) {
    const MAX_NAME_LENGTH = 30;
    const nameRegex = /Name\s*[:\-]?\s*(.*)/i;
    const descriptorsRegex = /Descriptors\s*[:\-]?\s*(.*)/i;
    const personalityRegex = /Personality\s*[:\-]?\s*(.*)/i;
    const nameMatches = input.match(nameRegex);
    const descriptorsMatches = input.match(descriptorsRegex);
    const personalityMatches = input.match(personalityRegex);

    if (nameMatches && nameMatches.length > 1 && nameMatches[1].length < MAX_NAME_LENGTH && descriptorsMatches && descriptorsMatches.length > 1 && personalityMatches && personalityMatches.length > 1) {
        console.log(`${nameMatches[1].trim()}:${descriptorsMatches[1].trim()}:${personalityMatches[1].trim()}`);
        return new Person(nameMatches[1].trim(), role, descriptorsMatches[1].trim(), personalityMatches[1].trim());
    }
    return null;
}

class PromptBuilder {
    private headers: { header: string, content: string }[] = [];

    addHeader(header: string, content: string): this {
        this.headers.push({header, content});
        return this;
    }

    build(): string {
        let result = this.headers.map(item => `###${item.header.toUpperCase()}:\n${item.content}`).join('\n\n');
        result += '###FUTURE INSTRUCTION:\n';
        return result;
    }
}