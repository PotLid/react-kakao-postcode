import {useState, useEffect} from 'react'

const loadScript = (src: string, id: string, callback: Function) => {
    const existingScript = document.getElementById(id);

    if(!existingScript) {
        const script = document.createElement('script')

        script.src = src
        script.id = id
    
        document.body.appendChild(script)
    
        script.onload = () => {
            if(callback) callback()
        }

        if(existingScript && callback) callback()
    }
}

export interface Options {
    callback: Function,
    removeScript: Boolean
}



const useScript:Function = async (src: string, id: string = 'injected-script', options: Options = {callback: () => null, removeScript: true} ) => {
    const [isScriptLoaded, setScriptLoaded] = useState(false);
    const {callback, removeScript} = options;

    await useEffect(()=>{
        if(!isScriptLoaded){
            loadScript(src, id, callback)
            setScriptLoaded(true)
        }
        return () => {
            if(removeScript) {
                const existingScript = document.getElementById(id);
                if(existingScript) existingScript.remove()
            }
        }
    },[src])
    return true
}

export default useScript