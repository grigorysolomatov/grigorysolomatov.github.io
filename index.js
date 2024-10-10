import { IncludeHtml } from './js/html.js';

class Main {
    async run() {
	await new IncludeHtml().set({selector: '.include', attribute: 'from'}).run();
    }
}

new Main().run();
