// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract GasFreeSupplyChainTracking is Context {
    using ECDSA for bytes32;

    address public trustedForwarder;

    mapping(address => uint256) public usedNonces;
    mapping(uint256 => Product) public products; // Mapping to store product tracking information

    event TransactionExecuted(address indexed sender, bytes data);
    event ProductTracked(
        address indexed sender,
        uint256 productId,
        string trackingInfo
    );

    struct Product {
        string trackingInfo;
        bool exists;
    }

    constructor(address _trustedForwarder) {
        trustedForwarder = _trustedForwarder;
    }

    modifier verifySignature(address sender, bytes memory signature) {
        require(
            ECDSA.recover(
                keccak256(
                    abi.encodePacked(
                        "\x19\x01",
                        _msgSender(),
                        address(this),
                        keccak256(msg.data),
                        usedNonces[sender]++
                    )
                ),
                signature
            ) == sender,
            "Invalid signature"
        );
        _;
    }

    function executeTransaction(
        address sender,
        bytes memory data,
        bytes memory signature
    ) external verifySignature(sender, signature) {
        (bool success, ) = address(this).call(data);
        require(success, "Transaction execution failed");
        emit TransactionExecuted(sender, data);
    }

    // This is GAS FREE
    function trackProduct(
        uint256 productId,
        string calldata trackingInfo
    ) external {
        require(!products[productId].exists, "Product already tracked");

        products[productId] = Product(trackingInfo, true);

        emit ProductTracked(_msgSender(), productId, trackingInfo);
    }

    function getProductTrackingInfo(
        uint256 productId
    ) public view returns (string memory) {
        require(products[productId].exists, "Product does not exist");
        return products[productId].trackingInfo;
    }

    function updateProductTrackingInfo(
        uint256 productId,
        string calldata newTrackingInfo
    ) external {
        require(products[productId].exists, "Product does not exist");
        products[productId].trackingInfo = newTrackingInfo;
    }

    function removeProduct(uint256 productId) external {
        require(products[productId].exists, "Product does not exist");
        delete products[productId];
    }

    function isProductTracked(uint256 productId) public view returns (bool) {
        return products[productId].exists;
    }

    // Indicate product removal
    event ProductRemoved(address indexed sender, uint256 productId);
}
