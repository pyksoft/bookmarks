import Freezer from 'freezer-js';

const State = new Freezer({
    searchQuery: {
        activePage: 1,
        sortBy: 'title',
        sortAsc: true,
        searchStr: '',
        searchMode: '',
        searchTags: []
    }
});

const searchQueryMutations = {
    setActivePage(page) {
        State.get().searchQuery.set({
            activePage: page
        });
    },
    setSortBy(key) {
        State.get().searchQuery.set({
            sortBy: key,
            activePage: 1
        });
    },
    setSearchParams(searchStr, searchMode, searchTags) {
        State.get().searchQuery.set({
            activePage: 1,
            searchStr,
            searchMode,
            searchTags
        });
    }
};

export default {
    state: State,
    getState: () => {
        return State.get()
    },
    searchQuery: searchQueryMutations
};