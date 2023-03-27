// Require in our api.js file
// Require in npm Prompts
const api = require('./api');
const prompts = require('prompts');
const { saveSearchHistory } = require('./history');

// Choose Option Function
// Parameters: takes in an array of pokemon card objects
const _chooseOption = async (options) => {
    const displayOptions = options.map((option) => {
        return {
        // what the options look like, our unique identifer that will be used later
            title: `${option.name} from Set: ${option.set.name}`, value: option.id
        };
    });

    // how the prompts work (used the official prompt api github for this)
    return await prompts([
        {
            type: 'select',
            name: 'options',
            message: 'pick a pokemon',
            choices: displayOptions,
        },
    ]);
};

// Application Logic
// Search Name Function
const searchPokemon = async (args) => {
    try {
        // Grab the pokemon name from the args passed
        const { pokemon } = args;
        const pageSize = 10; // number of results to show

        // This calls the searchByName function from the api.js file using the args we recieved from the command line
        // Returns an array of objects (pokemon cards from different sets)
        const searchOptions = await api.searchByName(pokemon, pageSize);
        if (searchOptions.length === 0) {
            console.log(`No results found for '${pokemon}'.`);
            return;
        }
        // This calls the chooseOption function from this class using the array we just recieved
        // returns a unique identifier
        const chosenOption = await _chooseOption(searchOptions);
        // This calls the getInfo function from the api.js file using our unique identifier
        // Returns details of the final choice
        const finalOption = await api.getInfo(chosenOption.options);

        console.log(finalOption);


        // Save search history
        const resultCount = searchOptions.length;
        saveSearchHistory(pokemon, resultCount);
        console.log(`Result count: ${resultCount}`);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    searchPokemon
};
