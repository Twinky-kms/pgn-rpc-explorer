var btc = require("./coins/btc.js");
var ltc = require("./coins/ltc.js");
var konj = require('./coins/konj.js');

module.exports = {
	"BTC": btc,
	"LTC": ltc,
	"KONJ": konj,

	"coins":["BTC", "LTC", "KONJ"]
};