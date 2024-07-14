import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorMarketplace } from "../target/types/anchor_marketplace";
import { PublicKey,Keypair, } from "@solana/web3.js";

import {  TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";






process.env.ANCHOR_PROVIDER_URL = 'https://api.devnet.solana.com';
process.env.ANCHOR_WALLET = './key.json';

const provider = anchor.AnchorProvider.env()
anchor.setProvider(provider);

const program = new Program<AnchorMarketplace>(
  require("../target/idl/coin_flip.json"),
  provider
);
const admin = provider.wallet.publicKey;



async function initialize(name:string, fee:number,) {


    try {
        await program.methods.initialize(name, fee)
        .accounts({
            admin: admin,
            tokenProgram: TOKEN_PROGRAM_ID
        })
        .signers([])
        .rpc();

        console.log('Initialize transaction successful');
    } catch (error) {
        console.error('Error initializing:', error);
    }
}

async function delist( makerMint:PublicKey) {
    const maker = provider.wallet.publicKey;


    try {
        await program.methods.delist().accounts({
            maker: maker,
            makerMint: makerMint,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([])
        .rpc();



        console.log('Delist transaction successful');
    } catch (error) {
        console.error('Error delisting:', error);
    }
}


async function list( makerMint:PublicKey,collectionMint:PublicKey,price:anchor.BN) {
    
    const maker = provider.wallet.publicKey;


    try {
        await program.methods.list(price).accounts({
            maker: maker,
            makerMint: makerMint,
            collectionMint:collectionMint,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([])
        .rpc();



        console.log('Delist transaction successful');
    } catch (error) {
        console.error('Error delisting:', error);
    }
}



async function purchase( makerMint:PublicKey, maker:PublicKey) {

    const taker = provider.wallet.publicKey;


    try {
        await program.methods.purchase().accounts({
            maker: maker,
            taker: taker,
            makerMint: makerMint,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([])
        .rpc();


        console.log('Delist transaction successful');
    } catch (error) {
        console.error('Error delisting:', error);
    }
}