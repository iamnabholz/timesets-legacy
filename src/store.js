import {
    writable
} from 'svelte/store';

const defaults = [{
        id: 2,
        name: "Work Review",
        time: 15,
        completed: false
    },
    {
        id: 3,
        name: "Short Break",
        time: 5,
        completed: false
    },
    {
        id: 4,
        name: "Work Phase",
        time: 25,
        completed: false
    }
]

function timerStore() {
    const state = (JSON.parse(localStorage.getItem("tim")) || defaults);
    const {
        subscribe,
        set,
        update
    } = writable(state);

    const timers = {
        modify(data) {
            update(state => {
                let index = state.findIndex(state => state.id == data.id);

                if (state[index] == null) {
                    state = state.concat(data);
                } else {
                    state[index] = data;
                }

                console.log(state);
                localStorage.setItem("tim", JSON.stringify(state));

                return state;
            });
        },
        delete(id) {
            update(state => {
                state = state.filter(state => state.id != id);

                console.log(state);
                localStorage.setItem("tim", JSON.stringify(state));

                return state;
            });
        }
    }

    return {
        subscribe,
        set,
        update,
        ...timers
    };
}

export const timers = timerStore();

export const controller = writable([{
    id: null,
    running: false,
    status: "stopped"
}]);