interface installArgs {
    platform?: string;
    arch?: string;
    version?: string;
}
declare const install: ({ platform, arch, version }: installArgs) => Promise<void>;
export default install;
