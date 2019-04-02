export interface BehaviourObject {
    /* 1 directly before background <--- Layer 3 Fence --> 5 nearest foreground */
    layer?: 1 | 2 | 3 | 4 | 5;
    preload: () => any;
    create: () => any;
    update: (obj) => any;
}
