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
interface ICreate {
    account: "eosio.token";
    name: "create";
    data: {
        issuer: string;
        maximum_supply: string;
    };
}
interface ITransferToken {
    account: "eosio.token";
    name: "transfer";
    data: {
        from: string;
        to: string;
        quantity: string;
        memo: string;
    };
}
interface IIssue {
    account: "eosio.token";
    name: "issue";
    data: {
        to: string;
        quantity: string;
        memo: string;
    };
}
interface IRetire {
    account: "eosio.token";
    name: "retire";
    data: {
        quantity: string;
        memo: string;
    };
}
