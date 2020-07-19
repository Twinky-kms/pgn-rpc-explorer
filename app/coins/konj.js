var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"native",
		name:"konj",
		multiplier:1,
		default:true,
		values:["", "konj", "KONJ"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"lite",
		multiplier:1000,
		values:[""],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"photon",
		multiplier:1000000,
		values:[""],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"litoshi",
		multiplier:100000000,
		values:["", ""],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
];

module.exports = {
	name:"Konjugate",
	ticker:"KONJ",
	logoUrl:"/img/logo/konj.svg",
	siteTitle:"Konjugate Explorer",
	nodeTitle:"Konjugate Full Node",
	nodeUrl:"",
    demoSiteUrl: "",
    //TODO add pool data
	miningPoolsConfigUrls:[],
	maxBlockWeight: 4000000,
	targetBlockTimeSeconds: 120,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"KONJ":currencyUnits[0]},
	baseCurrencyUnit:currencyUnits[0],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHash: "00002b696e1b86375c688cbcc6c7fd8cf62c6e47c0b4a9a107b3174c1879674d",
	genesisCoinbaseTransactionId: "83349a503683497db92220f1c63dae29b9deb736afa458abde4957f638a627ee",
	genesisCoinbaseTransaction: {
		"txid":"83349a503683497db92220f1c63dae29b9deb736afa458abde4957f638a627ee",
		"hash":"83349a503683497db92220f1c63dae29b9deb736afa458abde4957f638a627ee",
		"blockhash":"00002b696e1b86375c688cbcc6c7fd8cf62c6e47c0b4a9a107b3174c1879674d",
		"version":1,
		"locktime":0,
		"size":196,
		"vsize":196,
		"time":1513698048,
		"blocktime":1513698048,
		"vin":[
			{
				"prev_out":{
					"hash":"0000000000000000000000000000000000000000000000000000000000000000",
					"n":4294967295
				},
				"coinbase":"04ffff001d0104404e592054696d65732030352f4f63742f32303131205374657665204a6f62732c204170706c65e280997320566973696f6e6172792c2044696573206174203536"
			}
		],
		"vout":[
			{
				"value":"1000.00000000",
				"n":0,
				"scriptPubKey":{
					"hex":"040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9 OP_CHECKSIG",
					"type":"pubkey",
					"reqSigs":1,
					"addresses":[
						"Ler4HNAEfwYhBmGXcFP2Po1NpRUEiK8km2"
					]
				}
			}
		]
	},
	historicalData: [
		{
			type: "blockheight",
			date: "2011-10-07",
			blockHeight: 0,
			blockHash: "12a765e31ffd4059bada1e25190f6e98c99d9714d334efa41a195a7e7e04bfe2",
			summary: "The Litecoin genesis block.",
			alertBodyHtml: "This is the first block in the Litecoin blockchain.",
			referenceUrl: "https://medium.com/@SatoshiLite/satoshilite-1e2dad89a017"
		},
		{
			type: "tx",
			date: "2017-05-10",
			txid: "ce385e55fb2a73fa438426145b074f08314812fa3396472dc572b3079e26e0f9",
			summary: "First SegWit transaction.",
			referenceUrl: "https://twitter.com/satoshilite/status/862345830082138113"
		},
		{
			type: "blockheight",
			date: "2011-10-13",
			blockHeight: 448,
			blockHash: "6995d69ce2cb7768ef27f55e02dd1772d452deb44e1716bb1dd9c29409edf252",
			summary: "The first block containing a (non-coinbase) transaction.",
			referenceUrl: ""
		},
		{
			type: "link",
			date: "2016-05-02",
			url: "/rpc-browser?method=verifymessage&args%5B0%5D=Ler4HNAEfwYhBmGXcFP2Po1NpRUEiK8km2&args%5B1%5D=G7W57QZ1jevRhBp7SajpcUgJiGs998R4AdBjcIgJq5BOECh4jHNatZKCFLQeo9PvZLf60ykR32XjT4IrUi9PtCU%3D&args%5B2%5D=I%2C+Charlie+Lee%2C+am+the+creator+of+Litecoin&execute=Execute",
			summary: "Litecoin's Proof-of-Creator",
			referenceUrl: "https://medium.com/@SatoshiLite/satoshilite-1e2dad89a017"
		}
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/Litecoin/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return {"usd":responseBody[0].price_usd};
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(1000) ];
		for (var i = 1; i < 11; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 840000);

		return eras[index];
	}
};