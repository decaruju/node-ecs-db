class Database {
    constructor() {
        this.reset();
    }

    reset() {
        this.currentId = 0;
        this.entities = {};
        this.indexes = {};
    }

    show(entityId) {
        return this.entities[entityId];
    }

    index(componentNames) {
        const indexName = this.componentNamesToString(componentNames);
        if (!this.indexes[indexName]) this.addIndex(componentNames);
        return this.indexes[indexName];
    }

    create(components) {
        const id = ++this.currentId;
        this.entities[id] = { ...components, id };

        return this.entities[id];
    }

    addIndex(componentNames) {
        this.indexes[this.componentNamesToString(componentNames)] = Object.values(this.entities).filter((entity) => {
            return componentNames.every((componentName) => entity[componentName]);
        });
    }

    componentNamesToString(componentNames) {
        return componentNames.sort().join(',');
    }
}

module.exports = Database;
