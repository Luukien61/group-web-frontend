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



const productId =[
    "iphone-15-promax",
    "iphone-15",
    "iphone-14",
    "oppo-reno11f-5g",
    "samsung-s24",
    "samsung-m54",
    "asus-x415",
    "xiaomi-mi11t",
    "xiaomi-16",
    "vivo-v15",
    "sony-x12",
    "xiaomi-mi14",
    "iphone-11",
    "iphone-13",
    "dell-baa",
    "dell-laptitude",
    "samsung-a55-5g",
    "abc",
    "iphone-77",
    "iphone-5",
    "xiaomi-17",
    "samsung-sj",
]

function changeSql(){
    const sqlTemplate ='insert into rating values ({index},0,0,0,0,0,0, {id});'
    const regex = /^{\w{2}}/
    productId.forEach((item,index) => {
        const sql = sqlTemplate.replace('{id}', `'${item}'`);
        const result = sql.replace('{index}', index+1)
        console.log(result);
    });
}
changeSql()