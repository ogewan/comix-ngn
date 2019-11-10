class Hexstring {
    value: number;
    toString = () => this.value.toString(16);
    constructor(input: string | number) {
        if (typeof input === 'string') {
            this.value = parseInt(input, 16);
        } else {
            this.value = input;
        }
    }
}
class Version {
    constructor(public major = 0, public minor = 0, public patch = 0) { }
    toString() {
        const { major, minor, patch } = this;
        return `${major}.${minor}.${patch}`;
    }
}