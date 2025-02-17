import {Stage} from "./Stage";

export async function generateInitialContent(stage: Stage) {

}

/*export function buildDistillation(stage: Stage, baseCharacter: Character): string {
    return (
        buildSection('Flavor Text', stage.replaceTags((baseCharacter.personality + ' ' + baseCharacter.description + '\n' + baseCharacter.scenario), {user: stage.player.name, char: baseCharacter.name})) +
        buildSection('Example Responses', '\n' +
            `SOURCE: H.P. Lovecraft\nSETTING: A mysterious and eldritch 1930s Innsmouth, Massachusetts\nTHEMES: Mind control, insanity, gore, mysticism, body horror, Old Ones\nART: noir, high contrast, overly dark, gritty, hyperrealism, heavy shadows, 1930s fashion, wet\n\n` +
            `SOURCE: Robert E. Howard's Conan the Barbarian\nSETTING: Cimmeria, a dark fantasy, pre-Medieval wasteland rife with hardship, bloodlust, and sex\nTHEMES: barbarians, hedonism, violence, domination, rape, pillaging\nART: barbaric, dark fantasy, oil painting, visible brush strokes, vibrant colors, stark contrast, in the style of Frank Frazetta, hypersexualized, unrealistically muscular characters, busty women, skimpy clothing\n\n` +
            `SOURCE: Original\nSETTING: Quirky, fantastic re-imagining of modern Japanese countryside\nTHEMES: magical, fantasy modern, non-violence, exaggerated, silly, funny, friendship with unlikely creatures\nART: Studio Ghibli, bright, cheerful, anime, vibrant, sparkly, modern, quaint, painterly\n\n` +
            `SOURCE: Ridley Scott's Alien\nSETTING: Hard sci-fi, isolated space station where danger lurks around every corner\nTHEMES: Slow burn, danger, alien infestation, psychological terror, body horror\nART: Creepy, detailed, greebling, gross, hard science, realistic, organic, alien, hyperrealistic, grotesque, in the style of H. R. Geiger\n\n` +
            `SOURCE: Original\nSETTING: Mid-2000s college fall semester, Pacific Northwestern campus\nTHEMES: Friendships, lust, betrayal, homework, cheating, class rank, campus clubs\nART: splotchy watercolor, inks, soft tones, paper texture, pastel colors, ultra-fine linework\n\n` +
            `SOURCE: Mass Effect\nSETTING: Far future, the Citadel of the Mass Effect universe\nTHEMES: Space opera, friendship, trying times, relationships, impending apocalypse, Reaper invasion, extinction-level event\nART: Clean, crisp, 3D render, CGI, vibrant, pristine, cool tones, over-produced lens flares\n\n` +
            `SOURCE: Original\nSETTING: Underground 80s Mid-West biker bar\nTHEMES: turf war, drug running, machismo, brutality, sex and drugs, furries, anthropomorphic characters\nART: Comic book style illustrations, neon, chrome, bright colors, bulging muscles, furries, heavy inks for contrast, crosshatching\n\n` +
            `SOURCE: Original\nSETTING: 70s disco scene, Los Angeles\nTHEMES: Free love, vampires, lycanthropes, disco, secret fantasy underworld, clubs, maintaining secrecy\nART: Psychedelic, lurid colors, stylish, 70s clothing, interesting and exaggerated character proportions\n\n` +
            `SOURCE: Warhammer 40k\nSETTING: Massive Cathedral starship from the Warhammer 40k universe\nTHEMES: brutality, faith, devotion, heresy, power armor\nART: grimdark, high contrast, saturated yet gritty colors, heavy inks and shadows, strong characters, extreme technologies, power armor\n\n`) +
        buildSection('Current Instruction',
            `You are doing critical prep work for a roleplaying narrative. Instead of narrating, you will first use this planning response to distill the setting and themes from the FLAVOR TEXT into a specific format. ` +
            `Use the FLAVOR TEXT as inspirational material as you establish a SOURCE, SETTING, THEMES, and ART style for future narration and illustration. ` +
            `This essential, preparatory response includes four specific and clearly defined fields, each containing a comma-delimited list of words or phrases that distill or embody the spirit of the FLAVOR TEXT.\n` +
            `"SOURCE" should simply identify the source material invoked by FLAVOR TEXT, if possible; leave this blank or 'Original' if FLAVOR TEXT is not derived from a known work.\n` +
            `"SETTING" should briefly stipulate the overarching location, vibe, or time period derived from the FLAVOR TEXT, focusing on any key deviations from setting expectations.\n` +
            `"THEMES" should list all of the prominent themes, concepts, quirks, or kinks from the FLAVOR TEXT.\n` +
            `"ART" lists distinct artist, genre, medium, palette, stroke, shading, or other style descriptors that are associated with SOURCE (if any) or which suit or align with the setting and themes of the FLAVOR TEXT; focus on strong technique descriptors, as these will be used to generate appropriate images later.\n` +
            `Define these four fields and promptly end your response.\n`) +
        '###FUTURE INSTRUCTION:');
}*/



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

export async function redrawImage(stage: Stage, imageGenRequest: any) {
    let result = null;
    for (let tries = 3; tries > 0; tries--) {
        result = await stage.generator.imageToImage(imageGenRequest);
        if (result && result.url) {
            break;
        }
    }
    return result?.url ?? '';
}
