// Require in yargs and our app.js file
const yargs = require('yargs/yargs');
const app = require('./app.js');


// IN ORDER TO SEARCH FOR POKEMON THE COMMAND IS:
// node cli.js search <pokemonName>


// Building our Command Line Interface
yargs(process.argv.slice(2))
    .usage('$0: Usage <command> [options]')
    .command(
        // command
        'search <pokemon>',
        // description of command
        'search for pokemon cards',
        // builder function to build out our command arguments and options
        (yargs) => {
            return (
                yargs
                    .positional('pokemon', {
                        describe: 'searching for pokemon cards',
                        type: 'string'
                    })
            );
        },
        // handle parsed command, command arguments, and options
        (args) => {
            app.searchPokemon(args);
        }
    ).help().argv;
