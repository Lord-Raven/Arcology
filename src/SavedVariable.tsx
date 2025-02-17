class SavedVariable<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }

    setValue(value: T) {
        this.value = value;
    }

    getType(): string {
        return typeof this.value;
    }
}