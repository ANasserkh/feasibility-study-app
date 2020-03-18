import db from "~/db/index";


export const state = () => ({
    projects: []
});

export const actions = {

    async new({ commit }, project) {
        try {
            db.add('projects', project);
            commit('REFRESH_PROJECTS');
            return project.name.toLowerCase().replace(/ /g, '-');
        } catch (err) {
            console.log(`Print: new -> err`, err);
            return false;
        }
    },

    async getAll({ commit, state }) {
        commit('REFRESH_PROJECTS');
        return state.projects;
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
    REFRESH_PROJECTS(state) {
        state.projects = db.get('projects');
    }
};