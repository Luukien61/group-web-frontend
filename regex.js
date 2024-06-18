const input = "     10 abc 45 bcd"

function regex(input) {

    const indexPattern =/\s*(?<digit>\d+)\s(?<value>\w+)/g

    const matches = input.matchAll(indexPattern);
    for (const match of matches) {
        console.log(match);
    }

    const result = indexPattern.exec(input)
    console.log(result)
}

regex(input)