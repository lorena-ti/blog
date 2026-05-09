export class PostData {
    year: string = '';
    month: string = '';
    id: number = 0;
    coverDiagram: string = '';
    slug: string = '';
    title: string = '';
    category: string = '';
    date: Date = new Date();
    description: string = '';
    tags: string[] = [];

    constructor(init?: Partial<PostData>) {
        Object.assign(this, init);
    }
}
