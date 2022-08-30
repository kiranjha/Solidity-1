//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
contract Counter{
    uint num1;
    uint num2;
    function frstNum(uint x) public{
        num1=x;
    }
    function secondNum(uint y) public{
        num2=y;
    }
    function sumNum() public view returns(uint){
        uint sum=num1+num2;
        return sum;
    }
}