class SavedVariable<T> {
    constructor(public value: T) {}
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