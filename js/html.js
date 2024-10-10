export class IncludeHtml {
    set(dict) {
	this.external = this.external || {};
	this.external = {...this.external, ...dict};
	return this;
    }
    async run() {
	const {selector, attribute} = this.external;
	const pointers = [...document.querySelectorAll(selector)];
	const promises = pointers.map(async pointer => {
	    const includePath = pointer.getAttribute(attribute);
	    const response = await fetch(includePath);
	    pointer.innerHTML = await response.text();
	});
	await Promise.all(promises);
	return this;
    }
}

export function includeHtml({selector, attribute}) {
    const promises = Array.from(document.querySelectorAll(selector)).map(element => {
        const otherHtmlFile = element.getAttribute(attribute);
        return fetch(otherHtmlFile)
            .then(response => response.text())
            .then(data => {
		element.innerHTML = data;
            })
            .catch(error => console.error('Error loading content:', error));
    });

    return Promise.all(promises);
}
export class StyledPopup {
    constructor({outer, inner, visible}) {
	// css classes
	this.outer = outer;
	this.inner = inner;
	this.visible = visible;

	this.hide = () => {};
	this.resolve = null; //(value) => null;
    }
    show(...content) {
	const outer = document.createElement('div');
	const inner = document.createElement('div');
	inner.innerHTML = content.join('\n');
        
	outer.appendChild(inner);
	document.body.appendChild(outer);

	inner.classList.add(this.inner);
	outer.classList.add(this.outer);
	
	outer.offsetHeight; // Hack: force reflow
	outer.classList.add(this.visible);

	this.hide = () => {
	    outer.querySelectorAll('*').forEach(descendant => {descendant.id = ''});
	    outer.addEventListener('transitionend', () => outer.remove());
	    outer.classList.remove(this.visible);
	    this.hide = () => {};
	};

	return this;	
    }
    focus(id) {	
	setTimeout(() => {
	    document.getElementById(id).focus()
	}, 100); // Hack
	return this;
    }
    async value() {
	return await new Promise(resolve => {
	    this.resolve = (value) => {
		this.hide();
		this.resolve = null;
		resolve(value);
	    };
	});
    }
}
export class PageFlip {
    constructor(selector) {
	this.selector = selector;
    }
    to(pageId) {
	document.querySelectorAll(this.selector).forEach(page => {
	    page.style.display = 'none';
	});
	document.getElementById(pageId).style.display = 'block';
	this.page = pageId;
	return this;
    }
}
export class Tabs {
    constructor({containerId, tabClass, openClass}) {
	this.containerId = containerId;
	this.tabClass = tabClass;
	this.openClass = openClass;

	this.tabs = {};
    }
    addSingle({label, destId}) {
	const container = document.getElementById(this.containerId);

	const tab = [document.createElement('button')].map(tab => {
	    tab.classList.add(this.tabClass);
	    tab.textContent = label;
	    tab.addEventListener('click', () => this.to(destId));
	    return tab;
	})[0];
	container.appendChild(tab);
	this.tabs[destId] = tab;
	
	return this;
    }
    add(...array) {
	array.forEach(x => this.addSingle(x));
	return this;
    }
    setSelector(selector) {
	this.pageFlip = new PageFlip(selector);
	return this;
    }
    to(destId) {
	Object.values(this.tabs).forEach(tab => tab.classList.remove(this.openClass));
	this.pageFlip.to(destId);
	this.tabs[destId].classList.add(this.openClass);

	return this;
    }
}
