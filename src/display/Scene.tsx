
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
            'Expansive penthouse bedroom overlooking a desolate, empty desert landscape from extremely high up--above the clouds.'
        ),
        new Scene(
            'Estate',
            'Luxuriously appointed high-end classy futuristic sleek aesthetic. Extensive and expensive artistic decor.',
            'Sprawling mansion interior in a sci-fi estate. Windowless but spacious.'
        ),
        new Scene(
            'Boardroom',
            'High-end sleek futuristic aesthetic.',
            'Expansive empty boardroom featuring a heavy table and many vacant seats. Windows reveal a desolate, empty desert wasteland extremely far below.'
        )
    ];
