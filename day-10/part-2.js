// Basically we don't have a target bot to look for anymore, but we'll have to keep track of the contents
// of the output bins. For the rest, it's all pretty similar to part one.
const lines = input.slice(0, -1).split("\n");

const bots = {};
const bins = {};
const botPxy = new Proxy(bots, {
    get(_, id) {
        if (!(id in bots)) bots[id] = { chips: [] };
        return bots[id];
    }
});

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

const isLoaded = id => bots[id].chips.length === 2;
const getLoadedBot = _ => {
    const id = botIds.find(isLoaded);
    return id ? bots[id] : null;
};

const nextStep = _ => {
    const bot = getLoadedBot();
    if (!bot) return false;

    const [ low, high ] = [ Math.min(...bot.chips), Math.max(...bot.chips) ];
    const [ { type: lowType, id: lowTo }, { type: highType, id: highTo } ] = bot.command;
    if (lowType === "bot") bots[lowTo].chips.push(low);
    else bins[lowTo] = low;
    if (highType === "bot") bots[highTo].chips.push(high);
    else bins[highTo] = high;
    bot.chips = [];

    return true;
};

while (nextStep());

bins[0] * bins[1] * bins[2];
