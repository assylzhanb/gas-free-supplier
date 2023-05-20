import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Web3 from 'web3';
// import * as ethUtil from 'ethereumjs-util';


const Track = () => {
    // const navigate = useNavigate();
    const [productId, setProductId] = useState('');
    const [trackingInfo, setTrackingInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrackProduct = async () => {
        setError('');
        setLoading(true);

        try {
            const CONTRACT_ADDRESS = '0xaE998C70708957C86F2B0D2A307c6D7AfddDB741';
            const EVM_CHAIN_RPC_URL = 'http://aops-custom-202305-2crvsg-nlb-1d600174371701f9.elb.ap-northeast-2.amazonaws.com:9650/ext/bc/XpX1yGquejU5cma1qERzkHKDh4fsPKs4NttnS1tErigPzugx5/rpc';
            const GASLESS_COUNTER_RECIPIENT_CONTRACT_ADDRESS = '0x5DB9A7629912EBF95876228C24A848de0bfB43A9';
            const TRUSTED_FORWARDER_CONTRACT_ADDRESS = '0x52C84043CD9c865236f11d9Fc9F56aa003c1f922';
            const TYPE_SUFFIX_DATA = 'bytes8 typeSuffixDatadatadatada)';
            const DOMAIN_NAME = 'my domain name';
            const DOMAIN_VERSION = 'my domain version';
            const ABI = require('./Mine.json').ABI;

            const web3 = new Web3(new Web3.providers.HttpProvider(EVM_CHAIN_RPC_URL));
            const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
            const FORWARDER_ABI = JSON.parse(
                await readFile(
                    new URL('./Forwarder.json', import.meta.url)
                )
            )


            const forwarderContract = new web3.eth.Contract(FORWARDER_ABI, TRUSTED_FORWARDER_CONTRACT_ADDRESS);

            const nonce = ethUtil.bnToHex(
                Number(await forwarderContract.methods.getNonce(process.env.MY_WALLET_EVM_ADDRESS).call())
            );

            const domain = {
                name: DOMAIN_NAME,
                version: DOMAIN_VERSION,
                chainId: ethUtil.bnToHex(await web3.eth.getChainId()),
                verifyingContract: TRUSTED_FORWARDER_CONTRACT_ADDRESS,
                salt: null,
            };

            const types = {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                ],
                Message: [
                    { name: 'from', type: 'address' },
                    { name: 'to', type: 'address' },
                    { name: 'value', type: 'uint256' },
                    { name: 'gas', type: 'uint256' },
                    { name: 'nonce', type: 'uint256' },
                    { name: 'data', type: 'bytes' },
                    { name: 'validUntilTime', type: 'uint256' },
                    { name: 'typeSuffixDatadatadatada', type: 'bytes32' },
                ],
            };

            const estimateGas = '4000000';
            const primaryType = 'Message';

            const message = {
                data: callData,
                from: process.env.MY_WALLET_EVM_ADDRESS,
                gas: ethUtil.bnToHex(Number(estimateGas)),
                nonce: nonce,
                to: GASLESS_COUNTER_RECIPIENT_CONTRACT_ADDRESS,
                validUntilTime: String('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
                value: String('0x0'),
            };

            const dataToSign = {
                domain,
                types,
                primaryType,
                message: {
                    ...message,
                    typeSuffixDatadatadatada: Buffer.from(TYPE_SUFFIX_DATA, 'utf8'),
                },
            };

            const sig = ethSigUtil.signTypedData({
                privateKey: Buffer.from(FROM_ADDRESS_PK, 'hex'),
                data: dataToSign,
            });

            const trackingInfo = await contract.methods.trackProduct(productId, trackingInfo).send({ from: process.env.MY_WALLET_EVM_ADDRESS });
            setTrackingInfo(trackingInfo);
        } catch (error) {
            setError('Error tracking product');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <h1>Track Product</h1>
            {error && <p>{error}</p>}
            <input
                type="text"
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="bg-gray-200 focus:bg-white border border-gray-300 focus:border-blue-500 rounded-md py-2 px-4 outline-none transition-colors duration-300"
            />


            <input
                type="text"
                placeholder="Tracking Info"
                value={trackingInfo}
                onChange={(e) => setTrackingInfo(e.target.value)}
            />
            <button onClick={handleTrackProduct}>Track</button>
            <Link to="/">Go back</Link>
        </div>
    );
};

export default Track;
