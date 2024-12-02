async function main() {
    const DegenToken = await ethers.getContractFactory("DegenToken");
    const degenToken = await DegenToken.deploy();
    await degenToken.deployed();

    console.log("DegenToken deployed to:", degenToken.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
