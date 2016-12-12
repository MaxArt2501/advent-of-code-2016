const lines = input.slice(0, -1).split("\n");
// These are the chips we're looking for, in a conveniently comparable string
const target = [ 17, 61 ].join();

// Our bot collection. Each bot will consist in a `chips` array and a `command` array that will
// specify what to do with the lower- and higher-value chips.
const bots = {};
// A convenient proxy to initialize undefined (up to that moment) bots
const botPxy = new Proxy(bots, {
    get(_, id) {
        if (!(id in bots)) bots[id] = { chips: [] };
        return bots[id];
    }
});

// These regexes are to parse the instructions
const valueRE = /^value (\d+) goes to bot (\d+)$/;
const commandRE = /^bot (\d+) gives low to (output|bot) (\d+) and high to (output|bot) (\d+)$/;

for (const line of lines) {
    let m = line.match(valueRE);
    if (m) {
        const bot = botPxy[m[2]];
        bot.chips.push(+m[1]);
    } else {
        const [ , id, lowType, lowTo, highType, highTo ] = line.match(commandRE);
        const bot = botPxy[id];
        bot.command = [
            { type: lowType, id: lowTo },
            { type: highType, id: highTo }
        ];
    }
}

const botIds = Object.keys(bots);
// Basically, it will return the chips in ascending order
const getChips = bot => [ Math.min(...bot.chips), Math.max(...bot.chips) ];

// A bot is "loaded" when it's holding two chips
const isLoaded = id => bots[id].chips.length === 2;
// Finds the next loaded bot, if any
const getLoadedBot = _ => {
    const id = botIds.find(isLoaded);
    return id ? bots[id] : null;
};

const isTarget = id => getChips(bots[id]).join() === target;
// Finds the target bot's id, if there's one
const findTargetBot = _ => botIds.find(isTarget);

// We apply the command for a loaded bot, effectively stepping through the instructions
const nextStep = _ => {
    const bot = getLoadedBot();
    if (!bot) return false;

    const [ low, high ] = getChips(bot);
    // Destructuring, baby!
    const [ { type: lowType, id: lowTo }, { type: highType, id: highTo } ] = bot.command;
    // We don't care about chips that go into output bins
    if (lowType === "bot") bots[lowTo].chips.push(low);
    if (highType === "bot") bots[highTo].chips.push(high);
    bot.chips = [];

    return true;
};

var targetBot;
do {
    targetBot = findTargetBot();
    // If there's a target bot, we're done
    if (targetBot) break;
} while (nextStep());

+targetBot;
