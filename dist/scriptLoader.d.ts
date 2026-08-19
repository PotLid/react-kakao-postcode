export interface Options {
    callback?: Function;
    removeScript: boolean;
}
declare const useScript: (src: string, id?: string, options?: Options) => void;
export default useScript;
