var mat = [
	[0,0,0,0,0,0,0],
	[0,1,1,1,1,1,0],
	[0,0,1,1,0,0,1],
	[0,0,1,1,1,1,1],
	[0,0,1,1,1,1,1],
	[0,1,1,1,1,1,0],
	[0,0,0,0,0,0,0]
];

var fmcc = new Freeman4WayChainCode(mat);
var chainData =  fmcc.getChain();
var chain = chainData.chain; 

var vecChain = [];
for(var code of chain)
	vecChain.push(Freeman4WayChainCode.ChainCodeToVector(code))

console.log("Chain:",chain);
console.log("Chain vector:",vecChain);






