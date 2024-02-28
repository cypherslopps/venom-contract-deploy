import { Address, toNano, getRandomNonce } from "locklift";
// import { EverWalletAccount } from "everscale-standalone-client";

async function main() {
    const signer = (await locklift.keystore.getSigner("0"))!;

    const Platform = await locklift.factory.getContractArtifacts("Platform");

    const ContractToDeploy = await locklift.factory.getContractArtifacts("ContractToDeploy");

    const { contract: root } = await locklift.factory.deployContract({
        contract: "Root",
        publicKey: signer.publicKey,
        initParams: {
            _platformCode: Platform.code,
            _contractToDeployCode: ContractToDeploy.code,
            _nonce: getRandomNonce()
        },
        constructorParams: {
            _owner: new Address("0:f550c1450c3db114d4a762b0a67f9e00a65e9cc578047dce0a094660e6d5641b"),
        },
        value: toNano(1.5)
    });

    console.log(`Root contract deployed at ${root.address.toString()}`);
};

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e);
        process.exit(1)
    });