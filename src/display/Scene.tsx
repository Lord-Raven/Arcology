
export class Scene {
    name: string;
    description: string;
    essentialDescriptors: string;
    imageUrl: string;

    constructor(name: string, description: string, essentialDescriptors: string) {
        this.name = name;
        this.description = description;
        this.essentialDescriptors = essentialDescriptors;
        this.imageUrl = '';
    }

    clone(): Scene {
        return new Scene(this.name, this.description, this.essentialDescriptors);
    }
}

export const INITIAL_SCENES: Scene[] =
    [
        new Scene(
            'Penthouse Bedroom',
            'Luxurious bedroom with a modern, cyberpunk aesthetic. Dominated by a massive bed.',
            'Expansive penthouse bedroom overlooking a desolate desert landscape from extremely high up.')
    ];
