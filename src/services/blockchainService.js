"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoteFromBlockchain = exports.saveNoteOnBlockchain = void 0;
const ethers_1 = require("ethers");
// Initialize provider and wallet
const provider = new ethers_1.JsonRpcProvider('http://127.0.0.1:8545'); // Local blockchain
const privateKey = 'your_private_key_here'; // Replace with your private key
const wallet = new ethers_1.Wallet(privateKey, provider);
// Smart contract setup
const contractAddress = 'your_deployed_contract_address'; // Replace with the deployed contract address
const abi = [
    // Contract ABI
    {
        'inputs': [{ 'internalType': 'bytes32', 'name': 'noteHash', 'type': 'bytes32' }],
        'name': 'storeHash',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [{ 'internalType': 'bytes32', 'name': 'noteHash', 'type': 'bytes32' }],
        'name': 'getTimestamp',
        'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
        'stateMutability': 'view',
        'type': 'function'
    }
];
const contract = new ethers_1.Contract(contractAddress, abi, wallet);
/**
 * Store a hash on the blockchain with a timestamp.
 * @param hash - The SHA-256 hash of the note.
 * @returns {Promise<string>} - Transaction hash.
 */
const saveNoteOnBlockchain = async (hash) => {
    try {
        const tx = await contract.storeHash(hash);
        console.log('Transaction sent:', tx.hash);
        await tx.wait(); // Wait for transaction to be mined
        console.log('Transaction confirmed:', tx.hash);
        return tx.hash;
    }
    catch (error) {
        console.error('Error saving hash on blockchain:', error);
        throw new Error('Blockchain transaction failed');
    }
};
exports.saveNoteOnBlockchain = saveNoteOnBlockchain;
/**
 * Retrieve a timestamp for a given hash from the blockchain.
 * @param hash - The SHA-256 hash of the note.
 * @returns {Promise<number>} - Timestamp in UNIX format.
 */
const getNoteFromBlockchain = async (hash) => {
    try {
        const timestamp = await contract.getTimestamp(hash);
        console.log('Timestamp retrieved:', timestamp.toString());
        return Number(timestamp); // Convert BigInt to JavaScript number
    }
    catch (error) {
        console.error('Error retrieving timestamp from blockchain:', error);
        throw new Error('Failed to fetch timestamp from blockchain');
    }
};
exports.getNoteFromBlockchain = getNoteFromBlockchain;
