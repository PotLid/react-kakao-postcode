import {useEffect} from 'react'

const loadScript = (src: string, id: string, callback?: Function) => {
    const existingScript = document.getElementById(id);

    if(!existingScript) {
        const script = document.createElement('script')

        script.src = src
        script.id = id

        document.body.appendChild(script)

        script.onload = () => {
            if(callback) callback()
        }
    } else if(callback) {
        callback()
    }
}

export interface Options {
    callback?: Function,
    removeScript: boolean
}



const useScript = (src: string, id: string = 'injected-script', options: Options = {callback: () => null, removeScript: true} ): void => {
    const {callback, removeScript} = options;

    useEffect(()=>{
        loadScript(src, id, callback)
        return () => {
            if(removeScript) {
                const existingScript = document.getElementById(id);
                if(existingScript) existingScript.remove()
            }
        }
    },[src])
}

export default useScript