/** spell-checker: disable */
declare type account_name = string;
declare type permission_name = string;
declare type action_name = string;
declare type transaction_id_type = string;
declare type weight_type = number;
declare type bytes = string;
declare type asset = string;
declare type public_key = string;
export interface ITypeAuthority {
    threshold: number;
    keys: ITypeKeyWeight[];
    account: ITypePermissionLevelWeight[];
    waits: ITypeWaitWeight[];
}
export interface ITypePermissionLevel {
    actor: account_name;
    permission_name: account_name;
}
export interface ITypeKeyWeight {
    key: public_key;
    weight: weight_type;
}
export interface ITypePermissionLevelWeight {
    permission: ITypePermissionLevel;
    weight: weight_type;
}
export interface ITypeWaitWeight {
    wait_sec: number;
    weight: weight_type;
}
export interface ITypeBidName {
    bidder: account_name;
    newname: account_name;
    bid: asset;
}
export interface ITypeBidRefund {
    bidder: account_name;
    newname: account_name;
}
export interface ITypeBlockChainParam {
    max_block_net_usage: number;
    target_block_net_usage_pct: number;
    max_transaction_net_usage: number;
    base_per_transaction_net_usage: number;
    net_usage_leeway: number;
    context_free_discount_net_usage_num: number;
    context_free_discount_net_usage_den: number;
    max_block_cpu_usage: number;
    target_block_cpu_usage_pct: number;
    max_transaction_cpu_usage: number;
    min_transaction_cpu_usage: number;
    max_transaction_lifetime: number;
    deferred_trx_expiration_window: number;
    max_transaction_delay: number;
    max_inline_action_size: number;
    max_inline_action_depth: number;
    max_authority_depth: number;
}
export interface INewAccount {
    account: "eosio";
    name: "newaccount";
    data: {
        creator: account_name;
        name: account_name;
        owner: ITypeAuthority;
        active: ITypeAuthority;
    };
}
export interface ISetCode {
    account: "eosio";
    name: "setcode";
    data: {
        account: account_name;
        vmtype: number;
        vmversion: number;
        code: string;
    };
}
export interface ISetABI {
    account: "eosio";
    name: "setabi";
    data: {
        account: account_name;
        abi: string;
    };
}
export interface IUpdateAuth {
    account: "eosio";
    name: "updateauth";
    data: {
        account: account_name;
        permission: permission_name;
        parent: permission_name;
        auth: ITypeAuthority;
    };
}
export interface IDeleteAuth {
    account: "eosio";
    name: "deleteauth";
    data: {
        account: account_name;
        permission: permission_name;
    };
}
export interface ILinkAuth {
    account: "eosio";
    name: "linkauth";
    data: {
        account: account_name;
        code: account_name;
        type: action_name;
        requirement: permission_name;
    };
}
export interface IUnlinkAuth {
    account: "eosio";
    name: "unlinkauth";
    data: {
        account: account_name;
        code: account_name;
        type: action_name;
    };
}
export interface ICancelDelay {
    account: "eosio";
    name: "canceldelay";
    data: {
        canceling_auth: ITypePermissionLevel;
        trx_id: transaction_id_type;
    };
}
export interface IOnError {
    sender_id: number;
    sent_trx: bytes;
}
export interface IBuyRAMByte {
    account: "eosio";
    name: "buyrambytes";
    data: {
        payer: account_name;
        receiver: account_name;
        bytes: number;
    };
}
export interface IBuyRAM {
    account: "eosio";
    name: "buyram";
    data: {
        payer: account_name;
        receiver: account_name;
        quant: asset;
    };
}
export interface ISellRam {
    account: "eosio";
    name: "sellram";
    data: {
        account: account_name;
        bytes: number;
    };
}
export interface IDelegateBrandwidth {
    account: "eosio";
    name: "delegatebw";
    data: {
        from: account_name;
        receiver: account_name;
        stake_net_quantity: asset;
        stake_cpu_quantity: asset;
        transfer: boolean;
    };
}
export interface IUndelegateBrandwidth {
    account: "eosio";
    name: "undelegatebw";
    data: {
        from: account_name;
        receiver: account_name;
        unstake_net_quantity: asset;
        unstake_cpu_quantity: asset;
    };
}
export interface IRefund {
    account: "eosio";
    name: "refund";
    data: {
        owner: account_name;
    };
}
export interface IRegProducer {
    account: "eosio";
    name: "regproducer";
    data: {
        producer: account_name;
        procducer_key: public_key;
        url: string;
        location: number;
    };
}
export interface ISetRam {
    account: "eosio";
    name: "setram";
    data: {
        max_ram_size: number;
    };
}
export interface ISetRAMRate {
    account: "eosio";
    name: "setramrate";
    data: {
        bytes_per_block: number;
    };
}
export interface IBidName {
    account: "eosio";
    name: "bidname";
    data: {
        bidder: account_name;
        newname: account_name;
        bid: asset;
    };
}
export interface IBidRefund {
    account: "eosio";
    name: "bidrefund";
    data: {
        bidder: account_name;
        newname: account_name;
    };
}
export interface IUnregprod {
    account: "eosio";
    name: "unregprod";
    data: {
        producer: account_name;
    };
}
export interface IRegProxy {
    account: "eosio";
    name: "regproxy";
    data: {
        proxy: account_name;
        isproxy: boolean;
    };
}
export interface IVoteProducer {
    account: "eosio";
    name: "voteproducer";
    data: {
        voter: account_name;
        proxy: account_name;
        producer: account_name[];
    };
}
export interface IClaimRewards {
    account: "eosio";
    name: "claimrewards";
    data: {
        owner: account_name;
    };
}
export interface ISetPriv {
    account: "eosio";
    name: "setpriv";
    data: {
        account: account_name;
        is_priv: number;
    };
}
export interface IRmVProducer {
    account: "eosio";
    name: "rmvproducer";
    data: {
        producer: account_name;
    };
}
export interface ISetAccountLimits {
    account: "eosio";
    name: "setalimits";
    data: {
        account: account_name;
        ram_bytes: number;
        net_weight: number;
        cpu_weight: number;
    };
}
export interface ISetGlobalLimits {
    account: "eosio";
    name: "setglimits";
    data: {
        cpu_usec_per_period: number;
    };
}
export interface ISetProducers {
    account: "eosio";
    name: "setprods";
    data: {
        schedule: Array<{
            producer_name: account_name;
            block_signing_key: public_key;
        }>;
    };
}
export interface ISetParams {
    account: "eosio";
    name: "setparams";
    data: {
        params: ITypeBlockChainParam;
    };
}
export {};
