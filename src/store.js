import {createStore} from 'vuex'

export const store = createStore({
    state: {
        games: [],
    },
    getters: {
        getLastGame : (state) => state.games.length ,
        getAll : (state) => state.games
    },
    mutations: {
        addNewGame(state, newGame) {
            if (newGame.id === undefined){
                newGame.id = state.games.length;
            }
            state.games.push(newGame);
        },
        updateNewGame(state, params) {
            const gameIndex = params.id -1 ;

            if (gameIndex >= 0 && gameIndex < state.games.length) {
                const game = state.games[gameIndex];
                game.id = params.id;
                game.mot = params.mot;
                game.isVictoire = params.isVictoire;
                game.nombreTentatives = params.nombreTentatives;
                game.tempsJeu = params.tempsJeu;
            } else {
                console.error("updateNewGame: Aucun jeu trouvé avec cet ID :", params.id);
            }
        }

    },
    actions: {
        addGameAction({ commit }, newGame) {
            commit('addGameMutation', newGame);
        },
    }

})
