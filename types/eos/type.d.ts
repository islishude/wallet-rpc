/** spell-checker: disable */
interface ITransfer {
    account: "eosio.token";
    name: "transfer";
    data: {
        from: string;
        to: string;
        quantity: string;
        memo: string;
    };
}
interface ICreateAccount {
    account: "eosio.token";
    name: "create";
    data: {
        issuer: string;
        maximum_supply: string;
    };
}
interface ISetContractCode {
    account: "eosio";
    name: "setcode";
    data: {
        account: string;
        vmtype: number;
        vmversion: number;
        code: string;
    };
}
interface ISetContractABI {
    account: "eosio";
    name: "setabi";
    data: {
        account: string;
        abi: string;
    };
}
interface INewAccount {
    account: "eosio";
    name: "newaccount";
    data: {
        creator: string;
        name: string;
        owner: {
            threshold: number;
            keys: Array<{
                key: string;
                weight: number;
            }>;
            accounts: any[];
            waits: any[];
        };
        active: {
            threshold: number;
            keys: Array<{
                key: string;
                weight: number;
            }>;
            accounts: any[];
            waits: any[];
        };
    };
}
interface IDelegateBrandwidth {
    account: "eosio";
    name: "delegatebw";
    data: {
        from: string;
        receiver: string;
        stake_net_quantity: string;
        stake_cpu_quantity: string;
        transfer: boolean;
    };
}
interface IUndelegateBrandwidth {
    account: "eosio";
    name: "undelegatebw";
    data: {
        from: string;
        receiver: string;
        unstake_net_quantity: string;
        unstake_cpu_quantity: string;
    };
}
interface IBuyRAMByte {
    account: "eosio";
    name: "buyrambytes";
    data: {
        payer: string;
        receiver: string;
        bytes: number;
    };
}
interface IBuyRAM {
    account: "eosio";
    name: "buyram";
    data: {
        payer: string;
        receiver: string;
        quant: string;
    };
}
