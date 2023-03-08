import { nanoid } from 'nanoid';

export class Note {
	public cue: string;
	public content: string;
	public id: string;

	private constructor(cue: string, content: string, id: string) {
		this.cue = cue;
		this.content = content;
		this.id = id;
	}

	public static create(cue: string, content: string): Note {
		const id = nanoid();
		return new Note(cue, content, id);
	}
}
