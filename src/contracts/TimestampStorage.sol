// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimestampStorage {
    struct Note {
        bytes32 hash;
        uint256 timestamp;
    }

    Note[] public notes;

    function storeHash(bytes32 noteHash) external {
        notes.push(Note({
            hash: noteHash,
            timestamp: block.timestamp
        }));
    }

    function getTimestamp(bytes32 noteHash) external view returns (uint256) {
        for (uint256 i = 0; i < notes.length; i++) {
            if (notes[i].hash == noteHash) {
                return notes[i].timestamp;
            }
        }
        revert("Hash not found");
    }
}
