const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "frstNum",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "y",
				"type": "uint256"
			}
		],
		"name": "secondNum",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sumNum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const web3 = new Web3('https://ropsten.infura.io/v3/b8c3e81e118f4779a74cbc79998e5249');
const contractAddress = '0xE263f20a3e69cbf702E416D2Ee956B61314A973C';
const contract = new web3.eth.Contract(abi,contractAddress);
var account1 = '0x4F814B963849C61c2f3CE247C9231A28a94086ED';
const privateKey1 = Buffer.from('1f3dd6a178e0d80f023cbac6101bacdad5bb3773dd1598ec046c817707fa4e31','hex');
async function setNum1(){
    let  txCount=await web3.eth.getTransactionCount(account1);
    let frst = contract.methods.frstNum(web3.utils.toHex(200)).encodeABI();

    const txObject1 = {
        nonce:web3.utils.toHex(txCount),
        to:contractAddress,
        gasLimit:web3.utils.toHex(2100000),
        gasPrice:web3.utils.toHex(67 * 1e9),
        value:0,
        data:frst
    }
    console.log(txObject1);
    const tx1 = new Tx(txObject1,{chain: 'ropsten'});
    tx1.sign(privateKey1);
    const serializedTransaction1 = tx1.serialize()
    const raw1 = '0x'+serializedTransaction1.toString('hex')
    web3.eth.sendSignedTransaction(raw1,(err,txHash) => {console.log(txHash);})
    txCount++;
}

async function setNum2(){
    let  txCount=await web3.eth.getTransactionCount(account1);
    let scnd = contract.methods.secondNum(web3.utils.toHex(100)).encodeABI();
    const txObject2 = {
        nonce:web3.utils.toHex(txCount),
        to:contractAddress,
        gasLimit:web3.utils.toHex(2100000),
        gasPrice:web3.utils.toHex(67 * 1e9),
        value:0,
        data:scnd
    }
    console.log(txObject2);
    const tx2 = new Tx(txObject2,{chain: 'ropsten'});
    tx2.sign(privateKey1);
    const serializedTransaction2 = tx2.serialize()
    const raw2 = '0x'+serializedTransaction2.toString('hex')
    web3.eth.sendSignedTransaction(raw2,(err,txHash) => {console.log(txHash);})
    txCount++;
}
async function getSum(){
    const Sum=await contract.methods.sumNum().call();
    console.log("SUM is "+Sum);
}
setNum1();
setNum2();
getSum();