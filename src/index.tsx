import * as React from 'react'
import useScript, {Options as ScriptOptions} from './scriptLoader'
import './styles.scss'

const {useState, useRef, forwardRef, useImperativeHandle} = React;

const KAKAO_API: string = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

export type PostcodeAddressType = 'R' | 'J'
export type PostcodeYN = 'Y' | 'N'
export type PostcodeLanguageType = 'K' | 'E'

export interface PostcodeCompleteData {
    zonecode: string,
    address: string,
    addressEnglish: string,
    addressType: PostcodeAddressType,
    userSelectedType: PostcodeAddressType,
    noSelected: PostcodeYN,
    userLanguageType: PostcodeLanguageType,
    roadAddress: string,
    roadAddressEnglish: string,
    jibunAddress: string,
    jibunAddressEnglish: string,
    autoRoadAddress: string,
    autoRoadAddressEnglish: string,
    autoJibunAddress: string,
    autoJibunAddressEnglish: string,
    buildingCode: string,
    buildingName: string,
    apartment: PostcodeYN,
    sido: string,
    sidoEnglish: string,
    sigungu: string,
    sigunguEnglish: string,
    sigunguCode: string,
    roadnameCode: string,
    bcode: string,
    roadname: string,
    roadnameEnglish: string,
    bname: string,
    bnameEnglish: string,
    bname1: string,
    bname1English: string,
    bname2: string,
    bname2English: string,
    hname: string,
    query: string,
    /** @deprecated old-style postcode, not updated since 2020-03-09 by Daum/Kakao */
    postcode: string,
}

export type PostcodeSize = {
    width: number,
    height: number,
}

export type PostcodeCloseState = 'FORCE_CLOSE' | 'COMPLETE_CLOSE'

export type PostcodeSearchData = {
    q: string,
    count: number,
}

export type PostcodeTheme = {
    bgColor?: string,
    searchBgColor?: string,
    contentBgColor?: string,
    pageBgColor?: string,
    textColor?: string,
    queryTextColor?: string,
    postcodeTextColor?: string,
    emphTextColor?: string,
    outlineColor?: string,
}

export type PostcodeOptions = {
    width?: number | string,
    height?: number | string,
    minWidth?: number,
    animation?: boolean,
    focusInput?: boolean,
    autoMapping?: boolean,
    autoMappingRoad?: boolean,
    autoMappingJibun?: boolean,
    shorthand?: boolean,
    pleaseReadGuide?: number,
    pleaseReadGuideTimer?: number,
    maxSuggestItems?: number,
    showMoreHName?: boolean,
    hideMapBtn?: boolean,
    hideEngBtn?: boolean,
    alwaysShowEngAddr?: boolean,
    submitMode?: boolean,
    useBannerLink?: boolean,
    theme?: PostcodeTheme,
}

export type PostcodeOpenOptions = {
    q?: string,
    autoClose?: boolean,
    left?: number,
    top?: number,
    popupTitle?: string,
    popupKey?: string,
}

export type ReactKakaoPostcodeHandle = {
    open: () => void,
    close: () => void,
}

export type RKakaoPostcodeProps = {
    className?: string,
    onChange: (data: PostcodeCompleteData) => void,
    onClose?: (state: PostcodeCloseState) => void,
    onResize?: (size: PostcodeSize) => void,
    onSearch?: (data: PostcodeSearchData) => void,
    scriptId?: string,
    scriptOptions?: ScriptOptions,
    postcodeOptions?: PostcodeOptions,
    openOptions?: PostcodeOpenOptions,
    mode?: 'embed' | 'popup',
    hideDefaultButtons?: boolean,
}

const EMBED_DEFAULTS: PostcodeOptions = {
    width: '100%',
    height: '100%',
    animation: true,
}

const ReactKakaoPostcode = forwardRef<ReactKakaoPostcodeHandle, RKakaoPostcodeProps>(({
    className,
    onChange,
    onClose,
    onResize,
    onSearch,
    scriptId = 'kakao-script',
    scriptOptions = {removeScript: true},
    postcodeOptions = {},
    openOptions = {},
    mode = 'embed',
    hideDefaultButtons = false,
}, ref) => {
    useScript(KAKAO_API, scriptId, scriptOptions)

    const postcodeArea: any = useRef(null);
    const [visible, setVisible] = useState(false)

    function createPostcode(currentScroll: number) {
        const daumObj: any = (window as any).daum
        const finalOptions = mode === 'embed' ? {...EMBED_DEFAULTS, ...postcodeOptions} : {...postcodeOptions}

        return new daumObj.Postcode({
            ...finalOptions,
            oncomplete: (data: PostcodeCompleteData) => {
                onChange(data)
                if(mode === 'embed') window.scrollTo(window.scrollX, currentScroll)
            },
            onresize: (size: PostcodeSize) => {
                if(postcodeArea.current) postcodeArea.current.style.height = size.height + 'px'
                if(onResize) onResize(size)
            },
            onclose: (state: PostcodeCloseState) => {
                if(mode === 'embed') closePostcode()
                if(onClose) onClose(state)
            },
            onsearch: (data: PostcodeSearchData) => {
                if(onSearch) onSearch(data)
            },
        })
    }

    function openPostcode() {
        if(!(window as any).daum) {
            alert('다음 우편번호 서비스에 문제가 있습니다. 다시 시도해 주세요.')
            return
        }

        const currentScroll = window.scrollY
        const postcode = createPostcode(currentScroll)

        if(mode === 'popup') {
            postcode.open(openOptions)
            return
        }

        setVisible(true)
        postcode.embed(postcodeArea.current, openOptions)
    }

    function closePostcode() {
        setVisible(false)
    }

    useImperativeHandle(ref, () => ({
        open: openPostcode,
        close: closePostcode,
    }))

    return (
        <div className={className}>
            {mode === 'embed' && (
                <div ref={postcodeArea} style={{display: visible ? 'block' : 'none'}} />
            )}
            {!hideDefaultButtons && (
                <React.Fragment>
                    <button type="button" onClick={openPostcode}>open</button>
                    {mode === 'embed' && (
                        <button type="button" onClick={closePostcode}>close</button>
                    )}
                </React.Fragment>
            )}
        </div>
    )
})

export default ReactKakaoPostcode
