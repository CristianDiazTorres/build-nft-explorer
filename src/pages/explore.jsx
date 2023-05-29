
import { useState, useEffect } from 'react';
import NftCard from '../components/nftcard';
import {fetchNFTs} from '../utils/fetchNFTs';

const Explore = () => {

    const [owner, setOwner] = useState("")
    const [contractAddress, setContractAddress] = useState("")
    const [NFTs, setNFTs] = useState("")
    const [collectionCount, setCollectionCount] = useState("")

    useEffect(() => {
        const count = {};
        if (NFTs) {
            NFTs.forEach(NFT => {
                count[NFT.contract.address] = count[NFT.contract.address] ? count[NFT.contract.address]+1 : 1;
            });
        }
        setCollectionCount(count);
    }, [NFTs]);

    return (
        <div>
            <header className=' py-24  mb-12 w-full alchemy'>
                <div className='flex-grow flex justify-end mr-12 mb-12'>
                </div>
                <div className='flex flex-col items-center mb-12'>
                    <div className='mb-16 text-white text-center'>
                        <h1 className='text-5xl  font-bold font-body mb-2'>
                            NFT Explorer
                        </h1>
                        <p>An inspector to find NFTs by wallet address</p>
                    </div>
                    <div className='flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 '>
                        <input className="border rounded-sm focus:outline-none py-2 px-3 w-full" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder='Insert your wallet address'></input>
                        {/* <input className="focus:outline-none rounded-sm py-2 px-3 w-full" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder='Insert NFT Contract address (optional)'></input> */}
                    </div>
                    <div className='w-2/6 flex justify-center'>
                    <button className='py-3 bg-white rounded-sm w-full hover:bg-slate-100' onClick={() => {fetchNFTs(owner, contractAddress, setNFTs, 1)}}>Search</button>
                    </div>
                </div>
            </header>
            <div class="grid grid-cols-2 gap-4 my-6">
                <div class="px-12">
                    <table class="min-w-full text-center">
                        <thead class="border-b bg-gray-800">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                    Total NFT Counts
                                </th>
                                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                    Net Worth (ETH)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {NFTs.length ? NFTs.length : "-"}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    ---
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="px-12">
                    <table class="min-w-full text-center">
                        <thead class="border-b bg-gray-800">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                    Collection Address (Name)
                                </th>
                                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                    Count
                                </th>
                                <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                    Floor Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                collectionCount ? Object.entries(collectionCount).map(([key, value]) => {
                                    return (
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {key}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {value}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                ---
                                            </td>
                                        </tr>
                                    )
                                }) : ""
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <section className='flex flex-wrap justify-center'>
                {
                    NFTs ? NFTs.map(NFT => {
                       
                        return (
                           <NftCard image={NFT.media[0].gateway} id={NFT.id.tokenId } title={NFT.title} address={NFT.contract.address} description={NFT.description} attributes={NFT.metadata.attributes} ></NftCard>
                        )
                    }) : <div>No NFTs found</div>
                }
            </section>
        </div>
    )
}


export default Explore