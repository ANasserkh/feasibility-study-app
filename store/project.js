//TODO: add project API
export const state = () => ({
    projects: []
});

export const actions = {
    async new({ commit, state }, title) {
        try {
            const project = {
                id: state.projects.length,
                title
            };
            commit("Add", project);
            return project;
        } catch (err) {
            console.log(`Print: new -> err`, err);
            return false;
        }
    },
    async find({ state }, id) {
        try {
            return state.projects.find(item => item.id == id);
        } catch (err) {
            console.log(`Print: new -> err`, err);
            return false;
        }
    }
};

export const mutations = {
    Add(state, project) {
        state.projects.push(project);
    }
};