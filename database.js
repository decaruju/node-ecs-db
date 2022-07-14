class Database {
    constructor() {
        this.currentId = 0;
        this.entities = {};
        this.indexes = {};
    }

    show(entityId) {
        return this.entities[entityId];
    }

    index(componentNames) {
        if (!this.indexes[this.componentNamesToString(componentNames)]) this.addIndex(componentNames);
        return this.indexes[this.componentNamesToString(componentNames)];
    }

    create(components) {
        const id = this.currentId++;
        this.entities[id] = { ...components, id };

        return id;
    }

    addIndex(componentNames) {
        this.indexes[this.componentNamesToString(componentNames)] = Object.values(this.entities).filter((entity) => {
            return componentNames.all((componentName) => entity[componentName]);
        });
    }

    componentNamesToString(componentNames) {
        return componentNames.sort().join(',');
    }
}
