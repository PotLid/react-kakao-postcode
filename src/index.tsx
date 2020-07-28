import * as React from 'react'
import useScript, {Options} from './scriptLoader'
import './styles.scss'

const {useState, useEffect, useRef, Fragment } = React;

const KAKAO_API: string = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'


export type RKakaoPostcodeProps = {
    className?: string,
    onChange: Function,
    scriptId: string,
    options: Options,
}

const ReactKakaoPostcode: React.FC<RKakaoPostcodeProps> = ({className, onChange, scriptId = 'kakao-script', options = {removeScript: true,}}) =>  {
    useScript(KAKAO_API, scriptId, options)

    const postcodeArea: any = useRef(null);

    const [data, setData] = useState(null)

    useEffect(()=>{
        if(!onChange) return
        onChange(data)
    }, [data])
    
    function exec_map() {
        const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
        
        const daumObj: any = window["daum"]

        new daumObj.Postcode({
            oncomplete: function(data: any) {
                setData(data)
                closeMap()
                document.body.scrollTop = currentScroll
            },
            onresize: function(size: any) {
                postcodeArea.current.style.height = size.height + 'px'
              
            },
            width: '100%',
            height: '100%',
            animation: true,
        }).embed(postcodeArea.current)

        postcodeArea.current.style.display = 'block'
    }
    
    const openMap = () => {
        if(!window["daum"]) {
            alert('다음 우편번호 서비스에 문제가 있습니다. 다시 시도해 주세요.')
            return
        }
        exec_map()
    }

    const closeMap = () => {
        postcodeArea.current.style.display = 'none'
    } 

    return (
        <Fragment>
            <div className={className}>Test Purpose is updated</div>
            <div ref={postcodeArea} />
            <button onClick={openMap}>open</button>
            <button onClick={closeMap}>close</button>
        </Fragment>

    )
}

export default ReactKakaoPostcode