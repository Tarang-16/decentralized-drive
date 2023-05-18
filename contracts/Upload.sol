// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Upload {

    string cid;

    mapping(address => mapping(address=>bool)) public fileAccess;
    mapping(address=>address[]) public accessList;
    mapping(address => string[]) private ownerToFile;

    function uploadImage(string memory _cid) external {
        ownerToFile[msg.sender].push(_cid);
    }

    function giveAccess(address _address) external {
        require(_address != msg.sender, "You need not give access to youself"); 
        require(!fileAccess[msg.sender][_address],"This address already has access to your files");
        fileAccess[msg.sender][_address] = true;
        accessList[msg.sender].push(_address);
    }

    function deleteAccess(address _address) external {
        require(_address != msg.sender, "You can not take away access from youself");
        require(fileAccess[msg.sender][_address],"This address does not have access to your files");
        fileAccess[msg.sender][_address] = false;
        for (uint i=0; i<accessList[msg.sender].length; i++) {
        if (accessList[msg.sender][i] == _address) {
            accessList[msg.sender][i] = address(0x0);
            break;
        }
        }
    }

    function getImage(address _address) external view returns(string[] memory) {
        require(_address == msg.sender || fileAccess[_address][msg.sender], "you do not have the access");
        return ownerToFile[_address];
    }

    function shareAccess() external view returns (address[] memory) {
        return accessList[msg.sender];
    }

}