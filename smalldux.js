(function(){
    /**
     * Smalldux is a small implementation of Redux
     * -------------------------------------------
     * 
     * Three principle of Redux:
     * ===========================================
     * 
     * 1) Single source of truth: The state of your whole application is stored in an object tree within a single store.
     * 
     * 2) State is read-only: The only way to change the state is to emit an action, an object describing what happened.
     * 
     * 3) Changes are made with pure functions: To specify how the state tree is transformed by actions, you write pure reducers.
     * 
     * Concepts:
     * ===========================================
     * 
     * Actions are payloads of information that send data from your application to your store. 
     * They are the only source of information for the store. 
     * You send them to the store using store.dispatch().
     * 
     * EX: 
     * {
     *  type: "INCREMENT", //Usually a constant, needs to be unique
     *  payload: 1          
     * }
     * 
     */

     function createStore(reducer, initialState){
        var state = initialState;
        var listeners = [];

        //Returns the state
        function getState(){
            return state;
        }

        /**
         * Adding our listener to the array, those will be updated in the dispatch method
         */
        function subscribe(listener){
            listeners.push(listener);
        }

        // The `dispatch` method will call the reducer to eventually change the state
        function dispatch(action){

            /**
             * The reduced needs to be a pure function, which means
             * it will return a new state without changing the parent scope
             */
            state = reducer(state, action);

            /**
             * We call every listener in the array, 
             * they will know what to do with the new state (updating the UI, maybe?)
             */
            listeners.forEach(function(l) {
                l();
            }, this);            
        }

        dispatch({ type: '@@smalldux/INIT' });

        /**
         * Our public API
         */
        return {
            getState: getState,
            subscribe: subscribe,
            dispatch: dispatch
        };

     }

    window.Smalldux = {
        createStore: createStore
    };
})();
