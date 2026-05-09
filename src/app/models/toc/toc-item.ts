export class TocItem {
    text: string = '';
    level: string = ''

    constructor(text: string, level: string) {
        this.text = text;
        this.level = level;
    }
}
